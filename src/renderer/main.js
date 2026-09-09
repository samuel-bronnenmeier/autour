const submitForm = document.getElementById("submitForm");
submitForm.addEventListener("submit", (event) => {
	sendData(event);
});

const exportCSVButton = document.getElementById("exportCSVButton");
exportCSVButton.addEventListener("click", exportCSV);

const loadDataButton = document.getElementById("loadDataButton");
loadDataButton.addEventListener("click", () => {
	loadData(fieldsetCount).then((newFieldsetCount) => {
		fieldsetCount = newFieldsetCount;
	});
});

const addFieldsetButton = document.getElementById("addFieldsetButton");
let fieldsetCount = 0;
addFieldsetButton.addEventListener("click", () => {
	submitForm.appendChild(createFieldset(fieldsetCount));
	fieldsetCount++;
});

const copyMailButton = document.getElementById("copyMailButton");
copyMailButton.addEventListener("click", copyMailToClipboard);
