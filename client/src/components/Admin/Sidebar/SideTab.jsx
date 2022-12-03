/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

export default function SideTab(props) {
  const [isCollapsed, setCollapse] = React.useState(false);
  return (
    <div className="border border-dark">
      <div>
        <li onClick={() => setCollapse(!isCollapsed)} className="" style={{ listStyle: 'none', padding: '0.8rem', margin: 'auto' }}>
          <span>{props.label}</span>
        </li>
      </div>
      {isCollapsed ? (
        <ul>
          {props.routes?.map((route) => (
            <li style={{ listStyle: 'none', padding: '0.8rem', margin: 'auto' }} key={route.label}>
              {route.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
