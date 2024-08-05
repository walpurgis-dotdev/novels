export const imageValidation = async (file) => {
	const MAXSIZE = 2 * 1024 * 1024; // 2MB
	const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
	const MIN_WIDTH = 300;
	const MIN_HEIGHT = 400;
	if (!file) {
		return {
			ok: false,
			message: "Bạn chưa chọn hình ảnh nào",
		};
	}
	if (file.size > MAXSIZE) {
		return {
			ok: false,
			message: "Bạn chỉ được tải lên file dưới 2MB",
		};
	}
	if (!ACCEPTED_TYPES.includes(file.type)) {
		return {
			ok: false,
			message: "Chỉ hỗ trợ các định dạng ảnh png, jpg, jpeg, webp",
		};
	}

	try {
		const { width, height } = await getImageDimensions(file);
		if (width < MIN_WIDTH || height < MIN_HEIGHT) {
			return {
				ok: false,
				message: `Kích thước ảnh phải lớn hơn ${MIN_WIDTH}x${MIN_HEIGHT} pixels`,
			};
		}
	} catch (error) {
		return {
			ok: false,
			message: "Có lỗi xảy ra khi đọc kích thước ảnh",
		};
	}

	return {
		ok: true,
	};
};

const getImageDimensions = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			const img = new Image();
			img.onload = () => resolve({ width: img.width, height: img.height });
			img.onerror = reject;
			img.src = event.target.result;
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};
