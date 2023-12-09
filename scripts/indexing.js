import { animasiList } from "./animateJs/listPart.js";
import { sliderAnimate } from "./animateJs/slider.js";
import { countDown1 } from "./utils/countDown.js";
import {
  exploreSellTop,
  exploreSellBottom,
  transition,
} from "./main/exploring.js";
import { showSearch } from "./utils/search.js";

// generating
import { fSale, fSaleHover } from "./main/flashSale.js";
import { generateBestSelling, AnimateProduct } from "./main/bestSelling.js";

generateBestSelling();
AnimateProduct();
exploreSellTop();
exploreSellBottom();
fSale();

// animating
sliderAnimate();
animasiList();
countDown1();
transition();
fSaleHover();
showSearch();
