import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrdenCompra, getOrdenCompra } from '../../Apis/apiOrdenCompra';
import { getProducto, updateProducto } from '../../Apis/apiProductos';
import { useCarritoContext } from '../../context/CarritoContex';
import { toast } from 'react-toastify';
import CryptoJS from "crypto-js"; 

const AES_SECRET_KEY = "9387267452"; // Asegúrate de usar una clave segura

// Función para encriptar con AES
const encryptAES = (text) => {
  return CryptoJS.AES.encrypt(text, AES_SECRET_KEY).toString();
};

const Checkout = () => {
  const { totalPrice, carrito, emptyCart, totalCarrito } = useCarritoContext();
  const datosFormulario = React.useRef();
  let navigate = useNavigate();

  const consultarFormulario = async (e) => {
    e.preventDefault();

    const datForm = new FormData(datosFormulario.current);
    const cliente = Object.fromEntries(datForm);

    const aux = [...carrito];

    try {
      // Verificar stock y actualizar productos
      await Promise.all(
        aux.map(async (prodCarrito) => {
          const prodBDD = await getProducto(prodCarrito.id);
          if (prodBDD.stock >= prodCarrito.cant) {
            prodBDD.stock -= prodCarrito.cant;
            await updateProducto(prodCarrito.id, prodBDD);
          } else {
            throw new Error(`Stock no disponible para ${prodCarrito.nombre}`);
          }
        })
      );

      // Crear la orden de compra
      const ordenCompra = await createOrdenCompra(
        cliente,
        totalCarrito(),
        totalPrice(),
        new Date().toISOString()
      );

      if (!ordenCompra || ordenCompra.length === 0) {
        throw new Error("No se pudo registrar la orden de compra");
      }

      // Obtener la orden recién creada
      const nuevaOrden = ordenCompra[0]; // La respuesta es un array

      // Encriptar el ID de la orden para mostrarlo al usuario
      const idEncriptado = encryptAES(nuevaOrden.no_orden); // Usamos la columna no_orden en lugar de id

      toast.success(`¡Gracias por su compra! Su orden es: ${idEncriptado}`);
      emptyCart();
      e.target.reset();
      navigate("/");

    } catch (error) {
      toast.error(error.message || "No se pudo completar la compra. Intente nuevamente.");
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <form onSubmit={consultarFormulario} ref={datosFormulario}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre y Apellido</label>
          <input type="text" className="form-control" name="nombre" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" name="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="emailConfirm" className="form-label">Repetir Email</label>
          <input type="email" className="form-control" name="emailConfirm" required />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">RFC</label>
          <input type="text" className="form-control" name="dni" required />
        </div>
        <div className="mb-3">
          <label htmlFor="celular" className="form-label">Número Telefónico</label>
          <input type="number" className="form-control" name="celular" required />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" name="direccion" required />
        </div>
        <button type="submit" className="btn btn-primary">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default Checkout;
