import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Container, Row, Col} from 'reactstrap';

import {Title} from './components';
import Search from '../Search';
import './Header.css';

function Header({className, title}) {
    const headerClassName = classnames('header', className);
    return (
        <header className={headerClassName}>
            <Container>
                <Row className="align-items-center">
                    <Col xs="12" md="4">
                        <Title className="header__title">
                            {title}
                        </Title>
                    </Col>
                    <Col xs="12" md="8">
                        <Search className="header__search"></Search>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
