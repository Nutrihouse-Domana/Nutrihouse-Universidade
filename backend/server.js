const express = require('express');
const ldap = require('ldapjs');
const cors = require('cors');

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
console.log('Express.json habilitado para ler JSON');

const authenticateWithDN = (userDN, password, callback) => {
    console.log('Iniciando a autenticação com DN:', userDN);

    const client = ldap.createClient({
        url: 'ldap://172.32.14.1:389',
        timeout: 5000,
        connectTimeout: 10000
    });

    client.on('error', (err) => {
        console.error('Erro de conexão LDAP:', err);
        callback(false);
        return;
    });

    client.bind(userDN, password, (err) => {
        if (err) {
            console.log('Erro na autenticação LDAP com DN:', err.message);
            client.unbind();
            callback(false);
        } else {
            console.log('Autenticação bem-sucedida com DN!');
            client.unbind();
            callback(true);
        }
    });
};

app.post('/authenticate', (req, res) => {
    console.log('Requisição recebida no endpoint /authenticate com os dados:', req.body);

    const { userDN, password } = req.body; 

    authenticateWithDN(userDN, password, (isAuthenticated) => {
        if (isAuthenticated) {
            console.log('Usuário autenticado com sucesso usando DN');
            res.json({ message: 'Autenticação bem-sucedida' });
        } else {
            console.log('Falha na autenticação do usuário usando DN');
            res.status(401).json({ message: 'Falha na autenticação' });
        }
    });
});

app.listen(5000, () => {
    console.log('Servidor backend rodando na porta 5000');
});




