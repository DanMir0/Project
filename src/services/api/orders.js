import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare(
      "SELECT o.*,os.name order_status_name, c.name counterparty_name FROM orders o join order_statuses os on o.order_status_id=os.id join counterparties c on o.counterparty_id=c.id"
    ).all();
  },
  show(id) {
    let order = DB.prepare("SELECT * FROM orders t WHERE t.id=?").get(id);
    order.tech_cards = this.getTechCards(id);
    return order;
  },
  update(model) {
    DB.prepare(
      "UPDATE orders SET order_status_id=?, counterparty_id=?, created_at=?, updated_at=?, timestamp=? WHERE id=?"
    ).run([
      model.order_status_id,
      model.counterparty_id,
      model.created_at,
      model.updated_at,
      model.timestamp,
      model.id,
    ]);
    this.updateTechCards(model.id, model.tech_cards);
  },
  create(model) {
    let info = DB.prepare(
      "INSERT INTO orders(order_status_id, counterparty_id, created_at, updated_at, timestamp) VALUES (?, ?, ?, ?, ?)"
    ).run([
      model.order_status_id,
      model.counterparty_id,
      model.created_at,
      model.updated_at,
      model.timestamp,
    ]);
    const id = info.lastInsertRowid;
    this.updateTechCards(id, model.tech_cards);
    return id;
  },
  delete(id) {
    DB.prepare("DELETE FROM orders WHERE id=?").run([id]);
  },

  getTechCards(order_id) {
    return DB.prepare(
      `SELECT otc.*,tc.name
                 FROM orders_tech_cards otc 
                     JOIN tech_cards tc on otc.tech_card_id=tc.id 
                 WHERE order_id=?`
    ).all(order_id);
  },

  updateTechCards(order_id, tech_cards) {
    const originTechCards = this.getTechCards(order_id);
    originTechCards.forEach((item) => {
      if (!tech_cards.some((t) => +t.id === item.id)) {
        DB.prepare("DELETE FROM orders_tech_cards WHERE id=?").run([item.id]);
      }
    });

    tech_cards.forEach((item) => {
      if (item.id) {
        DB.prepare(
          "UPDATE orders_tech_cards SET tech_card_id=?, quantity=? WHERE id=?"
        ).run([item.tech_card_id, item.quantity, item.id]);
      } else {
        DB.prepare(
          "INSERT INTO orders_tech_cards (order_id, tech_card_id, quantity) VALUES (?,?,?)"
        ).run([order_id, item.tech_card_id, item.quantity]);
      }
    });
  },
};
