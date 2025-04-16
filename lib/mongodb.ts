import { MongoClient } from 'mongodb';

let connectToDatabase: () => Promise<{ client: MongoClient | null; db: any }>;

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI is not defined. Using mock data.');
  // Return a mock database connection
  connectToDatabase = async () => ({
    client: null,
    db: {
      collection: () => ({
        find: () => ({
          sort: () => ({
            toArray: () => []
          })
        }),
        listCollections: () => ({
          toArray: () => []
        })
      }),
      listCollections: () => ({
        toArray: () => []
      })
    }
  });
} else {
  const uri = process.env.MONGODB_URI;
  const options = {};

  let client;
  let clientPromise: Promise<MongoClient>;

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  connectToDatabase = async () => {
    const client = await clientPromise;
    const db = client.db('Tetrisnews');
    return { client, db };
  };
}

export { connectToDatabase }; 