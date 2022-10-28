import { createContext, useState, useContext, ReactNode } from 'react'

import { User } from '../api'

type UserProfileContext = {
  userProfile: User
  setUserProfile(user: User): void
}

type UserProfileContextProps = {
  children: ReactNode
}

const UserProfileContext = createContext<UserProfileContext>(
  {} as UserProfileContext
)

export const UserProfileProvider = ({ children }: UserProfileContextProps) => {
  const [userProfile, setUserProfile] = useState<User>({} as User)

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export function useUserProfile(): UserProfileContext {
  const context = useContext(UserProfileContext)
  if (!context) {
    throw new Error('useUserProfile must be used within an UserProfileProvider')
  }
  return context
}
