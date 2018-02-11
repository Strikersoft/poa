// @ts-check

import React from 'react';
import { Link } from '@poa/router';

class DummyRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        Another route.. <Link to="/"> go back</Link>
      </React.Fragment>
    );
  }
}

export default DummyRouter;
