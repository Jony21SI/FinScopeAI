const Header = () => {
  return (
    <div className="flex p-1 bg-feijoa-500  justify-between items-center pb-4">
      <div className="flex gap-1 justify-center items-center">
        <img
          src="/FinScopeAI-Icon.png"
          alt="FinScopeAI Logo"
          className="w-16 h-16 rounded-full"
        />
        <h1 className="text-5xl text-feijoa-50 pl-4">FinScopeAI</h1>
      </div>
      <div className="flex gap-10 text-feijoa-50 pr-10 text-lg">
        <div className=" cursor-pointer hover:text-feijoa-900">
          <a href="#Features">Features</a>
        </div>
        <div className=" cursor-pointer hover:text-feijoa-900">
          <a href="#Pricing">Pricing</a>
        </div>
        <div className=" cursor-pointer hover:text-feijoa-900">
          <a href="#Testimonials">Testimonials</a>
        </div>
        <div className="">
          <a
            href="/auth/login"
            className=" cursor-pointer bg-feijoa-700 px-10 py-2 rounded-lg hover:bg-feijoa-800  duration-300"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
