import { useState } from 'react';
import MessageBox from './components/messageBox/messageBox';
import Users from './components/users';
import useRerender from './hooks/rerender';

import './styles/app.css';

function App() {
  const reRender = useRerender();
  const [receiverId, setReceiverId] = useState(2);
  const [usersRef, setUsersRef] = useState();
  const [hidMsgBoxRef, setHidMsgBoxRef] = useState();

  const senderId = 1;

  function switchBtnClk(elm) {
    elm?.classList.toggle('active');
  }

  return (
    <div className="main-container">
      <Users
        setReceiverId={setReceiverId}
        senderId={senderId}
        switchBtnClk={switchBtnClk}
        setUsersRef={setUsersRef}
      />
      <MessageBox
        receiverId={receiverId}
        senderId={senderId}
        reRender={reRender}
        switchBtnClk={switchBtnClk}
        mainbox
        usersRef={usersRef}
        hidMsgBoxRef={hidMsgBoxRef}
      />
      <MessageBox
        hideSmall
        receiverId={senderId}
        senderId={receiverId}
        reRender={reRender}
        switchBtnClk={switchBtnClk}
        setHidMsgBoxRef={setHidMsgBoxRef}
        hidMsgBoxRef={hidMsgBoxRef}
      />
    </div>
  );
}

export default App;
