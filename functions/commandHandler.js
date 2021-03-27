const fs = require('fs');

module.exports = async (commands) => {
  const files = await fs
    .readdirSync('./commands/')
    .filter((file) => file.endsWith('.js'));

  for (const file of files) {
    const command = require(`../commands/${file}`);
    commands.set(command.name, command);

    console.log(`✅ ${command.name} loaded!`);
  }
};
