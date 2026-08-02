import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { kannadaLipi } from '../lib/js/interpreter/index.js';

// Public visitor counter via counterapi.dev (free, no signup, no cookies).
// Increments once per browser session; shows the running total in Kannada numerals.
const COUNTER_URL = 'https://api.counterapi.dev/v1/k-lipi/visits/up';
const SESSION_KEY = 'kl_counted_session';

export default function VisitorCount() {
    const [count, setCount] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const alreadyCounted = sessionStorage.getItem(SESSION_KEY) === '1';
        // If counted this session, we still fetch to show the latest total,
        // but the API only has an "up" endpoint, so we cache our last value.
        if (alreadyCounted) {
            const cached = localStorage.getItem('kl_visits_cached');
            if (cached) { setCount(Number(cached)); return; }
        }
        (async () => {
            try {
                const res = await fetch(COUNTER_URL);
                const data = await res.json();
                if (!cancelled && typeof data.count === 'number') {
                    setCount(data.count);
                    sessionStorage.setItem(SESSION_KEY, '1');
                    localStorage.setItem('kl_visits_cached', String(data.count));
                }
            } catch {
                /* offline / blocked → simply don't show the badge */
            }
        })();
        return () => { cancelled = true; };
    }, []);

    if (count === null) return null; // hide until we have a number (no layout jump)

    const kn = kannadaLipi.toKannada(count.toLocaleString('en-IN'));
    return (
        <span className="visitor-count" title="ಒಟ್ಟು ಭೇಟಿಗಳು">
            <Eye size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            {kn} ಭೇಟಿಗಳು
        </span>
    );
}
