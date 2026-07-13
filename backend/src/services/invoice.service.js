import { createHtml, generatePdf } from '../utils/pdf.util.js';
import prepareData from '../utils/invoice.util.js';

const generate = async (invoiceData) => {
    
    const preparedData = prepareData(invoiceData);

    const content = await createHtml(preparedData);

    const pdfBuffer = await generatePdf(content);
    return pdfBuffer;

    //TODO: save the generated PDF to a file or database
}

const invoiceService = {
    generate,
};

export default invoiceService;
