import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = createContext();

/* 
What i really want is to deconstruct whats from props and 
i just want to pull out children so children in this case
is going to refer to the components that we want to wrap 
our provider around
*/

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                    {children}
                </AuthContext.Provider>}
        </div>
    )
}