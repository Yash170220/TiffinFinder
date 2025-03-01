const reducer = (state, action) => {
    switch (action.type) {

        case 'UPDATE_ALERT':
            return { ...state, alert: action.payload };

        case 'START_LOADING':
            return { ...state, loading: true };

        case 'END_LOADING':
            return { ...state, loading: false };

        case 'OPEN_LOGIN':
            return { ...state, openLogIn: true };

        case 'CLOSE_LOGIN':
            return { ...state, openLogIn: false };

        case 'UPDATE_PROFILE':
            return { ...state, profile: action.payload };

        case 'UPDATE_USER':
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
            return { ...state, currentUser: action.payload };

        default:
            throw new Error('NO matched action!');
    }
};

export default reducer;