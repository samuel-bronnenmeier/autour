function spawnSettingsWindow(oldEmail, oldPassword) {
	const settingsWindow = window.open("", "modal");
	const settingsBody = settingsWindow.document.createElement("body");
	settingsBody.innerHTML = `
    <h1>Einstellungen</h1>
    <label for="emailInput">E-Mail-Adresse:</label>
    <input type="email" id="emailInput" name="emailInput" value="${oldEmail}" required><br>
    <label for="passwordInput">Passwort:</label>
    <input type="password" id="passwordInput" name="passwordInput" value="${oldPassword}" required><br>
    <button id="saveSettingsButton">Speichern</button>
  `;
	settingsWindow.document.body = settingsBody;

	const saveButton =
		settingsWindow.document.getElementById("saveSettingsButton");
	saveButton.addEventListener("click", (e) => {
		e.preventDefault();

		const email =
			settingsWindow.document.getElementById("emailInput").value;
		const password =
			settingsWindow.document.getElementById("passwordInput").value;

		window.utils.setUserAuth({ email: email, password: password });

		settingsWindow.close();
	});
}
