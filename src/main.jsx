import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {DropDownProvider} from "./context/useDropDown.jsx";
import {TradeProvider} from "./context/useTrade.jsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.js";
import {PriceProvider} from "./context/usePrice.jsx";
import {AuthProvider} from "./context/useAuth.jsx";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
               <AuthProvider>
                   <DropDownProvider>
                       <TradeProvider>
                           <PriceProvider>
                               <App/>
                           </PriceProvider>
                       </TradeProvider>
                   </DropDownProvider>
               </AuthProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
)
