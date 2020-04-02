import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from '@react-navigation/compat';

import { MainNavigator } from './GNavigator';

const NavContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({
          routeName: 'Auth'
        })
      );
    }
  }, [isAuth]);
  return <MainNavigator ref={navRef} />;
};

export default NavContainer;
