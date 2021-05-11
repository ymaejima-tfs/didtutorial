// Indexed DB definition
import Dexie from "dexie";

const DB = new Dexie("didtutorial");
DB.version(1).stores({
  dids: "++id, name, hasPrivKey"
});

export default DB;