import { useDispatch } from "react-redux";
import { deleteCardTagFromFirebase } from "../../../redux/actions/cardsActions";
import { TiDelete } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import { Tag as TagType } from "../../../types/cards-types";

type TagProps = {
  tag: TagType;
  index: number;
  cardId: string;
  firebaseUid: string;
  handleTagClick: (tag: TagType) => void;
};
export const Tag = ({
  tag,
  index,
  cardId,
  firebaseUid,
  handleTagClick,
}: TagProps) => {
  const dispatch = useDispatch();
  const handleRemoveTag = (tagToRemove: TagType) => {
    dispatch(deleteCardTagFromFirebase(tagToRemove, cardId, firebaseUid));
  };
  return (
    <span className="tag-span" key={index} style={{ background: tag.color }}>
      {!tag.description && (
        <IoIosAddCircle
          className="tag-edit-button"
          onClick={() => handleTagClick(tag)}
        />
      )}
      <button
        className="clickable-tag-button"
        onClick={() => handleTagClick(tag)}
        disabled={!tag.description}
      >
        {tag.label}
      </button>
      <TiDelete
        className="tag-remove-button"
        onClick={() => handleRemoveTag(tag)}
      />
    </span>
  );
};
