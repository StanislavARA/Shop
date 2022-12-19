import {observer} from "mobx-react-lite"
import './App.scss';
import useStore from "./hooks/useStore";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom';
import CartPage from "./components/Cart/CartPage";
import OrdersScreen from "./components/OrdersScreen/OrdersScreen";
import {useState} from "react";
import Modal from "./components/Modal/Modal";


// РЕВЬЮ. По файлу `package.json` (в json-файлах нельзя комменты оставлять) - все зависимости в
// разделе `dependencies`, хотя некоторые должны быть в `devDependencies`, например все `@types/*`

function App(): JSX.Element {
    const [modalIsActive, setModalActive] = useState<boolean>(false);
    const clickHandler = (isActive: boolean): void => {
        setModalActive(isActive)
    };
    return (
        <div className="App">
            <Header/>
            <Routes>
                {/* РЕВЬЮ. Унифицированный нейминг - ниже "Страница Корзины", но "Экран заказов"
                    Выбери, как будут называться компоненты верхнгего уровня - "Страницы" или "Экраны"
                 */}
                <Route path="/cart" element={<CartPage clickHandler={clickHandler}/>}/>
                <Route path="/" element={<OrdersScreen/>}/>
            </Routes>
            <Modal modalIsActive={modalIsActive} clickHandler={clickHandler}/>
        </div>
    );
}

export default observer(App);
