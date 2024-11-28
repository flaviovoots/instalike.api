import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function gerarDescricaoComGemini(imageBuffer) {
	const prompt =
		"Generate a short description for the following image: ";
	try {
		const image = {
			inlineData: {
				data: imageBuffer.toString("base64"),
				mimeType: "image/png",
			},
		};
		const res = await model.generateContent([prompt, image]);
		return res.response.text() || "Alt-text não disponível.";
	} catch (erro) {
		console.error("Error getting alt-text:", erro.message, erro);
		throw new Error("Error getting alt-text from Gemini.");
	}
}