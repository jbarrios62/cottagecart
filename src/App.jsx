import { useEffect, useState } from "react"
import { supabase } from "./services/supabaseClient"

function App() {
  const [bakers, setBakers] = useState([])

  useEffect(() => {
    async function getBakers() {
      const { data, error } = await supabase
        .from("bakers")
        .select("*")

      console.log("DATA:", data)
      console.log("ERROR:", error)

      setBakers(data || [])
    }

    getBakers()
  }, [])

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <h1 className="text-4xl font-bold text-pink-700">
        CottageCart
      </h1>

      <div className="mt-8">
        {bakers.map((baker) => (
          <div
            key={baker.id}
            className="mb-4 rounded-xl bg-white p-4 shadow"
          >
            <h2 className="text-xl font-semibold">
              {baker.business_name}
            </h2>

            <p>
              {baker.city}, {baker.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App