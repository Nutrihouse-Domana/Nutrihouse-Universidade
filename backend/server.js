const express = require('express');
const ldap = require('ldapjs');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
console.log('Express.json habilitado para ler JSON');

//////////////////// AUTENTICAÇÃO LDAP ////////////////////
const authenticateWithDN = (userDN, password, callback) => {
  console.log('Iniciando autenticação com DN:', userDN);

  const client = ldap.createClient({
    url: 'ldap://172.32.14.1:389',
    timeout: 5000,
    connectTimeout: 10000,
  });

  client.on('error', (err) => {
    console.error('Erro de conexão LDAP:', err.message);
    callback(false);
  });

  client.bind(userDN, password, (err) => {
    if (err) {
      console.log('Falha LDAP com DN:', userDN, '-', err.message);
      client.unbind();
      callback(false);
    } else {
      console.log('Autenticação bem-sucedida com DN:', userDN);
      client.unbind();
      callback(true);
    }
  });
};

// Rota de autenticação LDAP
app.post('/authenticate', (req, res) => {
  const { userDN, password } = req.body;
  console.log('Requisição recebida em /authenticate:', userDN);

  authenticateWithDN(userDN, password, (isAuthenticated) => {
    if (isAuthenticated) {
      const username = userDN.split('@')[0];
      const nomeFormatado = username
        .split('.')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      console.log('Usuário autenticado:', username);
      res.json({ message: 'Autenticação bem-sucedida', username });
    } else {
      console.log('Falha na autenticação do usuário:', userDN);
      res.status(401).json({ message: 'Falha na autenticação' });
    }
  });
});

//////////////////// CONEXÃO SQL SERVER ////////////////////
const dbConfig = {
  user: 'julia.diniz',
  password: 'NH@123',
  server: 'NHBD02',
  database: 'BD_UNIVNH',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

//////////////////// ROTAS SQL ////////////////////

// Retorna todos os cursos
app.get('/api/cursos', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query('SELECT id, titulo, caminho, icon, caminho_icon FROM cursos');

    const cursos = result.recordset.map((curso) => ({
      id: curso.id,
      titulo: curso.titulo,
      caminho: curso.caminho,
      icon: curso.icon,
      caminho_icon: curso.caminho_icon,
      icon_url: `http://NHBD02/icons/${curso.icon}`,
    }));

    res.json(cursos);
  } catch (err) {
    console.error('Erro ao buscar cursos:', err.message);
    res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
});

// Retorna vídeos de um curso (com ou sem módulos)
app.get('/api/videos/:id_curso', async (req, res) => {
  const { id_curso } = req.params;

  try {
    const pool = await sql.connect(dbConfig);

    // Busca curso
    const cursoResult = await pool
      .request()
      .input('id', sql.Int, id_curso)
      .query('SELECT titulo, caminho FROM cursos WHERE id = @id');

    if (cursoResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    const { caminho } = cursoResult.recordset[0];
    const pastaCurso = path.basename(caminho);
    const baseURL = `http://NHBD02/videos/${pastaCurso}`;

    // Busca módulos
    const modulosResult = await pool
      .request()
      .input('id_curso', sql.Int, id_curso)
      .query(
        'SELECT id, titulo, descricao, caminho, ordem FROM modulos WHERE id_curso = @id_curso ORDER BY ordem'
      );

    // Busca todos os vídeos
    const videosResult = await pool
      .request()
      .input('id_curso', sql.Int, id_curso)
      .query(
        'SELECT id, id_modulo, titulo, descricao, url FROM video WHERE id_curso = @id_curso'
      );

    // Caso tenha módulos
    if (modulosResult.recordset.length > 0) {
      const modulos = modulosResult.recordset.map((mod) => {
        const videos = videosResult.recordset
          .filter((v) => v.id_modulo === mod.id)
          .map((v) => {
            let finalUrl = '';

            if (v.url && v.url.startsWith('http')) {
              finalUrl = v.url;
            } else if (v.url && v.url.includes('.')) {
              finalUrl = `${baseURL}/${path.basename(mod.caminho)}/${path.basename(v.url)}`;
            } else {
              finalUrl = `${baseURL}/${path.basename(mod.caminho)}/${v.titulo}.mp4`;
            }

            return {
              id: v.id,
              titulo: v.titulo,
              descricao: v.descricao,
              url: finalUrl,
            };
          });

        return {
          id: mod.id,
          titulo: mod.titulo,
          descricao: mod.descricao,
          ordem: mod.ordem,
          videos,
        };
      });

      return res.json({ tipo: 'com_modulos', modulos });
    }

    // Caso não tenha módulos
    const videos = videosResult.recordset
      .filter((v) => !v.id_modulo)
      .map((v) => {
        let finalUrl = '';

        if (v.url && v.url.startsWith('http')) {
          finalUrl = v.url;
        } else if (v.url && v.url.includes('.')) {
          finalUrl = `${baseURL}/${path.basename(v.url)}`;
        } else {
          finalUrl = `${baseURL}/${v.titulo}.mp4`;
        }

        return {
          id: v.id,
          titulo: v.titulo,
          descricao: v.descricao,
          url: finalUrl,
        };
      });

    return res.json({ tipo: 'sem_modulos', videos });
  } catch (err) {
    console.error('Erro ao buscar vídeos do curso:', err.message);
    res.status(500).json({ error: 'Erro ao buscar vídeos do curso' });
  }
});

//////////////////// INICIAR SERVIDOR ////////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
