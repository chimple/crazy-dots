import Game from "./game";

export default class StartScreen extends Phaser.Scene {
    private width: number = 540;
    private height: number = 960;
    private score: any;
    private isGameOver: any;

    constructor() {
        super("StartScreen");
    }

    init(data: { score: any; isGameOver: boolean; }) {
        this.score = data.score;
        this.isGameOver = data.isGameOver ?? false;
    }
    preload() {
        this.load.image('gameName', './assets/GameName.png')
        this.load.image('playButton', './assets/PlayButton.png')
        this.scene.stop('Game');
    }
    create() {
        this.add
            .image(this.width * 0.33, this.height * 0.02, "gameName")
            .setOrigin(0.5, 0)
            .setScale(0.4);
        this.add
            .text(this.width * 0.33, this.height * 0.25, "Score")
            .setFontSize(50)
            .setColor("#000000")
            //   .setFontStyle("bold")
            .setFontFamily("agencyr")
            .setOrigin(0.5, 0);
        this.add
            .text(this.width * 0.33, this.height * 0.30, this.score ?? "00")
            .setFontSize(40)
            .setFontFamily("agencyr")
            .setColor("#000000")
            .setOrigin(0.5, 0);
        this.add
            .text(this.width * 0.33, this.height * 0.37, "Best Score")
            .setFontSize(30)
            .setColor("#000000")
            .setFontFamily("agencyr")
            .setOrigin(0.5, 0);
        this.add
            .text(this.width * 0.33, this.height * 0.40, localStorage.getItem("highestScore") ?? "0")
            .setFontSize(30)
            .setFontFamily("agencyr")
            .setColor("#000000")
            .setOrigin(0.5, 0);

        this.add
            .image(this.width * 0.33, this.height * 0.45, "playButton")
            .setOrigin(0.5, 0)
            .setScale(0.4)
            .setInteractive()
            .on(
                "pointerdown",
                () => {
                    if (this.isGameOver) {
                        console.log("Game Scence Loaded");
                        this.scene.add("Game", Game);
                    }
                    console.log("Game Scence Started");
                    this.scene.start("Game");
                },
                this
            );
        this.add
            .text(this.width * 0.33, this.height * 0.455,
                `Tap to ${this.isGameOver === true ? "Re" : ""}start`
            )
            .setFontSize(35)
            .setColor("#FFFFFF")
            .setFontFamily("agencyr")
            .setOrigin(0.5, 0)
        // .on(
        //     "pointerdown",
        //     () => {
        //         if (this.isGameOver) {
        //             console.log("Game Scence Loaded");
        //             this.scene.add("Game", Game);
        //         }
        //         console.log("Game Scence Started");
        //         this.scene.start("Game");
        //     },
        //     this
        // );
    }
}
