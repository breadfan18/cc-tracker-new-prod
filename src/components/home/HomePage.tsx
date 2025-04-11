import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useUser } from "reactfire";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { slugify } from "../../helpers";
import { writeToFirebase } from "../../tools/firebase";
import { MainReduxState } from "../../types/redux";

type UserDataType = {
  id: string;
  name: string;
  img: string;
  isPrimary: boolean;
  email: string;
};

const INITIAL_USER_DATA: UserDataType = {
  id: "",
  name: "",
  img: "",
  isPrimary: false,
  email: "",
};

function HomePage() {
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const [userData, setUserData] = useState<UserDataType>(INITIAL_USER_DATA);
  const cardholders = useSelector((state: MainReduxState) => state.cardholders);

  useEffect(() => {
    if (!user || status !== "success") return;

    if (cardholders.length === 0) {
      dispatch(loadCardholdersFromFirebase(user.uid));

      setUserData({
        id: slugify(user.displayName),
        name: user.displayName,
        img: user.photoURL,
        isPrimary: true,
        email: user.email,
      });
    }
  }, [cardholders, dispatch, status, user]);

  useEffect(() => {
    if (cardholders.length === 0 && userData.name && user !== null) {
      writeToFirebase("cardHolders", userData, userData.id, user.uid);
    }
  }, [cardholders, user, userData]);

  return (
    <div className="jumbotron">
      <h2 className="sectionHeaders">Credit Cards Administration</h2>
      <p className="homePageText">
        Application to track credit card applications and rewards
      </p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
}

export default HomePage;
