function copyMailToClipboard() {
	const emailValue = document.getElementById("emailValue");
	const emailText = emailValue.innerText;
	navigator.clipboard.writeText(emailText);
}
