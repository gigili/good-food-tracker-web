let translationValues = [];

export default function translate(key = "", capitalizeFirstLetter = true) {
	const language = localStorage.getItem(process.env.VUE_APP_LANG) || "english";
	const languageFile = `${language}.json`;

	try {
		translationValues = require(`@/languages/${languageFile}`);
	} catch (err) {
		//
	}

	if (key.trim().length === 0) {
		return "";
	}

	if (!translationValues[key]) {
		return `***no translation(${key},${language})***`;
	}

	return !capitalizeFirstLetter ? translationValues[key] : translationValues[key].replace(/^\w/, (c) => c.toUpperCase());
}
