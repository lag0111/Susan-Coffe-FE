'use client'
import Providers from '../../../redux/provider';
import dynamic from 'next/dynamic';
import { persistor } from '../../../redux/store';

const PersistGate = dynamic(
    () => import('redux-persist/integration/react').then(mod => mod.PersistGate),
    { ssr: false }
);


export default function ReduxRender({ children }) {
    return <Providers >
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Providers>;
}