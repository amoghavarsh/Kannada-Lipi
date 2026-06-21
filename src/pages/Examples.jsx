import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Code, Play, Copy, CheckCircle, Search, Hand, Hash, FileText, GitBranch,
    BarChart3, Type, Trophy, Calendar, Triangle, RefreshCw, Scissors, Circle,
    Ruler, Link as LinkIcon, Microscope, Repeat, Plus, BookOpen, Sprout,
    Brain, Landmark
} from 'lucide-react';
import { EXAMPLES, EXAMPLE_CATEGORIES } from '../data/examples';
import './Examples.css';

const ICON_MAP = {
    Hand, Hash, FileText, GitBranch, BarChart3, Type, Trophy, Calendar,
    Triangle, RefreshCw, Scissors, Circle, Ruler, Link: LinkIcon, Microscope,
    Repeat, Plus, Search, BookOpen, Sprout, Brain, Landmark, Code
};

const DataIcon = ({ iconKey, size = 16 }) => {
    const Icon = ICON_MAP[iconKey];
    return Icon ? <Icon size={size} style={{ verticalAlign: 'middle', marginRight: 4 }} /> : null;
};

const Examples = () => {
    const [filter, setFilter] = useState('all');
    const [copiedId, setCopiedId] = useState(null);
    const navigate = useNavigate();

    const filteredExamples = filter === 'all'
        ? EXAMPLES
        : EXAMPLES.filter(ex => ex.category === filter);

    const tryExample = (code) => {
        localStorage.setItem('kannadalipi_code', code);
        navigate('/');
    };

    const copyCode = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const highlightCode = (code) => {
        return code.split('\n').map((line, i) => {
            if (line.trim().startsWith('#')) {
                return <div key={i} className="code-line comment">{line}</div>;
            }
            // Basic highlighting for strings
            const parts = line.split(/("[^"]*")/g);
            return (
                <div key={i} className="code-line">
                    {parts.map((part, j) => {
                        if (part.startsWith('"')) {
                            return <span key={j} className="code-string">{part}</span>;
                        }
                        return part;
                    })}
                </div>
            );
        });
    };

    return (
        <div className="examples-page animate-in">
            {/* Examples Header */}
            <header className="page-header">
                <h1 className="page-header-title">
                    <span className="page-header-icon"><Code size={28} /></span>
                    ಕೋಡ್ ಉದಾಹರಣೆಗಳು
                </h1>
                <p className="page-header-subtitle">ವಿವಿಧ ಉದಾಹರಣೆಗಳ ಮೂಲಕ ಕನ್ನಡ ಲಿಪಿಯ ಶಕ್ತಿಯನ್ನು ನೋಡಿ</p>
            </header>

            <div className="examples-content">
                {/* Stats Bar */}
                <div className="examples-stats">
                    <span className="stat-text">
                        <strong>{filteredExamples.length}</strong> ಉದಾಹರಣೆಗಳು
                    </span>
                    <span className="stat-text">
                        <strong>{EXAMPLE_CATEGORIES.length - 1}</strong> ವರ್ಗಗಳು
                    </span>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar">
                    {EXAMPLE_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                            onClick={() => setFilter(cat.id)}
                        >
                            <DataIcon iconKey={cat.iconKey} size={14} /> {cat.label}
                        </button>
                    ))}
                </div>

                {/* Examples Grid */}
                <div className="examples-grid">
                    {filteredExamples.map(example => (
                        <article key={example.id} className="example-card">
                            <div className="example-header">
                                <span className="example-title">
                                    <DataIcon iconKey={example.iconKey} /> {example.title}
                                </span>
                                <span className="category-tag">
                                    {example.categoryLabel}
                                </span>
                            </div>
                            <div className="example-code-container">
                                <pre className="example-code">
                                    <code>{highlightCode(example.code)}</code>
                                </pre>
                            </div>
                            <div className="example-footer">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => tryExample(example.code)}
                                >
                                    <Play size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಪ್ರಯತ್ನಿಸಿ
                                </button>
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => copyCode(example.code, example.id)}
                                >
                                    {copiedId === example.id ? <><CheckCircle size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ನಕಲಿಸಲಾಗಿದೆ</> : <><Copy size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ನಕಲಿಸಿ</>}
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* No Results */}
                {filteredExamples.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-icon"><Search size={48} /></div>
                        <h3>ಯಾವುದೇ ಉದಾಹರಣೆಗಳಿಲ್ಲ</h3>
                        <p className="text-secondary">ಬೇರೆ ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Examples;
