'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@microfrontend-demo/shared-types';
import { getUserProfile } from '@/lib/api/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Edit3 } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editFormLoaded, setEditFormLoaded] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const userProfile = await getUserProfile();
      setUser(userProfile);
    } catch (err) {
      setError('Failed to load user profile');
      console.error('Error loading user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async () => {
    setEditFormLoaded(true);
    
    // In a real microfrontend, this would dynamically load the edit form
    // from the profile-edit zone. For this demo, we'll simulate loading
    // and redirect to the edit zone
    try {
      // Simulate loading the edit microfrontend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In production, this would be a different domain/port for the edit zone
      // For demo purposes, we'll open it in a new window to show separation
      const editUrl = process.env.NODE_ENV === 'production' 
        ? '/profile-edit/' 
        : 'http://localhost:3001/';
      
      window.open(editUrl, '_blank', 'width=600,height=500');
    } catch (err) {
      console.error('Failed to load edit form:', err);
      alert('Failed to load edit form. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={loadUserProfile} variant="outline" className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">No user data found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </CardTitle>
          <CardDescription>
            Your profile information and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <Button 
              onClick={handleEditProfile}
              disabled={editFormLoaded}
              className="flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              {editFormLoaded ? 'Loading Edit Form...' : 'Edit Profile'}
            </Button>
            
            {editFormLoaded && (
              <p className="text-sm text-muted-foreground text-center">
                Edit form will open in a new window (simulating separate microfrontend)
              </p>
            )}
          </div>

          <div className="pt-4 border-t text-xs text-muted-foreground">
            <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 p-4 rounded-lg border bg-muted/20">
        <h3 className="font-semibold mb-2">Microfrontend Architecture Demo</h3>
        <p className="text-sm text-muted-foreground">
          This is the <strong>profile-display</strong> zone. The edit functionality is 
          implemented as a separate <strong>profile-edit</strong> zone that can be 
          deployed independently. Shared components and types are managed through 
          workspace packages.
        </p>
      </div>
    </div>
  );
}