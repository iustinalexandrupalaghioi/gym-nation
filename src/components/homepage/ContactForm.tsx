const ContactForm = () => {
  return (
    <div className="col-12 col-md-8 mx-auto">
      <form className="d-flex flex-column gap-3">
        <div className="form-group d-flex gap-2">
          <div className="form-floating w-100">
            <input
              type="text"
              id="lname"
              className="form-control"
              placeholder="Introdu numele tău?"
            />
            <label htmlFor="lname">Nume</label>
          </div>
          <div className="form-floating w-100">
            <input
              type="text"
              id="fname"
              className="form-control"
              placeholder="Introdu prenumele tău"
            />
            <label htmlFor="fname">Prenume</label>
          </div>
        </div>
        <div className="form-floating">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Introdu emailul tău"
          />
          <label htmlFor="email">Adresa de email</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Întrabă-ne orice"
            id="floatingTextarea"
          ></textarea>
          <label htmlFor="floatingTextarea">Cu ce te putem ajuta?</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary d-inline-flex align-self-start text-light"
        >
          Trimite
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
