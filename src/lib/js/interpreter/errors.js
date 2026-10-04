/**
 * Friendly errors for KannadaLipi.
 *
 * Turns raw parser/runtime messages (which mention token names like RPAREN)
 * into simple Kannada a school child can act on, plus a hint and, where
 * possible, a "did you mean" suggestion.
 */

const KN_DIGITS = ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'];
export const kn = (n) => String(n).replace(/[0-9]/g, (d) => KN_DIGITS[d]);

// Token type → what the child actually types.
const TOKEN_LABEL = {
    RPAREN: ')', LPAREN: '(', RBRACKET: ']', LBRACKET: '[', RBRACE: '}', LBRACE: '{',
    COLON: ':', COMMA: ',', EQUAL: '=', DOUBLE_EQUAL: '==', NOT_EQUAL: '!=',
    PLUS: '+', MINUS: '-', TIMES: '*', DIVIDE: '/', MODULO: '%',
    GREATER_THAN: '>', LESS_THAN: '<', GREATER_EQUAL: '>=', LESS_EQUAL: '<=',
    STRING: 'ಪಠ್ಯ ("...")', NUMBER: 'ಸಂಖ್ಯೆ', IDENTIFIER: 'ಹೆಸರು',
    NEWLINE: 'ಸಾಲಿನ ಅಂತ್ಯ', EOF: 'ಕೋಡ್‌ನ ಅಂತ್ಯ',
    IF: 'ಆದರೆ', ELSE: 'ಇಲ್ಲವಾದರೆ', WHILE: 'ಆವರ್ತನೆ', FOR: 'ಪುನರಾವರ್ತನೆ',
    FROM: 'ರಿಂದ', TO: 'ವರೆಗೆ', FUNCTION: 'ಕಾರ್ಯ', RETURN: 'ಹಿಂತಿರುಗಿಸು',
};
const label = (t) => TOKEN_LABEL[t] || t;

const LOOP_HINT = 'ಲೂಪ್ ಹೀಗೆ ಬರೆಯಿರಿ: ಪುನರಾವರ್ತನೆ ನ ೧ ರಿಂದ ೫ ವರೆಗೆ: ಮುದ್ರಿಸು(ನ)';

const HINT_BY_EXPECTED = {
    RPAREN: 'ತೆರೆದ ( ಆವರಣವನ್ನು ) ನಿಂದ ಮುಚ್ಚಲು ಮರೆತಿದ್ದೀರಾ? ಉದಾ: ಮುದ್ರಿಸು("ನಮಸ್ಕಾರ")',
    RBRACKET: 'ಪಟ್ಟಿಯನ್ನು ] ನಿಂದ ಮುಚ್ಚಿ. ಉದಾ: [೧, ೨, ೩]',
    RBRACE: 'ತೆರೆದ { ಗೆ ಸರಿಯಾದ } ಇದೆಯೇ ಪರಿಶೀಲಿಸಿ.',
    COLON: 'ಆದರೆ, ಆವರ್ತನೆ, ಪುನರಾವರ್ತನೆ ಮತ್ತು ಕಾರ್ಯ ನಂತರ : ಬೇಕು. ಉದಾ: ಆದರೆ ಅ > ೫: ಮುದ್ರಿಸು(ಅ)',
    FROM: LOOP_HINT,
    TO: LOOP_HINT,
    LPAREN: 'ಕಾರ್ಯದ ಹೆಸರಿನ ನಂತರ ( ಬೇಕು. ಉದಾ: ಕಾರ್ಯ ಸೇರಿಸಿ(ಅ, ಆ): ಹಿಂತಿರುಗಿಸು ಅ + ಆ',
    IDENTIFIER: 'ಇಲ್ಲಿ ಒಂದು ಹೆಸರು (ವೇರಿಯಬಲ್) ಬೇಕು. ಹೆಸರು ಕನ್ನಡ ಅಕ್ಷರದಿಂದ ಆರಂಭವಾಗಲಿ.',
    EQUAL: 'ವೇರಿಯಬಲ್‌ಗೆ ಮೌಲ್ಯ ಕೊಡಲು = ಬಳಸಿ. ಉದಾ: ಅ = ೧೦',
};

// Levenshtein distance; fine for short identifiers.
const distance = (a, b) => {
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
        const cur = [i];
        for (let j = 1; j <= n; j++) {
            cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        }
        prev = cur;
    }
    return prev[n];
};

