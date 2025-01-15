import React from "react";
import { useDispatch } from "react-redux";
import { deleteCardTagFromFirebase } from "../../../redux/actions/cardsActions";
import { TiDelete } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";

export const Tag = ({ tag, index, cardId, firebaseUid, handleTagClick }) => {
  const dispatch = useDispatch();
  const handleRemoveTag = (tagToRemove) => {
    dispatch(deleteCardTagFromFirebase(tagToRemove, cardId, firebaseUid));
  };
  return (
    <span className="tag-span" key={index} style={{ background: tag.color }}>
      <button
        className="clickable-tag-button"
        onClick={() => handleTagClick(tag)}
        disabled={!tag.description}
      >
        {tag.label}
      </button>
      <div>
        {!tag.description && (
          <IoIosAddCircle
            className="tag-edit-button"
            onClick={() => handleTagClick(tag)}
          />
        )}
        <TiDelete
          className="tag-remove-button"
          onClick={() => handleRemoveTag(tag)}
        />
      </div>
    </span>
  );
};
