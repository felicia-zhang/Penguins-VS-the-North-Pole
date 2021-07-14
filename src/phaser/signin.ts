import AScene from "./AScene";
import { PlayFabClient } from "playfab-sdk";
import { BiomeDetail } from "../utils/types";

class SigninScene extends AScene {
	lightContainer: Phaser.GameObjects.Container;
	updateCounter: number;

	constructor() {
		super("Signin");
	}

	create() {
		this.updateCounter = 0;
		this.add.image(400, 300, "sky").setScrollFactor(0);

		this.createAligned(this, "mountain3", 0.2);
		this.createAligned(this, "mountain2", 0.5);
		this.createAligned(this, "mountain1", 1);

		this.anims.create({
			key: "shine",
			repeat: -1,
			yoyo: true,
			frames: [{ key: "light1" }, { key: "light2" }, { key: "light3" }, { key: "light4" }],
			frameRate: 4,
		});

		this.lightContainer = this.add.container(400, 300, [
			this.add.sprite(-250, -230, "light1").setScale(0.15).anims.play("shine"),
			this.add.sprite(-340, -160, "light1").setScale(0.1).anims.play("shine"),
			this.add.sprite(190, -70, "light1").setScale(0.2).anims.play("shine"),
			this.add.sprite(270, -200, "light1").setScale(0.07).anims.play("shine"),
			this.add.sprite(340, -140, "light1").setScale(0.15).anims.play("shine"),
			this.add.sprite(-160, -110, "light1").setScale(0.23).anims.play("shine"),
		]);
	}

	createAligned(scene: AScene, texture: string, scrollFactor: number) {
		const count = 10 * scrollFactor;

		let x = 0;
		for (let i = 0; i < count; ++i) {
			const image = scene.add.image(x, 600, texture).setOrigin(0, 1).setScrollFactor(scrollFactor);
			x += image.width;
		}
	}

	update() {
		this.cameras.main.scrollX += 0.25;
		this.lightContainer.x += 0.25;

		if (this.registry.has("FinishedSignIn") && this.updateCounter === 0) {
			this.updateCounter++;
			PlayFabClient.GetCatalogItems({ CatalogVersion: "1" }, (error, result) => {
				this.registry.set("CatalogItems", result.data.Catalog);

				PlayFabClient.GetPlayerStatistics({ StatisticNames: ["resetBonus"] }, (e, r) => {
					const resetStat = r.data.Statistics.find(
						(stat: PlayFabClientModels.StatisticValue) => stat.StatisticName === "resetBonus"
					);
					this.registry.set("ResetBonus", resetStat === undefined ? 0 : resetStat.Value);

					PlayFabClient.GetUserInventory({}, (error, result) => {
						this.registry.set("SB", result.data.VirtualCurrency.SB);
						this.registry.set("IC", result.data.VirtualCurrency.IC);
						this.registry.set("Inventories", result.data.Inventory);

						this.scene.start("Game", { biomeId: "icebiome", biomeName: "Ice Biome" });
					});
				});
			});
		}
	}
}

export default SigninScene;
