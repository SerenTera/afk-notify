//This file contains various configs for all the avaliable notifications
//enable = whether this notification is enabled or not (Use true or false to disable)
//afknotify = whether to use afknotification or to notify everytime event occurs. true to use notifyafk, false to use notify(will notify everytime event occurs)
//timeout = time out to use in afknotification in milliseconds.(use numbers only) (1sec=1000milsec)

//Note: messages that are displayed are in index.js, under the hooks, in order to not over complicate the module. and also im too noob lul
//In index.js, edit the messages on your own. use \n for line breaks.

module.exports = {
	
	ims:{ //IMS Ready notification: Notify if you have been matched to an instance via ims. 
		enable:true,
		afknotify:false, //You can set afknotify to false to notify you everytime if you always afk while imsing like me :D
		timeout:15000
	},
	
	whisper:{ //Notify whenever someone whispers you
		enable:true,
		afknotify:true,
		timeout:60000
	},
	
	incombat:{ //Notify when you are suddenly in combat (Useful for pvp server?)
		enable:false,
		afknotify:true,
		timeout:120000
	},
	
	trade:{ //notify when someone trades you
		enable:true,
		afknotify:true,
		timeout:60000
	},
	
	duel:{ //notify when someone ask for duels
		enable:true,
		afknotify:true,
		timeout:60000
	},
	
	party:{ //notify when someone parties you
		enable:true,
		afknotify:true,
		timeout:60000
	},
	
	lfgrequest:{ //notify when someone wants to join your lfg party. Unsure for now. Maybe whisper packet is used instead.
		enable:false,
		afknotify:true,
		timeout:30000
	},
	
	chatcheckterm:{ //notify when someone mentioned the word assigned to 'chat_term' in index.js. Only set to true if you add such a word.
		enable:false,
		afknotify:true,
		timeout:60000
	},
	
	chatcheckname:{ //notify when someone mentioned your ign in chat. Set to false if you use dictionary name(ie. commonly used words)
		enable:true,
		afknotify:true,
		timeout:60000
	},
	
	
	test:{ //debugging testing function. Don't touch
		enable:false,
		afknotify:true,
		timeout:10000
	}
	
}
