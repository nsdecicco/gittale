
var gc; /* GameController instance */

window.onload = function() {
    gc = new GameController();
	gc.init();
};

function Enemy(_baseImageURL) {
	var baseImageURL = _baseImageURL;

	var image = document.createElement("div");
	image.setAttribute("class", "enemy");
	//if (gc) {
		gc.addToActionArea(image);
	//}

	/* angry
	 * evil
	 * insane
	 * neutral
	 * sad
	 */
	this.setExpression = function(expression) {
		image.style.backgroundImage = "url('" + baseImageURL + expression + ".png')";
	};

	this.setExpression("neutral");
}

function MsgBox() {

	var uiArea = document.getElementById("uiArea");

	var toolbar = document.createElement("div");
	uiArea.appendChild(toolbar);

	var cmd_fight = document.createElement("div");
	cmd_fight.setAttribute("class", "button-inactive");
	toolbar.appendChild(cmd_fight);

    var curMenu = "toplevel"; //0:"topLevelMenu", 1:"fight", 2:"act", 3:"git", 4:"mercy"
    this.onkeydown=function(e) {
        if (curMenu == "toplevel") {
            var curButton = 0;
			if (e.key == "ArrowRight") {
               curButton = (curButton + 1)%4;
            } else if (e.key == "ArrowLeft") {
                if(curButton === 0){
                    curButton = 3;
                } else {
                    curButton--;
                }
            } else if (e.key == "Enter") {
				if(curButton === 0){
					curMenu = "battle";
				}
				if(curButton == 1){
					curMenu == "act";
				}
				if(curButton == 2){
					curMenu == "git";
				}
				if(curButton == 3){
					curMenu == "mercy";
				}
			}
		} else if (curMenu == "battle"){
			//do later
		} else if (curMenu == "act") {
			var actButton = 0; //0: Talk 1: Compliment 2: Check
			if (e.key == "ArrowRight") {
               actButton = (actButton + 1)%4;
            } else if (e.key == "ArrowLeft") {
                if (actButton === 0){
                    actButton = 2;
                } else {
                    actButton--;
                }
			} else if (e.key == "Enter") {
				//do later
			} else if (e.key == "Escape") {
				curMenu = "toplevel";
			}
		} else if (curMenu == "git") {
			var gitButton = 0; //0: gitpush 1: gitpull 2: gitmerge 3:stack overflow
			if (e.key == "ArrowRight") {
               gitButton = (gitButton + 1)%4;
            } else if (e.key == "ArrowLeft") {
                if (gitButton === 0) {
                    gitButton = 3;
                } else {
                    gitButton--;
                }
			} else if (e.key == "Enter") {
				//do later
			} else if (e.key == "Escape") {
				curMenu = "toplevel";
			}
		} else if (curMenu == "mercy") {
			var mercyButton = 0; //0: spare 1: flee
			if (e.key == "ArrowRight") {
               mercyButton = (mercyButton + 1)%4;
            } else if (e.key == "ArrowLeft") {
                if (mercyButton === 0){
                    mercyButton = 1;
                } else {
                    mercyButton--;
                }
			} else if(e.key == "Enter") {
				//do later
			} else if(e.key == "Escape") {
				curMenu = "toplevel";
			}
		}

		// TODO: hilight current selection
    };
}

function ActionArea() {
	var actionArea = document.getElementById("actionArea");

    /* Create one speech bubble and keep it hidden until we need it. */
    var speechBubble = document.createElement("table");
	speechBubble.setAttribute("class", "speechBubble");
	//speechBubble.setAttribute("cellspacing", "0");
	speechBubble.setAttribute("cellpadding", "0");

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
            
            var contentArea = document.createElement("td");
            contentArea.setAttribute("class", "speechBubble-middle");
            row.appendChild(contentArea);
            
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

	this.add = function(e) {
		actionArea.appendChild(e);
	};

    this.showSpeechBubble = function(text) {
        speechBubble.style.visibility = "visible";
        contentArea.innerText = text; // TODO: animate text
        // FIXME: also have to set display: table?
    };
    
    this.hideSpeechBubble = function() {
        speechBubble.style.visibility = "hidden";
        // also have to set display: none?
    };

	actionArea.appendChild(speechBubble);

	this.hideSpeechBubble();
}

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
	var enemy;

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

	this.addToActionArea = function(e) {
		actionArea.add(e);
	};

	/* This must be a separate function b/c otherwise the 'gc'
	 * global var isn't initialized by the time it's needed
	 */
	this.init = function() {
		msgBox = new MsgBox();
		actionArea = new ActionArea();

	    /* Initialize GameController */
	    // 1. Initialize game state
	    curState = states["start"];
    
		// 2. Initialize view
		// Need to answer the question(s): what are the view states?

		// Test: show speech bubble
		actionArea.showSpeechBubble("foobar");

		enemy = new Enemy("res/oc-");
	};
}




