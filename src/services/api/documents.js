import DB from "@/services/DB";

export default {
  list() {
    return DB.prepare(
      "SELECT  d.*,c.name counterparty_name, dt.name document_type_name, dt.in_out FROM documents d join counterparties c on d.counterparty_id=c.id join document_types dt on d.document_type_id=dt.id"
    ).all();
  },
  show(id) {
    let document = DB.prepare("SELECT * FROM documents t WHERE t.id=?").get(id);
    document.products = this.getProducts(id);
    return document
  },
  update(model) {
    DB.prepare(
      "UPDATE documents SET document_type_id=?, counterparty_id=?, updated_at=date('now') WHERE id=?"
    ).run([model.document_type_id, model.counterparty_id, model.id]);
    this.updateProducts(model.id, model.products)
  },
  create(model) {
    let info = DB.prepare(
      "INSERT INTO documents(document_type_id, counterparty_id) VALUES (?, ?)"
    ).run([model.document_type_id, model.counterparty_id]);
    const id = info.lastInsertRowid;
    this.updateProducts(id, model.products)
    return id
  },
  delete(id) {
    DB.prepare("DELETE FROM documents WHERE id=?").run([id]);
  },
  getProducts(document_id) {
    return DB.prepare(
        `SELECT dp.*, p.name, mu.name AS measuring_unit_name
                 FROM documents_products dp 
                     JOIN products p on dp.product_id=p.id JOIN measuring_units mu on p.measuring_unit_id=mu.id
                 WHERE document_id=?`
    ).all(document_id);
  },
  updateProducts(document_id, products) {
    const originProducts = this.getProducts(document_id);
    originProducts.forEach((item) => {
      if (!products.some((p) => +p.id === item.id)) {
        DB.prepare("DELETE FROM documents_products WHERE id=?").run([item.id]);
      }
    });

    products.forEach((item) => {
      if (item.id) {
        DB.prepare(
            "UPDATE documents_products SET product_id=?, quantity=? WHERE id=?"
        ).run([item.product_id, item.quantity, item.id]);
      } else {
        DB.prepare(
            "INSERT INTO documents_products (document_id, product_id, quantity) VALUES (?,?,?)"
        ).run([document_id, item.product_id, item.quantity]);
      }
    });
  },

};
