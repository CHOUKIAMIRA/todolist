import React from 'react';
import { MdCalendarViewDay } from 'react-icons/md';
import Logo from './Logo';

function Header({ visible, setVisible }) {
  return (
    <header>
      <div>
        <MdCalendarViewDay className='icone' onClick={() => setVisible(!visible)} />
      </div>
      <div><Logo /></div>
      <h2>{ }</h2>
    </header>
  );
}

export default Header;
