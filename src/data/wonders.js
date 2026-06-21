/**
 * KannadaLipi - ಕರ್ನಾಟಕದ ಅದ್ಭುತಗಳು (Wonders of Karnataka)
 *
 * A curated list of marvels framed by "why it's a wonder" (records, UNESCO
 * heritage, natural beauty) — deliberately distinct from the city-tourism
 * `places` section in karnataka.json. Each wonder is tagged for filtering.
 */

export const WONDER_CATEGORIES = [
    { id: 'all', label: 'ಎಲ್ಲಾ', iconKey: 'Sparkles' },
    { id: 'record', label: 'ದಾಖಲೆಗಳು', iconKey: 'Trophy' },
    { id: 'heritage', label: 'ಪಾರಂಪರಿಕ', iconKey: 'Landmark' },
    { id: 'nature', label: 'ಪ್ರಕೃತಿ', iconKey: 'Mountain' }
];

export const WONDERS = [
    {
        id: 1,
        category: 'heritage',
        emoji: '🏛️',
        title: "ಹಂಪಿ",
        titleEn: "Hampi",
        location: "ವಿಜಯನಗರ ಜಿಲ್ಲೆ",
        wow: "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣ",
        desc: "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿದ್ದ ಹಂಪಿ, ೫೦೦ಕ್ಕೂ ಹೆಚ್ಚು ಸ್ಮಾರಕಗಳನ್ನು ಹೊಂದಿರುವ ಜಗತ್ಪ್ರಸಿದ್ಧ ಶಿಲಾ ನಗರ.",
        highlight: "ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸಂಗೀತ ಕಂಬಗಳ ವಿಠ್ಠಲ ದೇವಾಲಯ"
    },
    {
        id: 2,
        category: 'heritage',
        emoji: '⛪',
        title: "ಪಟ್ಟದಕಲ್ಲು",
        titleEn: "Pattadakal",
        location: "ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ",
        wow: "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣ",
        desc: "ಚಾಲುಕ್ಯರ ವಾಸ್ತುಶಿಲ್ಪದ ಉತ್ತುಂಗ — ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತ ಶೈಲಿಗಳ ಸಂಗಮ.",
        highlight: "ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ"
    },
    {
        id: 3,
        category: 'heritage',
        emoji: '🛕',
        title: "ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡು",
        titleEn: "Belur & Halebidu",
        location: "ಹಾಸನ ಜಿಲ್ಲೆ",
        wow: "ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆಯ ಅದ್ಭುತ",
        desc: "ಹೊಯ್ಸಳರ ನಿಪುಣ ಕೆತ್ತನೆಗಳಿಂದ ಅಲಂಕೃತ ದೇವಾಲಯಗಳು — ಪ್ರತಿ ಕಲ್ಲೂ ಒಂದು ಕಥೆ ಹೇಳುತ್ತದೆ.",
        highlight: "ಚೆನ್ನಕೇಶವ ಮತ್ತು ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ"
    },
    {
        id: 4,
        category: 'record',
        emoji: '🕌',
        title: "ಗೋಲ ಗುಂಬಜ್",
        titleEn: "Gol Gumbaz",
        location: "ವಿಜಯಪುರ",
        wow: "ವಿಶ್ವದ ಎರಡನೇ ಅತಿದೊಡ್ಡ ಗುಮ್ಮಟ",
        desc: "ಆಧಾರ ಸ್ತಂಭಗಳಿಲ್ಲದ ಬೃಹತ್ ಗುಮ್ಮಟ. ಇಲ್ಲಿನ 'ಪಿಸುಮಾತಿನ ಗ್ಯಾಲರಿ'ಯಲ್ಲಿ ಮೆಲುಮಾತೂ ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ.",
        highlight: "ವಿಸ್ಪರಿಂಗ್ ಗ್ಯಾಲರಿ"
    },
    {
        id: 5,
        category: 'record',
        emoji: '🗿',
        title: "ಗೊಮ್ಮಟೇಶ್ವರ ಬಾಹುಬಲಿ",
        titleEn: "Gomateshwara, Shravanabelagola",
        location: "ಹಾಸನ ಜಿಲ್ಲೆ",
        wow: "ವಿಶ್ವದ ಅತಿ ಎತ್ತರದ ಏಕಶಿಲಾ ವಿಗ್ರಹಗಳಲ್ಲೊಂದು (೫೭ ಅಡಿ)",
        desc: "ಒಂದೇ ಗ್ರಾನೈಟ್ ಶಿಲೆಯಿಂದ ಕೆತ್ತಿದ ಬಾಹುಬಲಿ ಮೂರ್ತಿ. ಪ್ರತಿ ೧೨ ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಮಹಾಮಸ್ತಕಾಭಿಷೇಕ.",
        highlight: "ಮಹಾಮಸ್ತಕಾಭಿಷೇಕ"
    },
    {
        id: 6,
        category: 'nature',
        emoji: '💧',
        title: "ಜೋಗ ಜಲಪಾತ",
        titleEn: "Jog Falls",
        location: "ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆ",
        wow: "ಭಾರತದ ಅತಿ ಎತ್ತರದ ಜಲಪಾತಗಳಲ್ಲೊಂದು (೨೫೩ ಮೀ)",
        desc: "ಶರಾವತಿ ನದಿ ನಾಲ್ಕು ಕವಲುಗಳಾಗಿ (ರಾಜಾ, ರಾಣಿ, ರೋರರ್, ರಾಕೆಟ್) ಧುಮುಕುವ ಮನೋಹರ ದೃಶ್ಯ.",
        highlight: "ಮಳೆಗಾಲದಲ್ಲಿ ಅದ್ಭುತ ನೋಟ"
    },
    {
        id: 7,
        category: 'nature',
        emoji: '⛰️',
        title: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು",
        titleEn: "Western Ghats",
        location: "ಮಲೆನಾಡು ಪ್ರದೇಶ",
        wow: "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ — ಜೀವವೈವಿಧ್ಯ ತಾಣ",
        desc: "ಜಗತ್ತಿನ ೮ ಅತ್ಯಂತ ಜೀವವೈವಿಧ್ಯ ಭರಿತ ಪ್ರದೇಶಗಳಲ್ಲೊಂದು — ಸಾವಿರಾರು ಅಪರೂಪದ ಸಸ್ಯ-ಪ್ರಾಣಿ ಪ್ರಭೇದಗಳ ನೆಲೆ.",
        highlight: "ಕುದುರೆಮುಖ, ಆಗುಂಬೆ"
    },
    {
        id: 8,
        category: 'nature',
        emoji: '🏔️',
        title: "ಕುದುರೆಮುಖ",
        titleEn: "Kudremukh",
        location: "ಚಿಕ್ಕಮಗಳೂರು ಜಿಲ್ಲೆ",
        wow: "ಕುದುರೆ ಮುಖದಾಕಾರದ ಪರ್ವತ ಶ್ರೇಣಿ",
        desc: "ಹಸಿರು ಹುಲ್ಲುಗಾವಲು ಬೆಟ್ಟಗಳು ಮತ್ತು ದಟ್ಟ ಮಳೆಕಾಡುಗಳ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ — ಚಾರಣಿಗರ ಸ್ವರ್ಗ.",
        highlight: "ಟ್ರೆಕ್ಕಿಂಗ್ ತಾಣ"
    },
    {
        id: 9,
        category: 'record',
        emoji: '🌉',
        title: "ಮೈಸೂರು ಅರಮನೆ",
        titleEn: "Mysore Palace",
        location: "ಮೈಸೂರು",
        wow: "ಭಾರತದ ಅತಿ ಹೆಚ್ಚು ಭೇಟಿ ನೀಡುವ ಸ್ಮಾರಕಗಳಲ್ಲೊಂದು",
        desc: "ಇಂಡೋ-ಸಾರಸೆನಿಕ್ ಶೈಲಿಯ ಭವ್ಯ ಅರಮನೆ. ದಸರಾ ಸಮಯದಲ್ಲಿ ೧ ಲಕ್ಷ‌ಕ್ಕೂ ಹೆಚ್ಚು ದೀಪಗಳಿಂದ ಬೆಳಗುತ್ತದೆ.",
        highlight: "ದಸರಾ ದೀಪಾಲಂಕಾರ"
    },
    {
        id: 10,
        category: 'nature',
        emoji: '🏞️',
        title: "ಗೋಕರ್ಣ ಕಡಲತೀರ",
        titleEn: "Gokarna Beaches",
        location: "ಉತ್ತರ ಕನ್ನಡ ಜಿಲ್ಲೆ",
        wow: "ಪವಿತ್ರ ಕ್ಷೇತ್ರ ಮತ್ತು ಪ್ರಶಾಂತ ಕಡಲತೀರ",
        desc: "ಆಧ್ಯಾತ್ಮಿಕತೆ ಮತ್ತು ಪ್ರಕೃತಿ ಸೌಂದರ್ಯದ ಸಂಗಮ — ಓಂ ಬೀಚ್, ಕುಡ್ಲೆ ಬೀಚ್ ಪ್ರಸಿದ್ಧ.",
        highlight: "ಓಂ ಆಕಾರದ ಬೀಚ್"
    }
];
