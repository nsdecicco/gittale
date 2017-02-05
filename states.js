
//
// State machine states
// 
// - "idle"
// - "menu"
// - "react"
// - "dialog"
//   
// - "fight"
//   
// - "restart"
// states have
// - name
// - type
// - handler
//
// mus_f_newlaugh
// mus_intronoise - for credits
// mus_menu0

/*

nsd@host$
$ git init .
Initialized empty Git repository in C:/Users/nsd/tmp/.git/


*/

/* Handlers can return
 * - { "goto":"death" }
 * - { "goto":"battleWhatever" }
 * - { "end":NULL } Game ends (player died)
 */

/**
 * @param playerDamageReceived
 * @param playerHP Player hitpoints after
 * @param 
 * @param 
 */
function DefaultFightHandler(playerDamageReceived, playerHP,
                             enemyDamageReceived, enemyHP)
{
    if (playerHP <= 0) {
        return "playerDies";
    } else if (enemyHP) {
		return "enemyDies";
	}
}

function DefaultMenuHandler()
{
    
}

function DefaultStartHandler()
{
    
}

/* Dialogue



*/

var states = {
    "start": {
        "type":"start",
		"music":null,
		"expression":"neutral",
		"nextStates":{"default":"intro10"}
    },
    "intro10": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"expression":"neutral",
        "text":"Hi there! I'm the Octocat. I am a hyper-dimensional being " +
		       "that exists only in the cloud. I will be your guide today " +
		       "through cyber-revision-control space.",
		"nextStates":{"complete":"intro30"}
	},
	"intro30": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"expression":"neutral",
        "text":"Today I'm going to show you how to use Git, a collaborative " +
		       "tool for managing code repositories.",
		"nextStates":{"complete":"intro40"}
	},
	"intro40": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"expression":"neutral",
        "text":"First things first, if you want to check out a repository, " +
		       "you just need to run `git clone`.",
		"nextStates":{"complete":"intro41"}
	},
	"intro41": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"expression":"neutral",
        "text":"Why don't you try it?",
		"nextStates":{"complete":"intro50"}
	},
	"intro50": {
		"type":"idle",
		"music":"mus_flowey.ogg",
		"expression":"neutral",
		"fight": [],
		"actions": [
			{"label": "git clone https://github.com/nsdecicco/gittale.git", "nextState": "intro60"},
		],
		"items": [] // Nothing for this state.
	},
	"intro60": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"expression":"neutral",
        "text":"Wasn't that easy?",
		"nextStates":{"complete":"intro70"}
	},
	"intro70": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"expression":"neutral",
		"text":"Git allows you to create as many branches as you like!",
		"nextStates":{"complete":"intro71"}
	},
	"intro71": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"expression":"neutral",
		"text":"Isn't that cool??",
		"nextStates":{"complete":"intro80"}
	},
	"intro80": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"expression":"neutral",
        "text":"OK, now let's try something a little harder. We're going to " +
		       "try to merge two branches.",
		"nextStates":{"complete":"intro90"}
	},
	"intro90": {
		"type":"dialog",
		"music":null,
		"expression":"neutral",
		"text":"Type 'git merge great-features-wow' to merge the other branch.",
		"nextStates":{"complete":"intro91"}
    },
	"intro91": {
		"type":"idle",
		"music":null,
		"expression":"neutral",
		"actions": [
			{"label": "git merge great-features-wow", "nextState": "intro90"},
		],
	},
	"intro92": {
		"type":"dialog",
		"music":"mus_f_newlaugh.ogg",
		"expression":"evil",
		"text":"You thought that would be easy, didn't you?",
		"nextStates":{"complete":"intro100"}
    },
    "intro100": {
        "type":"fight",
		"music":"mus_bad.ogg",
		"expression":"evil",
        "nextStates":{"playerDies":"defeat"}
    },
    "intro110": {
        "type":"idle",
		"music":"mus_boss1.ogg", /* asriel fight? */
		"expression":"evil",
		"fight":[
		],
		"actions": [
			{"label": "git merge"}
		],
		"items": [
			{
				"label": "google",
				"action": function() {
					return { "effect": null,
					         "text": "Your keystrokes echoed far and wide, " +
					                 "but nobody answered."
					};
				}
			}, {
				"label": "bing",
				"action": function() {
					return Math.rand() > 0.5 ?
						{ "effect": null,"text":"But it's not google?" } :
						{ "effect": null,"text":"You tried, but it had no effect."};
				}
			}
		]
    },
    "victory": {
        "type":"end",
        "handler":function() {
            
        }
    },
    "defeat": {
        "type":"end",
		"music":"mus_gameover.ogg",
        "handler":function() {
            
        }
    },
	"intro140": {
		"name":"",
		"":"",
	}
};

