import DB from "@/services/DB";
import {
    STATUS_FINISHED,
    STATUS_IN_PROGRESS,
    STATUS_ISSUED,
    STATUS_NEW,
} from "../../common/order_statuses";
import api from "./index";
import { INCOME, OUTCOME } from "../../common/document_types";
import tech_cards from "@/services/api/tech_cards";
import { stat } from "original-fs";

export default {
    /**
     * Возвращает список заказы
     *
     * @param {} order
     * @param {[]} order_statuses
     * @param {[]} counterparties
     * @returns {[]}
     */
    list() {
        return DB.prepare(
            "SELECT o.*,os.name order_status_name, c.name counterparty_name FROM orders o join order_statuses os on o.order_status_id=os.id join counterparties c on o.counterparty_id=c.id"
        ).all();
    },
    /**
     * Показываем запись в таблице заказы по id order и дочернюю таблицу (товар) по id tech_cards
     *
     * @param {integer} id
     * @return {{*}}
     */
    show(id) {
        let order = DB.prepare("SELECT * FROM orders t WHERE t.id=?").get(id);
        order.tech_cards = this.getTechCards(id);
        return order;
    },
    /**
     * Обновляем запись в таблице заказы, через транзакцию (Обеспечение целотсности даннных)
     *
     * @param {integer} order_status_id
     * @param {integer} counterparty_id
     * @param {date} updated_at
     * @param {[]} tech_cards
     * @param model
     *
     * @return {*}
     */
    update(model) {
            DB.transaction(() => {
                DB.prepare(
                    "UPDATE orders SET order_status_id=?, counterparty_id=?, updated_at=date('now') WHERE id=?"
                ).run([model.order_status_id, model.counterparty_id, model.id]);
                this.updateTechCards(model.id, model.tech_cards);
            })();
    },
    /**
     * Создает добавление в таблицу заказы
     *
     * @param {integer} order_status_id
     * @param {integer} counterparty_id
     * @param {[]} tech_cards
     * @param model
     *
     * @return {integer} id
     * @return {*}
     */
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
    /**
     * Удаляет запись в таблице документы по id
     *
     * @param {integer} id Order id
     */
    delete(id) {
        DB.prepare("DELETE FROM orders WHERE id=?").run([id]);
    },
    /**
     * Получем тех карту Order id
     *
     * @param {integer} order_id Parent order id
     */
    getTechCards(order_id) {
        return DB.prepare(
            `SELECT otc.*, tc.name, p.name product_name, tc.product_id
             FROM orders_tech_cards otc
                      JOIN tech_cards tc on otc.tech_card_id = tc.id
                      JOIN products p on tc.product_id = p.id
             WHERE order_id = ?`
        ).all(order_id);
    },
    /**
     * Обновляем тех_карты в дочерней таблицы.
     *
     * @param {integer} order_id
     * @param {array} tech_cards
     * @param {integer} tech_cards.product_id
     * @param {integer} tech_cards.quantity
     */
    updateTechCards(order_id, tech_cards) {
        const originTechCards = this.getTechCards(order_id);
        originTechCards.forEach((item) => {
            if (!tech_cards.some((t) => +t.id === item.id)) {
                DB.prepare("DELETE FROM orders_tech_cards WHERE id=?").run([
                    item.id,
                ]);
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
     * @param {integer} order_id
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
    /**
     * Проверяем статус производства, если в производсвтве отнимаем материалы, если готовый то принимаем, если выдаем то отнимаем.
     *
     * @param {integer} order_id
     * @param {integer} status_id
     */
    setStatus(order_id, status_id) {
        let document = {
            counterparty_id: api.settings.load().PRODUCTION_HALL,
            order_id: order_id,
            document_type_id: null,
            products: [],
        };
        debugger
        if (status_id == STATUS_IN_PROGRESS) {
            document.document_type_id = OUTCOME;
            document.products = this.getTechCardsProducts(order_id);
        } else if (status_id == STATUS_FINISHED) {
            document.document_type_id = INCOME;
            document.counterparty_id  = api.settings.load().CUSTOMER_ID;
            document.products = this.getTechCards(order_id).map(
                (tech_card) => ({
                    product_id: tech_card.product_id,
                    quantity: tech_card.quantity,
                })
            );
            debugger;
        } else if (status_id == STATUS_ISSUED) {
            document.document_type_id = OUTCOME;
            document.counterparty_id = this.show(order_id).counterparty_id;
            debugger;
            document.products = this.getTechCards(order_id).map(
                (tech_card) => ({
                    product_id: tech_card.product_id,
                    quantity: tech_card.quantity,
                })
            );
        } else {
            throw new Error("Неизвестный статус!");
        }
        api.documents.create(document);
        DB.prepare("UPDATE orders SET order_status_id=? WHERE id=?").run([
            status_id,
            order_id,
        ]);

        if (status_id == STATUS_FINISHED) {
            DB.prepare(
                "UPDATE orders SET finished_at=date('now') WHERE id=?"
            ).run([order_id]);
        }
    },
};
