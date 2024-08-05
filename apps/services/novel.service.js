import { BACKEND_BASE_URL } from "@/utils/constants";
import { genHmacSignature } from "@/utils/gen-hmac-signature";

export async function getNovels({
  page = 1,
  sortBy = "newChapAt",
  limit = 10,
  keyword,
  sort_type = "DESC",
  status,
  props,
  tags,
  genres,
  nominate,
}) {
  try {
    // Khởi tạo một mảng để chứa các query parameter
    const queryParams = [];

    // Thêm các trường có giá trị vào mảng queryParams
    if (keyword) queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (page) queryParams.push(`page=${page}`);
    if (sortBy) queryParams.push(`sort_by=${sortBy}`);
    if (sort_type) queryParams.push(`sort_type=${sort_type}`);
    if (status) queryParams.push(`status=${status}`);
    if (props) queryParams.push(`props=${props}`);
    if (tags) queryParams.push(`tags=${tags}`);
    if (genres) queryParams.push(`genres=${genres}`);
    if (nominate) queryParams.push(`nominate=${nominate}`);

    // Tạo URL từ các trường đã thêm
    const url = `${BACKEND_BASE_URL}/novels?${queryParams.join("&")}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 / 2 },
    });
    const result = await res.json();
    if (result.ok) {
      return result;
    }
    return { ok: false, message: "Lỗi không thể lấy dữ liệu" };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function getNovelBySlugOrId(slugOrId) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/novels/${slugOrId}`);
    const result = await res.json();
    if (result.ok) {
      return result;
    }
    return { ok: false, message: "Lỗi không thể lấy dữ liệu" };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function getChapterById(id) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/chapters/${id}`);
    const result = await res.json();
    if (result.ok) {
      return result;
    }
    return { ok: false, message: "Lỗi không thể lấy dữ liệu" };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function createNovel({ data, accessToken }) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/novels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-hmac-sign": await genHmacSignature(data),
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function checkExistNovel({ data, accessToken }) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/novels/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-hmac-sign": await genHmacSignature(data),
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function deleteNovel({ novelId, accessToken }) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/novels/${novelId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function updateNovel({ novelId, data, accessToken }) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/novels/${novelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-hmac-sign": await genHmacSignature(data),
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function uploadNovelCover({ novelId, cover, accessToken }) {
  try {
    const formData = new FormData();
    formData.append("cover", cover, cover.name);
    const res = await fetch(`${BACKEND_BASE_URL}/novels/${novelId}/cover`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-hmac-sign": await genHmacSignature(formData),
      },
      body: formData,
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function getConvert({ novelId, accessToken }) {
	try {
		const res = await fetch(`${BACKEND_BASE_URL}/novels/${novelId}/convert`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const result = await res.json();
		return result;
	} catch (error) {
		return { ok: false, message: error.message };
	}
}
