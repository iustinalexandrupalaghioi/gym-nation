import { IconType } from "react-icons";
import { BiDumbbell, BiBookOpen } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";

const iconsMapping: { [key: string]: IconType } = {
  antrenamente: BiDumbbell,
  nutritie: GiKnifeFork,
  blog: BiBookOpen,
};
const features = [
  {
    id: 1,
    title: "Planuri de antrenament",
    description:
      "Primești planuri de antrenament pentru adaptate obiectivelor tale individuale și echipamentului disponibil.",
    icon: iconsMapping["antrenamente"],
  },
  {
    id: 2,
    title: "Nutriție și dietă",
    description:
      "Sesiuni dedicate pentru recomandări de alimentație și planuri de masă personalizate pentru a susține obiectivele tale de fitness.",
    icon: iconsMapping["nutritie"],
  },
  {
    id: 3,
    title: "Blog și resurse educaționale",
    description:
      "Secțiunea blogului oferă conținut util și informativ despre sănătate, fitness, nutriție și motivație.",
    icon: iconsMapping["blog"],
  },
];

export default features;
