// import Phaser from 'phaser';
import StartScreen from './scenes/StartScreen';
import Game from './scenes/game';

export default {
	type: Phaser.AUTO,
	width: 540,
	height: 960,
	backgroundColor: "#F3F4C0",
	scale: {
		mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
	  },
	scene: [StartScreen,Game]
};
