"use server";
import Chromium from "@sparticuz/chromium-min";
import puppeteer, { Browser } from "puppeteer-core";

async function initBrowser(): Promise<Browser> {
  return await puppeteer.launch({
    args: [...Chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: Chromium.defaultViewport,
    executablePath: await Chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
    ),
    headless: true,
    ignoreHTTPSErrors: true,
  });
}

export async function saveAsPdf(url: string): Promise<Buffer> {
  const browser = await initBrowser();
  const page = await browser.newPage();
  await page.goto(url);
  const result = await page.pdf({
    format: "A4",
  });
  await browser.close();
  return result;
}
