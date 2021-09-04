const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
//const puppeteer = require('puppeteer');

const facture = {
  dateFacture: new Date(),
  dateEcheanceFacture: new Date(),
  notesFacture:
    ';,jjhjhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjllggvjggggggggvfvhfffhfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  numFacture: 2202191,
  conditionFacture:
    'yuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuoooooooooooooooooooooomlllllllllllllllllllllllllll',
  montantFacture: 'En cours de traitement',
  client: {
    nomClient: 'jjjjk',
    adressClient: 'kkllll',
    paysClient: 'llklkkl',
    numClient: 'llkkklklkl',
    emailClient: 'po,,opo,oppo',
    telephonClient: 'oopoopopop',
    numTvaClient: 'pooppoopop',
  },
  lignesFacture: [
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 21,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
    {
      produit: 'ljjljlkjq',
      quantite: 2,
      unite: 'kg',
      prix: 200,
      reduction: 6,
      tva: 6,
      montant: '',
      description: 'toyota corrolla année 2000',
      labelcacher: false,
    },
  ],
  factureStatut: 'En cours',
};

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.post('/generateFacturePdf', (req, res) => {
  ejs.renderFile(
    path.join(__dirname, './views/', 'file.ejs'),
    { facture: req.body },
    (err, data) => {
      if (err) {
        console.log('++++++++++++++++++++err++++++++++++++++++++');
        console.log(err);
        res.send(err.message);
      } else {
        let options = {
          /*height: '11.25in',
          width: '8.5in',
          header: {
            height: '20mm'
          }  ,
          footer: {
            height: '20mm'
          }*/

          header: {
            height: '10mm',
          },

          footer: {
            height: '45mm',
          },
        };
        console.log(data);
        pdf
          .create(data, options)
          .toFile(path.join(__dirname, './img-src/', 'facture.pdf'), (err) => {
            if (err) {
              res.send(err.message);
              //res.send(Promise.reject()); avant
            } else {
              res.send('facture générée au format pdf avec succès');
              //res.send(Promise.resolve('facture créée avec succès')); ce qui était avant
            }
          });
      }
    }
  );
});
app.post('/generateDevisPdf', (req, res) => {
  ejs.renderFile(
    path.join(__dirname, './views/', 'devis.ejs'),
    { devis: req.body },
    (err, data) => {
      if (err) {
        console.log('++++++++++++++++++++err++++++++++++++++++++');
        console.log(err);
        res.send(err.message);
      } else {
        let options = {
          /*height: '11.25in',
          width: '8.5in',
          header: {
            height: '20mm'
          }  ,
          footer: {
            height: '20mm'
          }*/

          header: {
            height: '10mm',
          },

          footer: {
            height: '45mm',
          },
        };
        console.log(data);
        pdf.create(data, options).toFile('devis.pdf', (err) => {
          if (err) {
            res.send(err.message);
            //res.send(Promise.reject());
          } else {
            res.send('devis généré au format pdf avec succès');
            //res.send(Promise.resolve()); avant
          }
        });
      }
    }
  );
});
app.post('/generateAcomptePdf', (req, res) => {
  ejs.renderFile(
    path.join(__dirname, './views/', 'acompte.ejs'),
    { acompte: req.body },
    (err, data) => {
      if (err) {
        console.log('++++++++++++++++++++err++++++++++++++++++++');
        res.send(err.message);
        console.log(err);
      } else {
        let options = {
          /*height: '11.25in',
          width: '8.5in',
          header: {
            height: '20mm'
          }  ,
          footer: {
            height: '20mm'
          }*/

          header: {
            height: '10mm',
          },

          footer: {
            height: '45mm',
          },
        };
        console.log(data);
        pdf
          .create(data, options)
          .toFile(path.join(__dirname, './img-src/', 'acompte.pdf'), (err) => {
            if (err) {
              res.send(err.message);
              //res.send(Promise.reject()); avant
            } else {
              res.send('acompte générée au format pdf avec succès');
              //res.send(Promise.resolve('facture créée avec succès')); ce qui était avant
            }
          });
      }
    }
  );
});
//const puppeteer = require('puppeteer')
//'http://localhost:5000/facture'
/* (async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/facture', {
    waitUntil: 'networkidle0'
  });
  await page.pdf({ path: 'medium.pdf', format: 'A4' });
  await browser.close();
})(); */
/* async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/facture', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4' });
 
  await browser.close();
  return pdf
}; */

/* app.post('/factureInitialisation', (req, res) => {
  facture = req.data;
  res.send(Promise.resolve());
}); */

/* app.get('/facture', (req, res) => {
  res.render('facturee', { facture: facture });
}); */

