import { useState } from "react"

function OrderForm() {
  const [order, setOrder] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    pickup_date: "",
    order_type: "single",
    status: "pending_review",
    notes: "",
    dessert_table_notes: "",
    dessert_table_images: [],

    delivery_method: "",
    delivery_address: "",
  })

  const [items, setItems] = useState([
    {
      dessert_type: "",
      quantity: "",
      flavor: "",
      filling: "",
      cake_shape: "",
      servings: "",
      design_choice: "",
      inspiration_images: [],
      customer_notes: "",
      type_of_cup: "",
      cupcake_flavors: "",
    },
  ])

  const halfQuantityOptions = [
    "Half Dozen",
    "One Dozen",
    "One & a Half Dozen",
    "Two Dozen",
    "Two & a Half Dozen",
    "Three Dozen",
    "Three & a Half Dozen",
    "Four Dozen",
    "Four & a Half Dozen",
    "Five Dozen",
    "Other, if more leave in notes",
  ]

  const dzQuantityOptions = [
    "One Dozen",
    "Two Dozen",
    "Three Dozen",
    "Four Dozen",
    "Five Dozen",
    "Other, if more leave in notes",
  ]

  const fieldClass =
    "rounded-xl border border-pink-100 bg-white p-3 shadow-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100"

  const sectionTitle = "text-2xl font-bold text-gray-900"

  function updateOrder(e) {
    const { name, value } = e.target
    setOrder({ ...order, [name]: value })
  }

  function updateOrderImages(e) {
    const files = Array.from(e.target.files).slice(0, 3)
    setOrder({ ...order, dessert_table_images: files })
  }

  function updateItem(index, e) {
    const { name, value } = e.target
    const updatedItems = [...items]
    updatedItems[index][name] = value
    setItems(updatedItems)
  }

  function updateItemImages(index, e) {
    const files = Array.from(e.target.files).slice(0, 3)
    const updatedItems = [...items]
    updatedItems[index].inspiration_images = files
    setItems(updatedItems)
  }

  function createBlankItem() {
    return {
      dessert_type: "",
      quantity: "",
      flavor: "",
      filling: "",
      cake_shape: "",
      servings: "",
      design_choice: "",
      inspiration_images: [],
      customer_notes: "",
      type_of_cup: "",
      cupcake_flavors: "",
    }
  }

  function addItem() {
    setItems([...items, createBlankItem()])
  }

  function removeItem(index) {
    setItems(items.filter((_, itemIndex) => itemIndex !== index))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const orderPayload = {
      order,
      order_items: items,
    }

    console.log("Ready for Supabase:", orderPayload)
    alert("Order request ready!")
  }

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-pink-100 bg-white/90 p-8 shadow-xl">

        {/* Banner Placeholder */}
        <div className="h-48 rounded-[2rem] border border-pink-100 bg-gradient-to-r from-pink-200 via-rose-200 to-orange-100"></div>
        <div className="-mt-12 mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-pink-300 text-sm font-bold text-pink-800 shadow-lg"></div>
        </div>

        <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-pink-800">
            Start Your Order Request
        </h1>

        <p className="mt-2 text-lg text-gray-700">
            Your baker will review your request before payment is required.
        </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-10">
          <section>
            <h2 className={sectionTitle}>Order Type</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setOrder({ ...order, order_type: "single" })}
                className={`rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  order.order_type === "single"
                    ? "border-pink-300 bg-pink-100"
                    : "border-pink-100 bg-white"
                }`}
              >
                <p className="font-bold text-pink-800">Single Item Order</p>
                <p className="mt-1 text-sm text-gray-600">
                  One cake, cupcakes, cake pops, etc.
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setOrder({ ...order, order_type: "dessert_table" })
                }
                className={`rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  order.order_type === "dessert_table"
                    ? "border-pink-300 bg-pink-100"
                    : "border-pink-100 bg-white"
                }`}
              >
                <p className="font-bold text-pink-800">Dessert Table Order</p>
                <p className="mt-1 text-sm text-gray-600">
                  Multiple dessert items for events.
                </p>
              </button>
            </div>
          </section>

          {order.order_type === "dessert_table" && (
            <section className="rounded-2xl border border-pink-100 bg-pink-50 p-5 shadow-sm">
              <h2 className={sectionTitle}>Dessert Table Inspiration</h2>

              <p className="mt-2 text-sm text-gray-600">
                Share the overall theme, colors, setup ideas, or event vision.
              </p>

             



              <textarea
                name="dessert_table_notes"
                value={order.dessert_table_notes}
                onChange={updateOrder}
                placeholder="Example: Berry first birthday theme dessert table for a baby shower with white florals, strawberries, and vintage-style details..."
                className={`mt-4 w-full ${fieldClass}`}
                rows="4"
              />

              <label className="mt-4 block font-bold text-pink-800">
                Upload dessert table inspiration images
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={updateOrderImages}
                className={`mt-2 w-full ${fieldClass}`}
              />

              <p className="mt-2 text-sm text-gray-500">
                Max 3 images. Selected: {order.dessert_table_images.length}
              </p>
            </section>
          )}

          <section>
            <h2 className={sectionTitle}>Order Items</h2>

            <div className="mt-4 space-y-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-pink-100 bg-pink-50 p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold text-pink-800">
                      Item {index + 1}
                    </h3>

                    {order.order_type === "dessert_table" &&
                      items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-sm font-semibold text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <select
                      name="dessert_type"
                      value={item.dessert_type}
                      onChange={(e) => updateItem(index, e)}
                      className={fieldClass}
                      required
                    >
                      <option value="">Select dessert type</option>
                      <option value="Cake">Cake</option>
                      <option value="Cake Pops">Cake Pops</option>
                      <option value="Chocolate Covered Strawberries">Chocolate Covered Strawberries</option>
                      <option value="Cupcakes">Cupcakes</option>
                      <option value="Dessert Cups">Dessert Cups</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {item.dessert_type === "Cake" && (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <select
                        name="flavor"
                        value={item.flavor}
                        onChange={(e) => updateItem(index, e)}
                        className={fieldClass}
                      >
                        <option value="">Cake flavor</option>
                        <option value="Vanilla">Vanilla</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Red Velvet">Red Velvet</option>
                        <option value="Chocolate">Chocolate</option>
                        <option value="Strawberry">Strawberry</option>
                        <option value="Tres Leches">Tres Leches</option>
                        <option value="Churro">Churro / Cinnamon Spice</option>
                        <option value="Mocha">Mocha / Espresso Chocolate</option>
                        <option value="Custom">Custom</option>
                      </select>

                      <select
                        name="filling"
                        value={item.filling}
                        onChange={(e) => updateItem(index, e)}
                        className={fieldClass}
                      >
                        <option value="">Cake filling</option>
                        <option value="Buttercream"> Plain Buttercream</option>
                        <option value="Chocolate Ganache">Chocolate Ganache</option>
                        <option value="Cream Cheese">Cream Cheese Buttercream</option>
                        <option value="Strawberries">Fresh Strawberries w/ Cream</option>
                        <option value="Bananas">Fresh Bananas w/ Cream</option>
                        <option value="Berries">Fresh Berry mix w/ Cream</option>
                        <option value="Bavarian Cream">Bavarian Cream</option>
                        <option value="Custom">Custom</option>
                      </select>

                      <select
                        name="cake_shape"
                        value={item.cake_shape}
                        onChange={(e) => updateItem(index, e)}
                        className={fieldClass}
                      >
                        <option value="">Cake shape</option>
                        <option value="Circle">Circle</option>
                        <option value="Rectangle">Rectangle</option>
                        <option value="Heart">Heart</option>
                        <option value="Custom">Custom</option>
                      </select>

                      <input
                        name="servings"
                        value={item.servings}
                        onChange={(e) => updateItem(index, e)}
                        placeholder="How many people should it feed?"
                        className={fieldClass}
                      />

                      <select
                        name="design_choice"
                        value={item.design_choice}
                        onChange={(e) => updateItem(index, e)}
                        className={`${fieldClass} md:col-span-2`}
                      >
                        <option value="">Choose design style</option>
                        <option value="Vintage">Vintage</option>
                        <option value="Minimal">Minimal</option>
                        <option value="Floral">Floral</option>
                        <option value="Custom">Custom</option>
                      </select>
                    </div>
                  )}

                  {item.dessert_type === "Cupcakes" && (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <select
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, e)}
                        className={fieldClass}
                      >
                        <option value="">How many dozen?</option>
                        {dzQuantityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <textarea
                        name="cupcake_flavors"
                        value={item.cupcake_flavors}
                        onChange={(e) => updateItem(index, e)}
                        placeholder="Cupcake flavors. Example: 1 dozen vanilla, 1 dozen chocolate, 1 dozen strawberry..."
                        className={`${fieldClass} md:col-span-2`}
                        rows="3"
                      />
                    </div>
                  )}

                    {item.dessert_type === "Cake Pops" && (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <select
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, e)}
                        className={fieldClass}
                      >
                        <option value="">How many dozen?</option>
                        {dzQuantityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <textarea
                        name="cakepop_flavors"
                        value={item.cakepop_flavors}
                        onChange={(e) => updateItem(index, e)}
                        placeholder="Cakepop flavors. Example: 1 dozen vanilla, 1 dozen chocolate, 1 dozen strawberry..."
                        className={`${fieldClass} md:col-span-2`}
                        rows="3"
                      />
                    </div>
                  )}

                  {item.dessert_type === "Dessert Cups" && (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <select
                        name="type_of_cup"
                        value={item.type_of_cup}
                        onChange={(e) => updateItem(index, e)}
                        className={fieldClass}
                      >
                        <option value="">Type of Dessert Cup</option>
                        <option value="Fresas con Crema">Fresas con Crema</option>
                        <option value="Tiramisu">Tiramisu</option>
                        <option value="Banana Pudding">Banana Pudding</option>
                        <option value="Custom">Custom</option>
                      </select>

                      <select
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, e)}
                        className={fieldClass}
                      >
                        <option value="">How many dozen?</option>
                        {dzQuantityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {item.dessert_type === "Chocolate Covered Strawberries" && (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <select
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, e)}
                        className={fieldClass}
                      >
                        <option value="">How many dozen?</option>
                        {halfQuantityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {item.dessert_type && (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <textarea
                        name="customer_notes"
                        value={item.customer_notes}
                        onChange={(e) => updateItem(index, e)}
                        placeholder="If selected 'Other' or 'Custom', describe here. Baker will get back to you regarding any questions! Leave notes for theme, allergies, or any other words for the baker..."
                        className={`${fieldClass} w-full`}
                        rows="4"
                      />

                      <div>
                        <label className="block font-bold text-pink-800">
                          Upload item inspiration images
                        </label>

                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => updateItemImages(index, e)}
                          className={`mt-2 w-full ${fieldClass}`}
                        />

                        <p className="mt-2 text-sm text-gray-500">
                          Max 3 images. Selected:{" "}
                          {item.inspiration_images.length}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {order.order_type === "dessert_table" && (
              <button
                type="button"
                onClick={addItem}
                className="mt-4 rounded-2xl border border-pink-200 bg-white px-5 py-3 font-bold text-pink-700 shadow-sm hover:bg-pink-50"
              >
                + Add Another Dessert
              </button>
            )}
          </section>

        <section>
            <h2 className={sectionTitle}>Customer Info</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-6">
                <input
                name="customer_name"
                value={order.customer_name}
                onChange={updateOrder}
                placeholder="Full name"
                className={`${fieldClass} md:col-span-3`}
                required
                />

                <input
                name="customer_email"
                type="email"
                value={order.customer_email}
                onChange={updateOrder}
                placeholder="Email"
                className={`${fieldClass} md:col-span-3`}
                required
                />

                <input
                name="customer_phone"
                value={order.customer_phone}
                onChange={updateOrder}
                placeholder="Phone number"
                className={`${fieldClass} md:col-span-2`}
                />

                <div className="md:col-span-2">
                <label className="mb-2 block font-bold text-pink-800">
                    Date order is to be ready on
                </label>

                <input
                    name="pickup_date"
                    type="date"
                    value={order.pickup_date}
                    onChange={updateOrder}
                    className={fieldClass}
                    required
                />
                </div>

                <div className="md:col-span-2">
                <label className="mb-2 block font-bold text-pink-800">
                    Pickup or Delivery
                </label>

                <select
                    name="delivery_method"
                    value={order.delivery_method}
                    onChange={updateOrder}
                    className={fieldClass}
                    required
                >
                    <option value="">Select</option>
                    <option value="pickup">Pickup</option>
                    <option value="delivery">Delivery</option>
                </select>
                </div>
            </div>

            {order.delivery_method === "delivery" && (
                <textarea
                name="delivery_address"
                value={order.delivery_address}
                onChange={updateOrder}
                placeholder="Delivery address"
                className={`mt-4 w-full ${fieldClass}`}
                rows="3"
                />
            )}
            </section>

          <textarea
            name="notes"
            value={order.notes}
            onChange={updateOrder}
            placeholder="Extra notes, budget, pickup details..."
            className={`w-full ${fieldClass}`}
            rows="4"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-pink-600 py-4 text-lg font-bold text-white shadow-lg shadow-pink-200 hover:bg-pink-700"
          >
            Submit Order Request
          </button>
        </form>
      </div>
    </div>
  )
}

export default OrderForm