import { LitElement, html } from 'lit';
import { loadMessages, saveMessages, clearMessages } from '../utils/chatStore.js';
import './chat.css'; // Import the CSS file

export class ChatInterface extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
      inputMessage: { type: String },
      isLoading: { type: Boolean },
      isRetrieving: { type: Boolean },
      ragEnabled: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.messages = [];
    this.inputMessage = '';
    this.isLoading = false;
    this.isRetrieving = false;
    this.ragEnabled = true; // Enable RAG by default
  }

  // Ensure external CSS works
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.messages = loadMessages();
  }

  updated(changedProps) {
    if (changedProps.has('messages')) {
      saveMessages(this.messages);
    }
  }

  render() {
    return html`
      <div class="chat-container">
        <div class="chat-header">
          <button class="clear-cache-btn" @click=${this._clearCache}>🧹 Clear Chat</button>
          <label class="rag-toggle">
            <input type="checkbox" ?checked=${this.ragEnabled} @change=${this._toggleRag} />
            Use Employee Handbook
          </label>
        </div>

        <div class="chat-messages">
          ${this.messages.map(message => html`
            <div class="message ${message.role === 'user' ? 'user-message' : 'ai-message'}">
              <div class="message-content">
                <span class="message-sender">${message.role === 'user' ? 'You' : 'AI'}</span>
                <p>${message.content}</p>
                ${this.ragEnabled && message.sources?.length ? html`
                  <details class="sources">
                    <summary>📚 Sources</summary>
                    <div class="sources-content">
                      ${message.sources.map(src => html`<p>${src}</p>`)}
                    </div>
                  </details>
                ` : ''}
              </div>
            </div>
          `)}

          ${this.isRetrieving ? html`
            <div class="message system-message">
              <p>📚 Searching employee handbook...</p>
            </div>
          ` : ''}

          ${this.isLoading && !this.isRetrieving ? html`
            <div class="message ai-message">
              <div class="message-content">
                <span class="message-sender">AI</span>
                <p>Thinking...</p>
              </div>
            </div>
          ` : ''}
        </div>

        <div class="chat-input">
          <input
            type="text"
            placeholder="Ask about company policies, benefits, etc..."
            .value=${this.inputMessage}
            @input=${this._handleInput}
            @keyup=${this._handleKeyUp}
          />
          <button @click=${this._sendMessage} ?disabled=${this.isLoading || !this.inputMessage.trim()}>
            Send
          </button>
        </div>
      </div>
    `;
  }

  _clearCache() {
    clearMessages();
    this.messages = [];
  }

  _handleInput(e) {
    this.inputMessage = e.target.value;
  }

  _handleKeyUp(e) {
    if (e.key === 'Enter' && this.inputMessage.trim() && !this.isLoading) {
      this._sendMessage();
    }
  }

  _toggleRag(e) {
    this.ragEnabled = e.target.checked;
  }

  async _sendMessage() {
    if (!this.inputMessage.trim() || this.isLoading) return;

    // Append user message
    const userMessage = { role: 'user', content: this.inputMessage };
    this.messages = [...this.messages, userMessage];

    const query = this.inputMessage;
    this.inputMessage = '';
    this.isLoading = true;
    this.isRetrieving = this.ragEnabled;

    try {
      const { reply, sources } = await this._apiCall(query);
      this.messages = [
        ...this.messages,
        { role: 'assistant', content: reply, sources: this.ragEnabled ? sources : [] }
      ];
    } catch (err) {
      console.error('Error calling AI API:', err);
      this.messages = [
        ...this.messages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ];
    } finally {
      this.isLoading = false;
      this.isRetrieving = false;
    }
  }

  async _apiCall(message) {
    const res = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, useRAG: this.ragEnabled })
    });

    if (!res.ok) throw new Error(`API error: ${res.statusText}`);
    return res.json();
  }
}

customElements.define('chat-interface', ChatInterface);
