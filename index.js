const Discord = require("discord.js");
const Client = new Discord.Client();
const data = require("./data.json");

let ownerOnly = false;

Client.on("message", (msg) => {
	if (msg.author.id=="172002275412279296") { // Tatsumaki
		if(/\*\*(.*?)\*\*,[^\d]+(\d+)[^\d]+(\d+)[^\d]+(\d+)/g.test(msg.content)) { // Magic regex that tells if message is inventory output (thanks @Tenrys)
			let lines = msg.content.split("\n");

			for(let i=0; i<lines.length; i++) {
				lines[i]=lines[i].split("|");
			}

			if((ownerOnly&&new RegExp(Client.users.get(data.ownerId).username).test(lines[0][1]))||!ownerOnly) {
				// Input
				let common = parseInt(lines[1][1]);
				let uncommon = parseInt(lines[2][1]);
				let garbage = parseInt(lines[3][1]);

				// Output
				let sum = common+uncommon+garbage;

				let common_price = common*12;
				let uncommon_price = uncommon*20;
				let garbage_price = garbage*6;
				let sum_price = common_price+uncommon_price+garbage_price;
				let spent = sum*10;
				let diff = sum_price-spent;

				let out = `__**Fish inventory**__\n🎣 | **${sum}x** fish in total (*¥${sum_price}*):\n🐟 | **${common}x** *(¥${common_price})*\n🐠 | **${uncommon}x** *(¥${uncommon_price})*\n🗑 | **${garbage}x** *(¥${garbage_price})*\n---------------------\n💸 | *¥${sum*10} spent, ${diff>=0?"made":"lost"} ¥${diff<0?-diff:diff}*\n`;

				Client.channels.get(data.channelId).send(out);
			}
		}
	}
});

Client.on("ready", () => console.log(`${Client.user.tag} ready.`));

Client.login(data.token).catch(err => console.error("Error on login: ", err));