# afk-notify
A tera-proxy module that uses tera-notifier to push windows notification when various ingame event happens (eg: ims party found, someone metioned you in chat while you afk, etc..)

Requires: 
- Commands module by Pinkie-Pie
- tera-notifier: https://github.com/SerenTera/tera-notifier

See the readme in https://github.com/SerenTera/tera-notifier if you need an example of a notification.

## Commands 
- `afk`: toggles the enable/disable of this module

## index.js
In index.js, `const chat_term=` can be found at the top. This option allows you to scan for this word in chat and notify you if it appears while you are afk. Set `chatcheckterm` in config.js to be enabled if you use this. 
	
## config
In config.js you can change various notifiers, such as ims, party,whisper etc etc. Refer to the comments in config.js to set your own.

There are 3 properties/options per notifier:
- enable: this sets whether to enable/disable this notifier. True to enable
- afknotify: this sets whether to notify only if you are detected to be afk. True to enable only afk notification. False will notify everytime the event is proc-ed
- timeout: this is the time in milsec to detect if you are afk or not. If the amount of timeout passes and the user has not done any of the detected stuff (chatting,moving,using skills,using broker etc..),  then notification will start to be pushed if the described ingame events happens.

## Example
One of the notifier in config.js is:
```
ims:{ //IMS Ready notification: Notify if you have been matched to an instance via ims. 
		enable:true,
		afknotify:false, //You can set afknotify to false to notify you everytime if you always afk while imsing like me :D
		timeout:15000
	},
```
As seen from above, when instance matched is completed and you are matched to a dungeon, this notifier will push a windows notification irregardless of whether you are afk or not. To push only if you are afk, put afknotify to true and the mod will only notify if you are afk for more than 15000ms or 15sec.

Another example is 
```
incombat:{ //Notify when you are suddenly in combat
		enable:false,  //set this to true to enable
		afknotify:true,
		timeout:120000
	},
```
When you are afk for more than 120000ms (2minutes), then this module will notify you if you got attacked and becomes incombat. This is disabled by default, so enable on your own if u wish in config.js by setting incombat>enable to true.

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
2. In config.js, add your config name object with the 3 properties
```
confignamehere:{ //Description if needed
		enable:true,         //enable or disable
		afknotify:true,     //true to use afknotify, false to use notify (notifies without checking afk status)
		timeout:60000       //afk timeout duration. Not doing most ingame stuff for 60000ms in this example will start notifying user of event if it happens.
	},
```
## TOdo
- debugs if needed
- add more function?

## Additional notes
This module as well as tera-notifier is very new and thus I do not know of the impact on the performance of tera if you use this. As far as I know, there should not be major impacts to the performance. If so, please cease use of both this module and tera-notifier
