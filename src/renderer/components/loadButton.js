async function loadData(fieldsetCount) {
	const data = await window.utils.loadData();

	for (entry of data) {
		submitForm.appendChild(createFieldset(fieldsetCount));
		fieldsetCount++;
		const fieldset = submitForm.lastElementChild;
		for (const key in entry) {
			const input = fieldset.querySelector(
				`input[name="${key}${fieldsetCount}"], select[name="${key}${fieldsetCount}"]`,
			);
			if (input) {
				input.value = entry[key];
			}
		}
	}

	return fieldsetCount;
}
