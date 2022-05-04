import DB from "@/services/DB";

export default {
    /**
     * Возвращает список документов
     *
     * @return {[]}
     */
    list() {
        return DB.prepare("SELECT c.*, cp.full_name contact_persons_name FROM counterparties c join contact_persons cp on c.contact_persons_id=cp.id").all();
    }, /**
     * Показываем запись в таблице контрагенты  по id
     *
     * @param {integer} id
     * @return {{id:integer, name:text, contact_info:text, address:text, inn:integer, created_at:date, updated_at:date}}
     */
    show(id) {
        return DB.prepare("SELECT * FROM counterparties t WHERE t.id=?").get(id);
    }, /**
     * Обновляем запись в таблице контрагенты
     *
     * @param {text} name
     * @param {text} contact_info
     * @param {text} address
     * @param {integer} inn
     * @param {integer} contact_persons_id
     * @param {date} updated_at
     * @param model
     *
     * @return {*}
     */
    update(model) {
        DB.prepare("UPDATE counterparties SET name=?, contact_info=?, address=?, inn=?, contact_persons_id=?, updated_at=date('now') WHERE id=?")
            .run([model.name, model.contact_info, model.address, model.inn, model.contact_persons_id, model.id,]);
    }, /**
     * Создает добавление в таблицу контрагенты
     *
     * @param {text} name
     * @param {text} contact_info
     * @param {text} address
     * @param {integer} inn
     * @param {integer} contact_persons_id
     * @param model
     * @return {lastInsertRowid}   Возвращает идентификатор строки последней вставки (INSERT) в базу данных.
     */
    create(model) {
        let info = DB.prepare("INSERT INTO counterparties(name,contact_info,address,inn,contact_persons_id) VALUES (?, ?, ?, ?, ?)").run([model.name, model.contact_info, model.address, model.inn, model.contact_persons_id]);
        return info.lastInsertRowid;
    }, /**
     * Удаляет запись в таблице контрагенты по id
     */
    delete(id) {
        DB.prepare("DELETE FROM counterparties WHERE id=?").run([id]);
    },
};
