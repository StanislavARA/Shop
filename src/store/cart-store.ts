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
})
    // РЕВЬЮ. Смотри, `views`, это `computed` из MOBX, то есть набор полей, которые "наблюдают"
    // за observable полями и перерасчитываются при их изменении https://mobx.js.org/computeds.html.
    // Отсюда первый поинт - методы ниже это не рассчитываемое состояние, а просто функции, и место в `actions`
    // Второй поинт - Если есть возможность рассчитать состояние из существующего лучше сделать так,
    // не держать в нем поля `totalPrice` и `totalAmount` и не вызывать в экшнах `calculateTotalPriceAndAmountOrderList`
    // Опасность `calculateTotalPriceAndAmountOrderList` еще и в том, что вот забудешь ты его когда-нить вызвать когда это
    // надо будет и произойдет рассинхронизация состояния, ужаснейший и трудноотлаживаемый пиздец.
    .views(self => {
    return {
        // РЕВЬЮ. Это некритично, но нужно для хорошей архитектуры
        // В исполняемом коде сначала вызывается `getProductIndex`, а потом целевой метод с индексом
        // Это плохо тем что исполняемому коду приходится знать про стор "больше чем следует",
        //
        // Лучше чтобы, все методы куда передается индекс, принимали саму модель `OrderedProduct`
        // (по генерации типа из модели смотри https://mobx-state-tree.js.org/tips/typescript)
        // И там в методе произойдет поиск индекса через `Array.find`, ЛИБО сделать поле `orderList` - мапой
        // `types.map`.
        // Что это даст - стор станет для компонентов более "черным ящиком" что однозначно хорошо
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

        // РЕВЬЮ. В js/ts, по принятой повсеместно конвенции, переменные с большой буквы
        // это либо классы, либо типы/интерфейсы. (я про ProductIndex ниже)
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