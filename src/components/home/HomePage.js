import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useUser } from "reactfire";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { slugify } from "../../helpers";
import { writeToFirebase } from "../../tools/firebase";

function HomePage({ cardholders, loadCardholdersFromFirebase }) {
  const { status, data: user } = useUser();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (cardholders.length === 0 && status !== "loading" && user !== null) {
      loadCardholdersFromFirebase(user.uid);

      setUserData({
        id: slugify(user.displayName),
        name: user.displayName,
        img: user.photoURL,
        isPrimary: true,
      });
    }
  }, [user]);

  useEffect(() => {
    if (cardholders.length === 0 && userData.name && user !== null) {
      writeToFirebase("cardHolders", userData, userData.id, user.uid);
    }
  }, [cardholders]);

  return (
    <div className="jumbotron">
      <h2 className="sectionHeaders">Credit Cards Administration</h2>
      <p>Application to track credit card applications and rewards</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cardholders: state.cardholders,
});

const mapDispatchToProps = {
  loadCardholdersFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
