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
    const firstItem = Array.isArray(invoiceData.items) ? invoiceData.items[0] ?? {} : {};

    const templateData = {
        businessName: invoiceData.businessName ?? '',
        businessAddress: invoiceData.businessAddress ?? '',
        businessPhone: invoiceData.businessPhone ?? '',
        businessEmail: invoiceData.businessEmail ?? '',
        clientName: invoiceData.clientName ?? invoiceData.customerName ?? '',
        clientAddress: invoiceData.clientAddress ?? '',
        invoiceNum: invoiceData.invoiceNum ?? invoiceData.invoiceNumber ?? '',
        issuedAt: invoiceData.issuedAt ?? '',
        workedAt: invoiceData.workedAt ?? '',
        quantity: invoiceData.quantity ?? firstItem.quantity ?? '',
        price: invoiceData.price ?? firstItem.price ?? '',
        lineTotal: invoiceData.lineTotal ?? invoiceData.total ?? '',
        totalPrice: invoiceData.totalPrice ?? invoiceData.total ?? '',
        iban: invoiceData.iban ?? '',
    };

    const content = htmlTemplate.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key) => {
        const value = templateData[key];
        return value === undefined || value === null ? '' : String(value);
    });

    return content;
}
