import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare(
      "SELECT  tc.*,p.name counterparty_name FROM documents tc join counterparties  p on tc.counterparty_id=p.id"
    ).all();
  },
  show(id) {
    return DB.prepare("SELECT * FROM documents t WHERE t.id=?").get(id);
  },
  update(model) {
    DB.prepare(
      "UPDATE documents SET document_type_id=?, implementation=?, counterparty_id=? WHERE id=?"
    ).run([
      model.document_type_id,
      model.implementation,
      model.counterparty_id,
      model.id,
    ]);
  },
  create(model) {
    let info = DB.prepare(
      "INSERT INTO documents(document_type_id,implementation,counterparty_id) VALUES (?, ?, ?)"
    ).run([
      model.document_type_id,
      model.implementation,
      model.counterparty_id,
    ]);
    return info.lastInsertRowid;
  },
  delete(id) {
    DB.prepare("DELETE FROM documents WHERE id=?").run([id]);
  },
};
