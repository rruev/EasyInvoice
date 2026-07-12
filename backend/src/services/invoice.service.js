import { createHtml, generatePdf } from '../utils/pdf.util.js';

const generate = async (invoiceData) => {
    const content = await createHtml(invoiceData);

    const pdfBuffer = await generatePdf(content);
    return pdfBuffer;

    //TODO: save the generated PDF to a file or database
}

const invoiceService = {
    generate,
};

export default invoiceService;
