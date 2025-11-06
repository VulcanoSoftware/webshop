export class Product {

    title = "";
    price = 0;
    imageUrl = "";
    modalImages = [];
    modalDescription = "";

    constructor(obj, id) {
        this.id = id;
        this.title = obj.title;
        this.price = obj.price;
        this.imageUrl = obj.imageUrl;
        this.modalImages = obj.modalImages || [];
        this.modalDescription = obj.modalDescription || "";
    }

    render() {
        return `
        <div class="product" data-index="${this.id}">
            <img src="${this.imageUrl}" alt="${this.title}">
            <h3>${this.title}</h3>
            <p>Price: $${this.price}</p>
            <button class="basketAdd"></button>
        </div>
        `;
    }

    renderModal() {
        return `
        <div class="product-modal" data-index="${this.id}">
            <h2>${this.title}</h2>
            <div class="modal-images">
                ${this.modalImages.map(img => `<img src="${img}" alt="${this.title}">`).join('')}
            </div>
            <p>${this.modalDescription}</p>
            <p>Price: $${this.price}</p>
            <button class="addToBasketButton" data-index="${this.id}">Add to Basket</button>
            <button class="closeModalButton">Close</button>
            <button class="topRightCloseModalButton">X</button>
        </div>
        `;
    }
}