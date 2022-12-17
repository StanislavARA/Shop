import useStore from "../../../hooks/useStore";
import style from "./Products.module.scss"
import Button from '@mui/material/Button';
import {ProductType} from "../../../Types/ProductType";

const Product = (props: ProductType) => {
    const cartState = useStore().cart;
    const addProductToOrderList = (props: ProductType): void => {
        let indexProductOrderList = cartState.getProductIndex(props);
        indexProductOrderList >= 0 ? cartState.increaseAmount(indexProductOrderList) : cartState.addProduct(props)
    }

    return (
        <div className={style.body_products}>
            <div><img src={props.imgUrl}/></div>
            <div>
                {props.name}
            </div>
            <div>
                Цена: {props.price}р
            </div>
            <Button variant="outlined" onClick={() => {
                addProductToOrderList(props)
            }}>Добавить в корзину</Button>
        </div>
    )
}

export default Product