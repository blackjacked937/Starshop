import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { getProducto } from "../../Apis/apiProductos"; // Asegúrate de que esta función esté exportada correctamente

const Item = () => {
  const { darkMode } = useDarkModeContext();
  const { id } = useParams();  // Obtiene el id del producto desde la URL
  const [producto, setProducto] = useState(null);  // Estado para almacenar un solo producto
  const [error, setError] = useState(null);  // Estado para manejar errores

  useEffect(() => {
    // Llamar a la función getProducto para obtener el producto desde la base de datos
    const fetchProducto = async () => {
      try {
        const data = await getProducto(id);  // Usamos el id del producto desde la URL
        setProducto(data);  // Guardamos el producto en el estado
      } catch (error) {
        setError("Hubo un problema al cargar el producto.");
        console.error("Error al obtener producto:", error);
      }
    };

    fetchProducto();  // Llamar la función al montar el componente
  }, [id]);  // El efecto se ejecutará nuevamente si el id cambia

  if (error) {
    return <div>{error}</div>;  // Mostrar mensaje de error si ocurre uno
  }

  if (!producto) {
    return <div>Cargando...</div>;  // Mostrar un mensaje mientras se carga el producto
  }

  return (
    <div className="item">
      <div
        className={`card ${darkMode ? 'cardDark' : 'otha'}`}
        style={{ width: '18rem' }}
      >
        <img src={producto.imagen} className="card-img-top" alt={producto.nombrejuego} />
        <div className={`card-body cardio ${darkMode ? 'cardBodyDark' : 'cardBody'}`}>
          <h2 className="card-title">{producto.nombrejuego}</h2>  
          <h3 className="card-text textoA">Plataforma: {producto.plataforma}</h3>
          <h3 className="card-text textoA">Género: {producto.genero}</h3>
          <h4 className="card-text textoB">${producto.precio}</h4>
          <button className="btn btn-primary">
            <Link className="nav-link" to={`/product/${producto.id}`}>Ver Producto</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
