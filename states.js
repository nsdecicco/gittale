
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
		"music":null,
		"nextStates":{"default":"intro10"}
    },
    "intro10": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
        "text":"Hi there! I'm the Octocat. I am a hyper-dimensional being " +
		       "that exists only in the cloud. I will be your guide today " +
		       "through cyber-revision-control space.",
		"nextStates":{"complete":"intro30"}
	},
	"intro30": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
        "text":"Today I'm going to show you how to use Git, a collaborative " +
		       "tool for managing code repositories.",
		"nextStates":{"complete":"intro40"}
	},
	"intro40": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
        "text":"First things first, if you want to ",
		"nextStates":{"complete":"intro50"}
	},
	"intro50": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
        "text":"Now, try cloning the repository.",
		"nextStates":{"complete":"intro60"}
	},
	"intro60": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
        "text":"Wasn't that easy?",
		"nextStates":{"complete":"intro70"}
	},
	"intro70": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"text":"Git allows you to create as many branches as you like!",
		"nextStates":{"complete":"intro71"}
	},
	"intro71": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
		"text":"Isn't that cool??",
		"nextStates":{"complete":"intro80"}
	},
	"intro80": {
		"type":"dialog",
		"music":"mus_flowey.ogg",
        "text":"OK, now let's try something a little harder. We're going to " +
		       "try to merge two branches.",
		"nextStates":{"complete":"intro90"}
	},
	"intro90": {
		"type":"dialog",
		"music":null,
		"text":"Type 'git merge foobar' to merge the other branch.",
		"nextStates":{"complete":"intro100"}
    },
    "intro100": {
        "type":"fight",
        "nextStates":{"playerDies":"defeat"}
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

