"use client"
import React from 'react'
import styled from 'styled-components'

interface Props {
    children: React.ReactNode
}

const GlobalStyleProvider: React.FC<Props> = ({children}) => {
  return (
    <GlobalStyles>
       {children}
    </GlobalStyles>
  )
}

const GlobalStyles = styled.div`
    padding: 2.5rem;
    display: flex;
    gap: 2.5rem;
    height: 100%;
`;

export default GlobalStyleProvider