
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
	//get menu items
	this.fightItem = $("#mi_fight");
	this.actItem = $("#mi_act");
	this.useItem = $("#mi_use");
	this.mercyItem = $("#mi_mercy");
	that = this;

    var curMenu = "toplevel"; //0:"topLevelMenu", 1:"fight", 2:"act", 3:"use", 4:"mercy"

	var curMode = "dialog"; // "dialog", "menu"

	var uiArea = document.getElementById("uiArea");

	var menu = document.getElementById("menu-inner");

	var toolbar = document.createElement("div");
	uiArea.appendChild(toolbar);

	var cmd_fight = document.createElement("div");
	cmd_fight.setAttribute("class", "button-inactive");
	toolbar.appendChild(cmd_fight);

	this.setMode = function(mode) {
		curMode = mode;
	};

	var curButton = 0; /* Current toolbar button */

	function hilightCurToolbarButton() {
		that.fightItem.removeClass("mi_high");
		that.actItem.removeClass("mi_high");
		that.useItem.removeClass("mi_high");
		that.mercyItem.removeClass("mi_high");
		
		switch(curButton){
			case 0:
				that.fightItem.addClass("mi_high");
				break;
			case 1:
				that.actItem.addClass("mi_high");
				break;
			case 2:
				that.useItem.addClass("mi_high");
				break;
			case 3:
				that.mercyItem.addClass("mi_high");
				break;
		}
	}

	var act_actions = null;
	var actItem = 0;

    this.onkeydown=function(e) {
		console.log("MsgBox.onkeydown " + e);
		if (curMode == "menu") {
	        if (curMenu == "toplevel") {
				if (e.key == "ArrowRight") {
	               curButton = (curButton + 1)%4;
	            } else if (e.key == "ArrowLeft") {
	                if(curButton === 0){
	                    curButton = 3;
	                } else {
	                    curButton--;
	                }
	            } else if (e.key == "Enter") {
					switch (curButton) {
						case 0:
							// clear menu
							while (menu.firstChild) menu.removeChild(menu.firstChild);
							curMenu = "fight";
							var i;
							fight_actions = gc.getCurState().fight;
							if (!fight_actions) break;
							var list = document.createElement("ul");
							for (i = 0; i < fight_actions.length; i++) {
								var item = document.createElement("li");
								item.innerText = fight_actions[i].label;
								if (i == 0) item.setAttribute("class", "mi_high");
								list.appendChild(item);
							}
							fightItem = 0;
							menu.appendChild(list);
							break;
						case 1:
							// clear menu
							while (menu.firstChild) menu.removeChild(menu.firstChild);
							curMenu = "act";
							var i;
							act_actions = gc.getCurState().actions;
							if (!act_actions) break;
							var list = document.createElement("ul");
							for (i = 0; i < act_actions.length; i++) {
								var item = document.createElement("li");
								item.innerText = act_actions[i].label;
								if (i == 0) item.setAttribute("class", "mi_high");
								list.appendChild(item);
							}
							actItem = 0;
							menu.appendChild(list);
							break;
						case 2:
							// clear menu
							while (menu.firstChild) menu.removeChild(menu.firstChild);
							curMenu = "use";
							var i;
							item_actions = gc.getCurState().items;
							if (!item_actions) break;
							var list = document.createElement("ul");
							for (i = 0; i < item_actions.length; i++) {
								var item = document.createElement("li");
								item.innerText = item_actions[i].label;
								if (i == 0) item.setAttribute("class", "mi_high");
								list.appendChild(item);
							}
							fightItem = 0;
							menu.appendChild(list);
						case 3: curMenu = "mercy"; break;
					}
				}

				hilightCurToolbarButton();

			} else if (curMenu == "fight"){
				curMenu = "toplevel"; //todo undo hackfix
				if(e.key == "Enter"){
					//dummy text for now
					$("#menu-inner").text("Yeah battle yeah!!");
					curMenu = "toplevel"; //this is where things broke:
												//was attempting to exit menu after
												//this selection but that wasn't
												//working right
				}
				//do later
			} else if (curMenu == "act") {
				var select = false;
				if (e.key == "ArrowDown") {
					select = true;
					actItem = (actItem + 1)%act_actions.length;
	            } else if (e.key == "ArrowUp") {
					select = true;
	                if (actItem === 0){
	                    actItem = act_actions.length-1;
	                } else {
	                    actItem--;
	                }
				} else if (e.key == "Enter") {
					gc.menuEvent(gc.getCurState().actions[actItem]);
				} else if (e.key == "Escape") {
					curMenu = "toplevel";
				}
				var listItems = menu.getElementsByTagName("li");
				for (i = 0; i < act_actions.length; i++) {
					listItems[i].classList.remove("mi_high");
				}
				if (select) {
					listItems[actItem].classList.add("mi_high");
				}
			} else if (curMenu == "use") {
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
					//dummy text for now
					$("#menu-inner").text("Yeah so much mercy yeah!!");
					curMenu = "toplevel";
				} else if(e.key == "Escape") {
					curMenu = "toplevel";
				}
			}
	
		} else if (curMode == "dialog") {
			if (e.key == "Enter") {
				// TODO: check: are we animating text appear?
				gc.menuEvent("complete");
			}
		}
    };

	this.showDialog = function(text) {
		curMode = "dialog";
		menu.innerText = text;
	};

	this.setIdle = function() {
		// TODO: clear text, generate menus?
		curMode = "menu";
		curMenu = "toplevel";
		hilightCurToolbarButton();
	};

	gc.registerListeners(this);
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
	var that = this;

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

	/*
	 * Audio
	 */
	var sound = null;

    curState = states["start"];
    
    var keydownTarget = null;
    var keyupTarget = null;
    var keypressTarget = null;

	this.getCurState = function() {
		return curState;
	};

	window.onkeydown = function(e) {
		if (keydownTarget) {
			keydownTarget(e);
		}
	};

	window.onkeyup = function(e) {
		if (keyupTarget) {
			keyupTarget(e);
		}
	};

	window.onkeypress = function(e) {
		if (keypressTarget) {
			keypressTarget(e);
		}
	};
    
    this.registerListeners = function(target) {
        if (target.onkeydown) {
            keydownTarget = target.onkeydown;
        }
        if (target.onkeyup) {
            keyupTarget = target.onkeyup;
        }
        if (target.onkeypress) {
            keypressTarget = target.onkeypress;
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
		switch (curState.type) {
			case "dialog":
		        switch (event) {
					case "complete":
						console.log("Continuing from dialog state");
						if (!curState.nextStates[event]) {
							console.log("GameController.menuEvent(): Could " +
							            "not find next state for '" + event +
							            "'");
							return false;
						}
						that.advanceState(curState.nextStates[event]);
						break;
					default:
						console.log("unexpected menu event '" + event + "' for " +
						            "game state '" + curState.type + "'");
				}
				break;
			case "idle":
				console.log("Processing menu event that occured in idle state");
				that.advanceState(event.nextState);
				break;
		}
    };
    
    this.bulletHellEvent = function() {
        /* */
    };

    /* Moves to the next state */
    this.advanceState = function(nextState) {

		if (!states[nextState]) {
			console.log("GameController.advanceState(): Could not find " +
			            "next state '" + curState.nextStates[event] + "'");
			return false;
		}

		var oldState = curState;
		curState = states[nextState];

		if (oldState.music != curState.music) {
			if (curState.music == null && sound) {
				sound.pause();
			} else {
				sound = new Audio("assets/" + curState.music);
				sound.loop = true;
				sound.play();
			}
		}

		if (curState.expression) {
			enemy.setExpression(curState.expression);
		}

        /* Look up what the current state is */
        switch (curState.type) {
            case "react":
				console.log("Advancing to react state");
                // Show a speech bubble
                actionArea.showSpeechBubble("test of speech bubble");
                window.setTimeout(function() {
                   actionArea.hideSpeechBubble();
                   /* Advance to the next state */
                });
                break;
            case "menu":
				console.log("Advancing to menu state");
                // Present the user with several options
                break;
            case "fight":
				console.log("Advancing to fight state");
                // Start fight sequence
                break;
            case "restart":
				console.log("Advancing to restart state");
                // Player died, start over
                break;
			case "idle":
				console.log("Advancing to idle state");
				msgBox.setIdle();
				break;
            case "dialog":
				console.log("Advancing to dialog state");
                // Enemy is talking, but in the main dialog window
                msgBox.showDialog(curState.text);
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
		//actionArea.showSpeechBubble("foobar");

		enemy = new Enemy("res/oc-");

		that.advanceState("intro10");
	};
}




