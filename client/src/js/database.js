import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const addDB = await openDB("jate", 1);
  const specify = addDB.transaction("jate", "readwrite");
  const obStore = specify.objectStore("jate");
  const requestPut = obStore.put({ id: 1, value: content });
  const result = await requestPut;
  console.log("Content saved to the database!", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const retrieveDB = await openDB("jate", 1);
  const specify = retrieveDB.transaction("jate", "readonly");
  const obStore = specify.objectStore("jate");
  const requestGet = obStore.getAll();
  const result = await requestGet;
  console.log("Your content has been read from the database!", result);
  return result.value;
};

initdb();
