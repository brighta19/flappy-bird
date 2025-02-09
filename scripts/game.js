/* global canvas imagemanager audiomanager inputmanager TitleScreen GameScreen */
var currentScreen = new TitleScreen();
var previousDate = Date.now();

function main() {
    switch(currentScreen.changeScreenTo) {
        case "titlescreen":
            currentScreen = new TitleScreen();
            break;

        case "gamescreen":
            currentScreen = new GameScreen();
            break;
    }

    var currentDate = Date.now();
    var dt = (currentDate - previousDate) / 1000;
    previousDate = currentDate;

    currentScreen.update(dt);
    currentScreen.render(dt);

    window.requestAnimationFrame(main);
}

main();
