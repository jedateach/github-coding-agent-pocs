export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileRequest {
  name: string;
  email: string;
}

export interface UserProfileResponse {
  user: UserProfile;
  success: boolean;
  message?: string;
}