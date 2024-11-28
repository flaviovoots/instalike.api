import 'dotenv/config'
import { ObjectId } from "mongodb";
import connectDb from "../config/dbConfig.js";

const connection = await connectDb(process.env.CONNECTION_STRING);

export async function getTodosPosts() {
	const db = connection.db("instalike")
	const colecao = db.collection("posts")
	return colecao.find().toArray()
}

export async function criarPost(novoPost) {
	const db = connection.db("instalike")
	const colecao = db.collection("posts")
	return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
	const db = connection.db("instalike")
	const colecao = db.collection("posts")
	const objID = ObjectId.createFromHexString(id)
	return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost })
}
