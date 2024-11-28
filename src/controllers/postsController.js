import { atualizarPost, criarPost, getTodosPosts } from '../models/postModel.js'
import { gerarDescricaoComGemini } from '../services/geminiServices.js'
import fs from 'fs'

export async function listarPosts(req, res) {
	const posts = await getTodosPosts();
	res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
	const novoPost = req.body;
	try {
		const postCriado = await criarPost(novoPost);
		res.status(200).json(postCriado);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ 'Err': 'Server error' });
	}
}

export async function uploadImage(req, res) {
	const novoPost = {
		imgUrl: req.file.originalname,
		descricao: '',
		alt: ''
	}

	try {
		const postCriado = await criarPost(novoPost);
		const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
		fs.renameSync(req.file.path, imagemAtualizada);
		res.status(200).json(postCriado);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ 'Err': 'Server error' });
	}
}

export async function atualizarNovoPost(req, res) {
	const id = req.params.id;
	const urlImage = `http://localhost:3000/${id}.png`
	try {
		const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
		const descricao = await gerarDescricaoComGemini(imgBuffer)

		const post = {
			imgUrl: urlImage,
			descricao: descricao,
			alt: req.body.alt
		}

		const postCriado = await atualizarPost(id, post);
		res.status(200).json(postCriado);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ 'Err': 'Server error' });
	}
}