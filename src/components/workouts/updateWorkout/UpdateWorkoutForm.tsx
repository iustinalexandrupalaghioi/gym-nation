import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "primereact/fileupload";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  title: z
    .string()
    .min(5, { message: "Introduceți un titlu de cel puțin 5 caractere." }),
  workoutDescription: z
    .string()
    .min(10, { message: "Introduceți o descriere scurtă" }),
});

type FormData = z.infer<typeof schema>;

const UpdateWorkoutForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  return (
    <div className="container-fluid px-md-4 py-md-5 p-0">
      <form className="form bg-body-tertiary border-0 shadow p-4 rounded-4">
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
            chooseLabel="&nbsp;Încarcă o imagine"
          />
        </div>
        {/* {errors.image && <p className="text-danger">{errors.image}</p>} */}
        <button type="button" className="btn btn-outline-info">
          Anulează
        </button>

        <button type="submit" className="btn btn-primary text-light">
          Salvează
        </button>
      </form>
    </div>
  );
};

export default UpdateWorkoutForm;
