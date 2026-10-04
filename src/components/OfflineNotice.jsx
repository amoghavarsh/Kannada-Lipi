import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

/**
 * Small toast that tells children they can keep coding when the internet drops,
 * and confirms when it is back.
 */
const OfflineNotice = () => {
    const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
    const [showBack, setShowBack] = useState(false);

    useEffect(() => {
        let timer;
        const goOff = () => { setOnline(false); setShowBack(false); };
        const goOn = () => {
            setOnline(true);
            setShowBack(true);
            clearTimeout(timer);
            timer = setTimeout(() => setShowBack(false), 3000);
        };
        window.addEventListener('offline', goOff);
        window.addEventListener('online', goOn);
        return () => {
            window.removeEventListener('offline', goOff);
            window.removeEventListener('online', goOn);
            clearTimeout(timer);
        };
    }, []);

    if (online && !showBack) return null;

    return (
        <div className={`offline-toast${online ? ' back' : ''}`} role="status" aria-live="polite">
            {online ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span>
                {online
                    ? 'ಇಂಟರ್ನೆಟ್ ಮತ್ತೆ ಬಂದಿದೆ.'
                    : 'ನೀವು ಆಫ್‌ಲೈನ್ ಇದ್ದೀರಿ. ಕೋಡಿಂಗ್ ಮುಂದುವರಿಸಿ, ಇದು ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆಯೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ.'}
            </span>
        </div>
    );
};

export default OfflineNotice;
