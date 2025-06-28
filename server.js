const express = require('express');
const fetch = require('node-fetch'); // instalar
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Proxy para a API do CPF para evitar CORS
app.get('/api/cpf/:cpf', async (req, res) => {
  const cpf = req.params.cpf;
  try {
    const response = await fetch(`https://patronhost.online/apis/cpf.php?cpf=${cpf}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar a API' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
