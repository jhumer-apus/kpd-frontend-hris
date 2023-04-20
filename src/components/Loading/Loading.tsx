
import React from 'react';
import styles from './Loading.module.scss';

//import a spinning font awesome for loading  icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

interface LoadingProps {
  animateDown?: boolean;
}


const Loading: React.FC<LoadingProps> = ({ animateDown }) => {
  return (
    // <div className={styles.loading}>
    <div className={`${styles.loading} ${animateDown ? styles.animateDown : ''}`}>
    {/* <div className={classNames(styles.loading, [{animateDown: styles.animateDown}])}> */}
        <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
        <h1 className={styles.message}>Loading... </h1>
    </div>
  );
};

export default Loading;