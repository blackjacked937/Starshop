import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList.jsx'; // Este es el componente que va a mostrar los productos
import { getProductos } from '../../Apis/apiProductos.js';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]); // Estado para almacenar los productos
    const { category } = useParams(); // Obtener la categoría desde los parámetros de la URL

    useEffect(() => {
        // Llamamos a getProductos para obtener los productos
        const fetchProductos = async () => {
            try {
                const products = await getProductos();
                // Filtramos los productos según la categoría si la hay
                let filteredProducts = products.filter(prod => prod.stock > 0); // Solo productos con stock
                if (category) {
                    filteredProducts = filteredProducts.filter(prod => prod.genero === category); // Filtrar por categoría
                }
                setProductos(filteredProducts); // Guardar los productos en el estado
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProductos(); // Llamamos a la función para obtener los productos
    }, [category]); // El efecto se ejecuta cada vez que cambia la categoría

    return (
        <div className="row cardProductos">
            {/* Pasamos los productos como prop al componente ItemList */}
            <ItemList productos={productos} />
        </div>
    );
};

export default ItemListContainer;
