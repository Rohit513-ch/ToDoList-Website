"use client";

import { useAuth } from '@/context/auth-context';

export function LoginForm() {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <div className="w-full max-w-xs rounded-xl bg-gray-900/80 backdrop-blur-sm p-8 text-gray-100 shadow-lg border border-gray-700">
      <h2 className="text-center text-2xl font-bold leading-tight">Welcome to TaskZen</h2>
      <p className="mt-2 text-center text-sm text-gray-400">Sign in to continue</p>
      
      <div className="my-8 flex justify-center">
        <button
          aria-label="Log in with Google"
          className="flex items-center justify-center gap-3 w-full rounded-md bg-white/10 p-3 text-center font-semibold text-white transition hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-5 w-5 fill-white">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
          </svg>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
