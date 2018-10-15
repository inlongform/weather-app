import React from "react";
import { Container, Row, Col } from "reactstrap";
import Daily from "../Daily/Daily";

export default ({ conditions, location }) => {
  const fiveDay = conditions.forecast.splice(1, 4);
  return (
    <Container id="forcast">
      <Row>
        <Col>
          <Daily weather={conditions.condition} />
        </Col>
      </Row>
      <Row>
        {fiveDay.map((item, i) => {
          return (
            <Col key={i} xl="3" lg="3" md="3" sm="6">
              <Daily weather={item} />
            </Col>
          );
        })}
      </Row>
      <Row className="pb-5">
        <Col className="text-center">
          <h4 className="semi-bold-text">{location}</h4>
        </Col>
      </Row>
    </Container>
  );
};
