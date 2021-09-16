import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  private mainBall: any;
  private ball: any;
  private ballType: any = ['ballBlue', 'ballPink'];
  private tap: any;
  private mobileTap: any;
  private ontapStatus: boolean = true;
  private gameOver: boolean = false;
  private score: integer = 0;
  private scoreText: any;
  private gameOverText: any;
  private directionSelection: any;
  private onMouseTapStatus: boolean = true;
  // static width:any;

  preload() {
    this.load.image('mainBallBlue', './assets/blue.png')
    this.load.image('mainBallpink', './assets/pink80.png')
    this.load.image('ballBlue', './assets/blue60.png')
    this.load.image('ballPink', './assets/pink.png')
  }

  create() {
    console.log('Enter Create Method');
    // Game.width=this.game.canvas.width;
    this.scoreText = this.add.text(16, 16, `score: ${this.score}`, { fontSize: '32px', color: '#000' });
    this.mainBall = this.physics.add.image(170, 275, "mainBallBlue");
    this.mainBall.data = 'Blue'
    this.mainBall.setImmovable(true);
    this.createBall();
    console.log(this);
  }
  createBall() {
    console.log('Enter CreateBall Method');
    let ballColorType = Phaser.Math.Between(0, 1);
    this.directionSelection = Phaser.Math.Between(1, 4);
    console.log('this.ballType[ballColorType] ', this.ballType[ballColorType]);
    this.ball = this.physics.add.image(Phaser.Math.Between(100, 200), Phaser.Math.Between(100, 200), this.ballType[ballColorType]);
    if (this.ballType[ballColorType] == 'ballBlue') {
      this.ball.data = 'Blue'
      console.log('this.ballType[ballColorType] ', this.ballType[ballColorType], ' this.ball.data ', this.ball.data);
    }
    else {
      this.ball.data = 'Pink';
      console.log('this.ballType[ballColorType] ', this.ballType[ballColorType], ' this.ball.data ', this.ball.data);
    }
    this.tap = this.input.activePointer;
    // this.mobileTap = this.input.activePointer;
    this.ball.setVelocity(0, 300);
    this.ball.collideWorldBounds = true;
    this.ball.setBounce(1, 1);
    this.ball.setCollideWorldBounds(true);
    if (this.directionSelection == 1)
      this.ball.setOrigin(300, 400); //for left
    else if (this.directionSelection == 2)
      this.ball.setOrigin(300, -900); //for left bottom
    else if (this.directionSelection == 3)
      this.ball.setOrigin(-300, 400); // for right
    else if (this.directionSelection == 4)
      this.ball.setOrigin(-250, -1000); //for right bottom
    this.ball.body.setGravity(150, 140);
    this.physics.add.collider(
      this.mainBall,
      this.ball,
      (ba, plat) => {
        console.log('ba.data==plat.data', ba.data, ' ==plat.data ', plat.data)
        if (ba.data == plat.data) {
          console.log('in collider if part ba.data==plat.data', ba.data, ' ==plat.data ', plat.data)
          console.log('score +1')
          this.score++;
          this.scoreText.setText(`score: ${this.score}`);
          this.ball.disableBody(true, true);
          this.createBall();
          // this.ball.create(Phaser.Math.Between(100, 200),Phaser.Math.Between(100, 200),'ballPink')
          // ba = this.physics.add.image(200, 400, "red");
        } else {
          console.log('in collider else part ba.data==plat.data', ba.data, ' ==plat.data ', plat.data)
          this.gameOver = true;
          console.log("game over ", this.gameOver);
          this.ball.disableBody(true, true);
          this.gameOverText = this.add.text(40, 300, `\t\t\tGame Over\n\t\t\t\tscore: ${this.score}\n\nTap to play again`, { fontSize: '28px', color: '#000' });
        }
      },
      undefined,
      this
    );
  }
  update() {
    if (this.directionSelection == 1)
      this.ball.x = this.ball.x + 3; //for left move
    else if (this.directionSelection == 2)
      this.ball.x = this.ball.x + 1.5; //for right top move
    else if (this.directionSelection == 3)
      this.ball.x = this.ball.x - 4.5; //for right top move
    else if (this.directionSelection == 4) {
      this.ball.x = this.ball.x - 4; //for right move
      // if (this.ball.y > -30796.5) {
      //   console.log('this.ball.x ', this.ball.x, ' Score 3', this.score)
      //   console.log('this.ball.y ', this.ball.y, ' Score 3', this.score)
      //   this.ball.x = this.ball.x - 4.1; //for right move
      // }
      //-30696.5
    }
    // this.ball.y = this.ball.y++;

    if ((this.input.activePointer.isDown || this.input.pointer1.isDown || this.tap.isDown) && this.onMouseTapStatus) {
      console.log("clicked");
      this.onMouseTapStatus = false;
      if (this.ontapStatus) {
        this.mainBall.setTexture('mainBallpink');
        this.mainBall.data = 'Pink'
      } else {
        this.mainBall.setTexture('mainBallBlue');
        this.mainBall.data = 'Blue'
      }
      if (this.gameOver) {
        this.gameOver = false;
        console.log("Game restarted ", this.gameOver);
        this.score = 0;
        this.gameOverText.setText(``);
        this.scoreText.setText(`score: ${this.score}`);
        this.createBall();
      }
      this.ontapStatus = !this.ontapStatus;
    }
    this.input.on("pointerup", () => {
      this.onMouseTapStatus = true;
    });
  }
}