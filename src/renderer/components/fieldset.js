function createFieldset(fieldsetCount) {
	const fieldset = document.createElement("fieldset");
	fieldset.setAttribute("form", "submitForm");

	// Create legend
	const legend = document.createElement("legend");
	legend.textContent = `Führung ${fieldsetCount + 1}`;
	legend.id = `${fieldsetCount + 1}`;
	fieldset.appendChild(legend);

	// Helper function to create input elements
	const createInput = (
		type,
		name,
		idSuffix,
		required = false,
		cssClass = "full",
	) => {
		const input = document.createElement("input");
		input.type = type;
		input.name = name + `${fieldsetCount + 1}`;
		input.id = `${idSuffix}${fieldsetCount + 1}`;
		if (required) input.required = true;
		input.classList.add(cssClass);
		return input;
	};

	// Helper function to create label elements
	const createLabel = (text, forId, cssClass = "full") => {
		const label = document.createElement("label");
		label.textContent = text;
		label.htmlFor = forId;
		label.classList.add(cssClass);
		return label;
	};

	// Create inputs and labels dynamically
	fieldset.appendChild(createLabel("Datum:", "date", "half"));
	fieldset.appendChild(createInput("date", "date", "date", true, "half"));

	fieldset.appendChild(createLabel("Startzeit:", "start-time", "half"));
	fieldset.appendChild(
		createInput("time", "start-time", "start-time", true, "half"),
	);

	fieldset.appendChild(createLabel("Dauer:", "duration", "half"));
	fieldset.appendChild(
		createInput("number", "duration", "duration", true, "half"),
	);
	fieldset.querySelector(`input[name="duration${fieldsetCount + 1}"]`).step =
		0.5;

	fieldset.appendChild(createLabel("Art:", "spec", "half"));
	fieldset.appendChild(createInput("text", "spec", "spec", true, "half"));

	fieldset.appendChild(createLabel("Personenanzahl:", "personCount", "half"));
	fieldset.appendChild(
		createInput("number", "personCount", "personCount", true, "half"),
	);

	fieldset.appendChild(createLabel("Alter:", "age", "half"));
	fieldset.appendChild(createInput("number", "age", "age", true, "half"));

	fieldset.appendChild(createLabel("Thema/Lieblingstier:", "theme"));
	fieldset.appendChild(createInput("text", "theme", "theme", true));

	// Create select element for starting-point
	const select = document.createElement("select");
	select.name = "starting-point" + `${fieldsetCount + 1}`;
	select.id = `starting-point${fieldsetCount + 1}`;
	select.required = true;
	select.classList.add("full");

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
