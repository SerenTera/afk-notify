# afk-notify
A tera-proxy module that uses tera-notifier to push windows notification when various ingame event happens (eg: ims party found, someone metioned you in chat while you afk, etc..)

## Updates
- New configuration file is in config.json!
- To change config, use: 'false' to disable notif, 'notify' to always enable and 'afk' to only notify when you are afk.

Requires: 
- Commands module by Pinkie-Pie
- tera-notifier: https://github.com/SerenTera/tera-notifier

See the readme in https://github.com/SerenTera/tera-notifier if you need an example of a notification.

## Commands 
- `afk`: toggles the enable/disable of this module
- `afk test`: Tests the notification
	
## Config
Config is in `config.json`. Main configuration are as follows:
- `enable` : Enables or disable the module. Put true or false.
- `soundId`: The sound file to use. For a list, Refer to [this link](https://docs.microsoft.com/en-us/previous-versions/windows/apps/hh761492(v=win.10))
- `log` : Enable this to display logs of previous notification sent to windows in command prompt. Put true or false.
- `chatTerm` : Put a string in here to look out for in your chats.

In config.js you can also enable and change various notifiers, such as ims, party, whisper, etc. Refer to `notifiers type` below!

In each of the main config, the options are (remember to use strings for `notify `and `afk`):
- `false`: This will disable that notifier
- `"notify"`: This will enable and always notify for that notifier
- `"afk"`: This will enable and ONLY notify when user is detected to be afk from TERA

## Notifier Types
The following are the types of notifiers available for the default of this module.
- `ims`: IMS Ready notification. Notify if you have been matched to an instance via ims.
- `bgmatched`: Bgs Ready notification. Notify if battleground matching system matched you.
- `whisper`: Notify when someone whispers you.
- `incombat`: Notify when you are suddenly in combat (Useful for pvp server?).
- `trade`: Notify when someone trades you.
- `duel`: Notify when someone ask for a duel.
- `party`: Notify when someone parties you.
- `friendsummon`: Notify when a friend tries to summon you.
- `deathmatch`: Notify when someone ask for a deathmatch.
- `lfgrequest`: Notify when someone wants to join your lfg party. Unsure for now. Maybe whisper packet is used instead.
- `chatcheckterm`: Notify when someone mentioned the word assigned to 'chatTerm' in config. Only set to notify if you add such a word.
- `chatcheckname`: Notify when someone mentioned your ign in chat. Set to false if you use dictionary name (ie. commonly used words).

## Creating additional notification
To create more notification, generally:

1. In index.js, you add your hook and then use parseconfig({configname:'confignamehere', message:'message here'}) to initiate the notification function. 
```
dispatch.hook(packet,'raw' or version,event => {      //Regular hookin stuffs, use raw if you dont need to filter events out
    (function and ifs and what nots here if needed) { //This part is as how you would filter out the conditions to warn you
        .......                                       //For example, to hook event.type and only notify if its 4 or smth
        
        parseconfig({                                //This part is the one that triggers notification. parseconfig is an object with 2 needed property, configname and message.
			configname: 'confignamehere',               //This name corresponds to the name in config.js
		    	message:'[name] event type is '+event.type  //This message is the one dispalyed in notification. you can use event.xxxxx here easily
		    })
         
      }  //Remember to close your brackets! :)
  })    
```
2. In config.json, add your config name object with one of the 3 properties
```
"confignamehere": "notify" 
```
