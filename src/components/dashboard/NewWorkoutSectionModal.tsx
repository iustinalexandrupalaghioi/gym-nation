import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SetStateAction } from "react";
import Workout from "../../entities/Workout";
import showToast, { Method } from "../../utilities/showToast";
import LoadingButton from "../account/LoadingButton";
import { GrFormAdd } from "react-icons/gr";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Numele trebuie să fie de cel puțin 3 caractere" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  numberOfSections: number;
  setWorkout: React.Dispatch<SetStateAction<Workout>>;
}
const NewWorkoutSectionModal = ({ numberOfSections, setWorkout }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      //set new section for workout on submit
      setWorkout((prev) => ({
        ...prev,
        sections: [
          ...prev.sections,
          { id: numberOfSections, name: data.name, exercises: [] },
        ],
      }));

      showToast("Secțiunea a fost adăugată cu succes!", Method.Success);
    } catch (error) {
      showToast("Ceva nu a funcționat.", Method.Error);
    } finally {
      reset();
    }
  };

  return (
    <div
      className="modal"
      id="newSection"
      aria-labelledby="newSectionModal"
      aria-hidden="true"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Adaugă o secțiune nouă pentru antrenamentul nou
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body bg-body-tertiary">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <label htmlFor="lname" className="text-body-secondary">
                  Denumire Secțiune:
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Antrenament Complet de Tras"
                  className="form-control border-0"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-danger"> {errors.name.message} </p>
                )}
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  className="btn btn-primary text-light d-flex align-items-center align-self-start"
                  data-bs-toggle="modal"
                  data-bs-target="#newExercise"
                  type="button"
                >
                  <GrFormAdd size={"24px"} /> Exerciții
                </button>

                <div className="buttons d-flex gap-2 flex-column flex-md-row justify-content-between">
                  {isSubmitting ? (
                    <LoadingButton
                      textContent="Procesare.."
                      styleClass="btn btn-primary text-light d-flex justify-content-center align-items-center"
                    />
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary text-light d-flex justify-content-center align-items-center"
                    >
                      Salvează
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-outline-info d-flex justify-content-center align-items-center"
                    onClick={() => {
                      setWorkout({
                        title: "",
                        workoutDescription: "",
                        price: "",
                        muscleSlug: "",
                        image: null,
                        sections: [],
                      });
                      reset();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Anulează
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWorkoutSectionModal;
