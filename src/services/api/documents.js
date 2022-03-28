import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare(
      "SELECT  d.*,c.name counterparty_name, dt.name document_type_name FROM documents d join counterparties  c on d.counterparty_id=c.id join document_types dt on d.document_type_id=dt.id"
    ).all();
  },
  show(id) {
    return DB.prepare("SELECT * FROM documents t WHERE t.id=?").get(id);
  },
  update(model) {
    DB.prepare(
      "UPDATE documents SET document_type_id=?, counterparty_id=? WHERE id=?"
    ).run([model.document_type_id, model.counterparty_id, model.id]);
  },
  create(model) {
    let info = DB.prepare(
      "INSERT INTO documents(document_type_id,counterparty_id) VALUES (?, ?)"
    ).run([model.document_type_id, model.counterparty_id]);
    return info.lastInsertRowid;
  },
  delete(id) {
    DB.prepare("DELETE FROM documents WHERE id=?").run([id]);
  },
};
