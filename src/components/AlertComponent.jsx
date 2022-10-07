import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AlertComponent = () => {
    const filteredFromSearch = useSelector(state => state.filteredFromSearchStatus)

    const refreshEverything = () => {
        window.location.reload(false);
    }

    return (
        <Alert key={'primary'} variant={'primary'}>
          You are now searching for {filteredFromSearch.searchValue} Product. 
          Click this <Button variant={'info'} onClick={refreshEverything}>Clear</Button> to refresh products.
        </Alert>
    );
};

export default AlertComponent;