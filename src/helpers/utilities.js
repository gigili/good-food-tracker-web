import sha256 from 'crypto-js/sha256';

const Utilities = {
	rtrim(str, chr) {
		const rgxTrim = (!chr) ? new RegExp("\\s+$") : new RegExp(chr + "+$");
		return str.replace(rgxTrim, "");
	},
	ltrim(str, chr) {
		const rgxTrim = (!chr) ? new RegExp("^\\s+") : new RegExp("^" + chr + "+");
		return str.replace(rgxTrim, "");
	},
	format(c, arg) {
		let str = c.toString();
		if (arg.length > 0) {
			const t = typeof arg;
			const args = ("string" === t || "number" === t) ? [arg] : arg;
			for (const key in args) {
				if (args[key]) {
					const replaceValue = args[key];
					str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), replaceValue.toString());
				}
			}
		}
		return str;
	},
	hash(str, key = "") {
		if(key.length > 0){
			str += key;
		}

		return sha256(str).toString();
	}
}


export default Utilities;
