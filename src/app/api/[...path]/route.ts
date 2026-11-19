import { NextRequest, NextResponse } from "next/server";

const backendUrl = () => {
  const value = process.env.API_URL?.replace(/\/+$/, "").replace(/\/api$/, "");
  return value || "http://localhost:8000";
};

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const target = `${backendUrl()}/api/${path.join("/")}${request.nextUrl.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  const response = await fetch(target, {
    method: request.method,
    headers,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.arrayBuffer(),
    redirect: "manual",
    cache: "no-store",
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-length");
  responseHeaders.delete("transfer-encoding");

  const location = responseHeaders.get("location");

  if (location) {
    const redirectUrl = new URL(location, backendUrl());

    if (redirectUrl.origin === new URL(backendUrl()).origin) {
      const frontendUrl = new URL(request.url);
      redirectUrl.protocol = frontendUrl.protocol;
      redirectUrl.host = frontendUrl.host;
      responseHeaders.set("location", redirectUrl.toString());
    }
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const HEAD = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;