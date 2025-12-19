import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cream};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - ${({ theme }) => theme.spacing[16]});
    max-width: 900px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.lightgray};
    
    ${({ theme }) => theme.mediaQueries.tablet} {
      width: calc(100% - ${({ theme }) => theme.spacing[24]});
    }
    
    ${({ theme }) => theme.mediaQueries.desktop} {
      width: calc(100% - ${({ theme }) => theme.spacing[32]});
      max-width: 800px;
    }
    
    ${({ theme }) => theme.mediaQueries.wide} {
      width: calc(100% - ${({ theme }) => theme.spacing[40]});
      max-width: 900px;
    }
    
    ${({ theme }) => theme.mediaQueries.maxTablet} {
      width: calc(100% - ${({ theme }) => theme.spacing[8]});
    }
  }
`;

const HeaderContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[2]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${({ theme }) => theme.mediaQueries.tablet} {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[2]};
  }
  
  ${({ theme }) => theme.mediaQueries.desktop} {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[2]};
    max-width: 800px;
  }
  
  ${({ theme }) => theme.mediaQueries.wide} {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[20]} ${({ theme }) => theme.spacing[2]};
    max-width: 900px;
  }
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing[2]};
    justify-content: center;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    display: none;
  }
`;



const ProfileName = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.extraBold};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.darkgray};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    gap: ${({ theme }) => theme.spacing[3]};
    flex-wrap: nowrap;
    justify-content: center;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean; $mobileOnly?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 700;
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.red : theme.colors.darkgray};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
  
  ${({ theme, $mobileOnly }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
  
  ${({ theme, $mobileOnly }) => !$mobileOnly && `
    ${theme.mediaQueries.maxTablet} {
      display: block;
    }
  `}
  
  ${({ theme, $mobileOnly }) => $mobileOnly && `
    display: none;
    ${theme.mediaQueries.maxTablet} {
      display: block;
    }
  `}
`;

export const Header: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'About', mobileOnly: true },
    { path: '/articles', label: 'Articles' },
    { path: '/projects', label: 'Projects' },
    { path: '/scenes', label: 'Scenes' },
  ];
  
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <ProfileSection>
          <ProfileName to="/">Can Yılmaz</ProfileName>
        </ProfileSection>
        
        <Navigation>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
              $mobileOnly={item.mobileOnly}
            >
              {item.label}
            </NavLink>
          ))}
        </Navigation>
      </HeaderContainer>
    </HeaderWrapper>
  );
};
