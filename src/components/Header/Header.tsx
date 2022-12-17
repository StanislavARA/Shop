import style from "./Header.module.scss"
import CartButton from "../Cart/CartButton/CartButton";

const Header = (): JSX.Element => {

    return <header className={style.header}>
        <h1>
            Название
        </h1>
        <div>
            <CartButton/>
        </div>
    </header>
}

export default Header