import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare(
      "SELECT tc.*,p.name product_name FROM tech_cards tc join products p on tc.product_id=p.id"
    ).all();
  },
  show(id) {
    let tech_card = DB.prepare("SELECT * FROM tech_cards t WHERE t.id=?").get(id);
    let products = DB.prepare("SELECT tcp.*, p.name, mu.name AS measuring_unit FROM tech_cards_products tcp JOIN products p on tcp.product_id = p.id JOIN measuring_units mu on p.measuring_unit_id = mu.id WHERE tech_card_id=? ;").all(id);
    tech_card.products = products
    return tech_card
    },
  update(model) {
    DB.prepare("UPDATE tech_cards SET name=?, product_id=? WHERE id=?").run([
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
