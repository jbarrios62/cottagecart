function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 px-4 py-10">

      {/* Soft Gradient Background Glows */}
      <div className="absolute left-[-120px] top-[-100px] h-[400px] w-[400px] rounded-full bg-pink-300/30 blur-3xl"></div>
      <div className="absolute right-[-120px] top-[-80px] h-[450px] w-[450px] rounded-full bg-orange-300/25 blur-3xl"></div>
      <div className="absolute bottom-[-120px] left-[-80px] h-[350px] w-[350px] rounded-full bg-rose-300/25 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-80px] h-[400px] w-[400px] rounded-full bg-orange-200/25 blur-3xl"></div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-white/40 bg-gradient-to-br from-white/95 to-pink-50/80 p-8 text-center shadow-2xl backdrop-blur-md md:p-12">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-pink-400">
            Welcome To
          </p>

          <h1 className="text-5xl font-extrabold tracking-tight text-pink-800 md:text-7xl">
            CottageCart
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-700 md:text-xl">
            Discover local home-based bakeries, view their desserts, and start
            custom order requests all in one place.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">

            {/* Sweet Treat Locator */}
            <div className="rounded-[2rem] border border-pink-100 bg-gradient-to-br from-pink-50 to-rose-100 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <button className="w-full rounded-2xl bg-pink-600 px-8 py-5 text-xl font-bold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700">
                Sweet Treat Locator
              </button>

              <p className="mt-5 text-base leading-relaxed text-gray-600">
                Search home-based bakeries by name or location.
              </p>
            </div>

            {/* Baker Login */}
            <div className="rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <button className="w-full rounded-2xl bg-orange-500 px-8 py-5 text-xl font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600">
                Baker Login
              </button>

              <p className="mt-5 text-base leading-relaxed text-gray-600">
                Login or Create a profile to sell your bakery items.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Home