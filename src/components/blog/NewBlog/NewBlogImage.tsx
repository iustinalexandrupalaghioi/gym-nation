interface Props {
  handleChange: (event: any) => void;
}
const NewBlogImage = ({ handleChange }: Props) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor="image">Adaugă o imagine reprezentativă</label>
      <input
        type="file"
        name="file"
        className="form-control"
        id="image"
        onChange={handleChange}
      />
    </div>
  );
};

export default NewBlogImage;
