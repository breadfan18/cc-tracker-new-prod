import { useSelector } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { isLoyaltyData, useSortableData } from "../../hooks/sortData";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import {
  DELETE_COLOR_RED,
  DELETE_MODAL_TYPES,
  LOYALTY_DATA_KEYS,
} from "../../constants";
import { formatDate } from "../../helpers";
import { getRewardsExpirationStuff } from "../../utils/rewardsExpiration";
import CopyIcon from "../common/CopyIcon";
import { MainReduxState } from "../../types/redux";
import { LoyaltyData } from "../../types/loyalty-types";

type LoyaltyListProps = {
  loyaltyData: LoyaltyData[];
  showEditDelete?: boolean;
  isDesktop?: boolean;
};

const LoyaltyList = ({
  loyaltyData,
  showEditDelete,
  isDesktop,
}: LoyaltyListProps) => {
  const { data, requestSort } = useSortableData(loyaltyData);
  const theme = useSelector((state: MainReduxState) => state.theme);
  const userLoyaltyPrograms = useSelector(
    (state: MainReduxState) => state.userLoyaltyPrograms
  );

  return loyaltyData.length === 0 ? (
    <EmptyList dataType={"loyalty account"} />
  ) : (
    <Table variant={theme === "dark" ? "dark" : ""}>
      <thead>
        <tr>
          <th></th>
          <th className="tableHeader">
            Program
            <FaSort onClick={() => requestSort(LOYALTY_DATA_KEYS.program)} />
          </th>
          <th className="tableHeader">
            Member ID
            <FaSort onClick={() => requestSort(LOYALTY_DATA_KEYS.memberId)} />
          </th>
          <th className="tableHeader">
            User Name{" "}
            <FaSort onClick={() => requestSort(LOYALTY_DATA_KEYS.loginId)} />
          </th>
          <th className="tableHeader">
            Password{" "}
            <FaSort onClick={() => requestSort(LOYALTY_DATA_KEYS.password)} />
          </th>
          {isDesktop && (
            <th className="tableHeader">
              Rewards{" "}
              <FaSort
                onClick={() => requestSort(LOYALTY_DATA_KEYS.rewardsBalance)}
              />
            </th>
          )}
          {isDesktop && (
            <th className="tableHeader">
              Expiration{" "}
              <FaSort
                onClick={() => requestSort(LOYALTY_DATA_KEYS.rewardsExpiration)}
              />
            </th>
          )}

          {showEditDelete && (
            <>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody className="align-middle">
        {data.map((acc) => {
          if (!isLoyaltyData(acc)) return null;

          const { daysForRewardExpiration, rewardsExpirationIcon } =
            getRewardsExpirationStuff(acc);
          return (
            <tr key={acc.id}>
              <td>
                <img className="loyaltyLogos" src={acc.program.img} alt="AA" />
              </td>
              <td>
                <a
                  href={acc.program.url || undefined}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {acc.program.name}
                </a>
              </td>
              <td>
                <CopyIcon dataToCopy={acc.memberId} />
                {acc.memberId}
              </td>
              <td>
                <CopyIcon dataToCopy={acc.loginId} />
                {acc.loginId}
              </td>
              <td>{acc.password}</td>
              {isDesktop && (
                <td>{`${Number(acc.rewardsBalance || "0").toLocaleString()} ${
                  acc.program.type === "airlines" ? "miles" : "points"
                }`}</td>
              )}
              {isDesktop && (
                <td>
                  <div>
                    {rewardsExpirationIcon}
                    {formatDate(acc.rewardsExpiration)}{" "}
                  </div>
                  {daysForRewardExpiration && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: "10px",
                        color:
                          daysForRewardExpiration <= 90 ? DELETE_COLOR_RED : "",
                      }}
                    >
                      {`Rewards expire in ${daysForRewardExpiration} days`}
                    </p>
                  )}
                </td>
              )}

              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <LoyaltyAddEditModal
                      loyaltyAcc={acc}
                      userAddedPrograms={userLoyaltyPrograms}
                    />
                    <ConfirmDeleteModal
                      data={acc}
                      dataType={DELETE_MODAL_TYPES.loyaltyAcc}
                    />
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default LoyaltyList;
