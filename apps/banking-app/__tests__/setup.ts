import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock MSW in tests
vi.mock('@/mocks/browser', () => ({
  worker: {
    start: vi.fn(),
    stop: vi.fn(),
    use: vi.fn(),
  },
}))

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))