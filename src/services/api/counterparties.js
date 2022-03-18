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
      "UPDATE counterparties SET name=?, contact_info=?, address=?, inn=? WHERE id=?"
    ).run([model.name, model.contact_info, model.address, model.inn, model.id]);
  },
  create(model) {
    let info = DB.prepare(
      "INSERT INTO counterparties(name,contact_info,address,inn) VALUES (?, ?, ?, ?)"
    ).run([model.name, model.contact_info, model.address, model.inn]);
    return info.lastInsertRowid;
  },
  delete(id) {
    DB.prepare("DELETE FROM counterparties WHERE id=?").run([id]);
  },
  //   insert(model) {
  //     DB.prepare(
  //       'INSERT INTO counterparties(name,contact_info,address,inn) VALUES (ООО "Компания Элейн", +7 (843) 240-17-02, г. Казань, Восход, 1658082130), (ООО "Тайлер", +7(495)196-66-36,  г. Москва, Дмитровское шоссе, дом. 108, 7727737720)'.run(
  //         [model.name, model.contact_info, model.address, model.inn]
  //       )
  //     );
  //   },
};
