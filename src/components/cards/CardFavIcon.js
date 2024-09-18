import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { saveCardToFirebase } from "../../redux/actions/cardsActions";
import { useUser } from "reactfire";

export default function CardFavIcon({ card }) {
  const dispatch = useDispatch();
  const { data: user } = useUser();

  return (
    <AiFillHeart
      onClick={() =>
        dispatch(saveCardToFirebase({ ...card, isFav: !card.isFav }, user?.uid))
      }
      style={{ color: card.isFav && "#b8332c" }}
      title={`${card.isFav ? "Remove from" : "Add to"} Favorites`}
      className="heart rounded-circle"
    />
  );
}
