import { MongoClient } from 'mongodb';
export default async function connectDb(stringConnection) {
	let mongoClient;

	try {
		mongoClient = new MongoClient(stringConnection);
		console.log("Connected to the database cluster...");
		await mongoClient.connect();
		console.log("Connected to MongoDB Atlas successfully!");
		return mongoClient;
	} catch (err) {
		console.error('Database connection failed!', err);
		process.exit();
	}
}
