import {types} from "mobx-state-tree"
import {ProductType} from "../Types/ProductType"


const OrderedProduct = types.model("OrdProduct", {
    id: types.identifierNumber,
    name: types.string,
    price: types.string,
    amount: types.number,
    imgUrl: types.string
})


const CartStore = types.model('CartStore', {
    orderList: types.array(OrderedProduct),
    totalPrice: 0,
    totalAmount: 0
}).views(self => {
    return {
        getProductIndex(product: ProductType): number {
            return self.orderList!.findIndex(p => p.id === product.id)
        },
        calculateTotalPriceAndAmountOrderList(): [number, number] {
            const totalPrice = self.orderList.reduce((sum, current) => (sum + Number(current.price) * current.amount), 0);
            const totalAmount = self.orderList.reduce((sum, current) => (sum + current.amount), 0);
            return [totalPrice, totalAmount]
        }
    }
})
    .actions(self => {

        function increaseAmount(ProductIndex: number): void {
            self.orderList[ProductIndex].amount++;
            [self.totalPrice, self.totalAmount] = self.calculateTotalPriceAndAmountOrderList()
        };

        function decreaseAmount(ProductIndex: number): void {
            self.orderList[ProductIndex].amount--;
            [self.totalPrice, self.totalAmount] = self.calculateTotalPriceAndAmountOrderList()

            if (self.orderList[ProductIndex].amount === 0) { // вариант - задизейблить кнопку
                removeProduct(ProductIndex)
            }
        };

        function addProduct(product: ProductType): void {
            self.orderList.push({...product, amount: 1});
            [self.totalPrice, self.totalAmount] = self.calculateTotalPriceAndAmountOrderList()
        }

        function removeProduct(ProductIndex: number): void {
            self.orderList.splice(ProductIndex, 1);
            [self.totalPrice, self.totalAmount] = self.calculateTotalPriceAndAmountOrderList()
        }

        function clearOrderList(): void {
            self.orderList.length = 0;
            [self.totalPrice, self.totalAmount] = self.calculateTotalPriceAndAmountOrderList()
        }

        return {
            increaseAmount,
            decreaseAmount,
            addProduct,
            removeProduct,
            clearOrderList
        }
    })

export default CartStore