import { features } from "../data/features";
import FeatureCard from "./FeatureCard";

const FeaturesGrid = () => {
  return (
    <section className="container px-4 py-5">
      <h2 className="pb-2 border-bottom">De ce să lucrezi cu noi?</h2>

      <div className="row row-cols-1 align-items-md-start g-5 py-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
