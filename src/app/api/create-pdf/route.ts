"use server";

import Chromium from "@sparticuz/chromium-min";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

async function saveAsPdf(url: string) {
  try {
    const browser = await puppeteer.launch({
      args: [...Chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: Chromium.defaultViewport,
      executablePath: await Chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar'),
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
  
    await page.goto(`${process.env.BASE_URL}/${url}`);
  
    const result = await page.pdf({
      format: "a4",
    });
    await browser.close();
  
    return result;
  } catch (error) {
    return (error as Error).message
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const urlTipoCookies = searchParams.get("url");
  const fabricacao = searchParams.get("fabricacao");
  const validade = searchParams.get("validade");
  const urlComParams = `${urlTipoCookies}?fabricacao=${fabricacao}&validade=${validade}`;
  const pdfOrError = await saveAsPdf(urlComParams);
  if (typeof pdfOrError == 'string') {
    return NextResponse.json(pdfOrError);
  }
  const headers = new Headers();
  headers.set("Content-Disposition", `attachment; filename=file.pdf`);
  headers.set("Content-Type", "application/pdf");
  const res = new NextResponse(pdfOrError, {headers});
  return res;
}
