import { Link } from "react-router-dom";
import { GrFormAdd } from "react-icons/gr";
import { SetStateAction } from "react";
import useAddWorkout from "../../../hooks/useAddWorkout";
import useMuscles from "../../../hooks/useMuscles";
import Workout from "../../../entities/Workout";

interface Props {
  workout: Workout;
  setWorkout: React.Dispatch<SetStateAction<Workout>>;
}
const NewWorkoutForm = ({ workout, setWorkout }: Props) => {
  const { data: muscles } = useMuscles();
  const {
    workout: { title, workoutDescription, price },
    handleChange,
    handleSubmit,
  } = useAddWorkout(workout, setWorkout);

  return (
    <div className="container-fluid px-md-4 py-md-5 p-0">
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
        </div>

        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="muscles">
            Alege partea corpului corespunzătoare
          </label>
          <select
            className="form-select border-0"
            onChange={handleChange}
            id="muscles"
            name="muscle"
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
        </div>
        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="image">
            Adaugă o imagine
          </label>
          <input
            onChange={handleChange}
            type="file"
            name="workoutImage"
            className="form-control border-0"
            id="image"
          />
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
            <Link className="btn btn-outline-info" to={"/workouts"}>
              Anulează
            </Link>
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
