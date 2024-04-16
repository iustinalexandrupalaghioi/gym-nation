import { IconType } from "react-icons";

export default interface Person {
  id: number;
  lname: string;
  fname: string;
  profession: string;
  img: string;
  social: Platform[];
}
interface Platform {
  id: number;
  name: string;
  icon: IconType;
  link: string;
}
