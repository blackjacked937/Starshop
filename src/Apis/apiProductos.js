// Obtener todos los productos del catálogo
import { supabase } from "../supabase";

export const getProductos = async () => {
  const { data, error } = await supabase.from('catalogojuegos').select('*')
  if (error) throw error
  return data
}



export const getProducto = async (id) => {
    const { data, error } = await supabase.from('catalogojuegos').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }



// Actualizar un producto por su id
export const updateProducto = async (id, info) => {
  const { error } = await supabase.from('catalogojuegos').update(info).eq('id', id)
  if (error) throw error
}

// Eliminar un producto por su id
export const deleteProducto = async (id) => {
  const { error } = await supabase.from('catalogojuegos').delete().eq('id', id)
  if (error) throw error
}

