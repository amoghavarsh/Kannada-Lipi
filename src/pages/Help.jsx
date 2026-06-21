import React, { useState, useEffect } from 'react';
import {
    BookOpen, Zap, RefreshCw, Hash, Scale, Link as LinkIcon,
    GitBranch, Repeat, Search, Lightbulb, Menu, X, Upload, Triangle,
    FileText, Clock, BarChart3, ClipboardList
} from 'lucide-react';
import { FUNCTION_CATEGORIES, OPERATORS, CONTROL_FLOW } from '../data/functions';
import './Help.css';

const FUNC_ICONS = {
    Upload, Hash, Triangle, FileText, Clock, BarChart3, RefreshCw,
    ClipboardList, Link: LinkIcon
};

const FuncIcon = ({ iconKey, size = 16 }) => {
    const Icon = FUNC_ICONS[iconKey];
    return Icon ? <Icon size={size} style={{ verticalAlign: 'middle', marginRight: 4 }} /> : null;
};

const Help = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState('intro');
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
        );

        document.querySelectorAll('section[id]').forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const filteredCategories = FUNCTION_CATEGORIES.map(cat => ({
        ...cat,
        functions: cat.functions.filter(f =>
            f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(cat => cat.functions.length > 0);

    const hasResults = filteredCategories.some(cat => cat.functions.length > 0);

    const handleNavClick = (sectionId) => {
        setMobileNavOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="help-page animate-in">
            {/* Documentation Header */}
            <header className="page-header">
                <h1 className="page-header-title">
                    <span className="page-header-icon"><BookOpen size={28} /></span>
                    ಡಾಕ್ಯುಮೆಂಟೇಶನ್
                </h1>
                <p className="page-header-subtitle">ಕನ್ನಡ ಲಿಪಿ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಯ ಸಂಪೂರ್ಣ ಉಲ್ಲೇಖ</p>
            </header>

            {/* Search Container */}
            <div className="search-container">
                <input
                    type="text"
                    className="search-box"
                    placeholder="ಕಾರ್ಯ ಹುಡುಕಿ... (Search functions...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="docs-container">
                {/* Sidebar Navigation */}
                <aside className={`docs-sidebar ${mobileNavOpen ? 'mobile-open' : ''}`}>
                    <nav className="docs-nav">
                        <div className="docs-nav-title">ವಿಷಯ ಸೂಚಿ (Contents)</div>
                        
                        <button
                            onClick={() => handleNavClick('intro')}
                            className={`docs-nav-link ${activeSection === 'intro' ? 'active' : ''}`}
                        >
                            <BookOpen size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಪರಿಚಯ
                        </button>
                        
                        {FUNCTION_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleNavClick(cat.id)}
                                className={`docs-nav-link ${activeSection === cat.id ? 'active' : ''}`}
                            >
                                <FuncIcon iconKey={cat.iconKey} size={14} /> {cat.name}
                            </button>
                        ))}
                        
                        <button
                            onClick={() => handleNavClick('operators')}
                            className={`docs-nav-link ${activeSection === 'operators' ? 'active' : ''}`}
                        >
                            <Zap size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಆಪರೇಟರ್‌ಗಳು
                        </button>
                        
                        <button
                            onClick={() => handleNavClick('control')}
                            className={`docs-nav-link ${activeSection === 'control' ? 'active' : ''}`}
                        >
                            <RefreshCw size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ನಿಯಂತ್ರಣ
                        </button>
                    </nav>
                </aside>

                {/* Mobile Overlay */}
                <div 
                    className={`mobile-overlay ${mobileNavOpen ? 'active' : ''}`}
                    onClick={() => setMobileNavOpen(false)}
                />

                {/* Main Content */}
                <main className="docs-content">
                    {/* Introduction Section */}
                    <section id="intro" className="docs-section panel">
                        <h2 className="section-title">ಪರಿಚಯ (Introduction)</h2>
                        <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                            ಕನ್ನಡ ಲಿಪಿ ಕರ್ನಾಟಕದ ಮೊದಲ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಯಾಗಿದೆ.
                            ಇದು ಕನ್ನಡ ಭಾಷೆಯಲ್ಲಿ ಕೋಡಿಂಗ್ ಕಲಿಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.
                            ಇದರಲ್ಲಿ ನೀವು ಕನ್ನಡದಲ್ಲೇ ಪ್ರೋಗ್ರಾಂಗಳನ್ನು ಬರೆಯಬಹುದು ಮತ್ತು ಚಲಾಯಿಸಬಹುದು.
                        </p>

                        {/* Quick Reference Card */}
                        <div className="quick-ref-card">
                            <h3><Zap size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ತ್ವರಿತ ಉಲ್ಲೇಖ (Quick Reference)</h3>
                            <div className="quick-ref-grid">
                                <div className="quick-ref-item">
                                    <code>ಮುದ್ರಿಸು()</code>
                                    <span>ಔಟ್‌ಪುಟ್</span>
                                </div>
                                <div className="quick-ref-item">
                                    <code>ಆದರೆ</code>
                                    <span>ಷರತ್ತು</span>
                                </div>
                                <div className="quick-ref-item">
                                    <code>ಪುನರಾವರ್ತನೆ</code>
                                    <span>ಲೂಪ್</span>
                                </div>
                                <div className="quick-ref-item">
                                    <code>ವರ್ಗಮೂಲ()</code>
                                    <span>ಗಣಿತ</span>
                                </div>
                            </div>
                        </div>

                        <div className="tip-box">
                            <h4><Lightbulb size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಪ್ರಮುಖ ಮಾಹಿತಿ</h4>
                            <p>ಕನ್ನಡ ಅಂಕಿಗಳನ್ನು (೦-೯) ಅಥವಾ ಇಂಗ್ಲಿಷ್ ಅಂಕಿಗಳನ್ನು (0-9) ಬಳಸಬಹುದು!</p>
                        </div>
                    </section>

                    {/* Function Categories */}
                    {hasResults ? (
                        filteredCategories.map(cat => (
                            <section key={cat.id} id={cat.id} className="docs-section category-section panel">
                                <h2 className="category-title">
                                    <FuncIcon iconKey={cat.iconKey} size={20} />
                                    {cat.name} 
                                    <span className="category-title-en">({cat.nameEn})</span>
                                </h2>
                                <div className="functions-grid">
                                    {cat.functions.map((func, i) => (
                                        <article key={i} className="function-card">
                                            <div className="function-header">
                                                <span className="function-name">{func.name}</span>
                                                <span className="function-name-en">{func.nameEn}</span>
                                            </div>
                                            <code className="function-syntax">{func.syntax}</code>
                                            <p className="function-desc">{func.description}</p>
                                            <div className="function-example">
                                                <span>ಉದಾಹರಣೆ:</span>
                                                <code>{func.example}</code>
                                                <span>→</span>
                                                <code>{func.result}</code>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon"><Search size={48} /></div>
                            <h3>ಯಾವುದೇ ಫಲಿತಾಂಶಗಳಿಲ್ಲ</h3>
                            <p className="text-secondary">ಬೇರೆ ಹುಡುಕಾಟವನ್ನು ಪ್ರಯತ್ನಿಸಿ</p>
                        </div>
                    )}

                    {/* Operators Section */}
                    <section id="operators" className="docs-section panel">
                        <h2 className="section-title">ಆಪರೇಟರ್‌ಗಳು (Operators)</h2>
                        
                        <div className="operators-container">
                            <h3><Hash size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಗಣಿತ ಆಪರೇಟರ್‌ಗಳು (Arithmetic)</h3>
                            <table className="wiki-table">
                                <thead>
                                    <tr>
                                        <th>ಆಪರೇಟರ್</th>
                                        <th>ವಿವರಣೆ</th>
                                        <th>ಉದಾಹರಣೆ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {OPERATORS.arithmetic.map((op, i) => (
                                        <tr key={i}>
                                            <td><code>{op.symbol}</code></td>
                                            <td>{op.name} ({op.nameEn})</td>
                                            <td>{op.example}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="operators-container">
                            <h3><Scale size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಹೋಲಿಕೆ ಆಪರೇಟರ್‌ಗಳು (Comparison)</h3>
                            <table className="wiki-table">
                                <thead>
                                    <tr>
                                        <th>ಆಪರೇಟರ್</th>
                                        <th>ವಿವರಣೆ</th>
                                        <th>ಉದಾಹರಣೆ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {OPERATORS.comparison.map((op, i) => (
                                        <tr key={i}>
                                            <td><code>{op.symbol}</code></td>
                                            <td>{op.name} ({op.nameEn})</td>
                                            <td>{op.example}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="operators-container">
                            <h3><LinkIcon size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ತಾರ್ಕಿಕ ಆಪರೇಟರ್‌ಗಳು (Logical)</h3>
                            <table className="wiki-table">
                                <thead>
                                    <tr>
                                        <th>ಆಪರೇಟರ್</th>
                                        <th>ವಿವರಣೆ</th>
                                        <th>ಉದಾಹರಣೆ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {OPERATORS.logical.map((op, i) => (
                                        <tr key={i}>
                                            <td><code>{op.symbol}</code></td>
                                            <td>{op.name} ({op.nameEn})</td>
                                            <td>{op.example}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Control Flow Section */}
                    <section id="control" className="docs-section panel">
                        <h2 className="section-title">ನಿಯಂತ್ರಣ (Control Flow)</h2>
                        
                        <div className="operators-container">
                            <h3><GitBranch size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಷರತ್ತುಬದ್ಧ ಹೇಳಿಕೆಗಳು (Conditionals)</h3>
                        </div>
                        <div className="functions-grid">
                            {CONTROL_FLOW.conditionals.map((item, i) => (
                                <article key={i} className="function-card">
                                    <div className="function-header">
                                        <span className="function-name">{item.name}</span>
                                        <span className="function-name-en">{item.nameEn}</span>
                                    </div>
                                    <code className="function-syntax">{item.syntax}</code>
                                    <p className="function-desc">{item.description}</p>
                                    <div className="function-example">
                                        <span>ಉದಾಹರಣೆ:</span>
                                        <code>{item.example}</code>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="operators-container" style={{ marginTop: 'var(--gap-xl)' }}>
                            <h3><Repeat size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಲೂಪ್‌ಗಳು (Loops)</h3>
                        </div>
                        <div className="functions-grid">
                            {CONTROL_FLOW.loops.map((item, i) => (
                                <article key={i} className="function-card">
                                    <div className="function-header">
                                        <span className="function-name">{item.name}</span>
                                        <span className="function-name-en">{item.nameEn}</span>
                                    </div>
                                    <code className="function-syntax">{item.syntax}</code>
                                    <p className="function-desc">{item.description}</p>
                                    <div className="function-example">
                                        <span>ಉದಾಹರಣೆ:</span>
                                        <code>{item.example}</code>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </main>
            </div>

            {/* Mobile Navigation Toggle */}
            <button 
                className="mobile-nav-toggle"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-label="Toggle navigation"
            >
                {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
    );
};

export default Help;
