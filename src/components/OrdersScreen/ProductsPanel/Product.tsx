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
            {/* РЕВЬЮ. Зачем тут `<div />` обертка */}
            <div><img src={props.imgUrl}/></div>
            <div>
                {props.name}
            </div>
            <div>
                {/* РЕВЬЮ. В подобных ситуациях, когда нужно вывести что-то строковое с переменными, рекомендую использовать
                    строковые шаблоны - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
                */}
                Цена: {props.price}р
            </div>
            <Button variant="outlined" onClick={() => {
                addProductToOrderList(props)
            }}>Добавить в корзину</Button>
        </div>
    )
}

export default Product