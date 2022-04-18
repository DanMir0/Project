export class ErrorRedSaldo extends Error {
    constructor(message, product, quantity) {
        super(message);
        this.name = "ErrorRedSaldo";
        this.product = product;
        this.quantity = quantity;
    }
}
