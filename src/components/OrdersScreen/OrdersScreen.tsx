import OrdersPanel from "./OrdersPanel/OrdersPanel";
import ProductsPanel from "./ProductsPanel/ProducstPanel";
import style from "./OrdersScreen.module.scss"

const OrdersScreen = (): JSX.Element => {
    return (<div className={style.body}>
            <div className={style.product_panel}>
                <ProductsPanel/>
            </div>
            <div className={style.orders_panel}>
                <OrdersPanel/>
            </div>

        </div>
    )
}

export default OrdersScreen