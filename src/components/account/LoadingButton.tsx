interface Props {
  styleClass: string;
  textContent: string;
}
const LoadingButton = ({ styleClass, textContent }: Props) => {
  return (
    <button className={styleClass} disabled={true} type="button">
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <span role="status">{textContent}</span>
    </button>
  );
};

export default LoadingButton;
