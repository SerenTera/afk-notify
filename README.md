# afk-notify
A tera-proxy module that uses tera-notifier to push windows notification when various ingame event happens (eg: ims party found, someone metioned you in chat while you afk, etc..)

Requires: 
- Commands module by Pinkie-Pie
- tera-notifier: https://github.com/SerenTera/tera-notifier

## Commands 
- `afk`: toggles the enable/disable of this module

## config
In config.js you can change various notifiers, such as ims, party,whisper etc etc. Refer to the comments in config.js to set your own.
There are 3 properties/options per notifier

- enable: this sets whether to enable/disable this notifier. True to enable
- afknotify: this sets whether to notify only if you are detected to be afk. True to enable only afk notification. False will notify everytime the event is proc-ed
- timeout: this is the time in milsec to detect if you are afk or not.
