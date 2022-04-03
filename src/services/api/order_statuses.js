import DB from "@/services/DB";

export default {
    list() {
        return DB.prepare("SELECT * FROM order_statuses").all();
    },
    show(id) {
        return DB.prepare("SELECT * FROM order_statuses t WHERE t.id=?").get(id);
    },
    update(model) {
        DB.prepare("UPDATE order_statuses SET name=? WHERE id=?").run(
            [model.name, model.id]
        );
    },
    create(model) {
        let info = DB.prepare(
            "INSERT INTO order_statuses(name) VALUES (?)"
        ).run([model.name]);
        return info.lastInsertRowid;
    },
    delete(id) {
        DB.prepare("DELETE FROM order_statuses WHERE id=?").run([id]);
    },
};
