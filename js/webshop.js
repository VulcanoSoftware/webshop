import { Basket } from './basket.js';
import { Product } from './product.js';
export class WebShop {

    products = [];
    basket;

    init() {
        console.log('WebShop initialized');

        // load properties

        this.basket = new Basket();

        this.productsPlaceholder = document.getElementById('productContainer');
        this.basketPlaceholderDialog = document.getElementById('basketPlaceholderDialog');
        this.basketPlaceholder = document.getElementById('basketPlaceholder');
        this.checkoutModal = document.getElementById('checkoutModal');
        this.productModal = document.getElementById('productModal');

        // init methods

        this.getProducts();
        this.renderProducts();

    
        this.basket.items = this.basket.items.map(item => {
            item.prod = this.products[item.prod.id];
            return item;
        });

        this.renderBasket();

        this.addEvents();

    }

    getProducts() {
        for (let i = 0; i < sampleProducts.length; i++) {
            let prod = new Product(sampleProducts[i], i);
            this.products.push(prod);
        }
    }

    renderProducts() {

        this.productsPlaceholder.innerHTML = '';

        for (let i = 0; i < this.products.length; i++) {
            this.productsPlaceholder.innerHTML += this.products[i].render();
        }


    }

    renderBasket() {
        this.basketPlaceholder.innerHTML = '';
        this.basketPlaceholder.innerHTML = this.basket.render();

        if (this.basket.items.length == 0) {
            this.basket.hideBasket();
        }
        else {
            this.basket.showBasket();
        }
    }

    openCheckoutModal() {
        this.checkoutModal.showModal();
        this.checkoutModal.innerHTML = '';
        this.checkoutModal.innerHTML = this.basket.renderCheckout();
    }

    addEvents() {
        this.productsPlaceholder.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product');

            const button = e.target.closest('button');
            if (button && productCard.contains(button)) {
                const index = parseInt(productCard.dataset.index);
                const product = this.products[index];
                console.log('Klik op knop:', productCard, button);
                this.basket.addItem(product, 1);
                this.renderBasket();
            }
            else {
                if (productCard) {
                    const index = parseInt(productCard.dataset.index);
                    const product = this.products[index];
                    console.log('Klik op product:', productCard);
                    this.productModal.showModal();
                    this.productModal.innerHTML = product.renderModal();
                }
            }
        });

        this.basketPlaceholder.addEventListener('click', (e) => {

            if (e.target.classList.contains('removeBasket')) {
                this.basket.removeItem(e.target.parentNode.dataset.index);
                this.renderBasket();
            }

            if (e.target.classList.contains('plusBasket')) {
                this.basket.plusItem(e.target.parentNode.dataset.index);
                this.renderBasket();
            }

            if (e.target.classList.contains('minBasket')) {
                this.basket.minItem(e.target.parentNode.dataset.index);
                this.renderBasket();
            }

            if (e.target.classList.contains('checkoutButton')) {
                this.openCheckoutModal();
                this.renderBasket();
            }
        });

        this.checkoutModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('confirmPaymentButton')) {
                const paymentMethod = document.getElementById('paymentMethod').value;
                const paymentAmount = document.getElementById('paymentAmount').value;
                this.basket.checkout(paymentMethod, paymentAmount);
                this.checkoutModal.close();
                this.renderBasket();
            }

            if (e.target.classList.contains('closeCheckoutButton')) {
                this.checkoutModal.close();
            }
        });

        this.productModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('closeModalButton')) {
                this.productModal.close();
                this.productModal.innerHTML = '';
            }

            if (e.target.classList.contains('addToBasketButton')) {
                const index = parseInt(e.target.dataset.index);
                const product = this.products[index];
                this.basket.addItem(product, 1);
                this.renderBasket();
                this.productModal.close();
                this.productModal.innerHTML = '';
            }

            if (e.target.classList.contains('topRightCloseModalButton')) {
                this.productModal.close();
                this.productModal.innerHTML = '';
            }
        });
    }
}

let sampleProducts = [
    { title: 'Minecraft', price: 20, imageUrl: 'images/minecraft.png', modalImages: ['images/minecraft/minecraft1.png', 'images/minecraft/minecraft2.png', 'images/minecraft/minecraft3.png', 'images/minecraft/minecraft4.png', 'images/minecraft/minecraft5.png'], modalDescription: 'Build and explore your own worlds in Minecraft!' },
    { title: 'Euro Truck Simulator 2', price: 10, imageUrl: 'images/ets2.png', modalImages: ['images/ets2/ets2_1.png', 'images/ets2/ets2_2.png', 'images/ets2/ets2_3.png', 'images/ets2/ets2_4.png', 'images/ets2/ets2_5.png', 'images/ets2/ets2_6.png', 'images/ets2/ets2_7.png', 'images/ets2/ets2_8.png', 'images/ets2/ets2_9.png', 'images/ets2/ets2_10.png', 'images/ets2/ets2_11.png', 'images/ets2/ets2_12.png', 'images/ets2/ets2_13.png', 'images/ets2/ets2_14.png', 'images/ets2/ets2_15.png', 'images/ets2/ets2_16.png', 'images/ets2/ets2_17.png', 'images/ets2/ets2_18.png'], modalDescription: 'Experience the life of a truck driver in Euro Truck Simulator 2!' },
];