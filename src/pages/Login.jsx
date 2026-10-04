import { Link } from "react-router-dom"

function Login() {
  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-md rounded-[2rem] border-1 border-muted-peach bg-light-cream p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-espresso text-chocolate shadow-md">
            <img src="/images/logos.png" alt="Logo" className="h-full w-full rounded-full object-cover border-1 border-muted-peach"></img>
          </div>

          <h1 className="text-4xl font-extrabold text-chocolate">
            Baker Login
          </h1>

          <p className="mt-2 text-espresso">
            Access your bakery dashboard and manage orders.
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-light-brown bg-white p-3 shadow-sm focus:border-muted-peach focus:outline-none focus:ring-1 focus:ring-muted-peach placeholder-soft-peach"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-light-brown bg-white p-3 shadow-sm focus:border-muted-peach focus:outline-none focus:ring-1 focus:ring-muted-peach placeholder-soft-peach"
          />

          <Link
            to="/admin"
            className="block w-full rounded-2xl bg-soft-peach py-4 text-center text-lg font-bold text-white shadow-lg shadow-warm-brown-200 hover:bg-muted-peach"
            >
            Login
        </Link>
        </form>

        <div className="mt-8 border-t border-warm-brown pt-6 text-center">
          <p className="text-espresso">New to CottageCart?</p>

          <button className="mt-3 w-full rounded-2xl border border-muted-peach bg-white py-3 font-bold text-chocolate shadow-sm hover:bg-light-brown hover:text-cream">
            Create Bakery Profile
          </button>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-sm font-semibold text-chocolate hover:text-espresso"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Login