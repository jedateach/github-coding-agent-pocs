import { UserProfile, UpdateUserProfileRequest, UserProfileResponse } from '@microfrontend-demo/shared-types';

// Default mock user data - in a real app this would come from a database/API
let mockUser: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
};

// For demo purposes, we'll sync with localStorage to share state between zones
const USER_STORAGE_KEY = 'microfrontend-demo-user';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getUserProfile(): Promise<UserProfile> {
  await delay(300); // Simulate network delay
  
  // Check localStorage for latest data first (cross-zone sync)
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        mockUser = parsedUser;
      } catch {
        console.warn('Failed to parse stored user data');
      }
    }
  }
  
  return { ...mockUser };
}

export async function updateUserProfile(updates: UpdateUserProfileRequest): Promise<UserProfileResponse> {
  await delay(500); // Simulate network delay
  
  // Simulate validation
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
  
  return {
    user: { ...mockUser },
    success: true,
    message: 'Profile updated successfully'
  };
}