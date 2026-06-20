import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { SignInData, signInRequest } from '../services/auth';
import { User } from '../services/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthContextData {
    user: User | null;
    loading: boolean;
    signIn: (data: SignInData) => Promise<void>
    signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const STORAGE_KEY = '@hemolink:user'

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStoragedUser() {
            try {
                const userStoraged = await AsyncStorage.getItem(STORAGE_KEY)
                if (userStoraged) {
                    const userLogged = JSON.parse(userStoraged)
                    setUser(userLogged);
                }
            } catch (err) {
                console.error('Erro ao carregar usuário do armazenamento local', err)
            }finally{
                setLoading(false)
            }
        }
        loadStoragedUser()
    }, [])

    //Login
    async function signIn(data:SignInData) {
        const loggedUser = await signInRequest(data)
        await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(loggedUser))
        setUser(loggedUser)
    }
    //Logout
    async function signOut(){
        await AsyncStorage.removeItem(STORAGE_KEY)
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,loading,signIn,signOut}}>
            {children}
        </AuthContext.Provider>
    )


}


export function useAuth():AuthContextData{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth deve ser usando dentro do AuthProvider')
    }
    return context
}