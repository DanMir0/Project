import DB from "@/services/DB";

export default {
    list() {
        return DB.prepare("SELECT * FROM measuring_units").all();
    },
    show(id) {
        return DB.prepare("SELECT * FROM measuring_units t WHERE t.id=?").get(id);
    },
    update(model) {
        DB.prepare("UPDATE measuring_units SET name=? WHERE id=?").run([
            model.name,
            model.id,
        ]);
    },
    create(model) {
        let info = DB.prepare("INSERT INTO measuring_units(name) VALUES (?)").run([
            model.name,
        ]);
        return info.lastInsertRowid;
    },
    delete(id) {
        DB.prepare("DELETE FROM measuring_units WHERE id=?").run([id]);
    },
};
