import { animasiList } from "./animateJs/listPart.js";
import { sliderAnimate, clickSlider } from "./animateJs/slider.js";
import { countDown1 } from "./utils/countDown.js";
import {
  exploreSellTop,
  exploreSellBottom,
  transition,
} from "./main/exploring.js";
import { navbarRes } from "./animateJs/responsive.js";

// generating
import { generateBestSelling, AnimateProduct } from "./main/bestSelling.js";

generateBestSelling();
AnimateProduct();
exploreSellTop();
exploreSellBottom();

// animating
sliderAnimate();
animasiList();
countDown1();
transition();
navbarRes();
clickSlider();
