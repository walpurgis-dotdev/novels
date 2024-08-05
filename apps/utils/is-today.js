export const isToday = (dateInput) => {
	const today = new Date();
	const date = new Date(dateInput);
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};
