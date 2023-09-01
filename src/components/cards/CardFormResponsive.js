import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import {
  CARD_STATUS,
  CARD_DATA_KEYS,
  CARD_TYPE,
  ISSUERS,
} from "../../constants";
import DateInput from "../common/DateInput";
import RadioInput from "../common/RadioInput";
import Form from "react-bootstrap/Form";
import { formDisabledCheck, titleCase } from "../../helpers";
import { connect } from "react-redux";

const CardFormResponsive = ({
  card,
  onSave,
  onChange,
  saving,
  cardholders,
  errors = {},
}) => {
  return (
    <>
      <Form onSubmit={onSave}>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <Form.Check
          name={CARD_DATA_KEYS.bonusEarned}
          type="switch"
          label="Bonus Earned"
          value={CARD_DATA_KEYS.bonusEarned}
          checked={card.bonusEarned}
          onChange={onChange}
          style={{ float: "right" }}
        />
        <SelectInput
          name={CARD_DATA_KEYS.status}
          label="Account Status"
          value={card.status || ""}
          defaultOption="Select Status"
          options={CARD_STATUS.map((status) => ({
            value: status,
            text: titleCase(status),
          }))}
          onChange={onChange}
          error={errors.author}
        />
        <DateInput
          name={CARD_DATA_KEYS.appDate}
          label="Application Date"
          onChange={onChange}
          value={card.appDate}
        />
        <SelectInput
          name={CARD_DATA_KEYS.userId}
          label="Card Holder"
          value={card.userId || ""}
          defaultOption="Select Card Holder"
          options={cardholders.map((user) => ({
            value: user.id,
            text: user.name,
          }))}
          onChange={onChange}
          error={errors.author}
        />
        <SelectInput
          name={CARD_DATA_KEYS.issuer}
          label="Issuer"
          value={card.issuer.name || ""}
          defaultOption="Select Issuer"
          options={ISSUERS.map((issuer) => ({
            value: issuer.name,
            text: issuer.name,
          }))}
          onChange={onChange}
          error={errors.author}
        />

        <TextInput
          name={CARD_DATA_KEYS.card}
          label="Card"
          value={card.card || ""}
          onChange={onChange}
          error={errors.title}
        />
        <SelectInput
          name={CARD_DATA_KEYS.cardType}
          label="Card Type"
          value={card.cardType}
          defaultOption="Select Card Type"
          options={CARD_TYPE.map((type) => ({
            value: type,
            text: type,
          }))}
          onChange={onChange}
          error={errors.author}
        />
        <TextInput
          name={CARD_DATA_KEYS.creditLine}
          label="Credit Line"
          value={card.creditLine || ""}
          onChange={onChange}
          error={errors.title}
          isCurrency={true}
        />

        <TextInput
          name={CARD_DATA_KEYS.annualFee}
          label="Annual Fee"
          value={card.annualFee}
          onChange={onChange}
          error={errors.title}
          isCurrency={true}
        />

        <DateInput
          name={CARD_DATA_KEYS.nextFeeDate}
          label="Next Annual Fee Due"
          onChange={onChange}
          value={formDisabledCheck(card.annualFee) ? "" : card.nextFeeDate}
          disabled={formDisabledCheck(card.annualFee)}
        />

        <TextInput
          name={CARD_DATA_KEYS.spendReq}
          label="Spending Requirement"
          value={card.spendReq}
          onChange={onChange}
          error={errors.title}
          isCurrency={true}
        />
        <DateInput
          name={CARD_DATA_KEYS.spendBy}
          label="Spend By"
          onChange={onChange}
          value={formDisabledCheck(card.spendReq) ? "" : card.spendBy}
          disabled={formDisabledCheck(card.spendReq)}
        />
        <TextInput
          name={CARD_DATA_KEYS.signupBonus}
          label="Signup Bonus"
          value={card.signupBonus}
          onChange={onChange}
          error={errors.title}
        />
        <DateInput
          name={CARD_DATA_KEYS.bonusEarnDate}
          label="Bonus Earn Date"
          onChange={onChange}
          value={card.bonusEarnDate}
          disabled={!card.bonusEarned}
        />
        <RadioInput
          name={CARD_DATA_KEYS.inquiries}
          label="Inquiries"
          inquiriesStatus={card.inquiries}
          onChange={onChange}
        />
        <hr />
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary addButton"
        >
          {card.id === null ? "Add Card" : "Save Changes"}
        </button>
      </Form>
    </>
  );
};

CardFormResponsive.propTypes = {
  card: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  cardholders: state.cardholders,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CardFormResponsive);
