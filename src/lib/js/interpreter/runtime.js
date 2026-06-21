/**
 * KannadaLipi Runtime - Executes AST for Kannada Programming Language
 */
import KannadaLexer from './lexer.js';


class KannadaRuntime {
    constructor() {
        this.variables = {};
        this.functions = {};
        this.output = [];
        this.lexer = new KannadaLexer();

        // Kannada alphabet data
        this.kannadaAlphabet = {
            swaras: ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ'],
            yogavahas: ['ಅಂ', 'ಅಃ'],
            vyanajanas: ['ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ', 'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ',
                'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ', 'ರ', 'ಲ', 'ವ',
                'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ']
        };
    }

    /**
     * Convert number to Kannada digits
     */
    toKannada(num) {
        return this.lexer.toKannada(num);
    }

    /**
     * Run the program
     */
    run(ast) {
        this.output = [];
        this.variables = {};

        try {
            for (const stmt of ast.body) {
                this.execute(stmt);
            }
        } catch (e) {
            if (e.message === '__BREAK__' || e.message === '__CONTINUE__') {
                // Ignore break/continue at top level
            } else {
                throw e;
            }
        }

        return this.output.join('\n');
    }

    /**
     * Execute a statement
     */
    execute(node) {
        if (!node) return null;

        switch (node.type) {
            case 'Assignment':
                return this.executeAssignment(node);
            case 'If':
                return this.executeIf(node);
            case 'While':
                return this.executeWhile(node);
            case 'For':
                return this.executeFor(node);
            case 'FunctionDef':
                return this.executeFunctionDef(node);
            case 'Return':
                throw { type: 'Return', value: this.evaluate(node.value) };
            case 'Break':
                throw new Error('__BREAK__');
            case 'Continue':
                throw new Error('__CONTINUE__');
            default:
                const result = this.evaluate(node);
                if (result !== null && result !== undefined && result !== '') {
                    this.output.push(String(result));
                }
                return result;
        }
    }

    /**
     * Execute assignment
     */
    executeAssignment(node) {
        const value = this.evaluate(node.value);
        this.variables[node.name] = value;
        return `${node.name} ಗೆ ${this.formatOutput(value)} ಅನ್ನು ಘೋಷಿಸಲಾಗಿದೆ`;
    }

    /**
     * Execute if statement
     */
    executeIf(node) {
        const condition = this.evaluate(node.condition);
        if (condition) {
            return this.execute(node.consequent);
        } else if (node.alternate) {
            return this.execute(node.alternate);
        }
        return null;
    }

    /**
     * Execute while loop
     */
    executeWhile(node) {
        let result = null;
        let iterations = 0;
        const maxIterations = 10000; // Prevent infinite loops

        while (this.evaluate(node.condition)) {
            iterations++;
            if (iterations > maxIterations) {
                throw new Error('ಅನಂತ ಲೂಪ್ ಪತ್ತೆಯಾಗಿದೆ - ೧೦,೦೦೦ ಪುನರಾವರ್ತನೆಗಳು ಮೀರಿದೆ');
            }

            try {
                for (const stmt of node.body) {
                    result = this.execute(stmt);
                }
            } catch (e) {
                if (e.message === '__BREAK__') break;
                if (e.message === '__CONTINUE__') continue;
                throw e;
            }
        }

        return result;
    }

    /**
     * Execute for loop
     */
    executeFor(node) {
        const start = this.evaluate(node.start);
        const end = this.evaluate(node.end);
        let result = null;

        for (let i = start; i <= end; i++) {
            this.variables[node.variable] = i;

            try {
                for (const stmt of node.body) {
                    result = this.execute(stmt);
                }
            } catch (e) {
                if (e.message === '__BREAK__') break;
                if (e.message === '__CONTINUE__') continue;
                throw e;
            }
        }

        return result;
    }

    /**
     * Execute function definition
     */
    executeFunctionDef(node) {
        this.functions[node.name] = {
            params: node.params,
            body: node.body
        };
        return null;
    }

