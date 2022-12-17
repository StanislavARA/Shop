import useStore from "../../../hooks/useStore";
import Order from "./Order";
import {observer} from "mobx-react-lite"


const OrdersPanel = (): JSX.Element => {
    const totalPrice = useStore().cart.totalPrice;
    const ordersProducts = useStore().cart.orderList?.map(p => (
        <li>
            <Order name={p.name} amount={p.amount} price={p.price} key={p.id} id={p.id} imgUrl={p.imgUrl}/>
        </li>
    ))

    return (<div>
            <ul>{ordersProducts}</ul>
            {ordersProducts.length > 0 ? <div><b>Итого: {totalPrice}</b></div> : null}
        </div>
    )
}

export default observer(OrdersPanel)
