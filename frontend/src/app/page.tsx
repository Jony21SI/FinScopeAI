import { auth0 } from "@/lib/auth0";

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
  if (!session) {
    return (
      <main>
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
          "
          <h1 className="text-5xl font-bold underline">
            Welcome to FinScopeAI!
          </h1>
          <p>Signup or Login</p>
          <p>
            FinScopeAI is your personal financial assistant, powered by AI.
            Manage your finances effortlessly.
          </p>
          <div className="flex flex-col gap-6">
            <div>
              <a href="/auth/login?screen_hint=signup">
                <button>Sign up</button>
              </a>
            </div>
            <div>
              <a href="/auth/login">
                <button>Log in</button>
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // If session exists, show a welcome message and logout button
  return (
    <main>
      <h1 className="text-5xl">Welcome, {session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <button>Log out</button>
        </a>
      </p>
    </main>
  );
}
