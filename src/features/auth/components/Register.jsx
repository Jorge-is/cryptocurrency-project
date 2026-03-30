import { useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { supabase } from "../../../services/supabase";
import { UserContext } from "../../../context/UserContext";
import "./Login.css";

function Register() {
  const { session } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (session) {
    return <Navigate to="/" replace />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("¡Registro exitoso! Revisa tu correo, la confirmación está activa.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel">
        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Únete a CriptoMarket</p>

        {successMsg ? (
          <div className="auth-success">
            {successMsg} <br/><br/>
            <Link to="/login" className="btn-primary" style={{ display: 'inline-block', textAlign: 'center' }}>Ir al Login</Link>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="tu_correo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña (Mínimo 6 caracteres)</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>
        )}

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        {!successMsg && (
          <p className="auth-footer">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
