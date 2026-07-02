import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { Link, Sparkles, Landmark, ChevronDown, HelpCircle, IndianRupee, MapPin, GraduationCap, Building2 } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [theme, setTheme] = useState(localStorage.getItem('kannadalipi_theme') || 'light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('kannadalipi_theme', theme);
    }, [theme]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navLinksCoding = (
        <>
            <NavLink to="/" className="nav-link" onClick={closeMenu}>ಮುಖಪುಟ</NavLink>
            <NavLink to="/learn" className="nav-link" onClick={closeMenu}>ಕಲಿಯಿರಿ</NavLink>
            <NavLink to="/challenge" className="nav-link" onClick={closeMenu}>🔥 ಇಂದಿನ ಸವಾಲು</NavLink>
            <NavLink to="/examples" className="nav-link" onClick={closeMenu}>ಉದಾಹರಣೆಗಳು</NavLink>
            <NavLink to="/games" className="nav-link" onClick={closeMenu}>ಆಟಗಳು</NavLink>
            <NavLink to="/help" className="nav-link" onClick={closeMenu}>ಸಹಾಯ</NavLink>
        </>
    );

    // The 5 Karnataka-related pages — collapsed into a dropdown on desktop,
    // shown as a flat list on mobile (where the panel scrolls).
    const karnatakaLinks = (
        <>
            <NavLink to="/karnataka" className="nav-link nav-link-special" onClick={closeMenu}>ಕರ್ನಾಟಕ</NavLink>
            <NavLink to="/wonders" className="nav-link nav-link-special" onClick={closeMenu}><Sparkles size={15} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಅದ್ಭುತಗಳು</NavLink>
            <NavLink to="/schemes" className="nav-link nav-link-special" onClick={closeMenu}><Landmark size={15} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಯೋಜನೆಗಳು</NavLink>
            <NavLink to="/districts" className="nav-link nav-link-special" onClick={closeMenu}><MapPin size={15} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಜಿಲ್ಲೆಗಳು</NavLink>
            <NavLink to="/economy" className="nav-link nav-link-special" onClick={closeMenu}><IndianRupee size={15} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಆರ್ಥಿಕತೆ</NavLink>
            <NavLink to="/student-resources" className="nav-link nav-link-special" onClick={closeMenu}><GraduationCap size={15} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ವಿದ್ಯಾರ್ಥಿ</NavLink>
            <NavLink to="/services" className="nav-link nav-link-special" onClick={closeMenu}><Building2 size={15} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಇ-ಸೇವೆಗಳು</NavLink>
            <NavLink to="/quiz" className="nav-link nav-link-special" onClick={closeMenu}><HelpCircle size={15} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ರಸಪ್ರಶ್ನೆ</NavLink>
        </>
    );

    const navLinksGeneral = (
        <>
            {karnatakaLinks}
            <NavLink to="/links" className="nav-link" onClick={closeMenu}><Link size={15} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಲಿಂಕ್‌ಗಳು</NavLink>
            <NavLink to="/about" className="nav-link" onClick={closeMenu}>ನಮ್ಮ ಬಗ್ಗೆ</NavLink>
        </>
    );

    return (
        <header className="header">
            <div className="header-content">
                <NavLink to="/" className="logo" onClick={closeMenu}>
                    <img src="/images/logo.png" alt="ಕನ್ನಡ ಲಿಪಿ" className="logo-img" />
                    <span className="logo-text">ಕನ್ನಡ ಲಿಪಿ</span>
                </NavLink>

                {/* Desktop nav — rendered inline. Karnataka pages live in a
                    dropdown so the bar never overflows. */}
                <nav className="nav nav-desktop">
                    <div className="nav-group nav-group-coding">
                        {navLinksCoding}
                    </div>
                    <div className="nav-divider"></div>
                    <div className="nav-group nav-group-general">
                        <div className="nav-dropdown">
                            <button className="nav-link nav-dropdown-trigger">
                                ಕರ್ನಾಟಕ <ChevronDown size={14} className="nav-dropdown-caret" />
                            </button>
                            <div className="nav-dropdown-menu">
                                {karnatakaLinks}
                            </div>
                        </div>
                        <NavLink to="/links" className="nav-link" onClick={closeMenu}><Link size={15} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಲಿಂಕ್‌ಗಳು</NavLink>
                        <NavLink to="/about" className="nav-link" onClick={closeMenu}>ನಮ್ಮ ಬಗ್ಗೆ</NavLink>
                    </div>
                </nav>

                <div className="header-actions">
                    <button
                        className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>

                    <button className="theme-btn" onClick={toggleTheme} title="Toggle Theme">
                        {theme === 'dark' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile nav — portaled to document.body to escape all stacking contexts */}
            {createPortal(
                <>
                    <div className={`nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
                    <nav className={`nav nav-mobile ${isMenuOpen ? 'nav-open' : ''}`}>
                        <div className="mobile-nav-section">
                            <h4 className="mobile-nav-heading">ಕೋಡಿಂಗ್ (Coding)</h4>
                            {navLinksCoding}
                        </div>
                        <div className="mobile-nav-section">
                            <h4 className="mobile-nav-heading">ಇತರೆ (General)</h4>
                            {navLinksGeneral}
                        </div>
                    </nav>
                </>,
                document.body
            )}
        </header>
    );
};

export default Header;
