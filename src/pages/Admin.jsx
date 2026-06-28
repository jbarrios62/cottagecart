import { Link } from "react-router-dom"

function Admin() {
  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-pink-100 bg-white/90 p-8 shadow-xl">
        <h1 className="text-4xl font-extrabold text-pink-800">
          Bakery Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your bakery profile, order form, and customer requests.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
            <h2 className="font-bold text-pink-800">Edit Profile</h2>
            <p className="mt-2 text-sm text-gray-600">Update bakery info.</p>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
            <h2 className="font-bold text-pink-800">Edit Order Form</h2>
            <p className="mt-2 text-sm text-gray-600">Manage form options.</p>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
            <h2 className="font-bold text-pink-800">View Orders</h2>
            <p className="mt-2 text-sm text-gray-600">Track order status.</p>
          </div>
        </div>

        <Link
          to="/"
          className="mt-8 block text-center font-bold text-pink-700"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Admin