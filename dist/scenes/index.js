import { Scenes } from "telegraf";
import shareAIO from "./addAIO/index.js";
import reqAIO from "./reqAIO/index.js";
import editAIO from "./editAIO/index.js";
var stage = new Scenes.Stage([shareAIO, reqAIO, editAIO]);
// const shareStage = new Scenes.Stage<Scenes.SceneContext>([shareScene]);
export default stage;
