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
      console.log("Index 'email_1' trouvé. Suppression...");
      await collection.dropIndex("email_1");
      console.log("✅ Index supprimé.");
    } else {
      console.log("ℹ️ Aucun index 'email_1' trouvé.");
    }
  } catch (err) {
    console.error("Erreur :", err);
  } finally {
    await client.close();
  }
}

dropPseudoIndex();
