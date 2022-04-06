import DB from "@/services/DB";

export default {
    list() {
        return DB.prepare(
            "SELECT tc.*,p.name product_name FROM tech_cards tc join products p on tc.product_id=p.id"
        ).all();
    },
    show(id) {
        let tech_card = DB.prepare("SELECT tc.*,p.name product_name FROM tech_cards tc join products p on tc.product_id=p.id WHERE tc.id=?").get(
            id
        );
        tech_card.products = this.getProducts(id);
        return tech_card;
    },
    update(model) {
        DB.prepare("UPDATE tech_cards SET name=?, product_id=?, updated_at=date('now') WHERE id=?").run([model.name, model.product_id, model.id,]);

        this.updateProducts(model.id, model.products)
    },
    create(model) {
        let info = DB.prepare(
            "INSERT INTO tech_cards(name, product_id) VALUES (?, ?)"
        ).run([model.name, model.product_id])
        const id = info.lastInsertRowid
        this.updateProducts(id, model.products)
        return id;
    },
    delete(id) {
        DB.prepare("DELETE FROM tech_cards WHERE id=?").run([id]);
    },

    getProducts(tech_card_id) {
        return DB.prepare(
            `SELECT tcp.*, p.name, mu.name AS measuring_unit_name 
                 FROM tech_cards_products tcp 
                     JOIN products p on tcp.product_id = p.id JOIN measuring_units mu on p.measuring_unit_id = mu.id 
                 WHERE tech_card_id=?`
        ).all(tech_card_id);
    },
    updateProducts(tech_card_id, products) {
        const originProducts = this.getProducts(tech_card_id)
        originProducts.forEach(item => {
            if (!products.some(p => +p.id === item.id)) {
                DB.prepare("DELETE FROM tech_cards_products WHERE id=?").run([item.id]);
            }
        })

        products.forEach(item => {
            if (item.id) {
                DB.prepare("UPDATE tech_cards_products SET product_id=?, quantity=? WHERE id=?").run([
                    item.product_id,
                    item.quantity,
                    item.id,
                ]);
            } else {
                DB.prepare(
                    "INSERT INTO tech_cards_products (product_id, tech_card_id, quantity) VALUES (?, ?, ?)"
                ).run([item.product_id, tech_card_id, item.quantity]);
            }
        })
    }
};
