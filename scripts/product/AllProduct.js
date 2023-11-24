export function getProductId(productId) {
  let matchingProduct;

  product.forEach((products) => {
    if (productId === products.id) {
      matchingProduct = products;
    }
  });

  return matchingProduct;
}

const product = [
  {
    id: "GU55IDU",
    foto: "guccibag.png",
    nama: "Gucci duffle bag",
    diskon: 18499680,
    harga: 15249600,
    rating: {
      bintang: 4,
      jumlah: 75,
    },
    keywords: ["fashion", "bag"],
    bsPart: 1,
  },

  {
    id: "TH3C047",
    foto: "672462_ZAH9D_5626_002_100_0000_Light-The-North-Face-x-Gucci-coat.png",
    nama: "The North Coat",
    diskon: 5741280,
    harga: 4146480,
    rating: {
      bintang: 4,
      jumlah: 65,
    },
    keywords: ["fashion", "coat", "mantel", "jas hujan"],
    bsPart: 2,
  },

  {
    id: "B00K53LF",
    foto: "sam-moghadam-khamseh-L_7MQsHl_aU-unsplash 1.png",
    nama: "Small BookSelf",
    diskon: "",
    harga: 5741280,
    rating: {
      bintang: 45,
      jumlah: 55,
    },
    keywords: ["fashion", "bag"],
    bsPart: 3,
  },

  {
    id: "D06F00D",
    foto: "dogfood.png",
    nama: "Breed Dry Dog Food",
    harga: 1593500,
    rating: {
      bintang: 3,
      jumlah: 35,
    },
    keywords: ["dog food", "animal food", "dog"],
    bsPart: 1,
  },

  {
    id: "C4N0N",
    foto: "camera.png",
    nama: "CANON EOS DSLR Camera",
    harga: 5736600,
    rating: {
      bintang: 4,
      jumlah: 95,
    },
    keywords: ["camera", "canon", "canon camera"],
    bsPart: 2,
  },

  {
    id: "F4C3W45H",
    foto: "facewash.png",
    nama: "Curology Product Set",
    harga: 7967500,
    rating: {
      bintang: 4,
      jumlah: 145,
    },
    keywords: ["face wash", "face"],
    bsPart: 4,
  },

  {
    id: "C4RK1D",
    foto: "electricCarWhite.png",
    foto2: "redcar.png",
    nama: "Kids Electric Car",
    harga: 15297600,
    color1: "white",
    color2: "red",
    rating: {
      bintang: 5,
      jumlah: 65,
    },
    keywords: ["kid electric car", "electric car", "kids car"],
    bsPart: 1,
  },

  {
    id: "N1K3Z00M",
    foto: "footballshoeswhite.png",
    foto2: "footballshoesblue.png",
    nama: "NIKE ZOOM MERCURIAL VAPOR 15 Academy FG",
    color1: "white",
    color2: "blue",
    harga: 1912200,
    rating: {
      bintang: 4,
      jumlah: 37,
    },
    keywords: ["football shoes", "soccer", "cleats"],
    bsPart: 2,
  },

  {
    id: "PS5C0N7R0L3R",
    foto: "ps5white.png",
    foto2: "ps5red.png",
    nama: "PLAYSTATION 5 Controller",
    color1: "white",
    color2: "red",
    harga: 765750,
    rating: {
      bintang: 4,
      jumlah: 325,
    },
    keywords: ["controller", "ps5", "ps 5 controller"],
    bsPart: 3,
  },

  {
    id: "J4CK37",
    foto: "regularjacket.png",
    foto2: "redjacket.png",
    nama: "Quilted Satin Jacket",
    color1: "black",
    color2: "red",
    harga: 10517100,
    rating: {
      bintang: 45,
      jumlah: 534,
    },
    keywords: ["face wash", "face"],
    bsPart: 4,
  },

  {
    id: "K3YB04RD",
    foto: "keyboardRGB.png",
    nama: "AK-900 Wired Keyboard",
    diskon: 17892188,
    harga: 14807328,
    rating: {
      bintang: 4,
      jumlah: 75,
    },
    keywords: ["gaming", "keyboard", "gamer", "rgb"],
    fsPart: 1,
  },

  {
    id: "M0N170R",
    foto: "g27cq4-500x5001.png",
    nama: "IPS LCD Gaming Monitor",
    diskon: 6169720,
    harga: 5706991,
    rating: {
      bintang: 5,
      jumlah: 99,
    },
    keywords: ["monitor", "monitor gaming", "gamer"],
    fsPart: 2,
  },

  {
    id: "C0NS0LE",
    foto: "g92-2-500x5001.png",
    nama: "HAVIT HV-G92 Gamepad",
    diskon: 2467888,
    harga: 1850916,
    rating: {
      bintang: 5,
      jumlah: 88,
    },
    keywords: ["console gaming", "console", "gamer"],
    fsPart: 3,
  },

  {
    id: "KUR51",
    foto: "kursi.png",
    nama: "S-Series Comfort Chair ",
    diskon: 6169720,
    harga: 4784112,
    rating: {
      bintang: 45,
      jumlah: 66,
    },
    keywords: ["kursi", "chair"],
    fsPart: 4,
  },

  {
    id: "L4P70P",
    foto: "laptop.png",
    nama: "ASUS FHD Gaming Laptop",
    diskon: "",
    harga: 10797010,
    rating: {
      bintang: 5,
      jumlah: 125,
    },
    keywords: ["electronic", "laptop gaming", "laptop"],
    fsPart: 5,
  },
];
