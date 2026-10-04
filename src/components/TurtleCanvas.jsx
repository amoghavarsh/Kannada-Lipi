import React, { useEffect, useRef, useState } from 'react';
import { Download, RotateCcw, Gauge } from 'lucide-react';
import './TurtleCanvas.css';

/**
 * ಆಮೆ ಚಿತ್ರ canvas. Replays turtle commands from the interpreter.
 *
 * Props:
 *  - turtle:   result.turtle from kannadaLipi.execute (or null)
 *  - goals:    optional [{ x, y, r, kind: 'mango' | 'flag' }] markers for levels
 *  - ghost:    optional turtle result drawn faintly as the target shape
 *  - animate:  draw step by step (default true)
 *  - onDone:   called after the animation finishes
 *  - compact:  smaller toolbar for embedding in the editor
 */
const WORLD = 400; // logical units, (0,0) at centre, -200..200
const SPEEDS = [
    { key: 'slow', label: 'ನಿಧಾನ', perFrame: 1 },
    { key: 'normal', label: 'ಸಾಧಾರಣ', perFrame: 4 },
    { key: 'fast', label: 'ವೇಗ', perFrame: 40 },
];

// Stable default so the draw effect doesn't restart on every parent render.
const NO_GOALS = [];

const toCanvas = (x, y, s) => [(x + WORLD / 2) * s, (WORLD / 2 - y) * s];

function drawGrid(ctx, s, dark) {
    ctx.save();
    ctx.strokeStyle = dark ? 'rgba(255,255,255,0.06)' : 'rgba(30,30,46,0.07)';
    ctx.lineWidth = 1;
    for (let v = -200; v <= 200; v += 50) {
        const [x1, y1] = toCanvas(v, -200, s);
        const [x2, y2] = toCanvas(v, 200, s);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        const [a1, b1] = toCanvas(-200, v, s);
        const [a2, b2] = toCanvas(200, v, s);
        ctx.beginPath(); ctx.moveTo(a1, b1); ctx.lineTo(a2, b2); ctx.stroke();
    }
    // centre cross
    ctx.strokeStyle = dark ? 'rgba(255,215,0,0.25)' : 'rgba(215,25,32,0.18)';
    const [cx, cy] = toCanvas(0, 0, s);
    ctx.beginPath(); ctx.moveTo(cx - 8 * s, cy); ctx.lineTo(cx + 8 * s, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - 8 * s); ctx.lineTo(cx, cy + 8 * s); ctx.stroke();
    ctx.restore();
}

function drawCommand(ctx, c, s) {
    if (c.type === 'line') {
        const [x1, y1] = toCanvas(c.x1, c.y1, s);
        const [x2, y2] = toCanvas(c.x2, c.y2, s);
        ctx.strokeStyle = c.color;
        ctx.lineWidth = c.width * s;
        ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    } else if (c.type === 'circle') {
        const [x, y] = toCanvas(c.x, c.y, s);
        ctx.beginPath(); ctx.arc(x, y, c.r * s, 0, Math.PI * 2);
        if (c.fill) { ctx.fillStyle = c.fill; ctx.fill(); }
        ctx.strokeStyle = c.color; ctx.lineWidth = c.width * s; ctx.stroke();
    } else if (c.type === 'dot') {
        const [x, y] = toCanvas(c.x, c.y, s);
        ctx.fillStyle = c.color;
        ctx.beginPath(); ctx.arc(x, y, (c.size / 2) * s, 0, Math.PI * 2); ctx.fill();
    }
}

