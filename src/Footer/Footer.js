import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

function Footer(props) {
    return (
        <div className="footer">
            <p>{props.text}</p>
        </div>
    );
}

Footer.propTypes = {
    text: PropTypes.string
}

export default Footer;
