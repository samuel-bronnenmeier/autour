const { ipcMain } = require("electron");
const dataHandler = require("./data-handler");

ipcMain.handle("form-submission", async (event, data) => {
	try {
		await dataHandler.writeData(data, "output.json");
		return generateEmailMessage(data);
	} catch (error) {
		console.error("Form submission error:", error);
		throw error;
	}
});

function generateEmailMessage(entries) {
	let message = "Hallo Max,\n\nfolgende Termine könnte ich übernehmen:\n";
	entries.forEach((entry) => {
		const date = new Date(entry.date);
		message += `- ${date.toLocaleDateString("de-DE", {
			weekday: "short",
			day: "2-digit",
			month: "2-digit",
		})}, ${entry["start-time"]} ${entry.spec}\n`;
	});
	return `${message}\nViele Grüße\nSamuel`;
}
