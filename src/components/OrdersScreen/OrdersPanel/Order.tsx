import useStore from "../../../hooks/useStore";
import Button from '@mui/material/Button';
import style from "./Order.module.scss"
import {IOrderedProduct} from "../../../store/cart-store";


// РЕВЬЮ. Лучше сделать так
// interface Props {
//      product: ProductType
// }
// Это принесет 2 бенефита
// 1. Если поменяется ProductType, не придется менять код в местах применения
// 2. В местах применения станет красивше и проще читать
// Замечание относится и к другим компонентам с аналогичными пропсами

//типизировал IOrderedProduct, иначе совсем какая-то задница начинается
// Это
// interface Props {
//      product: ProductType
// }
// использовал в компоненте Product.tsx

const Order = (product: IOrderedProduct): JSX.Element => {
    const cartStore = useStore().cart;
    const price = +product.price * product.amount!;
    const increaseAmount = cartStore.increaseAmount;
    const decreaseAmount = cartStore.decreaseAmount;
    const removeProduct = cartStore.removeProduct;

    return (
        <div className={style.order_item}>
            <div><img src={product.imgUrl}/></div>
            <div>
                {product.name}
            </div>
            <div className={style.amount}>
                <Button onClick={() => {
                    decreaseAmount(product)
                }}>-</Button>
                <span>
                    {product.amount}
                </span>
                <Button onClick={() => {
                    increaseAmount(product)
                }}>+</Button>
            </div>
            <div className={style.price}>
                <span>{price}р</span>

                <Button onClick={() => {
                    removeProduct(product)
                }}>х</Button>
            </div>
        </div>
    )
}

export default Order