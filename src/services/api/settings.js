import DB from "@/services/DB";
import array_to_object from "@/common/array_to_object";

export default {
    load() {
        let loading = DB.prepare("SELECT * FROM settings").all();
        return array_to_object(loading)
    },
    save(settings) {
        Object.entries(settings).forEach(item => {
            DB.prepare("UPDATE settings SET value =? WHERE key=?"
            ).run([item[1], item[0]])
        })

        console.log(settings)
    },
};
