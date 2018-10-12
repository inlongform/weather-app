import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Daily from "../Daily/Daily";

class Forcast extends Component {
  render() {
    const fiveDay = this.props.conditions.forecast.splice(1, 4);
    // console.log(this.props.conditions.forecast);
    return (
      <Container id="forcast">
        <Row>
          <Col>
            <Daily weather={this.props.conditions.condition} />
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
            <h4 className="semi-bold-text">
              {this.props && this.props.location}
            </h4>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Forcast;
