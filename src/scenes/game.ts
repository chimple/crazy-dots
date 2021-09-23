// import Phaser from 'phaser';

import StartScreen from "./StartScreen";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  private mainBall: any;
  private ball: any;
  private ballType: any = ['ballBlue', 'ballPink'];
  private ontapStatus: boolean = true;
  private gameOver: boolean = false;
  private score: integer = 0;
  private scoreBoard: any;
  private gameOverText: any;
  private directionSelection: any;
  private tween: any;
  private width: any = 540;//GAME_WIDTH;
  private height: any = 960;//GAME_HEIGHT;
  private speed: number = 1500;
  private highScore: any;

  preload() {
    // this.load.image('background', './assets/background.png')
    this.load.image('mainBallBlue', './assets/blue.png')
    this.load.image('mainBallpink', './assets/pink80.png')
    this.load.image('ballBlue', './assets/blue60.png')
    this.load.image('ballPink', './assets/pink.png')
  }

  create() {
    console.log('Enter Create Method');
    this.mainBall = this.add.image(this.width / 2, this.height / 2, "mainBallBlue")
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          console.log('pointerdown Enterd');
          if (this.ontapStatus) {
            this.mainBall.setTexture('mainBallpink');
            this.mainBall.data = 'Pink'
            console.log('pointerdown Enterd and mainBall changed to pink');
          } else {
            this.mainBall.setTexture('mainBallBlue');
            this.mainBall.data = 'Blue'
            console.log('pointerdown Enterd and mainBall changed to blue');
          }
          this.ontapStatus = !this.ontapStatus;
        },
        this
      );
    this.mainBall.data = 'Blue'
    this.scoreBoard = this.add.text(
      this.width / 3.5,
      this.height * 0.06,
      `Score: ${this.score}`,
      {
        fontSize: "52px",
        fontStyle: "bold",
        color: "#fffff",
      }
    );
    this.highScore =
      localStorage.getItem('highestScore') == null
        ? 0
        : localStorage.getItem('highestScore');

    // this.tweenMainBall = this.tweens.add({
    //   targets: this.mainBall,
    //   x: { value: this.width / 2 - Phaser.Math.Between(10,20) },
    //   y: { value: this.height / 2 - Phaser.Math.Between(150,200) },
    //   duration: 1000,
    //   ease: 'Linear',
    //   repeat: -1,
    //   // ease: Phaser.Easing.Bounce.InOut,
    //   // onStart: true,
    //   // yoyo: true,
    //   // onComplete: () => {
    //   //   console.log("OnEnd");
    //   //   this.onCollition();
    //   // }
    // });
    // this.tweenMainBall.play;
    this.createBall();
    console.log(this);
  }
  createBall() {
    console.log('Enter CreateBall Method');
    let ballColorType = Phaser.Math.Between(0, 1);
    this.directionSelection = Phaser.Math.Between(1, 2);
    console.log('this.ballType[ballColorType] ', this.ballType[ballColorType]);
    if (this.directionSelection == 1)
      this.ball = this.add.image(Phaser.Math.Between(0, this.width), 0, this.ballType[ballColorType]); //buttom Middle
    else if (this.directionSelection == 2)
      this.ball = this.add.image(Phaser.Math.Between(0, this.width), this.height, this.ballType[ballColorType]); //buttom Middle
    if (this.ballType[ballColorType] == 'ballBlue') {
      this.ball.data = 'Blue'
      console.log('this.ballType[ballColorType] ', this.ballType[ballColorType], ' this.ball.data ', this.ball.data);
    }
    else {
      this.ball.data = 'Pink';
      console.log('this.ballType[ballColorType] ', this.ballType[ballColorType], ' this.ball.data ', this.ball.data);
    }
    this.tween = this.tweens.add({
      targets: this.ball,
      x: { value: this.mainBall.x },
      y: { value: this.mainBall.y },
      duration: this.speed,
      onComplete: () => {
        console.log("OnEnd");
        this.onCollition();
      }
    });
    this.tween.play;
  }
  onCollition() {
    console.log('OnCollition Method Enterd');
    this.ball.setActive(false).setVisible(false);
    if (this.mainBall.data == this.ball.data) {
      this.score++;
      console.log('this.score++ ', this.score);
      this.scoreBoard.setText(`score: ${this.score}`);
      this.speed = this.speed - 20;
      this.createBall();
    } else {
      console.log("diff color");
      this.gameOver = true;
      console.log("GameOver setted ", this.gameOver);
      if (this.gameOver) {
        // this.gameOver = false;
        if (Number(this.highScore) < this.score) {
          localStorage.setItem('highestScore', this.score.toString());
          this.highScore = this.score;
        }
        console.log("Game over ", this.gameOver);
        this.gameOverText = this.add.text(
          this.width / 2, this.height * 0.70,
          "\t\t\tGame Over\n\t\tYour score: " + this.score)
          .setFontSize(50)
          .setColor("#000000")
          .setFontStyle("bold")
          .setFontFamily("Zekton")
          .setOrigin(0.5);
        this.tween.stop();
        console.log("tween stoped and gameovertext displayed");
        setTimeout(() => {
          console.log("setTimeout Entered");
          // this.scene.restart();
          this.scene.start("StartScreen", {
            score: this.score,
            isGameOver: true,
          });
          console.log("StartScreen Loaded");
          this.scene.remove("Game");
          console.log("Game Scence removed");
        }, 1000);
        // setTimeout(() => {
        //   this.gameOver = false;
        //   console.log("Game restarted ", this.gameOver);
        //   this.score = 0;
        //   this.gameOverText.setText(``);
        //   this.scoreBoard.setText(`score: ${this.score}`);
        //   this.createBall();
        // }, 1000);
      }
    }
  }
}

// if (this.directionSelection == 1)
    //   this.ball = this.add.image(0, 0, this.ballType[ballColorType]); //LeftTop
    // else if (this.directionSelection == 2)
    //   this.ball = this.add.image(this.width, -1, this.ballType[ballColorType]); //RightTop
    // else if (this.directionSelection == 3)
    //   this.ball = this.add.image(this.width, this.height, this.ballType[ballColorType]); //Rightbuttom
    // else if (this.directionSelection == 4)
    //   this.ball = this.add.image(-1, this.height, this.ballType[ballColorType]); //Leftbuttom
    // else if (this.directionSelection == 5)
    //   this.ball = this.add.image(this.width / 2, 0, this.ballType[ballColorType]); //topMiddle
    // else if (this.directionSelection == 6)
    //   this.ball = this.add.image(Phaser.Math.Between(0, this.width), this.height, this.ballType[ballColorType]); //buttom Middle
    // this.ball = this.add.image(Phaser.Math.Between(0, 350), Phaser.Math.Between(-1, 550), this.ballType[ballColorType]); //Leftbuttom