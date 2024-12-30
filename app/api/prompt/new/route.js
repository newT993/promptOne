import Prompt from "@model/prompt"
import { connectDB } from "@utils/connectDB"

export const POST = async(req) =>{
    const { id, prompt, tag} = await req.json()
    try {
        await connectDB() // lambda function (mean it is going to die when it done its job)
        const newPrompt = await Prompt({
            creator: id,
            prompt,
            tag
        })
        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt),{status: 201})
    } catch (error) {
        return new Response("Fail to create prompt", {status: 500})
    }
}