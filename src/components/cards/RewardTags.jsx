import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
import { generateLightHexColor, titleCase } from "../../helpers";
import { TiDelete } from "react-icons/ti";
import { APP_COLOR_BLUE } from "../../constants";
import {
  deleteCardTagFromFirebase,
  saveCardTagToFirebase,
} from "../../redux/actions/cardsActions";

const RewardTags = ({ tags, cardId, firebaseUid }) => {
  const [newTag, setNewTag] = useState("");
  const dispatch = useDispatch();

  const handleAddTag = () => {
    if (newTag.trim()) {
      const newTagObject = {
        label: titleCase(newTag.trim()),
        color: generateLightHexColor(),
      };
      dispatch(saveCardTagToFirebase(newTagObject, cardId, firebaseUid));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    dispatch(deleteCardTagFromFirebase(tagToRemove, cardId, firebaseUid));
  };

  return (
    <div>
      <h4 style={{ color: APP_COLOR_BLUE }}>Benefit Tags</h4>
      <div className="reward-tags-container">
        <div className="tag-input-container">
          <input
            className="tag-input-field"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag.."
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />
          <FaChevronRight
            className="tag-input-add-button"
            onClick={handleAddTag}
          />
        </div>
        {tags?.map((tag, index) => (
          <span
            className="tag-span"
            key={index}
            style={{ background: tag.color }}
          >
            {tag.label}

            <TiDelete
              className="tag-remove-button"
              onClick={() => handleRemoveTag(tag)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default RewardTags;
