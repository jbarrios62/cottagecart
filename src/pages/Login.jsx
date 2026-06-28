import { Link } from "react-router-dom"

function Login() {
  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10">
      <div className="mx-auto max-w-md rounded-[2rem] border border-pink-100 bg-white/90 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-pink-200 text-pink-800 shadow-md">
            <img src="/images/logos.png" alt="Logo" className="rounded-full object-cover"></img>
          </div>

          <h1 className="text-4xl font-extrabold text-pink-800">
            Baker Login
          </h1>

          <p className="mt-2 text-gray-600">
            Access your bakery dashboard and manage orders.
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-pink-100 bg-white p-3 shadow-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-pink-100 bg-white p-3 shadow-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100"
          />

          <Link
            to="/admin"
            className="block w-full rounded-2xl bg-pink-600 py-4 text-center text-lg font-bold text-white shadow-lg shadow-pink-200 hover:bg-pink-700"
            >
            Login
        </Link>
        </form>

        <div className="mt-8 border-t border-pink-100 pt-6 text-center">
          <p className="text-gray-600">New to CottageCart?</p>

          <button className="mt-3 w-full rounded-2xl border border-pink-200 bg-white py-3 font-bold text-pink-700 shadow-sm hover:bg-pink-50">
            Create Bakery Profile
          </button>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-sm font-semibold text-pink-700 hover:text-pink-800"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Login