import DB from "@/services/DB";

export default {
    list() {
        return DB.prepare(`SELECT p.*,
                                  mu.name                                                                    measuring_unit_name,
                                  sum(case when dt.in_out = 'OUT' then -dp.quantity else dp.quantity end) as quantity
                           FROM products p
                                    JOIN measuring_units mu on p.measuring_unit_id = mu.id
                                    LEFT JOIN documents_products dp on p.id = dp.product_id
                                    LEFT JOIN documents d on dp.document_id = d.id
                                    LEFT JOIN document_types dt on d.document_type_id = dt.id
                           GROUP BY p.id, p.name, p.measuring_unit_id, mu.name`).all();
    },
    show(id) {
        return DB.prepare(`SELECT p.*,
                                  mu.name measuring_unit_name,
                                  sum(case when dt.in_out = 'OUT' then -dp.quantity else dp.quantity end) as quantity
                           FROM products p
                                    JOIN measuring_units mu on p.measuring_unit_id = mu.id
                                    LEFT JOIN documents_products dp on p.id = dp.product_id
                                    LEFT JOIN documents d on dp.document_id = d.id
                                    LEFT JOIN document_types dt on d.document_type_id = dt.id
                           WHERE p.id = ?
                           GROUP BY p.id, p.name, p.measuring_unit_id, mu.name`).get(id);
    },
    update(model) {
        DB.prepare("UPDATE products SET name=?,measuring_unit_id=? WHERE id=?").run(
            [model.name, model.measuring_unit_id, model.id]
        );
    },
    create(model) {
        let info = DB.prepare(
            "INSERT INTO products(name,measuring_unit_id) VALUES (?,?)"
        ).run([model.name, model.measuring_unit_id]);
        return info.lastInsertRowid;
    },
    delete(id) {
        DB.prepare("DELETE FROM products WHERE id=?").run([id]);
    },
};
