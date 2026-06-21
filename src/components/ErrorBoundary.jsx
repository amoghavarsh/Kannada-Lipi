import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: 'var(--font-main)',
                    color: 'var(--text-primary)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}><AlertTriangle size={64} color="var(--error, #e53e3e)" /></div>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>ಏನೋ ತಪ್ಪಾಗಿದೆ</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Something went wrong. Please try refreshing the page.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => window.location.reload()}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
