import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Import Styles
import './Square.css';

const Square = ({ id, color, isClicked, onClickSquare }) => {
    return <div className={classnames({'square': true, 'square-border': isClicked})}>
        <div id={id} className={classnames({'rotate': isClicked })} style={{ backgroundColor: color }} onClick={() => onClickSquare(id, isClicked)} />
    </div>
}

Square.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClickSquare: PropTypes.func.isRequired,
  isClicked: PropTypes.bool,
}

export default memo(Square);