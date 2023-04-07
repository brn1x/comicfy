import React, { useState } from 'react';
import Menu from '../Menu';
import styles from './styles.module.sass'
import { MenuTitleContext } from '../../context/MenuTitle';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [title, setTitle] = useState('Home')

  return (
    <div className={styles.container}>
      <MenuTitleContext.Provider value={{ title, setTitle }}>
        <Menu selected={title}/>
        {children}
      </MenuTitleContext.Provider>
    </div>
  )
}

export default MainLayout