app.get('/jspdfexemple', (req, res) => {
  res.render('jspdfexemple');
});
app.get('/facture', (req, res) => {
  res.render('factureee', { facture: facture });
});

app.get('/devis', (req, res) => {
  res.render('devis', { devis: devis });
});

/* app.get('/fetch-facture-png', (req, res) => {
  res.sendFile(`${__dirname}/example.png`);
}); */

app.post('/sendFacture', (req, res) => {
  const attachments = req.body.attachments.map((file) => ({
    filename: file.name,
    path: file.downloadURL,
  }));
  attachments.push({
    filename: 'facture.pdf',
    path: __dirname + '/img-src/facture.pdf',
  });
  const transporter = nodemailer.createTransport({
    /* host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: '000000000000-xxx.apps.googleusercontent.com',
        clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0'
    } */
    service: 'gmail',
    auth: {
      user: 'wemeyijackson@gmail.com',
      pass: 'energie12',
    },
    /* host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'lillie90@ethereal.email',
      pass: 'gMyNy8Pv1KC1A1UekX',
    }, */
  });

  const mailOptions = {
    from: req.body.from, // sender address
    to: req.body.email, // list of receivers
    subject: req.body.emailSubject, // Subject line
    text: req.body.message, // plain text body
    //html: '<b>Hello world?</b>', // html body
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ message: error.message, messageType: 'error' });
      return console.log(error.message);
    }
    res.send({ message: 'facture envoyé avec succès', messageType: 'success' });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  console.log(req.body);
});

app.post('/sendDevis', (req, res) => {
  const attachments = req.body.attachments.map((file) => ({
    filename: file.name,
    path: file.downloadURL,
  }));
  attachments.push({
    filename: 'devis.pdf',
    path: __dirname + '/devis.pdf',
  });
  const transporter = nodemailer.createTransport({
    /* host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: '000000000000-xxx.apps.googleusercontent.com',
        clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0'
    } */
    /* service: 'gmail',
    auth: {
      user: 'wemeyijackson@gmail.com',
      pass: 'energie12',
    },*/
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'lillie90@ethereal.email',
      pass: 'gMyNy8Pv1KC1A1UekX',
    },
  });

  const mailOptions = {
    from: req.body.from, // sender address
    to: req.body.email, // list of receivers
    subject: req.body.emailSubject, // Subject line
    text: req.body.message, // plain text body
    //html: '<b>Hello world?</b>', // html body
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ message: error.message, messageType: 'error' });
      return console.log(error.message);
    }
    res.send({ message: 'devis envoyé avec succès', messageType: 'success' });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  console.log(req.body);
});
app.post('/sendAcompte', (req, res) => {
  const attachments = req.body.attachments.map((file) => ({
    filename: file.name,
    path: file.downloadURL,
  }));
  attachments.push({
    filename: 'acompte.pdf',
    path: __dirname + '/img-src/acompte.pdf',
  });
  const transporter = nodemailer.createTransport({
    /* host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: '000000000000-xxx.apps.googleusercontent.com',
        clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0'
    } */
    /*service: 'gmail',
    auth: {
      user: 'wemeyijackson@gmail.com',
      pass: 'energie12',
    },*/
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'lillie90@ethereal.email',
      pass: 'gMyNy8Pv1KC1A1UekX',
    },
  });

  const mailOptions = {
    from: req.body.from, // sender address
    to: req.body.email, // list of receivers
    subject: req.body.emailSubject, // Subject line
    text: req.body.message, // plain text body
    //html: '<b>Hello world?</b>', // html body
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ message: error.message, messageType: 'error' });
      return console.log(error.message);
    }
    res.send({ message: 'acompte envoyé avec succès', messageType: 'success' });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  console.log(req.body);
});

app.get('/fetch-facture-png', (req, res) => {
  res.send('http://localhost:5000/fetch-facture-pdf#toolbar=0');
  //res.send('http://localhost:5000/facture');
});

app.get('/fetch-devis-png', (req, res) => {
  res.send('http://localhost:5000/fetch-devis-pdf#toolbar=0');
  //res.send('http://localhost:5000/devis');
});

app.get('/fetch-acompte-png', (req, res) => {
  res.send('http://localhost:5000/fetch-acompte-pdf#toolbar=0');
  //res.send('http://localhost:5000/devis');
});

app.get('/fetch-facture-pdf', (req, res) => {
  res.sendFile(`${__dirname}/img-src/facture.pdf`);
});

app.get('/fetch-devis-pdf', (req, res) => {
  res.sendFile(`${__dirname}/devis.pdf`);
});
app.get('/fetch-acompte-pdf', (req, res) => {
  res.sendFile(`${__dirname}/img-src/acompte.pdf`);
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

/* app.listen(port, () => {
  console.log(`Listening on port ${port}`);
}); */
