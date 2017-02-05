
function GameController() {
    /*
     * UI elements
     */
    var msgBox;
    var actionArea;
    
    /*
     * Game state
     */
    var animHappening;
    var curState;

    curState = states["start"];
    
    var keydownTarget = null;
    var keyupTarget = null;
    var keypressTarget = null;
    
    this.registerListeners = function(target) {
        if (target.keydown) {
            keydownTarget = target.keydown;
        }
        if (target.keyup) {
            keyupTarget = target.keyup;
        }
        if (target.keypress) {
            keypressTarget = target.keypress;
        }
    };
    
    this.unregisterListeners = function() {
        keydownTarget = null;
        keyupTarget = null;
        keypressTarget = null;
    };
    
    this.menuEvent = function(event) {
        /* Look at current state and decide which state to proceed
         * to based on the event.
         */
        
    };
    
    this.bulletHellEvent = function() {
        /* */
    };

    /* Moves to the next state */
    this.advanceState = function(action) {
        /* Look up what the current state is */
        switch (type) {
            case "react":
                // Show a speech bubble
                actionArea.showSpeechBubble("test of speech bubble");
                window.setTimeout(function() {
                   actionArea.hideSpeechBubble();
                   /* Advance to the next state */
                });
                break;
            case "menu":
                // Present the user with several options
                break;
            case "fight":
                // Start fight sequence
                break;
            case "restart":
                // Player died, start over
                break;
            case "dialog":
                // Enemy is talking, but in the main dialog window
                break;
        }
    };

    /* Initialize GameController */
    // 1. Initialize game state
    curState = states["start"];
    
    // 2. Initialize view
    // Need to answer the question(s): what are the view states?
}

var gc; /* GameController instance */

window.onload = function() {
    gc = new GameController();
};

function MsgBox() {
    //show menu
    
    var curButton = 0;
    var curMenu = 0; //0:"topLevelMenu", 1:"fight", 2:"act", 3:"git", 4:"mercy"
    this.onkeydown=function(e) {
        if (/*toggle through buttons*/curMenu === 0) {
            if (e.key == "ArrowRight") {
               curButton = (curButton + 1)%4;
            } else if (e.key == "ArrowLeft") {
                if(curButton === 0){
                    curButton = 3;
                } else {
                    curButton--;
                }
            } else if (e.key == "Enter") {

                }
            }
        } else {
            
        }
    }
    
    //show diag
    
    menuObj = $("#menu");
    
    
}

function ActionArea() {
    /* Create one speech bubble and keep it hidden until we need it. */
    var speechBubble = document.createElement("table");

        /* Top row */
        var row = document.createElement("tr");
            var cell = document.createElement("td");
            cell.setAttribute("class", "speechBubble-top-left");
            row.appendChild(cell);
            
            cell = document.createElement("td");
            cell.setAttribute("class", "speechBubble-top");
            row.appendChild(cell);
            
            cell = document.createElement("td");
            cell.setAttribute("class", "speechBubble-top-right");
            row.appendChild(cell);
        speechBubble.appendChild(row);

        /* Middle row */
        row = document.createElement("tr");
            cell = document.createElement("td");
            cell.setAttribute("class", "speechBubble-middle-left");
            row.appendChild(cell);
            
            cell = document.createElement("td");
            cell.setAttribute("class", "speechBubble-middle");
            row.appendChild(cell);
            
            cell = document.createElement("td");
            cell.setAttribute("class", "speechBubble-middle-right");
            row.appendChild(cell);
        speechBubble.appendChild(row);

        /* Bottom row */
        row = document.createElement("tr");
            cell = document.createElement("td");
            cell.setAttribute("class", "speechBubble-bottom-left");
            row.appendChild(cell);
            
            cell = document.createElement("td");
            cell.setAttribute("class", "speechBubble-bottom");
            row.appendChild(cell);
            
            cell = document.createElement("td");
            cell.setAttribute("class", "speechBubble-bottom-right");
            row.appendChild(cell);
        speechBubble.appendChild(row);
    
    this.showSpeechBubble = function(text) {
        speechBubble.style.visibility = "visible";
        speechBubble.innerText = text; // TODO: animate text
        // FIXME: also have to set display: table?
    };
    
    this.hideSpeechBubble = function() {
        speechBubble.style.visibility = "hidden";
        // also have to set display: none?
    };
}





