import { SessionProps } from "./../../types/sessionTypes";

const SessionHeader = ({ session }: SessionProps) => {
  return (
    <div className="flex p-2 items-center justify-between">
      <div className="flex">
        <img
          src={"./FinScopeAI-Icon.png"}
          alt="FinScopeAI Icon"
          className="w-10 h-10 rounded-full shadow-lg"
        />
        <h1 className="pl-4">FinScopeAI</h1>
      </div>
      <div className="flex items-center gap-4">
        <h5 className="">Dashboard</h5>
        <h5>Insights</h5>
        <h5>Goals</h5>
        <h5>Budget</h5>
      </div>
      <div className="flex items-center">
        <img
          src={session.user.picture}
          alt="User Profile"
          className="w-10 h-10 rounded-full shadow-lg"
        />
        <h1 className="text-5xl px-4">Welcome, {session.user.given_name}!</h1>
        <p className="text-lg pr-4 ">
          <a href="/auth/logout">
            <button className="cursor-pointer">Log out</button>
          </a>
        </p>
      </div>
    </div>
  );
};

export default SessionHeader;
