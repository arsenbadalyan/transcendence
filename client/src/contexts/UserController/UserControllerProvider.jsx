import { createContext } from "react";

export const UserControllerContext = createContext(null);

const UserControllerProvider = ({ children }) => {

    

    return (
        <UserControllerContext.Provider value={{
            
        }}
        >
            { children }
        </UserControllerContext.Provider>
    );

};

export default UserControllerProvider;