import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
} from 'react';
import reducer from './reducer';

const INITIAL_STATE = {
    alert: {
        open: false,
        severity: 'info',
        message: '',
    },
    currentUser: null,
    loading: false,
    openLogIn: false,
    profile: {
        open: false,
        file: null,
        photoURL: '',
    },
};

const Context = createContext(INITIAL_STATE);

export const useValue = () => {
    return useContext(Context);
};

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const mapRef = useRef();
    const containerRef = useRef();
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            dispatch({
                type: 'UPDATE_USER',
                payload: currentUser,
            });
        }
    }, []);

    return (
        <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;