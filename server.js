const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configuração do Multer para armazenamento de arquivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware para parsear o body em json
app.use(express.json());

// Rota para receber o POST
app.post('/upload', upload.single('file'), (req, res) => {
    const { name, email } = req.body;
    const file = req.file;

    // Verifica se todos os dados necessários foram recebidos
    if (!file || !name || !email) {
        return res.status(400).send('Todos os campos são obrigatórios: file, name, email.');
    }

    // Aqui você pode adicionar lógica adicional, como salvar informações no banco de dados

    // Resposta de sucesso
    res.send({
        message: 'Arquivo recebido com sucesso!',
        fileInfo: {
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            path: file.path
        },
        userData: {
            name,
            email
        }
    });
});

// Cria a pasta de uploads se não existir
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});