// app/components/Sidebar.tsx
import { Link } from "react-router";
import { useAuth } from "~/hooks/use-auth";

export default function Login() {
  const { email, setEmail, password, setPassword, isLoading, error, login } =
    useAuth();

  return (
    <div className="flex items-center justify-center w-full min-h-screen ">
      <div className="w-full md:w-1/3">
        <div className="relative flex flex-col items-center ">
          <div className="absolute z-10 flex left-5 top-5">
            <a
              href="/"
              className="px-2 py-2 rounded-full hover:bg-gray-200 bg-gray-200/75 dark:hover:bg-neutral-700/100 dark:bg-neutral-800/25"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="loginIconTitle"
              >
                <title id="loginIconTitle">Login button</title>
                <path
                  d="M14.707 5.293a1 1 0 0 1 0 1.414L9.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="px-4 py-4 md:px-8">
          <form method="post" name="login" onSubmit={login}>
            <input type="hidden" x-model="url" name="return_url" />

            <div className="flex flex-col space-y-4 ">
              <div className="flex flex-col items-center space-y-2">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Auth
                </h3>

                <div className="text-sm text-gray-500 dark:text-neutral-400">
                  enter_your_account_details
                </div>
              </div>

              <div>
                <div className="floating">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="floating_input"
                    placeholder=""
                  />
                  <label htmlFor="email" className="floating_label" data-content="Email">
                    <span className="hidden--visually">Email</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="floating">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="floating_input"
                    placeholder="••••••••"
                  />
                  <label htmlFor="password" className="floating_label" data-content="Password">
                    <span className="hidden--visually">Password</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/lost-password"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-500"
                >
                  Forgot password
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-5 py-3 font-medium text-center text-white bg-blue-600 rounded-full hover:bg-blue-600 hover:bg-blue-600/75"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
