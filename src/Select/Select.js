import React, { Component, PropTypes } from 'react';
import ReactSelect from 'react-select';
import Icon from '@ox2/icon/Icon';
import Thumb from '@ox2/ui/Thumb';
import styled from 'styled-components';

const styles = {
  circle: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    margin: '0 5px',
    borderRadius: '50%',
  },
  label: {
    paddingLeft: '7px',
    fontSize: '16px',
  },
  labelTextOnly: {
    fontSize: '16px',
  },
  labelColoredCircle: {
    paddingLeft: '3px',
    fontSize: '16px',
  },
  itemWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'Roboto Condensed',
  },
};

const StyledSelect = styled(ReactSelect)`
  &.Select--multi .Select-value {
    margin-top: 2px;
  }

  &.Select--multi .Select-value-label {
    display: inline-flex;
  }
  .Select-input, .Select-control {
    height: 32px;
  }
`;

/**
 * Select Component
 */
class Select extends Component {
  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Fallback icon if no image is present fot 'image' type
     */
    fallbackIcon: PropTypes.string,
    /**
     * Icon size (for type 'icon') default 14px
     */
    iconSize: PropTypes.string,
    /**
     * If set to True enables multi select component
     */
    multi: PropTypes.bool,
    /**
     * Enables offline image check for 'image' type
     */
    offlineEnabled: PropTypes.bool,
    /**
     * Callback after selection
     */
    onUpdate: PropTypes.func.isRequired,
    /**
     * Data for select options
     */
    options: PropTypes.array.isRequired,
    /**
     * Placeholder text
     */
    placeholder: PropTypes.string,
    /**
     * Set type
     */
    type: PropTypes.oneOf([
      'colored',
      'image',
      'colored-circle',
      'icon',
    ]),
    /**
     * Set initial value
     */
    value: PropTypes.any,
  };

  state = {
    value: this.props.value || '',
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleSelectChange = (value) => {
    if (this.props.onUpdate) {
      if (this.props.multi) {
        this.props.onUpdate(value ? value.split(',') : []);
      } else {
        this.props.onUpdate(value ? value.value : null);
      }
    }
    this.setState({ value });
  };


  // type 'default' rendering
  renderDefault = (option) => {
    return (
      <div style={styles.itemWrapper}>
        <div style={styles.labelTextOnly}>
          {option.label}
        </div>
      </div>
    );
  };

  // type 'colored' rendering
  renderColored = (option) => {
    return (
      <div style={styles.itemWrapper}>
        <div style={{...{color: option.color}, ...styles.labelTextOnly}}>
          {option.label}
        </div>
      </div>
    );
  };


  // type 'colored-circle' rendering
  renderColoredCircle = (option) => {
    return (
      <div style={styles.itemWrapper}>
        <div style={{...{backgroundColor: option.color}, ...styles.circle}} />
        <div style={styles.labelColoredCircle}>{option.label}</div>
      </div>
    );
  };

  // type 'icon' rendering
  renderIcon = (option) => {
    return (
      <div style={styles.itemWrapper}>
        <Icon
          icon={option.icon}
          size={this.props.iconSize || '18px'}
          color={option.iconColor}
        />
        <div style={styles.label}>{option.label}</div>
      </div>
    );
  };

  // type 'image' rendering
  renderImage = (option) => {
    return (
      <div style={styles.itemWrapper}>
        <Thumb
          image={option.image}
          offlineEnabled={this.props.offlineEnabled}
          localImg={option.localImg}
          width={30}
          height={30}
          icon={this.props.fallbackIcon}
        />
        <div style={styles.label}>{option.label}</div>
      </div>
    );
  };

  renderImageValue = (option) => {
    return (
      <div style={styles.itemWrapper}>
        <Thumb
          image={option.image}
          offlineEnabled={this.props.offlineEnabled}
          localImg={option.localImg}
          width={20}
          height={20}
          icon={this.props.fallbackIcon}
        />
        <div style={styles.label}>{option.label}</div>
      </div>
    );
  };

  render() {
    const { type, ...other } = this.props;

    let select = {};

    switch (type) {
      case 'colored':
        select = (
          <StyledSelect
            {...other}
            value={this.state.value}
            onChange={this.handleSelectChange}
            valueRenderer={this.renderColored}
            optionRenderer={this.renderColored}
          />
        );
        break;
      case 'colored-circle':
        select = (
          <StyledSelect
            {...other}
            value={this.state.value}
            onChange={this.handleSelectChange}
            valueRenderer={this.renderColoredCircle}
            optionRenderer={this.renderColoredCircle}
          />
        );
        break;
      case 'icon':
        select = (
          <StyledSelect
            {...other}
            value={this.state.value}
            onChange={this.handleSelectChange}
            valueRenderer={this.renderIcon}
            optionRenderer={this.renderIcon}
          />
        );
        break;
      case 'image':
        select = (
          <StyledSelect
            {...other}
            value={this.state.value}
            onChange={this.handleSelectChange}
            valueRenderer={this.renderImageValue}
            optionRenderer={this.renderImage}
          />
        );
        break;
      default:
        select = (
          <StyledSelect
            {...other}
            value={this.state.value}
            onChange={this.handleSelectChange}
            valueRenderer={this.renderDefault}
            optionRenderer={this.renderDefault}
          />
        );
    }

    return select;
  }
}

export default Select;
