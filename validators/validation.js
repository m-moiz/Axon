const handleValidation = (res, validateObject, validateFn) => {
	const [ isInvalid, error ] = validateFn(validateObject);

	if (isInvalid) {
		return res.status(500).json({ error: error });
	}
};

module.exports = handleValidation;
