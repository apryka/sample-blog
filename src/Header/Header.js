import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Header.css';

function Header(props) {
    return (
        <header className="header">
            <h1 className="header-title">
                <Link to='/' className="header-title-link">{props.title}</Link>
            </h1>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header;