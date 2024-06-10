import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const WorkoutExercise = ({ children }: Props) => {
  return (
    <aside className="col-12 col-md-4">
      <ul className="list-group shadow">{children}</ul>
    </aside>
  );
};

export default WorkoutExercise;
