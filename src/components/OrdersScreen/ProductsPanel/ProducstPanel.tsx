import useStore from "../../../hooks/useStore";
import Product from "./Product";
import style from "./ProductsPanel.module.scss"

const ProductsPanel = () => {

    const products = useStore().products.products.map(product => {
        return (
            <div key={product.id}>
                <Product product={product}/>
            </div>
        )
    });

    return (
        <div className={style.body_products_panel}>{products}</div>
    )
}

export default ProductsPanel