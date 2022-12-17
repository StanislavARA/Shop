import {types} from "mobx-state-tree"
import {initialState} from "./initial-state";


const Product = types.model('Product', {
    id: types.identifierNumber,
    name: types.string,
    price: types.string,
    imgUrl: types.string
})

const ProductsStore = types.model('BasketStore', {
    products: types.array(Product)
}).actions(self => {
    function loadProducts() {
        initialState.map(p => self.products.push(p))
    };

    function afterCreate() {
        loadProducts()
    }

    return {
        loadProducts,
        afterCreate

    }
})


export default ProductsStore