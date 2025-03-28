import React, { useState } from 'react';
import { registerUsuario } from '../../Apis/apiRegistroUser'; // Asegúrate de que esta importación esté correcta

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos recibidos:", { email, password }); // Verifica los datos antes de enviar

    try {
      // Llamar a la función de registro
      const user = await registerUsuario(email, password);
      setMessage("Registro exitoso!");
      console.log('Usuario registrado:', user); // Verifica que la respuesta sea la esperada
    } catch (error) {
      setMessage("Error al registrar el usuario");
      console.error("Error en registro:", error); // Muestra el error en la consola
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
      </form>
      {message && <p>{message}</p>} {/* Mostrar el mensaje de éxito o error */}
    </div>
  );
};

export default Register;