export const suggest = (word, candidates) => {
    if (!word) return null;
    let best = null, bestD = Infinity;
    for (const c of candidates) {
        if (!c || c === word) continue;
        const d = distance(word, c);
        if (d < bestD) { bestD = d; best = c; }
    }
    const limit = Math.max(1, Math.floor(word.length / 3));
    return bestD <= limit ? best : null;
};

const SMART_DOUBLE = '“”„‟';
const SINGLE_QUOTES = '\'‘’';

/**
 * @param {string} raw  original error message
 * @param {object} ctx  { line, names: string[] }
 * @returns {{ message: string, hint: string|null, line: number|null }}
 */
export function friendlyError(raw, ctx = {}) {
    let message = String(raw || 'ಅಜ್ಞಾತ ದೋಷ');
    let hint = null;
    let line = ctx.line ?? null;

    const lineMatch = message.match(/ಸಾಲು (\d+)/);
    if (lineMatch) line = Number(lineMatch[1]);
    const where = line ? `ಸಾಲು ${kn(line)}: ` : '';

    let m;
    if ((m = message.match(/^ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ (\w+), ಆದರೆ (\w+) ಸಿಕ್ಕಿದೆ/))) {
        const [, want, got] = m;
        message = `${where}'${label(want)}' ಬೇಕಿತ್ತು, ಆದರೆ '${label(got)}' ಸಿಕ್ಕಿತು`;
        hint = HINT_BY_EXPECTED[want] || null;
    } else if ((m = message.match(/^ಅನಿರೀಕ್ಷಿತ ಟೋಕನ್ (\w+)/))) {
        const got = m[1];
        message = `${where}'${label(got)}' ಇಲ್ಲಿ ಅರ್ಥವಾಗಲಿಲ್ಲ`;
        if (got === 'EQUAL') hint = '= ಎಡಭಾಗದಲ್ಲಿ ಒಂದು ವೇರಿಯಬಲ್ ಹೆಸರು ಬೇಕು. ಹೋಲಿಸಲು == ಬಳಸಿ.';
        else if (got === 'NEWLINE' || got === 'EOF') hint = 'ಸಾಲು ಅರ್ಧಕ್ಕೆ ನಿಂತಿದೆ. ಕೊನೆಯ ಭಾಗ ಬಿಟ್ಟುಹೋಗಿದೆಯೇ?';
        else if (got === 'RPAREN' || got === 'RBRACKET' || got === 'RBRACE') hint = 'ಹೆಚ್ಚುವರಿ ಮುಚ್ಚುವ ಆವರಣ ಇದೆ, ಅಥವಾ ಅದರ ಮುಂದೆ ಮೌಲ್ಯ ಬಿಟ್ಟುಹೋಗಿದೆ.';
        else if (got === 'ELSE') hint = 'ಇಲ್ಲವಾದರೆ ಯಾವಾಗಲೂ ಆದರೆ ನಂತರ ಬರಬೇಕು.';
        else hint = 'ಈ ಪದ ಅಥವಾ ಚಿಹ್ನೆ ಸರಿಯಾದ ಜಾಗದಲ್ಲಿ ಇದೆಯೇ ಪರಿಶೀಲಿಸಿ.';
    } else if ((m = message.match(/^ಅಮಾನ್ಯ ಅಕ್ಷರ '(.)'/u))) {
        const ch = m[1];
        message = `${where}'${ch}' ಚಿಹ್ನೆ ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಇಲ್ಲ`;
        if (SMART_DOUBLE.includes(ch)) hint = 'ವಿಶೇಷ ಉದ್ಧರಣ ಚಿಹ್ನೆ ಬದಲು ನೇರ " ಬಳಸಿ.';
        else if (SINGLE_QUOTES.includes(ch)) hint = 'ಪಠ್ಯಕ್ಕೆ ಎರಡು ಉದ್ಧರಣ " ಬಳಸಿ. ಉದಾ: "ನಮಸ್ಕಾರ"';
        else if (ch === ';') hint = 'ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ; ಬೇಕಿಲ್ಲ. ಪ್ರತಿ ಹೇಳಿಕೆಯನ್ನು ಹೊಸ ಸಾಲಿನಲ್ಲಿ ಬರೆಯಿರಿ.';
        else hint = 'ಈ ಚಿಹ್ನೆಯನ್ನು ತೆಗೆದುಹಾಕಿ, ಅಥವಾ "..." ಒಳಗೆ ಇಡಿ.';
    } else if ((m = message.match(/^ಅಪರಿಚಿತ ಕಾರ್ಯ: (.+)$/)) || (m = message.match(/^"(.+)" ಎಂಬ ಕಾರ್ಯ ಕಂಡುಬಂದಿಲ್ಲ$/))) {
        const name = m[1];
        const s = suggest(name, ctx.names || []);
        message = `${where}"${name}" ಎಂಬ ಕಾರ್ಯ ಇಲ್ಲ`;
        hint = s
            ? `ನೀವು "${s}" ಎಂದು ಬರೆಯಲು ಬಯಸಿದ್ದಿರಾ?`
            : 'ಕಾರ್ಯವನ್ನು ಬಳಸುವ ಮೊದಲು "ಕಾರ್ಯ ಹೆಸರು(...): ..." ಎಂದು ಘೋಷಿಸಿ, ಅಥವಾ ಸಹಾಯ ಪುಟದಲ್ಲಿ ಹೆಸರು ನೋಡಿ.';
    } else if ((m = message.match(/^(\S+) ಕಂಡುಬಂದಿಲ್ಲ$/))) {
        const name = m[1];
        const s = suggest(name, ctx.names || []);
        message = `${where}"${name}" ಎಂಬ ವೇರಿಯಬಲ್ ಇನ್ನೂ ಇಲ್ಲ`;
        hint = s
            ? `ನೀವು "${s}" ಎಂದು ಬರೆಯಲು ಬಯಸಿದ್ದಿರಾ?`
            : `ಬಳಸುವ ಮೊದಲು ${name} = ... ಎಂದು ಮೌಲ್ಯ ಕೊಡಿ. ಪಠ್ಯವಾದರೆ "..." ಒಳಗೆ ಇಡಿ.`;
    } else if (message.includes('ಸೊನ್ನೆಯಿಂದ ವಿಭಜಿಸಲು')) {
        message = `${where}${message}`;
        hint = 'ಯಾವುದೇ ಸಂಖ್ಯೆಯನ್ನು ೦ ಇಂದ ಭಾಗಿಸಲು ಆಗುವುದಿಲ್ಲ. ಭಾಗಿಸುವ ಮೊದಲು ಆದರೆ ಬಳಸಿ ಪರಿಶೀಲಿಸಿ.';
    } else if (message.includes('ಅನಂತ ಲೂಪ್')) {
        message = `${where}${message}`;
        hint = 'ಲೂಪ್ ಎಂದಿಗೂ ನಿಲ್ಲುತ್ತಿಲ್ಲ. ಲೂಪ್ ಒಳಗೆ ವೇರಿಯಬಲ್ ಬದಲಾಯಿಸಲು ಮರೆತಿದ್ದೀರಾ? ಉದಾ: ನ = ನ + ೧';
    } else if (message.includes('ಅತಿ ಹೆಚ್ಚು ಬಾರಿ') || /call stack/i.test(message)) {
        message = `${where}ಕಾರ್ಯ ತನ್ನನ್ನು ತಾನೇ ನಿಲ್ಲದೆ ಕರೆಯುತ್ತಿದೆ`;
        hint = 'ತನ್ನನ್ನೇ ಕರೆಯುವ ಕಾರ್ಯಕ್ಕೆ ನಿಲ್ಲುವ ಷರತ್ತು ಬೇಕು. ಉದಾ: ಆದರೆ ನ == ೦: ಹಿಂತಿರುಗಿಸು ೧';
    } else if (/^ಇಂಡೆಕ್ಸ್ .* ಮೀರಿದೆ/.test(message)) {
        message = `${where}${message}`;
        hint = 'ಪಟ್ಟಿಯ ಮೊದಲ ಅಂಶದ ಇಂಡೆಕ್ಸ್ ೦. ಐದು ಅಂಶಗಳಿದ್ದರೆ ಕೊನೆಯದು ೪.';
    } else if (/^[\x00-\x7F]*$/.test(message)) {
        // Raw JavaScript error leaked through: never show English internals to a child.
        message = `${where}ಈ ಸಾಲನ್ನು ರನ್ ಮಾಡಲು ಆಗಲಿಲ್ಲ`;
        hint = 'ಕಾರ್ಯಕ್ಕೆ ಸರಿಯಾದ ಮೌಲ್ಯಗಳನ್ನು ಕೊಟ್ಟಿದ್ದೀರಾ ಎಂದು ಪರಿಶೀಲಿಸಿ.';
    } else {
        // Already a Kannada runtime message: drop the raw "ಸಾಲು N ರಲ್ಲಿ" and prefix the line.
        message = where + message.replace(/\s*ಸಾಲು \d+(, ಸ್ಥಾನ \d+)? ರಲ್ಲಿ/, '');
    }

    return { message, hint, line };
}
