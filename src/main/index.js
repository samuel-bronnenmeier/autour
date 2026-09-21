const { app, BrowserWindow, Menu } = require("electron");

if (require("electron-squirrel-startup")) {
	app.quit();
}

const path = require("path");
const formHandler = require("./handlers/form-handler");
const dataHandler = require("./handlers/data-handler");
const exportHandler = require("./handlers/export-handler");
const authHandler = require("./handlers/auth-handler");

Menu.setApplicationMenu(null); // Disable the default menu bar

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.loadFile(path.join(__dirname, "../renderer/index.html"));

	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url === "about:blank") {
			return {
				action: "allow",
				overrideBrowserWindowOptions: {
					width: 400,
					height: 350,
				},
			};
		}
		return { action: "deny" };
	});
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
