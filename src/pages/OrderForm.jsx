import { useState } from "react"
import { Link } from "react-router-dom"

function OrderForm() {
  // =========================================================
  // MOCK BAKER CONFIGURATION
  // Later: Supabase will provide this based on the baker.
  // =========================================================

  const bakery = {
    businessName: "Thrifted Bakery",
    responseTime: "2 days",
    logo: null,
  }

  const offerings = [
    {
      id: "cake",
      name: "Cake",
      description: "Custom cakes for birthdays, celebrations, and special events.",
      image: null,
      enabled: true,
    },
    {
      id: "cupcakes",
      name: "Cupcakes",
      description: "Custom cupcakes available by the dozen.",
      image: null,
      enabled: true,
    },
    {
      id: "cake-pops",
      name: "Cake Pops",
      description: "Decorated cake pops customized for your event.",
      image: null,
      enabled: true,
    },
    {
      id: "strawberries",
      name: "Chocolate Covered Strawberries",
      description: "Chocolate-dipped strawberries customized to your theme.",
      image: null,
      enabled: true,
    },
    {
      id: "dessert-cups",
      name: "Dessert Cups",
      description: "Individual dessert cups for parties and events.",
      image: null,
      enabled: true,
    },
    {
      id: "other",
      name: "Other",
      description: "Have something else in mind? Send us your idea.",
      image: null,
      enabled: true,
    },
  ]

  const enabledOfferings = offerings.filter((offering) => offering.enabled)

  // =========================================================
  // STATE
  // =========================================================

  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [order, setOrder] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    pickup_date: "",
    order_type: "",
    status: "pending_review",
    notes: "",
    dessert_table_notes: "",
    inspiration_images: [],
    delivery_method: "",
    delivery_address: "",
  })

  const [items, setItems] = useState([])

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
    "w-full rounded-xl border border-soft-peach bg-white px-4 py-3 text-espresso shadow-sm outline-none transition placeholder:text-light-brown focus:border-muted-peach focus:ring-2 focus:ring-soft-peach/40"

  // =========================================================
  // ORDER LOGIC
  // =========================================================

  function updateOrder(e) {
    const { name, value } = e.target

    setOrder((previousOrder) => ({
      ...previousOrder,
      [name]: value,
    }))
  }

  function createBlankItem(dessertType) {
    return {
      dessert_type: dessertType,
      quantity: "",
      flavor: "",
      filling: "",
      cake_shape: "",
      servings: "",
      design_choice: "",
      dessert_cups:
      dessertType === "Dessert Cups"
        ? [
            {
              type: "",
              quantity: "",
            },
          ]
        : [],
      cupcake_flavors: "",
      cakepop_flavors: "",
    }
  }

  function changeOrderType(type) {
    setOrder((previousOrder) => ({
      ...previousOrder,
      order_type: type,
      dessert_table_notes:
        type === "dessert_table"
          ? previousOrder.dessert_table_notes
          : "",
      inspiration_images: [],
    }))

    setItems([])
  }

  function selectSingleDessert(dessertType) {
    setItems([createBlankItem(dessertType)])
  }

  function toggleDessertTableItem(dessertType) {
    const alreadySelected = items.some(
      (item) => item.dessert_type === dessertType
    )

    if (alreadySelected) {
      setItems(
        items.filter((item) => item.dessert_type !== dessertType)
      )
    } else {
      setItems([...items, createBlankItem(dessertType)])
    }
  }

  function updateItem(index, e) {
    const { name, value } = e.target
    const updatedItems = [...items]

    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    }

    setItems(updatedItems)
  }

  function updateDessertCup(itemIndex, cupIndex, field, value) {
  const updatedItems = [...items]

  const updatedCups = [
    ...updatedItems[itemIndex].dessert_cups,
  ]

  updatedCups[cupIndex] = {
    ...updatedCups[cupIndex],
    [field]: value,
  }

  updatedItems[itemIndex] = {
    ...updatedItems[itemIndex],
    dessert_cups: updatedCups,
  }

  setItems(updatedItems)
}


function addDessertCup(itemIndex) {
  const updatedItems = [...items]

  updatedItems[itemIndex] = {
    ...updatedItems[itemIndex],
    dessert_cups: [
      ...updatedItems[itemIndex].dessert_cups,
      {
        type: "",
        quantity: "",
      },
    ],
  }

  setItems(updatedItems)
}


