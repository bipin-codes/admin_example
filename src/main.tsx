import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { RouterProvider } from 'react-router-dom';
import rootRouter from 'routers/root.tsx';
import { Provider } from 'react-redux';
import { store, persistor } from 'app/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RouterProvider router={rootRouter} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
