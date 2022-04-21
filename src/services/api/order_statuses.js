import DB from "@/services/DB";

export default {
    /**
     * Инициализируем таблицу статусы_производства
     *
     * @returns {[]}
     */
    list() {
        return DB.prepare("SELECT * FROM order_statuses").all();
    },
    /**
     * Показываем запись в таблице статусы_производства по id
     *
     * @param {integer} id
     * @return {{id:integer, name:text}}
     */
    show(id) {
        return DB.prepare("SELECT * FROM order_statuses t WHERE t.id=?").get(id);
    },
    /**
     * Обновляем запись в таблице статусы_производства
     *
     * @param {integer} id
     * @param {text} name
     * @param model
     *
     * @return {*}
     */
    update(model) {
        DB.prepare("UPDATE order_statuses SET name=? WHERE id=?").run(
            [model.name, model.id]
        );
    },
    /**
     * Создает добавление в таблицу статусы_производства
     *
     * @param {text} name
     * @param model
     * @return {lastInsertRowid}   Возвращает идентификатор строки последней вставки (INSERT) в базу данных.
     */
    create(model) {
        let info = DB.prepare(
            "INSERT INTO order_statuses(name) VALUES (?)"
        ).run([model.name]);
        return info.lastInsertRowid;
    },
    /**
     * Удаляет запись в таблице статусы_производства по id
     */
    delete(id) {
        DB.prepare("DELETE FROM order_statuses WHERE id=?").run([id]);
    },
};
