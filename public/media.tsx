import media1 from "./french-toast-rsz.jpg";
import media2 from "./hummus.jpg";
import media3 from "./lasagna.jpg";
import media4 from "./ravioli.jpg";
import media5 from "./croissant.jpg";
import media6 from "./french-toast-1.jpg";
import { FeaturedRecipes } from "../lib/types";

// export const media = [media1, media2, media3, media4, media5];

// export const mediaByIndex = (index: number) => media[index % media.length];

export const media: FeaturedRecipes = {
  0: {
    img: media1,
    url: "/frenchtoast",
    title: "French Toasts",
  },
  1: {
    img: media2,
    url: "/hummus",
    title: "Hummus",
  },
  2: {
    img: media3,
    url: "/custardberries",
    title: "Custard Tart with Berries",
  },
  3: {
    img: media4,
    url: "/ravioli",
    title: "Ravioli",
  },
  4: {
    img: media5,
    url: "/croissant",
    title: "Croissant",
  },
};
