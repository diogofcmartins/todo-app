import mountainsWebp from '../assets/mountains.webp';
import mountainsJpg from '../assets/mountains.jpg';

function Header() {
  return (
    <header>
      <picture>
        <source srcSet={mountainsWebp} type='image/webp' />
        <source srcSet={mountainsJpg} type='image/jpg' />
        <img src={mountainsJpg} />
      </picture>
      <h1>Get things done.</h1>
    </header>
  );
}

export default Header;
