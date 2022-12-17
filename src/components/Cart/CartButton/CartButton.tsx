import style from "./CartButton.module.scss"
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite"
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";

const CartButton = (): JSX.Element => {
    const totalAmountProducts = useStore().cart.totalAmount

    return (
        <div className={style.cart}>
            <div>
                Количество товаров: {totalAmountProducts}
            </div>
            <NavLink to={"/cart"}> <Button variant="contained">Корзина</Button></NavLink>
        </div>
    )
}

export default observer(CartButton)