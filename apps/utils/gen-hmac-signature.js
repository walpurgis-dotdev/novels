export const genHmacSignature = async (data, secretHmac) => {
  const encoder = new TextEncoder();
  const secretKeyData = encoder.encode(secretHmac || process.env.NEXT_PUBLIC_HMAC_SECRET);
  const dataToSign = encoder.encode(JSON.stringify(data));

  // Import the secret key for use with the HMAC algorithm.
  const key = await crypto.subtle.importKey("raw", secretKeyData, { name: "HMAC", hash: { name: "SHA-256" } }, false, [
    "sign",
  ]);

  // Sign the data with the HMAC algorithm.
  const signature = await crypto.subtle.sign("HMAC", key, dataToSign);

  // Convert the signature to a hexadecimal string.
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
