import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const content = '<html><head><title>PDF</title></head><body><h1>Hello, PDF!</h1></body></html>';


await page.setContent(content, {
    waitUntil: 'networkidle0',
});

const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
});

console.log(pdfBuffer);

await browser.close();


