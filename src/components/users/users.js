import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { peoples } from '../../db';
import '../../styles/users.css';

function Users({
  setReceiverId,
  senderId,
  switchBtnClk,
  setUsersRef,
}) {
  const userRef = useRef();

  useEffect(() => {
    setUsersRef(userRef);
  }, [setUsersRef]);

  return (
    <div
      className="users-container"
      ref={userRef}
      onClick={() => {
        switchBtnClk(userRef.current);
      }}
    >
      <div className="top-bar">
        Logged in as{' '}
        {peoples.find((people) => people.id === senderId).name}
        <FontAwesomeIcon icon={faXmark} className="x-mark" />
      </div>
      <div className="users-text">peoples</div>
      <ul>
        {peoples.map(
          (people) =>
            people.id !== senderId && (
              <li
                key={people.id}
                onClick={() => {
                  setReceiverId(people.id);
                  switchBtnClk();
                }}
              >
                {people.name}
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default Users;
