import generatePdf from '../utils/pdf.util.js';

const generate = async (invoiceData) => {
    // TODO: transform form data into HTML template



    const pdfBuffer = await generatePdf(invoiceData);
    return pdfBuffer;

    //TODO: save the generated PDF to a file or database
}

const invoiceService = {
    generate,
};

export default invoiceService;
