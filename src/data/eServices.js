/**
 * KannadaLipi - ಸರ್ಕಾರಿ ಇ-ಸೇವೆಗಳು (Karnataka Government e-Services)
 *
 * Direct links to commonly-used Karnataka government online services —
 * day-to-day civic utilities. Curated official portals; verify on the site.
 */

export const ESERVICE_CATEGORIES = [
    { id: 'all', label: 'ಎಲ್ಲಾ', iconKey: 'LayoutGrid' },
    { id: 'civic', label: 'ನಾಗರಿಕ ಸೇವೆ', iconKey: 'Landmark' },
    { id: 'bills', label: 'ಬಿಲ್ & ತೆರಿಗೆ', iconKey: 'Receipt' },
    { id: 'transport', label: 'ಸಾರಿಗೆ', iconKey: 'Car' },
    { id: 'land', label: 'ಭೂಮಿ & ಆಸ್ತಿ', iconKey: 'Map' }
];

export const ESERVICES = [
    {
        id: 1, category: 'civic', emoji: '🪪',
        title: "ಆಧಾರ್ / ಪಡಿತರ ಚೀಟಿ",
        titleEn: "Aadhaar / Ration Card",
        desc: "ಪಡಿತರ ಚೀಟಿ ಅರ್ಜಿ, ತಿದ್ದುಪಡಿ ಮತ್ತು ಸ್ಥಿತಿ ಪರಿಶೀಲನೆ.",
        link: "https://ahara.kar.nic.in/"
    },
    {
        id: 2, category: 'civic', emoji: '🏛️',
        title: "ಸೇವಾ ಸಿಂಧು",
        titleEn: "Seva Sindhu",
        desc: "ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಸೇವೆಗಳಿಗೆ ಏಕ ಪೋರ್ಟಲ್ (ಪ್ರಮಾಣಪತ್ರ, ಅರ್ಜಿಗಳು).",
        link: "https://sevasindhu.karnataka.gov.in/"
    },
    {
        id: 3, category: 'civic', emoji: '📜',
        title: "ನಾಡ ಕಚೇರಿ ಪ್ರಮಾಣಪತ್ರ",
        titleEn: "Nadakacheri (Certificates)",
        desc: "ಆದಾಯ, ಜಾತಿ, ವಾಸಸ್ಥಳ ಮತ್ತಿತರ ಪ್ರಮಾಣಪತ್ರಗಳು.",
        link: "https://nadakacheri.karnataka.gov.in/"
    },
    {
        id: 4, category: 'bills', emoji: '💡',
        title: "ವಿದ್ಯುತ್ ಬಿಲ್ (BESCOM)",
        titleEn: "Electricity Bill",
        desc: "ಕರೆಂಟ್ ಬಿಲ್ ಪಾವತಿ ಮತ್ತು ಸ್ಥಿತಿ ಪರಿಶೀಲನೆ (BESCOM/ESCOMs).",
        link: "https://bescom.karnataka.gov.in/"
    },
    {
        id: 5, category: 'bills', emoji: '🏠',
        title: "ಆಸ್ತಿ ತೆರಿಗೆ (BBMP)",
        titleEn: "Property Tax",
        desc: "ಬಿಬಿಎಂಪಿ ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿ ಮತ್ತು ರಸೀದಿ.",
        link: "https://bbmptax.karnataka.gov.in/"
    },
    {
        id: 6, category: 'bills', emoji: '💧',
        title: "ನೀರಿನ ಬಿಲ್ (BWSSB)",
        titleEn: "Water Bill",
        desc: "ಬೆಂಗಳೂರು ನೀರು ಸರಬರಾಜು ಮಂಡಳಿ ಬಿಲ್ ಪಾವತಿ.",
        link: "https://bwssb.karnataka.gov.in/"
    },
    {
        id: 7, category: 'transport', emoji: '🚗',
        title: "ಆರ್‌ಟಿಒ / ವಾಹನ ಸೇವೆ",
        titleEn: "RTO / Vahan Sarathi",
        desc: "ಚಾಲನಾ ಪರವಾನಗಿ, ವಾಹನ ನೋಂದಣಿ, ತೆರಿಗೆ ಪಾವತಿ.",
        link: "https://parivahan.gov.in/"
    },
    {
        id: 8, category: 'transport', emoji: '🚌',
        title: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ ಟಿಕೆಟ್",
        titleEn: "KSRTC Bus Booking",
        desc: "ಆನ್‌ಲೈನ್ ಬಸ್ ಟಿಕೆಟ್ ಕಾಯ್ದಿರಿಸುವಿಕೆ.",
        link: "https://ksrtc.in/"
    },
    {
        id: 9, category: 'land', emoji: '🌾',
        title: "ಭೂಮಿ (RTC / ಪಹಣಿ)",
        titleEn: "Bhoomi RTC",
        desc: "ಜಮೀನಿನ ಪಹಣಿ (RTC), ಮ್ಯುಟೇಶನ್ ಮತ್ತು ದಾಖಲೆಗಳು.",
        link: "https://landrecords.karnataka.gov.in/"
    },
    {
        id: 10, category: 'land', emoji: '🏢',
        title: "ಕಾವೇರಿ (ನೋಂದಣಿ)",
        titleEn: "Kaveri Online (Registration)",
        desc: "ಆಸ್ತಿ ನೋಂದಣಿ, ಇಸಿ (Encumbrance Certificate).",
        link: "https://kaverionline.karnataka.gov.in/"
    },
    {
        id: 11, category: 'civic', emoji: '👷',
        title: "ಉದ್ಯೋಗ / ಸ್ಕಿಲ್",
        titleEn: "Employment & Skill",
        desc: "ಉದ್ಯೋಗ ವಿನಿಮಯ ನೋಂದಣಿ ಮತ್ತು ಕೌಶಲ್ಯ ತರಬೇತಿ.",
        link: "https://kaushalkar.com/"
    },
    {
        id: 12, category: 'civic', emoji: '🩺',
        title: "ಆರೋಗ್ಯ (ABArK)",
        titleEn: "Arogya Karnataka",
        desc: "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಆರೋಗ್ಯ ಕರ್ನಾಟಕ ಆರೋಗ್ಯ ಕಾರ್ಡ್.",
        link: "https://arogya.karnataka.gov.in/"
    }
];
