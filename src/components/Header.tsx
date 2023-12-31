import { Link } from '@/navigation';
import { Navbar, NavbarBrand } from '@nextui-org/react';
import { FC, memo } from 'react';

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({ title }) => (
  <Navbar
    shouldHideOnScroll
    classNames={{
      wrapper: 'px-4',
    }}
  >
    <Link href="/">
      <NavbarBrand>
        <p>{title}</p>
      </NavbarBrand>
    </Link>
  </Navbar>
);

export default memo(Header);
