import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { z } from "zod";
import LoadingButton from "../account/LoadingButton";
import showToast, { Method } from "../../utilities/showToast";
import FirebaseClient from "../../utilities/firebase-client";
import { queryClient } from "../../main";
const firebaseClient = new FirebaseClient("/reviews");

const schema = z.object({
  lname: z
    .string()
    .min(3, { message: "Numele trebuie să fie de cel puțin 3 caractere" }),
  fname: z
    .string()
    .min(3, { message: "Prenumele trebuie să fie de cel puțin 3 caractere" }),
  feedback: z
    .string()
    .max(500, { message: "Feedback-ul nu poate depăși 500 de caractere" })
    .min(5, {
      message: "Feedback-ul ar trebui să conțină cel puțin 5 caractere.",
    }),
});

type FormData = z.infer<typeof schema>;

const FeedbackModal = () => {
  const [stars, setStars] = useState(0);
  const starContainerRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const feedback = { ...data, stars };
    try {
      await firebaseClient.post(feedback);
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      showToast("Mulțumim pentru feedback!", Method.Success);
    } catch (error) {
      showToast(
        "Feedback-ul nu a fost trimis. Mai încearcă o dată!",
        Method.Error
      );
    } finally {
      reset();
      setStars(0);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      starContainerRef.current &&
      starContainerRef.current.contains(event.target as Node)
    ) {
      setStars(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStarClick = (index: number) => {
    setStars(index + 1);
  };
  return (
    <div
      className="modal"
      id="feedbackModal"
      aria-labelledby="feedbackModalLabel"
      aria-hidden="true"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Formular pentru Feedback</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body bg-body-tertiary">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex gap-2 flex-column flex-md-row">
                <div className="form-group mb-3">
                  <label htmlFor="lname" className="text-body-secondary">
                    Nume
                  </label>
                  <input
                    type="text"
                    id="lname"
                    placeholder="Popescu"
                    className="form-control border-0 w-100"
                    {...register("lname")}
                  />
                  {errors.lname && (
                    <p className="text-danger"> {errors.lname.message} </p>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="fname" className="text-body-secondary">
                    Prenume
                  </label>
                  <input
                    type="text"
                    id="fname"
                    placeholder="Andrei"
                    className="form-control border-0 w-100"
                    {...register("fname")}
                  />
                  {errors.fname && (
                    <p className="text-danger"> {errors.fname.message} </p>
                  )}
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="feedback" className="text-body-secondary">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  rows={5}
                  className="form-control border-0"
                  placeholder="Scrie cum te-au ajutat serviciile noastre sau ce ai îmbunătăți..."
                  {...register("feedback")}
                ></textarea>
                {errors.feedback && (
                  <p className="text-danger"> {errors.feedback.message} </p>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="rating">Rating</label>
                <div id="rating" className="d-flex" ref={starContainerRef}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className="text-primary cursor-pointer fs-4"
                    >
                      {index < stars ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-info"
                  data-bs-dismiss="modal"
                >
                  Anulează
                </button>
                {isSubmitting ? (
                  <LoadingButton
                    textContent="Se trimite..."
                    styleClass="btn btn-primary text-light"
                  />
                ) : (
                  <button type="submit" className="btn btn-primary text-light">
                    Trimite Feedback
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
