import { DocumentDefinition } from 'pdfmake-wrapper/server';
import Pdfmake from 'pdfmake';
import fs from 'fs';
const path = require('path')

const printer = new Pdfmake({
    Roboto: {
        normal: path.resolve('src/utils/fonts/Roboto-Regular.ttf'),
        bold: path.resolve('src/utils/fonts/Roboto-Medium.ttf'),
        italics: path.resolve('src/utils/fonts/Roboto-Italic.ttf'),
        bolditalics: path.resolve('src/utils/fonts/Roboto-MediumItalic.ttf')
    }
});

export async function getPDF(documentBody:{}, fileName:string) {
    const doc = new DocumentDefinition();
    doc.add(documentBody);
    const pdf = printer.createPdfKitDocument(doc.getDefinition());
    var file = fs.createWriteStream(fileName)
    pdf.pipe(file);
    pdf.end();
}