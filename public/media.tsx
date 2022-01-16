import media1 from "./veggierice.jpg";
import media2 from "./hummus.jpg";
import media3 from "./custardberries.jpg";
import media4 from "./ravioli.jpg";
import media5 from "./greencurry.jpg";
import { FeaturedRecipes } from "../lib/types";

export const media: FeaturedRecipes = {
  0: {
    img: media1,
    url: "/veggierice",
    title: "Jasmine Rice with Broccoli, Mushrooms and Cashews",
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
    title: "Handmade Mushroom Ravioli",
  },
  4: {
    img: media5,
    url: "/greencurry",
    title: "Thai Green Vegetable Curry",
  },
};
