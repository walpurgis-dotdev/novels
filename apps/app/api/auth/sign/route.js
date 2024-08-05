import { genHmacSignature } from "@/utils/gen-hmac-signature";

export async function POST(request) {
  const body = await request.json();
  const secret = process.env.NEXT_PUBLIC_HMAC_SECRET;
  if (!body || Object.keys(body).length === 0) {
    return Response.json({
      message: "Không có dữ liệu.",
      ok: false,
      statusCode: 400,
    });
  }
  const hmacSignature = await genHmacSignature(body, secret);
  return Response.json({
    hmacSignature,
    ok: true,
    statusCode: 200,
  });
}
