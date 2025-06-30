import { css } from 'lit';

export const chatStyle = css`
  :host {
    --primary-color: #4caf50;
    --secondary-color: #f1f8e9;
    --text-color: #333;
    --text-color-light: #fff;
    --accent-color: #81c784;
    --accent-color-light: #e8f5e9;
    --background-color: #ffffff;
    --border-radius: 12px;
    --font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  .chat__containerWrapper {
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
    overflow: hidden;
    background-color: var(--background-color);
  }

  .chat__container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: var(--font-family);
  }

  .chat__header--thread {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--secondary-color);
  }

  .chat__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: var(--text-color-light);
  }

  .chat__header h1 {
    margin: 0;
    font-size: 1.2rem;
  }

  .chat__input-container {
    display: flex;
    align-items: center;
    padding: 12px;
    background-color: #fff;
    border-top: 1px solid var(--secondary-color);
  }

  .form__container {
    padding: 12px;
    background-color: #fff;
    border-top: 1px solid var(--secondary-color);
  }

  .form__container-sticky {
    position: sticky;
    bottom: 0;
    z-index: 1;
  }

  .chatbox-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px;
    background-color: var(--secondary-color);
    border-radius: 30px;
  }

  .chat__input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 0 12px;
    font-size: 1rem;
    color: var(--text-color);
    outline: none;
  }

  .chatbox__button,
  .voice-input-button {
    border: none;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 8px;
  }

  .chatbox__button:hover,
  .voice-input-button:hover {
    background-color: var(--brand-green-dark);
  }

  .chatbox__button svg,
  .voice-input-button svg {
    width: 24px;
    height: 24px;
    fill: white;
  }

  .chat-history__container {
    padding: 16px;
    border-bottom: 1px solid var(--secondary-color);
  }

  .chat-history__footer {
    text-align: center;
    padding-top: 10px;
    font-size: 0.9rem;
    color: #666;
  }

  /* Overlay for document preview */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: none; /* Initially hidden */
  }
`;
