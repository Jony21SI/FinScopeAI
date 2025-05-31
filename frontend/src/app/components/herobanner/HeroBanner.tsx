const HeroBanner = () => {
  return (
    <div className="bg-feijoa-500 text-feijoa-50 pt-15 mx-auto flex justify-around items-center w-100%  h-[330px]">
      <div className="w-1/2 px-20 h-80 overflow-hidden">
        <h2 className="capitalize pb-5 ">Smarter Financial Planning with AI</h2>
        <h5 className="mb-8 pr-16 overflow-hidden break-words">
          Manage your finances effectively with intelligent budgeting and
          insights powered by AI
        </h5>
        <a
          href="/auth/signup"
          className="bg-feijoa-700  px-6 py-3 rounded-xl font-semibold text-xl hover:bg-feijoa-800  duration-300"
        >
          Get Started
        </a>
      </div>
      <div className="w-1/2 px-20 h-80">
        <img
          src="/FinScopeAI-Icon.png"
          alt="FinScopeAI Logo"
          className="w-32 h-32 mx-auto mt-8 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
