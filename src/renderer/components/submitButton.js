async function sendData(event) {
	event.preventDefault();
	const formData = new FormData(event.target);
	const data = Object.fromEntries(formData.entries());

	emailValue.innerText = await window.utils.sendForm(organizeData(data));
}
