import { NavLink } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound-page animate-in">
            <div className="notfound-code">404</div>
            <h1 className="gradient-title">ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ</h1>
            <p className="text-secondary notfound-msg">
                The page you are looking for does not exist.
            </p>
            <div className="notfound-actions">
                <NavLink to="/" className="btn btn-primary">ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ</NavLink>
                <NavLink to="/learn" className="btn btn-secondary">ಕಲಿಯಿರಿ</NavLink>
            </div>
        </div>
    );
};

export default NotFound;
