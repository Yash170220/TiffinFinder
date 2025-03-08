import React from 'react';

import NavBar from './components/NavBar';
import BottomNavbar from './components/BottomNavbar';
import LogIn from './components/login/LogIn';

const App = () => {
    return (
        <React.Fragment>
            <NavBar />
            <LogIn />
            <BottomNavbar />
        </React.Fragment>
    );
};

export default App;
