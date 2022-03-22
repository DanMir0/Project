import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare("SELECT * FROM products").all();
  },
  show(id) {
    return DB.prepare("SELECT * FROM products t WHERE t.id=?").get(id);
  },
  update(model) {
    DB.prepare("UPDATE products SET name=?,measuring_unit_id=? WHERE id=?").run(
      [model.name, model.measuring_unit_id, model.id]
    );
  },
  create(model) {
    let info = DB.prepare(
      "INSERT INTO products(name,measuring_unit_id) VALUES (?,?)"
    ).run([model.name, model.measuring_unit_id]);
    return info.lastInsertRowid;
  },
  delete(id) {
    DB.prepare("DELETE FROM products WHERE id=?").run([id]);
  },
};
