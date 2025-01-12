import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/input-fields/TextInput";
import SelectInput from "../common/input-fields/SelectInput";
import {
  CARD_STATUS,
  CARD_DATA_KEYS,
  CARD_TYPE,
  ISSUERS,
  DELETE_COLOR_RED,
} from "../../constants";
import DateInput from "../common/input-fields/DateInput";
import RadioInput from "../common/input-fields/RadioInput";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { formDisabledCheck, titleCase } from "../../helpers";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import NumberInput from "../common/input-fields/NumberInput";

const CardForm = ({ card, onSave, onChange, saving, errors = {} }) => {
  const cardholders = useSelector((state) => state.cardholders);
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
          className="bonusEarnedCheck"
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
        <Row>
          <Col>
            <DateInput
              name={CARD_DATA_KEYS.appDate}
              label="Application Date"
              onChange={onChange}
              value={card.appDate}
              error={errors.appDate}
              requiredField
            />
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectInput
              name={CARD_DATA_KEYS.issuer}
              label="Issuer"
              w
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
          </Col>
          <Col>
            <TextInput
              name={CARD_DATA_KEYS.card}
              label="Card"
              value={titleCase(card.card) || ""}
              onChange={onChange}
              requiredField
              error={errors.card}
            />
          </Col>
        </Row>
        <Row>
          <Col>
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
          </Col>
          <Col>
            <NumberInput
              name={CARD_DATA_KEYS.creditLine}
              label="Credit Line"
              value={card.creditLine || ""}
              onChange={onChange}
              error={errors.creditLine}
              isCurrency={true}
              requiredField
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NumberInput
              name={CARD_DATA_KEYS.annualFee}
              label="Annual Fee"
              value={card.annualFee}
              onChange={onChange}
              error={errors.title}
              isCurrency={true}
            />
          </Col>
          <Col>
            <DateInput
              name={CARD_DATA_KEYS.nextFeeDate}
              label="Next Annual Fee Due"
              onChange={onChange}
              value={formDisabledCheck(card.annualFee) ? "" : card.nextFeeDate}
              disabled={formDisabledCheck(card.annualFee)}
              requiredField={Number(card.annualFee) > 0}
              error={errors.nextFeeDate}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NumberInput
              name={CARD_DATA_KEYS.spendReq}
              label="Spending Requirement"
              value={card.spendReq}
              onChange={onChange}
              error={errors.title}
              isCurrency={true}
            />
          </Col>
          <Col>
            <DateInput
              name={CARD_DATA_KEYS.spendBy}
              label="Spend By"
              onChange={onChange}
              value={formDisabledCheck(card.spendReq) ? "" : card.spendBy}
              disabled={formDisabledCheck(card.spendReq)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              name={CARD_DATA_KEYS.signupBonus}
              label="Signup Bonus (Max 20 characters)"
              value={card.signupBonus}
              onChange={onChange}
              error={errors.title}
              length={20}
            />
          </Col>
          <Col>
            <DateInput
              name={CARD_DATA_KEYS.bonusEarnDate}
              label="Bonus Earn Date"
              onChange={onChange}
              value={card.bonusEarnDate}
              disabled={!card.bonusEarned}
              requiredField={card.bonusEarned}
              error={errors.bonusEarnDate}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <RadioInput
              name={CARD_DATA_KEYS.inquiries}
              label="Inquiries"
              inquiriesStatus={card.inquiries}
              onChange={onChange}
              error={errors.inquiries}
              requiredField
            />
          </Col>
        </Row>
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

CardForm.propTypes = {
  card: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CardForm;
