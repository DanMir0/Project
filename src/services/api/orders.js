import DB from "@/services/DB";
import {STATUS_FINISHED, STATUS_IN_PROGRESS, STATUS_ISSUED, STATUS_NEW} from "../../common/order_statuses";
import api from "./index";
import {INCOME, OUTCOME} from "../../common/document_types";
import tech_cards from "@/services/api/tech_cards";

export default {
    list() {
        return DB.prepare(
            "SELECT o.*,os.name order_status_name, c.name counterparty_name FROM orders o join order_statuses os on o.order_status_id=os.id join counterparties c on o.counterparty_id=c.id"
        ).all();
    },
    show(id) {
        let order = DB.prepare("SELECT * FROM orders t WHERE t.id=?").get(id);
        order.tech_cards = this.getTechCards(id);
        return order;
    },
    update(model) {
        DB.transaction(() => {
            DB.prepare(
                "UPDATE orders SET order_status_id=?, counterparty_id=?, updated_at=date('now') WHERE id=?"
            ).run([model.order_status_id, model.counterparty_id, model.id]);
            this.updateTechCards(model.id, model.tech_cards);
        })();
    },
    create(model) {
        return DB.transaction(() => {
            let info = DB.prepare(
                "INSERT INTO orders(order_status_id, counterparty_id) VALUES (?, ?)"
            ).run([model.order_status_id, model.counterparty_id]);
            const id = info.lastInsertRowid;
            this.updateTechCards(id, model.tech_cards);
            return id;
        })();
    },
    delete(id) {
        DB.prepare("DELETE FROM orders WHERE id=?").run([id]);
    },

    getTechCards(order_id) {
        return DB.prepare(
            `SELECT otc.*, tc.name, p.name product_name, tc.product_id
             FROM orders_tech_cards otc
                      JOIN tech_cards tc on otc.tech_card_id = tc.id
                      JOIN products p on tc.product_id = p.id
             WHERE order_id = ?`
        ).all(order_id);
    },

    updateTechCards(order_id, tech_cards) {
        const originTechCards = this.getTechCards(order_id);
        originTechCards.forEach((item) => {
            if (!tech_cards.some((t) => +t.id === item.id)) {
                DB.prepare("DELETE FROM orders_tech_cards WHERE id=?").run([item.id]);
            }
        });

        tech_cards.forEach((item) => {
            if (item.id) {
                DB.prepare(
                    "UPDATE orders_tech_cards SET tech_card_id=?, quantity=? WHERE id=?"
                ).run([item.tech_card_id, item.quantity, item.id]);
            } else {
                DB.prepare(
                    "INSERT INTO orders_tech_cards (order_id, tech_card_id, quantity) VALUES (?,?,?)"
                ).run([order_id, item.tech_card_id, item.quantity]);
            }
        });
    },
    /**
     * Вовзращает массив материалов которые нужны для производства товара и их количество
     * @param order_id
     */
    getTechCardsProducts(order_id) {
        return DB.prepare(
            `select tcp.product_id,
                    sum(tcp.quantity * otc.quantity) as quantity
             from orders o
                      join orders_tech_cards otc on o.id = otc.order_id
                      join tech_cards_products tcp on otc.tech_card_id = tcp.tech_card_id
             where o.id = ?
             group by product_id`
        ).all([order_id]);
    },

    setStatus(order_id, status_id) {
        let document = {
            counterparty_id: api.settings.load().PRODUCTION_HALL,
            order_id: order_id,
            document_type_id: null,
            products: [],
        };
        if (status_id == STATUS_IN_PROGRESS) {
            document.document_type_id = OUTCOME;
            document.products = this.getTechCardsProducts(order_id);
        } else if (status_id == STATUS_FINISHED) {
            document.document_type_id = INCOME;
            document.products = this.getTechCards(order_id).map((tech_card) => ({
                product_id: tech_card.product_id,
                quantity: tech_card.quantity,
            }));
        } else if (status_id == STATUS_ISSUED) {
            document.document_type_id = OUTCOME;
            document.counterparty_id = this.show(order_id).counterparty_id
            document.products = this.getTechCards(order_id).map((tech_card) => ({
                product_id: tech_card.product_id,
                quantity: tech_card.quantity,
            }));
        } else {
            throw new Error('Неизвестный статус!')
        }
        api.documents.create(document);
        DB.prepare("UPDATE orders SET order_status_id=? WHERE id=?").run([
            status_id,
            order_id,
        ]);
    },
};
