// Immediate Invoked Anonymous Function
(function () {
    // Global Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var assetManager;
    var assetManifest;
    // Store current scene information
    var currentScene;
    var currentState;
    assetManifest = [
        { id: "startButton", src: "./Assets/StartBtn.png" },
        { id: "backgroud", src: "./Assets/background.png" },
        { id: "gameLogo", src: "./Assets/SnakeLogo-Background.png" },
        { id: "snake", src: "./Assets/placeholder.png" },
        { id: "mouse", src: "./Assets/mouse.png" },
        { id: "bomb", src: "./Assets/bomb.png" },
        { id: "explosion", src: "./Assets/explosion.png" },
        { id: "thumbsUp", src: "./Assets/thumbsUp.png" },
        { id: "mainButton", src: "./Assets/MainPageBtn.png" },
        { id: "replayButton", src: "./Assets/TryAgainBtn.png" }
    ];
    function Init() {
        console.log("Initializing Start");
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        // Set up default game states -- State Machine
        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        Main();
    }
    function Update() {
        // Has my state changed since the last check?
        if (currentState != objects.Game.currentScene) {
            console.log("Changing scenes to " + objects.Game.currentScene);
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    function Main() {
        console.log("Game Start");
        // Finite State Machine
        switch (objects.Game.currentScene) {
            case config.Scene.START:
                stage.removeAllChildren();
                currentScene = new scenes.StartScene(assetManager);
                stage.addChild(currentScene);
                break;
            case config.Scene.GAME:
                stage.removeAllChildren();
                currentScene = new scenes.PlayScene(assetManager);
                stage.addChild(currentScene);
                break;
            case config.Scene.SECONDLEVEL:
                stage.removeAllChildren();
                currentScene = new scenes.SecondLevel(assetManager);
                stage.addChild(currentScene);
                break;
            case config.Scene.OVER:
                stage.removeAllChildren();
                currentScene = new scenes.GameOverScene(assetManager);
                stage.addChild(currentScene);
                break;
        }
        currentState = objects.Game.currentScene;
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map