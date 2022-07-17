import React from 'react';
import Menu from '../Menu';
import styles from './styles.module.sass'

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.container}>
      <Menu selected={'Home'}/>
      {children}
    </div>
  )
}

export default MainLayout
