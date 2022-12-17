import {types} from "mobx-state-tree"
import ProductsStore from "./products-store";
import CartStore from "./cart-store";


const RootStore = types.model('RootStore', {
    cart: types.optional(CartStore, {}),
    products: types.optional(ProductsStore, {})
})

export default RootStore