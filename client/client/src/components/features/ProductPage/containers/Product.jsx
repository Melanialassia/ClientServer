import Cards from "../components/Cards";
import style from './Product.module.css';

const Product = ({ allProducts }) => {
    return (
        <div className={style.contenedorproductos}>
            {
                allProducts.map((product) => (
                    <Cards product={product} key={product.idProduct} />
                ))
            }
        </div>
    )
};

export default Product;