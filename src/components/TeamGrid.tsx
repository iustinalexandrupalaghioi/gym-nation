import { people } from "../data/people";
import TeamCard from "./TeamCard";

const TeamGrid = () => {
  return (
    <div className="container px-4 py-5 team" id="featured-3">
      <h2 className="pb-2 border-bottom">Echipa noastră</h2>
      <div className="row g-5 py-5 row-cols-3 justify-content-center">
        {people.map((person, index) => (
          <div
            key={index}
            className="col"
            style={{ width: "22rem", minHeight: "max-content" }}
          >
            <TeamCard person={person} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
