// import Phaser from 'phaser';
import StartScreen from './scenes/StartScreen';
import Game from './scenes/game';

export default {
	type: Phaser.AUTO,
	width: 540,
	height: 960,
	backgroundColor: "#F3F4C0",
	scene: [StartScreen,Game]
};
