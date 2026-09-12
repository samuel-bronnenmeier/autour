const { app, ipcMain } = require("electron");
const path = require("path");
const dataHandler = require("./data-handler");
const nodemailer = require("nodemailer");

ipcMain.handle("export-ics", async (event, data) => {
	if (
		process.env.EMAIL_USER === undefined ||
		process.env.EMAIL_PASS === undefined
	) {
		console.error(
			"Email credentials are not set in environment variables.",
		);
		process.env.EMAIL_USER = "samuelbronnenmeier@gmail.com";
		process.env.EMAIL_PASS = "jtbj watq rnyd ghux";
	}
	return await sendEmailWithAttachment(
		process.env.EMAIL_USER,
		"Eingetragene Termine",
		"Gesendet von " +
			process.env.EMAIL_USER +
			". Im Anhang die ICS-Datei. Einfach auf einem Gerät mit Zugang zum Kalender öffnen.",
		generateICS(data),
	);
});

async function sendEmailWithAttachment(to, subject, body, attachmentPath) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: to,
		subject: subject,
		text: body,
		attachments: [
			{
				path: await attachmentPath,
				filename: "calendar.ics",
			},
		],
	};

	await transporter.sendMail(mailOptions);

	return attachmentPath;
}

async function generateICS(data) {
	const SEPARATOR = "\n";
	const calendarEvents = [];
	const calendarStart = [
		"BEGIN:VCALENDAR",
		"PRODID:" + "-//auTour//Calendar//DE",
		"VERSION:2.0",
	].join(SEPARATOR);
	const calendarEnd = SEPARATOR + "END:VCALENDAR";

	const events = data.map((entry, index) => {
		return generateEvent(
			{
				subject: "Zoo Führung " + entry.spec,
				startDate: new Date(entry.date),
				startTime: new Date(entry.date + " " + entry["start-time"]),
				endDate: new Date(entry.date),
				endTime: new Date(
					new Date(entry.date + " " + entry["start-time"]).getTime() +
						parseFloat(entry.duration) * 3600000,
				),
				description: `Personenanzahl: ${entry.personCount}\\nAlter: ${entry.age}\\nThema/Lieblingstier: ${entry.theme}\\nStartort: ${entry["starting-point"]}\\n${entry["additional-info"] || ""}`,
			},
			index + 1,
		).join(SEPARATOR);
	});

	var calendar =
		calendarStart + SEPARATOR + events.join(SEPARATOR) + calendarEnd;

	return dataHandler
		.writeData(calendar, "calendar.ics")
		.then(() => {
			return path.join(app.getPath("userData"), "userData/calendar.ics");
		})
		.catch((error) => {
			console.error("Error writing ICS file:", error);
			throw error;
		});
}

function generateEvent(entry, eventCount) {
	const stamp =
		new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

	var calendarEvent = [
		"BEGIN:VEVENT",
		"UID:" + eventCount + "-" + Date.now() + "@" + "auTour",
		"CLASS:PUBLIC",
		"DESCRIPTION:" + entry.description,
		"DTSTAMP:" + stamp,
		"DTSTART:" +
			entry.startTime.toISOString().replace(/[-:]/g, "").split(".")[0] +
			"Z",
		"DTEND:" +
			entry.endTime.toISOString().replace(/[-:]/g, "").split(".")[0] +
			"Z",
		"SUMMARY:" + entry.subject,
		"END:VEVENT",
	];

	return calendarEvent;
}
