import React from 'react';
import { useParams } from 'react-router-dom';

function Test01() {
    const {emp_no} = useParams();

    return (
        <div>
            Emp #: {emp_no}
        </div>
    );
}

export default Test01;