// ConsentContext.js
import React, { createContext, useState, useContext } from 'react';

const ConsentContext = createContext();

export const useConsent = () => useContext(ConsentContext);

export const ConsentProvider = ({ children }) => {
    const [consent, setConsent] = useState(false);

    return (
        <ConsentContext.Provider value={{ consent, setConsent }}>
            {children}
        </ConsentContext.Provider>
    );
};
