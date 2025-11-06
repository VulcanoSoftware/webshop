export class Basket {

    items = [];

    addItem(obj, quantity) {
        if (this.items.find(item => item.prod == obj)) {
            let index = this.items.findIndex(item => item.prod == obj);
            this.plusItem(index);
            return;
        }
        this.items.push({ prod: obj, quantity: quantity });
    }

    removeItem(i) {
        this.items.splice(i, 1);
    }

    plusItem(i) {
        console.log(i);
        this.items[i].quantity += 1;
    }

    minItem(i) {
        console.log(i);
        this.items[i].quantity -= 1;

        if (this.items[i].quantity <= 0) {
            this.removeItem(i);
        }
    }

    getTotal() {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += this.items[i].prod.price * this.items[i].quantity;
        }
        return total;
    }

    checkout(method, amount) {
        if (parseFloat(amount) >= this.getTotal()) {
            alert("Successfully paid $" + amount + " using " + method + ". Thank you for your purchase!");
            this.items = [];
        }
        else {
            alert("Insufficient payment. Please try again.");
        }
    }

    hideBasket() {
        document.querySelector('.basket').style.display = 'none';
    }

    showBasket() {
        document.querySelector('.basket').style.display = 'block';
    }

    render() {
        console.log(this.items)
        return `
        <div class="basket">
            <h3>Basket</h3>
            ${this.items.map((item, index) => `
                <div class="basket-item" data-index="${index}">
                    <h4>${item.prod.title}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${item.prod.price}</p>
                    <button class="removeBasket"></button>
                    <button class="plusBasket"></button>
                    <button class="minBasket"></button>
                </div>
            `).join('')}
            <p>Total: $${this.getTotal()}</p>
            <button class="checkoutButton"></button>
        </div>
        `;
    }

    renderCheckout() {
        return `
        <div class="checkout-modal">
            <h3>Checkout</h3>
            <p>Total Amount: $${this.getTotal()}</p>
            <label for="paymentMethod">Select Payment Method:</label>
            <select id="paymentMethod" name="paymentMethod">
                <option value="paypal">PayPal</option>
                <option value="bancontact">Bancontact</option>
            </select>
            <br>
            <label for="paymentAmount">Enter Payment Amount:</label>
            <input type="number" id="paymentAmount" name="paymentAmount" min="${this.getTotal()}" step="0.01">
            <br>
            <button class="confirmPaymentButton">Confirm Payment</button>
            <button class="closeCheckoutButton">Close</button>
        </div>
        `;
    }
}