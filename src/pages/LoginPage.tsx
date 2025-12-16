import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { authService } from "../utils/auth";
import type { User } from "../types";

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onSwitchToRegister: () => void;
  onBackToHome?: () => void;
}

const LoginPage: Component<LoginPageProps> = (props) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user = authService.login(email(), password());

    if (user) {
      props.onLoginSuccess(user);
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div class="min-h-screen bg-[#f3f2ed] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={props.onBackToHome}
            class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
          <img
            class="mx-auto h-20 w-auto"
            src="/images/glowy-logo.png"
            alt="Glowy"
          />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <button
              onClick={props.onSwitchToRegister}
              class="font-medium text-pink-600 hover:text-pink-500 cursor-pointer"
            >
              create a new account
            </button>
          </p>
        </div>

        <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error() && (
            <div class="rounded-md bg-red-50 p-4">
              <div class="text-sm text-red-800">{error()}</div>
            </div>
          )}

          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div>
              <label for="password" class="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading()}
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 cursor-pointer"
            >
              {loading() ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Demo credentials: Use any email/password you registered with, or
              create a new account
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
