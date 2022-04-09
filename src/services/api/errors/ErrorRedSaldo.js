export class ErrorRedSaldo extends Error {
    constructor(message) {
        super(message);
        this.name = "ErrorRedSaldo";
    }
}