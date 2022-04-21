import DB from "@/services/DB";

export default {
    /**
     * Инициализируем таблицу типы_документа
     *
     * @returns {[]}
     */
    list() {
        return DB.prepare("SELECT * FROM document_types").all();
    },
    /**
     * Показываем запись в таблице типы_документа по id
     *
     * @param {integer} id
     * @return {{id:integer, name:text}}
     */
    show(id) {
        return DB.prepare("SELECT * FROM document_types t WHERE t.id=?").get(id);
    },
    /**
     * Обновляем запись в таблице типы_документа
     *
     * @param {integer} id
     * @param {text} name
     * @param model
     *
     * @return {*}
     */
    update(model) {
        DB.prepare("UPDATE document_types SET name=? WHERE id=?").run([
            model.name,
            model.id,
        ]);
    },
    /**
     * Создает добавление в таблицу типы_документа
     *
     * @param {text} name
     * @param {text} contact_info
     * @param {text} address
     * @param {integer} inn
     * @param model
     * @return {lastInsertRowid}   Возвращает идентификатор строки последней вставки (INSERT) в базу данных.
     */
    create(model) {
        let info = DB.prepare("INSERT INTO document_types(name) VALUES (?)").run([
            model.name,
        ]);
        return info.lastInsertRowid;
    },
    /**
     * Удаляет запись в таблице типы_документа по id
     */
    delete(id) {
        DB.prepare("DELETE FROM document_types WHERE id=?").run([id]);
    },
};
