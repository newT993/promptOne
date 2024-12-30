import Prompt from "@model/prompt"
import { connectDB } from "@utils/connectDB"

export const GET = async (req) =>{
    try {
        await connectDB()
        const prompt = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompt),{status: 201})
    } catch (error) {
        return new Response("Fail to fetch prompt",{status:500})
    }
}