function removeDessertCup(itemIndex, cupIndex) {
  const updatedItems = [...items]

  const updatedCups =
    updatedItems[itemIndex].dessert_cups.filter(
      (_, index) => index !== cupIndex
    )

  updatedItems[itemIndex] = {
    ...updatedItems[itemIndex],
    dessert_cups: updatedCups,
  }

  setItems(updatedItems)
}

  function updateInspirationImages(e) {
    const maxImages = order.order_type === "dessert_table" ? 5 : 3
    const newFiles = Array.from(e.target.files)

    const combinedFiles = [
      ...order.inspiration_images,
      ...newFiles,
    ].slice(0, maxImages)

    setOrder((previousOrder) => ({
      ...previousOrder,
      inspiration_images: combinedFiles,
    }))

    e.target.value = ""
  }

  function removeInspirationImage(index) {
    setOrder((previousOrder) => ({
      ...previousOrder,
      inspiration_images:
        previousOrder.inspiration_images.filter(
          (_, imageIndex) => imageIndex !== index
        ),
    }))
  }

  // =========================================================
  // STEP NAVIGATION
  // =========================================================

  function goNext() {
    if (currentStep === 1 && !order.order_type) {
      alert("Please choose an order type.")
      return
    }

    if (currentStep === 2 && items.length === 0) {
      alert("Please select at least one dessert.")
      return
    }

    if (currentStep === 3) {
      if (
        !order.customer_name ||
        !order.customer_email ||
        !order.pickup_date ||
        !order.delivery_method
      ) {
        alert("Please complete the required information.")
        return
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function goBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function goToStep(step) {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleSubmit() {
    const orderPayload = {
      order,
      order_items: items,
    }

    console.log("Ready for Supabase:", orderPayload)

    // Later:
    // 1. Upload inspiration images
    // 2. Insert order
    // 3. Insert order items
    // 4. Send baker notification

    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // =========================================================
  // SUBMITTED SCREEN
  // =========================================================

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">

        <div className="w-full max-w-xl rounded-[2rem] border border-soft-peach bg-white p-8 text-center shadow-lg md:p-12">

          <CookieCelebration />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-warm-brown">
            Request Sent
          </p>

          <h1 className="mt-2 text-3xl font-bold text-espresso">
            Your order request is on its way!
          </h1>

          <p className="mx-auto mt-4 max-w-md leading-relaxed text-warm-brown">
            {bakery.businessName} will review your request and get back to
            you within approximately {bakery.responseTime}.
          </p>

          <div className="mt-7 rounded-2xl bg-light-cream p-5 text-left">

            <p className="font-semibold text-chocolate">
              Remember
            </p>

            <p className="mt-1 text-sm leading-relaxed text-warm-brown">
              Your order is not confirmed until the baker accepts your
              request and sends you confirmation.
            </p>

          </div>

          <Link
            to="/bakery"
            className="mt-7 inline-flex rounded-xl bg-chocolate px-6 py-3 font-semibold text-white transition hover:bg-espresso"
          >
            Back to Bakery
          </Link>

        </div>

      </div>
    )
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-cream px-4 py-8 md:py-12">

      <div className="mx-auto max-w-5xl">

        {/* Back to bakery */}

        <Link
          to="/bakery"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-warm-brown transition hover:text-chocolate"
        >
          ← Back to Bakery
        </Link>

        {/* Bakery Header */}

        <div className="overflow-hidden rounded-[2rem] border border-soft-peach bg-white shadow-sm">

          <div className="h-16 bg-gradient-to-r from-soft-peach/60 via-muted-peach/30 to-light-cream" />

          <div className="px-6 pb-7 md:px-9">

            <div className="-mt-8 flex items-end gap-4">

              {bakery.logo ? (
                <img
                  src={bakery.logo}
                  alt={`${bakery.businessName} logo`}
                  className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-light-cream text-xl font-bold text-chocolate shadow-md">
                  TB
                </div>
              )}

              <div className="pb-1">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown">
                  Custom Order Request
                </p>

                <h1 className="text-xl font-bold text-chocolate">
                  {bakery.businessName}
                </h1>

              </div>

            </div>

          </div>

        </div>

        {/* Cookie Progress */}

        <div className="mt-7 rounded-[2rem] border border-soft-peach bg-white px-4 py-6 shadow-sm md:px-8">

          <CookieProgress
            currentStep={currentStep}
            goToStep={goToStep}
          />

        </div>

        {/* Current Step */}

        <div
          key={currentStep}
          className="mt-7 animate-[stepIn_0.35s_ease-out]"
        >

          {/* =================================================
              STEP 1
          ================================================== */}

          {currentStep === 1 && (

            <StepCard>

              <StepIntro
                eyebrow="Step 1 of 4"
                title="What kind of order is this?"
                description="Start by choosing the type of request that best matches what you're planning."
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2">

                <OrderTypeCard
                  title="Single Order"
                  description="One dessert type such as a cake, cupcakes, cake pops, or another treat."
                  selected={order.order_type === "single"}
                  onClick={() => changeOrderType("single")}
                />

                <OrderTypeCard
                  title="Dessert Table / Event"
                  description="Multiple dessert types for a party, celebration, dessert table, or special event."
                  selected={order.order_type === "dessert_table"}
                  onClick={() => changeOrderType("dessert_table")}
                />

              </div>

              <StepButtons
                showBack={false}
                onNext={goNext}
                nextDisabled={!order.order_type}
              />

            </StepCard>

          )}

          {/* =================================================
              STEP 2
          ================================================== */}

          {currentStep === 2 && (

            <StepCard>

              <StepIntro
                eyebrow="Step 2 of 4"
                title={
                  order.order_type === "dessert_table"
                    ? "Build your dessert table."
                    : "Build your order."
                }
                description={
                  order.order_type === "dessert_table"
                    ? "Tell us about your event, select everything you'd like included, and customize your desserts."
                    : "Choose what you'd like and tell your baker exactly what you have in mind."
                }
              />

              {/* Dessert Table Event Description */}

              {order.order_type === "dessert_table" && (

                <div className="mt-8 rounded-2xl border border-soft-peach bg-light-cream/40 p-5 md:p-6">

                  <h3 className="text-lg font-bold text-chocolate">
                    Tell us about your event
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-warm-brown">
                    Give your baker some context about the celebration,
                    theme, colors, setup, or overall vision.
                  </p>

                  <textarea
                    name="dessert_table_notes"
                    value={order.dessert_table_notes}
                    onChange={updateOrder}
                    placeholder="Example: Berry first birthday with white florals, strawberries, soft pink details, and a vintage-style dessert table..."
                    className={`${fieldClass} mt-4`}
                    rows="4"
                  />

                </div>

              )}

              {/* Offerings */}

              <div className="mt-8">

                <div>

                  <h3 className="text-lg font-bold text-chocolate">
                    {order.order_type === "dessert_table"
                      ? "What would you like included?"
                      : "What would you like to order?"}
                  </h3>

                  <p className="mt-1 text-sm text-warm-brown">
                    {order.order_type === "dessert_table"
                      ? "Select as many options as you'd like."
                      : "Select one option."}
                  </p>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">

                  {enabledOfferings.map((offering) => {

                    const selected = items.some(
                      (item) =>
                        item.dessert_type === offering.name
                    )

                    return (
                      <OfferingCard
                        key={offering.id}
                        offering={offering}
                        selected={selected}
                        onClick={() => {
                          if (
                            order.order_type === "dessert_table"
                          ) {
                            toggleDessertTableItem(offering.name)
                          } else {
                            selectSingleDessert(offering.name)
                          }
                        }}
                      />
                    )
                  })}

                </div>

              </div>

              {/* Customization */}

              {items.length > 0 && (

                <div className="mt-10 border-t border-soft-peach pt-8">

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown">
                    Your Selection
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-chocolate">
                    Customize your order
                  </h3>

                  <div className="mt-5 space-y-5">

                    {items.map((item, index) => (

                      <DessertCustomization
                        key={item.dessert_type}
                        item={item}
                        index={index}
                        updateItem={updateItem}
                        updateDessertCup={updateDessertCup}
                        addDessertCup={addDessertCup}
                        removeDessertCup={removeDessertCup}
                        fieldClass={fieldClass}
                        halfQuantityOptions={halfQuantityOptions}
                        dzQuantityOptions={dzQuantityOptions}
                      />

                    ))}

                  </div>

                  {/* ONE overall notes area */}

                  <div className="mt-8 border-t border-soft-peach pt-8">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-lg font-bold text-chocolate">
                          Tell your baker more
                        </h3>

                        <p className="mt-1 text-sm text-warm-brown">
                          Add anything that wasn't covered above.
                        </p>

                      </div>

                      <OptionalBadge />

                    </div>

                    <textarea
                      name="notes"
                      value={order.notes}
                      onChange={updateOrder}
                      placeholder={
                        order.order_type === "dessert_table"
                          ? "Colors, decorations, writing, allergies, budget, special requests, or anything else your baker should know..."
                          : "Theme, colors, writing, decorations, allergies, custom requests, or anything else your baker should know..."
                      }
                      className={`${fieldClass} mt-4`}
                      rows="4"
                    />

                  </div>

                  {/* ONE inspiration area */}

                  <ImageUploader
                    title={
                      order.order_type === "dessert_table"
                        ? "Overall Inspiration"
                        : "Inspiration Photos"
                    }
                    description={
                      order.order_type === "dessert_table"
                        ? "Share photos showing the overall theme, colors, desserts, or setup you're going for."
                        : "Show your baker the look, colors, or design you're going for."
                    }
                    images={order.inspiration_images}
                    onChange={updateInspirationImages}
                    onRemove={removeInspirationImage}
                    inputId="order-inspiration"
                    maxImages={
                      order.order_type === "dessert_table" ? 5 : 3
                    }
                  />

                </div>

              )}

              <StepButtons
                showBack
                onBack={goBack}
                onNext={goNext}
                nextDisabled={items.length === 0}
              />

            </StepCard>

          )}

          {/* =================================================
              STEP 3
          ================================================== */}

          {currentStep === 3 && (

            <StepCard>

              <StepIntro
                eyebrow="Step 3 of 4"
                title="Your details."
                description="Let your baker know how to contact you and when you need your order."
              />

              {/* Contact */}

              <div className="mt-8">

                <h3 className="text-lg font-bold text-chocolate">
                  Contact Information
                </h3>

                <div className="mt-4 grid gap-5 md:grid-cols-2">

                  <FieldGroup label="Full Name">
                    <input
                      name="customer_name"
                      value={order.customer_name}
                      onChange={updateOrder}
                      placeholder="Your full name"
                      className={fieldClass}
                    />
                  </FieldGroup>

                  <FieldGroup label="Email">
                    <input
                      name="customer_email"
                      type="email"
                      value={order.customer_email}
                      onChange={updateOrder}
                      placeholder="you@example.com"
                      className={fieldClass}
                    />
                    <p className="mt-2 text-xs leading-relaxed text-light-brown">
                      Order updates, questions, and confirmation will be sent to this email.
                    </p>
                  </FieldGroup>



                  <FieldGroup label="Phone Number">
                    <input
                      name="customer_phone"
                      value={order.customer_phone}
                      onChange={updateOrder}
                      placeholder="Phone number"
                      className={fieldClass}
                    />
                  </FieldGroup>

                </div>

              </div>

              {/* Fulfillment */}

              <div className="mt-9 border-t border-soft-peach pt-8">

                <h3 className="text-lg font-bold text-chocolate">
                  When & How
                </h3>

                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-warm-brown">
                  Open dates are available for requests but are not
                  guaranteed until your baker confirms your order.
                </p>

                <Link
                  to="/bakery"
                  className="mt-3 inline-flex text-sm font-semibold text-muted-peach transition hover:text-chocolate"
                >
                  View Bakery Availability →
                </Link>

                <div className="mt-5 grid gap-5 md:grid-cols-2">

                  <FieldGroup label="Date Needed">
                    <input
                      name="pickup_date"
                      type="date"
                      value={order.pickup_date}
                      onChange={updateOrder}
                      className={fieldClass}
                    />
                  </FieldGroup>

                  <FieldGroup label="Pickup or Delivery">
                    <select
                      name="delivery_method"
                      value={order.delivery_method}
                      onChange={updateOrder}
                      className={fieldClass}
                    >
                      <option value="">
                        Select an option
                      </option>
                      <option value="pickup">
                        Pickup
                      </option>
                      <option value="delivery">
                        Delivery
                      </option>
                    </select>
                  </FieldGroup>

                </div>

                {order.delivery_method === "delivery" && (

                  <div className="mt-5">

                    <FieldGroup label="Delivery Address">
                      <textarea
                        name="delivery_address"
                        value={order.delivery_address}
                        onChange={updateOrder}
                        placeholder="Enter the delivery address"
                        className={fieldClass}
                        rows="3"
                      />
                    </FieldGroup>

                  </div>

                )}

              </div>

              <StepButtons
                showBack
                onBack={goBack}
                onNext={goNext}
                nextLabel="Review Request →"
                nextDisabled={
                  !order.customer_name ||
                  !order.customer_email ||
                  !order.pickup_date ||
                  !order.delivery_method
                }
              />

            </StepCard>

          )}

          {/* =================================================
              STEP 4
          ================================================== */}

          {currentStep === 4 && (

            <StepCard>

              <StepIntro
                eyebrow="Step 4 of 4"
                title="Review your request."
                description="Make sure everything looks right before sending it to your baker."
              />

              <div className="mt-8 space-y-5">

                {/* Order Type */}

                <ReviewSection
                  title="Order Type"
                  onEdit={() => goToStep(1)}
                >

                  <p className="font-semibold text-espresso">
                    {order.order_type === "dessert_table"
                      ? "Dessert Table / Event"
                      : "Single Order"}
                  </p>

                  {order.order_type === "dessert_table" &&
                    order.dessert_table_notes && (
                      <p className="mt-2 text-sm leading-relaxed text-warm-brown">
                        {order.dessert_table_notes}
                      </p>
                    )}

                </ReviewSection>

                {/* Desserts */}

                <ReviewSection
                  title="Your Order"
                  onEdit={() => goToStep(2)}
                >

                  <div className="space-y-4">

                    {items.map((item) => (

                      <ReviewItem
                        key={item.dessert_type}
                        item={item}
                      />

                    ))}

                  </div>

                  {order.notes && (

                    <div className="mt-5 border-t border-soft-peach pt-4">

                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-warm-brown">
                        Additional Notes
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-espresso">
                        {order.notes}
                      </p>

                    </div>

                  )}

                  {order.inspiration_images.length > 0 && (

                    <div className="mt-5 border-t border-soft-peach pt-4">

                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-warm-brown">
                        Inspiration
                      </p>

                      <div className="mt-3 flex flex-wrap gap-3">

                        {order.inspiration_images.map(
                          (image, index) => (

                            <img
                              key={`${image.name}-${index}`}
                              src={URL.createObjectURL(image)}
                              alt={`Inspiration ${index + 1}`}
                              className="h-20 w-20 rounded-xl border border-soft-peach object-cover"
                            />

                          )
                        )}

                      </div>

                    </div>

                  )}

                </ReviewSection>

                {/* Customer Details */}

                <ReviewSection
                  title="Your Details"
                  onEdit={() => goToStep(3)}
                >

                  <div className="grid gap-5 md:grid-cols-2">

                    <ReviewValue
                      label="Name"
                      value={order.customer_name}
                    />

                    <ReviewValue
                      label="Email"
                      value={order.customer_email}
                    />

                    <ReviewValue
                      label="Phone"
                      value={
                        order.customer_phone || "Not provided"
                      }
                    />

                    <ReviewValue
                      label="Date Needed"
                      value={formatDate(order.pickup_date)}
                    />

                    <ReviewValue
                      label="Fulfillment"
                      value={
                        order.delivery_method === "delivery"
                          ? "Delivery"
                          : "Pickup"
                      }
                    />

                    {order.delivery_method === "delivery" && (
                      <ReviewValue
                        label="Delivery Address"
                        value={order.delivery_address}
                      />
                    )}

                  </div>

                </ReviewSection>

              </div>

              {/* Inquiry Notice */}

              <div className="mt-7 rounded-2xl border border-muted-peach/40 bg-soft-peach/20 p-5">

                <p className="font-bold text-chocolate">
                  This is an order inquiry, not a confirmed order.
                </p>

                <p className="mt-2 text-sm leading-relaxed text-warm-brown">
                  {bakery.businessName} will review your request and
                  respond within approximately {bakery.responseTime}.
                  Order updates, questions, and confirmation will be sent to 
                  the email address you provided.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-warm-brown">
                  Payment is not required when submitting this form, after order
                  is confirmed {bakery.businessName} will provide payment information.
                </p>

              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-xl border border-soft-peach bg-white px-6 py-3 font-semibold text-chocolate transition hover:bg-light-cream"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-xl bg-chocolate px-8 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-espresso hover:shadow-lg"
                >
                  Submit Order Request
                </button>

              </div>

            </StepCard>

          )}

        </div>

      </div>

      {/* Animation CSS */}

      <style>
        {`
          @keyframes stepIn {
            from {
              opacity: 0;
              transform: translateY(14px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  )
}


// =========================================================
// COOKIE PROGRESS
// =========================================================

function CookieProgress({ currentStep, goToStep }) {
  const steps = [
    {
      number: 1,
      label: "Order Type",
      icon: <FullCookie />,
    },
    {
      number: 2,
      label: "Your Order",
      icon: <BittenCookie />,
    },
    {
      number: 3,
      label: "Your Details",
      icon: <HalfCookie />,
    },
    {
      number: 4,
      label: "Review",
      icon: <CookieCrumbs />,
    },
  ]

  return (
    <div className="relative">

      {/* Connector */}

      <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-soft-peach sm:block" />

      <div className="relative grid grid-cols-4">

        {steps.map((step) => {

          const active = currentStep === step.number
          const completed = currentStep > step.number

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => {
                if (step.number < currentStep) {
                  goToStep(step.number)
                }
              }}
              className={`flex flex-col items-center ${
                step.number < currentStep
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
            >

              <div
                className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white transition duration-300 ${
                  active
                    ? "scale-110 shadow-sm"
                    : completed
                    ? "opacity-70"
                    : "opacity-35"
                }`}
              >
                {step.icon}
              </div>

              <span
                className={`mt-2 text-center text-[11px] font-semibold sm:text-xs ${
                  active
                    ? "text-chocolate"
                    : completed
                    ? "text-warm-brown"
                    : "text-light-brown"
                }`}
              >
                {step.label}
              </span>

            </button>
          )
        })}

      </div>

    </div>
  )
}


// =========================================================
// COOKIE SVGs
// =========================================================

function FullCookie() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12"
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="32"
        r="25"
        fill="#D99A7C"
        stroke="#8A5A44"
        strokeWidth="2"
      />

      <CookieChip x="20" y="20" />
      <CookieChip x="38" y="17" />
      <CookieChip x="29" y="31" />
      <CookieChip x="18" y="40" />
      <CookieChip x="42" y="39" />
      <CookieChip x="33" y="48" />
    </svg>
  )
}


function BittenCookie() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12"
      aria-hidden="true"
    >

      <path
        d="
          M32 7
          C18 7 7 18 7 32
          C7 46 18 57 32 57
          C46 57 57 46 57 32

          C51 32 48 28 49 23
          C44 23 41 19 42 14
          C38 14 35 11 35 7

          C34 7 33 7 32 7
          Z
        "
        fill="#D99A7C"
        stroke="#8A5A44"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <CookieChip x="20" y="20" />
      <CookieChip x="30" y="31" />
      <CookieChip x="18" y="41" />
      <CookieChip x="41" y="41" />
      <CookieChip x="32" y="49" />

    </svg>
  )
}


function HalfCookie() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12"
      aria-hidden="true"
    >
      {/* Clean left half of a round cookie */}
      <path
        d="
          M32 7
          A25 25 0 0 0 32 57
          L32 7
          Z
        "
        fill="#D99A7C"
        stroke="#8A5A44"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Slightly imperfect eaten edge */}
      <path
        d="
          M32 7
          L29 13
          L33 18
          L29 24
          L33 30
          L29 36
          L33 42
          L29 49
          L32 57
        "
        fill="none"
        stroke="#8A5A44"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <CookieChip x="19" y="20" />
      <CookieChip x="25" y="32" />
      <CookieChip x="18" y="43" />
    </svg>
  )
}


function CookieCrumbs() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12"
      aria-hidden="true"
    >
      {/* Tiny final piece of the cookie */}
      <path
        d="
          M21 38
          C21 29 27 22 36 20
          L39 26
          L45 29
          L41 35
          L44 41
          C39 45 33 47 28 45
          C24 44 21 42 21 38
          Z
        "
        fill="#D99A7C"
        stroke="#8A5A44"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <CookieChip x="30" y="34" />
      <CookieChip x="37" y="39" />

      {/* Just a couple tiny crumbs around the last piece */}
      <circle cx="18" cy="48" r="2" fill="#8A5A44" />
      <circle cx="47" cy="46" r="1.5" fill="#B98B73" />
    </svg>
  )
}


function CookieChip({ x, y }) {
  return (
    <circle
      cx={x}
      cy={y}
      r="3"
      fill="#5C382B"
    />
  )
}


function CookieCelebration() {
  return (
    <div className="flex justify-center">

      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-light-cream">
        <FullCookie />

        <span className="absolute -right-1 top-1 text-lg text-muted-peach">
          ✦
        </span>

        <span className="absolute -left-1 bottom-2 text-sm text-warm-brown">
          ✦
        </span>
      </div>

    </div>
  )
}


// =========================================================
// STEP COMPONENTS
// =========================================================

function StepCard({ children }) {
  return (
    <section className="rounded-[2rem] border border-soft-peach bg-white p-6 shadow-sm md:p-9">
      {children}
    </section>
  )
}


function StepIntro({ eyebrow, title, description }) {
  return (
    <div>

      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-peach">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-espresso">
        {title}
      </h2>

      <p className="mt-3 max-w-2xl leading-relaxed text-warm-brown">
        {description}
      </p>

    </div>
  )
}


function StepButtons({
  showBack,
  onBack,
  onNext,
  nextLabel = "Continue →",
  nextDisabled = false,
}) {
  return (
    <div
      className={`mt-9 flex flex-col-reverse gap-3 border-t border-soft-peach pt-6 sm:flex-row ${
        showBack
          ? "sm:items-center sm:justify-between"
          : "sm:justify-end"
      }`}
    >

      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-soft-peach bg-white px-6 py-3 font-semibold text-chocolate transition hover:bg-light-cream"
        >
          ← Back
        </button>
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={`rounded-xl px-7 py-3 font-bold transition ${
          nextDisabled
            ? "cursor-not-allowed bg-soft-peach text-white opacity-60"
            : "bg-chocolate text-white shadow-md hover:-translate-y-0.5 hover:bg-espresso hover:shadow-lg"
        }`}
      >
        {nextLabel}
      </button>

    </div>
  )
}


// =========================================================
// SELECTION CARDS
// =========================================================

function OrderTypeCard({
  title,
  description,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-muted-peach bg-light-cream shadow-sm ring-2 ring-soft-peach/40"
          : "border-soft-peach bg-white hover:-translate-y-0.5 hover:border-muted-peach hover:shadow-sm"
      }`}
    >

      {selected && (
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-muted-peach text-xs font-bold text-white">
          ✓
        </div>
      )}

      <p className="pr-8 text-lg font-bold text-chocolate">
        {title}
      </p>

      <p className="mt-2 pr-6 text-sm leading-relaxed text-warm-brown">
        {description}
      </p>

    </button>
  )
}


function OfferingCard({
  offering,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border text-left transition ${
        selected
          ? "border-muted-peach bg-light-cream shadow-md ring-2 ring-soft-peach/50"
          : "border-soft-peach bg-white hover:-translate-y-0.5 hover:border-muted-peach hover:shadow-sm"
      }`}
    >

      {selected && (
        <div className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-muted-peach text-xs font-bold text-white shadow-sm">
          ✓
        </div>
      )}

      {/* No fake image area.
          If no image exists, the card becomes compact. */}

      {offering.image && (
        <img
          src={offering.image}
          alt={offering.name}
          className="h-32 w-full object-cover"
        />
      )}

      <div
        className={
          offering.image
            ? "p-4"
            : "px-4 py-4 pr-11"
        }
      >

        <p className="font-bold text-chocolate">
          {offering.name}
        </p>

        <p className="mt-1 text-xs leading-relaxed text-warm-brown">
          {offering.description}
        </p>

      </div>

    </button>
  )
}


// =========================================================
// DESSERT CUSTOMIZATION
// =========================================================

function DessertCustomization({
  item,
  index,
  updateItem,
  updateDessertCup,
  addDessertCup,
  removeDessertCup,
  fieldClass,
  halfQuantityOptions,
  dzQuantityOptions,
}) {
  return (
    <div className="rounded-2xl border border-soft-peach bg-light-cream/30 p-5 md:p-6">

      <div className="mb-5">

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-warm-brown">
          Customize
        </p>

        <h4 className="mt-1 text-xl font-bold text-chocolate">
          {item.dessert_type}
        </h4>

      </div>

      {/* Cake */}

      {item.dessert_type === "Cake" && (

        <div className="grid gap-5 md:grid-cols-2">

          <FieldGroup label="Cake Flavor">
            <select
              name="flavor"
              value={item.flavor}
              onChange={(e) => updateItem(index, e)}
              className={fieldClass}
            >
              <option value="">Select flavor</option>
              <option value="Vanilla">Vanilla</option>
              <option value="Yellow">Yellow</option>
              <option value="Red Velvet">Red Velvet</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Strawberry">Strawberry</option>
              <option value="Tres Leches">Tres Leches</option>
              <option value="Churro">
                Churro / Cinnamon Spice
              </option>
              <option value="Mocha">
                Mocha / Espresso Chocolate
              </option>
              <option value="Custom">Custom</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Filling">
            <select
              name="filling"
              value={item.filling}
              onChange={(e) => updateItem(index, e)}
              className={fieldClass}
            >
              <option value="">Select filling</option>
              <option value="Buttercream">
                Plain Buttercream
              </option>
              <option value="Chocolate Ganache">
                Chocolate Ganache
              </option>
              <option value="Cream Cheese">
                Cream Cheese Buttercream
              </option>
              <option value="Strawberries">
                Fresh Strawberries w/ Cream
              </option>
              <option value="Bananas">
                Fresh Bananas w/ Cream
              </option>
              <option value="Berries">
                Fresh Berry Mix w/ Cream
              </option>
              <option value="Bavarian Cream">
                Bavarian Cream
              </option>
              <option value="Custom">Custom</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Cake Shape">
            <select
              name="cake_shape"
              value={item.cake_shape}
              onChange={(e) => updateItem(index, e)}
              className={fieldClass}
            >
              <option value="">Select shape</option>
              <option value="Circle">Circle</option>
              <option value="Rectangle">Rectangle</option>
              <option value="Heart">Heart</option>
              <option value="Custom">Custom</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Servings">
            <input
              name="servings"
              value={item.servings}
              onChange={(e) => updateItem(index, e)}
              placeholder="How many people?"
              className={fieldClass}
            />
          </FieldGroup>

          <div className="md:col-span-2">

            <FieldGroup label="Design Style">
              <select
                name="design_choice"
                value={item.design_choice}
                onChange={(e) => updateItem(index, e)}
                className={fieldClass}
              >
                <option value="">Select design style</option>
                <option value="Vintage">Vintage</option>
                <option value="Minimal">Minimal</option>
                <option value="Floral">Floral</option>
                <option value="Custom">Custom</option>
              </select>
            </FieldGroup>

          </div>

        </div>

      )}

      {/* Cupcakes */}

      {item.dessert_type === "Cupcakes" && (

        <div className="grid gap-5 md:grid-cols-2">

          <FieldGroup label="Quantity">
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
          </FieldGroup>

          <div className="md:col-span-2">

            <FieldGroup label="Flavors">
              <textarea
                name="cupcake_flavors"
                value={item.cupcake_flavors}
                onChange={(e) => updateItem(index, e)}
                placeholder="Example: 1 dozen vanilla, 1 dozen chocolate..."
                className={fieldClass}
                rows="3"
              />
            </FieldGroup>

          </div>

        </div>

      )}

      {/* Cake Pops */}

      {item.dessert_type === "Cake Pops" && (

        <div className="grid gap-5 md:grid-cols-2">

          <FieldGroup label="Quantity">
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
          </FieldGroup>

          <div className="md:col-span-2">

            <FieldGroup label="Flavors">
              <textarea
                name="cakepop_flavors"
                value={item.cakepop_flavors}
                onChange={(e) => updateItem(index, e)}
                placeholder="Example: 1 dozen vanilla, 1 dozen chocolate..."
                className={fieldClass}
                rows="3"
              />
            </FieldGroup>

          </div>

        </div>

      )}

{/* Dessert Cups */}

{item.dessert_type === "Dessert Cups" && (

  <div className="space-y-4">

    {item.dessert_cups.map((cup, cupIndex) => (

      <div
        key={cupIndex}
        className="rounded-xl border border-soft-peach bg-white p-4"
      >

        <div className="mb-4 flex items-center justify-between gap-4">

          <p className="text-sm font-bold text-chocolate">
            Dessert Cup {cupIndex + 1}
          </p>

          {item.dessert_cups.length > 1 && (

            <button
              type="button"
              onClick={() =>
                removeDessertCup(index, cupIndex)
              }
              className="text-xs font-semibold text-muted-peach transition hover:text-chocolate"
            >
              Remove
            </button>

          )}

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <FieldGroup label="Dessert">

            <select
              value={cup.type}
              onChange={(e) =>
                updateDessertCup(
                  index,
                  cupIndex,
                  "type",
                  e.target.value
                )
              }
              className={fieldClass}
            >

              <option value="">
                Select dessert cup
              </option>

              <option value="Fresas con Crema">
                Fresas con Crema
              </option>

              <option value="Tiramisu">
                Tiramisu
              </option>

              <option value="Banana Pudding">
                Banana Pudding
              </option>

              <option value="Custom">
                Custom
              </option>

            </select>

          </FieldGroup>

          <FieldGroup label="Quantity">

            <select
              value={cup.quantity}
              onChange={(e) =>
                updateDessertCup(
                  index,
                  cupIndex,
                  "quantity",
                  e.target.value
                )
              }
              className={fieldClass}
            >

              <option value="">
                How many dozen?
              </option>

              {dzQuantityOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}

            </select>

          </FieldGroup>

        </div>

      </div>

    ))}

    <button
      type="button"
      onClick={() => addDessertCup(index)}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-muted-peach bg-white px-4 py-3 text-sm font-semibold text-chocolate transition hover:bg-light-cream"
    >
      <span className="text-lg text-muted-peach">
        +
      </span>

      Add Another Dessert Cup
    </button>

  </div>

)}

      {/* Strawberries */}

      {item.dessert_type ===
        "Chocolate Covered Strawberries" && (

        <FieldGroup label="Quantity">

          <select
            name="quantity"
            value={item.quantity}
            onChange={(e) => updateItem(index, e)}
            className={fieldClass}
          >

            <option value="">Select quantity</option>

            {halfQuantityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}

          </select>

        </FieldGroup>

      )}

      {/* Other */}

      {item.dessert_type === "Other" && (

        <div className="rounded-xl border border-dashed border-muted-peach bg-white p-4">

          <p className="text-sm font-semibold text-chocolate">
            Custom Request
          </p>

          <p className="mt-1 text-sm leading-relaxed text-warm-brown">
            Describe what you're looking for in the
            “Tell your baker more” section below.
          </p>

        </div>

      )}

    </div>
  )
}


// =========================================================
// IMAGE UPLOADER
// =========================================================

function ImageUploader({
  title,
  description,
  images,
  onChange,
  onRemove,
  inputId,
  maxImages,
}) {
  return (
    <div className="mt-8 border-t border-soft-peach pt-8">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="text-lg font-bold text-chocolate">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-warm-brown">
            {description}
          </p>

        </div>

        <OptionalBadge />

      </div>

      {images.length > 0 && (

        <div className="mt-5 flex flex-wrap gap-3">

          {images.map((image, index) => (

            <div
              key={`${image.name}-${index}`}
              className="relative"
            >

              <img
                src={URL.createObjectURL(image)}
                alt={`Inspiration ${index + 1}`}
                className="h-24 w-24 rounded-xl border border-soft-peach object-cover shadow-sm"
              />

              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-chocolate text-xs font-bold text-white shadow"
              >
                ×
              </button>

            </div>

          ))}

        </div>

      )}

      {images.length < maxImages && (

        <label
          htmlFor={inputId}
          className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-muted-peach bg-light-cream/40 px-6 py-7 text-center transition hover:bg-soft-peach/20"
        >

          <span className="text-2xl font-light text-muted-peach">
            +
          </span>

          <span className="mt-2 text-sm font-semibold text-chocolate">
            Add photos
          </span>

          <span className="mt-1 text-xs text-warm-brown">
            Up to {maxImages} images
          </span>

          <input
            id={inputId}
            type="file"
            accept="image/*"
            multiple
            onChange={onChange}
            className="hidden"
          />

        </label>

      )}

      {images.length > 0 && (

        <p className="mt-2 text-xs text-light-brown">
          {images.length} of {maxImages} images selected
        </p>

      )}

    </div>
  )
}


// =========================================================
// REVIEW
// =========================================================

function ReviewSection({ title, onEdit, children }) {
  return (
    <div className="rounded-2xl border border-soft-peach bg-light-cream/30 p-5 md:p-6">

      <div className="flex items-center justify-between gap-4">

        <h3 className="text-lg font-bold text-chocolate">
          {title}
        </h3>

        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-semibold text-muted-peach transition hover:text-chocolate"
        >
          Edit
        </button>

      </div>

      <div className="mt-4">
        {children}
      </div>

    </div>
  )
}


function ReviewItem({ item }) {
  const details = []

  if (item.flavor) {
    details.push(item.flavor)
  }

  if (item.filling) {
    details.push(`${item.filling} filling`)
  }

  if (item.cake_shape) {
    details.push(`${item.cake_shape} shape`)
  }

  if (item.servings) {
    details.push(`${item.servings} servings`)
  }

  if (item.design_choice) {
    details.push(`${item.design_choice} design`)
  }

  if (item.quantity) {
    details.push(item.quantity)
  }

  if (item.cupcake_flavors) {
    details.push(item.cupcake_flavors)
  }

  if (item.cakepop_flavors) {
    details.push(item.cakepop_flavors)
  }

  return (
    <div>

      <p className="font-bold text-espresso">
        {item.dessert_type}
      </p>

      {/* Normal dessert details */}

      {details.length > 0 && (
        <p className="mt-1 text-sm leading-relaxed text-warm-brown">
          {details.join(" • ")}
        </p>
      )}

      {/* Dessert Cups can contain multiple cup types */}

      {item.dessert_type === "Dessert Cups" &&
        item.dessert_cups?.length > 0 && (

          <div className="mt-3 space-y-1">

            {item.dessert_cups.map((cup, index) => (

              <p
                key={index}
                className="text-sm text-warm-brown"
              >
                {cup.type || "Dessert Cup"}
                {cup.quantity
                  ? ` • ${cup.quantity}`
                  : ""}
              </p>

            ))}

          </div>

        )}

      {/* Only show this if there are truly no details */}

      {details.length === 0 &&
        item.dessert_type !== "Dessert Cups" && (

          <p className="mt-1 text-sm text-light-brown">
            No additional options selected.
          </p>

        )}

    </div>
  )
}


function ReviewValue({ label, value }) {
  return (
    <div>

      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-warm-brown">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-espresso">
        {value || "Not provided"}
      </p>

    </div>
  )
}


// =========================================================
// SHARED COMPONENTS
// =========================================================

function FieldGroup({ label, children }) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-chocolate">
        {label}
      </label>

      {children}

    </div>
  )
}


function OptionalBadge() {
  return (
    <span className="shrink-0 rounded-full bg-light-cream px-3 py-1 text-xs font-semibold text-warm-brown">
      Optional
    </span>
  )
}


function formatDate(date) {
  if (!date) {
    return "Not provided"
  }

  const parsedDate = new Date(`${date}T00:00:00`)

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}


export default OrderForm