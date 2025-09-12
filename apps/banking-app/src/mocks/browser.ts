import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { initializeDatabase } from './data/db'

// Initialize the database when MSW starts
initializeDatabase()

export const worker = setupWorker(...handlers)