"use server";

import { saveAsPdf } from "@/services/puppeteer-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const urlTipoCookies = searchParams.get("url") ?? "";
  const fabricacao = searchParams.get("fabricacao") ?? "";
  const validade = searchParams.get("validade") ?? "";

  const urlComParams = new URL(`${process.env.BASE_URL}/${urlTipoCookies}`);
  urlComParams.searchParams.append("fabricacao", fabricacao);
  urlComParams.searchParams.append("validade", validade);
  const headers = new Headers();
  headers.set("Content-Disposition", `attachment; filename=file.pdf`);
  headers.set("Content-Type", "application/pdf");
  const resultPdfPromise = saveAsPdf(urlComParams.href).catch((error: Error) => {
    headers.set("Content-Type", "application/json");
    return error.message;
  });
  return new NextResponse(await resultPdfPromise, { headers });
}
