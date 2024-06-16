import { ChangeEvent, FormEvent, useState } from "react";
import slugify from "slugify";
import { queryClient } from "../../../main";
import FirebaseClient from "../../../utilities/firebase-client";
import ToggleModalButton from "../../dashboard/ToggleModalButton";
import Modal from "../../dashboard/Modal";

const firebaseClient = new FirebaseClient("/muscles");
const NewGroupModal = () => {
  const [muscleGroup, setMuscleGroup] = useState<string>("");

  const [isActive, setActive] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let muscleGroupSlug = slugify(muscleGroup, {
      replacement: "-",
      lower: true,
    });
    try {
      await firebaseClient.post({ name: muscleGroup, slug: muscleGroupSlug });
      await queryClient.invalidateQueries({ queryKey: ["muscles"] });
      setMuscleGroup("");
      alert("Grupa de mușschi a fost adaugata cu succes!");
    } catch (error: any) {
      alert("Eroare la adaugarea noii grupe musculare.");
    }
  };
  return (
    <>
      <ToggleModalButton
        isActive={isActive}
        setActive={setActive}
        textContent="Adaugă Grupă de Mușchi"
        modalId="newGroupModal"
      />

      <Modal
        modalId="newGroupModal"
        modalTitle="Adaugă o Grupă de Mușchi Nouă"
        handleSubmit={handleSubmit}
        setActive={setActive}
      >
        <div className="form-group mb-3">
          <label htmlFor="muscleGroup">Denumire:</label>
          <input
            value={muscleGroup}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setMuscleGroup(event.target.value)
            }
            type="text"
            className="form-control"
            id="muscleGroup"
            placeholder="ex: Biceps femural"
          />
        </div>
      </Modal>
    </>
  );
};

export default NewGroupModal;
