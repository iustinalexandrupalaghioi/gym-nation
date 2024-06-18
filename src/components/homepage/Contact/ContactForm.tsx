import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  lname: z
    .string({
      invalid_type_error: "Numele introdus nu este un șir de caractere valid",
    })
    .min(3, { message: "Numele trebuie să fie de cel puțin 3 caractere" }),
  fname: z
    .string({
      invalid_type_error: "Numele introdus nu este un șir de caractere valid",
    })
    .min(3, { message: "Numele trebuie să fie de cel puțin 3 caractere" }),
  email: z
    .string()
    .email({ message: "Adresa introdusă nu este o adresă de email validă" }),
  emailBody: z.string().max(500, {
    message: "Mesajul nu trebuie să depășească 500 de caractere.",
  }),
});

type FormData = z.infer<typeof schema>;
const ContactForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // const formRef = useRef<HTMLFormElement>(null);
  // const onSubmit = async (data: FormData) => {
  //   const { lname, fname, email, emailBody } = data;
  //   const user_name = fname + " " + lname;
  //   const from_user = email;
  //   const message = emailBody;
  //   const serviceId: string = import.meta.env.VITE_SERVICE_ID;
  //   const templateId: string = import.meta.env.VITE_TEMPLATE_ID;
  //   const publickkey: string = import.meta.env.VITE_PUBLIC_KEY;
  //   await emailjs.sendForm(serviceId, templateId, formRef.current, {
  //     publicKey: publickkey,
  //   });
  // };
  return (
    <div className="col-12 col-md-8 mx-auto">
      <form className="p-4 p-md-5 border-0 shadow rounded-3 bg-body-tertiary">
        <div className="d-flex gap-2 flex-column flex-md-row">
          <div className="form-group mb-3 w-100">
            <label className="text-body-secondary" htmlFor="fname">
              Nume
            </label>
            <input
              type="text"
              className="form-control border-0"
              id="lname"
              placeholder="Popescu"
              {...register("lname")}
            />
            {errors.lname && (
              <p className="text-danger"> {errors.lname.message} </p>
            )}
          </div>
          <div className="form-group w-100 mb-3">
            <label className="text-body-secondary" htmlFor="lname">
              Prenume
            </label>
            <input
              type="text"
              className="form-control border-0"
              id="fname"
              placeholder="Marian"
              {...register("fname")}
            />
            {errors.fname && (
              <p className="text-danger"> {errors.fname.message} </p>
            )}
          </div>
        </div>
        <div className="form-group mb-3 text-body-secondary">
          <label htmlFor="email" className="text-body-secondary">
            Adresa de email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="form-control border-0"
            placeholder="email@gmail.com"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group mb-3 text-body-secondary">
          <label htmlFor="floatingTextarea" className="text-body-secondary">
            Cu ce te putem ajuta?
          </label>
          <textarea
            className="form-control border-0"
            placeholder="Cu ce te putem ajuta?"
            {...register("emailBody")}
            id="floatingTextarea"
          ></textarea>
          {errors.emailBody && (
            <p className="text-danger">{errors.emailBody.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary d-inline-flex justify-content-end text-light"
        >
          Trimite mesaj
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
