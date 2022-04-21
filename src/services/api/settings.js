import DB from "@/services/DB";
import array_to_object from "@/common/array_to_object";

export default {
    /**
     * Получаем массив данных из БД и возвращаем массив объектов
     * @param {text} key
     * @param {text} value
     * @return array_to_object
     */
    load() {
        let loading = DB.prepare("SELECT * FROM settings").all();
        return array_to_object(loading)
    },
    /**
     * Получем объект массив
     * @param {text} key
     * @param {text} value
     * @return array_to_object
     */
    save(settings) {
        Object.entries(settings).forEach(item => {
            DB.prepare("UPDATE settings SET value =? WHERE key=?"
            ).run(['' + item[1], item[0]])
        })
    },
    /**
     * Получем имя контрагента, которому присвоен CUSTOMER_ID
     *
     * @param {text} counterparty_name
     * @param {text} key
     * @param {text} value
     * @return
     */
    getOrganization() {
        return DB.prepare("SELECT  c.* FROM settings s join counterparties c on s.value = c.id WHERE s.key='CUSTOMER_ID'").all()[0];
    },
    };
