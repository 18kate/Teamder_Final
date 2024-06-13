import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';


// Создаем контекст аутентификации
const AuthContext = createContext({
    session: null,
    loading: true
});

// Определяем AuthProvider компонент
export default function AuthProvider({ children }) {
    const [session, setSession] = useState(null); // Состояние для хранения данных аутентификации
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchSession = async() => {
            const {data} = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        };

        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session,loading }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);
