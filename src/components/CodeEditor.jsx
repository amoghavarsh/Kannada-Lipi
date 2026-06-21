import React, { useState, useEffect, useRef } from 'react';
import { Play, Keyboard, Copy, Trash2, X, Share2 } from 'lucide-react';
import { kannadaLipi } from '../lib/js/interpreter/index.js';
import './CodeEditor.css';

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
            { label: 'ಗಣಿತ', chars: ['ಗರಿಷ್ಠ', 'ಕನಿಷ್ಠ', 'ವರ್ಗಮೂಲ', 'ಘಾತ', 'ಯಾದೃಚ್ಛಿಕ', 'ನಿರಪೇಕ್ಷ', 'ಲಾಗ್', 'ಅಂಶ', 'ಸರಾಸರಿ', 'ಮೊತ್ತ', 'ಪೈ', 'ಇ_ಸಂಖ್ಯೆ'] },
            { label: 'ಪರಿವರ್ತನೆ', chars: ['ಪೂರ್ಣಾಂಕ', 'ವರ್ಣಮಾಲೆ', 'ಸಂಖ್ಯೆಗೆ', 'ಪಠ್ಯಕ್ಕೆ', 'ಪ್ರಕಾರ', 'ಅಂಕಿಗಳು', 'ಸಂಖ್ಯೆಯೇ'] },
            { label: 'ಪಟ್ಟಿ', chars: ['ಏರಿಕೆ', 'ಇಳಿಕೆ', 'ಸಂಗ್ರಹಿಸು', 'ಹುಡುಕು', 'ಸೇರಿಸು', 'ತೆಗೆ', 'ವಿಲೀನ', 'ಪಟ್ಟಿಯ_ಉದ್ದ', 'ಶ್ರೇಣಿ', 'ವಿಶಿಷ್ಟ', 'ತಿರುಗಿಸು'] },
            { label: 'ಉನ್ನತ', chars: ['ನಕ್ಷೆ', 'ಶೋಧಕ', 'ಕಡಿತ'] },
            { label: 'ಪಠ್ಯ', chars: ['ಜೋಡಿಸು', 'ಉದ್ದ', 'ಪ್ರತಿಬಿಂಬ', 'ಕತ್ತರಿಸು', 'ವಿಭಜಿಸು', 'ಬದಲಿಸು', 'ಒಳಗೊಂಡಿದೆ', 'ಟ್ರಿಮ್', 'ಪುನರಾವರ್ತಿಸು', 'ಪ್ಯಾಡ್'] },
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

const CodeEditor = () => {
    const [code, setCode] = useState(() => {
        // A shared ?code=... in the URL takes priority so links open the right program.
        const params = new URLSearchParams(window.location.search);
        const shared = params.get('code');
        if (shared) {
            const decoded = decodeCode(shared);
            if (decoded !== null) return decoded;
        }
        return localStorage.getItem('kannadalipi_code') || 'ಮುದ್ರಿಸು("ನಮಸ್ಕಾರ, ಕರ್ನಾಟಕ!")\n\nಅ = ೧೦\nಆ = ೨೦\nಮುದ್ರಿಸು("ಮೊತ್ತ: " ಅ + ಆ)';
    });
    const [output, setOutput] = useState('');
    const [shareMsg, setShareMsg] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('letters');
    const textareaRef = useRef(null);

    useEffect(() => {
        localStorage.removeItem('kannadalipi_code');
    }, []);

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
                            <button className="btn btn-secondary" onClick={() => setKeyboardVisible(!isKeyboardVisible)}>
                                <Keyboard size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಕೀಬೋರ್ಡ್
                            </button>
                            <button className="btn btn-secondary" onClick={copyToClipboard}>
                                <Copy size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ನಕಲಿಸಿ
                            </button>
                            <button className="btn btn-secondary" onClick={shareCode}>
                                <Share2 size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಹಂಚಿಕೊಳ್ಳಿ
                            </button>
                            <button className="btn btn-secondary" onClick={clearCode}>
                                <Trash2 size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಅಳಿಸಿ
                            </button>
                        </div>
                        {shareMsg && <div className="share-msg">{shareMsg}</div>}
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
                                className="editor-textarea"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onScroll={handleScroll}
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
