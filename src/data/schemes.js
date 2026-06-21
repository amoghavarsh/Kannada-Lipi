/**
 * KannadaLipi - ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು (Karnataka Government Schemes)
 *
 * Curated list of major Karnataka *state* welfare schemes across categories
 * (guarantee, women, farmer, student, welfare). Each entry carries a category
 * for filtering and an official link.
 */

export const SCHEME_CATEGORIES = [
    { id: 'all', label: 'ಎಲ್ಲಾ', iconKey: 'LayoutGrid' },
    { id: 'guarantee', label: 'ಗ್ಯಾರಂಟಿ ಯೋಜನೆಗಳು', iconKey: 'BadgeCheck' },
    { id: 'women', label: 'ಮಹಿಳೆಯರು', iconKey: 'Users' },
    { id: 'farmer', label: 'ರೈತರು', iconKey: 'Wheat' },
    { id: 'student', label: 'ವಿದ್ಯಾರ್ಥಿಗಳು', iconKey: 'GraduationCap' },
    { id: 'welfare', label: 'ಕಲ್ಯಾಣ', iconKey: 'HeartHandshake' }
];

export const SCHEMES = [
    {
        id: 1,
        category: 'guarantee',
        title: "ಗೃಹ ಲಕ್ಷ್ಮಿ",
        titleEn: "Gruha Lakshmi",
        desc: "ಪ್ರತಿ ಕುಟುಂಬದ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ತಿಂಗಳಿಗೆ ₹೨,೦೦೦ ಆರ್ಥಿಕ ನೆರವು.",
        benefit: "ತಿಂಗಳಿಗೆ ₹2,000",
        eligibility: "ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥ ಮಹಿಳೆ (ಬಿಪಿಎಲ್/ಎಪಿಎಲ್ ಪಡಿತರ ಚೀಟಿ)",
        link: "https://sevasindhugs.karnataka.gov.in/"
    },
    {
        id: 2,
        category: 'guarantee',
        title: "ಗೃಹ ಜ್ಯೋತಿ",
        titleEn: "Gruha Jyothi",
        desc: "ಮನೆಗಳಿಗೆ ೨೦೦ ಯೂನಿಟ್‌ವರೆಗೆ ಉಚಿತ ವಿದ್ಯುತ್.",
        benefit: "೨೦೦ ಯೂನಿಟ್‌ವರೆಗೆ ಉಚಿತ ಕರೆಂಟ್",
        eligibility: "ಗೃಹ ಬಳಕೆಯ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಹೊಂದಿರುವ ಕುಟುಂಬಗಳು",
        link: "https://sevasindhugs.karnataka.gov.in/"
    },
    {
        id: 3,
        category: 'guarantee',
        title: "ಅನ್ನ ಭಾಗ್ಯ",
        titleEn: "Anna Bhagya",
        desc: "ಬಿಪಿಎಲ್ ಕುಟುಂಬದ ಪ್ರತಿ ಸದಸ್ಯರಿಗೆ ತಿಂಗಳಿಗೆ ೧೦ ಕೆಜಿ ಉಚಿತ ಅಕ್ಕಿ.",
        benefit: "ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ೧೦ ಕೆಜಿ ಅಕ್ಕಿ/ಧಾನ್ಯ",
        eligibility: "ಬಿಪಿಎಲ್ ಮತ್ತು ಅಂತ್ಯೋದಯ ಪಡಿತರ ಚೀಟಿದಾರರು",
        link: "https://ahara.kar.nic.in/"
    },
    {
        id: 4,
        category: 'guarantee',
        title: "ಶಕ್ತಿ ಯೋಜನೆ",
        titleEn: "Shakti",
        desc: "ರಾಜ್ಯದ ಸರ್ಕಾರಿ ಬಸ್‌ಗಳಲ್ಲಿ ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಪ್ರಯಾಣ.",
        benefit: "ಉಚಿತ ಬಸ್ ಪ್ರಯಾಣ (ಮಹಿಳೆಯರಿಗೆ)",
        eligibility: "ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಮಹಿಳೆಯರು ಮತ್ತು ಹೆಣ್ಣುಮಕ್ಕಳು",
        link: "https://ksrtc.in/"
    },
    {
        id: 5,
        category: 'guarantee',
        title: "ಯುವ ನಿಧಿ",
        titleEn: "Yuva Nidhi",
        desc: "ಪದವಿ/ಡಿಪ್ಲೊಮಾ ಮುಗಿಸಿ ನಿರುದ್ಯೋಗಿಗಳಾಗಿರುವ ಯುವಕರಿಗೆ ನಿರುದ್ಯೋಗ ಭತ್ಯೆ.",
        benefit: "ಪದವೀಧರರಿಗೆ ₹3,000 / ಡಿಪ್ಲೊಮಾ ₹1,500",
        eligibility: "೨೦೨೨-೨೩ ಸಾಲಿನಲ್ಲಿ ತೇರ್ಗಡೆಯಾದ ನಿರುದ್ಯೋಗಿ ಯುವಕರು",
        link: "https://sevasindhugs.karnataka.gov.in/"
    },
    {
        id: 6,
        category: 'women',
        title: "ಭಾಗ್ಯಲಕ್ಷ್ಮಿ",
        titleEn: "Bhagyalakshmi",
        desc: "ಬಿಪಿಎಲ್ ಕುಟುಂಬದಲ್ಲಿ ಜನಿಸಿದ ಹೆಣ್ಣುಮಕ್ಕಳಿಗೆ ಆರ್ಥಿಕ ಭದ್ರತೆ.",
        benefit: "ಬಾಂಡ್ + ಪ್ರೌಢಾವಸ್ಥೆಯಲ್ಲಿ ₹1 ಲಕ್ಷ‌ವರೆಗೆ",
        eligibility: "ಬಿಪಿಎಲ್ ಕುಟುಂಬದ ಹೆಣ್ಣು ಮಕ್ಕಳು",
        link: "https://dwcd.karnataka.gov.in/"
    },
    {
        id: 7,
        category: 'farmer',
        title: "ರೈತ ಸಿರಿ",
        titleEn: "Raitha Siri",
        desc: "ಸಿರಿಧಾನ್ಯ (ಮಿಲೆಟ್) ಬೆಳೆಯುವ ರೈತರಿಗೆ ಪ್ರೋತ್ಸಾಹ ಧನ.",
        benefit: "ಹೆಕ್ಟೇರ್‌ಗೆ ₹10,000 ಪ್ರೋತ್ಸಾಹ",
        eligibility: "ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯುವ ಕರ್ನಾಟಕದ ರೈತರು",
        link: "https://raitamitra.karnataka.gov.in/"
    },
    {
        id: 8,
        category: 'farmer',
        title: "ಕೃಷಿ ಭಾಗ್ಯ",
        titleEn: "Krishi Bhagya",
        desc: "ಮಳೆಯಾಶ್ರಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಕೃಷಿ ಹೊಂಡ ಮತ್ತು ನೀರಾವರಿ ಸೌಲಭ್ಯ.",
        benefit: "ಕೃಷಿ ಹೊಂಡ + ಸಬ್ಸಿಡಿ",
        eligibility: "ಮಳೆಯಾಶ್ರಿತ ಕೃಷಿ ಪ್ರದೇಶದ ರೈತರು",
        link: "https://raitamitra.karnataka.gov.in/"
    },
    {
        id: 9,
        category: 'student',
        title: "ವಿದ್ಯಾಸಿರಿ",
        titleEn: "Vidyasiri",
        desc: "ಹಿಂದುಳಿದ ವರ್ಗಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಊಟ ಮತ್ತು ವಸತಿ ಭತ್ಯೆ.",
        benefit: "ಊಟ ಮತ್ತು ವಸತಿಗೆ ಮಾಸಿಕ ಭತ್ಯೆ",
        eligibility: "ಹಾಸ್ಟೆಲ್ ಸಿಗದ ಹಿಂದುಳಿದ ವರ್ಗದ ವಿದ್ಯಾರ್ಥಿಗಳು",
        link: "https://bcwd.karnataka.gov.in/"
    },
    {
        id: 10,
        category: 'student',
        title: "ವಿದ್ಯಾರ್ಥಿ ವೇತನ (Scholarship)",
        titleEn: "Post-Matric Scholarship",
        desc: "ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ/ಒಬಿಸಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಶಿಕ್ಷಣ ವಿದ್ಯಾರ್ಥಿವೇತನ.",
        benefit: "ಶುಲ್ಕ ಮರುಪಾವತಿ + ನಿರ್ವಹಣಾ ಭತ್ಯೆ",
        eligibility: "ಮೆಟ್ರಿಕ್ ನಂತರದ ಕೋರ್ಸ್ ಓದುತ್ತಿರುವ ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳು",
        link: "https://ssp.postmatric.karnataka.gov.in/"
    },
    {
        id: 11,
        category: 'welfare',
        title: "ಆಯುಷ್ಮಾನ್ ಆರೋಗ್ಯ ಕರ್ನಾಟಕ",
        titleEn: "Ayushman Bharat - Arogya Karnataka",
        desc: "ಬಡ ಕುಟುಂಬಗಳಿಗೆ ನಗದುರಹಿತ ಆರೋಗ್ಯ ಚಿಕಿತ್ಸೆ.",
        benefit: "ವರ್ಷಕ್ಕೆ ₹5 ಲಕ್ಷ‌ವರೆಗೆ ಆರೋಗ್ಯ ವಿಮೆ",
        eligibility: "ಅರ್ಹ ಬಿಪಿಎಲ್/ಎಪಿಎಲ್ ಕುಟುಂಬಗಳು",
        link: "https://arogya.karnataka.gov.in/"
    },
    {
        id: 12,
        category: 'welfare',
        title: "ಗಂಗಾ ಕಲ್ಯಾಣ",
        titleEn: "Ganga Kalyana",
        desc: "ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರಿಗೆ ನೀರಾವರಿ ಬೋರ್‌ವೆಲ್ ಸೌಲಭ್ಯ.",
        benefit: "ಉಚಿತ ಬೋರ್‌ವೆಲ್ + ಪಂಪ್‌ಸೆಟ್",
        eligibility: "ಹಿಂದುಳಿದ/ಅಲ್ಪಸಂಖ್ಯಾತ ವರ್ಗದ ಸಣ್ಣ ರೈತರು",
        link: "https://sevasindhugs.karnataka.gov.in/"
    }
];
