export const generateValidator = (data) => {
	const { name = "", email = "", prompt = "" } = data;
	const errors = {};

	if (email === "") {
		errors.email = "Required!";
	}

	if (name === "") {
		errors.name = "Required!";
	}

	if (prompt === "") {
		errors.prompt = "Required!";
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
};
