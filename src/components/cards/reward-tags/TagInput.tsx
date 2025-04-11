import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { generateLightHexColor, titleCase } from "../../../helpers";
import { useDispatch } from "react-redux";
import { saveCardTagToFirebase } from "../../../redux/actions/cardsActions";

export default function TagInput({
  cardId,
  firebaseUid,
}: {
  cardId: string;
  firebaseUid: string;
}) {
  const [newTag, setNewTag] = useState("");
  const dispatch = useDispatch();

  const handleAddTag = () => {
    if (newTag.trim()) {
      const newTagObject = {
        label: titleCase(newTag.trim()),
        color: generateLightHexColor(),
        description: "",
      };
      dispatch(saveCardTagToFirebase(newTagObject, cardId, firebaseUid));
      setNewTag("");
    }
  };

  return (
    <div className="tag-input-container">
      <input
        className="tag-input-field"
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        placeholder="Add a tag.."
        onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
      />
      <FaChevronRight className="tag-input-add-button" onClick={handleAddTag} />
    </div>
  );
}
