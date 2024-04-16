import { IconType } from "react-icons";
import {
  BiDumbbell,
  BiLineChart,
  BiBookOpen,
  BiGroup,
  BiBarChart,
} from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";

const iconsMapping: { [key: string]: IconType } = {
  antrenamente: BiDumbbell,
  nutritie: GiKnifeFork,
  monitorizare: BiLineChart,
  blog: BiBookOpen,
  comunitate: BiGroup,
  "antrenamente-live": BiBarChart,
};
const features = [
  {
    id: 1,
    title: "Planuri personalizate de antrenament",
    description:
      "Primești planuri de antrenament personalizate adaptate obiectivelor tale individuale, nivelului de fitness și echipamentului disponibil.",
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
    title: "Video call-uri personalizate",
    description:
      "Ai posibilitatea de a programa sesiuni individuale de video call cu antrenorii pentru a primi sfaturi personalizate.",
    icon: iconsMapping["antrenamente-live"],
  },
  {
    id: 4,
    title: "Sesiuni de antrenament live",
    description:
      "Antrenorii cu experiență conduc sesiuni de antrenament live pe platformă, unde te poți alătura pentru a obține îndrumare directă, corectare a formei și motivare suplimentară",
    icon: iconsMapping["antrenamente-live"],
  },
  {
    id: 5,
    title: "Monitorizarea progresului",
    description:
      "Îți monitorizăm progresul  în ceea ce privește fitnessul și nutriția, inclusiv greutatea, circumferința, performanța la antrenamente și consumul alimentar.",
    icon: iconsMapping["monitorizare"],
  },
  {
    id: 6,
    title: "Blog și resurse",
    description:
      "Secțiunea blogului oferă conținut util și informativ despre sănătate, fitness, nutriție și motivație.",
    icon: iconsMapping["blog"],
  },
  {
    id: 7,
    title: "Baza de date extensivă de exerciții",
    description:
      "Ai acces la o gamă largă de exerciții cu instrucțiuni video și descrieri detaliate, care acoperă diferite grupuri musculare și nivele de dificultate.",
    icon: iconsMapping["comunitate"],
  },
  {
    id: 8,
    title: "Suntem o comunitate",
    description:
      "Nu un simplu serviciu de fitness, ci o comunitate dedicată transformării și îmbunătățirii vieții tale.",
    icon: iconsMapping["comunitate"],
  },
];
export default features;
