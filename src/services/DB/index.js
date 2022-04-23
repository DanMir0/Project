import Database from "better-sqlite3";

let DB = new Database("./db/WarehouseAccountingDB.db", {verbose: console.log});

export default DB
