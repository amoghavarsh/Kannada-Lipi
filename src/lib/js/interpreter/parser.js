/**
 * KannadaLipi Parser - AST Builder for Kannada Programming Language
 * Converts tokens into an Abstract Syntax Tree
 */

class KannadaParser {
    constructor(tokens) {
        this.tokens = tokens;
        this.pos = 0;
    }

    current() {
        return this.tokens[this.pos] || { type: 'EOF' };
    }

    peek(offset = 1) {
        return this.tokens[this.pos + offset] || { type: 'EOF' };
    }

    advance() {
        const token = this.current();
        this.pos++;
        return token;
    }

    expect(type) {
        const token = this.current();
        if (token.type !== type) {
            throw new Error(`ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${type}, ಆದರೆ ${token.type} ಸಿಕ್ಕಿದೆ ಸಾಲು ${token.line} ರಲ್ಲಿ`);
        }
        return this.advance();
    }

    match(...types) {
        return types.includes(this.current().type);
    }

    /**
     * Parse the entire program
     */
    parse() {
        const statements = [];
        while (!this.match('EOF')) {
            const stmt = this.parseStatement();
            if (stmt) {
                statements.push(stmt);
            }
        }
        return { type: 'Program', body: statements };
    }

    /**
     * Parse a single statement
     */
    parseStatement() {
        // Skip newlines
        while (this.match('NEWLINE')) {
            this.advance();
        }

        if (this.match('EOF')) return null;

        // Variable assignment: identifier = expression
        if (this.match('IDENTIFIER') && this.peek().type === 'EQUAL') {
            return this.parseAssignment();
        }

        // If statement
        if (this.match('IF')) {
            return this.parseIfStatement();
        }

        // While loop
        if (this.match('WHILE')) {
            return this.parseWhileLoop();
        }

        // For loop
        if (this.match('FOR')) {
            return this.parseForLoop();
        }

        // Function definition
        if (this.match('FUNCTION')) {
            return this.parseFunctionDef();
        }

        // Return statement
        if (this.match('RETURN')) {
            return this.parseReturn();
        }

        // Break/Continue
        if (this.match('BREAK')) {
            this.advance();
            return { type: 'Break' };
        }
        if (this.match('CONTINUE')) {
            this.advance();
            return { type: 'Continue' };
        }

        // Expression statement (print, function call, etc.)
        return this.parseExpression();
    }

    /**
     * Parse variable assignment
     */
    parseAssignment() {
        const name = this.expect('IDENTIFIER').value;
        this.expect('EQUAL');
        const value = this.parseExpression();
        return {
            type: 'Assignment',
            name,
            value
        };
    }

    /**
     * Parse if statement
     */
    parseIfStatement() {
        this.expect('IF');
        const condition = this.parseComparison();
        this.expect('COLON');
        const consequent = this.parseStatement();

        let alternate = null;
        if (this.match('ELSE')) {
            this.advance();
            if (this.match('QUESTION')) {
                this.advance();
            }
            alternate = this.parseStatement();
        }

        return {
            type: 'If',
            condition,
            consequent,
            alternate
        };
    }

    /**
     * Parse while loop
     */
    parseWhileLoop() {
        this.expect('WHILE');
        const condition = this.parseComparison();
        this.expect('COLON');

        const body = [];
        while (!this.match('EOF') && !this.match('NEWLINE')) {
            body.push(this.parseStatement());
        }

        return {
            type: 'While',
            condition,
            body
        };
    }

    /**
     * Parse for loop
     */
    parseForLoop() {
        this.expect('FOR');
        const variable = this.expect('IDENTIFIER').value;
        this.expect('FROM');
        const start = this.parseExpression();
        this.expect('TO');
        const end = this.parseExpression();
        this.expect('COLON');

        const body = [];
        body.push(this.parseStatement());

        return {
            type: 'For',
            variable,
            start,
            end,
            body
        };
    }

    /**
     * Parse function definition
     */
    parseFunctionDef() {
        this.expect('FUNCTION');
        const name = this.expect('IDENTIFIER').value;
        this.expect('LPAREN');

        const params = [];
        while (!this.match('RPAREN')) {
            params.push(this.expect('IDENTIFIER').value);
            if (this.match('COMMA')) {
                this.advance();
            }
        }
        this.expect('RPAREN');
        this.expect('COLON');

        const body = this.parseStatement();

        return {
            type: 'FunctionDef',
            name,
            params,
            body
        };
    }

    /**
     * Parse return statement
     */
    parseReturn() {
        this.expect('RETURN');
        const value = this.parseComparison();
        return {
            type: 'Return',
            value
        };
    }

    /**
     * Parse comparison expression
     */
    parseComparison() {
        let left = this.parseExpression();

        while (this.match('GREATER_THAN', 'LESS_THAN', 'DOUBLE_EQUAL', 'NOT_EQUAL', 'GREATER_EQUAL', 'LESS_EQUAL')) {
            const operator = this.advance().type;
            const right = this.parseExpression();
            left = {
                type: 'BinaryOp',
                operator,
                left,
                right
            };
        }

        return left;
    }

    /**
     * Parse expression
     */
    parseExpression() {
        return this.parseLogical();
    }