// A small top-down turtle: yellow shell with a red rim (Karnataka flag colours).
function drawTurtle(ctx, x, y, heading, s) {
    const [cx, cy] = toCanvas(x, y, s);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((heading * Math.PI) / 180);
    ctx.scale(s, s);
    ctx.fillStyle = '#3F8F3A';
    // head
    ctx.beginPath(); ctx.ellipse(0, -15, 4.5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    // legs
    [[-9, -7], [9, -7], [-9, 7], [9, 7]].forEach(([lx, ly]) => {
        ctx.beginPath(); ctx.ellipse(lx, ly, 3.5, 2.6, 0, 0, Math.PI * 2); ctx.fill();
    });
    // shell
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#D71920';
    ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.ellipse(0, 0, 9, 11, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(215,25,32,0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(0, 11); ctx.moveTo(-9, 0); ctx.lineTo(9, 0); ctx.stroke();
    ctx.restore();
}

function drawGoal(ctx, g, s) {
    const [x, y] = toCanvas(g.x, g.y, s);
    const r = (g.r || 18) * s;
    ctx.save();
    if (g.kind === 'flag') {
        ctx.strokeStyle = '#555'; ctx.lineWidth = 2 * s;
        ctx.beginPath(); ctx.moveTo(x - r * 0.4, y + r); ctx.lineTo(x - r * 0.4, y - r); ctx.stroke();
        ctx.fillStyle = '#FFD700'; ctx.fillRect(x - r * 0.4, y - r, r * 1.2, r * 0.45);
        ctx.fillStyle = '#D71920'; ctx.fillRect(x - r * 0.4, y - r * 0.55, r * 1.2, r * 0.45);
    } else {
        // mango
        ctx.fillStyle = 'rgba(255,200,0,0.18)';
        ctx.beginPath(); ctx.arc(x, y, r * 1.35, 0, Math.PI * 2); ctx.fill();
        const grad = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
        grad.addColorStop(0, '#FFC800'); grad.addColorStop(1, '#FF7A00');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.ellipse(x, y, r * 0.72, r * 0.9, -0.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#2E8B3E';
        ctx.beginPath(); ctx.ellipse(x + r * 0.35, y - r * 0.85, r * 0.35, r * 0.16, -0.6, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
}

const TurtleCanvas = ({ turtle, goals = NO_GOALS, ghost = null, animate = true, onDone, compact = false }) => {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);
    const rafRef = useRef(null);
    const [speed, setSpeed] = useState(() => {
        try { return localStorage.getItem('kl_turtle_speed') || 'normal'; } catch { return 'normal'; }
    });
    const [replayKey, setReplayKey] = useState(0);
    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;
        const cssSize = Math.min(wrapRef.current?.clientWidth || WORLD, compact ? 280 : 520);
        const dpr = window.devicePixelRatio || 1;
        canvas.width = cssSize * dpr;
        canvas.height = cssSize * dpr;
        canvas.style.width = `${cssSize}px`;
        canvas.style.height = `${cssSize}px`;
        const ctx = canvas.getContext('2d');
        const s = (cssSize * dpr) / WORLD;
        const dark = isDark();
        const commands = turtle?.commands || [];
        const bg = turtle?.background || (dark ? '#1b1b2a' : '#FFFDF6');

        const paintBase = () => {
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawGrid(ctx, s, dark || (turtle?.background && turtle.background !== '#FFFFFF'));
            if (ghost) {
                ctx.save(); ctx.globalAlpha = 0.22;
                ghost.commands.forEach((c) => drawCommand(ctx, { ...c, color: dark ? '#FFD700' : '#999', width: Math.max(c.width || 3, 6) }, s));
                ctx.restore();
            }
            goals.forEach((g) => drawGoal(ctx, g, s));
        };

        // Track turtle pose as commands replay.
        let pose = { x: 0, y: 0, heading: 0 };
        const applyPose = (c) => {
            if (c.type === 'line') pose = { ...pose, x: c.x2, y: c.y2 };
            else if (c.type === 'move') pose = { ...pose, x: c.x, y: c.y };
            else if (c.type === 'turn') pose = { ...pose, heading: c.heading };
        };

        const finish = () => {
            paintBase();
            commands.forEach((c) => drawCommand(ctx, c, s));
            const f = turtle?.final || { x: 0, y: 0, heading: 0, visible: true };
            if (f.visible !== false) drawTurtle(ctx, f.x, f.y, f.heading, s);
            onDone && onDone();
        };

        cancelAnimationFrame(rafRef.current);
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!animate || reduceMotion || !commands.length) { finish(); return undefined; }

        const perFrame = (SPEEDS.find((sp) => sp.key === speed) || SPEEDS[1]).perFrame;
        let i = 0;
        const step = () => {
            paintBase();
            const end = Math.min(commands.length, i + perFrame);
            pose = { x: 0, y: 0, heading: 0 };
            for (let k = 0; k < end; k++) { drawCommand(ctx, commands[k], s); applyPose(commands[k]); }
            drawTurtle(ctx, pose.x, pose.y, pose.heading, s);
            i = end;
            if (i < commands.length) rafRef.current = requestAnimationFrame(step);
            else finish();
        };
        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turtle, ghost, goals, speed, replayKey, animate, compact]);

    const changeSpeed = () => {
        const idx = SPEEDS.findIndex((sp) => sp.key === speed);
        const next = SPEEDS[(idx + 1) % SPEEDS.length].key;
        setSpeed(next);
        try { localStorage.setItem('kl_turtle_speed', next); } catch { /* ignore */ }
    };

    const download = () => {
        const a = document.createElement('a');
        a.href = canvasRef.current.toDataURL('image/png');
        a.download = 'kannada-lipi-ame-chitra.png';
        a.click();
    };

    return (
        <div className={`turtle-canvas${compact ? ' compact' : ''}`} ref={wrapRef}>
            <canvas ref={canvasRef} role="img" aria-label="ಆಮೆ ಚಿತ್ರ - turtle drawing" />
            <div className="turtle-toolbar">
                <button type="button" className="turtle-tool" onClick={() => setReplayKey((k) => k + 1)} title="ಮತ್ತೆ ತೋರಿಸು">
                    <RotateCcw size={14} /> <span>ಮತ್ತೆ</span>
                </button>
                <button type="button" className="turtle-tool" onClick={changeSpeed} title="ವೇಗ ಬದಲಿಸಿ">
                    <Gauge size={14} /> <span>{(SPEEDS.find((sp) => sp.key === speed) || SPEEDS[1]).label}</span>
                </button>
                <button type="button" className="turtle-tool" onClick={download} title="ಚಿತ್ರ ಉಳಿಸಿ (PNG)">
                    <Download size={14} /> <span>ಉಳಿಸಿ</span>
                </button>
            </div>
        </div>
    );
};

export default TurtleCanvas;
