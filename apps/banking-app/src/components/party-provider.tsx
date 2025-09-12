'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Party {
  id: string
  type: 'PERSON' | 'BUSINESS'
  name: string
  accounts: Array<{
    id: string
    name: string
    type: string
    balance: number
  }>
}

interface PartyContextType {
  selectedParty: Party | null
  setSelectedParty: (party: Party) => void
  parties: Party[]
  setParties: (parties: Party[]) => void
}

const PartyContext = createContext<PartyContextType | undefined>(undefined)

export function useParty() {
  const context = useContext(PartyContext)
  if (context === undefined) {
    throw new Error('useParty must be used within a PartyProvider')
  }
  return context
}

interface PartyProviderProps {
  children: ReactNode
}

export function PartyProvider({ children }: PartyProviderProps) {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null)
  const [parties, setParties] = useState<Party[]>([])

  const value = {
    selectedParty,
    setSelectedParty,
    parties,
    setParties,
  }

  return (
    <PartyContext.Provider value={value}>
      {children}
    </PartyContext.Provider>
  )
}