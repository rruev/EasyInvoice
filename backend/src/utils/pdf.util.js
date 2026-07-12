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

    const content = htmlTemplate
        .replace('{{invoiceNumber}}', invoiceData.invoiceNumber)
        .replace('{{businessName}}', invoiceData.businessName)
        .replace('{{businessEmail}}', invoiceData.businessEmail)
        .replace('{{customerName}}', invoiceData.customerName)
        .replace("{{items}}", invoiceData.items.map(item => `
            <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
            </tr>
        `).join(''))
        .replace('{{total}}', invoiceData.total);

    return content;
}
