import DB from "@/services/DB";

export default {
    /**
     * Инициализируем таблицу единицы_измерения
     *
     * @returns {[]}
     */
    list() {
        return DB.prepare("SELECT * FROM measuring_units").all();
    },
    /**
     * Показываем запись в таблице единицы_измерения по id
     *
     * @param {integer} id
     * @return {{id:integer, name:text}}
     */
    show(id) {
        return DB.prepare("SELECT * FROM measuring_units t WHERE t.id=?").get(id);
    },
    /**
     * Обновляем запись в таблице единицы_измерения
     *
     * @param {integer} id
     * @param {text} name
     * @param model
     *
     * @return {*}
     */
    update(model) {
        DB.prepare("UPDATE measuring_units SET name=? WHERE id=?").run([
            model.name,
            model.id,
        ]);
    },
    /**
     * Создает добавление в таблицу типы_документа
     *
     * @param {text} name
     * @param model
     * @return {lastInsertRowid}   Возвращает идентификатор строки последней вставки (INSERT) в базу данных.
     */
    create(model) {
        let info = DB.prepare("INSERT INTO measuring_units(name) VALUES (?)").run([
            model.name,
        ]);
        return info.lastInsertRowid;
    },
    /**
     * Удаляет запись в таблице типы_документа по id
     */
    delete(id) {
        DB.prepare("DELETE FROM measuring_units WHERE id=?").run([id]);
    },
};
