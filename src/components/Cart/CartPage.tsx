import Button from "@mui/material/Button";
import useStore from "../../hooks/useStore";
import CartProduct from "./CartProduct";
import {observer} from "mobx-react-lite";
import style from "./CartPage.module.scss"

type PropsType = {
    clickHandler(isActive: boolean): void
}

const CartPage = (props: PropsType): JSX.Element => {
    const cartStore = useStore().cart;
    const totalPrice = cartStore.totalPrice;
    const clearOrderList = cartStore.clearOrderList;
    const CartProducts = cartStore.orderList?.map(p => (
        <CartProduct name={p.name} amount={p.amount} price={p.price} key={p.id} id={p.id} imgUrl={p.imgUrl}/>
    ))

    return (
        <div>
            <div className={style.products_block}>{CartProducts}</div>
            <div>Общая стоимость: {totalPrice}р</div>
            <Button variant="outlined" onClick={clearOrderList}>очистить корзину</Button>
            <Button variant="contained" onClick={() => {
                props.clickHandler(true)
            }}>оформить заказ</Button>
        </div>
    )
}

export default observer(CartPage)