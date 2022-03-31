import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare(`SELECT p.*, mu.name measuring_unit_name 
                             FROM products p JOIN measuring_units mu on p.measuring_unit_id=mu.id`).all();
  },
  show(id) {
    return DB.prepare(`SELECT p.*, mu.name measuring_unit_name 
                             FROM products p JOIN measuring_units mu on mu.id = p.measuring_unit_id 
                            WHERE p.id=?`).get(id);
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
