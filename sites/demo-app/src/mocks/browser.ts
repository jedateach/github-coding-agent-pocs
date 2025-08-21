import { setupWorker } from 'msw/browser';
import { profileMockHandlers } from '../api/profile.mock';
import { accountsMockHandlers } from '../api/accounts.mock';

export const worker = setupWorker(...profileMockHandlers, ...accountsMockHandlers);