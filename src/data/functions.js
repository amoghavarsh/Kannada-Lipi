/**
 * KannadaLipi Function Registry
 * Single source of truth for function documentation.
 * Keep in sync with lexer.js keywords and runtime.js evaluateCall().
 */

export const FUNCTION_CATEGORIES = [
    {
        id: "output",
        name: "ಔಟ್‌ಪುಟ್ / ಇನ್‌ಪುಟ್",
        nameEn: "Output / Input",
        iconKey: "Upload",
        functions: [
            { name: "ಮುದ್ರಿಸು", nameEn: "Print", syntax: "ಮುದ್ರಿಸು(\"ಸಂದೇಶ\")", description: "ಔಟ್‌ಪುಟ್ ತೋರಿಸುತ್ತದೆ", descriptionEn: "Displays output to console", example: "ಮುದ್ರಿಸು(\"ನಮಸ್ಕಾರ!\")", result: "ನಮಸ್ಕಾರ!" },
            { name: "ಕೊಡು", nameEn: "Input", syntax: "ಕೊಡು(\"ಪ್ರಶ್ನೆ\")", description: "ಬಳಕೆದಾರರಿಂದ ಇನ್‌ಪುಟ್ ಪಡೆಯುತ್ತದೆ", descriptionEn: "Gets user input via prompt", example: "ಕೊಡು(\"ನಿಮ್ಮ ಹೆಸರು?\")", result: "ಬಳಕೆದಾರ ಇನ್‌ಪುಟ್" }
        ]
    },
    {
        id: "math-basic",
        name: "ಮೂಲ ಗಣಿತ",
        nameEn: "Basic Math",
        iconKey: "Hash",
        functions: [
            { name: "ಪೂರ್ಣಾಂಕ", nameEn: "Round", syntax: "ಪೂರ್ಣಾಂಕ(ಸಂಖ್ಯೆ)", description: "ಹತ್ತಿರದ ಪೂರ್ಣಸಂಖ್ಯೆಗೆ ಪರಿವರ್ತಿಸುತ್ತದೆ", descriptionEn: "Rounds to nearest integer", example: "ಪೂರ್ಣಾಂಕ(25.7)", result: "೨೬" },
            { name: "ಗರಿಷ್ಠ", nameEn: "Maximum", syntax: "ಗರಿಷ್ಠ(ಸಂ೧, ಸಂ೨, ...)", description: "ಅತಿ ದೊಡ್ಡ ಸಂಖ್ಯೆ ಹಿಂತಿರುಗಿಸುತ್ತದೆ", descriptionEn: "Returns the largest number", example: "ಗರಿಷ್ಠ(೫, ೯, ೩)", result: "೯" },
            { name: "ಕನಿಷ್ಠ", nameEn: "Minimum", syntax: "ಕನಿಷ್ಠ(ಸಂ೧, ಸಂ೨, ...)", description: "ಅತಿ ಚಿಕ್ಕ ಸಂಖ್ಯೆ ಹಿಂತಿರುಗಿಸುತ್ತದೆ", descriptionEn: "Returns the smallest number", example: "ಕನಿಷ್ಠ(೫, ೯, ೩)", result: "೩" },
            { name: "ವರ್ಗಮೂಲ", nameEn: "Square Root", syntax: "ವರ್ಗಮೂಲ(ಸಂಖ್ಯೆ)", description: "ವರ್ಗಮೂಲ ಲೆಕ್ಕ ಮಾಡುತ್ತದೆ", descriptionEn: "Calculates square root", example: "ವರ್ಗಮೂಲ(೧೬)", result: "೪" },
            { name: "ಘಾತ", nameEn: "Power", syntax: "ಘಾತ(ಆಧಾರ, ಘಾತಾಂಕ)", description: "ಘಾತ ಲೆಕ್ಕ ಮಾಡುತ್ತದೆ", descriptionEn: "Calculates power/exponent", example: "ಘಾತ(೨, ೩)", result: "೮" },
            { name: "ಯಾದೃಚ್ಛಿಕ", nameEn: "Random", syntax: "ಯಾದೃಚ್ಛಿಕ(ಕನಿಷ್ಠ, ಗರಿಷ್ಠ)", description: "ಯಾದೃಚ್ಛಿಕ ಸಂಖ್ಯೆ ಉತ್ಪಾದಿಸುತ್ತದೆ", descriptionEn: "Generates random number", example: "ಯಾದೃಚ್ಛಿಕ(೧, ೧೦೦)", result: "ಯಾವುದಾದರೂ" },
            { name: "ನಿರಪೇಕ್ಷ", nameEn: "Absolute", syntax: "ನಿರಪೇಕ್ಷ(ಸಂಖ್ಯೆ)", description: "ನಿರಪೇಕ್ಷ ಮೌಲ್ಯ", descriptionEn: "Returns absolute value", example: "ನಿರಪೇಕ್ಷ(-೫)", result: "೫" },
            { name: "ಪೂರ್ಣ", nameEn: "Floor", syntax: "ಪೂರ್ಣ(ಸಂಖ್ಯೆ)", description: "ಕೆಳಮುಖ ಪೂರ್ಣಾಂಕ", descriptionEn: "Rounds down to integer", example: "ಪೂರ್ಣ(5.9)", result: "೫" },
            { name: "ಮೇಲ್ಮೈ", nameEn: "Ceil", syntax: "ಮೇಲ್ಮೈ(ಸಂಖ್ಯೆ)", description: "ಮೇಲ್ಮುಖ ಪೂರ್ಣಾಂಕ", descriptionEn: "Rounds up to integer", example: "ಮೇಲ್ಮೈ(5.1)", result: "೬" },
            { name: "ಲಾಗ್", nameEn: "Logarithm", syntax: "ಲಾಗ್(ಸಂಖ್ಯೆ) / ಲಾಗ್(ಸಂಖ್ಯೆ, ಆಧಾರ)", description: "ಲಾಗರಿಥಮ್ ಲೆಕ್ಕ ಮಾಡುತ್ತದೆ (ಆಧಾರ ಇಲ್ಲದಿದ್ದರೆ ನೈಸರ್ಗಿಕ ಲಾಗ್)", descriptionEn: "Calculates logarithm (natural log if no base)", example: "ಲಾಗ್(೧೦೦, ೧೦)", result: "೨" },
            { name: "ಅಂಶ", nameEn: "Factorial", syntax: "ಅಂಶ(ಸಂಖ್ಯೆ)", description: "ಅಂಶಗಣಿತ (n!) ಲೆಕ್ಕ ಮಾಡುತ್ತದೆ", descriptionEn: "Calculates factorial (n!)", example: "ಅಂಶ(೫)", result: "೧೨೦" },
            { name: "ಸರಾಸರಿ", nameEn: "Average", syntax: "ಸರಾಸರಿ(ಸಂ೧, ಸಂ೨, ...)", description: "ಸಂಖ್ಯೆಗಳ ಸರಾಸರಿ ಲೆಕ್ಕ ಮಾಡುತ್ತದೆ", descriptionEn: "Calculates average/mean of numbers", example: "ಸರಾಸರಿ(೧೦, ೨೦, ೩೦)", result: "೨೦" },
            { name: "ಮೊತ್ತ", nameEn: "Sum", syntax: "ಮೊತ್ತ(ಸಂ೧, ಸಂ೨, ...) / ಮೊತ್ತ(ಪಟ್ಟಿ)", description: "ಸಂಖ್ಯೆಗಳ ಅಥವಾ ಪಟ್ಟಿಯ ಮೊತ್ತ ಲೆಕ್ಕ ಮಾಡುತ್ತದೆ", descriptionEn: "Calculates sum of numbers or array", example: "ಮೊತ್ತ(೧೦, ೨೦, ೩೦)", result: "೬೦" },
            { name: "ಪೈ", nameEn: "PI", syntax: "ಪೈ", description: "ಪೈ ಸ್ಥಿರಾಂಕ (3.14159...)", descriptionEn: "PI constant (3.14159...)", example: "ಮುದ್ರಿಸು(ಪೈ)", result: "೩.೧೪೧೫೯೨೬೫೩೫೮೯೭೯೩" },
            { name: "ಇ_ಸಂಖ್ಯೆ", nameEn: "Euler's E", syntax: "ಇ_ಸಂಖ್ಯೆ", description: "ಯೂಲರ್ ಸಂಖ್ಯೆ (2.71828...)", descriptionEn: "Euler's number (2.71828...)", example: "ಮುದ್ರಿಸು(ಇ_ಸಂಖ್ಯೆ)", result: "೨.೭೧೮೨೮೧೮೨೮೪೫೯೦೪೫" }
        ]
    },
    {
        id: "trigonometry",
        name: "ತ್ರಿಕೋನಮಿತಿ",
        nameEn: "Trigonometry",
        iconKey: "Triangle",
        functions: [
            { name: "ಸೈನ್", nameEn: "Sine", syntax: "ಸೈನ್(ಡಿಗ್ರಿ)", description: "ಸೈನ್ ಮೌಲ್ಯ (ಡಿಗ್ರಿಯಲ್ಲಿ)", descriptionEn: "Sine value (degrees)", example: "ಸೈನ್(೯೦)", result: "೧" },
            { name: "ಕೊಸೈನ್", nameEn: "Cosine", syntax: "ಕೊಸೈನ್(ಡಿಗ್ರಿ)", description: "ಕೊಸೈನ್ ಮೌಲ್ಯ (ಡಿಗ್ರಿಯಲ್ಲಿ)", descriptionEn: "Cosine value (degrees)", example: "ಕೊಸೈನ್(೦)", result: "೧" },
            { name: "ಟ್ಯಾನ್", nameEn: "Tangent", syntax: "ಟ್ಯಾನ್(ಡಿಗ್ರಿ)", description: "ಟ್ಯಾನ್ಜೆಂಟ್ ಮೌಲ್ಯ", descriptionEn: "Tangent value (degrees)", example: "ಟ್ಯಾನ್(೪೫)", result: "೧" }
        ]
    },
    {
        id: "string",
        name: "ಪಠ್ಯ ಕಾರ್ಯಗಳು",
        nameEn: "String Functions",
        iconKey: "FileText",
        functions: [
            { name: "ಒಟ್ಟು", nameEn: "Length", syntax: "ಒಟ್ಟು(\"ಪಠ್ಯ\")", description: "ಅಕ್ಷರಗಳ ಸಂಖ್ಯೆ", descriptionEn: "Returns character count", example: "ಒಟ್ಟು(\"ಕನ್ನಡ\")", result: "೬" },
            { name: "ಜೋಡಿಸು", nameEn: "Concatenate", syntax: "ಜೋಡಿಸು(\"ಪಠ್ಯ೧\", \"ಪಠ್ಯ೨\")", description: "ಪಠ್ಯಗಳನ್ನು ಜೋಡಿಸುತ್ತದೆ", descriptionEn: "Joins strings", example: "ಜೋಡಿಸು(\"ಜೈ \", \"ಕರ್ನಾಟಕ\")", result: "ಜೈ ಕರ್ನಾಟಕ" },
            { name: "ಪ್ರತಿಬಿಂಬ", nameEn: "Reverse", syntax: "ಪ್ರತಿಬಿಂಬ(\"ಪಠ್ಯ\")", description: "ಪಠ್ಯವನ್ನು ಹಿಮ್ಮುಖಗೊಳಿಸುತ್ತದೆ", descriptionEn: "Reverses string", example: "ಪ್ರತಿಬಿಂಬ(\"abc\")", result: "cba" },
            { name: "ವಿಭಜಿಸು", nameEn: "Split", syntax: "ವಿಭಜಿಸು(\"ಪಠ್ಯ\", \"ವಿಭಜಕ\")", description: "ಪಠ್ಯವನ್ನು ಪಟ್ಟಿಯಾಗಿ ವಿಭಜಿಸುತ್ತದೆ", descriptionEn: "Splits string into array", example: "ವಿಭಜಿಸು(\"ಅ,ಆ,ಇ\", \",\")", result: "[ಅ, ಆ, ಇ]" },
            { name: "ಬದಲಿಸು", nameEn: "Replace", syntax: "ಬದಲಿಸು(\"ಪಠ್ಯ\", \"ಹುಡುಕು\", \"ಬದಲಿ\")", description: "ಪಠ್ಯವನ್ನು ಬದಲಿಸುತ್ತದೆ", descriptionEn: "Replaces text", example: "ಬದಲಿಸು(\"ಹಲೋ\", \"ಲೋ\", \"ಲ್ಲೋ\")", result: "ಹಲ್ಲೋ" },
            { name: "ಒಳಗೊಂಡಿದೆ", nameEn: "Includes", syntax: "ಒಳಗೊಂಡಿದೆ(\"ಪಠ್ಯ\", \"ಹುಡುಕು\")", description: "ಪಠ್ಯ ಇದೆಯೇ ಪರಿಶೀಲಿಸುತ್ತದೆ", descriptionEn: "Checks if contains text", example: "ಒಳಗೊಂಡಿದೆ(\"ಕರ್ನಾಟಕ\", \"ನಾ\")", result: "ಸತ್ಯ" },
            { name: "ಟ್ರಿಮ್", nameEn: "Trim", syntax: "ಟ್ರಿಮ್(\"ಪಠ್ಯ\")", description: "ಅಂಚಿನ ಖಾಲಿ ತೆಗೆಯುತ್ತದೆ", descriptionEn: "Removes whitespace", example: "ಟ್ರಿಮ್(\"  ಹಲೋ  \")", result: "ಹಲೋ" },
            { name: "ಉದ್ದ", nameEn: "String Length", syntax: "ಉದ್ದ(\"ಪಠ್ಯ\")", description: "ಪಠ್ಯದ ಉದ್ದ ಹಿಂತಿರುಗಿಸುತ್ತದೆ", descriptionEn: "Returns string length", example: "ಉದ್ದ(\"ಕನ್ನಡ\")", result: "೬" },
            { name: "ಕತ್ತರಿಸು", nameEn: "Substring", syntax: "ಕತ್ತರಿಸು(\"ಪಠ್ಯ\", ಆರಂಭ, ಉದ್ದ)", description: "ಪಠ್ಯದ ಭಾಗವನ್ನು ಕತ್ತರಿಸುತ್ತದೆ", descriptionEn: "Extracts part of a string", example: "ಕತ್ತರಿಸು(\"ಕರ್ನಾಟಕ\", ೦, ೩)", result: "ಕರ್ನ" },
            { name: "ದೊಡ್ಡಕ್ಷರ", nameEn: "Uppercase", syntax: "ದೊಡ್ಡಕ್ಷರ(\"ಪಠ್ಯ\")", description: "ದೊಡ್ಡಕ್ಷರಕ್ಕೆ ಪರಿವರ್ತಿಸುತ್ತದೆ", descriptionEn: "Converts to uppercase", example: "ದೊಡ್ಡಕ್ಷರ(\"hello\")", result: "HELLO" },
            { name: "ಸಣ್ಣಕ್ಷರ", nameEn: "Lowercase", syntax: "ಸಣ್ಣಕ್ಷರ(\"ಪಠ್ಯ\")", description: "ಸಣ್ಣಕ್ಷರಕ್ಕೆ ಪರಿವರ್ತಿಸುತ್ತದೆ", descriptionEn: "Converts to lowercase", example: "ಸಣ್ಣಕ್ಷರ(\"HELLO\")", result: "hello" },
            { name: "ಎಣಿಕೆ", nameEn: "Word Count", syntax: "ಎಣಿಕೆ(\"ಪಠ್ಯ\")", description: "ಪದಗಳ ಎಣಿಕೆ", descriptionEn: "Counts words in text", example: "ಎಣಿಕೆ(\"ಜೈ ಕರ್ನಾಟಕ ಮಾತೆ\")", result: "೩" },
            { name: "ಪುನರಾವರ್ತಿಸು", nameEn: "Repeat", syntax: "ಪುನರಾವರ್ತಿಸು(\"ಪಠ್ಯ\", ಸಂಖ್ಯೆ)", description: "ಪಠ್ಯವನ್ನು ನಿರ್ದಿಷ್ಟ ಸಂಖ್ಯೆಯ ಬಾರಿ ಪುನರಾವರ್ತಿಸುತ್ತದೆ", descriptionEn: "Repeats a string N times", example: "ಪುನರಾವರ್ತಿಸು(\"ಕನ್ನಡ \", ೩)", result: "ಕನ್ನಡ ಕನ್ನಡ ಕನ್ನಡ " },
            { name: "ಪ್ಯಾಡ್", nameEn: "Pad", syntax: "ಪ್ಯಾಡ್(\"ಪಠ್ಯ\", ಉದ್ದ, \"ಅಕ್ಷರ\", \"ದಿಕ್ಕು\")", description: "ಪಠ್ಯವನ್ನು ನಿರ್ದಿಷ್ಟ ಉದ್ದಕ್ಕೆ ಪ್ಯಾಡ್ ಮಾಡುತ್ತದೆ", descriptionEn: "Pads string to specified length (direction: ಬಲ/ಎಡ)", example: "ಪ್ಯಾಡ್(\"೫\", ೩, \"೦\", \"ಎಡ\")", result: "೦೦೫" }
        ]
    },
    {
        id: "datetime",
        name: "ದಿನಾಂಕ ಮತ್ತು ಸಮಯ",
        nameEn: "Date & Time",
        iconKey: "Clock",
        functions: [
            { name: "ಇಂದು", nameEn: "Today", syntax: "ಇಂದು()", description: "ಇಂದಿನ ದಿನಾಂಕ", descriptionEn: "Returns today's date", example: "ಇಂದು()", result: "೦೯/೦೨/೨೦೨೬" },
            { name: "ಸಮಯ", nameEn: "Time", syntax: "ಸಮಯ()", description: "ಪ್ರಸ್ತುತ ಸಮಯ", descriptionEn: "Returns current time", example: "ಸಮಯ()", result: "೧೪:೩೦:೪೫" },
            { name: "ವರ್ಷ", nameEn: "Year", syntax: "ವರ್ಷ()", description: "ಪ್ರಸ್ತುತ ವರ್ಷ", descriptionEn: "Returns current year", example: "ವರ್ಷ()", result: "೨೦೨೬" },
            { name: "ತಿಂಗಳು", nameEn: "Month", syntax: "ತಿಂಗಳು()", description: "ಪ್ರಸ್ತುತ ತಿಂಗಳು", descriptionEn: "Returns current month", example: "ತಿಂಗಳು()", result: "೨" },
            { name: "ದಿನ", nameEn: "Day", syntax: "ದಿನ()", description: "ಪ್ರಸ್ತುತ ದಿನ", descriptionEn: "Returns current day", example: "ದಿನ()", result: "೯" }
        ]
    },
    {
        id: "sorting",
        name: "ವಿಂಗಡಣೆ",
        nameEn: "Sorting",
        iconKey: "BarChart3",
        functions: [
            { name: "ಏರಿಕೆ", nameEn: "Sort Ascending", syntax: "ಏರಿಕೆ(ಸಂ೧, ಸಂ೨, ...)", description: "ಏರಿಕೆ ಕ್ರಮದಲ್ಲಿ ವಿಂಗಡಿಸುತ್ತದೆ", descriptionEn: "Sorts in ascending order", example: "ಏರಿಕೆ(೫, ೨, ೮, ೧)", result: "೧, ೨, ೫, ೮" },
            { name: "ಇಳಿಕೆ", nameEn: "Sort Descending", syntax: "ಇಳಿಕೆ(ಸಂ೧, ಸಂ೨, ...)", description: "ಇಳಿಕೆ ಕ್ರಮದಲ್ಲಿ ವಿಂಗಡಿಸುತ್ತದೆ", descriptionEn: "Sorts in descending order", example: "ಇಳಿಕೆ(೫, ೨, ೮, ೧)", result: "೮, ೫, ೨, ೧" }
        ]
    },
    {
        id: "type-conversion",
        name: "ಪ್ರಕಾರ ಪರಿವರ್ತನೆ",
        nameEn: "Type Conversion",
        iconKey: "RefreshCw",
        functions: [
            { name: "ಸಂಖ್ಯೆಗೆ", nameEn: "To Number", syntax: "ಸಂಖ್ಯೆಗೆ(\"ಪಠ್ಯ\")", description: "ಪಠ್ಯವನ್ನು ಸಂಖ್ಯೆಗೆ ಪರಿವರ್ತಿಸುತ್ತದೆ", descriptionEn: "Converts text to number", example: "ಸಂಖ್ಯೆಗೆ(\"೪೨\")", result: "42" },
            { name: "ಪಠ್ಯಕ್ಕೆ", nameEn: "To String", syntax: "ಪಠ್ಯಕ್ಕೆ(ಮೌಲ್ಯ)", description: "ಮೌಲ್ಯವನ್ನು ಪಠ್ಯಕ್ಕೆ ಪರಿವರ್ತಿಸುತ್ತದೆ", descriptionEn: "Converts value to string", example: "ಪಠ್ಯಕ್ಕೆ(೪೨)", result: "೪೨" },
            { name: "ಪ್ರಕಾರ", nameEn: "Type", syntax: "ಪ್ರಕಾರ(ಮೌಲ್ಯ)", description: "ಮೌಲ್ಯದ ಪ್ರಕಾರ ಹಿಂತಿರುಗಿಸುತ್ತದೆ", descriptionEn: "Returns value type", example: "ಪ್ರಕಾರ(೪೨)", result: "ಸಂಖ್ಯೆ" },
            { name: "ಅಂಕಿಗಳು", nameEn: "Digits", syntax: "ಅಂಕಿಗಳು(ಸಂಖ್ಯೆ)", description: "ಸಂಖ್ಯೆಯ ಅಂಕಿಗಳನ್ನು ಪಟ್ಟಿಯಾಗಿ ಹಿಂತಿರುಗಿಸುತ್ತದೆ", descriptionEn: "Extracts digits of a number into an array", example: "ಅಂಕಿಗಳು(೧೨೩)", result: "[೧, ೨, ೩]" },
            { name: "ಸಂಖ್ಯೆಯೇ", nameEn: "Is Number", syntax: "ಸಂಖ್ಯೆಯೇ(ಮೌಲ್ಯ)", description: "ಮೌಲ್ಯವು ಸಂಖ್ಯೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸುತ್ತದೆ", descriptionEn: "Checks if value is a number", example: "ಸಂಖ್ಯೆಯೇ(೪೨)", result: "ಸತ್ಯ" }
        ]
    },
    {
        id: "array",
        name: "ಪಟ್ಟಿ ಕಾರ್ಯಗಳು",
        nameEn: "Array Functions",
        iconKey: "ClipboardList",
        functions: [
            { name: "ಸಂಗ್ರಹಿಸು", nameEn: "Collect", syntax: "ಸಂಗ್ರಹಿಸು(\"ಸಂ೧,ಸಂ೨,...\")", description: "ಅಲ್ಪವಿರಾಮ-ಬೇರ್ಪಡಿಸಿದ ಸಂಖ್ಯೆಗಳನ್ನು ಪಟ್ಟಿಯಾಗಿ ಸಂಗ್ರಹಿಸುತ್ತದೆ", descriptionEn: "Collects comma-separated numbers into array", example: "ಸಂಗ್ರಹಿಸು(\"೫,೩,೮\")", result: "[5, 3, 8]" },
            { name: "ಹುಡುಕು", nameEn: "Search", syntax: "ಹುಡುಕು(ಪಟ್ಟಿ, ಮೌಲ್ಯ)", description: "ಪಟ್ಟಿಯಲ್ಲಿ ಮೌಲ್ಯವನ್ನು ಹುಡುಕುತ್ತದೆ", descriptionEn: "Searches for value in array", example: "ಹುಡುಕು(ಪಟ್ಟಿ, ೫)", result: "ಸ್ಥಾನ ಸೂಚಿ" },
            { name: "ಬದಲಾವಣೆ", nameEn: "Swap", syntax: "ಬದಲಾವಣೆ(ವೇರಿ೧, ವೇರಿ೨)", description: "ಎರಡು ವೇರಿಯಬಲ್‌ಗಳ ಮೌಲ್ಯಗಳನ್ನು ಅದಲು-ಬದಲು ಮಾಡುತ್ತದೆ", descriptionEn: "Swaps values of two variables", example: "ಬದಲಾವಣೆ(ಅ, ಆ)", result: "ಅ ↔ ಆ" },
            { name: "ಸೇರಿಸು", nameEn: "Push", syntax: "ಸೇರಿಸು(ಪಟ್ಟಿ, ಮೌಲ್ಯ)", description: "ಪಟ್ಟಿಗೆ ಅಂಶ ಸೇರಿಸುತ್ತದೆ", descriptionEn: "Adds element to array", example: "ಸೇರಿಸು(ಪಟ್ಟಿ, ೫)", result: "[..., ೫]" },
            { name: "ತೆಗೆ", nameEn: "Pop", syntax: "ತೆಗೆ(ಪಟ್ಟಿ)", description: "ಪಟ್ಟಿಯ ಕೊನೆಯ ಅಂಶ ತೆಗೆಯುತ್ತದೆ", descriptionEn: "Removes last element", example: "ತೆಗೆ(ಪಟ್ಟಿ)", result: "ಕೊನೆಯ ಅಂಶ" },
            { name: "ವಿಲೀನ", nameEn: "Join", syntax: "ವಿಲೀನ(ಪಟ್ಟಿ, \"ವಿಭಜಕ\")", description: "ಪಟ್ಟಿಯನ್ನು ಪಠ್ಯವಾಗಿ ಜೋಡಿಸುತ್ತದೆ", descriptionEn: "Joins array into string", example: "ವಿಲೀನ([\"ಅ\", \"ಆ\"], \"-\")", result: "ಅ-ಆ" },
            { name: "ಪಟ್ಟಿಯ_ಉದ್ದ", nameEn: "Array Length", syntax: "ಪಟ್ಟಿಯ_ಉದ್ದ(ಪಟ್ಟಿ)", description: "ಪಟ್ಟಿಯ ಉದ್ದ ಹಿಂತಿರುಗಿಸುತ್ತದೆ", descriptionEn: "Returns array length", example: "ಪಟ್ಟಿಯ_ಉದ್ದ([೧, ೨, ೩])", result: "೩" },
            { name: "ಶ್ರೇಣಿ", nameEn: "Range", syntax: "ಶ್ರೇಣಿ(ಆರಂಭ, ಅಂತ್ಯ)", description: "ಸಂಖ್ಯೆಗಳ ಶ್ರೇಣಿಯನ್ನು ಪಟ್ಟಿಯಾಗಿ ರಚಿಸುತ್ತದೆ", descriptionEn: "Creates a range of numbers as array", example: "ಶ್ರೇಣಿ(೧, ೫)", result: "[೧, ೨, ೩, ೪, ೫]" },
            { name: "ವಿಶಿಷ್ಟ", nameEn: "Unique", syntax: "ವಿಶಿಷ್ಟ(ಪಟ್ಟಿ)", description: "ಪಟ್ಟಿಯಿಂದ ನಕಲು ಅಂಶಗಳನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ", descriptionEn: "Removes duplicate elements from array", example: "ವಿಶಿಷ್ಟ([೧, ೨, ೨, ೩, ೩])", result: "[೧, ೨, ೩]" },
            { name: "ತಿರುಗಿಸು", nameEn: "Reverse Array", syntax: "ತಿರುಗಿಸು(ಪಟ್ಟಿ)", description: "ಪಟ್ಟಿಯನ್ನು ಹಿಮ್ಮುಖಗೊಳಿಸುತ್ತದೆ", descriptionEn: "Reverses an array or string", example: "ತಿರುಗಿಸು([೧, ೨, ೩])", result: "[೩, ೨, ೧]" }
        ]
    },
    {
        id: "higher-order",
        name: "ಉನ್ನತ ಪಟ್ಟಿ ಕಾರ್ಯಗಳು",
        nameEn: "Higher-Order Array Functions",
        iconKey: "Link",
        functions: [
            { name: "ನಕ್ಷೆ", nameEn: "Map", syntax: "ನಕ್ಷೆ(ಪಟ್ಟಿ, \"ಕಾರ್ಯ_ಹೆಸರು\")", description: "ಪಟ್ಟಿಯ ಪ್ರತಿ ಅಂಶಕ್ಕೆ ಕಾರ್ಯ ಅನ್ವಯಿಸುತ್ತದೆ", descriptionEn: "Applies a function to each element", example: "ನಕ್ಷೆ([೧, ೨, ೩], \"ದ್ವಿಗುಣ\")", result: "[೨, ೪, ೬]" },
            { name: "ಶೋಧಕ", nameEn: "Filter", syntax: "ಶೋಧಕ(ಪಟ್ಟಿ, \"ಕಾರ್ಯ_ಹೆಸರು\")", description: "ಷರತ್ತು ಪೂರೈಸುವ ಅಂಶಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡುತ್ತದೆ", descriptionEn: "Keeps elements that pass a test function", example: "ಶೋಧಕ([೧, ೨, ೩, ೪], \"ಸಮ\")", result: "[೨, ೪]" },
            { name: "ಕಡಿತ", nameEn: "Reduce", syntax: "ಕಡಿತ(ಪಟ್ಟಿ, \"ಕಾರ್ಯ_ಹೆಸರು\", ಆರಂಭ_ಮೌಲ್ಯ)", description: "ಪಟ್ಟಿಯನ್ನು ಒಂದೇ ಮೌಲ್ಯಕ್ಕೆ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ", descriptionEn: "Reduces array to a single value", example: "ಕಡಿತ([೧, ೨, ೩], \"ಮೊತ್ತ\", ೦)", result: "೬" }
        ]
    }
];

