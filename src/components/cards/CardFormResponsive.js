import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import {
  CARD_STATUS,
  CARD_DATA_KEYS,
  CARD_TYPE,
  ISSUERS,
  DELETE_COLOR_RED,
} from "../../constants";
import DateInput from "../common/DateInput";
import RadioInput from "../common/RadioInput";
import Form from "react-bootstrap/Form";
import { formDisabledCheck, titleCase } from "../../helpers";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import NumberInput from "../common/NumberInput";

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
        {!isEmpty(errors) && (
          <div style={{ color: DELETE_COLOR_RED, fontWeight: "bold" }}>
            Please fill out required fields
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
          error={errors.status}
          requiredField
        />
        <DateInput
          name={CARD_DATA_KEYS.appDate}
          label="Application Date"
          onChange={onChange}
          value={card.appDate}
          error={errors.appDate}
          requiredField
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
          error={errors.userId}
          requiredField
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
          error={errors.issuer}
          requiredField
        />

        <TextInput
          name={CARD_DATA_KEYS.card}
          label="Card"
          value={titleCase(card.card) || ""}
          onChange={onChange}
          error={errors.card}
          requiredField
        />
        <SelectInput
          name={CARD_DATA_KEYS.cardType}
          label="Card Type"
          value={card.cardType || ""}
          defaultOption="Select Card Type"
          options={CARD_TYPE.map((type) => ({
            value: type,
            text: type,
          }))}
          onChange={onChange}
          error={errors.cardType}
          requiredField
        />
        <NumberInput
          name={CARD_DATA_KEYS.creditLine}
          label="Credit Line"
          value={card.creditLine || ""}
          onChange={onChange}
          error={errors.creditLine}
          isCurrency={true}
          requiredField
        />

        <NumberInput
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

        <NumberInput
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
          label="Signup Bonus (Max 20 characters)"
          value={card.signupBonus}
          onChange={onChange}
          error={errors.title}
          length={20}
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
          error={errors.inquiries}
          onChange={onChange}
          requiredField
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
