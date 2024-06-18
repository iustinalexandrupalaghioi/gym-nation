import { GrFormAdd } from "react-icons/gr";
import { SetStateAction, useEffect } from "react";
import useAddWorkout from "../../../hooks/useAddWorkout";
import useMuscles from "../../../hooks/useMuscles";
import Workout from "../../../entities/Workout";
import ToastAlert from "../../ToastAlert";
import showToast, { Method } from "../../../utilities/showToast";

interface Props {
  workout: Workout;
  setWorkout: React.Dispatch<SetStateAction<Workout>>;
}

const NewWorkoutForm = ({ workout, setWorkout }: Props) => {
  const { data: muscles } = useMuscles();
  const {
    workout: { title, workoutDescription, price },
    errors,
    handleChange,
    handleSubmit,
  } = useAddWorkout(workout, setWorkout);

  useEffect(() => {
    if (errors.exercises) {
      showToast(errors.exercises, Method.Warning);
    }
  }, [errors.exercises]);

  return (
    <div className="container-fluid px-md-4 py-md-5 p-0">
      <ToastAlert />
      <form
        className="form bg-body-tertiary border-0 shadow p-4 rounded-4"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="title">
            Titlul antrenamentului
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="form-control border-0"
            placeholder="ex: Antrenament pentru spate"
            value={title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-danger">{errors.title}</p>}
        </div>

        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="description">
            Descrierea antrenamentului
          </label>
          <input
            id="description"
            type="text"
            name="workoutDescription"
            className="form-control border-0"
            placeholder="ex: Antrenament cuprinzator format din 5 exercitii..."
            value={workoutDescription}
            onChange={handleChange}
          />
          {errors.workoutDescription && (
            <p className="text-danger">{errors.workoutDescription}</p>
          )}
        </div>

        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="price">
            Prețul antrenamentului (lei)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            className="form-control border-0"
            placeholder="ex: 255"
            value={price}
            onChange={handleChange}
          />
          {errors.price && <p className="text-danger">{errors.price}</p>}
        </div>

        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="muscles">
            Alege partea corpului corespunzătoare
          </label>
          <select
            className="form-select border-0"
            onChange={handleChange}
            id="muscles"
            name="muscleSlug"
          >
            <option value="">{"Alege din listă"}</option>
            {muscles?.result.map(
              (option, index) =>
                option.data().slug !== "" && (
                  <option key={index} value={option.data().slug}>
                    {option.data().name}
                  </option>
                )
            )}
          </select>
          {errors.muscleSlug && (
            <p className="text-danger">{errors.muscleSlug}</p>
          )}
        </div>

        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="image">
            Adaugă o imagine
          </label>
          <input
            onChange={handleChange}
            type="file"
            name="image"
            className="form-control border-0"
            id="image"
          />
          {errors.image && <p className="text-danger">{errors.image}</p>}
        </div>

        <div className="buttons d-flex gap-2 justify-content-between">
          <button
            className="btn btn-primary align-self-start text-light d-inline-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#newExercise"
            type="button"
          >
            <GrFormAdd size={"24px"} /> Exerciții
          </button>

          <div className="action-buttons d-flex gap-2">
            <button className="btn btn-primary text-light" type="submit">
              Salvează
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewWorkoutForm;
