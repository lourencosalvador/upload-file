const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const URL = 'http://localhost:3000/upload'


const file = './capture.png';
const name = 'Lorrys Code';
const email = 'lourencocardoso007@gmail.com';


const formData = new FormData();

const path = require('path');


const fileExtension = path.extname(file).toLowerCase();

let contentType;
switch (fileExtension) {
    case '.jpeg':
    case '.jpg':
        contentType = 'image/jpeg';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    default:
        throw new Error('Tipo de arquivo não suportado');
}


formData.append('file', fs.createReadStream(file), {
    filename: path.basename(file),
    contentType: contentType
});
formData.append('name', name);
formData.append('email', email);


axios.post(URL, formData, {
    headers: formData.getHeaders()
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });