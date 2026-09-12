function spawnSettingsWindow() {
	const settingsWindow = window.open("", "modal");
	const settingsBody = settingsWindow.document.createElement("body");
	settingsBody.innerHTML = `
    <h1>Einstellungen</h1>
    <label for="emailInput">E-Mail-Adresse:</label>
    <input type="email" id="emailInput" name="emailInput" required><br>
    <label for="passwordInput">Passwort:</label>
    <input type="password" id="passwordInput" name="passwordInput" required><br>
    <button id="saveSettingsButton">Speichern</button>
  `;
	settingsWindow.document.body = settingsBody;
}
