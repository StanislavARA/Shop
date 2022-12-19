import useStore from "../../../hooks/useStore";
import style from "./Products.module.scss"
import Button from '@mui/material/Button';
import {ProductType} from "../../../Types/ProductType";


interface Props {
    product: ProductType
}

const Product = ({product}: Props) => {
    const addProduct = useStore().cart.addProduct;

    return (
        <div className={style.body_products}>
            {/* РЕВЬЮ. Зачем тут `<div />` обертка */}
            <img src={product.imgUrl}/>
            <div>
                {product.name}
            </div>
            <div>
                {/* РЕВЬЮ. В подобных ситуациях, когда нужно вывести что-то строковое с переменными, рекомендую использовать
                    строковые шаблоны - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
                */}
                {`Цена: ${product.price}р`}
            </div>
            <Button variant="outlined" onClick={() => {
                addProduct({...product, amount: 1})
            }}>Добавить в корзину</Button>
        </div>
    )
}

export default Product