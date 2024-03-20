import { Navbar, NavbarBrand } from '@nextui-org/react';
import Link from 'next/link';
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
        <p className="font-medium">{title}</p>
      </NavbarBrand>
    </Link>
  </Navbar>
);

export default memo(Header);
