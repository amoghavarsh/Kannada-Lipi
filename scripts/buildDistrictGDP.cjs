/* Aggregates taluk-level GDDP/per-capita (2019-20, data.gov.in) into districts. */
const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'talukRaw.json'), 'utf8')).data;

// Taluk -> District (2019-20 boundaries). Kannada district names for display.
const T2D = {
  // Belagavi
  Chikkodi: 'ಬೆಳಗಾವಿ', Athani: 'ಬೆಳಗಾವಿ', Raibag: 'ಬೆಳಗಾವಿ', Gokak: 'ಬೆಳಗಾವಿ', Hukkeri: 'ಬೆಳಗಾವಿ', Belagavi: 'ಬೆಳಗಾವಿ', Khanapur: 'ಬೆಳಗಾವಿ', Savadatti: 'ಬೆಳಗಾವಿ', Bailhongal: 'ಬೆಳಗಾವಿ', Ramadurg: 'ಬೆಳಗಾವಿ', Kitthuru: 'ಬೆಳಗಾವಿ', Nippani: 'ಬೆಳಗಾವಿ', Kagavada: 'ಬೆಳಗಾವಿ', Mudalagi: 'ಬೆಳಗಾವಿ', Yaragatti: 'ಬೆಳಗಾವಿ',
  // Bagalkote
  Jamakhandi: 'ಬಾಗಲಕೋಟೆ', Bilagi: 'ಬಾಗಲಕೋಟೆ', Mudhol: 'ಬಾಗಲಕೋಟೆ', Badami: 'ಬಾಗಲಕೋಟೆ', Bagalkote: 'ಬಾಗಲಕೋಟೆ', Hungund: 'ಬಾಗಲಕೋಟೆ', Guledagudda: 'ಬಾಗಲಕೋಟೆ', Ilkal: 'ಬಾಗಲಕೋಟೆ', 'RABAKAVI BANAHATTI': 'ಬಾಗಲಕೋಟೆ',
  // Vijayapura
  Bijapur: 'ವಿಜಯಪುರ', Indi: 'ವಿಜಯಪುರ', Sindagi: 'ವಿಜಯಪುರ', 'Basavan Bagewadi': 'ವಿಜಯಪುರ', Muddebihal: 'ವಿಜಯಪುರ', Nidagundi: 'ವಿಜಯಪುರ', Babaleshwara: 'ವಿಜಯಪುರ', Chadachana: 'ವಿಜಯಪುರ', Talikote: 'ವಿಜಯಪುರ', Tikota: 'ವಿಜಯಪುರ', Kolhara: 'ವಿಜಯಪುರ', 'Devara Hipparagi': 'ವಿಜಯಪುರ', Alamela: 'ವಿಜಯಪುರ',
  // Kalaburagi
  Aland: 'ಕಲಬುರಗಿ', Afzalpur: 'ಕಲಬುರಗಿ', Gulbarga: 'ಕಲಬುರಗಿ', Chincholi: 'ಕಲಬುರಗಿ', Sedam: 'ಕಲಬುರಗಿ', Chittapur: 'ಕಲಬುರಗಿ', Jevargi: 'ಕಲಬುರಗಿ', Kalagi: 'ಕಲಬುರಗಿ', Kamalapura: 'ಕಲಬುರಗಿ', Yadrami: 'ಕಲಬುರಗಿ', Shahbadha: 'ಕಲಬುರಗಿ',
  // Bidar
  Basavakalyan: 'ಬೀದರ್', Bhalki: 'ಬೀದರ್', Aurad: 'ಬೀದರ್', Bidar: 'ಬೀದರ್', Humnabad: 'ಬೀದರ್', Chittaguppa: 'ಬೀದರ್', Kamalanagara: 'ಬೀದರ್', Hulasuru: 'ಬೀದರ್',
  // Raichur
  Lingasugur: 'ರಾಯಚೂರು', Devdurga: 'ರಾಯಚೂರು', Raichur: 'ರಾಯಚೂರು', Manvi: 'ರಾಯಚೂರು', Sindhanur: 'ರಾಯಚೂರು', Maski: 'ರಾಯಚೂರು', Sirivara: 'ರಾಯಚೂರು',
  // Koppal
  Yelburga: 'ಕೊಪ್ಪಳ', Kushtagi: 'ಕೊಪ್ಪಳ', Gangavathi: 'ಕೊಪ್ಪಳ', koppal: 'ಕೊಪ್ಪಳ', Karatagi: 'ಕೊಪ್ಪಳ', Kukanuru: 'ಕೊಪ್ಪಳ', Kanakagiri: 'ಕೊಪ್ಪಳ',
  // Gadag
  Naragund: 'ಗದಗ', Rona: 'ಗದಗ', Gadag: 'ಗದಗ', Shirahatti: 'ಗದಗ', Mundargi: 'ಗದಗ', Gajendragad: 'ಗದಗ', Laxmeshwar: 'ಗದಗ',
  // Dharwad
  Dharwad: 'ಧಾರವಾಡ', Navalgund: 'ಧಾರವಾಡ', Hubli: 'ಧಾರವಾಡ', Kalgatgi: 'ಧಾರವಾಡ', Kundgol: 'ಧಾರವಾಡ', 'Hubballi Nagara': 'ಧಾರವಾಡ', Alnavara: 'ಧಾರವಾಡ', ANNIGERI: 'ಧಾರವಾಡ',
  // Uttara Kannada
  Karwar: 'ಉತ್ತರ ಕನ್ನಡ', Joida: 'ಉತ್ತರ ಕನ್ನಡ', Haliyal: 'ಉತ್ತರ ಕನ್ನಡ', Yellapur: 'ಉತ್ತರ ಕನ್ನಡ', Mundgod: 'ಉತ್ತರ ಕನ್ನಡ', Sirsi: 'ಉತ್ತರ ಕನ್ನಡ', Ankola: 'ಉತ್ತರ ಕನ್ನಡ', Kumta: 'ಉತ್ತರ ಕನ್ನಡ', Siddapur: 'ಉತ್ತರ ಕನ್ನಡ', Honnavar: 'ಉತ್ತರ ಕನ್ನಡ', Bhatkal: 'ಉತ್ತರ ಕನ್ನಡ', Dandelli: 'ಉತ್ತರ ಕನ್ನಡ',
  // Haveri
  Shiggaon: 'ಹಾವೇರಿ', Savanur: 'ಹಾವೇರಿ', Hangal: 'ಹಾವೇರಿ', Haveri: 'ಹಾವೇರಿ', Byadagi: 'ಹಾವೇರಿ', Hirekerur: 'ಹಾವೇರಿ', Ranebennur: 'ಹಾವೇರಿ', Ratteehalli: 'ಹಾವೇರಿ',
  // Ballari
  Siraguppa: 'ಬಳ್ಳಾರಿ', Ballari: 'ಬಳ್ಳಾರಿ', Sonduru: 'ಬಳ್ಳಾರಿ', Kurugodu: 'ಬಳ್ಳಾರಿ', Kampli: 'ಬಳ್ಳಾರಿ', Hospet: 'ಬಳ್ಳಾರಿ', Kudligi: 'ಬಳ್ಳಾರಿ', Hagaribommanahalli: 'ಬಳ್ಳಾರಿ', Harapanahalli: 'ಬಳ್ಳಾರಿ', Kotturu: 'ಬಳ್ಳಾರಿ', Hadagali: 'ಬಳ್ಳಾರಿ',
  // Chitradurga
  Molakalmuru: 'ಚಿತ್ರದುರ್ಗ', Challakere: 'ಚಿತ್ರದುರ್ಗ', Chitradurga: 'ಚಿತ್ರದುರ್ಗ', Holalkere: 'ಚಿತ್ರದುರ್ಗ', Hosadurga: 'ಚಿತ್ರದುರ್ಗ', Hiriyur: 'ಚಿತ್ರದುರ್ಗ',
  // Davanagere
  Harihar: 'ದಾವಣಗೆರೆ', Jagaluru: 'ದಾವಣಗೆರೆ', Davanagere: 'ದಾವಣಗೆರೆ', Honnali: 'ದಾವಣಗೆರೆ', Channagiri: 'ದಾವಣಗೆರೆ', Nyamati: 'ದಾವಣಗೆರೆ',
  // Shivamogga
  Sagara: 'ಶಿವಮೊಗ್ಗ', Soraba: 'ಶಿವಮೊಗ್ಗ', Shikaripura: 'ಶಿವಮೊಗ್ಗ', Hosanagar: 'ಶಿವಮೊಗ್ಗ', Thirthahalli: 'ಶಿವಮೊಗ್ಗ', Shimoga: 'ಶಿವಮೊಗ್ಗ', Bhadravathi: 'ಶಿವಮೊಗ್ಗ',
  // Udupi
  Kundapur: 'ಉಡುಪಿ', Udupi: 'ಉಡುಪಿ', Karkala: 'ಉಡುಪಿ', Bynduru: 'ಉಡುಪಿ', Bramhavara: 'ಉಡುಪಿ', Kapu: 'ಉಡುಪಿ', Hebri: 'ಉಡುಪಿ',
  // Chikkamagaluru
  Sringeri: 'ಚಿಕ್ಕಮಗಳೂರು', Koppa: 'ಚಿಕ್ಕಮಗಳೂರು', Narasimharajapura: 'ಚಿಕ್ಕಮಗಳೂರು', Tarikere: 'ಚಿಕ್ಕಮಗಳೂರು', Kadur: 'ಚಿಕ್ಕಮಗಳೂರು', Chikmagalur: 'ಚಿಕ್ಕಮಗಳೂರು', Mudigere: 'ಚಿಕ್ಕಮಗಳೂರು', Ajjampura: 'ಚಿಕ್ಕಮಗಳೂರು', Kalasa: 'ಚಿಕ್ಕಮಗಳೂರು',
  // Tumakuru
  Chiknayakanahalli: 'ತುಮಕೂರು', Sira: 'ತುಮಕೂರು', Pavagada: 'ತುಮಕೂರು', Madhugiri: 'ತುಮಕೂರು', Koratagere: 'ತುಮಕೂರು', Tumkur: 'ತುಮಕೂರು', Gubbi: 'ತುಮಕೂರು', Tiptur: 'ತುಮಕೂರು', Turuvekere: 'ತುಮಕೂರು', Kunigal: 'ತುಮಕೂರು',
  // Kolar
  Srinivaspura: 'ಕೋಲಾರ', Kolar: 'ಕೋಲಾರ', Malur: 'ಕೋಲಾರ', BANGARPET: 'ಕೋಲಾರ', Mulabagilu: 'ಕೋಲಾರ', 'K.G.F': 'ಕೋಲಾರ',
  // Bengaluru Urban
  'Bangalore (North)': 'ಬೆಂಗಳೂರು ನಗರ', 'Bangalore-South': 'ಬೆಂಗಳೂರು ನಗರ', Anekal: 'ಬೆಂಗಳೂರು ನಗರ', 'Bangalore-East': 'ಬೆಂಗಳೂರು ನಗರ', Yelahanka: 'ಬೆಂಗಳೂರು ನಗರ',
  // Bengaluru Rural
  Nelamangala: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ', Doddaballapura: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ', Devanahalli: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ', Hoskote: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',
  // Mandya
  Krishnarajpet: 'ಮಂಡ್ಯ', Nagamangala: 'ಮಂಡ್ಯ', Pandavpura: 'ಮಂಡ್ಯ', Srirangapatna: 'ಮಂಡ್ಯ', Mandya: 'ಮಂಡ್ಯ', Maddur: 'ಮಂಡ್ಯ', Malavalli: 'ಮಂಡ್ಯ',
  // Hassan
  Sakleshpura: 'ಹಾಸನ', Belur: 'ಹಾಸನ', Arsikere: 'ಹಾಸನ', Hassan: 'ಹಾಸನ', Alur: 'ಹಾಸನ', Arkalgud: 'ಹಾಸನ', Holenarasipura: 'ಹಾಸನ', Channarayapatna: 'ಹಾಸನ',
  // Dakshina Kannada
  Mangalore: 'ದಕ್ಷಿಣ ಕನ್ನಡ', Bantwal: 'ದಕ್ಷಿಣ ಕನ್ನಡ', Belthangady: 'ದಕ್ಷಿಣ ಕನ್ನಡ', Puttur: 'ದಕ್ಷಿಣ ಕನ್ನಡ', Sulya: 'ದಕ್ಷಿಣ ಕನ್ನಡ', Mudabidri: 'ದಕ್ಷಿಣ ಕನ್ನಡ', Kadaba: 'ದಕ್ಷಿಣ ಕನ್ನಡ', Mulki: 'ದಕ್ಷಿಣ ಕನ್ನಡ', Ullala: 'ದಕ್ಷಿಣ ಕನ್ನಡ',
  // Kodagu
  Madikeri: 'ಕೊಡಗು', Somavarapete: 'ಕೊಡಗು', Virajpet: 'ಕೊಡಗು', Ponnampete: 'ಕೊಡಗು', Kushalanagara: 'ಕೊಡಗು',
  // Mysuru
  Piriyapatna: 'ಮೈಸೂರು', Hunsur: 'ಮೈಸೂರು', 'K.R.Nagar': 'ಮೈಸೂರು', Mysuru: 'ಮೈಸೂರು', Heggadadevanakote: 'ಮೈಸೂರು', Nanjangud: 'ಮೈಸೂರು', 'T.Narasipura': 'ಮೈಸೂರು', Saraguru: 'ಮೈಸೂರು',
  // Chamarajanagara
  Gundlupet: 'ಚಾಮರಾಜನಗರ', Chamarajanagara: 'ಚಾಮರಾಜನಗರ', Yalandur: 'ಚಾಮರಾಜನಗರ', Kollegala: 'ಚಾಮರಾಜನಗರ', 'Kollegala(Hanur)': 'ಚಾಮರಾಜನಗರ',
  // Chikkaballapura
  Gauribidanur: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ', Chikballapur: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ', Gudibande: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ', Bagepalli: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ', Shidlagatta: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ', Chinthamani: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ',
  // Ramanagara
  Magadi: 'ರಾಮನಗರ', Ramanagar: 'ರಾಮನಗರ', Channapatna: 'ರಾಮನಗರ', Kanakpura: 'ರಾಮನಗರ',
  // Yadgir
  Yadgir: 'ಯಾದಗಿರಿ', Shahapur: 'ಯಾದಗಿರಿ', Shorapur: 'ಯಾದಗಿರಿ', Gurumithakala: 'ಯಾದಗಿರಿ', Vadagera: 'ಯಾದಗಿರಿ', Hunisigi: 'ಯಾದಗಿರಿ'
};

