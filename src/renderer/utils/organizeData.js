function organizeData(data) {
	let organizedData = [{}];
	let tourId = 1;
	for (const key in data) {
		if (key.endsWith((tourId + 1).toString())) {
			tourId++;
			organizedData.push({});
		}
		organizedData[tourId - 1][key.replace(tourId.toString(), "")] =
			data[key];
	}
	let cleanedData = organizedData.filter((entry) => !isEmpty(entry));
	return cleanedData;
}

function isEmpty(obj) {
	for (const prop in obj) {
		if (Object.hasOwn(obj, prop)) {
			return false;
		}
	}

	return true;
}
