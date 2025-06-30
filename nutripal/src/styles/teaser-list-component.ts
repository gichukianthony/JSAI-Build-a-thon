import { css } from 'lit';

export const teaserListStyle = css`
  .teaser-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    padding: 20px 0;
  }

  .teaser-list-item {
    background-color: #fff;
    border: 1px solid var(--secondary-color);
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  }

  .teaser-list-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  }

  .teaser-list-item .description {
    font-size: 1rem;
    color: var(--text-color);
    margin-bottom: 12px;
  }

  .teaser-list-item .cta {
    font-size: 0.9rem;
    color: var(--primary-color);
    font-weight: 600;
    text-decoration: none;
  }

  .teaser-list-item .cta:hover {
    text-decoration: underline;
  }
`;
