import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { email: null, name: null, _id: null };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    email: null,
    name: null,
    _id: null,
  });

  const setUser = (name, email, _id) => {
    dispatch({ type: "SET_USER", payload: { email, name, _id } });
  };

  return (
    <AuthContext.Provider value={{ user: state, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
