import React, {createContext, useReducer} from 'react';

export const AuthContext = createContext();
export default function AuthContextProvider(props) {
  const initialState = {isAuthenticated: false};
  console.log('initialState', initialState);
  const reducer = (state, {type}) => {
    switch (type) {
      case 'LOGIN': {
        return Object.assign({}, {isAuthenticated: true});
      }
      case 'LOGOUT': {
        return Object.assign({}, {isAuthenticated: false});
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
}

// export useAuthContext = () => {
//     return useContext(AuthContext)}
