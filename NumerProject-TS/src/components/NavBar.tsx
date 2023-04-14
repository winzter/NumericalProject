import React from 'react';
import {
  NavbarContainer,
  InnerContainer,
  LeftContainer,
  NavbarLink,
  RightContainer,
  DropdownContainer,
  Dropbtn,
  DropdownContent,
  LinkContent
} from '../styles/Navbar.style'


function NavBar() {
  return (
    <NavbarContainer>
      <InnerContainer>
        <LeftContainer>
          <NavbarLink to="/">Numerical Method</NavbarLink>
        </LeftContainer>
        <RightContainer>
          <DropdownContainer>
            <LinkContent to="/login">Sign In</LinkContent>
            {/* <DropdownContent>
              < NavbarLink to="/bisection">Bisection</NavbarLink>
              < NavbarLink to="/falseposition">False Position</NavbarLink>
              < NavbarLink to="/onepoint">Onepoint Iteration</NavbarLink>
              < NavbarLink to="/newtonraphson">Newton Raphson</NavbarLink>
              < NavbarLink to="/secantmethod">Secant Method</NavbarLink>
            </DropdownContent> */}
          </DropdownContainer>
        </RightContainer>
      </InnerContainer>
    </NavbarContainer>
  )
}

export default NavBar