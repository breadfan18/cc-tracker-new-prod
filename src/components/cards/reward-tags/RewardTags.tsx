import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  APP_COLOR_BLUE,
  DELETE_COLOR_RED,
  EDIT_COLOR_GREEN,
} from "../../../constants";
import { saveCardTagToFirebase } from "../../../redux/actions/cardsActions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaCheckCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect } from "react";
import TagInput from "./TagInput";
import { Tag } from "./Tag";
import { Tag as TagType } from "../../../types/cards-types";

type RewardTagsProps = {
  tags: TagType[];
  cardId: string;
  firebaseUid: string;
};

const baseTag = {
  description: "",
  color: "",
  label: "",
};

const RewardTags = ({ tags, cardId, firebaseUid }: RewardTagsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagType>(baseTag);
  const [tagDescription, setTagDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing || !selectedTag?.description) {
      textAreaRef?.current?.focus();
    }
  }, [isEditing, selectedTag]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setTagDescription(tag.description || "");
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSaveDescription = () => {
    const updatedTag = { ...selectedTag, description: tagDescription };
    dispatch(saveCardTagToFirebase(updatedTag, cardId, firebaseUid));
    setShowModal(false);
    setIsEditing(false);
  };

  return (
    <div
      className="reward-tags-main-container"
      style={{ fontSize: "clamp(12px, 3vw, 1rem)" }}
    >
      <h4 style={{ color: APP_COLOR_BLUE }}>Benefit Tags</h4>
      <div className="reward-tags-container">
        <TagInput cardId={cardId} firebaseUid={firebaseUid} />
        {tags?.map((tag, index) => (
          <Tag
            key={index}
            tag={tag}
            index={index}
            cardId={cardId}
            firebaseUid={firebaseUid}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="tags-modal"
      >
        <Modal.Body className="tag-description-modal">
          {isEditing || !selectedTag?.description ? (
            <textarea
              ref={textAreaRef}
              value={tagDescription}
              onChange={(e) => setTagDescription(e.target.value)}
              rows={15}
              className="tag-description-textarea"
            />
          ) : (
            <pre className="tag-description-text">{tagDescription}</pre>
          )}
        </Modal.Body>
        <Modal.Footer className="tag-description-modal-footer">
          {isEditing || !selectedTag?.description ? (
            <>
              <FaCheckCircle
                onClick={handleSaveDescription}
                style={{
                  fontSize: "3rem",
                  color: EDIT_COLOR_GREEN,
                  padding: "3.7px",
                  cursor: "pointer",
                }}
              />
              <IoMdCloseCircle
                style={{
                  fontSize: "3rem",
                  color: DELETE_COLOR_RED,
                  cursor: "pointer",
                }}
                onClick={() => setShowModal(false)}
              />
            </>
          ) : (
            <Button
              variant="success"
              onClick={() => setIsEditing(true)}
              className="rounded-circle"
            >
              <MdModeEditOutline />
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RewardTags;
