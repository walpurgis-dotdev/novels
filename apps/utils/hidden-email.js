export default function hideEmail(email) {
	const atIndex = email.indexOf("@");
	if (atIndex === -1) {
		// Không tìm thấy ký tự "@" trong địa chỉ email
		return email;
	}

	const username = email.slice(0, atIndex);
	const domain = email.slice(atIndex + 1);

	// Hiển thị chỉ một phần của địa chỉ email
	const hiddenEmail = `${username.slice(0, 3)}...@${domain}`;

	return hiddenEmail;
}
