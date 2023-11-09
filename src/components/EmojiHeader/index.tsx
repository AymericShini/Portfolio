import Image, { StaticImageData } from 'next/image';

type Props = {
  image: StaticImageData;
  name: string;
};

const EmojiHeader = ({ image, name }: Props) => (
  <div className={`header__emoji header__emoji--${name}`}>
    <div className="header__emoji-container">
      <Image src={image} alt="" className="emoji" />
    </div>
  </div>
);

export default EmojiHeader;
