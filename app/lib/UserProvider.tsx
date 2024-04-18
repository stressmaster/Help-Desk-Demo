'use client'

import React, { createContext, useContext } from 'react';
import { User } from './definitions';


const UserContext = createContext<User | null | undefined>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ user: User | undefined; children: React.ReactNode }> = ({ user, children }) => (
  <UserContext.Provider value={user}>
    {children}
  </UserContext.Provider>
);

