import { Link } from "react-router-dom";

const ItemList = ({ productos }) => {
    return (
        <div className="row">
            {productos.map(prod => (
                <div key={prod.id} className="col-md-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={prod.imagen} className="card-img-top" alt={prod.nombrejuego} />
                        <div className="card-body">
                            <h5 className="card-title">{prod.nombrejuego}</h5>
                            <p className="card-text">Genero: {prod.genero}</p>
                            <p className="card-text">Plataforma: {prod.plataforma}</p>
                            <p className="card-text">Precio: ${new Intl.NumberFormat('de-DE').format(prod.precio)}</p>
                            <Link to={`/product/${prod.id}`} className="btn btn-primary">
                                Ver Producto
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
