import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { saveCardToFirebase } from "../../redux/actions/cardsActions";
import { Card } from "../../types/cards-types";
import { useUser } from "reactfire";

type CardFavIconProps = { card: Card };

export default function CardFavIcon({ card }: CardFavIconProps) {
  const { data: user } = useUser();

  const dispatch = useDispatch();
  return (
    <AiFillHeart
      onClick={() =>
        dispatch(saveCardToFirebase({ ...card, isFav: !card.isFav }, user?.uid))
      }
      style={{ color: card.isFav ? "#b8332c" : undefined }}
      title={`${card.isFav ? "Remove from" : "Add to"} Favorites`}
      className="heart rounded-circle"
    />
  );
}