    /**
     * Evaluate an expression
     */
    evaluate(node) {
        if (!node) return null;

        switch (node.type) {
            case 'Number':
                return node.value;

            case 'String':
                return node.value;

            case 'Boolean':
                return node.value;

            case 'Array':
                return node.elements.map(e => this.evaluate(e));

            case 'Identifier':
                // First check if it's a variable
                if (node.name in this.variables) {
                    return this.variables[node.name];
                }
                // Handle built-in keywords that work without parentheses
                if (node.name === 'ವರ್ಣಮಾಲೆ') {
                    return this.builtinAlphabet();
                }
                if (node.name === 'ಸತ್ಯ') {
                    return true;
                }
                if (node.name === 'ಅಸತ್ಯ') {
                    return false;
                }
                // Handle no-arg built-in functions used without parentheses
                if (node.name === 'ಇಂದು') {
                    const today = new Date();
                    const dd = String(today.getDate()).padStart(2, '0');
                    const mm = String(today.getMonth() + 1).padStart(2, '0');
                    const yyyy = today.getFullYear();
                    return `${this.toKannada(dd)}/${this.toKannada(mm)}/${this.toKannada(yyyy)}`;
                }
                if (node.name === 'ಸಮಯ') {
                    const now = new Date();
                    const hh = String(now.getHours()).padStart(2, '0');
                    const min = String(now.getMinutes()).padStart(2, '0');
                    const ss = String(now.getSeconds()).padStart(2, '0');
                    return `${this.toKannada(hh)}:${this.toKannada(min)}:${this.toKannada(ss)}`;
                }
                if (node.name === 'ಯಾದೃಚ್ಛಿಕ') {
                    return Math.random();
                }
                // Math constants without parentheses
                if (node.name === 'ಪೈ') {
                    return Math.PI;
                }
                if (node.name === 'ಇ_ಸಂಖ್ಯೆ') {
                    return Math.E;
                }
                throw new Error(`${node.name} ಕಂಡುಬಂದಿಲ್ಲ`);

            case 'BinaryOp':
                return this.evaluateBinaryOp(node);

            case 'UnaryOp':
                return this.evaluateUnaryOp(node);

            case 'Call':
                return this.evaluateCall(node);

            case 'Index':
                return this.evaluateIndex(node);

            default:
                throw new Error(`ಅಪರಿಚಿತ ನೋಡ್ ಪ್ರಕಾರ: ${node.type}`);
        }
    }

    /**
     * Evaluate binary operations
     */
    evaluateBinaryOp(node) {
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);

