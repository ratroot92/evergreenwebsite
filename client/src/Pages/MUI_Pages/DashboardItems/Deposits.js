/* eslint-disable  */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Title from './Title';
import { Link } from 'react-router-dom';

function Deposits(props = {}) {
  return (
    <>
      <Title>{props?.title || 'Recent Deposits'}</Title>
      <Typography component="p" variant="h4">
        {props?.count || '$3,024.00'}
      </Typography>
      <Typography color="text.secondary" xs={{ flex: 1 }}>
        {props?.lastInserted || 'on 15 March, 2019'}
      </Typography>
      <div>
        <Link color="primary" to={`/admin/dashboard/${props?.href}`} onClick={() => {}}>
          {props?.href}
        </Link>
      </div>
    </>
  );
}

Deposits.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
  lastInserted: PropTypes.string.isRequired,
};

export default Deposits;
