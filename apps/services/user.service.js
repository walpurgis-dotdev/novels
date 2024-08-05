import { notFound } from "next/navigation";
import { BACKEND_BASE_URL } from "@/utils/constants";
import { genHmacSignature } from "@/utils/gen-hmac-signature";

export const getProfile = async (accessToken) => {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

export const getUsers = async () => {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/users`);
    const result = await res.json();
    if (result.ok) {
      return result.data;
    }
    notFound();
  } catch (error) {
    notFound();
  }
};

export const getUserById = async (id) => {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/users/${id}`, {
      cache: "no-cache",
    });
    const result = await res.json();
    if (result.ok) {
      return result.data;
    }
    notFound();
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

export const getNovelByConvert = async ({ accessToken, limit = 10, page = 1, keyword = "" }) => {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/users/novels?limit=${limit}&page=${page}&keyword=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

export const updateUser = async ({ data, accessToken }) => {
  try {
    if (!data || !data.id) {
      throw new Error(`Thiếu trường bắt buộc: "${data.name}" hoặc "${data.id}"`);
    }

    const res = await fetch(`${BACKEND_BASE_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-hmac-sign": await genHmacSignature(data),
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.ok) {
      return result.data;
    } else {
      throw new Error(result.message || "Update failed");
    }
  } catch (error) {
    return { ok: false, message: error.message };
  }
};
