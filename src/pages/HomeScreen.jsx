import { Link } from "react-router-dom"
import Footer from "../components/Footer"

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream px-4 py-10">

      {/* ombre background */}
      <div className="absolute left-[-120px] top-[-100px] h-[400px] w-[400px] rounded-full bg-soft-peach/30 blur-3xl"></div>
      <div className="absolute right-[-120px] top-[-80px] h-[450px] w-[450px] rounded-full bg-light-brown/20 blur-3xl"></div>
      <div className="absolute bottom-[-120px] left-[-80px] h-[350px] w-[350px] rounded-full bg-muted-peach/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-muted-peach bg-light-cream p-8 text-center shadow-xl md:p-12">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-warm-brown">
            Welcome To
          </p>

          <div className="my-4 flex justify-center">
            <img
              src="/images/logos.png"
              alt="CottageCart Logo"
              className="h-30 w-30 rounded-full border border-muted-peach object-cover shadow-md"
            />
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-chocolate md:text-7xl">
            CottageCart
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-espresso md:text-xl">
            Discover local home-based bakeries, view their desserts, and start
            custom order requests all in one place.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">

            {/* bakery lookup */}
            <div className="rounded-[2rem] border border-soft-peach bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <Link
                to="/search"
                className="block w-full rounded-2xl bg-warm-brown px-8 py-5 text-xl font-bold text-white shadow-lg transition hover:bg-muted-peach"
              >
                Sweet Treat Locator
              </Link>

              <p className="mt-5 text-base leading-relaxed text-espresso">
                Search home-based bakeries by name, item, or location.
              </p>
            </div>

            {/* baker login */}
            <div className="rounded-[2rem] border border-light-brown bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <Link
                to="/login"
                className="block w-full rounded-2xl bg-warm-brown px-8 py-5 text-xl font-bold text-white shadow-lg transition hover:bg-muted-peach"
              >
                Baker Login
              </Link>

              <p className="mt-5 text-base leading-relaxed text-espresso">
                Login or create a profile to manage your bakery.
              </p>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
  
}

export default Home