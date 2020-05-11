import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

export default () => (
  <nav>
    <ul>
      <li><Link to="/getimage">Get Image</Link></li>
    </ul>
  </nav>
);
