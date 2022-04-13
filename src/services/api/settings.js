import DB from "@/services/DB";
import array_to_object from "@/common/array_to_object";

export default {
    load() {
        let loading = DB.prepare("SELECT * FROM settings").all();
        return array_to_object(loading)
    },
    update(setting) {
        let updated = DB.prepare("SELECT * FROM settings t WHERE t.id=?").get(setting);
        return  Object.entries(updated)
    },
};
