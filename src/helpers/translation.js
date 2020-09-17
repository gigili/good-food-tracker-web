import translationValues from "@/languages/english.json"

export default function translate(key = "", capitalizeFirstLetter = true) {
    const language = "english";
    if (key.trim().length === 0) {
        return "";
    }
    if (!translationValues[key]) {
        return `***no translation(${key},${language})***`;
    }
    return !capitalizeFirstLetter ? translationValues[key] : translationValues[key].replace(/^\w/, (c) => c.toUpperCase());
}
