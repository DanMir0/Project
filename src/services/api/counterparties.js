import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare("SELECT * FROM counterparties").all();
  },
  show(id) {
    return DB.prepare("SELECT * FROM counterparties t WHERE t.id=?").get(id);
  },
  update(model) {
    DB.prepare(
      "UPDATE counterparties SET name=?, contact_info=?, address=?, inn=?, created_at=?, updated_at=?, timestamp=? WHERE id=?"
    ).run([
      model.name,
      model.contact_info,
      model.address,
      model.inn,
      model.created_at,
      model.updated_at,
      model.timestamp,
      model.id,
    ]);
  },
  create(model) {
    let info = DB.prepare(
      "INSERT INTO counterparties(name,contact_info,address,inn,created_at, updated_at, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).run([
      model.name,
      model.contact_info,
      model.address,
      model.created_at,
      model.updated_at,
      model.timestamp,
      model.inn,
    ]);
    return info.lastInsertRowid;
  },
  delete(id) {
    DB.prepare("DELETE FROM counterparties WHERE id=?").run([id]);
  },
};
