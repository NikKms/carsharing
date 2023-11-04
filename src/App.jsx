import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import { BrowserRouter as Router } from "react-router-dom";
import Layout from './components/Layout';
import Routings from './router/Routings';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './i18n'


function App() {


  return (
    <Provider store={store}>
      <ChakraProvider theme={theme} >
        <ColorModeScript initialColorMode="light" />
        <Router>
          <Layout>
            <PersistGate loading={null} persistor={persistor}>
              <Routings />
            </PersistGate>
          </Layout>
        </Router>
      </ChakraProvider>
    </Provider >
  )

}

export default App
