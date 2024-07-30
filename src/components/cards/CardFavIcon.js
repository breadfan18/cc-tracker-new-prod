import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { saveCardToFirebase } from "../../redux/actions/cardsActions";
import { APP_COLOR_BLACK_OPACITY } from "../../constants";

export default function CardFavIcon({ card, firebaseUid }) {
  const dispatch = useDispatch();

  return (
    <AiFillHeart
      onClick={() =>
        dispatch(
          saveCardToFirebase({ ...card, isFav: !card.isFav }, firebaseUid)
        )
      }
      style={{
        fontSize: "2.5rem",
        color: card.isFav ? "#b8332c" : APP_COLOR_BLACK_OPACITY,
        marginRight: "5px",
      }}
      title={`${card.isFav ? "Remove from" : "Add to"} Favorites`}
    />
  );
}
