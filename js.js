import { animasiList } from "./scripts/animateJs/listPart.js";
import { sliderAnimate } from "./scripts/animateJs/slider.js";
import { countDown1 } from "./scripts/utils/countDown.js";
import {
  exploreSellTop,
  exploreSellBottom,
  transition,
} from "./scripts/main/exploring.js";
// generating
import {
  generateBestSelling,
  AnimateProduct,
} from "./scripts/main/bestSelling.js";

generateBestSelling();
AnimateProduct();
exploreSellTop();
exploreSellBottom();

// animating
sliderAnimate();
animasiList();
countDown1();
transition();
