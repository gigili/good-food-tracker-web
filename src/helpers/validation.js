import translate from "@/helpers/translation";
import utilities from "@/helpers/utilities";

const Validation = {
	value: "",
	label: "",
	params: [],
	allErrors: false,
	validate(validationFields, allErrors = false) {
		const errors = [];
		for (const [value, label, params] of validationFields) {
			this.value = value;
			this.label = label;
			this.params = params;
			this.allErrors = allErrors;
			this.params.forEach((rule) => {
				if (typeof rule === "string") {
					const result = this[rule]();
					if (result !== true) {
						errors.push(result);
					}
				} else if (typeof rule === "object") {
					console.log(rule);
					const method = Object.keys(rule)[0];
					const result = this[method](rule[method]);
					if (result !== true) {
						errors.push(result);
					}
				}
			});
		}

		return !this.allErrors ? ((errors.length > 0) ? errors[0] : []) : errors;
	},
	required() {
		if (typeof this.value === "undefined" || this.value === null || this.value.length === 0) {
			return utilities.format(translate('validation_error_required_field'), this.label);
		}
		return true;
	},
	min_length(length = 3) {
		if (!this.value || this.value.length < length) {
			return utilities.format(translate("validation_error_minimum_length"), [this.label, length]);
		}
		return true;
	},
	max_length(length = 3) {
		if (!this.value || this.value.length > length) {
			return utilities.format(translate("validation_error_max_length"), [this.label, length]);
		}
		return true;
	},
	valid_email() {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!this.value || this.value.match(emailRegex) === null) {
			return translate("validation_error_email");
		}
		return true;
	},
	is_number() {
		if (isNaN(Number(this.value))) {
			return utilities.format(translate("validation_error_not_a_number"), this.label);
		}
		return true;
	},
	allowed_file_type(types) {
		if (typeof this.value === "undefined") {
			return true;
		}
		let files = this.value;
		if (!Array.isArray(files)) {
			files = [files];
		}
		for (const image of files) {
			const extension = image.name.substring(image.name.lastIndexOf(".") + 1, image.name.length);
			if (!types.includes(extension)) {
				return utilities.format(translate("validation_error_invalid_file_extension"), extension);
			}
		}
		return true;
	},
	valid_password() {
		let isPasswordValid = true;

		const password = this.value;

		if(typeof password !== "string" || password.length === 0){
			return false;
		}

		if (password.length < 8) {
			isPasswordValid = false;
		}

		const variations = {
			digits: /\d/.test(password),
			lower: /[a-z]/.test(password),
			upper: /[A-Z]/.test(password),
			nonWords: /\W/.test(password)
		};

		for (const variance in variations) {
			if (variations[variance] !== true) {
				isPasswordValid = false;
				break;
			}
		}

		return isPasswordValid ? true : translate("invalid_password_strength");
	}
}

export default Validation;
