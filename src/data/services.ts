export const services = [
  {
    id: 1,
    title: "Antrenamente în sală",
    img: "/images/bodybuilding.avif",
  },
  {
    id: 2,
    title: "Antrenamente acasă",
    img: "/images/homeworkout.jpg",
  },
  {
    id: 3,
    title: "Antrenamente în aer liber",
    img: "/images/outsideworkout.jpg",
  },
  {
    id: 4,
    title: "Alimentație pentru masa musculară",
    img: "/images/mentinere-masa.jpg",
  },
  {
    id: 5,
    title: "Deficit caloric pentru slăbire",
    img: "/images/deficitcaloric.avif",
  },
  {
    id: 6,
    title: "Alimentație sănătoasă pur și simplu",
    img: "/images/justhealthy.jpg",
  },
];
export interface Service {
  id: number;
  title: string;
  img: string;
}
