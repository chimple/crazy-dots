import Phaser from 'phaser';
import Game from './scenes/game';

export default {
	type: Phaser.AUTO,
	width: 350,
	height: 550,
	backgroundColor: "#fdeaf5",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [Game]
};
