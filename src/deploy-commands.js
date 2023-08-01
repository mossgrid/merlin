import { REST, Routes } from 'discord.js'
import { ENV } from './config/ENV.js'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'url'
import fs from 'node:fs'

const commands = []

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const { command } = await import(`file://${filePath}`)
    console.log(command.fix)
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON())
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

const rest = new REST().setToken(ENV.TOKEN)

//deploy commandis
;(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`)
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(Routes.applicationGuildCommands(ENV.CLIENT_ID, ENV.GUILD_ID), { body: commands })
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (error) {
        console.error(error)
    }
})()
