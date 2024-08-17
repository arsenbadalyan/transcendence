String.prototype.format = function(vars) {
	return this.replace(/{(\w+)}/g, (match, key) => {
		return typeof vars[key] !== 'undefined' ? vars[key] : match;
	});
};