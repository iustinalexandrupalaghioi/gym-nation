import { Link } from "react-router-dom";
import useMuscles from "../../../hooks/useMuscles";
import useAddWorkout from "../../../hooks/useAddWorkout";

const NewWorkoutForm = () => {
  const { data: muscles } = useMuscles();
  const {
    workout: { title },
    handleChange,
    handleSubmit,
  } = useAddWorkout();
  return (
    <form className="form card border-0 shadow p-4 rounded-4">
      <div className="form-group mb-3">
        <label htmlFor="title">Titlul exercițiului</label>
        <input
          id="title"
          type="text"
          name="title"
          className="form-control"
          placeholder="ex: Antrenament pentru spate"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="muscles">Alege partea corpului corespunzătoare</label>
        <select
          className="form-select"
          onChange={handleChange}
          id="muscles"
          name="muscle"
        >
          <option value="">{"Alege o grupă musculară din listă"}</option>
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
        <label htmlFor="image">Adaugă o imagine reprezentativă</label>
        <input
          onChange={handleChange}
          type="file"
          name="file"
          className="form-control"
          id="image"
        />
      </div>

      <div className="buttons d-flex gap-2 justify-content-end">
        <Link className="btn btn-outline-primary btnOutline" to={"/workouts"}>
          Anulează
        </Link>
        <button className="btn btn-primary text-light" onClick={handleSubmit}>
          Adaugă
        </button>
      </div>
    </form>
  );
};

export default NewWorkoutForm;
