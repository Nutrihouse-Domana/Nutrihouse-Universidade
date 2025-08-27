import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo_branca.png"; // Importando a logo corretamente
import '../components/login.css';

const Login = () => {
  const [userDN, setUserDN] = useState("");  
  const [password, setPassword] = useState("");  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userDN: `${userDN}@nutrihouse.intra`,  // Usando userDN corretamente
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("username", data.username);
        navigate("/home");
      } else {
        setError(data.message || "Falha na autenticação");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="login-box">
        {/* Logo */}
        <img src={Logo} alt="Logo NutriHouse" className="logo" />
        
        {/* Texto de instrução */}
        <p className="instruction">Acesse com seu email:</p>

        {/* Formulário de login */}
        <form onSubmit={handleLogin}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={userDN}
            onChange={(e) => setUserDN(e.target.value)}  // Atualizando o estado userDN
            required
          />
          
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Atualizando o estado password
            required
          />

          <button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
        </form>

        {/* recuperação de senha */}
        <a href="#" className="forgot-password">Esqueceu a senha?</a>

        {/* Exibindo erro caso ocorra */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
