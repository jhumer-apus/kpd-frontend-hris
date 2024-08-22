
import React from 'react';
import styles from './LoadingComponent.module.scss';

//import a spinning font awesome for loading  icon
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import classNames from 'classnames';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';

interface LoadingProps {
  animateDown?: boolean;
}


export const LoadingComponent: React.FC<LoadingProps> = ({ animateDown }) => {
  return (
    // <div className={styles.loading}>
    <div className={`${styles.loading} ${animateDown ? styles.animateDown : ''}`}>
    {/* <div className={classNames(styles.loading, [{animateDown: styles.animateDown}])}> */}
        {/* <FontAwesomeIcon icon={faSpinner} className={styles.spinner} /> */}
        <Cog8ToothIcon className={styles.spinner}/>
        <h1 className={styles.message}>Loading... </h1>
    </div>
  );
};

export default LoadingComponent;