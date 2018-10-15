import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setBgColor } from "../../actions/weatherActions";

class PickerBtn extends Component {
  render() {
    const { color } = this.props;

    return (
      <div
        onClick={e => this.props.setBgColor(color)}
        style={{ backgroundColor: color }}
        className="color-btn"
      />
    );
  }
}

PickerBtn.propTypes = {
  setBgColor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  info: state.info
});

export default connect(
  mapStateToProps,
  { setBgColor }
)(PickerBtn);
