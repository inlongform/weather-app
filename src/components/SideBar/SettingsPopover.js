import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTemp, getWeather } from "../../actions/weatherActions";

import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
  Row,
  Form,
  FormGroup,
  Label,
  CustomInput
} from "reactstrap";

class SettingsPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      temp: "f"
    };

    this.onSave = this.onSave.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      temp: this.props.info.temp
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  onSave(e) {
    this.toggle();
    const { info } = this.props;
    this.props.setTemp(this.state.temp);
    this.props.getWeather(info.location, info.prevLocations);
  }

  render() {
    return (
      <Row>
        <a id="settingsPop" onClick={this.toggle} className="float-right">
          <FontAwesome name="cog" size="3x" />
        </a>

        <Popover
          placement="auto"
          isOpen={this.state.popoverOpen}
          target="settingsPop"
          toggle={this.toggle}
        >
          <PopoverHeader>Settings</PopoverHeader>
          <PopoverBody>
            <Form>
              <Label for="exampleCheckbox">Temp Display</Label>
              <FormGroup>
                <CustomInput
                  type="radio"
                  id="temp1"
                  name="temp"
                  label="F"
                  value="f"
                  inline
                  color="info"
                  onChange={this.onChange}
                  checked={this.state.temp === "f"}
                />
                <CustomInput
                  type="radio"
                  id="temp2"
                  name="temp"
                  label="C"
                  value="c"
                  inline
                  onChange={this.onChange}
                  checked={this.state.temp === "c"}
                />
              </FormGroup>
              {/* only 6 days is retured from api */}
              {/* <Label for="exampleCheckbox">Days Display</Label>
              <FormGroup>
                <CustomInput
                  type="radio"
                  id="days1"
                  name="days"
                  label="5"
                  inline
                  value="5"
                  onChange={this.onChange}
                  checked={this.state.days === "5"}
                />
                <CustomInput
                  type="radio"
                  id="days2"
                  name="days"
                  label="10"
                  inline
                  value="10"
                  onChange={this.onChange}
                  checked={this.state.days === "10"}
                />
              </FormGroup> */}
              <Button color="outline-info" size="small" onClick={this.onSave}>
                Save
              </Button>
            </Form>
          </PopoverBody>
        </Popover>
      </Row>
    );
  }
}

SettingsPopover.propTypes = {
  getWeather: PropTypes.func.isRequired,
  setTemp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  info: state.info
});

export default connect(
  mapStateToProps,
  { setTemp, getWeather }
)(SettingsPopover);
