async function exportCSV() {
	const formData = new FormData(document.getElementById("submitForm"));
	const data = Object.fromEntries(formData.entries());
	window.alert(
		"Email versendet und ICS Datei generiert nach: " +
			(await window.utils.exportICS(organizeData(data))),
	);
}
