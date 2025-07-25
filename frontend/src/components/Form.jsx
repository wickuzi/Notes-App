import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../style/Form.css"
import { ToastContainer, toast } from "react-toastify";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem("username", username);
                toast.success("Inicio de sesión exitoso");
                navigate("/notes")
            } else {
                toast.success("Registro exitoso");
                navigate("/login")
            }
        } catch (error) {
          toast.error("Error al procesar la solicitud, verifica tus datos");
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h1>{name}</h1>
        <div className="formcontainer">
          <hr />
          <div className="container">
            <label htmlFor="username"><strong>Username</strong></label>
            <input
              type="text"
              placeholder="Escribe tu Nombre de Usuario"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password"><strong>Contraseña</strong></label>
            <input
              type="password"
              placeholder="Escribe tu Contraseña"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : name}
          </button>

          
        </div>
      </form>
    );
}

export default Form