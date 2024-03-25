import { features } from "../data/features";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="container px-4 py-5 d-flex  flex-column align-items-center">
      <h2 className="pb-2 border-bottom">De ce să lucrezi cu noi?</h2>
      {features.map((feature) => (
        <FeatureCard feature={feature} />
      ))}
    </div>
  );
};

export default Features;
