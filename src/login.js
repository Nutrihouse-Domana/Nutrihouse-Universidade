import React, { useState } from 'react';
import Logo from './logo.png';

const Login = () => {
  // Definindo os estados para o username, senha e mensagem de erro/sucesso
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Função para capturar o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validando se os campos não estão vazios
    if (!username || !password) {
      setMessage('Por favor, preencha todos os campos!');
      return;
    }

    // Enviando os dados para o backend
    const response = await fetch('http://localhost:5000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    // Verificando se a autenticação foi bem-sucedida
    if (response.ok) {
      setMessage('Usuário autenticado com sucesso!');
      // Redirecionar ou tomar outra ação após login bem-sucedido (por exemplo, redirecionar para a página principal)
    } else {
      setMessage('Falha na autenticação: ' + (data.message || 'Erro desconhecido'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-2xl overflow-hidden w-3/4 max-w-4xl">
        {/* Lado Esquerdo - Logo */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <img 
            src={Logo} 
            alt="Logo" 
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-3xl font-bold text-black">NutriHouse</h1>
          <p className="text-red-500 text-lg mt-2">Universidade</p>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-1/2 bg-gradient-to-b from-red-500 to-red-400 p-8 flex flex-col justify-center">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-white text-sm">Username:</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} // Atualiza o valor do username
                className="w-full p-2 mt-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="Digite seu username"
              />
            </div>

            <div>
              <label className="text-white text-sm">Senha:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} // Atualiza o valor da senha
                className="w-full p-2 mt-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="Digite sua senha"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition duration-300"
            >
              Login
            </button>

            {message && (
              <p className={`text-center mt-4 ${message.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}

            <p className="text-center text-white mt-4 cursor-pointer hover:underline">
              Esqueceu a senha
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
