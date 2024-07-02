import { MdEdit } from "react-icons/md";
import LoadingButton from "../../account/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import showToast, { Method } from "../../../utilities/showToast";
import { z } from "zod";
import { Section } from "../../../entities/Workout";
import FirebaseClient from "../../../utilities/firebase-client";
import { DocumentData } from "firebase/firestore";
import useFetchWorkouts from "../../../hooks/Workout/useFetchWorkouts";

const schema = z.object({
  name: z.string().min(5, {
    message:
      "Denumirea unei secțiuni trebuie să respecte lungimea de minim 5 caractere",
  }),
});

const firebaseClient = new FirebaseClient("/workouts");
type FormData = z.infer<typeof schema>;
interface Props {
  modalId: string;
  section: Section;
  workoutId: string | undefined;
  onUpdateSection: () => void;
}
const UpdateSectionModal = ({
  modalId,
  section,
  workoutId,
  onUpdateSection,
}: Props) => {
  const { data: workouts } = useFetchWorkouts();
  const currentWorkout = workouts?.result.find((w) => w.id === workoutId);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // populate form fields with data from firestore
  useEffect(() => {
    if (section) {
      setValue("name", section.name);
    }
  }, [section]);

  // define mutation function and rename it to updateSection
  const { mutateAsync: updateSection } = useMutation({
    mutationFn: async (updatedWorkout: DocumentData) => {
      const response = await firebaseClient.update(workoutId!, updatedWorkout);
      if (!response) {
        throw new Error("Failed to update section");
      }
      return response;
    },
    onSuccess: async () => {
      showToast("Secșiunea a fost actualizată cu succes!", Method.Success);
      onUpdateSection();
    },
    onError: () => {
      showToast("Nu s-a putut efectua acțiunea de actualizare.", Method.Error);
    },
  });
  const onSubmit = async (data: FormData) => {
    const updatedSections = currentWorkout
      ?.data()
      .sections.map((s: Section) => {
        if (s.id === section.id) {
          return { ...s, name: data.name };
        } else {
          return s;
        }
      });

    const newWorkout = {
      ...currentWorkout?.data(),
      sections: updatedSections,
    };
    try {
      await updateSection(newWorkout);
    } finally {
      reset();
    }
  };
  return (
    <>
      <>
        <button
          className="btn btn-outline-info d-inline-flex justify-content-center align-items-center me-2 mb-2"
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
        >
          <MdEdit />
        </button>
        <div
          className="modal fade"
          id={modalId}
          tabIndex={-1}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog ">
            <div className="modal-content ">
              <div className="modal-header">
                <h1
                  className="modal-title text-light fs-5"
                  id="staticBackdropLabel"
                >
                  Actualizează secțiunea
                </h1>
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
                    <label className="text-body-secondary" htmlFor="name">
                      Denumire:
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className="form-control border-0"
                      id="name"
                      placeholder="ex: Biceps femural"
                    />
                    {errors.name && (
                      <p className="text-danger"> {errors.name.message}</p>
                    )}
                  </div>
                  <div className="modal-footer d-flex align-items-end gap-1">
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      data-bs-dismiss="modal"
                    >
                      Anulează
                    </button>
                    {isSubmitting ? (
                      <LoadingButton
                        styleClass="btn btn-primary text-light"
                        textContent="Procesare..."
                      />
                    ) : (
                      <button
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalId}`}
                        className="btn btn-primary text-light"
                      >
                        Salvează modificările
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default UpdateSectionModal;
