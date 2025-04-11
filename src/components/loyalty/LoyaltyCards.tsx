import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import LoyaltyCardText from "./LoyaltyCardText";
import { DELETE_MODAL_TYPES, LOYALTY_DATA_KEYS } from "../../constants";
import LoyaltyCardExpirationText from "./LoyaltyCardExpirationText";
import { formatDate } from "../../helpers";
import { getRewardsExpirationStuff } from "../../utils/rewardsExpiration";
import { useSelector } from "react-redux";
import { MainReduxState } from "../../types/redux";
import { LoyaltyData } from "../../types/loyalty-types";

export default function LoyaltyCards({
  loyaltyData,
}: {
  loyaltyData: LoyaltyData[];
}) {
  const theme = useSelector((state: MainReduxState) => state.theme);
  const userAddedPrograms = useSelector(
    (state: MainReduxState) => state.userLoyaltyPrograms
  );
  const allCards = loyaltyData.map((acc) => {
    const { daysForRewardExpiration, rewardsExpirationIcon } =
      getRewardsExpirationStuff(acc);

    return (
      <Card
        key={acc.id}
        className={`cardCard ${theme === "dark" && "bg-dark"}`}
      >
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Card.Subtitle
              className="mb-0 loyaltyCardTitle"
              style={{
                borderBottom: theme === "dark" ? "1px solid #4e5359" : "",
              }}
            >
              <a
                href={acc.program.url || undefined}
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noreferrer"
              >
                {acc.program.name}
              </a>
              <div>
                <img
                  src={acc.program.img}
                  alt="Issuer"
                  className="loyaltyLogos"
                />
              </div>
            </Card.Subtitle>
          </div>
          <section id="loyaltyCardBody">
            <div>
              <LoyaltyCardText
                account={acc}
                dataType={LOYALTY_DATA_KEYS.memberId}
                showCopyIcon
                dataToCopy={acc.memberId}
              />
              <LoyaltyCardText
                account={acc}
                dataType={LOYALTY_DATA_KEYS.rewardsBalance}
              />
              <LoyaltyCardExpirationText
                expirationDate={formatDate(acc.rewardsExpiration)}
                daysForExpiration={daysForRewardExpiration}
              />
              <LoyaltyCardText
                account={acc}
                dataType={LOYALTY_DATA_KEYS.loginId}
                showCopyIcon
                dataToCopy={acc.loginId}
              />
              <LoyaltyCardText
                account={acc}
                dataType={LOYALTY_DATA_KEYS.password}
              />
            </div>
            {daysForRewardExpiration && <div>{rewardsExpirationIcon}</div>}
          </section>
        </Card.Body>
        <Card.Footer
          style={{ borderTop: theme === "dark" ? "1px solid #4e5359" : "" }}
        >
          <div className="editDeleteCard editDeleteOnCards">
            <LoyaltyAddEditModal
              loyaltyAcc={acc}
              userAddedPrograms={userAddedPrograms}
            />
            <ConfirmDeleteModal
              data={acc}
              dataType={DELETE_MODAL_TYPES.loyaltyAcc}
            />
          </div>
        </Card.Footer>
      </Card>
    );
  });
  return loyaltyData.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <div id="cardCardContainer">{allCards}</div>
  );
}

LoyaltyCards.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
};
