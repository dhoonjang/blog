import { Navbar, NavbarBrand } from '@nextui-org/react';
import Link from 'next/link';
import { memo } from 'react';

const Header = () => (
  <Navbar
    shouldHideOnScroll
    classNames={{
      wrapper: 'px-4',
    }}
  >
    <Link href="/">
      <NavbarBrand>
        <p>동훈의 블로그</p>
      </NavbarBrand>
    </Link>
  </Navbar>
);

export default memo(Header);
