import puppeteer from 'puppeteer';
import fs from 'fs/promises';


const generatePDF = async (content) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // const content = '<html><head><title>PDF</title></head><body><h1>Hello, PDF!</h1></body></html>';


    await page.setContent(content, {
        waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    await browser.close();

    return pdf;
}

export default generatePDF;
