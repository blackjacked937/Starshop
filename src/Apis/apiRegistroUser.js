import bcrypt from 'bcryptjs';
import { supabase } from "../supabase";

// Función de registro de usuario
export const registerUsuario = async (email, password) => {
  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar los datos en la base de datos (supabase)
    const { data, error } = await supabase
      .from('users') // Asegúrate de que la tabla se llama 'users' y no algo distinto
      .insert([
        { email, password: hashedPassword }, // Asegúrate de que los campos coincidan con la base de datos
      ]);

    if (error) {
      console.error('Error al insertar el usuario:', error); // Muestra el error si algo falla
      throw error; // Lanza el error si ocurre
    }

    console.log('Usuario registrado:', data); // Muestra los datos del usuario insertado
    return data; // Devuelve los datos insertados si la operación fue exitosa
  } catch (error) {
    console.error('Error en el registro:', error); // Muestra el error en la consola
    throw error; // Lanza el error
  }
};
