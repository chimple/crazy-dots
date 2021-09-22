import Phaser from 'phaser';
import config from './config';
// import StartScreen from './scenes/StartScreen';
// import Game from './scenes/game';

new Phaser.Game(
  Object.assign(config, {
    // scene: [StartScreen,Game]
  })
);
