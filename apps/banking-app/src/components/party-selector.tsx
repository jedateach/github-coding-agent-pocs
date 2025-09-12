'use client'

import { useParty } from './party-provider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useGetCurrentUserQuery } from '@/lib/gql/urql'
import { useEffect } from 'react'

export function PartySelector() {
  const { selectedParty, setSelectedParty, parties, setParties } = useParty()
  const [{ data, fetching, error }] = useGetCurrentUserQuery()

  useEffect(() => {
    if (data?.currentUser?.parties) {
      setParties(data.currentUser.parties)
      
      // Auto-select first party if none selected
      if (!selectedParty && data.currentUser.parties.length > 0) {
        setSelectedParty(data.currentUser.parties[0])
      }
    }
  }, [data, selectedParty, setSelectedParty, setParties])

  if (fetching) {
    return (
      <div className="w-48 h-10 bg-gray-200 animate-pulse rounded-md" />
    )
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Error loading parties
      </div>
    )
  }

  return (
    <Select
      value={selectedParty?.id}
      onValueChange={(value) => {
        const party = parties.find(p => p.id === value)
        if (party) {
          setSelectedParty(party)
        }
      }}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select party" />
      </SelectTrigger>
      <SelectContent>
        {parties.map((party) => (
          <SelectItem key={party.id} value={party.id}>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                {party.type === 'PERSON' ? 'Personal' : 'Business'}
              </span>
              <span>{party.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}