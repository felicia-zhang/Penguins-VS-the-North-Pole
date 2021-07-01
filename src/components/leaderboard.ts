import { PlayFabClient } from "playfab-sdk";
import { darkBackgroundColor, lightBackgroundColor, textStyle } from "../utils/constants";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";
import AScene from "./AScene";

class LeaderboardScene extends AScene {
	list: Phaser.GameObjects.Container;
	tabSelector: RoundRectangle;
	constructor() {
		super("Leaderboard");
	}

	create() {
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.add.image(400, 300, "sky");
		this.add.existing(new RoundRectangle(this, 400, 330, 480, 400, 15, darkBackgroundColor));
		this.list = this.add.container(230, 180, []);
		this.add.text(400, 16, "LEADERBOARD", textStyle).setAlign("center").setOrigin(0.5, 0);
		this.tabSelector = this.add.existing(new RoundRectangle(this, 240, 110, 160, 95, 15, darkBackgroundColor));

		const button1Underline = this.add.line(172, 100, 172, 100, 172, 100, 0xffffff).setAlpha(0);
		const button1 = this.add
			.text(172, 100, "Snowballs", textStyle)
			.setOrigin(0, 0.5)
			.setAlign("left")
			.setInteractive({ useHandCursor: true })
			.on("pointerover", () => {
				button1Underline
					.setTo(0, 0, button1.width, 0)
					.setPosition(172, 100 + button1.height / 2)
					.setAlpha(1);
			})
			.on("pointerout", () => {
				button1Underline.setAlpha(0);
			})
			.on("pointerup", () => this.showLeaderboard());

		const menuButtonUnderline = this.add.line(784, 584, 784, 584, 784, 584, 0xffffff).setAlpha(0);
		const menuButton = this.add
			.text(784, 584, "MENU", textStyle)
			.setOrigin(1, 1)
			.setInteractive({ useHandCursor: true })
			.on("pointerover", () => {
				menuButtonUnderline
					.setTo(0, 0, menuButton.width, 0)
					.setPosition(784 - menuButton.width, 584)
					.setAlpha(1);
			})
			.on("pointerout", () => {
				menuButtonUnderline.setAlpha(0);
			})
			.on("pointerup", () => {
				this.cameras.main.fadeOut(500, 0, 0, 0);
				this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
					this.scene.start("Menu");
				});
			});
	}

	showLeaderboard() {
		this.add.tween({
			targets: [this.tabSelector],
			props: {
				x: {
					value: 240,
					ease: "Sine.easeIn",
					duration: 600,
				},
				width: {
					value: 160,
					ease: "Sine.easeIn",
					duration: 600,
				},
			},
			callbackScope: this,
		});
		this.list.removeAll(true);
		PlayFabClient.GetLeaderboard({ StatisticName: "snowballs", StartPosition: 0 }, (error, result) => {
			const players = result.data.Leaderboard;
			players.forEach((player, i) => {
				const bg = this.add.existing(
					new RoundRectangle(this, 170, i * 80 + 8, 390, 50, 15, lightBackgroundColor)
				);
				const rankText = this.add.text(0, i * 80, `#${(i + 1).toString()}`, textStyle);
				const playerText = this.add.text(50, i * 80, player.DisplayName, textStyle);
				const statText = this.add
					.text(340, i * 80, player.StatValue.toString(), textStyle)
					.setOrigin(1, 0)
					.setAlign("right");
				this.list.add([bg, rankText, playerText, statText]);
			});
		});
	}

	update() {
		if (!this.registry.has("FinishedSignIn")) {
			this.scene.start("Signin");
		}
	}
}

export default LeaderboardScene;
