/**
 * KannadaLipi - ಆಟಗಳು (Games) data
 *
 * GUESS_OUTPUT: show a snippet, player guesses the output. The correct answer
 * is computed live by the interpreter at play time (no hardcoded answers to
 * drift), so each question only stores the code + multiple-choice distractors.
 */

export const GUESS_OUTPUT = [
    {
        id: 1,
        code: 'ಮುದ್ರಿಸು(೫ + ೩)',
        options: ["8", "53", "15", "2"]
    },
    {
        id: 2,
        code: 'ಮುದ್ರಿಸು(೧೦ - ೪)',
        options: ["6", "14", "4", "104"]
    },
    {
        id: 3,
        code: 'ಮುದ್ರಿಸು(೬ * ೭)',
        options: ["42", "13", "67", "36"]
    },
    {
        id: 4,
        code: 'ಮುದ್ರಿಸು(ವರ್ಗಮೂಲ(೬೪))',
        options: ["8", "32", "64", "16"]
    },
    {
        id: 5,
        code: 'ಮುದ್ರಿಸು(ಗರಿಷ್ಠ(೩, ೯, ೫))',
        options: ["9", "3", "5", "17"]
    },
    {
        id: 6,
        code: 'ಮುದ್ರಿಸು(ಉದ್ದ("ಕನ್ನಡ"))',
        options: ["5", "4", "6", "3"]
    },
    {
        id: 7,
        code: 'ಮುದ್ರಿಸು(೨೦ / ೪)',
        options: ["5", "80", "16", "24"]
    },
    {
        id: 8,
        code: 'ಮುದ್ರಿಸು(ಮೊತ್ತ(೧, ೨, ೩, ೪))',
        options: ["10", "1234", "9", "24"]
    }
];

/**
 * TYPING_DRILL: Kannada keywords/functions the player types against the clock
 * to build muscle memory for the language.
 */
export const TYPING_DRILL = [
    "ಮುದ್ರಿಸು",
    "ಆದರೆ",
    "ಇಲ್ಲವಾದರೆ",
    "ಪುನರಾವರ್ತನೆ",
    "ಕಾರ್ಯ",
    "ಹಿಂತಿರುಗಿಸು",
    "ವರ್ಗಮೂಲ",
    "ಗರಿಷ್ಠ",
    "ಕನಿಷ್ಠ",
    "ಸರಾಸರಿ",
    "ಜೋಡಿಸು",
    "ಶ್ರೇಣಿ"
];
