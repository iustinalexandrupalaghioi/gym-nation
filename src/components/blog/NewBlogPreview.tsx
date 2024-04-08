interface Props {
  value: string;
}
const NewBlogPreview = ({ value }: Props) => {
  return (
    <div className="container-fluid my-3 p-3">
      <h2 className="border-bottom pb-2 text-center mb-3">
        Previzualizare articol
      </h2>
      <div
        className="card mt-4 px-4 py-2"
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  );
};

export default NewBlogPreview;
