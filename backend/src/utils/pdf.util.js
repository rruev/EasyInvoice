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
    let htmlTemplate;
    if (invoiceData.template === 'routesetting') {
        htmlTemplate = await fs.readFile('./src/invoiceTemplates/invoice.routesetting.html', 'utf-8');
    } else {
        htmlTemplate = await fs.readFile('./src/invoiceTemplates/invoice.generic.html', 'utf-8');
    }

    // TODO: Add flexible handling for different template structures and data formats.
    // For now, we will assume a flat structure for invoiceData as we have only two templates.
    // For next versions new way of generating templates should be implemented

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
        bankName: invoiceData.bankName ?? '',
        bic: invoiceData.bic ?? '',
        iban: invoiceData.iban ?? '',
        taxId: invoiceData.taxId ? (invoiceData.template === 'routesetting' ? `Steuernummer: ${invoiceData.taxId}` : `Tax ID: ${invoiceData.taxId}`) : '',
    };

    const items = invoiceData.items?.map((item, index) => {
        return `<tr>
            <td>${index + 1}</td>
            <td>${item.description}</td>
            <td class="right">${item.quantity}</td>
            <!-- <td>Tagessatz</td> -->
            <td class="right">${item.price.toFixed(2)} &euro;</td>
            <td class="right">${item.lineTotal.toFixed(2)} &euro;</td>
        </tr>`;
    }).join('');

    templateData.items = items;

    const content = htmlTemplate.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (test, key) => {
        const value = templateData[key];
        return value === undefined || value === null ? '' : String(value);
    });

    return content;
}
