'use strict'
const config = require('./config')
	  
//Defaults
let enabled=true,				//Default enabling of module.
	soundId='Notification.IM'	//Use true for default windows notification sound. Or use false for silence. For more, read: http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx
		
const chat_term=''	 			//Put your name(in lower case!) that people always use to call you so notification will be enabled when someone say it in chat 	
		
module.exports = function afknotify(mod) {
	const notifier = mod.require ? mod.require.notifier : require('tera-notifier')(mod)
		  
	let cid,
		playerName
	
	/////Command
	mod.command.add('afk', {
		$none() {
			enabled=!enabled
			mod.command.message( enabled ? '(AFK Notify) Enabled' : '(AFK Notify) Disabled')
		},
		$default() {
			mod.command.message('Error in command! afk or afk test only.')
		},
		test() {
			notification('This is a test alert')
			mod.command.message('Test message Sent')
		}
	})
	
	
	
	/////Dispatches

	mod.hook('S_LOGIN',10, event => {
		cid = event.gameId,
		playerName = event.name.toLowerCase()
	})
	
	
	//Instance Match (ims)
	mod.hook('S_FIN_INTER_PARTY_MATCH', 'raw', () => { 
		parseconfig({ 
		
			configname: 'ims',
			message:'[Instance Match] Ready'
		})
	})
	
	//Whispers (whisper)
	mod.hook('S_WHISPER', 2, event => { 
		if(event.authorName.toLowerCase()===playerName) return
		parseconfig({
			
			configname:'whisper',
			message:'[Whisper] '+event.authorName+'\n'+event.message
		})
	})
	
	//Trade and Duel (trade,duel)
	mod.hook('S_REQUEST_CONTRACT', 1, event => {
		if(event.senderName.toLowerCase()===playerName) return
		
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

            case 56: //Friend summon
                parseconfig({
                    configname: 'friendsummon',
                    message: '[Request Friend Summon]\n' + event.senderName + ' wants to summon you'
                })
                break
				
            case 18: //Deathmatch
                parseconfig({
                    configname: 'deathmatch',
                    message: '[Request Deathmatch]\n' + event.senderName + ' wants to deathmath'
                })
                break
		}
	})
	
	//Party Request (party) Not sure about this yet
	mod.hook('S_OTHER_USER_APPLY_PARTY', 1, event => {
		parseconfig({
			configname:'lfgrequest',
			message:'[LFG Request]\n'+event.name+' wants to join the party'
		})
	})
	
	//Party
	mod.hook('S_BEGIN_THROUGH_ARBITER_CONTRACT', 1, event => {
		 if(event.sender.toLowerCase() === playerName || event.type !== 4) return
		 else
			 parseconfig({
				configname: 'party',
				message: '[Request Party]\n' + event.sender + ' wants to party'
			})
	}) 
	
	
	
	//Combat status changed (incombat)
	mod.hook('S_USER_STATUS', 2, event => {
		if(event.gameId===cid && event.status === 1) parseconfig({
	
			configname:'incombat',
			message:'[Combat]\nYou are in combat'
		})
	})
	
	//Chat notification
	mod.hook('S_CHAT', 2, event => {
		if(event.authorName.toLowerCase()===playerName) return
		
		if(event.message.toLowerCase().includes(chat_term)) {
			parseconfig({
				configname:'chatcheckterm',
				message:'[Chat Mention] '+event.authorName+'\n'+event.message
			})
		}
		
		if(event.message.toLowerCase().includes(playerName)) {
			parseconfig({
				configname:'chatcheckname',
				message:'[Chat Mention] '+event.authorName+'\n'+event.message
			})
		}
	})
	
	/*//Teleport Request
	mod.hook('S_ASK_TELEPORT', 1, event => {
		parseconfig({
            configname: 'partysum',
            message: '[Request Party Summon]\n' + event.name + ' wants to summon you'
        })
	})*/
	
	
	//BG matching
	mod.hook('S_BATTLE_FIELD_ENTRANCE_INFO', 'raw', event => {
		parseconfig({
            configname: 'bgmatched',
            message: '[Battleground Match] Ready'
        })
	})		
	
	
	
	/////Functions
	function parseconfig(set) {
		if(!config[set.configname]) return;
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
