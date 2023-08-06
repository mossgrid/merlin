import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export const command = {
  fix: 'define from wikipedia',
  data: new SlashCommandBuilder()
    .setName('wiki')
    .setDescription('Look up a terms discription on wickipedia.')
    .addStringOption((option) =>
      option.setName('term').setDescription('The word to look up on wikipedia.').setRequired(true)
    ),
  async execute(interaction) {
    
    try{
        const term = interaction.options.getString('term');
        const result = await wiki(term);
        await interaction.reply(result);
    }
    catch(error){
      console.log(error.message)
        await interaction.reply(`unable to get search result :(`);
    } 
  },
};

async function wiki(term){

  try{
    const result = await axios.get(` http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${term.replace(" ", "%20")}&exsentences=5`);
    const data = result.data;
    const pageid = Object.keys(data.query.pages)[0]
    const title = data.query.pages[pageid].title
    const extract = data.query.pages[pageid].extract
    const strippedString = extract.replace(/(<([^>]+)>)/gi, "")
    return`${title}: ${strippedString}`
 }

  catch(error){
    throw new Error('error on fetching result');
  }
}
