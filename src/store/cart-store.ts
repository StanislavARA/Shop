import {Instance, types} from "mobx-state-tree"


const OrderedProduct = types.model("OrderedProduct", {
    id: types.number,
    name: types.string,
    price: types.string,
    amount: types.number,
    imgUrl: types.string
})

export interface IOrderedProduct extends Instance<typeof OrderedProduct> {
}

const CartStore = types.model('CartStore', {
    orderList: types.array(OrderedProduct),
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

            // убрал метод getProductIndex из views, теперь передаю в экшены OrderedProduct и логику по поиску индекса делаю
            // в экшене, но я считал, что в экшенах должно быть минимум логики, и желательно только изменение состояния,
            // возможно понял коммент  неправильно. Но после того, как сгенерил тип из модели OrderedProduct началась
            //жопа, пришлось что-то переделывать, чтобы не краснил, кажется сделал хуже)
            getTotalPrice(): number {
                return self.orderList.reduce((sum, current) => (sum + Number(current.price) * current.amount), 0);
            },
            getTotalAmount(): number {
                return self.orderList.reduce((sum, current) => (sum + current.amount), 0);
            },
        }
    })

    .actions(self => {

        // РЕВЬЮ. В js/ts, по принятой повсеместно конвенции, переменные с большой буквы
        // это либо классы, либо типы/интерфейсы. (я про ProductIndex ниже)
        function increaseAmount(orderedProduct: IOrderedProduct): void { //позорная ошибка, не заметил, когда копипастил
            const productIndex = self.orderList!.findIndex(p => p.id === orderedProduct.id)
            self.orderList[productIndex].amount++;
        }

        function decreaseAmount(orderedProduct: IOrderedProduct): void {
            const productIndex = self.orderList!.findIndex(p => p.id === orderedProduct.id)
            self.orderList[productIndex].amount--;
            if (self.orderList[productIndex].amount === 0) {
                removeProduct(orderedProduct)
            }
        }

        function addProduct(orderedProduct: IOrderedProduct): void {
            self.orderList.find(p => p.id === orderedProduct.id) ? increaseAmount(orderedProduct) :
                self.orderList.push(orderedProduct);
        }

        function removeProduct(orderedProduct: IOrderedProduct): void {
            const productIndex = self.orderList!.findIndex(p => p.id === orderedProduct.id)
            self.orderList.splice(productIndex, 1);
        }

        function clearOrderList(): void {
            self.orderList.length = 0;
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