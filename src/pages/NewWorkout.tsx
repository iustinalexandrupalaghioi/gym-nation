import useEquipment from "../hooks/useEquipment";
import useIntensityLevels from "../hooks/useIntensityLeves";
import useMuscles from "../hooks/useMuscles";

const NewWorkout = () => {
  const { data: muscles } = useMuscles();
  const { data: equipmentList } = useEquipment();
  const { data: intensityLevels } = useIntensityLevels();

  return (
    <div className="container px-4 py-5 vh-100">
      <form className="form card border-0 shadow p-4 rounded-4">
        <div className="row row-cols-1 row-cols-2">
          <div className="col">
            <div className="form-group mb-3">
              <label htmlFor="title">Titlul exercițiului</label>
              <input
                id="title"
                type="text"
                name="title"
                className="form-control"
                placeholder="ex: Antrenament pentru spate"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description">Explică pe scurt exercițiul</label>
              <input
                id="description"
                type="text"
                name="description"
                className="form-control"
                placeholder="ex: Împins la piept cu bara - execută mișcările încet și controlat"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="muscles">
                Alege partea corpului corespunzătoare
              </label>
              <select className="form-select" id="muscles">
                <option value="">{"Alege un mușchi din listă"}</option>
                {muscles?.result.map(
                  (option, index) =>
                    option.data().slug !== "" && (
                      <option key={index} value={option.data().slug}>
                        {option.data().name}
                      </option>
                    )
                )}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="equipment">Alege echipamentul necesar</label>
              <select name="equipment" className="form-select" id="equipment">
                <option value="">{"Alege echipamentul din listă"}</option>
                {equipmentList?.result.map(
                  (option, index) =>
                    option.data().slug !== "" && (
                      <option key={index} value={option.data().slug}>
                        {option.data().name}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
          <div className="col">
            <div className="form-group mb-3">
              <label htmlFor="intensity">Alege nivelul de intensitate</label>
              <select name="intensity" className="form-select" id="intensity">
                <option value="">
                  {"Alege nivelul de intensitate din listă"}
                </option>
                {intensityLevels?.result.map(
                  (option, index) =>
                    option.data().slug !== "" && (
                      <option key={index} value={option.data().slug}>
                        {option.data().name}
                      </option>
                    )
                )}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="image">Adaugă o imagine reprezentativă</label>
              <input
                type="file"
                name="file"
                className="form-control"
                id="image"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="video">
                Adaugă un video pentru acest exercițiu
              </label>
              <input
                type="text"
                name="video-link"
                className="form-control"
                placeholder="Introdu linkul către video aici"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="videoUpload">Încarcă din fișierele locale</label>
              <input
                type="file"
                name="file"
                className="form-control"
                id="videoUpload"
              />
            </div>
          </div>
        </div>
        <div className="buttons d-flex gap-2 justify-content-end">
          <button className="btn btn-outline-primary btnOutline">
            Anulează
          </button>
          <button className="btn btn-primary text-light">Încarcă</button>
        </div>
      </form>
    </div>
  );
};

export default NewWorkout;
