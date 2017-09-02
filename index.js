const Command = require('command'),
	  Notifier = require('tera-notifier'),
	  config = require('./config')
	  
//Defaults
let enabled=true,				//Default enabling of module.
	soundId='Notification.IM'	//Use true for default windows notification sound. Or use false for silence. For more, read: http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx

	
	
module.exports = function afknotify(dispatch) {
	const command = Command(dispatch),
		  notifier = new Notifier(dispatch)
		  
	let cid
	
	/////Command
	command.add('afk', () => {
		enabled=!enabled
		command.message( enabled ? '(AFK Notify) Enabled' : '(AFK Notify) Disabled')
	})
	
	/////Dispatches
	dispatch.hook('S_LOGIN', 2, event => {
		cid = event.cid
	})
	
	
	//Instance Match (ims)
	dispatch.hook('S_FIN_INTER_PARTY_MATCH', 'raw', () => { 
		parseconfig({ 
		
			configname: 'ims',
			message:'[Instance Match] Ready'
		})
	})
	
	//Whispers (whisper)
	dispatch.hook('S_WHISPER', 1, event => { 
		parseconfig({
			
			configname:'whisper',
			message:'[Whisper] '+event.author+'\n'+event.message
		})
	})
	
	//Trade and Duel (trade,duel)
	dispatch.hook('S_REQUEST_CONTRACT', 1, event => {
		switch(event.type) {
			case 3: //trade
				parseconfig({
					
					configname:'trade',
					message:'[Request Trade]\n'+event.senderName+' wants to trade'
				})
				break
				
			case 4: //party
				parseconfig({
					
					configname:'party',
					message:'[Request Party]\n'+event.senderName+' wants to party'
				})	
				break
				
			case 11: //Duel
				parseconfig({
					
					configname:'duel',
					message:'[Request Duel]\n'+event.senderName+' wants to duel'
				})
				break
		}
	})
	
	//Party Request (party) Not sure about this yet
	dispatch.hook('S_OTHER_USER_APPLY_PARTY', 1, event => {
		parseconfig({
			
			configname:'lfgrequest',
			message:'[LFG Request]\n'+event.name+' wants to join'
		})
	})

	//Combat status changed (incombat)
	dispatch.hook('S_USER_STATUS', 1, event => {
		if(event.target.equals(cid) && event.status === 1) parseconfig({
	
			configname:'incombat',
			message:'[Combat]\nYou are in combat'
		})
	})
	
	//Test (test)
	/*dispatch.hook('C_CHAT', 1, event => {
		parseconfig({
			configname:'test',
			message:'[Message]\n'+event.message
		})
	})*/
	
	
	/////Functions
	function parseconfig(set) {
		if(config[set.configname].enable && enabled) {
			
			config[set.configname].afknotify ? notificationafk(set.message,config[set.configname].timeout): notification(set.message)
		}
	}
	
	function notification(msg) {
		notifier.notify({
			title: 'AFK Notification',
			message: msg,
			wait:false, 
			sound:soundId, 
		})
	}
		
	function notificationafk(msg,timeout) { //timeout in milsec
		notifier.notifyafk({
			title: 'AFK Notification',
			message: msg,
			wait:false, 
			sound:soundId, 
		},timeout)
	}
}
