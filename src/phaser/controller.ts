import LeaderboardScene from "./leaderboard";
import GameScene from "./game";
import SigninScene from "./signin";
import sky from "../assets/sky.png";
import fire from "../assets/fire.png";
import igloo from "../assets/igloo.png";
import snowball from "../assets/snowball.png";
import icicle from "../assets/icicle.png";
import icicle1 from "../assets/icicle1.png";
import icicle2 from "../assets/icicle2.png";
import icicle3 from "../assets/icicle3.png";
import icicle4 from "../assets/icicle4.png";
import snowman from "../assets/snowman.png";
import mittens from "../assets/mittens.png";
import vault from "../assets/vault.png";
import lock from "../assets/lock.png";
import penguin1 from "../assets/penguin1.png";
import penguin2 from "../assets/penguin2.png";
import penguin3 from "../assets/penguin3.png";
import icebiome from "../assets/icebiome.png";
import savannabiome from "../assets/savannabiome.png";
import magmabiome from "../assets/magmabiome.png";
import marinebiome from "../assets/marinebiome.png";
import tropicalbiome from "../assets/tropicalbiome.png";
import star from "../assets/star.png";
import MenuScene from "./menu";
import AScene from "./AScene";
import MapScene from "./map";

class Controller extends AScene {
	constructor() {
		super("Controller");
	}

	preload() {
		this.load.image("sky", sky);
		this.load.image("fire", fire);
		this.load.image("igloo", igloo);
		this.load.image("snowball", snowball);
		this.load.image("icicle", icicle);
		this.load.image("icicle1", icicle1);
		this.load.image("icicle2", icicle2);
		this.load.image("icicle3", icicle3);
		this.load.image("icicle4", icicle4);
		this.load.image("snowman", snowman);
		this.load.image("mittens", mittens);
		this.load.image("vault", vault);
		this.load.image("lock", lock);
		this.load.image("penguin1", penguin1);
		this.load.image("penguin2", penguin2);
		this.load.image("penguin3", penguin3);
		this.load.image("icebiome", icebiome);
		this.load.image("savannabiome", savannabiome);
		this.load.image("magmabiome", magmabiome);
		this.load.image("marinebiome", marinebiome);
		this.load.image("tropicalbiome", tropicalbiome);
		this.load.image("star", star);
	}

	create() {
		this.game.input.mouse.disableContextMenu();
		this.scene.add("Leaderboard", LeaderboardScene);
		this.scene.add("Signin", SigninScene);
		this.scene.add("Menu", MenuScene);
		this.scene.add("Game", GameScene);
		this.scene.add("Map", MapScene);

		if (this.registry.has("FinishedSignIn")) {
			this.scene.start("Menu");
		} else {
			this.scene.start("Signin");
		}
	}
}

export default Controller;