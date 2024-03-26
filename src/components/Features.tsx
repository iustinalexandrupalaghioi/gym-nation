import { features } from "../data/features";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section className="container py-5 mt-5" id="features">
      <h2 className="pb-2 border-bottom text-center">
        De ce să lucrezi cu noi?
      </h2>
      <div className="row row-cols-1 justify-content-center pt-2">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;
