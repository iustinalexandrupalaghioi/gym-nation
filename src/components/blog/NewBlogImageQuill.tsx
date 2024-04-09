interface Props {
  handleChange: (event: any) => void;
}
const NewBlogImage = ({ handleChange }: Props) => {
  return (
    <div className="row my-3">
      <div className="form-group">
        <label htmlFor="image">Adaugă o imagine reprezentativă</label>
        <input
          type="file"
          className="form-control"
          id="image"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default NewBlogImage;
