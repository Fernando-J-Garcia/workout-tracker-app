import SprinterColor from "../components/svgs/SprinterColor";
import ContentManColor from "../components/svgs/ContentManColor";

export function getSvgFromCategory(category: string) {
  switch (category) {
    case "cardio":
      return SprinterColor;
    case "flexibility":
      break;
    case "strength":
      break;
  }
  return ContentManColor;
}
