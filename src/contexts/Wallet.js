import React from 'react';

export const WalletContext = React.createContext(
    {
        currentKey: "",
        currentKeyName: "",   
        setCurrentKey: ()=>{},
        setCurrentKeyName: ()=>{}
    }
);

export const WalletContextProvider = ({children})=>{
    const context = React.useContext(WalletContext);

    // const [currentKeyName, setCurrentKeyName] = React.useState(context.currentKeyName);
    const [currentKeyName, setCurrentKeyName] = React.useState(context.currentKeyName);
    const [currentKey, setCurrentKey] = React.useState(context.currentKey);

    const contextGivenToChildren = {
        currentKey, currentKeyName, setCurrentKey, setCurrentKeyName
    };
    
    return (
        <WalletContext.Provider value={contextGivenToChildren}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContext;