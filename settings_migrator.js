"use strict"
/*
Settings key:
notify = regular notification
afknotify = notify only if TERA is not foreground (eg: minimized)
false = disable notification
*/

let DefaultSettings = {
	enabled: true,
	soundId: 'Notification.IM',
	log: true,
	chatTerm: '',
	'For settings below': " notify = regular notification, afk = notify only if AFK from TERA, false = disable notification ",
	ims: 'notify',
	bgmatched: 'notify',
	whisper: 'afk',
	incombat: 'afk',
	trade: 'afk',
	duel: 'afk',
	party: 'afk',
	friendsummon: 'afk',
	deathmatch: 'afk',
	lfgrequest: 'afk',
	chatcheckterm: false,
	chatcheckname: false
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {	

	//Migrate from config.js
	try {
		const config = require('./config')
		if(config) {
			const fs = require('fs'),
				  path = require('path')
		
			for(let entry in config) {
				if(!DefaultSettings[entry]) continue;
			
				if(!config[entry].enable) DefaultSettings[entry] = false;
				else {
					if(config[entry].afknotify) DefaultSettings[entry] = 'afk';
					else DefaultSettings[entry] = 'notify';
				}
			}
			
			console.log('[AFK Notify] Current Configuration migrated to "config.json".')
			console.log('[AFK Notify] Restart Proxy to see changes in config.json. See Readme for info.')
			
			fs.unlinkSync(path.join(__dirname,'config.js'))
			console.log('[AFK Notify] Legacy Config File(config.js) deleted after settings migration.')
		}
	}
	catch(e) {}	
	
    if (from_ver === undefined) {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings);
    } else if (from_ver === null) {
        // No config file exists, use default settings
        return DefaultSettings;
    } else {
        // Migrate from older version (using the new system) to latest one
        throw new Error('So far there is only one settings version and this should never be reached!');
    }
}