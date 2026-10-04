/**
 * Checks a child's turtle drawing against a level goal.
 *
 * Shapes are compared by sampling points along every line/circle and snapping
 * them to a coarse grid, so ಮುಂದೆ(೫೦) twice matches ಮುಂದೆ(೧೦೦) once, and tiny
 * floating-point differences never matter. A left-handed (mirrored) drawing of
 * the same shape is accepted too.
 */

const CELL = 10;   // grid size in canvas units
const STEP = 3;    // sampling distance along a line

function cellsOf(turtle, mirror = false) {
    const cells = new Set();
    const add = (x, y) => {
        const mx = mirror ? -x : x;
        cells.add(`${Math.round(mx / CELL)},${Math.round(y / CELL)}`);
    };
    for (const c of (turtle && turtle.commands) || []) {
        if (c.type === 'line') {
            const len = Math.hypot(c.x2 - c.x1, c.y2 - c.y1);
            const n = Math.max(1, Math.ceil(len / STEP));
            for (let i = 0; i <= n; i++) {
                add(c.x1 + ((c.x2 - c.x1) * i) / n, c.y1 + ((c.y2 - c.y1) * i) / n);
            }
        } else if (c.type === 'circle') {
            const n = Math.max(12, Math.ceil((2 * Math.PI * c.r) / STEP));
            for (let i = 0; i < n; i++) {
                const a = (i / n) * Math.PI * 2;
                add(c.x + c.r * Math.cos(a), c.y + c.r * Math.sin(a));
            }
        }
    }
    return cells;
}

// Fraction of cells in `a` that have a neighbour (incl. itself) in `b`.
function coverage(a, b) {
    if (!a.size) return 0;
    let hit = 0;
    for (const key of a) {
        const [x, y] = key.split(',').map(Number);
        let found = false;
        for (let dx = -1; dx <= 1 && !found; dx++) {
            for (let dy = -1; dy <= 1 && !found; dy++) {
                if (b.has(`${x + dx},${y + dy}`)) found = true;
            }
        }
        if (found) hit++;
    }
    return hit / a.size;
}

export function shapeMatches(userTurtle, targetTurtle) {
    const user = cellsOf(userTurtle);
    if (!user.size) return false;
    for (const mirror of [false, true]) {
        const target = cellsOf(targetTurtle, mirror);
        // Must draw (almost) all of the target, and (almost) nothing extra.
        if (coverage(target, user) >= 0.97 && coverage(user, target) >= 0.95) return true;
    }
    return false;
}

/**
 * @returns {{ ok: boolean, reason?: string }}
 */
export function checkLevel(level, code, result, targetTurtle) {
    if (!result || !result.success) return { ok: false, reason: 'error' };
    for (const word of level.mustUse || []) {
        if (!code.includes(word)) return { ok: false, reason: 'mustUse', word };
    }
    const t = result.turtle;
    if (level.goal.type === 'reach') {
        if (!t) return { ok: false, reason: 'noMove' };
        const d = Math.hypot(t.final.x - level.goal.x, t.final.y - level.goal.y);
        return d <= 15 ? { ok: true } : { ok: false, reason: 'miss' };
    }
    if (!t) return { ok: false, reason: 'noDraw' };
    return shapeMatches(t, targetTurtle) ? { ok: true } : { ok: false, reason: 'shape' };
}
