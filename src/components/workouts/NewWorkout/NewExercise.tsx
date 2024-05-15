const NewExercise = () => {
  return (
    <div
      className="modal fade"
      id="newExercise"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Adaugă un nou exercițiu
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group mb-3">
                <label htmlFor="exerciseName">
                  Introdu numele exercițiului
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exerciseName"
                  placeholder="Ridicări laterale"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="instructions">Descrie modul de execuție</label>
                <input
                  type="text"
                  className="form-control"
                  id="instructions"
                  placeholder="...."
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exerciseThumbnail">
                  Încarcă o imagine de prezentare
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exerciseThubnail"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exerciseVideo">Încarcă un video</label>
                <input
                  type="file"
                  className="form-control"
                  id="exerciseVideo"
                />
              </div>
              <div className="separator d-flex align-items-center mb-3">
                <hr style={{ margin: "0 10px", flex: 1 }} />
                <span>sau</span>
                <hr style={{ margin: "0 10px", flex: 1 }} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="linkExerciseVideo">
                  Adaugă un link către video
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex: https://exemplu.com"
                  id="linkExerciseVideo"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary btnOutline"
              data-bs-dismiss="modal"
            >
              Anulează
            </button>
            <button type="button" className="btn btn-primary text-light">
              Adaugă
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExercise;
