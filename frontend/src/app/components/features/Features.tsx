import BarChartIcon from "@mui/icons-material/BarChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";

const Features = () => {
  return (
    <div className="bg-feijoa-100  pt-3">
      <div>
        <h2 className="text-4xl text-center my-3">Features</h2>
      </div>
      <div className="flex justify-around pb-10 text-center">
        <div className="flex flex-col items-center border-1 border-feijoa-200 bg-feijoa-50 p-5 rounded-lg w-1/5 h-60">
          <BarChartIcon sx={{ fontSize: 50 }} className="text-feijoa-800 " />
          <h5 className="font-semibold pt-4">Budget Tracking</h5>
          <p className=" p-4">
            Track your expenses and income to stay on top of your budget.
          </p>
        </div>
        <div className="flex flex-col items-center border-1 border-feijoa-200 bg-feijoa-50 p-5 rounded-lg w-1/5 h-60">
          <EmojiEventsIcon sx={{ fontSize: 50 }} className="text-feijoa-800 " />
          <h5 className="font-semibold pt-4">Goal Management</h5>
          <p className="p-4">Set and achieve your financial goals with ease.</p>
        </div>
        <div className="flex flex-col items-center border-1 border-feijoa-200 bg-feijoa-50 p-5 rounded-lg w-1/5 h-60">
          <PsychologyIcon sx={{ fontSize: 50 }} className="text-feijoa-800 " />

          <h5 className="font-semibold pt-4">AI Insights</h5>
          <p className="p-4">
            Get personalized insights and recommendations based on your spending
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
