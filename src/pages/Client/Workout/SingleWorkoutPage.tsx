import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import LoadingStatus from "../../../components/LoadingStatus";
import CollapseMenuItem from "../../../components/dashboard/CollapseMenuItem";
import Header from "../../../components/dashboard/Header";
import ExerciseContent from "../../../components/workouts/SingleWorkoutPage/ExerciseContent";
import ExerciseListItem from "../../../components/workouts/SingleWorkoutPage/ExerciseListItem";
import WorkoutExercise from "../../../components/workouts/SingleWorkoutPage/WorkoutExercise";
import Exercise from "../../../entities/Exercise";
import { Section } from "../../../entities/Workout";

import useExerciseQueryStore from "../../../stores/exerciseQueryStore";
import useUserStatusStore from "../../../stores/userStore";
import ErrorPage from "../ErrorPage";
import useWorkout from "../../../hooks/Workout/useWorkout";

const SingleWorkoutPage = () => {
  const { slug } = useParams();
  const { data: workouts, error, isLoading } = useWorkout("titleSlug", slug!);
  const sections: Section[] = workouts?.result?.[0].data().sections;
  const workout = workouts?.result?.[0];
  const setExercise = useExerciseQueryStore((s) => s.setExercise);
  const {
    userStatus: { isPremium, isAdmin },
  } = useUserStatusStore();

  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //set first exercise to be active
  useEffect(() => {
    if (workouts && workouts.result && workouts.result.length > 0) {
      const firstExercise: Exercise = sections[0].exercises[0];
      firstExercise && setExercise(firstExercise);
    }
  }, [workouts]);

  if (error) return <ErrorPage />;

  if (isAdmin || isPremium) {
    return (
      <>
        <Header />
        {isLoading ? (
          <LoadingStatus />
        ) : (
          <div className="row w-100">
            <WorkoutExercise>
              {sections.map((section) => (
                <CollapseMenuItem
                  key={section.id}
                  styleClass="p-2"
                  menuId={`section-${section.id}`}
                  menuTitle={section.name}
                  isExpanded={true}
                >
                  <ul className="list-group list-group-actions rounded-0">
                    {section.exercises.map((exercise: Exercise) => (
                      <ExerciseListItem
                        key={exercise.nameSlug}
                        exercise={exercise}
                      />
                    ))}
                  </ul>
                </CollapseMenuItem>
              ))}
            </WorkoutExercise>
            <ExerciseContent workout={workout} />
          </div>
        )}
      </>
    );
  }
  return <Navigate to="/account" />;
};

export default SingleWorkoutPage;
