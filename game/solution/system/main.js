class main {
    constructor() {
        this.game = null;
    }

    /*
    *   This function creates a main menu
    */
    menu() {
        // show the menu
        document.getElementById("button1").addEventListener("click", () => {
            // hide the buttons
            document.getElementById("button1").style.display = "none";
            document.getElementById("button1a").style.display = "none";
            document.getElementById("button2").style.display = "none";
            document.getElementById("button2a").style.display = "none";
        });
        document.getElementById("button2").addEventListener("click", () => {
            // hide the buttons
            document.getElementById("button1").style.display = "none";
            document.getElementById("button1a").style.display = "none";
            document.getElementById("button2").style.display = "none";
            document.getElementById("button2a").style.display = "none";

        });
        document.getElementById("button1a").addEventListener("click", () => {
            // hide the buttons
            document.getElementById("button1").style.display = "none";
            document.getElementById("button1a").style.display = "none";
            document.getElementById("button2").style.display = "none";
            document.getElementById("button2a").style.display = "none";
        }
        );
        document.getElementById("button2a").addEventListener("click", () => {
            // hide the buttons
            document.getElementById("button1").style.display = "none";
            document.getElementById("button1a").style.display = "none";
            document.getElementById("button2").style.display = "none";
            document.getElementById("button2a").style.display = "none";
        }
        );
    }
}

// initialize the game
var game = new main();
game.menu();