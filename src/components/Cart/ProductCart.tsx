import useStore from "../../hooks/useStore";
import Button from '@mui/material/Button';
import {IOrderedProduct} from "../../store/cart-store";


const ProductCart = (product: IOrderedProduct): JSX.Element => {
    const removeProduct = useStore().cart.removeProduct;

    return (
        <div>
            <div>
                <img src={product.imgUrl} alt=""/>
            </div>
            <div>
                {product.name}
            </div>
            <div>
                {`Количество: ${product.amount}`}
            </div>

            <div>
                {`Цена за ед.: ${product.price}р`}
            </div>
            <div>
                <Button onClick={() => {
                    removeProduct(product)
                }}>х</Button>
            </div>
        </div>
    )
}

export default ProductCart