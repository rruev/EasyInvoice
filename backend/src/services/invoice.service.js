import { createHtml, generatePdf } from '../utils/pdf.util.js';
import prepareData from '../utils/invoice.util.js';
import invoiceRepo from '../repositories/invoice.repo.js';

const generate = async (invoiceData) => {
    
    const preparedData = prepareData(invoiceData);
    
    const content = await createHtml(preparedData);
    
    const pdfBuffer = await generatePdf(content);
    
    //save the generated PDF to a database
    await invoiceRepo.create({
        ...invoiceData,
        status: 'pending',
        total: preparedData.totalPrice,
        issuedAt: preparedData.issuedAt,
        workedAt: preparedData.workedAt,
    });

    return pdfBuffer;
}

const invoiceService = {
    generate,
};

export default invoiceService;
