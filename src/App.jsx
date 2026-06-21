import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Karnataka from './pages/Karnataka';
import KarnatakaLinks from './pages/KarnatakaLinks';
import Learn from './pages/Learn';
import Examples from './pages/Examples';
import Help from './pages/Help';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Games from './pages/Games';
import Schemes from './pages/Schemes';
import Wonders from './pages/Wonders';
import DistrictStats from './pages/DistrictStats';
import Quiz from './pages/Quiz';
import Economy from './pages/Economy';
import Embed from './pages/Embed';
import ErrorBoundary from './components/ErrorBoundary';


function AppShell() {
    // The /embed route renders bare (no header/footer) so it sits cleanly
    // inside a host site's <iframe>.
    const location = useLocation();
    const isEmbed = location.pathname === '/embed';

    if (isEmbed) {
        return (
            <Routes>
                <Route path="/embed" element={<Embed />} />
            </Routes>
        );
    }

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/karnataka" element={<Karnataka />} />
                    <Route path="/links" element={<KarnatakaLinks />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/examples" element={<Examples />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/schemes" element={<Schemes />} />
                    <Route path="/wonders" element={<Wonders />} />
                    <Route path="/districts" element={<DistrictStats />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/economy" element={<Economy />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <AppShell />
            </Router>
        </ErrorBoundary>
    );
}

export default App;
