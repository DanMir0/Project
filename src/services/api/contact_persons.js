import DB from "@/services/DB";

export default {
    /**
     * Возвращает список контактных лиц
     *
     * @returns {[]}
     */
    list() {
        return DB.prepare("SELECT * FROM contact_persons").all();
    },
    /**
     * Показываем запись в таблице единицы_измерения по id
     *
     * @param {integer} id
     * @return {{id:integer, name:text}}
     */
    show(id) {
        return DB.prepare("SELECT * FROM contact_persons t WHERE t.id=?").get(id);
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
        DB.prepare("UPDATE contact_persons SET full_name=?, contact_info=? WHERE id=?").run([
            model.full_name,
            model.contact_info,
            model.id,
        ]);
    },
    /**
     * Создает добавление в таблицу типы_документа
     *
     * @param {text} full_name
     * @param model
     * @return {lastInsertRowid}   Возвращает идентификатор строки последней вставки (INSERT) в базу данных.
     */
    create(model) {
        let info = DB.prepare("INSERT INTO contact_persons (full_name, contact_info) VALUES (?,?)").run([
            model.full_name,
            model.contact_info,
        ]);
        return info.lastInsertRowid;
    },
    /**
     * Удаляет запись в таблице типы_документа по id
     */
    delete(id) {
        DB.prepare("DELETE FROM contact_persons WHERE id=?").run([id]);
    },
};
