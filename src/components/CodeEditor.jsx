import React, { useState, useEffect, useRef } from 'react';
import { Play, Keyboard, Copy, Trash2, X, Share2, Languages, Download, Upload } from 'lucide-react';
import { kannadaLipi } from '../lib/js/interpreter/index.js';
import './CodeEditor.css';

// Transliterate a plain English word → Kannada via Google Input Tools (free,
// no key). Returns the original word on any failure so typing never breaks.
const translitWord = async (word) => {
    if (!/^[a-zA-Z]+$/.test(word)) return word; // only pure latin words
    try {
        const url = `https://inputtools.google.com/request?text=${encodeURIComponent(word)}&itc=kn-t-i0-und&num=1`;
        const res = await fetch(url);
        const data = await res.json();
        if (data[0] === 'SUCCESS' && data[1]?.[0]?.[1]?.[0]) {
            return data[1][0][1][0];
        }
    } catch {
        /* offline or blocked → keep original */
    }
    return word;
};

// Encode/decode code to a URL-safe string. Uses encodeURIComponent so Kannada
// (multi-byte) survives btoa, then makes the base64 URL-safe.
const encodeCode = (text) => {
    try {
        return btoa(encodeURIComponent(text)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch {
        return '';
    }
};

const decodeCode = (encoded) => {
    try {
        const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        return decodeURIComponent(atob(b64));
    } catch {
        return null;
    }
};

// Keyboard layouts migrated from legacy keyboard.js - tabbed, comprehensive
const KEYBOARD_LAYOUTS = {
    letters: {
        title: 'ಅಕ್ಷರಗಳು',
        rows: [
            { label: 'ಸ್ವರಗಳು', chars: ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ'] },
            { label: 'ವ್ಯಂಜನ ೧', chars: ['ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ', 'ಟ', 'ಠ', 'ಡ'] },
            { label: 'ವ್ಯಂಜನ ೨', chars: ['ಢ', 'ಣ', 'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ'] },
            { label: 'ವ್ಯಂಜನ ೩', chars: ['ರ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ'] },
            { label: 'ಒತ್ತಕ್ಷರ / ಮಾತ್ರೆ', chars: ['ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', 'ಂ', 'ಃ', '್'] }
        ]
    },
    numbers: {
        title: 'ಸಂಖ್ಯೆ & ಚಿಹ್ನೆ',
        rows: [
            { label: 'ಕನ್ನಡ ಅಂಕಿ', chars: ['೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯', '೦'] },
            { label: 'ಅಂಕಿಗಳು', chars: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
            { label: 'ಕಾರ್ಯಾಚರಣೆ', chars: ['+', '-', '*', '/', '%', '=', '==', '!=', '<', '>'] },
            { label: 'ಚಿಹ್ನೆಗಳು', chars: ['(', ')', '[', ']', '{', '}', '"', ',', ':', '#'] }
        ]
    },
    functions: {
        title: 'ಕಾರ್ಯಗಳು',
        isKeyword: true,
        rows: [
            { label: 'ಮೂಲ', chars: ['ಮುದ್ರಿಸು', 'ಕೊಡು', 'ಒಟ್ಟು', 'ಎಣಿಕೆ'] },
            { label: 'ಗಣಿತ', chars: ['ಗರಿಷ್ಠ', 'ಕನಿಷ್ಠ', 'ವರ್ಗಮೂಲ', 'ಘಾತ', 'ಯಾದೃಚ್ಛಿಕ', 'ನಿರಪೇಕ್ಷ', 'ಲಾಗ್', 'ಅಂಶ', 'ಸರಾಸರಿ', 'ಮೊತ್ತ', 'ಪೈ', 'ಇ_ಸಂಖ್ಯೆ', 'ಸುತ್ತು', 'ಮಸಾಅ', 'ಲಸಾಅ', 'ಅವಿಭಾಜ್ಯವೇ', 'ಫಿಬೊನಾಚಿ'] },
            { label: 'ಪರಿವರ್ತನೆ', chars: ['ಪೂರ್ಣಾಂಕ', 'ವರ್ಣಮಾಲೆ', 'ಸಂಖ್ಯೆಗೆ', 'ಪಠ್ಯಕ್ಕೆ', 'ಪ್ರಕಾರ', 'ಅಂಕಿಗಳು', 'ಸಂಖ್ಯೆಯೇ'] },
            { label: 'ಪಟ್ಟಿ', chars: ['ಏರಿಕೆ', 'ಇಳಿಕೆ', 'ಸಂಗ್ರಹಿಸು', 'ಹುಡುಕು', 'ಸೇರಿಸು', 'ತೆಗೆ', 'ವಿಲೀನ', 'ಪಟ್ಟಿಯ_ಉದ್ದ', 'ಶ್ರೇಣಿ', 'ವಿಶಿಷ್ಟ', 'ತಿರುಗಿಸು'] },
            { label: 'ಉನ್ನತ', chars: ['ನಕ್ಷೆ', 'ಶೋಧಕ', 'ಕಡಿತ'] },
            { label: 'ನಿಘಂಟು', chars: ['ಕೀಗಳು', 'ಮೌಲ್ಯಗಳು', 'ಕೀ_ಇದೆಯೇ'] },
            { label: 'ಪಠ್ಯ', chars: ['ಜೋಡಿಸು', 'ಉದ್ದ', 'ಪ್ರತಿಬಿಂಬ', 'ಕತ್ತರಿಸು', 'ವಿಭಜಿಸು', 'ಬದಲಿಸು', 'ಒಳಗೊಂಡಿದೆ', 'ಟ್ರಿಮ್', 'ಪುನರಾವರ್ತಿಸು', 'ಪ್ಯಾಡ್', 'ಆರಂಭಿಸು', 'ಕೊನೆಗೊಳ್ಳು', 'ಸ್ಥಾನ', 'ಗಣನೆ', 'ಪದಗಳು'] },
            { label: 'ದಿನಾಂಕ', chars: ['ಇಂದು', 'ಸಮಯ', 'ವರ್ಷ', 'ತಿಂಗಳು', 'ದಿನ'] },
            { label: 'ತ್ರಿಕೋನಮಿತಿ', chars: ['ಸೈನ್', 'ಕೊಸೈನ್', 'ಟ್ಯಾನ್'] }
        ]
    },
    control: {
        title: 'ನಿಯಂತ್ರಣ',
        isKeyword: true,
        rows: [
            { label: 'ಷರತ್ತು', chars: ['ಆದರೆ', 'ಇಲ್ಲವಾದರೆ', 'ಸತ್ಯ', 'ಅಸತ್ಯ'] },
            { label: 'ಲೂಪ್', chars: ['ಆವರ್ತನೆ', 'ಪುನರಾವರ್ತನೆ', 'ರಿಂದ', 'ವರೆಗೆ'] },
            { label: 'ಕಾರ್ಯ', chars: ['ಕಾರ್ಯ', 'ಹಿಂತಿರುಗಿಸು', 'ನಿಲ್ಲಿಸು', 'ಮುಂದುವರಿಸು'] },
            { label: 'ತರ್ಕ', chars: ['ಮತ್ತು', 'ಅಥವಾ', 'ಅಲ್ಲ', 'ಬದಲಾವಣೆ'] }
        ]
    }
};

const KEYBOARD_TABS = [
    { key: 'letters', label: 'ಅಕ್ಷರ' },
    { key: 'numbers', label: '೧೨೩' },
    { key: 'functions', label: 'ಕಾರ್ಯ' },
    { key: 'control', label: 'ನಿಯಂತ್ರಣ' }
];

// The welcome demo that auto-types on the homepage editor.
const DEMO_CODE = 'ಮುದ್ರಿಸು("ನಮಸ್ಕಾರ, ಕರ್ನಾಟಕ!")\n\nಅ = ೧೦\nಆ = ೨೦\nಮುದ್ರಿಸು("ಮೊತ್ತ: " ಅ + ಆ)';

const CodeEditor = ({ autoDemo = false }) => {
    // If a ?code= link or saved code exists, that wins and we skip the demo.
    const sharedOrSaved = (() => {
        const params = new URLSearchParams(window.location.search);
        const shared = params.get('code');
        if (shared) { const d = decodeCode(shared); if (d !== null) return d; }
        return localStorage.getItem('kannadalipi_code');
    })();

    const shouldDemo = autoDemo && !sharedOrSaved;

    const [code, setCode] = useState(shouldDemo ? '' : (sharedOrSaved || DEMO_CODE));
    const [output, setOutput] = useState('');
    const [shareMsg, setShareMsg] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('letters');
    const [demoTyping, setDemoTyping] = useState(shouldDemo);
    const [translit, setTranslit] = useState(() => localStorage.getItem('kl_translit') === '1');
    const textareaRef = useRef(null);
    const demoTimers = useRef([]);

    const toggleTranslit = () => {
        setTranslit((prev) => {
            const next = !prev;
            localStorage.setItem('kl_translit', next ? '1' : '0');
            return next;
        });
        setTimeout(() => textareaRef.current?.focus(), 0);
    };

    // When transliteration is ON, typing a delimiter (space, newline, or a code
    // symbol like ( ) " etc.) converts the English word just typed into Kannada,
    // and preserves the EXACT delimiter the user typed — so no unwanted spaces
    // sneak into code (e.g. mudrisu( → ಮುದ್ರಿಸು( , kannada" → ಕನ್ನಡ").
    const handleTranslitKey = async (e) => {
        if (!translit) return;
        // Trigger on space, enter, or common code delimiters — but not on letters.
        const isDelim = e.key === ' ' || e.key === 'Enter' || /^[()[\]{}"',:;+\-*/%=<>#]$/.test(e.key);
        if (!isDelim) return;
        const ta = textareaRef.current;
        const pos = ta.selectionStart;
        if (pos !== ta.selectionEnd) return;
        const before = ta.value.slice(0, pos);
        const match = before.match(/([a-zA-Z]+)$/);
        if (!match) return;                            // no latin word → type normally

        e.preventDefault();                            // we insert the delimiter ourselves
        const word = match[1];
        const delim = e.key === 'Enter' ? '\n' : e.key;
        const converted = await translitWord(word);

        const head = ta.value.slice(0, pos);
        if (!head.endsWith(word)) return;              // changed mid-fetch → bail safely
        const newBefore = head.slice(0, head.length - word.length) + converted + delim;
        const after = ta.value.slice(pos);
        const result = newBefore + after;
        const newPos = newBefore.length;
        setCode(result);
        setTimeout(() => { ta.focus(); ta.setSelectionRange(newPos, newPos); }, 0);
    };

    useEffect(() => {
        localStorage.removeItem('kannadalipi_code');
    }, []);

    // Auto-type the demo (homepage only), then auto-run it. Any user keypress/
    // click cancels the demo instantly and hands control over.
    useEffect(() => {
        if (!shouldDemo) return;
        let i = 0;
        const step = () => {
            if (i <= DEMO_CODE.length) {
                setCode(DEMO_CODE.slice(0, i));
                i += 1;
                demoTimers.current.push(setTimeout(step, 55));
            } else {
                setDemoTyping(false);
                const result = kannadaLipi.execute(DEMO_CODE);
                setOutput(result.output);
            }
        };
        demoTimers.current.push(setTimeout(step, 500));
        return () => { demoTimers.current.forEach(clearTimeout); demoTimers.current = []; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cancelDemo = () => {
        if (!demoTyping) return;
        demoTimers.current.forEach(clearTimeout);
        demoTimers.current = [];
        setDemoTyping(false);
    };

    const runCode = () => {
        const result = kannadaLipi.execute(code);
        setOutput(result.output);
    };

    const clearCode = () => {
        if (window.confirm('ಕೋಡ್ ಅಳಿಸಬೇಕೇ?')) {
            setCode('');
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        alert('ಕೋಡ್ ನಕಲಿಸಲಾಗಿದೆ!');
    };

    const fileInputRef = useRef(null);

    // Save the current program as a .kl file (download, no backend).
    const saveFile = () => {
        const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'kannada-lipi.kl';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Open a .kl (or .txt) file back into the editor.
    const openFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            cancelDemo();
            setCode(String(ev.target.result || ''));
            setOutput('');
        };
        reader.readAsText(file);
        e.target.value = ''; // allow re-opening the same file
    };

    const shareCode = async () => {
        const url = `${window.location.origin}${window.location.pathname}?code=${encodeCode(code)}`;
        const shareData = { title: 'ಕನ್ನಡ ಲಿಪಿ', text: 'ನನ್ನ ಕನ್ನಡ ಕೋಡ್ ನೋಡಿ!', url };
        // Use the native share sheet on mobile; fall back to clipboard on desktop.
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch {
                // user cancelled or share failed — fall through to clipboard
            }
        }
        try {
            await navigator.clipboard.writeText(url);
            setShareMsg('ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ! ಈಗ ಹಂಚಿಕೊಳ್ಳಿ 🎉');
        } catch {
            setShareMsg('ಲಿಂಕ್: ' + url);
        }
        setTimeout(() => setShareMsg(''), 4000);
    };

    const insertText = (text) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newCode = code.substring(0, start) + text + code.substring(end);
        setCode(newCode);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + text.length, start + text.length);
        }, 0);
    };

    const handleBackspace = () => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (start === end && start > 0) {
            setCode(code.slice(0, start - 1) + code.slice(end));
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start - 1, start - 1);
            }, 0);
        } else if (start !== end) {
            setCode(code.slice(0, start) + code.slice(end));
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start, start);
            }, 0);
        }
    };

    const lineNumbersRef = useRef(null);

    const handleScroll = (e) => {
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = e.target.scrollTop;
        }
    };

    const currentLayout = KEYBOARD_LAYOUTS[activeTab];

    return (
        <div className="code-editor-section panel">
            <div className="main-editor-area">
                <div className="editor-column">
                    <div className="editor-controls">
                        <div className="btn-group">
                            <button className="btn btn-primary run-btn" onClick={runCode}>
                                <Play size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ರನ್ ಮಾಡಿ
                            </button>
                            <button
                                className={`btn ${translit ? 'btn-accent' : 'btn-secondary'} translit-toggle`}
                                onClick={toggleTranslit}
                                title="English ಟೈಪ್ ಮಾಡಿ, ಕನ್ನಡ ಬರುತ್ತದೆ (namaskara → ನಮಸ್ಕಾರ)"
                            >
                                <Languages size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> {translit ? 'ಕನ್ನಡ ✓' : 'EN→ಕ'}
                            </button>
                            <button className="btn btn-secondary" onClick={() => setKeyboardVisible(!isKeyboardVisible)}>
                                <Keyboard size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಕೀಬೋರ್ಡ್
                            </button>
                            <button className="btn btn-secondary" onClick={copyToClipboard}>
                                <Copy size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ನಕಲಿಸಿ
                            </button>
                            <button className="btn btn-secondary" onClick={shareCode}>
                                <Share2 size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಹಂಚಿಕೊಳ್ಳಿ
                            </button>
                            <button className="btn btn-secondary" onClick={saveFile} title="ಕೋಡ್ ಅನ್ನು .kl ಫೈಲ್ ಆಗಿ ಉಳಿಸಿ">
                                <Download size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಉಳಿಸಿ
                            </button>
                            <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()} title=".kl ಫೈಲ್ ತೆರೆಯಿರಿ">
                                <Upload size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ತೆರೆಯಿರಿ
                            </button>
                            <input ref={fileInputRef} type="file" accept=".kl,.txt,text/plain" onChange={openFile} style={{ display: 'none' }} />
                            <button className="btn btn-secondary" onClick={clearCode}>
                                <Trash2 size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಅಳಿಸಿ
                            </button>
                        </div>
                        {shareMsg && <div className="share-msg">{shareMsg}</div>}
                        {translit && <div className="translit-hint">💡 English ಟೈಪ್ ಮಾಡಿ, space ಒತ್ತಿ — ಕನ್ನಡ ಬರುತ್ತದೆ (ಉದಾ: <b>namaskara</b> → ನಮಸ್ಕಾರ). ಇದಕ್ಕೆ ಇಂಟರ್ನೆಟ್ ಬೇಕು.</div>}
                    </div>

                    <div className="editor-with-keyboard">
                        <div className={`editor-container${isKeyboardVisible ? ' keyboard-open' : ''}`}>
                            <div className="line-numbers" ref={lineNumbersRef}>
                                {code.split('\n').map((_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                            <textarea
                                ref={textareaRef}
                                className={`editor-textarea${demoTyping ? ' demo-typing' : ''}`}
                                value={code}
                                onChange={(e) => { cancelDemo(); setCode(e.target.value); }}
                                onScroll={handleScroll}
                                onMouseDown={cancelDemo}
                                onKeyDown={(e) => { cancelDemo(); handleTranslitKey(e); }}
                                readOnly={demoTyping}
                                spellCheck="false"
                                placeholder="ಇಲ್ಲಿ ನಿಮ್ಮ ಕೋಡ್ ಬರೆಯಿರಿ..."
                            />
                        </div>

                        {isKeyboardVisible && (
                            <div className="virtual-keyboard">
                                <div className="keyboard-header">
                                    <span className="keyboard-title">{currentLayout.title}</span>
                                    <button className="keyboard-close" onClick={() => setKeyboardVisible(false)}><X size={16} /></button>
                                </div>
                                <div className="keyboard-tabs">
                                    {KEYBOARD_TABS.map((tab) => (
                                        <button
                                            key={tab.key}
                                            className={`keyboard-tab${activeTab === tab.key ? ' active' : ''}`}
                                            onClick={() => setActiveTab(tab.key)}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="keyboard-keys">
                                    {currentLayout.rows.map((row, ri) => (
                                        <div key={ri} className="keys-row">
                                            <span className="keys-row-label">{row.label}</span>
                                            {row.chars.map((char, ci) => (
                                                <button
                                                    key={ci}
                                                    className={`key${currentLayout.isKeyword ? ' key-keyword' : ''}`}
                                                    onClick={() => insertText(char)}
                                                >
                                                    {char}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div className="keyboard-actions">
                                    <button className="keyboard-action" onClick={handleBackspace} title="Backspace">⌫</button>
                                    <button className="keyboard-action keyboard-action-wide" onClick={() => insertText(' ')} title="Space">Space</button>
                                    <button className="keyboard-action" onClick={() => insertText('\n')} title="New Line">↵</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="output-panel">
                    <h4 className="output-label">
                        ಔಟ್‌ಪುಟ್ (Output)
                    </h4>
                    <div className="output-screen">
                        {output || 'ಕೋಡ್ ರನ್ ಮಾಡಿದಾಗ ಇಲ್ಲಿ ಫಲಿತಾಂಶ ಕಾಣಿಸುತ್ತದೆ...'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
