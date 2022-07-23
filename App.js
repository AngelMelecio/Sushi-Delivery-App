import  React from 'react';
import Main from './src/components/Main'
import Test from './src/components/Test';
import { CasaMakiProvider } from "./src/context/CasaMakiContext";

export default function App() {

  return (
    //<Test/>
    <CasaMakiProvider>
      <Main />
    </CasaMakiProvider>
  )
}


