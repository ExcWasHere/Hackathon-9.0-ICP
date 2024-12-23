export default function AboutUsHero() {
    return (
      <div className="h-[50vh] relative">
        <img
          src="EcoNova.jpg"
          alt="EcoNova Hero"
          className="absolute inset-0 object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900 via-violet-900/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bersama membangun negeri, wujudkan impian bebas polusi
            </h1>
          </div>
        </div>
      </div>
    );
  }