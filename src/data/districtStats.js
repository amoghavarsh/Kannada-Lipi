/**
 * KannadaLipi - ಜಿಲ್ಲೆಗಳ ಅಂಕಿಅಂಶ (Karnataka District Statistics)
 *
 * Source: Census of India 2011 (district-level). Bundled as static data — no
 * API key required, works offline. Figures: population, literacy %, area (km²),
 * and computed density. These are official 2011 census numbers; treat as
 * reference (the next census will update them).
 *
 * Note: districts created after 2011 (Vijayanagara, Chikkaballapura splits,
 * etc.) are reflected under their 2011 parent where applicable.
 */

export const STATE_TOTALS = {
    population: 61095297,   // Karnataka total, Census 2011
    literacy: 75.36,        // %
    area: 191791,           // km²
    districts: 31
};

// name (Kannada), nameEn, population, literacy %, area km²
export const DISTRICTS = [
    { name: "ಬೆಂಗಳೂರು ನಗರ", nameEn: "Bengaluru Urban", population: 9621551, literacy: 87.67, area: 2196 },
    { name: "ಬೆಳಗಾವಿ", nameEn: "Belagavi", population: 4779661, literacy: 73.48, area: 13415 },
    { name: "ಮೈಸೂರು", nameEn: "Mysuru", population: 3001127, literacy: 72.79, area: 6854 },
    { name: "ತುಮಕೂರು", nameEn: "Tumakuru", population: 2678980, literacy: 75.14, area: 10598 },
    { name: "ಕಲಬುರಗಿ", nameEn: "Kalaburagi", population: 2566326, literacy: 64.85, area: 10951 },
    { name: "ಬಳ್ಳಾರಿ", nameEn: "Ballari", population: 2452595, literacy: 67.43, area: 8447 },
    { name: "ವಿಜಯಪುರ", nameEn: "Vijayapura", population: 2177331, literacy: 67.15, area: 10494 },
    { name: "ದಕ್ಷಿಣ ಕನ್ನಡ", nameEn: "Dakshina Kannada", population: 2089649, literacy: 88.57, area: 4560 },
    { name: "ಧಾರವಾಡ", nameEn: "Dharwad", population: 1847023, literacy: 80.00, area: 4260 },
    { name: "ಶಿವಮೊಗ್ಗ", nameEn: "Shivamogga", population: 1752753, literacy: 80.45, area: 8477 },
    { name: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", nameEn: "Bengaluru Rural", population: 1546912, literacy: 77.93, area: 2298 },
    { name: "ರಾಯಚೂರು", nameEn: "Raichur", population: 1928812, literacy: 59.56, area: 6839 },
    { name: "ಕೋಲಾರ", nameEn: "Kolar", population: 1536401, literacy: 74.39, area: 4012 },
    { name: "ಮಂಡ್ಯ", nameEn: "Mandya", population: 1805769, literacy: 70.40, area: 4961 },
    { name: "ಹಾಸನ", nameEn: "Hassan", population: 1776421, literacy: 75.89, area: 6814 },
    { name: "ಬೀದರ್", nameEn: "Bidar", population: 1703300, literacy: 70.51, area: 5448 },
    { name: "ದಾವಣಗೆರೆ", nameEn: "Davanagere", population: 1945497, literacy: 75.74, area: 5926 },
    { name: "ಬಾಗಲಕೋಟೆ", nameEn: "Bagalkote", population: 1889752, literacy: 68.82, area: 6575 },
    { name: "ಗದಗ", nameEn: "Gadag", population: 1064570, literacy: 75.12, area: 4656 },
    { name: "ಚಿತ್ರದುರ್ಗ", nameEn: "Chitradurga", population: 1659456, literacy: 73.71, area: 8440 },
    { name: "ಉತ್ತರ ಕನ್ನಡ", nameEn: "Uttara Kannada", population: 1437169, literacy: 84.06, area: 10291 },
    { name: "ಚಿಕ್ಕಮಗಳೂರು", nameEn: "Chikkamagaluru", population: 1137961, literacy: 79.25, area: 7201 },
    { name: "ಕೊಪ್ಪಳ", nameEn: "Koppal", population: 1389920, literacy: 67.28, area: 7189 },
    { name: "ಹಾವೇರಿ", nameEn: "Haveri", population: 1597668, literacy: 77.60, area: 4823 },
    { name: "ಚಾಮರಾಜನಗರ", nameEn: "Chamarajanagara", population: 1020791, literacy: 61.43, area: 5101 },
    { name: "ಉಡುಪಿ", nameEn: "Udupi", population: 1177361, literacy: 86.24, area: 3880 },
    { name: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", nameEn: "Chikkaballapura", population: 1255104, literacy: 69.76, area: 4244 },
    { name: "ರಾಮನಗರ", nameEn: "Ramanagara", population: 1082636, literacy: 69.20, area: 3556 },
    { name: "ಯಾದಗಿರಿ", nameEn: "Yadgir", population: 1174271, literacy: 51.83, area: 5273 },
    { name: "ಕೊಡಗು", nameEn: "Kodagu", population: 554519, literacy: 82.61, area: 4102 }
];

// Add computed density (people per km²), rounded.
DISTRICTS.forEach((d) => {
    d.density = Math.round(d.population / d.area);
});
