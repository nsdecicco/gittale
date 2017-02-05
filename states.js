
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

var states = [
    {
        "name":"begin",
        "type":"start",
        "handler":function() {
            
        }
    },
    {
        "text":"Hi there! I'm the Octocat. I am a hyper-dimensional being that exists only in the cloud."

        "text":"Today I'm going to show you how to use Git, a collaborative tool for managing code repositories."
        
        "First things first, if you want to "
        
        "Now, try cloning the repository."
        
        "Wasn't that easy?"
        
        [
        "Git allows you to create as many branches as you like!"
        30,
        "Isn't that cool??"
        ]
        
        "OK, now let's try something a little harder. We're going to try to merge two branches."
    }
    {
        "name":"",
        "type":"fight",
        "handler":function() {
            
        }
    },
    {
        "name":"",
        "type":"",
        "handler":function() {
        }
    },
    {
        "name":"victory",
        "type":"end",
        "handler":function() {
            
        }
    },
    {
        "name":"defeat",
        "type":"end",
        "handler":function() {
            
        }
    }
];

function AdvanceState()
{
    
}
