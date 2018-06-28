/* eslint-disable*/
import React from 'react';



import styles from './styles.css';

const Panel = ({ props , children }) => (
        <div className="container" styles={styles}>           
            {children}
        </div>
    )



export default Panel;

