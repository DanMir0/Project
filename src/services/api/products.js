import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare("SELECT * FROM products").all();
  },
  show(id) {
    return DB.prepare("SELECT * FROM products t WHERE t.id=?").get(id);
  },
  update(model) {
    DB.prepare("UPDATE products SET name=? WHERE id=?").run([
      model.name,
      model.id,
    ]);
  },
  create(model) {
    let info = DB.prepare("INSERT INTO products(name) VALUES (?)").run([
      model.name,
    ]);
    return info.lastInsertRowid;
  },
  delete(id) {
    DB.prepare("DELETE FROM products WHERE id=?").run([id]);
  },
};
