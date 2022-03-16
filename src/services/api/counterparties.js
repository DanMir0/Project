import DB from "@/services/DB";

export default {
    list() {
        return DB.prepare("SELECT * FROM counterparties").all();
    },
    show(id) {
        return DB.prepare("SELECT * FROM counterparties t WHERE t.id=?").get(id);
    },
    update(model) {
        DB.prepare("UPDATE counterparties SET name=? WHERE id=?").run([model.name, model.id]);
    },
    create(model) {
        let info =  DB.prepare("INSERT INTO counterparties(name) VALUES (?)").run([model.name]);
        return info.lastInsertRowid;
    },
    delete(id) {
        DB.prepare("DELETE FROM counterparties WHERE id=?").run([id]);
    }
}