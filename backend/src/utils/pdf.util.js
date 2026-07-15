import puppeteer from 'puppeteer';
import fs from 'fs/promises';


export const generatePdf = async (content) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

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

export const createHtml = async (invoiceData) => {
    const htmlTemplate = await fs.readFile('./src/invoiceTemplates/invoice.template.html', 'utf-8');

    // TODO: Add flexible handling for diferent template structures and data formats. 
    // For now, we will assume a flat structure for invoiceData as we have only one template.

    const templateData = {
        businessName: invoiceData.businessName ?? '',
        businessStreet: invoiceData.businessStreet ?? '',
        businessCity: invoiceData.businessCity ?? '',
        businessPhone: invoiceData.businessPhone ?? '',
        businessEmail: invoiceData.businessEmail ?? '',
        clientName: invoiceData.clientName ?? invoiceData.customerName ?? '',
        clientStreet: invoiceData.clientStreet ?? '',
        clientCity: invoiceData.clientCity ?? '',
        invoiceNum: invoiceData.invoiceNum ?? invoiceData.invoiceNumber ?? '',
        issuedAt: invoiceData.issuedAt ?? '',
        workedAt: invoiceData.workedAt ?? '',
        quantity: invoiceData.quantity ?? '',
        price: invoiceData.price !== undefined ? invoiceData.price.toFixed(2) : '',
        lineTotal: invoiceData.lineTotal !== undefined ? invoiceData.lineTotal.toFixed(2) : '',
        totalPrice: invoiceData.totalPrice !== undefined ? invoiceData.totalPrice.toFixed(2) : '',
        iban: invoiceData.iban ?? '',
    };

    const content = htmlTemplate.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (test, key) => {
        const value = templateData[key];
        return value === undefined || value === null ? '' : String(value);
    });

    return content;
}
