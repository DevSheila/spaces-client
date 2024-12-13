import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';

import AccountNav from '@/components/ui/AccountNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import PlacesPage from './PlacesPage';
import { useAuth } from '../../hooks';
import { LogOut, Mail, PenSquare, Text } from 'lucide-react';
import EditProfileDialog from '@/components/ui/EditProfileDialog';

const ProfilePage = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      setRedirect('/');
    } else {
      toast.error(response.message);
    }
  };

  if (!user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mt-8 pt-8">
      {subpage === 'profile' && (
        <>
          <section className="projects section" id="projects">
            <h2 class="section__title-1">
              <span>My Profile.</span>
            </h2>
          </section>
          <div class="mx-auto my-10 flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
            <div class="mb-4 md:mb-0 md:mr-6">
              <img
                class="h-56 rounded-lg object-cover md:w-56"
                src={user.picture}
                alt=""
              />
            </div>
            <div class="">
              <p class="text-xl font-medium text-gray-700">{user.name}</p>
              <p class="mb-4 text-sm font-medium text-gray-500">{user.email}</p>

              <div class="mb-3"></div>
              <div class="flex space-x-2">
                <EditProfileDialog />

                <Button variant="secondary" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
