import React from "react";
import styled from "styled-components";

import UserIcon from "./userIcon";
import NavbarLogo from "./logo";
import NavigationItem from "./navItem";
import NavButton from "./button";
import { useAppContext } from "../../libs/contextLib";

const StyledNavBar = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  overflow: hidden;

  height: 100px;
  min-width: 851px;

  border-style: none none solid none;
  border-color: #f6b26b;

  background-color: #fff;

  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
  }

  .user-access {
    margin-right: 30px;
    display: flex;
  }

  .active {
  }
`;

const NavBar = () => {
  const { user } = useAppContext();

  return (
    <StyledNavBar>
      <div className="navigation">
        <NavbarLogo></NavbarLogo>
        <NavigationItem label="about"></NavigationItem>
        <NavigationItem label="contact"></NavigationItem>
        {user.__guest ? (
          <></> // No link
        ) : (
          <>
            <NavigationItem label="map"></NavigationItem>
          </>
        )}
      </div>
      <div className="user-access">
        {user.__guest ? (
          <>
            <NavButton label="Login"></NavButton>
            <NavButton label="Sign Up"></NavButton>
          </>
        ) : (
          <>
            <UserIcon label={user.displayName}></UserIcon>
            <NavButton label="Logout"></NavButton>
          </>
        )}
      </div>
    </StyledNavBar>
  );
};
export default NavBar;