export const OPERATORS = {
    arithmetic: [
        { symbol: "+", name: "ಸೇರ್ಪಡೆ", nameEn: "Addition", example: "೫ + ೩ = ೮" },
        { symbol: "-", name: "ವ್ಯವಕಲನ", nameEn: "Subtraction", example: "೧೦ - ೪ = ೬" },
        { symbol: "*", name: "ಗುಣಾಕಾರ", nameEn: "Multiplication", example: "೬ * ೭ = ೪೨" },
        { symbol: "/", name: "ಭಾಗಾಕಾರ", nameEn: "Division", example: "೨೦ / ೫ = ೪" },
        { symbol: "%", name: "ಶೇಷ", nameEn: "Modulo", example: "೧೦ % ೩ = ೧" }
    ],
    comparison: [
        { symbol: ">", name: "ದೊಡ್ಡದು", nameEn: "Greater than", example: "೫ > ೩ → ಸತ್ಯ" },
        { symbol: "<", name: "ಚಿಕ್ಕದು", nameEn: "Less than", example: "೩ < ೫ → ಸತ್ಯ" },
        { symbol: "==", name: "ಸಮಾನ", nameEn: "Equal", example: "೫ == ೫ → ಸತ್ಯ" },
        { symbol: "!=", name: "ಅಸಮಾನ", nameEn: "Not equal", example: "೫ != ೩ → ಸತ್ಯ" }
    ],
    logical: [
        { symbol: "ಮತ್ತು", name: "ಮತ್ತು", nameEn: "AND", example: "ಸತ್ಯ ಮತ್ತು ಸತ್ಯ → ಸತ್ಯ" },
        { symbol: "ಅಥವಾ", name: "ಅಥವಾ", nameEn: "OR", example: "ಸತ್ಯ ಅಥವಾ ಸುಳ್ಳು → ಸತ್ಯ" },
        { symbol: "ಅಲ್ಲ", name: "ಅಲ್ಲ", nameEn: "NOT", example: "ಅಲ್ಲ ಸತ್ಯ → ಸುಳ್ಳು" }
    ]
};

