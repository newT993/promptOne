import Prompt from "@model/prompt"
import { connectDB } from "@utils/connectDB"

export const GET = async(req, {params}) =>{
    try {
        await connectDB()
        const { id } = await params
        const prompt = await Prompt.find({creator:id}).populate('creator')
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response('Fail to fetch prompt', {status: 500})
    }
}