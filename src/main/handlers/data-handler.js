const { app, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

const userDataPath = path.join(app.getPath("exe"), "userData");

ipcMain.handle("load-data", async () => {
	const data = readData("output.json");
	return data;
});

function ensureDirectory() {
	if (!fs.existsSync(userDataPath)) {
		fs.mkdirSync(userDataPath, { recursive: true });
	}
}

async function writeData(data, file) {
	const filePath = path.join(userDataPath, file);
	ensureDirectory();
	if (path.extname(file) === ".json") {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
	} else {
		fs.writeFileSync(filePath, data, "utf-8");
	}
}

async function readData(file) {
	const filePath = path.join(userDataPath, file);
	if (fs.existsSync(filePath)) {
		return JSON.parse(fs.readFileSync(filePath, "utf-8"));
	}
	return [];
}

module.exports = { writeData, readData };
