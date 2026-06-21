/**
 * KannadaLipi Interpreter - Main Entry Point
 * Combines Lexer, Parser, and Runtime to execute Kannada code
 */
import KannadaLexer from './lexer.js';
import KannadaParser from './parser.js';
import KannadaRuntime from './runtime.js';

class KannadaLipi {
    constructor() {
        this.lexer = new KannadaLexer();
        this.runtime = new KannadaRuntime();
    }

    /**
     * Execute Kannada source code
     * @param {string} source - The Kannada source code to execute
     * @returns {object} - Result containing output or error
     */
    execute(source) {
        try {
            // Tokenize
            const tokens = this.lexer.tokenize(source);

            // Parse
            const parser = new KannadaParser(tokens);
            const ast = parser.parse();

            // Execute
            const output = this.runtime.run(ast);

            return {
                success: true,
                output: output,
                variables: { ...this.runtime.variables }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                output: `ದೋಷ: ${error.message}`
            };
        }
    }

    /**
     * Get current variables
     */
    getVariables() {
        return { ...this.runtime.variables };
    }

    /**
     * Reset the interpreter state
     */
    reset() {
        this.runtime.variables = {};
        this.runtime.functions = {};
        this.runtime.output = [];
    }

    /**
     * Convert number to Kannada
     */
    toKannada(num) {
        return this.lexer.toKannada(num);
    }

    /**
     * Get list of keywords
     */
    getKeywords() {
        return Object.keys(this.lexer.keywords);
    }
}

// Create global instance (for convenience but exporting default as well)
const instance = new KannadaLipi();
export { instance as kannadaLipi };
export default KannadaLipi;
