import React from 'react';
import { NavLink } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page animate-in">
            {/* Editor leads — auto-types a demo, then hands over to the user */}
            <section className="home-editor-lead">
                <div className="home-editor-intro">
                    <span className="hero-badge">ಕರ್ನಾಟಕದ ಮೊದಲ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆ</span>
                </div>
                <CodeEditor autoDemo={true} />
            </section>

            {/* Quick actions below the editor */}
            <section className="home-secondary text-center">
                <div className="cta-group">
                    <NavLink to="/learn" className="btn btn-primary">ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ</NavLink>
                    <NavLink to="/challenge" className="btn btn-accent">🔥 ಇಂದಿನ ಸವಾಲು</NavLink>
                    <NavLink to="/games" className="btn btn-secondary">🎮 ಆಟ ಆಡಿ</NavLink>
                </div>
            </section>
        </div>
    );
};

export default Home;
