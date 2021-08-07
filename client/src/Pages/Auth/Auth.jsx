import React from 'react'
import Logo from '../../components/Shared/Logo/Logo';
import styles from './Auth.module.css';

const Auth = ({children}) => {
    const logoStyle = {
        marginBottom:'10px'
    }
    return (
        <div className={styles.authPage}>
            <Logo styles={logoStyle}/>
            {children}
        </div>
    )
}

export default Auth
