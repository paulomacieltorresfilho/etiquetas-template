"use server";

import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

async function saveAsPdf(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${process.env.BASE_URL}/${url}`, {
    waitUntil: "networkidle0",
  });

  const result = await page.pdf({
    format: "a4",
  });
  await browser.close();

  return result;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const urlTipoCookies = searchParams.get("url");
  const fabricacao = searchParams.get("fabricacao");
  const validade = searchParams.get("validade");
  const urlComParams = `${urlTipoCookies}?fabricacao=${fabricacao}&validade=${validade}`;
  const pdf = await saveAsPdf(urlComParams);
  const headers = new Headers();
  headers.set("Content-Disposition", `attachment; filename=file.pdf`);
  headers.set("Content-Type", "application/pdf");
  const res = new NextResponse(pdf, {headers});
  return res;
}
