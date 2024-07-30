import { MongoClient, Db } from 'mongodb';

if (!process.env.DATABASE_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

const uri: string = process.env.DATABASE_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
    const client = await clientPromise;
    return client.db('Syncskills_payload');
}