const districts = {};
const unmapped = [];

for (const row of raw) {
  const [taluk, gddpStr, pciStr] = row;
  const district = T2D[taluk];
  if (!district) { unmapped.push(taluk); continue; }
  const gddp = Number(gddpStr);
  const pci = Number(pciStr);
  if (!districts[district]) districts[district] = { name: district, gddp: 0, taluks: [] };
  districts[district].gddp += gddp;
  districts[district].taluks.push({ name: taluk, gddp, pci });
}

// District total GDDP is an exact sum. We deliberately do NOT compute a
// district-level per-capita: averaging taluk per-capita values is misleading
// (taluks have different populations), and this dataset has no taluk
// populations to weight by. Per-capita is shown only at taluk level, where the
// dataset's values are the genuine official figures. Sort taluks by GDDP desc.
const out = Object.values(districts).map((d) => {
  d.taluks.sort((a, b) => b.gddp - a.gddp);
  return { name: d.name, gddp: d.gddp, taluks: d.taluks };
}).sort((a, b) => b.gddp - a.gddp);

if (unmapped.length) console.error('UNMAPPED taluks:', unmapped);
console.log('Districts:', out.length);

const fileBody = `/**
 * KannadaLipi - ಜಿಲ್ಲೆವಾರು GDDP (District-wise economic output)
 *
 * Source: data.gov.in "District Income and Per Capita Income" (2019-20, at
 * current prices, base 2011-12). Taluk-level rows aggregated into districts.
 * gddp = sum of taluk GDDP (₹ lakh) — an exact total. taluks[] keeps each
 * taluk's gddp and pci (per-capita income, ₹) for the expandable drill-down.
 * No district-level per-capita is computed (averaging taluks would mislead).
 *
 * Auto-generated by scripts/buildDistrictGDP.cjs — do not edit by hand.
 */

export const DISTRICT_GDP = ${JSON.stringify(out, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'districtGDP.js'), fileBody);
console.log('Wrote src/data/districtGDP.js');
