import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { generateLightHexColor } from "../../helpers";
import { TiDelete } from "react-icons/ti";

const RewardTags = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.some((tag) => tag.label === newTag)) {
      const newTagObject = {
        label: newTag.trim(),
        color: generateLightHexColor(),
      };
      setTags((prevTags) => [newTagObject, ...prevTags]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.label !== tagToRemove));
  };

  return (
    <div>
      <h3>Benefit Tags</h3>
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
        {tags.map((tag, index) => (
          <span
            className="tag-span"
            key={index}
            style={{ background: tag.color }}
          >
            {tag.label}

            <TiDelete
              className="tag-remove-button"
              onClick={() => handleRemoveTag(tag.label)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default RewardTags;
