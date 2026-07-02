/**
 * KannadaLipi - ಇಂದಿನ ಸವಾಲು (Daily Challenge) data
 *
 * A rotating set of student-friendly coding challenges. One is shown per day,
 * picked deterministically from the date so every learner (and every classroom)
 * sees the same challenge on the same day. Answers auto-verify by comparing the
 * interpreter's output to `expectedOutput` (trimmed) — no backend needed.
 *
 * Difficulty: 1 = easy (print/vars), 2 = medium (math/functions),
 * 3 = harder (loops/logic). Ordered roughly easy → hard, but the daily pick
 * rotates through all of them.
 */

export const CHALLENGES = [
    {
        id: 1, level: 1,
        title: "ನಮಸ್ಕಾರ ಕರ್ನಾಟಕ",
        prompt: 'ಪರದೆಯ ಮೇಲೆ "ನಮಸ್ಕಾರ ಕರ್ನಾಟಕ" ಎಂದು ಮುದ್ರಿಸಿ.',
        starter: '# ಇಲ್ಲಿ ಬರೆಯಿರಿ\n',
        expectedOutput: "ನಮಸ್ಕಾರ ಕರ್ನಾಟಕ",
        hint: 'ಮುದ್ರಿಸು("ನಮಸ್ಕಾರ ಕರ್ನಾಟಕ") ಎಂದು ಬರೆಯಿರಿ.'
    },
    {
        id: 2, level: 1,
        title: "ನಿಮ್ಮ ಹೆಸರು",
        prompt: 'ಒಂದು ವೇರಿಯಬಲ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು "ಕನ್ನಡ" ಎಂದು ಇಟ್ಟು ಅದನ್ನು ಮುದ್ರಿಸಿ.',
        starter: '# ವೇರಿಯಬಲ್ ಬಳಸಿ\n',
        expectedOutput: "ಕನ್ನಡ",
        hint: 'ಹೆಸರು = "ಕನ್ನಡ" ನಂತರ ಮುದ್ರಿಸು(ಹೆಸರು).'
    },
    {
        id: 3, level: 1,
        title: "ಮೊತ್ತ",
        prompt: "೨೫ ಮತ್ತು ೭೫ ರ ಮೊತ್ತವನ್ನು ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೧೦೦)",
        starter: "# ಎರಡು ಸಂಖ್ಯೆಗಳ ಮೊತ್ತ\n",
        expectedOutput: "೧೦೦",
        hint: 'ಮುದ್ರಿಸು(೨೫ + ೭೫)'
    },
    {
        id: 4, level: 1,
        title: "ವ್ಯತ್ಯಾಸ",
        prompt: "೧೦೦ ರಿಂದ ೩೭ ಕಳೆಯಿರಿ ಮತ್ತು ಫಲಿತಾಂಶ ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೬೩)",
        starter: "# ಕಳೆಯುವಿಕೆ\n",
        expectedOutput: "೬೩",
        hint: 'ಮುದ್ರಿಸು(೧೦೦ - ೩೭)'
    },
    {
        id: 5, level: 2,
        title: "ಗುಣಾಕಾರ",
        prompt: "೧೨ ರ ಮಗ್ಗಿ: ೧೨ ಅನ್ನು ೭ ರಿಂದ ಗುಣಿಸಿ ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೮೪)",
        starter: "# ಗುಣಾಕಾರ\n",
        expectedOutput: "೮೪",
        hint: 'ಮುದ್ರಿಸು(೧೨ * ೭)'
    },
    {
        id: 6, level: 2,
        title: "ವರ್ಗಮೂಲ",
        prompt: "೧೪೪ ರ ವರ್ಗಮೂಲ ಕಂಡುಹಿಡಿಯಿರಿ. (ಉತ್ತರ: ೧೨)",
        starter: "# ವರ್ಗಮೂಲ ಕಾರ್ಯ ಬಳಸಿ\n",
        expectedOutput: "೧೨",
        hint: 'ಮುದ್ರಿಸು(ವರ್ಗಮೂಲ(೧೪೪))'
    },
    {
        id: 7, level: 2,
        title: "ಗರಿಷ್ಠ ಸಂಖ್ಯೆ",
        prompt: "೩೪, ೮೯, ೧೨, ೫೬ ಇವುಗಳಲ್ಲಿ ಗರಿಷ್ಠ ಸಂಖ್ಯೆ ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೮೯)",
        starter: "# ಗರಿಷ್ಠ ಕಾರ್ಯ\n",
        expectedOutput: "೮೯",
        hint: 'ಮುದ್ರಿಸು(ಗರಿಷ್ಠ(೩೪, ೮೯, ೧೨, ೫೬))'
    },
    {
        id: 8, level: 2,
        title: "ಕನಿಷ್ಠ ಸಂಖ್ಯೆ",
        prompt: "೪೫, ೨೩, ೬೭, ೯ ಇವುಗಳಲ್ಲಿ ಕನಿಷ್ಠ ಸಂಖ್ಯೆ ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೯)",
        starter: "# ಕನಿಷ್ಠ ಕಾರ್ಯ\n",
        expectedOutput: "೯",
        hint: 'ಮುದ್ರಿಸು(ಕನಿಷ್ಠ(೪೫, ೨೩, ೬೭, ೯))'
    },
    {
        id: 9, level: 2,
        title: "ಸರಾಸರಿ",
        prompt: "೧೦, ೨೦, ೩೦, ೪೦ ಇವುಗಳ ಸರಾಸರಿ ಕಂಡುಹಿಡಿಯಿರಿ. (ಉತ್ತರ: ೨೫)",
        starter: "# ಸರಾಸರಿ ಕಾರ್ಯ\n",
        expectedOutput: "೨೫",
        hint: 'ಮುದ್ರಿಸು(ಸರಾಸರಿ(೧೦, ೨೦, ೩೦, ೪೦))'
    },
    {
        id: 10, level: 2,
        title: "ಪದದ ಉದ್ದ",
        prompt: '"ಬೆಂಗಳೂರು" ಪದದಲ್ಲಿ ಎಷ್ಟು ಅಕ್ಷರಗಳಿವೆ? (ಉತ್ತರ: ೮)',
        starter: "# ಉದ್ದ ಕಾರ್ಯ\n",
        expectedOutput: "೮",
        hint: 'ಮುದ್ರಿಸು(ಉದ್ದ("ಬೆಂಗಳೂರು"))'
    },
    {
        id: 11, level: 2,
        title: "ಪಠ್ಯ ಜೋಡಣೆ",
        prompt: '"ಕನ್ನಡ" ಮತ್ತು "ನಾಡು" ಸೇರಿಸಿ "ಕನ್ನಡನಾಡು" ಮುದ್ರಿಸಿ.',
        starter: "# ಜೋಡಿಸು ಕಾರ್ಯ\n",
        expectedOutput: "ಕನ್ನಡನಾಡು",
        hint: 'ಮುದ್ರಿಸು(ಜೋಡಿಸು("ಕನ್ನಡ", "ನಾಡು"))'
    },
    {
        id: 12, level: 3,
        title: "೧ ರಿಂದ ೫ ಮೊತ್ತ",
        prompt: "೧ ರಿಂದ ೫ ರವರೆಗಿನ ಸಂಖ್ಯೆಗಳ ಮೊತ್ತ ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೧೫)",
        starter: "# ಮೊತ್ತ ಮತ್ತು ಶ್ರೇಣಿ ಬಳಸಿ\n",
        expectedOutput: "೧೫",
        hint: 'ಮುದ್ರಿಸು(ಮೊತ್ತ(ಶ್ರೇಣಿ(೧, ೫)))'
    },
    {
        id: 13, level: 3,
        title: "ಘಾತ",
        prompt: "೨ ರ ೫ ನೇ ಘಾತ (೨⁵) ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೩೨)",
        starter: "# ಘಾತ ಕಾರ್ಯ\n",
        expectedOutput: "೩೨",
        hint: 'ಮುದ್ರಿಸು(ಘಾತ(೨, ೫))'
    },
    {
        id: 14, level: 3,
        title: "ಸಮ ಸಂಖ್ಯೆಯೇ?",
        prompt: '೧೮ ಸಮ ಸಂಖ್ಯೆಯಾದರೆ "ಸಮ" ಎಂದು ಮುದ್ರಿಸಿ. (೧೮ ಅನ್ನು ೨ ರಿಂದ ಭಾಗಿಸಿ ಶೇಷ ೦ ಆದರೆ ಸಮ)',
        starter: '# ಆದರೆ ಮತ್ತು ಶೇಷ (%) ಬಳಸಿ\nಸಂಖ್ಯೆ = ೧೮\n',
        expectedOutput: "ಸಮ",
        hint: 'ಆದರೆ ಸಂಖ್ಯೆ % ೨ == ೦ : ಮುದ್ರಿಸು("ಸಮ")'
    },
    {
        id: 15, level: 3,
        title: "ದೊಡ್ಡದು ಯಾವುದು?",
        prompt: '೪೨ ಮತ್ತು ೩೭ ರಲ್ಲಿ ೪೨ ದೊಡ್ಡದಾದರೆ "ಹೌದು" ಮುದ್ರಿಸಿ.',
        starter: '# ಆದರೆ ಷರತ್ತು ಬಳಸಿ\n',
        expectedOutput: "ಹೌದು",
        hint: 'ಆದರೆ ೪೨ > ೩೭ : ಮುದ್ರಿಸು("ಹೌದು")'
    },
    {
        id: 16, level: 1,
        title: "ಗುಣಿಸಿ ಮುದ್ರಿಸಿ",
        prompt: "೯ ಅನ್ನು ೯ ರಿಂದ ಗುಣಿಸಿ ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೮೧)",
        starter: "\n",
        expectedOutput: "೮೧",
        hint: 'ಮುದ್ರಿಸು(೯ * ೯)'
    },
    {
        id: 17, level: 2,
        title: "ನಿರಪೇಕ್ಷ ಮೌಲ್ಯ",
        prompt: "-೧೫ ರ ನಿರಪೇಕ್ಷ (absolute) ಮೌಲ್ಯ ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೧೫)",
        starter: "# ನಿರಪೇಕ್ಷ ಕಾರ್ಯ\n",
        expectedOutput: "೧೫",
        hint: 'ಮುದ್ರಿಸು(ನಿರಪೇಕ್ಷ(-೧೫))'
    },
    {
        id: 18, level: 2,
        title: "ಪಠ್ಯ ತಿರುಗಿಸಿ",
        prompt: '"ಕಮಲ" ಪದವನ್ನು ತಿರುಗಿಸಿ ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ಲಮಕ)',
        starter: "# ತಿರುಗಿಸು ಕಾರ್ಯ\n",
        expectedOutput: "ಲಮಕ",
        hint: 'ಮುದ್ರಿಸು(ತಿರುಗಿಸು("ಕಮಲ"))'
    },
    {
        id: 19, level: 3,
        title: "ವರ್ಗಗಳ ಮೊತ್ತ",
        prompt: "೩ ರ ವರ್ಗ (೩×೩) ಮತ್ತು ೪ ರ ವರ್ಗ (೪×೪) ಸೇರಿಸಿ ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೨೫)",
        starter: "# ಗುಣಾಕಾರ ಬಳಸಿ\n",
        expectedOutput: "೨೫",
        hint: 'ಮುದ್ರಿಸು(೩ * ೩ + ೪ * ೪)'
    },
    {
        id: 20, level: 3,
        title: "ಅಂಶ (Factorial)",
        prompt: "೫ ರ ಅಂಶ (5!) ಮುದ್ರಿಸಿ. (ಉತ್ತರ: ೧೨೦)",
        starter: "# ಅಂಶ ಕಾರ್ಯ\n",
        expectedOutput: "೧೨೦",
        hint: 'ಮುದ್ರಿಸು(ಅಂಶ(೫))'
    }
];

/**
 * Pick the challenge for a given date (defaults to today). Deterministic:
 * everyone sees the same one on the same day; rotates through the whole list.
 */
export const getDailyChallenge = (date = new Date()) => {
    const dayNumber = Math.floor(date.getTime() / 86400000);
    const index = ((dayNumber % CHALLENGES.length) + CHALLENGES.length) % CHALLENGES.length;
    return CHALLENGES[index];
};

/** A short YYYY-MM-DD key for storing per-day completion in localStorage. */
export const dayKey = (date = new Date()) => date.toISOString().slice(0, 10);
