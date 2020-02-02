import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {handleKeyboardActivation} from '../utils/inputs';

class Svg extends React.Component {
  static defaultProps = {
    fill: 'var(--icon-color)',
    activeFill: 'var(--kap)',
    hoverFill: 'var(--icon-hover-color)',
    size: '24px',
    active: false,
    viewBox: '0 0 24 24',
    tabIndex: -1
  }

  onClick = () => {
    const {onClick} = this.props;
    if (onClick) {
      onClick();
    }
  }

  stopPropagation = event => {
    event.stopPropagation();
  }

  render() {
    const {
      fill,
      size,
      activeFill,
      hoverFill,
      active,
      onClick,
      children,
      viewBox,
      shadow,
      tabIndex,
      isMenu
    } = this.props;

    const className = classNames({active, shadow, focusable: tabIndex >= 0});

    return (
      <div tabIndex={tabIndex} onKeyDown={tabIndex >= 0 ? handleKeyboardActivation(onClick, {isMenu}) : undefined}>
        <svg
          viewBox={viewBox}
          className={className}
          onClick={onClick}
          onMouseDown={this.stopPropagation}
        >
          { children }
        </svg>
        <style jsx>{`
            svg {
              fill: ${fill};
              width: ${size};
              height: ${size};
            }

            svg:hover,
            div:focus svg {
              fill: ${hoverFill};
            }

            div {
              position: relative;
              width: ${size};
              height: ${size};
              outline: none;
            }

            div.focusable:focus::before {
              content: '';
              position: absolute;
              left: 0;
              right: 0;
              width: 100%;
              height: 100%;
              transform: scale(${1 / 0.75});
              background: var(--icon-focus-background-color);
              z-index: -1;
              border-radius: 2px;
            }

            .shadow {
              filter: drop-shadow(0 1px 2px rgba(0,0,0,.1));
            }

            .active,
            .active:hover,
            div.focusable:focus svg {
              fill: ${activeFill};
            }
        `}</style>
      </div>
    );
  }
}

Svg.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.string,
  activeFill: PropTypes.string,
  hoverFill: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.any,
  viewBox: PropTypes.string,
  onClick: PropTypes.elementType,
  shadow: PropTypes.bool,
  tabIndex: PropTypes.number,
  isMenu: PropTypes.bool
};

export default Svg;
