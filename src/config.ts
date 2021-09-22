// import Phaser from 'phaser';
import StartScreen from './scenes/StartScreen';
import Game from './scenes/game';

export default {
	type: Phaser.AUTO,
	width: 350,
	height: 550,
	backgroundColor: "#F3F4C0",
	scene: [StartScreen,Game]
};
