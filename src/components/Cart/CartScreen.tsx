import Button from "@mui/material/Button";
import useStore from "../../hooks/useStore";
import ProductCart from "./ProductCart";
import {observer} from "mobx-react-lite";
import style from "./CartPage.module.scss"

type PropsType = {
    clickHandler(isActive: boolean): void
}

const CartScreen = (props: PropsType): JSX.Element => {
    const cartStore = useStore().cart;
    const totalPrice = cartStore.getTotalPrice();
    const clearOrderList = cartStore.clearOrderList;
    const CartProducts = cartStore.orderList?.map(product => (
        <ProductCart {...product} key={product.id}/>
    ))

    return (
        <div>
            <div className={style.products_block}>
                {CartProducts}
            </div>
            <div>
                {`Общая стоимость: ${totalPrice}р`}
            </div>
            <Button
                variant="outlined"
                onClick={clearOrderList}
            >
                очистить корзину
            </Button>
            <Button
                variant="contained" onClick={() => {
                props.clickHandler(true)
            }}
            >
                оформить заказ
            </Button>
        </div>
    )
}

export default observer(CartScreen)