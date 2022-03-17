import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare("SELECT * FROM document_types").all();
  },
  show(id) {
    return DB.prepare("SELECT * FROM document_types t WHERE t.id=?").get(id);
  },
  update(model) {
    DB.prepare("UPDATE document_types SET name=? WHERE id=?").run([
      model.name,
      model.id,
    ]);
  },
  create(model) {
    let info = DB.prepare("INSERT INTO document_types(name) VALUES (?)").run([
      model.name,
    ]);
    return info.lastInsertRowid;
  },
  delete(id) {
    DB.prepare("DELETE FROM document_types WHERE id=?").run([id]);
  },
};
