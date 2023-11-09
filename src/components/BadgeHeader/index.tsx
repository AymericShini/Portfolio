type Props = {
  href: string;
  text: string;
};

const BadgeHeader = ({ href, text }: Props) => (
  <a href={href} target="_blank" className="button" rel="noreferrer">
    <div className="button__content">
      <div className="button__text">{text}</div>
    </div>
  </a>
);

export default BadgeHeader;
