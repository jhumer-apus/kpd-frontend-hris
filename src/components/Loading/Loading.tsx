
import React from 'react';
import styles from './Loading.module.scss';

//import a spinning font awesome for loading  icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


// make the spinner spin using font awesome

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
        <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
        <h1 className={styles.message}>Loading... </h1>
    </div>
  );
};

export default Loading;