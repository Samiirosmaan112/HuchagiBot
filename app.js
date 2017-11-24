const { Client } = require('discord.js');
const bot = new Client();
const cfg = require('./config.json');

bot.on('ready', () => {
 //console.log(bot.guilds)
  console.log(`Logged in as ${bot.user.tag} (${bot.user.id}) on ${bot.guilds.size} servers!`);
  bot.user.setGame(`${cfg.prefix}help | ${bot.guilds.size} servers`);
});

bot
  .on('guildCreate', console.log) 
  .on('guildDelete', console.log);


bot.on('message', msg => {
   if (msg.author.bot  || !msg.content.startsWith(cfg.prefix)) return;
   const args = msg.content.slice(cfg.prefix.length).split(/ +/);
   const command= args.shift().toLowerCase();
   if (command === 'ping') {  
       const then = Date.now();
     msg.channel.send('pinging...').then(m => {
       m.edit(`Pinged! it took ${Date.now() - then}ms to send that message!\nDiscord Heartbeat: ${bot.ping}`);
    });
  }
  if (command === 'ban') {
      if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.reply('You are not an admin!');
    const member = msg.mentions.members.first();
    if (!member) return msg.reply('Invaled usage, please do `>>>ban @User#1234`');
    member.ban({
      reason: 'Banned By Admin'
    });
  }
  if (command === 'kick') {
      if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.reply('You are not an admin!');
    const member = msg.mentions.members.first();
    if (!member) return msg.reply('Invaled usage, please do `>>>ban @User#1234`');
    member.kick({
      reason: 'Kicked By Admin'
    });
  }
});    

client.login(process.env.BOT_TOKEN);
