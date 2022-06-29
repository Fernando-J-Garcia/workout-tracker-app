import SprinterColor from "../components/svgs/SprinterColor";
import ContentManColor from "../components/svgs/ContentManColor";
import AbsMan from "../components/svgs/AbsMan";
import BicepMan from "../components/svgs/BicepMan";
import Quadriceps from "../components/svgs/Quadriceps";

export function getSvgFromCategory(category: string | number) {
  switch (category) {
    case "Abs":
    case 10:
      return AbsMan;
    case "Arms":
    case 8:
      return BicepMan;
    case "flexibility":
      break;
    case "Calves":
      return SprinterColor;
    case "Legs":
    case 9:
      return Quadriceps;
  }
  return ContentManColor;
}
