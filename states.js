
//
// State machine states
// 
// - "menu"
// - "react"
// - "playerDialog"
//   
// - "fight"
//   
// - "restart"
// states have
// - name
// - type
// - handler

/*

nsd@nsd-PC MINGW64 ~/tmp
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
        "handler":function() {
            
        }
    },
    "intro10": {
		"type":"dialog",
        "text":"Hi there! I'm the Octocat. I am a hyper-dimensional being " +
		       "that exists only in the cloud."
	},
	"intro20": {
		"type":"dialog",
		"text":""
	},
	"intro30": {
		"type":"dialog",
        "text":"Today I'm going to show you how to use Git, a collaborative " +
		       "tool for managing code repositories."
	},
	"intro40": {
		"type":"dialog",
        "text":"First things first, if you want to ",
	},
	"intro50": {
		"type":"dialog",
        "text":"Now, try cloning the repository."
	},
	"intro60": {
		"type":"dialog",
        "text":"Wasn't that easy?"
	},
	"intro70": {
		"type":"dialog",
		"text":"Git allows you to create as many branches as you like!"
	},
	"intro71": {
		"type":"dialog",
		"text":"Isn't that cool??"
	},
	"intro80": {
		"type":"dialog",
        "text":"OK, now let's try something a little harder. We're going to " +
		       "try to merge two branches."
	},
	"intro90": {
		"type":"dialog",
		"text":"Type 'git merge foobar' to merge the other branch."
    },
    "intro100": {
        "type":"fight",
        "handler":function() {
            
        }
    },
    "intro110": {
        "type":"",
        "handler":function() {
        }
    },
    "victory": {
        "type":"end",
        "handler":function() {
            
        }
    },
    "defeat": {
        "type":"end",
        "handler":function() {
            
        }
    },
	"intro140": {
		"name":"",
		"":"",
	}
};

