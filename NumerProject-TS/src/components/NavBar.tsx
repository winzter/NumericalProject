import React from 'react';
import {
  NavbarContainer,
  InnerContainer,
  LeftContainer,
  NavbarLink,
  RightContainer,
  DropdownContainer,
  Dropbtn,
  DropdownContent
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
            <Dropbtn>Root Of Equation</Dropbtn>
            <DropdownContent>
              < NavbarLink to="/bisection">Bisection</NavbarLink>
              < NavbarLink to="/falseposition">False Position</NavbarLink>
              < NavbarLink to="/onepoint">Onepoint Iteration</NavbarLink>
              < NavbarLink to="/newtonraphson">Newton Raphson</NavbarLink>
              < NavbarLink to="/secantmethod">Secant Method</NavbarLink>
            </DropdownContent>
          </DropdownContainer>
          <DropdownContainer>
            <Dropbtn>Linear Algebraic Equation</Dropbtn>
            <DropdownContent>
              < NavbarLink to="/cramer">Cramer</NavbarLink>
            </DropdownContent>
          </DropdownContainer>
          <DropdownContainer>
            <Dropbtn>Least Square Regression</Dropbtn>
            <DropdownContent>
              < NavbarLink to="#">Linear Regression</NavbarLink>
            </DropdownContent>
          </DropdownContainer>
        </RightContainer>
      </InnerContainer>
    </NavbarContainer>
  )
}

export default NavBar