function BakeryProfile() {
  const bakery = {
    businessName: "Thrifted Bakery",
    city: "Cerritos",
    state: "CA",
    bio: "Home-based bakery specializing in custom cakes, cake pops, and desserts."
  }

  const blocks = ["Cake", "Cupcakes", "Cake Pops"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Banner Placeholder */}
        <div className="h-56 rounded-[2rem] border border-pink-100 bg-gradient-to-r from-pink-200 via-rose-200 to-orange-100 shadow-sm"></div>

        {/* Profile Card */}
        <div className="-mt-16 rounded-[2rem] border border-pink-100 bg-white/90 p-8 shadow-xl backdrop-blur-md md:p-10">

          {/* Logo Placeholder */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-pink-200 to-rose-300 shadow-lg ring-4 ring-pink-100">
              <span className="text-sm font-semibold text-pink-700">
                Logo
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-pink-400">
              Home Bakery
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-pink-800 md:text-5xl">
              {bakery.businessName}
            </h1>

            <p className="mt-3 text-gray-500">
              📍 {bakery.city}, {bakery.state}
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">
              {bakery.bio}
            </p>
          </div>

          {/* Info Cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-pink-50 p-5 text-center">
              <p className="text-2xl">🎂</p>
              <h3 className="mt-2 font-bold text-pink-800">Custom Orders</h3>
              <p className="mt-1 text-sm text-gray-600">
                Cakes, cupcakes, and sweets made to order.
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5 text-center">
              <p className="text-2xl">🧁</p>
              <h3 className="mt-2 font-bold text-pink-800">Fresh Desserts</h3>
              <p className="mt-1 text-sm text-gray-600">
                Homemade treats for events and celebrations.
              </p>
            </div>

            <div className="rounded-2xl bg-rose-50 p-5 text-center">
              <p className="text-2xl">💌</p>
              <h3 className="mt-2 font-bold text-pink-800">Easy Requests</h3>
              <p className="mt-1 text-sm text-gray-600">
                Submit your order request in just a few steps.
              </p>
            </div>
          </div>

          {/* Available Orders */}
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Orders
              </h2>

              <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700">
                Now Accepting
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {blocks.map((block) => (
                <div
                  key={block}
                  className="rounded-full border border-pink-200 bg-white px-5 py-2 text-sm font-semibold text-pink-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-pink-50"
                >
                  {block}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="mt-10 w-full rounded-2xl bg-pink-600 py-4 text-lg font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-700"
          >
            Start Order Request
          </button>

        </div>
      </div>
    </div>
  )
}

export default BakeryProfile