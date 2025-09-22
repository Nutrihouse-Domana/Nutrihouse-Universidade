const express = require('express'); 
const ldap = require('ldapjs'); // dep autenticação 
const cors = require('cors');

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
console.log('Express.json habilitado para ler JSON');


///////////////Comunicação com o server///////////////////////
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

            const username = userDN.split('@')[0]; 
            const nomeFormatado = username.split('.').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            console.log('Usuário autenticado com sucesso usando DN');
            res.json({ message: 'Autenticação bem-sucedida', username: userDN.split('@')[0] });
        } else {
            console.log('Falha na autenticação do usuário usando DN');
            res.status(401).json({ message: 'Falha na autenticação' });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

/////////////////////////////////////////////////////////////


const FTPClient = require('basic-ftp');

// Configuração do servidor FTP (NAS Iomega)
const FTP_HOST = '192.168.1.4';
const FTP_USER = 'admin';   // ou '' se for anônimo
const FTP_PASS = 'nutr1@10m3ga';
const FTP_PATH = 'Universidade Nutrihouse/DOMANA/CDP';       // caminho dentro do NAS onde estão os vídeos

/**
 * Lista arquivos de vídeo via FTP.
 * Retorna um array com os nomes dos arquivos encontrados.
 */
async function listarVideosFTP() {
    const client = new FTPClient.Client();
    client.ftp.verbose = false;
    try {
        await client.access({
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASS,
            secure: false, // Geralmente o FTP do NAS não usa TLS
        });
        await client.cd(FTP_PATH); // Entra no diretório desejado
        const arquivos = await client.list();

        // Filtra apenas arquivos com extensões de vídeo
        return arquivos
            .filter(item => item.isFile)
            .map(item => item.name)
            .filter(nome => nome.match(/\.(mp4|avi|mkv|mov)$/i));
    } catch (err) {
        console.error('Erro ao acessar FTP:', err.message);
        throw err;
    } finally {
        client.close();
    }
}

// Rota GET que retorna os vídeos disponíveis no FTP
app.get('/api/videos', async (req, res) => {
    try {
        const lista = await listarVideosFTP();
        res.json({ videos: lista });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar vídeos no servidor.' });
    }
});



