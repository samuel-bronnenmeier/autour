function createFieldset(fieldsetCount) {
	const fieldset = document.createElement("fieldset");
	fieldset.setAttribute("form", "submitForm");

	// Create legend
	const legend = document.createElement("legend");
	legend.textContent = `Führung ${fieldsetCount + 1}`;
	legend.id = `${fieldsetCount + 1}`;
	fieldset.appendChild(legend);

	// Helper function to create input elements
	const createInput = (type, name, idSuffix, required = false) => {
		const input = document.createElement("input");
		input.type = type;
		input.name = name + `${fieldsetCount + 1}`;
		input.id = `${idSuffix}${fieldsetCount + 1}`;
		if (required) input.required = true;
		return input;
	};

	// Helper function to create label elements
	const createLabel = (text, forId) => {
		const label = document.createElement("label");
		label.textContent = text;
		label.htmlFor = forId;
		return label;
	};

	// Create inputs and labels dynamically
	fieldset.appendChild(createLabel("Datum:", "date"));
	fieldset.appendChild(createInput("date", "date", "date", true));

	fieldset.appendChild(createLabel("Startzeit:", "start-time"));
	fieldset.appendChild(createInput("time", "start-time", "start-time", true));

	fieldset.appendChild(createLabel("Dauer:", "duration"));
	fieldset.appendChild(createInput("number", "duration", "duration", true));
	fieldset.querySelector(`input[name="duration${fieldsetCount + 1}"]`).step =
		0.5;

	fieldset.appendChild(createLabel("Art:", "spec"));
	fieldset.appendChild(createInput("text", "spec", "spec", true));

	fieldset.appendChild(createLabel("Personenanzahl:", "personCount"));
	fieldset.appendChild(
		createInput("number", "personCount", "personCount", true),
	);

	fieldset.appendChild(createLabel("Alter:", "age"));
	fieldset.appendChild(createInput("number", "age", "age", true));

	fieldset.appendChild(createLabel("Thema/Lieblingstier:", "theme"));
	fieldset.appendChild(createInput("text", "theme", "theme", true));

	// Create select element for starting-point
	const select = document.createElement("select");
	select.name = "starting-point" + `${fieldsetCount + 1}`;
	select.id = `starting-point${fieldsetCount + 1}`;
	select.required = true;

	const optionKasse = document.createElement("option");
	optionKasse.value = "Kasse";
	optionKasse.textContent = "Kasse";

	const optionSchildkroete = document.createElement("option");
	optionSchildkroete.value = "Schildkrötenteich";
	optionSchildkroete.textContent = "Schildkrötenteich";

	select.appendChild(optionKasse);
	select.appendChild(optionSchildkroete);

	fieldset.appendChild(createLabel("Startort:", "starting-point"));
	fieldset.appendChild(select);

	// Create additional-info input
	fieldset.appendChild(
		createLabel("Zusätzliche Informationen:", "additional-info"),
	);
	fieldset.appendChild(
		createInput("text", "additional-info", "additional-info"),
	);

	const deleteButton = document.createElement("button");
	deleteButton.type = "button";
	deleteButton.textContent = "Führung entfernen";
	deleteButton.addEventListener("click", () => {
		submitForm.removeChild(fieldset);
		fieldsetCount--;
	});
	fieldset.appendChild(deleteButton);

	return fieldset;
}