export const CONTROL_FLOW = {
    conditionals: [
        { name: "ಆದರೆ", nameEn: "if", syntax: "ಆದರೆ ಷರತ್ತು : ಕ್ರಿಯೆ", description: "ಷರತ್ತು ಸತ್ಯವಾದರೆ ಕ್ರಿಯೆ ನಡೆಸುತ್ತದೆ", example: "ಆದರೆ ಅ > ೧೦ : ಮುದ್ರಿಸು(\"ದೊಡ್ಡದು\")" },
        { name: "ಇಲ್ಲವಾದರೆ", nameEn: "else", syntax: "ಇಲ್ಲವಾದರೆ? ಕ್ರಿಯೆ", description: "ಷರತ್ತು ಸುಳ್ಳಾದರೆ ಕ್ರಿಯೆ ನಡೆಸುತ್ತದೆ", example: "ಇಲ್ಲವಾದರೆ? ಮುದ್ರಿಸು(\"ಚಿಕ್ಕದು\")" }
    ],
    loops: [
        { name: "ಪುನರಾವರ್ತನೆ", nameEn: "for loop", syntax: "ಪುನರಾವರ್ತನೆ ವೇರಿ ರಿಂದ ಆರಂಭ ವರೆಗೆ ಅಂತ್ಯ : ಕ್ರಿಯೆ", description: "ನಿರ್ದಿಷ್ಟ ಸಂಖ್ಯೆಯ ಪುನರಾವರ್ತನೆ", example: "ಪುನರಾವರ್ತನೆ ಇ ರಿಂದ ೧ ವರೆಗೆ ೧೦ : ಮುದ್ರಿಸು(ಇ)" },
        { name: "ಆವರ್ತನೆ", nameEn: "while loop", syntax: "ಆವರ್ತನೆ ಷರತ್ತು : ಕ್ರಿಯೆ", description: "ಷರತ್ತು ಸತ್ಯವಾಗಿರುವವರೆಗೆ ಪುನರಾವರ್ತನೆ", example: "ಆವರ್ತನೆ ಇ < ೧೦ : ಮುದ್ರಿಸು(ಇ)" }
    ]
};