    /**
     * Parse logical operators (AND, OR)
     */
    parseLogical() {
        let left = this.parseAdditive();

        while (this.match('AND', 'OR')) {
            const operator = this.advance().type;
            const right = this.parseAdditive();
            left = {
                type: 'BinaryOp',
                operator,
                left,
                right
            };
        }

        return left;
    }

    /**
     * Parse addition and subtraction
     */
    parseAdditive() {
        let left = this.parseMultiplicative();

        while (this.match('PLUS', 'MINUS')) {
            const operator = this.advance().type;
            const right = this.parseMultiplicative();
            left = {
                type: 'BinaryOp',
                operator,
                left,
                right
            };
        }

        return left;
    }

    /**
     * Parse multiplication, division, modulo
     */
    parseMultiplicative() {
        let left = this.parseUnary();

        while (this.match('TIMES', 'DIVIDE', 'MODULO')) {
            const operator = this.advance().type;
            const right = this.parseUnary();
            left = {
                type: 'BinaryOp',
                operator,
                left,
                right
            };
        }

        return left;
    }

    /**
     * Parse unary operators
     */
    parseUnary() {
        if (this.match('MINUS', 'NOT')) {
            const operator = this.advance().type;
            const operand = this.parseUnary();
            return {
                type: 'UnaryOp',
                operator,
                operand
            };
        }
        return this.parsePrimary();
    }

    /**
     * Parse primary expressions
     */
    parsePrimary() {
        const token = this.current();

        // Number literal
        if (this.match('NUMBER')) {
            this.advance();
            return { type: 'Number', value: token.value };
        }

        // String literal
        if (this.match('STRING')) {
            this.advance();
            return { type: 'String', value: token.value };
        }

        // Boolean literals
        if (this.match('TRUE')) {
            this.advance();
            return { type: 'Boolean', value: true };
        }
        if (this.match('FALSE')) {
            this.advance();
            return { type: 'Boolean', value: false };
        }

        // Grouped expression
        if (this.match('LPAREN')) {
            this.advance();
            const expr = this.parseExpression();
            this.expect('RPAREN');
            return expr;
        }

        // Array literal
        if (this.match('LBRACKET')) {
            return this.parseArrayLiteral();
        }

        // Built-in functions and identifiers
        if (this.match('PRINT', 'ROUND', 'LENGTH', 'MAX', 'MIN', 'SORT_ASC', 'SORT_DESC',
            'COLLECT', 'SEARCH', 'SWAP', 'COUNT', 'INPUT', 'ALPHABET',
            // String functions
            'CONCAT', 'STR_LENGTH', 'REVERSE', 'SUBSTRING', 'UPPERCASE', 'LOWERCASE',
            // Math functions
            'SQRT', 'POWER', 'RANDOM', 'FLOOR', 'CEIL', 'ABS',
            // Type conversion
            'TO_NUMBER', 'TO_STRING',
            // Array functions
            'PUSH', 'POP', 'JOIN',
            // Date/Time functions
            'TODAY', 'TIME', 'YEAR', 'MONTH', 'DAY',
            // Trigonometry functions
            'SIN', 'COS', 'TAN',
            // Additional string functions
            'SPLIT', 'REPLACE', 'INCLUDES', 'TRIM',
            // Utility functions
            'TYPE',
            // Math constants
            'PI', 'EULER',
            // Higher-order array functions
            'MAP', 'FILTER', 'REDUCE',
            // Array utilities
            'ARRAY_LENGTH', 'RANGE',
            // New functions
            'LOG', 'FACTORIAL', 'AVERAGE', 'REPEAT', 'DIGITS',
            'SUM', 'IS_NUMBER', 'UNIQUE', 'REVERSE_ARRAY', 'PAD',
            'IDENTIFIER')) {
            return this.parseIdentifierOrCall();
        }

        throw new Error(`ಅನಿರೀಕ್ಷಿತ ಟೋಕನ್ ${token.type} ಸಾಲು ${token.line} ರಲ್ಲಿ`);
    }

    /**
     * Parse array literal
     */
    parseArrayLiteral() {
        this.expect('LBRACKET');
        const elements = [];

        while (!this.match('RBRACKET')) {
            elements.push(this.parseExpression());
            if (this.match('COMMA')) {
                this.advance();
            }
        }

        this.expect('RBRACKET');
        return { type: 'Array', elements };
    }

    /**
     * Parse identifier or function call
     */
    parseIdentifierOrCall() {
        const token = this.advance();
        const name = token.value;
        const tokenType = token.type;

        // Check for function call
        if (this.match('LPAREN')) {
            this.advance();
            const args = [];

            while (!this.match('RPAREN')) {
                args.push(this.parseExpression());
                if (this.match('COMMA')) {
                    this.advance();
                }
            }

            this.expect('RPAREN');

            return {
                type: 'Call',
                name,
                callee: tokenType,
                arguments: args
            };
        }

        // Check for array indexing
        if (this.match('LBRACKET')) {
            this.advance();
            const index = this.parseExpression();
            this.expect('RBRACKET');
            return {
                type: 'Index',
                array: { type: 'Identifier', name },
                index
            };
        }

        // Just an identifier
        return { type: 'Identifier', name };
    }
}

export default KannadaParser;
