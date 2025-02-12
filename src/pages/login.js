import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/NH_universidade_logo.png";

const Login = () => {
  const [userDN, setUserDN] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userDN: userDN, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login bem-sucedido!");
        localStorage.setItem("username", data.username);
        navigate("/home");
      } else {
        setError(data.message || "Falha na autenticação");
      }
    } catch (error) {
      setError("Erro ao conectar ao servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-2xl overflow-hidden w-3/4 max-w-4xl">
        {/* Lado Esquerdo - Logo */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <div className="w-3/4 flex flex-col items-center justify-center p-20 m-5 bg-white">
            <img src={Logo} alt="Logo" className="w-44 h-34 mb-4" />
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-1/2 bg-gradient-to-b from-red-500 to-red-400 p-8 flex flex-col justify-center">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-white text-sm">Usuário:</label>
              <input
                type="text"
                value={userDN}
                onChange={(e) => setUserDN(e.target.value)}
                className="w-full p-2 mt-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="nome.sobrenome@nutrihouse.intra"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error && <p className="text-white text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition duration-300"
            >
              Login
            </button>

            <p className="text-center text-white mt-4 cursor-pointer hover:underline">
              Esqueceu a senha?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

