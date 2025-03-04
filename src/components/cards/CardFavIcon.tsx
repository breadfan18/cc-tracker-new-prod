import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { saveCardToFirebase } from "../../redux/actions/cardsActions";
import { Card } from "../../types/cards-types";

type CardFavIconProps = { card: Card; firebaseUid?: string | undefined };

export default function CardFavIcon({ card, firebaseUid }: CardFavIconProps) {
  const dispatch = useDispatch();
  return (
    <AiFillHeart
      onClick={() =>
        dispatch(
          saveCardToFirebase({ ...card, isFav: !card.isFav }, firebaseUid)
        )
      }
      style={{ color: card.isFav ? "#b8332c" : undefined }}
      title={`${card.isFav ? "Remove from" : "Add to"} Favorites`}
      className="heart rounded-circle"
    />
  );
}
