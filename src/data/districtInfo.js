/**
 * KannadaLipi - ಜಿಲ್ಲೆಗಳ ಮಾಹಿತಿ (District quick facts)
 *
 * Lightweight enrichment for the clickable District Explorer — a short
 * "headquarters" + "known for" blurb per district. Merged with the census
 * figures from districtStats.js at render time (no duplication of numbers).
 * Keyed by the English district name used in districtStats.js.
 */

export const DISTRICT_INFO = {
    "Bengaluru Urban": { emoji: "🏙️", hq: "ಬೆಂಗಳೂರು", knownFor: "ಭಾರತದ ಐಟಿ ರಾಜಧಾನಿ, ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ" },
    "Belagavi": { emoji: "🌆", hq: "ಬೆಳಗಾವಿ", knownFor: "ಎರಡನೇ ರಾಜಧಾನಿ, ಸುವರ್ಣ ವಿಧಾನಸೌಧ" },
    "Mysuru": { emoji: "🏰", hq: "ಮೈಸೂರು", knownFor: "ಅರಮನೆ, ದಸರಾ, ಶ್ರೀಗಂಧ" },
    "Tumakuru": { emoji: "🥥", hq: "ತುಮಕೂರು", knownFor: "ತೆಂಗು, ಸಿದ್ಧಗಂಗಾ ಮಠ" },
    "Kalaburagi": { emoji: "🕌", hq: "ಕಲಬುರಗಿ", knownFor: "ತೊಗರಿ ಬೇಳೆ, ಗುಮ್ಮಟ" },
    "Ballari": { emoji: "⛏️", hq: "ಬಳ್ಳಾರಿ", knownFor: "ಕಬ್ಬಿಣ ಅದಿರು, ಹಂಪಿ ಸಮೀಪ" },
    "Vijayapura": { emoji: "🕌", hq: "ವಿಜಯಪುರ", knownFor: "ಗೋಲ ಗುಂಬಜ್, ದ್ರಾಕ್ಷಿ" },
    "Dakshina Kannada": { emoji: "🏖️", hq: "ಮಂಗಳೂರು", knownFor: "ಬಂದರು, ಕಡಲತೀರ, ಬ್ಯಾಂಕಿಂಗ್ ತೊಟ್ಟಿಲು" },
    "Dharwad": { emoji: "🎵", hq: "ಧಾರವಾಡ", knownFor: "ಪೇಡಾ, ಸಂಗೀತ, ಶಿಕ್ಷಣ" },
    "Shivamogga": { emoji: "💧", hq: "ಶಿವಮೊಗ್ಗ", knownFor: "ಜೋಗ ಜಲಪಾತ, ಮಲೆನಾಡಿನ ಹೆಬ್ಬಾಗಿಲು" },
    "Bengaluru Rural": { emoji: "🌾", hq: "ದೇವನಹಳ್ಳಿ", knownFor: "ವಿಮಾನ ನಿಲ್ದಾಣ, ದ್ರಾಕ್ಷಿ" },
    "Raichur": { emoji: "🌾", hq: "ರಾಯಚೂರು", knownFor: "ಭತ್ತ, ಉಷ್ಣ ವಿದ್ಯುತ್ ಸ್ಥಾವರ" },
    "Kolar": { emoji: "🥇", hq: "ಕೋಲಾರ", knownFor: "ಚಿನ್ನದ ಗಣಿ (KGF), ಟೊಮ್ಯಾಟೊ, ಹಾಲು" },
    "Mandya": { emoji: "🍬", hq: "ಮಂಡ್ಯ", knownFor: "ಕಬ್ಬು, ಸಕ್ಕರೆ ನಾಡು" },
    "Hassan": { emoji: "🛕", hq: "ಹಾಸನ", knownFor: "ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು, ಆಲೂಗಡ್ಡೆ" },
    "Bidar": { emoji: "🏛️", hq: "ಬೀದರ್", knownFor: "ಬಿದ್ರಿ ಕಲೆ, ಕೋಟೆ" },
    "Davanagere": { emoji: "🫓", hq: "ದಾವಣಗೆರೆ", knownFor: "ಬೆಣ್ಣೆ ದೋಸೆ, ಹತ್ತಿ" },
    "Bagalkote": { emoji: "🛕", hq: "ಬಾಗಲಕೋಟೆ", knownFor: "ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ" },
    "Gadag": { emoji: "🧵", hq: "ಗದಗ", knownFor: "ನೇಯ್ಗೆ, ವೀರನಾರಾಯಣ ದೇವಾಲಯ" },
    "Chitradurga": { emoji: "🏯", hq: "ಚಿತ್ರದುರ್ಗ", knownFor: "ಕಲ್ಲಿನ ಕೋಟೆ, ಗಾಳಿ ವಿದ್ಯುತ್" },
    "Uttara Kannada": { emoji: "🌊", hq: "ಕಾರವಾರ", knownFor: "ಕಡಲತೀರ, ಪಶ್ಚಿಮ ಘಟ್ಟ, ಗೋಕರ್ಣ" },
    "Chikkamagaluru": { emoji: "☕", hq: "ಚಿಕ್ಕಮಗಳೂರು", knownFor: "ಕಾಫಿ ತವರೂರು, ಮುಳ್ಳಯ್ಯನಗಿರಿ" },
    "Koppal": { emoji: "🪨", hq: "ಕೊಪ್ಪಳ", knownFor: "ಅಂಜನಾದ್ರಿ, ಗ್ರಾನೈಟ್" },
    "Haveri": { emoji: "🌰", hq: "ಹಾವೇರಿ", knownFor: "ಏಲಕ್ಕಿ, ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ" },
    "Chamarajanagara": { emoji: "🐘", hq: "ಚಾಮರಾಜನಗರ", knownFor: "ಬಂಡೀಪುರ ಹುಲಿ ಸಂರಕ್ಷಿತ ಪ್ರದೇಶ, ಬಿ.ಆರ್. ಹಿಲ್ಸ್" },
    "Udupi": { emoji: "🍛", hq: "ಉಡುಪಿ", knownFor: "ಕೃಷ್ಣ ಮಠ, ಉಡುಪಿ ಊಟ, ಕಡಲತೀರ" },
    "Chikkaballapura": { emoji: "⛰️", hq: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", knownFor: "ನಂದಿ ಬೆಟ್ಟ, ದ್ರಾಕ್ಷಿ, ಹೂವು" },
    "Ramanagara": { emoji: "🎬", hq: "ರಾಮನಗರ", knownFor: "ರೇಷ್ಮೆ ಮಾರುಕಟ್ಟೆ, ಶೋಲೆ ಚಿತ್ರೀಕರಣ" },
    "Yadgir": { emoji: "🌾", hq: "ಯಾದಗಿರಿ", knownFor: "ಭತ್ತ, ಹತ್ತಿ, ಕೋಟೆ" },
    "Kodagu": { emoji: "🌧️", hq: "ಮಡಿಕೇರಿ", knownFor: "ಕಾಫಿ, ಕಾವೇರಿ ಉಗಮ, ಗಿರಿಧಾಮ" }
};
