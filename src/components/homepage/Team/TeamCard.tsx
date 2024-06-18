import { createElement } from "react";
import Person from "../../../entities/Person";
import "./TeamCard.css";
interface Props {
  person: Person;
}
const TeamCard = ({
  person: { fname, lname, profession, img, social },
}: Props) => {
  return (
    <div className="card bg-body-tertiary h-100 border-0 rounded-4 position-relative shadow">
      <div className="card-content rounded-5 d-flex flex-column align-items-center p-3 position-relative h-100">
        <img
          className="object-fit-cover rounded-circle border border-4 mt-3 border-light"
          style={{ width: "140px", height: "140px" }}
          src={img}
        />

        <div className="media-icons d-flex align-items-center flex-column gap-1 position-absolute mt-2">
          {social.map(({ id, icon, link }) => (
            <a key={id} href={link} target="_blank" className="text-white fs-5">
              {createElement(icon)}
            </a>
          ))}
        </div>

        <div className="card-body pt-1">
          <h5 className="card-title fw-bold">
            {lname} {fname}
          </h5>
          <p className="card-text">{profession}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
