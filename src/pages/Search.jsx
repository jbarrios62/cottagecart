import { useState } from "react"

function Search() {

  const [bakers] = useState([
    {
      id: 1,
      businessName: "Thrifted Bakery",
      city: "Cerritos",
      state: "CA",
    },
    {
      id: 2,
      businessName: "Sweet Crumbs",
      city: "Long Beach",
      state: "CA",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredBakers = bakers.filter((baker) => {
    const search = searchTerm.toLowerCase()

    return (
      baker.businessName.toLowerCase().includes(search) ||
      baker.city.toLowerCase().includes(search) ||
      baker.state.toLowerCase().includes(search)
    )
  })

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}

        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-pink-800">
            Find a Bakery
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Search home bakeries by business name or location.
          </p>
        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search by bakery name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-pink-100 bg-white p-4 shadow-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100"
        />

        {/* Bakery Grid */}

        <div className="mt-10 grid gap-8 md:grid-cols-2">

          {filteredBakers.map((baker) => (
            <div
              key={baker.id}
              className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Banner */}

              <div className="h-40 bg-gradient-to-r from-pink-200 via-rose-200 to-orange-100"></div>

              {/* Logo */}

              <div className="-mt-10 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-pink-300 font-bold text-pink-800 shadow-lg">
                  Logo
                </div>
              </div>

              {/* Bakery Info */}

              <div className="px-6 pb-6 pt-4 text-center">

                <h2 className="text-2xl font-bold text-pink-800">
                  {baker.businessName}
                </h2>

                <p className="mt-2 text-gray-600">
                  📍 {baker.city}, {baker.state}
                </p>

                <button className="mt-6 w-full rounded-2xl bg-pink-600 py-3 font-bold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700">
                  View Bakery
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Search
