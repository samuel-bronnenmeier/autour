const { app, ipcMain } = require("electron");
const dataHandler = require("./data-handler");

ipcMain.handle("set-user-auth", async (event, auth) => {
	await dataHandler.writeData(auth, "userAuth.json");

	console.log("New E-Mail: " + auth.email);
	console.log("New password: " + auth.password);
});

ipcMain.handle("get-user-auth", async (event) => {
	const auth = await dataHandler.readData("userAuth.json");
	return auth;
});
