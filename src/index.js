import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export default async function AI(prompt) {
    try {
        const chatCompletion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt
        })
        console.log(chatCompletion.data.choices[0].message)
    } catch (error) {
        if (error.response) {
            console.log(error.response.data)
        } else {
            console.log(error.message)
        }
    }
}

await AI('How are you today')
