import useStore from "../../../hooks/useStore";
import Order from "./Order";
import {observer} from "mobx-react-lite"


const OrdersPanel = (): JSX.Element => {
    const totalPrice = useStore().cart.getTotalPrice();

    const ordersProducts = useStore().cart.orderList?.map(product => (
        <li key={product.id}>
            <Order {...product} />
        </li>
    ))

    return (<div>
            <ul>{ordersProducts}</ul>
            {ordersProducts.length > 0 ? <div><b>Итого: {totalPrice}</b></div> : null}
        </div>
    )
}

export default observer(OrdersPanel)
