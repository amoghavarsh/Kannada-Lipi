import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <NavLink to="/" className="footer-logo">
                        <img src="/images/logo.png" alt="ಕನ್ನಡ ಲಿಪಿ" />
                        <span>ಕನ್ನಡ ಲಿಪಿ</span>
                    </NavLink>
                    <p className="text-secondary" style={{ maxWidth: '300px', fontSize: '0.85rem' }}>
                        ಕನ್ನಡಿಗರಿಗಾಗಿ, ಕನ್ನಡಿಗರಿಂದಲೇ ನಿರ್ಮಿಸಲ್ಪಟ್ಟ ಆಧುನಿಕ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆ.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h4>ಪರಿಶೋಧಿಸಿ</h4>
                        <NavLink to="/learn" className="footer-link">ಕಲಿಯಿರಿ</NavLink>
                        <NavLink to="/examples" className="footer-link">ಉದಾಹರಣೆಗಳು</NavLink>
                        <NavLink to="/karnataka" className="footer-link">ಕರ್ನಾಟಕ</NavLink>
                        <NavLink to="/links" className="footer-link"><Link size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ಲಿಂಕ್‌ಗಳು</NavLink>
                    </div>
                    <div className="footer-column">
                        <h4>ಸಹಾಯ</h4>
                        <NavLink to="/help" className="footer-link">ದಾಖಲೆಗಳು</NavLink>
                        <NavLink to="/about" className="footer-link">ನಮ್ಮ ಬಗ್ಗೆ</NavLink>
                    </div>
                    <div className="footer-column">
                        <h4>ಸಂಪರ್ಕಿಸಿ</h4>
                        <a href="mailto:support@visionone7.in" className="footer-link">support@visionone7.in</a>
                        <p className="footer-link" style={{ fontSize: '0.75rem', opacity: 0.8 }}>Part of VisionOne7</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ಕನ್ನಡ ಲಿಪಿ - ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.</p>
                <p style={{ marginTop: '8px', fontSize: '0.75rem', opacity: 0.6 }}>Made with <Heart size={14} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--error, #e53e3e)', fill: 'var(--error, #e53e3e)' }} /> for Karnataka</p>
            </div>
        </footer>
    );
};

export default Footer;
