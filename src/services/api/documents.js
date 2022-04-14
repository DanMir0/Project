import DB from "@/services/DB";
import {OUTCOME} from "@/common/document_types";
import api from "@/services/api/index";
import {ErrorRedSaldo} from "@/services/api/errors/ErrorRedSaldo";

export default {
    list() {
        return DB.prepare(
            "SELECT  d.*,c.name counterparty_name, dt.name document_type_name, dt.in_out FROM documents d join counterparties c on d.counterparty_id=c.id join document_types dt on d.document_type_id=dt.id"
        ).all();
    },
    show(id) {
        let document = DB.prepare("SELECT * FROM documents t WHERE t.id=?").get(id);
        document.products = this.getProducts(document.id);
        return document
    },
    update(model) {
        DB.prepare(
            "UPDATE documents SET document_type_id=?, counterparty_id=?, updated_at=date('now') WHERE id=?"
        ).run([model.document_type_id, model.counterparty_id, model.id]);
        this.updateProducts(model, model.products)
    },
    create(model) {
       return DB.transaction(() => {
            let info = DB.prepare(
                "INSERT INTO documents(document_type_id, counterparty_id) VALUES (?, ?)"
            ).run([model.document_type_id, model.counterparty_id]);
            let id = info.lastInsertRowid;
            model.id = id;
            this.updateProducts(model, model.products)
            return id
       })()
    },
    delete(id) {
        DB.prepare("DELETE FROM documents WHERE id=?").run([id]);
    },
    /**
     * @param document_id
     * */
    getProducts(id) {
        return DB.prepare(
            `SELECT dp.*, p.name, mu.name AS measuring_unit_name
             FROM documents_products dp
                      JOIN products p on dp.product_id = p.id
                      JOIN measuring_units mu on p.measuring_unit_id = mu.id
             WHERE dp.id=?`
        ).all(id);
    },
    updateProducts(document, products) {
        const originProducts = this.getProducts(document.id);
        originProducts.forEach((item) => {
            if (!products.some((p) => +p.id === item.id)) {
                DB.prepare("DELETE FROM documents_products WHERE id=?").run([item.id]);
            }
        });

        products.forEach((item) => {
            //check available quantity
            if (document.document_type_id === OUTCOME) {
                const product = api.products.show(item.product_id)
                if (product.quantity - item.quantity < 0) {
                    throw new ErrorRedSaldo('Not available')
                }
            }
            if (item.id) {
                DB.prepare(
                    "UPDATE documents_products SET product_id=?, quantity=? WHERE id=?"
                ).run([item.product_id, item.quantity, item.id]);
            } else {
                DB.prepare(
                    "INSERT INTO documents_products (document_id, product_id, quantity) VALUES (?, ?, ?)"
                ).run([document.id, item.product_id, item.quantity]);
            }
        });
    },

};
