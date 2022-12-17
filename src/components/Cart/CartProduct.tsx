import useStore from "../../hooks/useStore";
import Button from '@mui/material/Button';
import {ProductType} from "../../Types/ProductType";


const CartProduct = (props: ProductType): JSX.Element => {
    const indexProductOrderList = useStore().cart.getProductIndex(props);
    const removeProduct = useStore().cart.removeProduct;

    return (
        <div>
            <div>
                <img src={props.imgUrl} alt=""/>
            </div>
            <div>
                {props.name}
            </div>
            <div>
                Количество: {props.amount}
            </div>

            <div>
                Цена за ед.: {props.price}р
            </div>
            <div>
                <Button onClick={() => {
                    removeProduct(indexProductOrderList)
                }}>х</Button>
            </div>
        </div>
    )
}

export default CartProduct