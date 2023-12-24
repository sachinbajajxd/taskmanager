"use client"

import React, {useState, useEffect} from 'react'
import { GlobalProvider } from '../context/globalProvider';

interface Props {
    children: React.ReactNode;
}

const ContextProvider: React.FC<Props> = ({children}) => {

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsReady(true), 200)
    }, [])

    if(!isReady) return null;

    return <GlobalProvider>{children}</GlobalProvider>
}

export default ContextProvider