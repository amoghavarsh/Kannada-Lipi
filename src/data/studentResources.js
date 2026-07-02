/**
 * KannadaLipi - ವಿದ್ಯಾರ್ಥಿ ಸಂಪನ್ಮೂಲಗಳು (Student Resources)
 *
 * Karnataka scholarships + major exams, with official portal links. Curated
 * general references — students should verify eligibility/dates on the official
 * sites (links provided). No live data, works offline.
 */

export const RESOURCE_CATEGORIES = [
    { id: 'all', label: 'ಎಲ್ಲಾ', iconKey: 'LayoutGrid' },
    { id: 'scholarship', label: 'ವಿದ್ಯಾರ್ಥಿವೇತನ', iconKey: 'Award' },
    { id: 'exam', label: 'ಪರೀಕ್ಷೆಗಳು', iconKey: 'FileText' },
    { id: 'portal', label: 'ಪೋರ್ಟಲ್‌ಗಳು', iconKey: 'Globe' }
];

export const STUDENT_RESOURCES = [
    // ── Scholarships ──
    {
        id: 1, category: 'scholarship',
        title: "ವಿದ್ಯಾಸಿರಿ",
        titleEn: "Vidyasiri",
        desc: "ಹಿಂದುಳಿದ ವರ್ಗಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಊಟ ಮತ್ತು ವಸತಿ ಭತ್ಯೆ (ಹಾಸ್ಟೆಲ್ ಸಿಗದವರಿಗೆ).",
        eligibility: "ಹಿಂದುಳಿದ ವರ್ಗದ ವಿದ್ಯಾರ್ಥಿಗಳು",
        link: "https://bcwd.karnataka.gov.in/"
    },
    {
        id: 2, category: 'scholarship',
        title: "ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ",
        titleEn: "Post-Matric Scholarship",
        desc: "ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ/ಒಬಿಸಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಶುಲ್ಕ ಮರುಪಾವತಿ ಮತ್ತು ನಿರ್ವಹಣಾ ಭತ್ಯೆ.",
        eligibility: "ಮೆಟ್ರಿಕ್ ನಂತರ ಓದುತ್ತಿರುವ ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳು",
        link: "https://ssp.postmatric.karnataka.gov.in/"
    },
    {
        id: 3, category: 'scholarship',
        title: "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ (NSP)",
        titleEn: "National Scholarship Portal",
        desc: "ಕೇಂದ್ರ ಸರ್ಕಾರದ ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಿಗೆ ಏಕ ಪೋರ್ಟಲ್.",
        eligibility: "ಶಾಲಾ/ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳು (ಆದಾಯ ಆಧಾರಿತ)",
        link: "https://scholarships.gov.in/"
    },
    {
        id: 4, category: 'scholarship',
        title: "ಶುಲ್ಕ ವಿನಾಯಿತಿ / ಪ್ರೋತ್ಸಾಹಧನ",
        titleEn: "FEE Reimbursement & Incentives",
        desc: "ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ/ಪಿಯುಸಿ ಯಲ್ಲಿ ಉತ್ತಮ ಅಂಕ ಪಡೆದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪ್ರೋತ್ಸಾಹಧನ.",
        eligibility: "ಮೆರಿಟ್ ಆಧಾರಿತ",
        link: "https://sw.kar.nic.in/"
    },
    // ── Exams ──
    {
        id: 5, category: 'exam',
        title: "ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ (೧೦ನೇ)",
        titleEn: "SSLC (KSEAB)",
        desc: "ಕರ್ನಾಟಕ ಶಾಲಾ ಪರೀಕ್ಷೆ ಮತ್ತು ಮೌಲ್ಯನಿರ್ಣಯ ಮಂಡಳಿ — ೧೦ನೇ ತರಗತಿ ಪರೀಕ್ಷೆ.",
        eligibility: "೧೦ನೇ ತರಗತಿ ವಿದ್ಯಾರ್ಥಿಗಳು",
        link: "https://sslc.karnataka.gov.in/"
    },
    {
        id: 6, category: 'exam',
        title: "ಪಿಯುಸಿ (೧೨ನೇ)",
        titleEn: "PUC II (KSEAB)",
        desc: "ಪದವಿಪೂರ್ವ ಶಿಕ್ಷಣ — ೧೨ನೇ ತರಗತಿ ಬೋರ್ಡ್ ಪರೀಕ್ಷೆ.",
        eligibility: "ದ್ವಿತೀಯ ಪಿಯುಸಿ ವಿದ್ಯಾರ್ಥಿಗಳು",
        link: "https://pue.karnataka.gov.in/"
    },
    {
        id: 7, category: 'exam',
        title: "ಸಿಇಟಿ (KCET)",
        titleEn: "Karnataka CET",
        desc: "ಇಂಜಿನಿಯರಿಂಗ್, ವೈದ್ಯಕೀಯ, ಕೃಷಿ ಕೋರ್ಸ್‌ಗಳ ಪ್ರವೇಶ ಪರೀಕ್ಷೆ (KEA).",
        eligibility: "ಪಿಯುಸಿ ಮುಗಿಸಿದ ವಿದ್ಯಾರ್ಥಿಗಳು",
        link: "https://cetonline.karnataka.gov.in/"
    },
    {
        id: 8, category: 'exam',
        title: " NMMS / NTSE",
        titleEn: "NMMS & NTSE",
        desc: "೮ನೇ (NMMS) ಮತ್ತು ೧೦ನೇ (NTSE) ತರಗತಿಯ ಪ್ರತಿಭಾ ಶೋಧ ಪರೀಕ್ಷೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ.",
        eligibility: "೮ / ೧೦ನೇ ತರಗತಿ ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿಗಳು",
        link: "https://sts.karnataka.gov.in/"
    },
    // ── Portals ──
    {
        id: 9, category: 'portal',
        title: "ಸೇವಾ ಸಿಂಧು",
        titleEn: "Seva Sindhu",
        desc: "ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಸೇವೆಗಳಿಗೆ (ವಿದ್ಯಾರ್ಥಿ ಸೇರಿ) ಏಕ ಪೋರ್ಟಲ್.",
        eligibility: "ಎಲ್ಲಾ ನಾಗರಿಕರು",
        link: "https://sevasindhu.karnataka.gov.in/"
    },
    {
        id: 10, category: 'portal',
        title: "ಡಿಜಿಟಲ್ ಲೈಬ್ರರಿ (DIKSHA)",
        titleEn: "DIKSHA",
        desc: "ಶಾಲಾ ಪಠ್ಯಪುಸ್ತಕ, ವಿಡಿಯೊ ಪಾಠ ಮತ್ತು ಕಲಿಕಾ ಸಂಪನ್ಮೂಲಗಳ ರಾಷ್ಟ್ರೀಯ ವೇದಿಕೆ.",
        eligibility: "ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳು & ಶಿಕ್ಷಕರು",
        link: "https://diksha.gov.in/"
    },
    {
        id: 11, category: 'portal',
        title: "ಕರ್ನಾಟಕ ಶಿಕ್ಷಣ ಇಲಾಖೆ",
        titleEn: "Dept. of School Education",
        desc: "ಶಾಲಾ ಶಿಕ್ಷಣ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಜಾಲತಾಣ — ಪ್ರಕಟಣೆಗಳು, ಫಲಿತಾಂಶ, ಮಾಹಿತಿ.",
        eligibility: "ಎಲ್ಲರೂ",
        link: "https://schooleducation.karnataka.gov.in/"
    }
];
