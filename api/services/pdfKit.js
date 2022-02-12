const PDFDocument = require('pdfkit');
const fs = require('fs');
const dropboxV2Api = require('dropbox-v2-api');

const dropbox = dropboxV2Api.authenticate({
  token: process.env.DBX_APP_TOKEN
})

class PdfStore { 
  static generatePdf(form) {
    const doc = new PDFDocument;

    doc.pipe(fs.createWriteStream(`${form._id}.pdf`))
  
    // doc.image('public/images/logo.png', {
    //   width: 170,
    //   align: 'center',
    //   valign: 'center'
    // });
  
    doc.font('public/fonts/Montserrat-Medium.ttf')
      .fontSize(18)
      .text(`Veuillez passsé dans nos locaux pour la validation. Votre code est ${form.numeroProjet}`, 100, 100);
  
    doc.end();
    
    dropbox({
      resource: 'files/upload',
      parameters: {
        path: `/kondo/${form._id}.pdf`,
        mode: "add",
        autorename: true,
        mute: true,
        strict_conflict: false
      },
      readStream: fs.createReadStream(`${form._id}.pdf`)
    }, (err, result, response) => {
      console.log(result, 'result')
    });

    // fs.unlink(`${form._id}.pdf`)
  }
}

module.exports = PdfStore;
