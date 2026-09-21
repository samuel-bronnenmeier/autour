function spawnSettingsWindow(oldEmail, oldPassword) {
	const settingsWindow = window.open("", "modal");
	settingsWindow.document.title = "Einstellungen";

	const head = settingsWindow.document.getElementsByTagName("head")[0];
	console.log("Head:", head);
	const link = settingsWindow.document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = "../assets/index.css";
	head.appendChild(link);

	settingsWindow.document.body.innerHTML = `
    <h1 class="settings-title">Einstellungen</h1>
		<div class="settings-container">
    	<label for="emailInput" class="settings-label">E-Mail-Adresse:</label>
    	<input
        type="email"
        id="emailInput"
        name="emailInput"
        value="${oldEmail}"
        class="settings-input">

			<label for="passwordInput" class="settings-label">Passwort:</label>
    	<input
        type="password"
        id="passwordInput"
        name="passwordInput"
        value="${oldPassword}"
        class="settings-input">

    	<button id="saveSettingsButton" class="settings-button">
        Speichern
    	</button>
		</div>
  `;

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
