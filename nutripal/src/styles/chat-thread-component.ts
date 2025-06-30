import { css } from 'lit';

export const chatThreadStyle = css`
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .chat__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    overflow-y: auto;
  }

  .chat__listItem {
    display: flex;
    max-width: 85%;
  }

  .chat__listItem.user-message {
    align-self: flex-end;
  }

  .chat__listItem.user-message .chat__message {
    background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
    color: #fff;
    border-radius: 20px 20px 4px 20px;
  }

  .chat__listItem.bot-message {
    align-self: flex-start;
  }

  .chat__message {
    display: flex;
    flex-direction: column;
    padding: 12px 18px;
    border-radius: 20px 20px 20px 4px;
    background-color: #f1f8e9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    line-height: 1.6;
    position: relative;
    color: #333;
  }

  .chat__message.error {
    background-color: #fef0f0;
    border: 1px solid #fde0e0;
    color: #f56c6c;
  }

  .chat__message.loading {
    color: #666;
    font-style: italic;
  }

  .chat__message--timestamp {
    font-size: 0.75rem;
    color: #999;
    align-self: flex-end;
    margin-top: 8px;
  }

  .user-message .chat__message--timestamp {
    color: #e8f5e9;
    opacity: 0.8;
  }

  .chat__message--copy-button,
  .chat__message--reset-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: 8px;
    opacity: 0.6;
    transition: opacity 0.3s;
  }

  .chat__message--copy-button:hover,
  .chat__message--reset-button:hover {
    opacity: 1;
  }

  .chat__message-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .chat__message-header--bot-name {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .chat__message--actions {
    display: flex;
    gap: 8px;
  }

  .followup-questions__list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  .followup-questions__button {
    background-color: #fff;
    color: #388e3c;
    border: 1px solid #4caf50;
    border-radius: 16px;
    padding: 8px 14px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .followup-questions__button:hover {
    background-color: #e8f5e9;
  }
`;
