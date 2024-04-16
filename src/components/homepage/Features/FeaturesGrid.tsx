import { features } from "../../../data/features";
import FeatureCard from "./FeatureCard";

const FeaturesGrid = () => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 py-5 g-4 justify-content-center">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
};

export default FeaturesGrid;
