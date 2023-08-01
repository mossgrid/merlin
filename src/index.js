import path, { dirname } from 'node:path'
import { fileURLToPath } from 'url'
import fs from 'node:fs'
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js'
import { ENV } from './config/ENV.js'

export function awakenMerlin() {}

const merlin = new Client({ intents: [GatewayIntentBits.Guilds] })

merlin.once(Events.ClientReady, (_c) => {
    console.log(`Merlin is brewing`)
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

merlin.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const { command } = await import(`file://${filePath}`)
    if ('data' in command && 'execute' in command) {
        merlin.commands.set(command.data.name, command)
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

merlin.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
    }
    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
    }
})

merlin.login(ENV.TOKEN)
