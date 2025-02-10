const express = require('express');
const ldap = require('ldapjs');
const cors = require('cors'); // Importando o CORS

const app = express();

// Habilita CORS e JSON
app.use(cors());
app.use(express.json());

const authenticate = (username, password, callback) => {
  console.log('--- going to try to connect user ---');
  
  // Criação do cliente LDAP
  const client = ldap.createClient({
    url: 'ldap://batman.com', // Substitua pela URL do seu servidor LDAP
    timeout: 5000,
    connectTimeout: 10000,
  });

  const opts = {
    filter: '(&(objectclass=user)(samaccountname=' + username + '))',
    scope: 'sub',
    attributes: ['objectGUID']
  };

  // Tenta fazer o bind (autenticação) com o usuário e senha
  try {
    client.bind(username, password, function (error) {
      if (error) {
        console.log('Falha na autenticação:', error.message);
        client.unbind(function (err) {
          if (err) {
            console.log('Erro ao desconectar o cliente:', err.message);
          } else {
            console.log('Cliente desconectado');
          }
        });
        callback(false); // Falha na autenticação
      } else {
        console.log('Conectado com sucesso');

        // Realiza a busca no LDAP
        client.search('ou=users, ou=compton, dc=batman, dc=com', opts, function (err, search) {
          if (err) {
            console.log('Erro na busca:', err.message);
            callback(false);
          }

          search.on('searchEntry', function (entry) {
            if (entry.object) {
              console.log('Entrada encontrada: ', JSON.stringify(entry.object));
              callback(true); // Sucesso na autenticação
            }
          });

          search.on('error', function (searchError) {
            console.error('Erro na busca: ', searchError.message);
            callback(false);
          });

          // Desconecta o cliente após a busca
          client.unbind(function (unbindError) {
            if (unbindError) {
              console.log('Erro ao desconectar o cliente:', unbindError.message);
            } else {
              console.log('Cliente desconectado');
            }
          });
        });
      }
    });
  } catch (error) {
    console.log('Erro ao tentar conectar ao servidor LDAP:', error.message);
    client.unbind(function (unbindError) {
      if (unbindError) {
        console.log('Erro ao desconectar o cliente:', unbindError.message);
      } else {
        console.log('Cliente desconectado');
      }
    });
    callback(false); // Falha na autenticação
  }
};

// Rota POST para autenticação
app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  console.log('Requisição recebida para autenticação:', req.body);

  authenticate(username, password, (isAuthenticated) => {
    if (isAuthenticated) {
      console.log('Usuário autenticado com sucesso');
      res.json({ message: 'Autenticação bem-sucedida' });
    } else {
      console.log('Falha na autenticação');
      res.status(401).json({ message: 'Falha na autenticação' });
    }
  });
});

// Inicia o servidor na porta 5000
app.listen(5000, () => {
  console.log('Servidor backend rodando na porta 5000');
});
