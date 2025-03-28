
import { supabase } from "../supabase";
import { encryptAES } from '../utils/encryption'; // Ruta correcta

const createOrdenCompra = async (cliente, totalCarrito, preTotal, fecha, tarjetaCifrada, fechaExpiracionCifrada, ccvCifrado) => {
  const { data, error } = await supabase.from('ordencompra').insert([{
    buyer: cliente,
    preciototal: preTotal,
    juegoscomprados: totalCarrito,
    fecha: fecha,
    no_orden: encryptAES(new Date().toISOString()), // Encriptamos el ID de la orden
    no_tarjeta: tarjetaCifrada, // Guardamos el número de tarjeta cifrado
    fecha_exp: fechaExpiracionCifrada, // Guardamos la fecha de expiración cifrada
    ccv: ccvCifrado // Guardamos el ccv cifrado
  }]).select();

  if (error) throw error;
  return data;
};

// Obtener una orden de compra por su id
const getOrdenCompra = async (id) => {
  const { data, error } = await supabase.from('ordencompra').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export {createOrdenCompra, getOrdenCompra}