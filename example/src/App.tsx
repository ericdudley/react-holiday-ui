import React from 'react'

import { Christmas, ToggleButton, useReactHolidayUI } from 'react-holiday-ui'
import 'react-holiday-ui/dist/index.css';

const CustomToggle = () => {
  const { isActive, toggleIsActive } = useReactHolidayUI();
  return <div>
    <label htmlFor="react-holiday-ui-checkbox">Holiday UI</label>
    <input id="react-holiday-ui-checkbox" type="checkbox" checked={isActive} onChange={toggleIsActive} /></div >;
}

const App = () => {

  return <div className="app">
    <div className="demo-section">
      <h2>Default ToggleButton</h2>
      <ToggleButton style={{ width: '32px', height: '32px' }} />
    </div>
    <div className='demo-section'>
      <h2>Custom Toggle</h2>
      <CustomToggle />
    </div>
    <Christmas />
  </div>;
}

export default App
