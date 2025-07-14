// dropIndex.js
import { MongoClient } from "mongodb";

// Remplace par ton URI MongoDB (attention à ne pas le versionner)
const uri =
  "mongodb+srv://mongo:QYQsxLcFbRhYUV2S@security.tpbsgrt.mongodb.net/todo";

const client = new MongoClient(uri);

async function dropPseudoIndex() {
  try {
    await client.connect();
    const db = client.db("todo");
    const collection = db.collection("users");

    const indexes = await collection.indexes();
    const pseudoIndex = indexes.find((i) => i.name === "email_1");

    if (pseudoIndex) {
      await collection.dropIndex("email_1");
    } else {
    }
  } catch (err) {
    console.error("Erreur :", err);
  } finally {
    await client.close();
  }
}

dropPseudoIndex();
