import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Brain, Keyboard, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { kannadaLipi } from '../lib/js/interpreter/index.js';
import { GUESS_OUTPUT, TYPING_DRILL } from '../data/games';
import './Games.css';

// Shuffle a copy of an array (Fisher–Yates) so questions/options vary per game.
const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

/* ── Game 1: Guess the Output ────────────────────────────── */
const GuessOutputGame = () => {
    const [questions, setQuestions] = useState(() => shuffle(GUESS_OUTPUT));
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [picked, setPicked] = useState(null);
    const [finished, setFinished] = useState(false);

    const q = questions[current];
    // Compute the real answer from the interpreter so it never drifts from code.
    // The interpreter emits Kannada numerals (೮), so convert the English-digit
    // options to Kannada before comparing/displaying.
    const correct = kannadaLipi.execute(q.code).output.trim();
    const options = q.options.map((o) => kannadaLipi.toKannada(o));

    const choose = (option) => {
        if (picked !== null) return;
        setPicked(option);
        if (option === correct) setScore((s) => s + 1);
    };

    const next = () => {
        if (current + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrent((c) => c + 1);
            setPicked(null);
        }
    };

    const restart = () => {
        setQuestions(shuffle(GUESS_OUTPUT));
        setCurrent(0);
        setScore(0);
        setPicked(null);
        setFinished(false);
    };

    if (finished) {
        return (
            <div className="game-result">
                <Trophy size={48} className="game-result-icon" />
                <h3>ಆಟ ಮುಗಿಯಿತು!</h3>
                <p className="game-score">ನಿಮ್ಮ ಅಂಕ: <strong>{score} / {questions.length}</strong></p>
                <button className="btn btn-primary" onClick={restart}>
                    <RotateCcw size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> ಮತ್ತೆ ಆಡಿ
                </button>
            </div>
        );
    }

    return (
        <div className="game-body">
            <div className="game-progress">
                ಪ್ರಶ್ನೆ {current + 1} / {questions.length} &nbsp;·&nbsp; ಅಂಕ: {score}
            </div>
            <p className="game-question-label">ಈ ಕೋಡ್ ಏನು ಮುದ್ರಿಸುತ್ತದೆ?</p>
            <pre className="game-code"><code>{q.code}</code></pre>
            <div className="game-options">
                {options.map((opt) => {
                    let cls = 'game-option';
                    if (picked !== null) {
                        if (opt === correct) cls += ' correct';
                        else if (opt === picked) cls += ' wrong';
                    }
                    return (
                        <button key={opt} className={cls} onClick={() => choose(opt)} disabled={picked !== null}>
                            {opt}
                            {picked !== null && opt === correct && <CheckCircle size={16} style={{ marginLeft: 6, verticalAlign: 'middle' }} />}
                            {picked !== null && opt === picked && opt !== correct && <XCircle size={16} style={{ marginLeft: 6, verticalAlign: 'middle' }} />}
                        </button>
                    );
                })}
            </div>
            {picked !== null && (
                <button className="btn btn-primary game-next" onClick={next}>
                    {current + 1 >= questions.length ? 'ಫಲಿತಾಂಶ ನೋಡಿ' : 'ಮುಂದಿನ ಪ್ರಶ್ನೆ →'}
                </button>
            )}
        </div>
    );
};

/* ── Game 2: Typing Drill ────────────────────────────────── */
const TypingGame = () => {
    const TOTAL_TIME = 30;
    const [words] = useState(() => shuffle(TYPING_DRILL));
    const [idx, setIdx] = useState(0);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [running, setRunning] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!running) return;
        if (timeLeft <= 0) {
            setRunning(false);
            return;
        }
        const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [running, timeLeft]);

    const start = () => {
        setIdx(0);
        setInput('');
        setScore(0);
        setTimeLeft(TOTAL_TIME);
        setRunning(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const target = words[idx % words.length];

    const onChange = (e) => {
        const val = e.target.value;
        if (val.trim() === target) {
            setScore((s) => s + 1);
            setIdx((i) => i + 1);
            setInput('');
        } else {
            setInput(val);
        }
    };

    if (!running && timeLeft <= 0) {
        return (
            <div className="game-result">
                <Trophy size={48} className="game-result-icon" />
                <h3>ಸಮಯ ಮುಗಿಯಿತು!</h3>
                <p className="game-score">ನೀವು ಟೈಪ್ ಮಾಡಿದ ಪದಗಳು: <strong>{score}</strong></p>
                <button className="btn btn-primary" onClick={start}>
                    <RotateCcw size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> ಮತ್ತೆ ಆಡಿ
                </button>
            </div>
        );
    }

    if (!running) {
        return (
            <div className="game-body game-center">
                <p className="game-question-label">೩೦ ಸೆಕೆಂಡಿನಲ್ಲಿ ಎಷ್ಟು ಕನ್ನಡ ಕೀವರ್ಡ್‌ಗಳನ್ನು ಟೈಪ್ ಮಾಡಬಲ್ಲಿರಿ?</p>
                <button className="btn btn-primary" onClick={start}>ಆರಂಭಿಸಿ</button>
            </div>
        );
    }

    return (
        <div className="game-body">
            <div className="game-progress">ಸಮಯ: {timeLeft}s &nbsp;·&nbsp; ಅಂಕ: {score}</div>
            <div className="typing-target">{target}</div>
            <input
                ref={inputRef}
                className="typing-input"
                value={input}
                onChange={onChange}
                placeholder="ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..."
                spellCheck="false"
                autoFocus
            />
            <p className="typing-hint">ಸರಿಯಾಗಿ ಟೈಪ್ ಮಾಡಿದಾಗ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮುಂದಿನ ಪದ ಬರುತ್ತದೆ.</p>
        </div>
    );
};

/* ── Games page shell ────────────────────────────────────── */
const GAMES = [
    { key: 'guess', label: 'ಔಟ್‌ಪುಟ್ ಊಹಿಸಿ', icon: Brain, desc: 'ಕೋಡ್ ನೋಡಿ ಫಲಿತಾಂಶ ಊಹಿಸಿ' },
    { key: 'typing', label: 'ಟೈಪಿಂಗ್ ಸವಾಲು', icon: Keyboard, desc: 'ಕನ್ನಡ ಕೀವರ್ಡ್‌ಗಳ ವೇಗದ ಟೈಪಿಂಗ್' }
];

const Games = () => {
    const [active, setActive] = useState('guess');

    return (
        <div className="games-page animate-in">
            <header className="page-header">
                <h1 className="page-header-title">
                    <span className="page-header-icon"><Gamepad2 size={28} /></span>
                    ಕನ್ನಡ ಆಟಗಳು
                </h1>
                <p className="page-header-subtitle">ಆಡುತ್ತಾ ಕನ್ನಡ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಕಲಿಯಿರಿ</p>
            </header>

            <div className="games-content">
                <div className="games-tabs">
                    {GAMES.map((g) => (
                        <button
                            key={g.key}
                            className={`game-tab ${active === g.key ? 'active' : ''}`}
                            onClick={() => setActive(g.key)}
                        >
                            <g.icon size={18} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                            <span className="game-tab-label">{g.label}</span>
                            <span className="game-tab-desc">{g.desc}</span>
                        </button>
                    ))}
                </div>

                <div className="game-panel panel">
                    {active === 'guess' && <GuessOutputGame />}
                    {active === 'typing' && <TypingGame />}
                </div>
            </div>
        </div>
    );
};

export default Games;
