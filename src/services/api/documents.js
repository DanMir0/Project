import DB from "@/services/DB";
import {OUTCOME} from "@/common/document_types";
import api from "@/services/api/index";
import {ErrorRedSaldo} from "@/services/api/errors/ErrorRedSaldo";

export default {
    /**
     * Возвращает список документов
     *
     * @returns {*}
     */
    list(filter = {}) {
        let params = []
        let filterStr = ''
        if (filter.order_id) {
            filterStr += ` and order_id=? `
            params.push(filter.order_id)
        }

        return DB.prepare(
            `SELECT  d.*,c.name counterparty_name, dt.name document_type_name, dt.in_out
                    FROM documents d
                    join counterparties c on d.counterparty_id=c.id
                    join document_types dt on d.document_type_id=dt.id
                    WHERE 1=1 ${filterStr}`
        ).all(params);
    },

    /**
     * Показываем запись в таблице документы по id
     *
     * @param {int} id
     * @returns {{id:integer, document_type_id:integer,counterparty_id:integer, products:[]}}
     */
    show(id) {
        let document = DB.prepare("SELECT * FROM documents t WHERE t.id=?").get(id);
        document.products = this.getProducts(document.id);
        return document
    },

    /**
     * Обновляем запись в таблице документы, через транзакцию
     *
     * @param {integer} id
     * @param {intege} document_type_idr
     * @param {integer} counterparty_id
     * @param {[]} products
     * @param model
     *
     * @return {*}
     */
    update(model) {
        return DB.transaction(() => {
            DB.prepare(
                "UPDATE documents SET document_type_id=?, counterparty_id=?, updated_at=date('now') WHERE id=?"
            ).run([model.document_type_id, model.counterparty_id, model.id]);
            this.updateProducts(model.id, model.products, model.document_type_id)
        })()
    },

    /**
     * Создает добавление в таблицу документы, через транзакцию
     *
     * @param {integer} document_type_id
     * @param {integer} counterparty_id
     * @param {[]} products
     * @param model
     *
     * @return {integer} id
     * @return {*}
     */
    create(model) {
        return DB.transaction(() => {
            let info = DB.prepare(
                "INSERT INTO documents(document_type_id, counterparty_id, order_id) VALUES (?, ?, ?)"
            ).run([model.document_type_id, model.counterparty_id, model.order_id]);
            let id = info.lastInsertRowid;
            this.updateProducts(id, model.products, model.document_type_id)
            return id
        })()
    },

    /**
     * Удаляет запись в таблице документы по id
     *
     * @param {integer} id Document id
     */
    delete(id) {
        DB.prepare("DELETE FROM documents WHERE id=?").run([id]);
    },

    /**
     * Полчуем продукт через id документа
     *
     * @param {integer} document_id Parent document id
     */
    getProducts(document_id) {
        return DB.prepare(
            `SELECT dp.*, p.name, mu.name AS measuring_unit_name
             FROM documents_products dp
                      JOIN products p on dp.product_id = p.id
                      JOIN measuring_units mu on p.measuring_unit_id = mu.id
             WHERE dp.document_id = ?`
        ).all(document_id);
    },

    /**
     * Обновляем продукты в дочерней таблицы и при этом проверяем условие на остаток, если остаток меньше 0 то выдаем ошибку.
     *
     * @param {integer} document_id
     * @param {array} products
     * @param {integer} products.product_id
     * @param {integer} products.quantity
     * @param {integer} document_type_id
     */
    updateProducts(document_id, products, document_type_id) {
        const originProducts = this.getProducts(document_id);

        originProducts.forEach((item) => {
            if (!products.some(p => +p.id === +item.id)) {
                DB.prepare("DELETE FROM documents_products WHERE id=?").run([item.id]);
            }
        });

        products.forEach((item) => {
            //check available quantity
            if (document_type_id === OUTCOME) {
                const product = api.products.show(item.product_id)
                if (product.quantity - item.quantity < 0) {
                    throw new ErrorRedSaldo('Not available', product, Math.abs(product.quantity - item.quantity))
                }
            }
            if (item.id) {
                DB.prepare(
                    "UPDATE documents_products SET product_id=?, quantity=? WHERE id=?"
                ).run([item.product_id, item.quantity, item.id]);
            } else {
                DB.prepare(
                    "INSERT INTO documents_products (document_id, product_id, quantity) VALUES (?, ?, ?)"
                ).run([document_id, item.product_id, item.quantity]);
            }
        });
    },

};
