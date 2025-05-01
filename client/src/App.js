import React from 'react';

import NavBar from './components/NavBar';
import BottomNavbar from './components/BottomNavbar';
import LogIn from './components/login/LogIn';
import Loading from './components/Loading';
import Tiffin from './components/tiffin/Tiffin';
import Notification from './components/notification/Notification';

const App = () => {
    return (
        <React.Fragment>
            <Loading />
            <Notification />
            <LogIn />
            <NavBar />
            <BottomNavbar />
            <Tiffin />
        </React.Fragment>
    );
};

export default App;
