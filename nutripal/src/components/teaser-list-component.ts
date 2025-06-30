import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { teaserListStyle } from '../styles/teaser-list-component.ts';

export interface Teaser {
  description: string;
}

@customElement('teaser-list-component')
export class TeaserListComponent extends LitElement {
  static override styles = [teaserListStyle];

  @property({ type: Array })
  teasers: Teaser[] = [];

  @property({ type: String })
  heading: string | undefined = undefined;

  @property({ type: String })
  actionLabel: string | undefined = undefined;

  @property({ type: Boolean })
  alwaysRow = false;

  @property({ type: Boolean })
  clickable = false;

  // Handle the click on a default prompt
  handleTeaserClick(teaser: Teaser, event?: Event): void {
    event?.preventDefault();
    const teaserClickEvent = new CustomEvent('teaser-click', {
      detail: {
        question: teaser.description,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(teaserClickEvent);
  }

  renderClickableTeaser(teaser: Teaser) {
    return html`
      <a
        role="button"
        href="#"
        data-testid="default-question"
        @click="${(event: Event) => this.handleTeaserClick(teaser, event)}"
      >
        ${teaser.description}
        <span class="teaser-click-label">${this.actionLabel}</span>
      </a>
    `;
  }

  override render() {
    return html`
      ${this.heading ? html`<h3 class="headline">${this.heading}</h3>` : ''}
      <div class="teaser-list">
        ${this.teasers.map(
      (teaser) => html`
            <div
              class="teaser-list-item"
              role="button"
              tabindex="0"
              @click="${() => this.handleTeaserClick(teaser)}"
              @keydown="${(e: KeyboardEvent) => e.key === 'Enter' && this.handleTeaserClick(teaser)}"
            >
              <p class="description">${teaser.description}</p>
              <span class="cta">${this.actionLabel}</span>
            </div>
          `,
    )}
      </div>
    `;
  }
}
