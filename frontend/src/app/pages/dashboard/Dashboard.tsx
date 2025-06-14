import SessionHeader from "@/app/components/sessionHeader/SessionHeader";
import { SessionProps } from "./../../types/sessionTypes";

const Dashboard = ({ session }: SessionProps) => {
  return (
    <>
      <SessionHeader session={session} />
    </>
  );
};

export default Dashboard;
