import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const NavbarContainer = styled.nav`
  font-family: 'Kanit', sans-serif;
  position: relative;
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  font-weight: bold;
  border-bottom:1px solid black;
`
export const InnerContainer = styled.div`
  margin: 0 auto;
  width:100%;
  justify-content: space-between;
  align-items:center;
  display:flex;
  padding-left: 1rem;
  padding-right: 1rem;
`

export const RightContainer = styled.div`
  display:flex;
` 

export const DropdownContainer = styled.div`
  overflow: hidden;
  font-size: 12px;  
  border: none;
  outline: none;
  color: #020202;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;

  @media (max-width:900px){
    display:none;
  }
`
export const Dropbtn = styled.button`
  border: none;
  outline: none;
  color: #020202;
  font-size: 14px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  font-weight: bold;
`


export const NavbarLink = styled(Link)`
  float: none;
  color: #020202;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  margin: 1rem;
`

export const DropdownContent = styled.div`
  font-size: 14px; 
  display: none;
  border-radius: 10px;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  ${DropdownContainer}:hover &{
    display: block;
  }

  & ${NavbarLink}:hover{
    background-color:#dee7ff;
    transition: 0.3s;
    border-radius: 10px;
  }
`
export const LeftContainer = styled.div`
  display:flex;
  color: #020202;
  font-size: 20px;
`