        switch (node.operator) {
            case 'PLUS':
                return Number(left) + Number(right);
            case 'MINUS':
                return Number(left) - Number(right);
            case 'TIMES':
                return Number(left) * Number(right);
            case 'DIVIDE':
                if (Number(right) === 0) {
                    throw new Error('ಸೊನ್ನೆಯಿಂದ ವಿಭಜಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ');
                }
                return Number(left) / Number(right);
            case 'MODULO':
                return Number(left) % Number(right);
            case 'GREATER_THAN':
                return Number(left) > Number(right);
            case 'LESS_THAN':
                return Number(left) < Number(right);
            case 'GREATER_EQUAL':
                return Number(left) >= Number(right);
            case 'LESS_EQUAL':
                return Number(left) <= Number(right);
            case 'DOUBLE_EQUAL':
                return left == right;
            case 'NOT_EQUAL':
                return left != right;
            case 'AND':
                return left && right;
            case 'OR':
                return left || right;
            default:
                throw new Error(`ಅಪರಿಚಿತ ಆಪರೇಟರ್: ${node.operator}`);
        }
    }

    /**
     * Evaluate unary operations
     */
    evaluateUnaryOp(node) {
        const operand = this.evaluate(node.operand);

        switch (node.operator) {
            case 'MINUS':
                return -Number(operand);
            case 'NOT':
                return !operand;
            default:
                throw new Error(`ಅಪರಿಚಿತ ಯುನರಿ ಆಪರೇಟರ್: ${node.operator}`);
        }
    }

    /**
     * Evaluate function calls
     */
    evaluateCall(node) {
        const args = node.arguments.map(a => this.evaluate(a));
        const name = node.name;
        const callee = node.callee;

        // Built-in functions
        switch (callee) {
            case 'PRINT':
                return this.builtinPrint(args);
            case 'ROUND':
                return this.toKannada(Math.round(args[0]));
            case 'LENGTH':
                return this.toKannada(String(args[0]).length);
            case 'COUNT':
                return this.toKannada(String(args[0]).split(/\s+/).filter(w => w).length);
            case 'MAX':
                return this.toKannada(Math.max(...args));
            case 'MIN':
                return this.toKannada(Math.min(...args));
            case 'SORT_ASC':
                return args.slice().sort((a, b) => a - b).map(n => this.toKannada(n));
            case 'SORT_DESC':
                return args.slice().sort((a, b) => b - a).map(n => this.toKannada(n));
            case 'COLLECT':
                return this.builtinCollect(args);
            case 'SEARCH':
                return this.builtinSearch(args);
            case 'SWAP':
                return this.builtinSwap(args, node.arguments);
            case 'INPUT':
                return this.builtinInput(args);
            case 'ALPHABET':
                return this.builtinAlphabet();

            // String functions
            case 'CONCAT':
                return args.map(a => String(a)).join('');
            case 'STR_LENGTH':
                return this.toKannada(String(args[0]).length);
            case 'REVERSE':
                return String(args[0]).split('').reverse().join('');
            case 'SUBSTRING':
                const str = String(args[0]);
                const start = Number(args[1]) || 0;
                const len = args[2] !== undefined ? Number(args[2]) : str.length;
                return str.substring(start, start + len);
            case 'UPPERCASE':
                return String(args[0]).toUpperCase();
            case 'LOWERCASE':
                return String(args[0]).toLowerCase();

            // Math functions
            case 'SQRT':
                return this.toKannada(Math.sqrt(Number(args[0])));
            case 'POWER':
                return this.toKannada(Math.pow(Number(args[0]), Number(args[1])));
            case 'RANDOM':
                if (args.length === 0) {
                    return this.toKannada(Math.random());
                } else if (args.length === 1) {
                    return this.toKannada(Math.floor(Math.random() * Number(args[0])));
                } else {
                    const min = Number(args[0]);
                    const max = Number(args[1]);
                    return this.toKannada(Math.floor(Math.random() * (max - min + 1)) + min);
                }
            case 'FLOOR':
                return this.toKannada(Math.floor(Number(args[0])));
            case 'CEIL':
                return this.toKannada(Math.ceil(Number(args[0])));
            case 'ABS':
                return this.toKannada(Math.abs(Number(args[0])));

            // Type conversion
            case 'TO_NUMBER':
                const numStr = String(args[0]);
                const arabicNum = this.lexer.kannadaToArabic(numStr);
                return parseFloat(arabicNum) || 0;
            case 'TO_STRING':
                return this.formatOutput(args[0]);

            // Array functions
            case 'PUSH':
                if (Array.isArray(args[0])) {
                    args[0].push(args[1]);
                    return args[0];
                }
                throw new Error('ಸೇರಿಸು ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಬೇಕು');
            case 'POP':
                if (Array.isArray(args[0])) {
                    return args[0].pop();
                }
                throw new Error('ತೆಗೆ ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಬೇಕು');
            case 'JOIN':
                if (Array.isArray(args[0])) {
                    const separator = args[1] !== undefined ? String(args[1]) : ', ';
                    return args[0].map(v => this.formatOutput(v)).join(separator);
                }
                throw new Error('ವಿಲೀನ ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಬೇಕು');

            // Date/Time functions
            case 'TODAY':
                const today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const yyyy = today.getFullYear();
                return `${this.toKannada(dd)}/${this.toKannada(mm)}/${this.toKannada(yyyy)}`;
            case 'TIME':
                const now = new Date();
                const hh = String(now.getHours()).padStart(2, '0');
                const min = String(now.getMinutes()).padStart(2, '0');
                const ss = String(now.getSeconds()).padStart(2, '0');
                return `${this.toKannada(hh)}:${this.toKannada(min)}:${this.toKannada(ss)}`;
            case 'YEAR':
                return this.toKannada(new Date().getFullYear());
            case 'MONTH':
                return this.toKannada(new Date().getMonth() + 1);
            case 'DAY':
                return this.toKannada(new Date().getDate());

            // Trigonometry functions (input in degrees)
            case 'SIN':
                const sinAngle = Number(args[0]) * (Math.PI / 180);
                return this.toKannada(Math.round(Math.sin(sinAngle) * 10000) / 10000);
            case 'COS':
                const cosAngle = Number(args[0]) * (Math.PI / 180);
                return this.toKannada(Math.round(Math.cos(cosAngle) * 10000) / 10000);
            case 'TAN':
                const tanAngle = Number(args[0]) * (Math.PI / 180);
                return this.toKannada(Math.round(Math.tan(tanAngle) * 10000) / 10000);

            // Additional string functions
            case 'SPLIT':
                const splitStr = String(args[0]);
                const delimiter = args[1] !== undefined ? String(args[1]) : ' ';
                return splitStr.split(delimiter);
            case 'REPLACE':
                const replaceStr = String(args[0]);
                const searchVal = String(args[1]);
                const replaceVal = args[2] !== undefined ? String(args[2]) : '';
                return replaceStr.split(searchVal).join(replaceVal);
            case 'INCLUDES':
                const mainStr = String(args[0]);
                const searchStr = String(args[1]);
                return mainStr.includes(searchStr) ? 'ಸತ್ಯ' : 'ಅಸತ್ಯ';
            case 'TRIM':
                return String(args[0]).trim();

            // Utility functions
            case 'TYPE':
                const val = args[0];
                if (val === null || val === undefined) return 'ಖಾಲಿ';
                if (typeof val === 'number') return 'ಸಂಖ್ಯೆ';
                if (typeof val === 'string') return 'ಪಠ್ಯ';
                if (typeof val === 'boolean') return 'ಬೂಲಿಯನ್';
                if (Array.isArray(val)) return 'ಪಟ್ಟಿ';
                return 'ಅಪರಿಚಿತ';

            // Math constants (with parentheses)
            case 'PI':
                return Math.PI;
            case 'EULER':
                return Math.E;

            // Array utilities
            case 'ARRAY_LENGTH':
                if (Array.isArray(args[0])) {
                    return this.toKannada(args[0].length);
                }
                if (typeof args[0] === 'string') {
                    return this.toKannada(args[0].length);
                }
                throw new Error('ಪಟ್ಟಿಯ_ಉದ್ದ ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಅಥವಾ ಪಠ್ಯ ಬೇಕು');
            case 'RANGE':
                const rangeStart = Number(args[0]);
                const rangeEnd = Number(args[1]);
                const rangeArr = [];
                for (let ri = rangeStart; ri <= rangeEnd; ri++) {
                    rangeArr.push(ri);
                }
                return rangeArr;

            // New math functions
            case 'LOG':
                if (args.length === 0) throw new Error('ಲಾಗ್ ಕಾರ್ಯಕ್ಕೆ ಸಂಖ್ಯೆ ಬೇಕು');
                if (args.length === 1) {
                    // Natural log (ln)
                    if (Number(args[0]) <= 0) throw new Error('ಲಾಗ್ ಕಾರ್ಯಕ್ಕೆ ಧನಾತ್ಮಕ ಸಂಖ್ಯೆ ಬೇಕು');
                    return this.toKannada(Math.round(Math.log(Number(args[0])) * 10000) / 10000);
                } else {
                    // Log with base: log(value, base)
                    const logVal = Number(args[0]);
                    const logBase = Number(args[1]);
                    if (logVal <= 0 || logBase <= 0 || logBase === 1) throw new Error('ಲಾಗ್ ಕಾರ್ಯಕ್ಕೆ ಮಾನ್ಯ ಸಂಖ್ಯೆಗಳು ಬೇಕು');
                    return this.toKannada(Math.round((Math.log(logVal) / Math.log(logBase)) * 10000) / 10000);
                }
            case 'FACTORIAL':
                if (args.length === 0) throw new Error('ಅಂಶ ಕಾರ್ಯಕ್ಕೆ ಸಂಖ್ಯೆ ಬೇಕು');
                const factN = Math.floor(Number(args[0]));
                if (factN < 0) throw new Error('ಅಂಶ ಕಾರ್ಯಕ್ಕೆ ಋಣಾತ್ಮಕವಲ್ಲದ ಸಂಖ್ಯೆ ಬೇಕು');
                if (factN > 170) throw new Error('ಅಂಶ ಕಾರ್ಯಕ್ಕೆ ೧೭೦ ಕ್ಕಿಂತ ಕಡಿಮೆ ಸಂಖ್ಯೆ ಬೇಕು');
                let factResult = 1;
                for (let fi = 2; fi <= factN; fi++) factResult *= fi;
                return this.toKannada(factResult);
            case 'AVERAGE':
                if (args.length === 0) throw new Error('ಸರಾಸರಿ ಕಾರ್ಯಕ್ಕೆ ಸಂಖ್ಯೆಗಳು ಬೇಕು');
                // If first arg is array, average the array
                if (Array.isArray(args[0])) {
                    const arr = args[0];
                    if (arr.length === 0) throw new Error('ಖಾಲಿ ಪಟ್ಟಿಯ ಸರಾಸರಿ ಲೆಕ್ಕಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ');
                    const avgSum = arr.reduce((a, b) => Number(a) + Number(b), 0);
                    return this.toKannada(Math.round((avgSum / arr.length) * 10000) / 10000);
                }
                // Otherwise average all arguments
                const avgSum = args.reduce((a, b) => Number(a) + Number(b), 0);
                return this.toKannada(Math.round((avgSum / args.length) * 10000) / 10000);

            // New string functions
            case 'REPEAT':
                if (args.length < 2) throw new Error('ಪುನರಾವರ್ತಿಸು ಕಾರ್ಯಕ್ಕೆ ಪಠ್ಯ ಮತ್ತು ಸಂಖ್ಯೆ ಬೇಕು');
                const repeatStr = String(args[0]);
                const repeatCount = Math.floor(Number(args[1]));
                if (repeatCount < 0) throw new Error('ಪುನರಾವರ್ತಿಸು ಸಂಖ್ಯೆ ಋಣಾತ್ಮಕವಾಗಿರಬಾರದು');
                if (repeatCount > 1000) throw new Error('ಪುನರಾವರ್ತಿಸು ಸಂಖ್ಯೆ ೧೦೦೦ ಮೀರಬಾರದು');
                return repeatStr.repeat(repeatCount);

            // New utility functions
            case 'DIGITS':
                if (args.length === 0) throw new Error('ಅಂಕಿಗಳು ಕಾರ್ಯಕ್ಕೆ ಸಂಖ್ಯೆ ಅಥವಾ ಪಠ್ಯ ಬೇಕು');
                const digitsStr = String(args[0]).replace(/[^0-9೦-೯]/g, '');
                return digitsStr.split('').map(d => {
                    const arabicDigit = this.lexer.kannadaDigits[d] || d;
                    return Number(arabicDigit);
                });

            // v2.3.0 functions
            case 'SUM':
                if (args.length === 0) throw new Error('ಮೊತ್ತ ಕಾರ್ಯಕ್ಕೆ ಸಂಖ್ಯೆಗಳು ಬೇಕು');
                if (Array.isArray(args[0])) {
                    if (args[0].length === 0) return this.toKannada(0);
                    return this.toKannada(args[0].reduce((a, b) => Number(a) + Number(b), 0));
                }
                return this.toKannada(args.reduce((a, b) => Number(a) + Number(b), 0));
            case 'IS_NUMBER':
                if (args.length === 0) throw new Error('ಸಂಖ್ಯೆಯೇ ಕಾರ್ಯಕ್ಕೆ ಮೌಲ್ಯ ಬೇಕು');
                const checkVal = args[0];
                if (typeof checkVal === 'number' && !isNaN(checkVal)) return 'ಸತ್ಯ';
                if (typeof checkVal === 'string') {
                    const parsed = parseFloat(this.lexer.kannadaToArabic(checkVal));
                    return (!isNaN(parsed) && isFinite(parsed)) ? 'ಸತ್ಯ' : 'ಅಸತ್ಯ';
                }
                return 'ಅಸತ್ಯ';
            case 'UNIQUE':
                if (args.length === 0) throw new Error('ವಿಶಿಷ್ಟ ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಬೇಕು');
                if (!Array.isArray(args[0])) throw new Error('ವಿಶಿಷ್ಟ ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಬೇಕು');
                return [...new Set(args[0])];
            case 'REVERSE_ARRAY':
                if (args.length === 0) throw new Error('ತಿರುಗಿಸು ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಬೇಕು');
                if (Array.isArray(args[0])) {
                    return [...args[0]].reverse();
                }
                return String(args[0]).split('').reverse().join('');
            case 'PAD':
                if (args.length < 2) throw new Error('ಪ್ಯಾಡ್ ಕಾರ್ಯಕ್ಕೆ ಪಠ್ಯ ಮತ್ತು ಉದ್ದ ಬೇಕು');
                const padStr = String(args[0]);
                const padLen = Math.floor(Number(args[1]));
                const padChar = args[2] !== undefined ? String(args[2]) : ' ';
                const padDir = args[3] !== undefined ? String(args[3]) : 'ಬಲ';
                if (padDir === 'ಎಡ') {
                    return padStr.padStart(padLen, padChar);
                }
                return padStr.padEnd(padLen, padChar);

            // Higher-order array functions
            case 'MAP':
                if (!Array.isArray(args[0])) throw new Error('ನಕ್ಷೆ ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಬೇಕು');
                const mapFnName = String(args[1]);
                return args[0].map(item => this.callUserFunction(mapFnName, [item]));
            case 'FILTER':
                if (!Array.isArray(args[0])) throw new Error('ಶೋಧಕ ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಬೇಕು');
                const filterFnName = String(args[1]);
                return args[0].filter(item => this.callUserFunction(filterFnName, [item]));
            case 'REDUCE':
                if (!Array.isArray(args[0])) throw new Error('ಕಡಿತ ಕಾರ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಬೇಕು');
                const reduceFnName = String(args[1]);
                const initial = args[2] !== undefined ? args[2] : 0;
                return args[0].reduce((acc, item) => this.callUserFunction(reduceFnName, [acc, item]), initial);

            default:
                // User-defined function
                if (name in this.functions) {
                    return this.callUserFunction(name, args);
                }

                // Variable as function (like print with variable)
                if (name === 'ಮುದ್ರಿಸು') {
                    return this.builtinPrint(args);
                }

                throw new Error(`ಅಪರಿಚಿತ ಕಾರ್ಯ: ${name}`);
        }
    }

    /**
     * Built-in print function
     */
    builtinPrint(args) {
        if (args.length === 0) {
            return '';
        }

        // Check if first arg is ALPHABET keyword result
        if (args.length === 1 && args[0] === 'ವರ್ಣಮಾಲೆ') {
            return this.builtinAlphabet();
        }

        const result = args.map(a => this.formatOutput(a)).join(' ');
        return result;
    }

    /**
     * Built-in alphabet function
     */
    builtinAlphabet() {
        const swara = 'ಸ್ವರಗಳು: ' + this.kannadaAlphabet.swaras.join(', ');
        const yogavaaha = 'ಯೋಗವಾಹಗಳು: ' + this.kannadaAlphabet.yogavahas.join(', ');
        const vyanjana = 'ವ್ಯಂಜನಗಳು: ' + this.kannadaAlphabet.vyanajanas.join(', ');
        return swara + '\n' + yogavaaha + '\n' + vyanjana;
    }

    /**
     * Built-in collect function - create array from string
     */
    builtinCollect(args) {
        const str = String(args[0]);
        const numbers = str.split(',').map(s => {
            const trimmed = s.trim();
            // Convert Kannada digits if present
            const arabic = this.lexer.kannadaToArabic(trimmed);
            return parseInt(arabic);
        }).filter(n => !isNaN(n));
        return numbers;
    }

    /**
     * Built-in search function - linear search
     */
    builtinSearch(args) {
        if (args.length < 2) {
            throw new Error('ಹುಡುಕು ಕಾರ್ಯಕ್ಕೆ ಎರಡು ಆರ್ಗ್ಯುಮೆಂಟ್‌ಗಳು ಬೇಕು');
        }

        const array = args[0];
        const target = args[1];

        if (!Array.isArray(array)) {
            throw new Error('ಮೊದಲ ಆರ್ಗ್ಯುಮೆಂಟ್ ಪಟ್ಟಿ ಆಗಿರಬೇಕು');
        }

        const index = array.indexOf(target);
        if (index === -1) {
            return `${this.toKannada(target)} ಸಂಖ್ಯೆ ಕಂಡುಬಂದಿಲ್ಲ`;
        }
        return `${this.toKannada(index)} ಸ್ಥಾನದಲ್ಲಿ ಸಂಖ್ಯೆ ${this.toKannada(target)} ಕಂಡುಬಂದಿದೆ`;
    }

    /**
     * Built-in swap function
     */
    builtinSwap(args, originalArgs) {
        if (args.length < 2) {
            throw new Error('ಬದಲಾವಣೆ ಕಾರ್ಯಕ್ಕೆ ಎರಡು ಆರ್ಗ್ಯುಮೆಂಟ್‌ಗಳು ಬೇಕು');
        }

        // Get variable names from original AST nodes
        const var1 = originalArgs[0].name;
        const var2 = originalArgs[1].name;

        if (!var1 || !var2) {
            throw new Error('ಬದಲಾವಣೆ ಕಾರ್ಯಕ್ಕೆ ವೇರಿಯಬಲ್ ಹೆಸರುಗಳು ಬೇಕು');
        }

        const temp = this.variables[var1];
        this.variables[var1] = this.variables[var2];
        this.variables[var2] = temp;

        return `${var1} ಮತ್ತು ${var2} ಅನ್ನು ಬದಲಾಯಿಸಲಾಗಿದೆ`;
    }

    /**
     * Built-in input function (simulated for static deployment)
     */
    builtinInput(args) {
        const prompt = args.length > 0 ? String(args[0]) : 'ಇನ್‌ಪುಟ್ ನೀಡಿ:';
        const result = window.prompt(prompt);
        return result || '';
    }

    /**
     * Call user-defined function
     */
    callUserFunction(name, args) {
        const func = this.functions[name];
        const previousVars = { ...this.variables };

        // Set parameters
        func.params.forEach((param, i) => {
            this.variables[param] = args[i];
        });

        try {
            this.execute(func.body);
        } catch (e) {
            if (e.type === 'Return') {
                this.variables = previousVars;
                return e.value;
            }
            throw e;
        }

        this.variables = previousVars;
        return null;
    }

    /**
     * Evaluate array indexing
     */
    evaluateIndex(node) {
        const array = this.evaluate(node.array);
        const index = this.evaluate(node.index);

        if (!Array.isArray(array)) {
            throw new Error('ಇಂಡೆಕ್ಸಿಂಗ್‌ಗೆ ಪಟ್ಟಿ ಬೇಕು');
        }

        if (index < 0 || index >= array.length) {
            throw new Error(`ಇಂಡೆಕ್ಸ್ ${index} ಪಟ್ಟಿಯ ಗಾತ್ರ ${array.length} ಮೀರಿದೆ`);
        }

        return array[Math.floor(index)];
    }

    /**
     * Format output value
     */
    formatOutput(value) {
        if (typeof value === 'number') {
            return this.toKannada(value);
        }
        if (Array.isArray(value)) {
            return '[' + value.map(v => this.formatOutput(v)).join(', ') + ']';
        }
        return String(value);
    }
}

export default KannadaRuntime;
