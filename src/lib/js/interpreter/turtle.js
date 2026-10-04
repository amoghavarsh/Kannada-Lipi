/**
 * ಆಮೆ ಚಿತ್ರ (Turtle graphics) for KannadaLipi.
 *
 * The runtime records drawing commands here; the UI replays them on a canvas.
 * Coordinates: (0, 0) is the canvas centre, y grows upward.
 * Heading: 0° points up, turning right (ಬಲಕ್ಕೆ) is clockwise.
 */

export const TURTLE_LIMIT = 20000; // max drawing commands per run

// Kannada colour names → hex. Karnataka flag yellow/red come first.
export const TURTLE_COLORS = {
    'ಹಳದಿ': '#FFC800',
    'ಕೆಂಪು': '#D71920',
    'ಹಸಿರು': '#1E9E4A',
    'ನೀಲಿ': '#1F6FEB',
    'ಆಕಾಶನೀಲಿ': '#38BDF8',
    'ಕಪ್ಪು': '#111111',
    'ಬಿಳಿ': '#FFFFFF',
    'ಕಿತ್ತಳೆ': '#FF8C00',
    'ನೇರಳೆ': '#8B5CF6',
    'ಗುಲಾಬಿ': '#EC4899',
    'ಕಂದು': '#8B5A2B',
    'ಬೂದು': '#6B7280',
    'ಚಿನ್ನ': '#D4A017',
};

export const createTurtle = () => ({
    x: 0,
    y: 0,
    heading: 0,
    penDown: true,
    color: '#D71920',
    width: 3,
    visible: true,
    background: null,
    commands: [],
    used: false,
});

const num = (v, name) => {
    const n = Number(v);
    if (v === undefined || Number.isNaN(n)) {
        throw new Error(`${name} ಕಾರ್ಯಕ್ಕೆ ಸಂಖ್ಯೆ ಬೇಕು`);
    }
    return n;
};

const toColor = (v, name) => {
    if (v === undefined) throw new Error(`${name} ಕಾರ್ಯಕ್ಕೆ ಬಣ್ಣದ ಹೆಸರು ಬೇಕು (ಉದಾ: "ಕೆಂಪು")`);
    const s = String(v).trim();
    if (TURTLE_COLORS[s]) return TURTLE_COLORS[s];
    if (/^#[0-9a-fA-F]{3,8}$/.test(s) || /^[a-zA-Z]+$/.test(s)) return s;
    throw new Error(`"${s}" ಬಣ್ಣ ಗೊತ್ತಿಲ್ಲ. ಬಳಸಿ: ${Object.keys(TURTLE_COLORS).join(', ')}`);
};

const push = (t, cmd) => {
    t.used = true;
    if (t.commands.length >= TURTLE_LIMIT) {
        throw new Error('ಆಮೆ ಚಿತ್ರ ತುಂಬಾ ದೊಡ್ಡದಾಗಿದೆ (೨೦,೦೦೦ ಗೆರೆಗಳ ಮಿತಿ)');
    }
    t.commands.push(cmd);
};

const move = (t, dist) => {
    const rad = (t.heading * Math.PI) / 180;
    const nx = t.x + dist * Math.sin(rad);
    const ny = t.y + dist * Math.cos(rad);
    if (t.penDown) {
        push(t, { type: 'line', x1: t.x, y1: t.y, x2: nx, y2: ny, color: t.color, width: t.width });
    } else {
        push(t, { type: 'move', x: nx, y: ny });
    }
    t.x = nx;
    t.y = ny;
};

const turn = (t, deg) => {
    t.heading = (((t.heading + deg) % 360) + 360) % 360;
    push(t, { type: 'turn', heading: t.heading });
};

// Each command: (turtle, args[]) => void. Names are plain Kannada identifiers,
// so a user function with the same name always wins.
export const TURTLE_COMMANDS = {
    'ಮುಂದೆ': (t, a) => move(t, num(a[0], 'ಮುಂದೆ')),
    'ಹಿಂದೆ': (t, a) => move(t, -num(a[0], 'ಹಿಂದೆ')),
    'ಬಲಕ್ಕೆ': (t, a) => turn(t, num(a[0], 'ಬಲಕ್ಕೆ')),
    'ಎಡಕ್ಕೆ': (t, a) => turn(t, -num(a[0], 'ಎಡಕ್ಕೆ')),
    'ಬಣ್ಣ': (t, a) => { t.color = toColor(a[0], 'ಬಣ್ಣ'); t.used = true; },
    'ದಪ್ಪ': (t, a) => { t.width = Math.max(1, Math.min(40, num(a[0], 'ದಪ್ಪ'))); t.used = true; },
    'ಪೆನ್_ಮೇಲೆ': (t) => { t.penDown = false; t.used = true; },
    'ಪೆನ್_ಕೆಳಗೆ': (t) => { t.penDown = true; t.used = true; },
    'ವೃತ್ತ': (t, a) => {
        const r = Math.abs(num(a[0], 'ವೃತ್ತ'));
        push(t, { type: 'circle', x: t.x, y: t.y, r, color: t.color, width: t.width, fill: a[1] !== undefined ? toColor(a[1], 'ವೃತ್ತ') : null });
    },
    'ಚುಕ್ಕೆ': (t, a) => {
        const size = a[0] === undefined ? 8 : Math.abs(num(a[0], 'ಚುಕ್ಕೆ'));
        push(t, { type: 'dot', x: t.x, y: t.y, size, color: a[1] !== undefined ? toColor(a[1], 'ಚುಕ್ಕೆ') : t.color });
    },
    'ಹೋಗು': (t, a) => {
        const nx = num(a[0], 'ಹೋಗು');
        const ny = num(a[1], 'ಹೋಗು');
        if (t.penDown) push(t, { type: 'line', x1: t.x, y1: t.y, x2: nx, y2: ny, color: t.color, width: t.width });
        else push(t, { type: 'move', x: nx, y: ny });
        t.x = nx;
        t.y = ny;
    },
    'ಮನೆಗೆ': (t) => {
        t.x = 0; t.y = 0; t.heading = 0;
        push(t, { type: 'move', x: 0, y: 0 });
        push(t, { type: 'turn', heading: 0 });
    },
    'ದಿಕ್ಕು': (t, a) => {
        t.heading = (((num(a[0], 'ದಿಕ್ಕು')) % 360) + 360) % 360;
        push(t, { type: 'turn', heading: t.heading });
    },
    'ಹಿನ್ನೆಲೆ': (t, a) => { t.background = toColor(a[0], 'ಹಿನ್ನೆಲೆ'); t.used = true; },
    'ಆಮೆ_ಮರೆಮಾಡು': (t) => { t.visible = false; t.used = true; },
    'ಆಮೆ_ತೋರಿಸು': (t) => { t.visible = true; t.used = true; },
};

export const TURTLE_COMMAND_NAMES = Object.keys(TURTLE_COMMANDS);

/** Snapshot to hand to the UI (null when the program drew nothing). */
export const turtleResult = (t) => (t && t.used ? {
    commands: t.commands,
    final: { x: t.x, y: t.y, heading: t.heading, visible: t.visible },
    background: t.background,
} : null);
