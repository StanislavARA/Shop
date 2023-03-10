import useStore from "../../../hooks/useStore";
import Button from '@mui/material/Button';
import style from "./Order.module.scss"
import {ProductType} from "../../../Types/ProductType";


const Order = (props: ProductType): JSX.Element => {
    const cartStore = useStore().cart;
    const price = +props.price * props.amount!;
    const ProductIndex = cartStore.getProductIndex(props);
    const increaseAmount = cartStore.increaseAmount;
    const decreaseAmount = cartStore.decreaseAmount;
    const removeProduct = cartStore.removeProduct;

    return (
        <div className={style.order_item}>
            <div><img src={props.imgUrl}/></div>
            <div>
                {props.name}
            </div>
            <div className={style.amount}>
                <Button onClick={() => {
                    decreaseAmount(ProductIndex)
                }}>-</Button>
                <span>
                    {props.amount}
                </span>
                <Button onClick={() => {
                    increaseAmount(ProductIndex)
                }}>+</Button>
            </div>
            <div className={style.price}>
                <span>{price}р</span>

                <Button onClick={() => {
                    removeProduct(ProductIndex)
                }}>х</Button>
            </div>
        </div>
    )
}

export default Order