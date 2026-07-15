import { createHtml, generatePdf } from '../utils/pdf.util.js';
import prepareData from '../utils/invoice.util.js';
import invoiceRepo from '../repositories/invoice.repo.js';

const generate = async (invoiceData) => {
    invoiceData.quantity = Number(invoiceData.quantity);
    invoiceData.price = parseFloat(invoiceData.price);
    
    const preparedData = prepareData(invoiceData);
    
    const content = await createHtml(preparedData);
    
    const pdfBuffer = await generatePdf(content);
    
    //save the generated PDF to a database
    if (invoiceData.userId) {
        await invoiceRepo.create({
            ...invoiceData,
            status: 'pending',
            price: invoiceData.price,
            total: preparedData.totalPrice,
            issuedAt: preparedData.issuedAt,
            workedAt: preparedData.workedAt,
        });
    }

    return pdfBuffer;
}

const invoiceService = {
    generate,
};

export default invoiceService;
