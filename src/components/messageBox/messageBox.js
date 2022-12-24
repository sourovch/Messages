import { peoples, messages } from '../../db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faRepeat,
} from '@fortawesome/free-solid-svg-icons';

import '../../styles/messageBox.css';
import { useEffect, useRef } from 'react';

function MessageBox({
  receiverId,
  senderId,
  reRender,
  switchBtnClk,
  usersRef,
  hideSmall,
  setHidMsgBoxRef,
  hidMsgBoxRef,
  mainbox,
}) {
  const msgContRef = useRef();
  const mainContRef = useRef();

  const sender = peoples.find(({ id }) => id === senderId);
  const reciver = peoples.find(({ id }) => id === receiverId);

  const validate = (msg) => msg.length > 0 && msg.length < 255;

  const submitHandler = (e, messages) => {
    e.preventDefault();

    validate(e.target['message-text'].value) &&
      messages.push({
        id: messages[messages.length - 1].id + 1,
        sender: sender.id,
        reciver: reciver.id,
        message: e.target['message-text'].value,
      });

    e.target['message-text'].value = '';

    msgContRef.current.scrollTop = msgContRef.current.scrollHeight;

    reRender.init();
  };

  useEffect(() => {
    const { current: msgCont } = msgContRef;

    msgCont.scrollHeight < msgCont.parentElement.clientHeight
      ? (msgCont.style.marginTop = 'auto')
      : (msgCont.scrollTop = msgCont.scrollHeight);

    if (hideSmall) {
      setHidMsgBoxRef(mainContRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`messageBox-container ${
        hideSmall ? 'hide-cont' : ''
      }`}
      ref={mainContRef}
    >
      <div className="top-bar">
        {mainbox && (
          <button
            className="btn switch-btn"
            onClick={() => {
              switchBtnClk(usersRef.current);
            }}
          >
            <FontAwesomeIcon icon={faRepeat} />
          </button>
        )}{' '}
        {reciver.name}
        <button
          className="btn page-switch"
          onClick={() => {
            switchBtnClk(hidMsgBoxRef.current);
          }}
        >
          Other side
        </button>
      </div>
      <div className="messages">
        <div ref={msgContRef}>
          {messages
            .filter(
              (message) =>
                (sender.id === message.sender &&
                  reciver.id === message.reciver) ||
                (message.sender === reciver.id &&
                  message.reciver === sender.id)
            )
            .map((message) => (
              <div
                className={
                  sender.id === message.sender
                    ? 'sender-message'
                    : 'reciver-message'
                }
                key={message.id}
              >
                <p>{message.message}</p>
              </div>
            ))}
        </div>
      </div>
      <form
        className="message-form"
        autoComplete="off"
        onSubmit={(e) => {
          submitHandler(e, messages);
        }}
      >
        <div className="input-wrapper">
          <input
            className="message-input"
            id="message-text"
            placeholder="Write your message"
          />
          <button className="submit-btn btn" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageBox;
