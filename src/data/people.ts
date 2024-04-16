import { IconType } from "react-icons";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";

const iconsMapping: { [key: string]: IconType } = {
  facebook: FaFacebookSquare,
  instagram: FaInstagramSquare,
  linkedin: FaLinkedin,
};

const people = [
  {
    id: 1,
    lname: "Palaghioi",
    fname: "Iustin-Alexandru",
    profession:
      "Iustin este un antrenor cu experienta in fitness si nutritie, dedicat sa te ajute sa iti atingi obiectivele de fitness si sa iti imbunatatesti sanatatea.",
    img: "/images/eu.jpg",
    social: [
      { id: 1, name: "facebook", icon: iconsMapping["facebook"], link: "" },
      { id: 2, name: "instagram", icon: iconsMapping["instagram"], link: "" },
      { id: 3, name: "linkedin", icon: iconsMapping["linkedin"], link: "" },
    ],
  },
  {
    id: 2,
    lname: "Flocea",
    fname: "Alexandru",
    profession:
      "Alex este specializat in antrenamentul de masa musculara si poate sa te ajute sa iti construiesti un corp tonifiat si puternic",
    img: "/images/flocea.jpg",
    social: [
      { id: 1, name: "facebook", icon: iconsMapping["facebook"], link: "" },
      { id: 2, name: "instagram", icon: iconsMapping["instagram"], link: "" },
      { id: 3, name: "linkedin", icon: iconsMapping["linkedin"], link: "" },
    ],
  },
  {
    id: 3,
    lname: "Caraene",
    fname: "Andreea",
    profession:
      "Andreea este specializată in antrenamentul de cardio si poate sa iti ofere o varietate de exercitii pentru a-ti imbunatati rezistenta si performanta fizica.",
    img: "/images/and.png",
    social: [
      { id: 1, name: "facebook", icon: iconsMapping["facebook"], link: "" },
      { id: 2, name: "instagram", icon: iconsMapping["instagram"], link: "" },
      { id: 3, name: "linkedin", icon: iconsMapping["linkedin"], link: "" },
    ],
  },
];
export default people;
