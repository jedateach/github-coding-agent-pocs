import { UserProfile, UpdateUserProfileRequest, UserProfileResponse } from '@microfrontend-demo/shared-types';

// Shared mock data - in a real microfrontend, this would sync via API/shared state
let mockUser: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
};

// For demo purposes, we'll sync with localStorage to share state between zones
const USER_STORAGE_KEY = 'microfrontend-demo-user';

// Load user from localStorage if available
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  if (storedUser) {
    try {
      mockUser = JSON.parse(storedUser);
    } catch {
      console.warn('Failed to parse stored user data');
    }
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getUserProfile(): Promise<UserProfile> {
  await delay(300);
  
  // Check localStorage for latest data
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        mockUser = JSON.parse(storedUser);
      } catch {
        console.warn('Failed to parse stored user data');
      }
    }
  }
  
  return { ...mockUser };
}

export async function updateUserProfile(updates: UpdateUserProfileRequest): Promise<UserProfileResponse> {
  await delay(500);
  
  // Validate input
  if (!updates.name.trim()) {
    return {
      user: mockUser,
      success: false,
      message: 'Name is required'
    };
  }
  
  if (!updates.email.trim() || !updates.email.includes('@')) {
    return {
      user: mockUser,
      success: false,
      message: 'Valid email is required'
    };
  }
  
  // Update the mock user
  mockUser = {
    ...mockUser,
    name: updates.name.trim(),
    email: updates.email.trim(),
    updatedAt: new Date().toISOString()
  };
  
  // Persist to localStorage for cross-zone sync
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
  }
  
  return {
    user: { ...mockUser },
    success: true,
    message: 'Profile updated successfully'
  };
}