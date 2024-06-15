interface Props {
  styleClass: string;
}
const LoadingButton = ({ styleClass }: Props) => {
  return (
    <button className={styleClass} disabled={true} type="button">
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <span role="status">Se încarcă...</span>
    </button>
  );
};

export default LoadingButton;
