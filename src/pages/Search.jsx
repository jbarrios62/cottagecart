import { useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"

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
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredBakers = bakers.filter((baker) => {
    const search = searchTerm.toLowerCase()

    return (
      baker.businessName.toLowerCase().includes(search) ||
      baker.city.toLowerCase().includes(search) ||
      baker.state.toLowerCase().includes(search)
    )
  })

  return (
    <div className="min-h-screen bg-cream px-4 py-10">

      <div className="mx-auto max-w-6xl">

        {/* Back */}

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-lg font-semibold text-chocolate transition hover:text-espresso"
        >
          ← Back to Home
        </Link>


        {/* Page Header */}

        <div className="mb-10 text-center">

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-warm-brown">
            Sweet Treat Locator
          </p>

          <h1 className="text-5xl font-extrabold text-chocolate">
            Find a Bakery
          </h1>

          <p className="mt-3 text-lg text-espresso">
            Search home-based bakeries by business name or location.
          </p>

        </div>


        {/* Search + Filter */}

        <div className="mx-auto flex max-w-4xl gap-3">

          <input
            type="text"
            placeholder="Search by bakery name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-0 flex-1 rounded-2xl border border-light-brown bg-white p-4 text-espresso shadow-sm placeholder:text-soft-peach focus:border-muted-peach focus:outline-none focus:ring-1 focus:ring-muted-peach"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-2xl border border-light-brown bg-white px-5 text-chocolate shadow-sm focus:border-muted-peach focus:outline-none focus:ring-1 focus:ring-muted-peach"
          >
              <option value="" disabled>Filter by treat...</option>
            <option value="All">All Treats</option>
            <option value="Cakes">Cakes</option>
            <option value="Cupcakes">Cupcakes</option>
            <option value="Cookies">Cookies</option>
            <option value="Cake Pops">Cake Pops</option>
            <option value="Brownies">Brownies</option>
            <option value="Sourdough">Sourdough</option>
            <option value="Dessert Tables">Dessert Tables</option>
          </select>

        </div>


        {/* Bakery Grid */}

        <div className="mt-10 grid gap-8 md:grid-cols-2">

          {filteredBakers.map((baker) => (

            <div
              key={baker.id}
              className="overflow-hidden rounded-[2rem] border border-muted-peach bg-light-cream shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Bakery Banner */}

              <div className="h-40 bg-gradient-to-r from-soft-peach via-cream to-light-brown"></div>


              {/* Bakery Logo */}

              <div className="-mt-10 flex justify-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-light-cream bg-soft-peach font-bold text-chocolate shadow-lg">
                  Logo
                </div>

              </div>


              {/* Bakery Info */}

              <div className="px-6 pb-6 pt-4 text-center">

                <h2 className="text-2xl font-bold text-chocolate">
                  {baker.businessName}
                </h2>

                <p className="mt-2 text-espresso">
                  📍 {baker.city}, {baker.state}
                </p>


                {baker.businessName === "Thrifted Bakery" ? (

                  <Link
                    to="/bakery"
                    className="mt-6 block w-full rounded-2xl bg-soft-peach py-3 text-center font-bold text-white shadow-md transition hover:bg-muted-peach"
                  >
                    View Bakery
                  </Link>

                ) : (

                  <button
                    className="mt-6 w-full cursor-not-allowed rounded-2xl bg-light-brown/30 py-3 font-bold text-warm-brown"
                    disabled
                  >
                    Coming Soon
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>


        {/* No Results */}

        {filteredBakers.length === 0 && (

          <div className="mt-16 text-center">

            <p className="text-xl font-bold text-chocolate">
              No bakeries found
            </p>

            <p className="mt-2 text-espresso">
              Try searching for another bakery name or location.
            </p>

          </div>

        )}

      </div>
      
      <Footer />

    </div>
    
  )
}

export default Search