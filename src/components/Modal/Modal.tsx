import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import style from "./Modal.module.scss"


type PropsType = {
    modalIsActive: boolean
    clickHandler(isActive: boolean): void
}

const Modal = (props: PropsType) => {

    return (
        <>
            {props.modalIsActive && (
                <div className={style.modal}>
                    <div className={style.modal_body}>
                        <div><b>Заказ выполнен</b></div>
                        <div className={style.modal_body_button}>
                            <NavLink to={"/"}> <Button variant="contained" onClick={() => {
                                props.clickHandler(false)
                            }}>ок</Button></NavLink>
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default Modal