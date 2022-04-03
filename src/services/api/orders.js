import DB from "@/services/DB";

export default {
    list() {
        return DB.prepare("SELECT * FROM orders").all();
    },
    show(id) {
        return DB.prepare("SELECT * FROM orders t WHERE t.id=?").get(id);
    },
    update(model) {
        DB.prepare("UPDATE orders SET order_status_id=?, counterparty_id=?, created_at=?,updated_at=?,timestamp=? WHERE id=?").run(
            [model.order_status_id, model.counterparty_id, model.created_at, model.updated_at, model.timestamp, model.id]
        );
    },
    create(model) {
        let info = DB.prepare(
            "INSERT INTO orders(order_status_id,counterparty_id, created_at,updated_at,timestamp) VALUES (?, ?, ?, ?, ?)"
        ).run([model.order_status_id, model.counterparty_id, model.created_at, model.updated_at, model.timestamp, model.id]);
        return info.lastInsertRowid;
    },
    delete(id) {
        DB.prepare("DELETE FROM orders WHERE id=?").run([id]);
    },
};
