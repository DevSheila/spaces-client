import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

import ProfilePage from './ProfilePage';
import { useAuth } from '../../hooks';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await auth.login(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (auth.user) {
    return <ProfilePage />;
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1563714193017-5a5fb60bc02b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>

                <img src="/logo-white.svg" className="me-3 h-8" alt=" Logo" />

            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Your Perfect Venue Awaits
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
            Whether you're planning an event or hosting one, we're here to make your experience seamless and stress-free.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>


              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Your Perfect Venue Awaits
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
              Whether you're planning an event or hosting one, we're here to make your experience seamless and stress-free.
              </p>
            </div>

            <div className="mb-40">
              <h1 className="mb-4 text-center text-4xl">Login</h1>
              <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleFormData}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleFormData}
                />
                <button className="primary my-4">Login</button>
              </form>

              <div className="mb-4 flex w-full items-center gap-4">
                <div className="h-0 w-1/2 border-[1px]"></div>
                <p className="small -mt-1">or</p>
                <div className="h-0 w-1/2 border-[1px]"></div>
              </div>

              {/* Google login button */}
              <div className="flex h-[50px] justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleLogin(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  text="continue_with"
                  width="350"
                />
              </div>

              <div className="py-2 text-center text-gray-500">
                Don't have an account yet?{' '}
                <Link className="text-black underline" to={'/register'}>
                  Register now
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LoginPage;
