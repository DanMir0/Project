import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare(
      "SELECT tc.*,p.name product_name FROM tech_cards tc join products p on tc.product_id=p.id"
    ).all();
  },
  show(id) {
    return DB.prepare("SELECT * FROM tech_cards t WHERE t.id=?").get(id);
  },
  update(model) {
    DB.prepare("UPDATE tech_cards SET name=?, product_id? WHERE id=?").run([
      model.name,
      model.product_id,
      model.id,
    ]);
  },
  create(model) {
    let info = DB.prepare(
      "INSERT INTO tech_cards(name,product_id) VALUES (?, ?)"
    ).run([model.name, model.product_id]);
    return info.lastInsertRowid;
  },
  delete(id) {
    DB.prepare("DELETE FROM tech_cards WHERE id=?").run([id]);
  },
};
