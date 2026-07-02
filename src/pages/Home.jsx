import React from 'react';
import { NavLink } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page animate-in">
            <section className="hero text-center">
                <span className="hero-badge">ಕರ್ನಾಟಕದ ಮೊದಲ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆ</span>
                <h1 className="gradient-title hero-title">ಕನ್ನಡ ಲಿಪಿ</h1>
                <p className="hero-subtitle">ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಕೋಡ್ ಬರೆಯಿರಿ — ಸುಲಭ, ಸರಳ, ಕನ್ನಡಮಯ</p>

                <div className="cta-group">
                    <NavLink to="/learn" className="btn btn-primary">ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ</NavLink>
                    <NavLink to="/challenge" className="btn btn-accent">🔥 ಇಂದಿನ ಸವಾಲು</NavLink>
                    <NavLink to="/games" className="btn btn-secondary">🎮 ಆಟ ಆಡಿ</NavLink>
                </div>

                <div className="hero-stats">
                    <div className="hero-stat">
                        <span className="hero-stat-value">೩೦+</span>
                        <span className="hero-stat-label">ಕಾರ್ಯಗಳು</span>
                    </div>
                    <div className="hero-stat">
                        <span className="hero-stat-value">೨೯</span>
                        <span className="hero-stat-label">ಉದಾಹರಣೆಗಳು</span>
                    </div>
                    <div className="hero-stat">
                        <span className="hero-stat-value">೨೧</span>
                        <span className="hero-stat-label">ಪಾಠಗಳು</span>
                    </div>
                </div>
            </section>

            <CodeEditor />

        </div>
    );
};

export default Home;
