import useStore from "../../../hooks/useStore";
import Product from "./Product";
import style from "./ProductsPanel.module.scss"

const ProductsPanel = () => {

    const products = useStore().products.products.map(p => {
        return (
            <div key={p.id}>
                <Product id={p.id} name={p.name} price={p.price} imgUrl={p.imgUrl}/>
            </div>
        )
    });

    return (
        <div className={style.body_products_panel}>{products}</div>
    )
}

export default ProductsPanel