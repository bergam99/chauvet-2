import { MongoClient, Db } from "mongodb";

const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER_NAME}.vxm2yn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(DATABASE_URL);
let db: Db | null = null;

export const connectDB = async (): Promise<Db> => {
  if (!db) {
    await client.connect();
    db = client.db("Chauvet");
  }
  return db;
};
