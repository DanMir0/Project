import DB from "@/services/DB";

export default {
    /**
     * Инициализируем таблицу тех_карты
     *
     * @return {*}
     */
    list() {
        return DB.prepare(
            "SELECT tc.*,p.name product_name FROM tech_cards tc join products p on tc.product_id=p.id"
        ).all();
    },
    /**
     * Показываем запись в таблице тех_карты по id
     *
     * @param id
     * @return {*}
     */
    show(id) {
        let tech_card = DB.prepare(
            "SELECT tc.*,p.name product_name FROM tech_cards tc join products p on tc.product_id=p.id WHERE tc.id=?"
        ).get(id);
        tech_card.products = this.getProducts(id);
        return tech_card;
    },
    /**
     * Обновляем запись в таблице тех_карты, через транзакцию
     *
     * @param model
     * @return {*}
     */
    update(model) {
        return DB.transaction(() => {
            DB.prepare(
                "UPDATE tech_cards SET name=?, product_id=?, updated_at=date('now') WHERE id=?"
            ).run([model.name, model.product_id, model.id]);

            this.updateProducts(model.id, model.products);
        })();
    },
    /**
     * Создает добавление в таблицу тех_карты, через транзакцию
     *
     * @param model
     * @return {integer} id
     * @return {*}
     */
    create(model) {
        return DB.transaction(() => {
            let info = DB.prepare(
                "INSERT INTO tech_cards(name, product_id) VALUES (?, ?)"
            ).run([model.name, model.product_id]);
            const id = info.lastInsertRowid;
            this.updateProducts(id, model.products);
            return id;
        })();
    },
    /**
     * Удаляет запись в таблице тех_карты по id
     *
     * @param id
     */
    delete(id) {
        DB.prepare("DELETE FROM tech_cards WHERE id=?").run([id]);
    },
    /**
     * Полчуем продукт через id тех_карты
     * @param tech_card_id
     * @return {*}
     */
    getProducts(tech_card_id) {
        return DB.prepare(
            `SELECT tcp.*, p.name, mu.name AS measuring_unit_name
             FROM tech_cards_products tcp
                      JOIN products p on tcp.product_id = p.id
                      JOIN measuring_units mu on p.measuring_unit_id = mu.id
             WHERE tech_card_id = ?`
        ).all(tech_card_id);
    },
    /**
     * Обновляем материалы в дочерней таблицы и если у нас есть материалы, то обновляем иначе добавляем материалы
     *
     * @param tech_card_id
     * @param products
     */
    updateProducts(tech_card_id, products) {
        const originProducts = this.getProducts(tech_card_id);
        originProducts.forEach((item) => {
            if (!products.some((p) => +p.id === item.id)) {
                DB.prepare("DELETE FROM tech_cards_products WHERE id=?").run([item.id]);
            }
        });

        products.forEach((item) => {
            if (item.id) {
                DB.prepare(
                    "UPDATE tech_cards_products SET product_id=?, quantity=? WHERE id=?"
                ).run([item.product_id, item.quantity, item.id]);
            } else {
                DB.prepare(
                    "INSERT INTO tech_cards_products (product_id, tech_card_id, quantity) VALUES (?, ?, ?)"
                ).run([item.product_id, tech_card_id, item.quantity]);
            }
        });
    },
};
