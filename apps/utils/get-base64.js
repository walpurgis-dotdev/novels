import { getPlaiceholder } from "plaiceholder";

export const getBase64 = async (imageUrl) => {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }
    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    console.log(base64);
    return base64;
  } catch (err) {
    // Will show in terminal console
    if (err instanceof Error) console.log(err.stack);
  }
};
