import SessionHeader from "@/app/components/sessionHeader/SessionHeader";
import { SessionProps } from "./../../types/sessionTypes";
import ExpenseDisplay from "@/app/components/expense-display/ExpenseDisplay";

const Dashboard = ({ session }: SessionProps) => {
  console.log(session);
  return (
    <>
      <SessionHeader session={session} />
      <ExpenseDisplay session={session} />
    </>
  );
}

export default Dashboard;
