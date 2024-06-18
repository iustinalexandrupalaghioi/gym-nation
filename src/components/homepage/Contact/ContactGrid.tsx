import ContactForm from "./ContactForm";

const ContactGrid = () => {
  return (
    <section className="container px-4 py-5" id="contactSection">
      <h2 className="pb-2 border-bottom text-center">
        Vrei să urmezi un plan alimentar potrivit pentru tine? <br />
        <span className="text-primary">Contactează-ne</span> Acum!
      </h2>
      <div className="row row-cols-1 row-cols-md-2 align-items-center py-4">
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactGrid;
