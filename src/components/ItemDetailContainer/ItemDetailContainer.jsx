import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducto } from "../../Apis/apiProductos";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useDarkModeContext } from "../../context/DarkModeContext";

const ItemDetailContainer = () => {
    const [producto, setProducto] = useState(null);  // Cambio de [] a null, ya que es un solo producto
    const { id } = useParams();
    const { darkMode } = useDarkModeContext();

    useEffect(() => {
        getProducto(id).then(prod => setProducto(prod))  // Asegurarse de que prod sea un objeto y no un arreglo
    }, [id]);

    if (!producto) {
        return <div>Cargando...</div>;  // Mostrar mensaje mientras se carga el producto
    }

    return (
        <div className={`card mb-3 container itemDetail ${darkMode ? 'text-white bg-secondary' : 'border-light'}`}>
            <ItemDetail item={producto} />  {/* Pasa el producto al componente ItemDetail */}
        </div>
    );
}

export default ItemDetailContainer;
