import { handleInquiriesList } from "../../helpers";
import { Inquiries } from "../../types/cards-types";

export default function CreditBureauIcons({
  inquiries,
}: {
  inquiries: Inquiries;
}) {
  return handleInquiriesList(inquiries).map((inq) => (
    <img
      src={inq?.img}
      alt={inq?.name}
      className="bureauImgs"
      title={inq?.name}
      key={inq?.name}
    />
  ));
}
