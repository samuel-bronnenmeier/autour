const { contextBridge, ipcRenderer } = require("electron");

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("utils", {
		sendForm: (data) => ipcRenderer.invoke("form-submission", data),
		loadData: () => ipcRenderer.invoke("load-data"),
		exportICS: (data) => ipcRenderer.invoke("export-ics", data),
		setUserAuth: (auth) => ipcRenderer.invoke("set-user-auth", auth),
		getUserAuth: () => ipcRenderer.invoke("get-user-auth"),
	});
});
