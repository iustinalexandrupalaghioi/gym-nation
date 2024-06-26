import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import useWorkout from "../../../hooks/Workout/useWorkout";
import slugify from "slugify";
import useGetFileURL from "../../../hooks/useGetFileURL";
import FirebaseClient from "../../../utilities/firebase-client";
import showToast, { Method } from "../../../utilities/showToast";
import LoadingButton from "../../account/LoadingButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  title: z
    .string()
    .min(5, { message: "Introduceți un titlu de cel puțin 5 caractere." }),
  workoutDescription: z
    .string()
    .min(10, { message: "Introduceți o descriere scurtă" }),
});

type FormData = z.infer<typeof schema>;

const firebaseClient = new FirebaseClient("/workouts");

const UpdateWorkoutForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //retrieve data from firestore by workout title slug
  const { titleSlug } = useParams();
  const { data } = useWorkout("titleSlug", titleSlug!);
  const workout = data?.result[0];

  // populate form fields with data from firestore
  useEffect(() => {
    if (workout) {
      setValue("title", workout.data().title);
      setValue("workoutDescription", workout.data().workoutDescription);
    }
  }, [workout]);

  // control input file selection
  const [file, setFile] = useState<File | null>(null);

  const handleSelectFile = (event: FileUploadSelectEvent) => {
    const files = event.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    handleSubmit,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // define mutation function and rename it to updateWorkout
  const { mutateAsync: updateWorkout } = useMutation({
    mutationFn: async (updatedWorkout: any) => {
      const response = await firebaseClient.update(workout!.id, updatedWorkout);
      if (!response) {
        throw new Error("Failed to update workout");
      }
      return response;
    },
    onSuccess: async () => {
      showToast(
        "Antrenamentul a fost actualizat cu succes!",
        Method.Success,
        () => navigate("/admin/workouts")
      );
      await queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: () => {
      showToast("Nu s-a putut efectua acțiunea de actualizare.", Method.Error);
    },
  });

  // submit function handler
  const onSubmit = async (data: FormData) => {
    try {
      const { title, workoutDescription } = data;
      let imageURL = file && (await useGetFileURL(file, "workoutImages"));
      let titleSlug = slugify(title, { replacement: "-", lower: true });

      const newWorkout = {
        title,
        titleSlug,
        workoutDescription,
        ...(imageURL && { imageURL }),
      };

      await updateWorkout(newWorkout);
    } catch (error: any) {
      console.error("Error updating workout:", error);
    } finally {
      reset();
    }
  };

  return (
    <div className="container-fluid px-md-4 py-md-5 p-0">
      <form
        className="form bg-body-tertiary border-0 shadow p-4 rounded-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="title">
            Titlul antrenamentului
          </label>
          <input
            id="title"
            type="text"
            className="form-control border-0"
            placeholder="ex: Antrenament pentru spate"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="description">
            Descrierea antrenamentului
          </label>
          <input
            id="description"
            type="text"
            className="form-control border-0"
            placeholder="ex: Antrenament cuprinzator format din 5 exercitii..."
            {...register("workoutDescription")}
          />
          {errors.workoutDescription && (
            <p className="text-danger">{errors.workoutDescription.message}</p>
          )}
        </div>

        <div className="form-group mb-3">
          <FileUpload
            className="btn btn-dark"
            mode="basic"
            name="image"
            accept="image/*"
            maxFileSize={1000000}
            chooseLabel="&nbsp;Actualizează imaginea"
            onSelect={handleSelectFile}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-info me-2"
          onClick={() => navigate(`/admin/workouts/${titleSlug}/sections`)}
        >
          Anulează
        </button>
        {isSubmitting ? (
          <LoadingButton
            textContent="Procesare..."
            styleClass="btn btn-primary text-light"
          />
        ) : (
          <button type="submit" className="btn btn-primary text-light">
            Salvează
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateWorkoutForm;
