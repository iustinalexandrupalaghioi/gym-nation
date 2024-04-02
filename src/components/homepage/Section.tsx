import { ReactNode } from "react";
interface Props {
  title: string;
  sectionId: string;
  children: ReactNode;
}
const Section = ({ sectionId, title, children }: Props) => {
  return (
    <section className="container px-4 py-5" id={sectionId}>
      <h2 className="pb-2 border-bottom text-center">{title}</h2>
      {children}
    </section>
  );
};

export default Section;
