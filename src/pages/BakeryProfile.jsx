import { useState } from "react"
import { Link } from "react-router-dom"

function BakeryProfile() {

  const bakery = {
    businessName: "Thrifted Bakery",
    city: "Cerritos",
    state: "CA",
    bio: "Home-based bakery specializing in custom cakes, cake pops, and desserts.",
  }


  // Available Order Types
  const blocks = [
    "Cake",
    "Cupcakes",
    "Cake Pops",
  ]


  // Gallery Items
  // Bakers will eventually be able to upload up to 12.
  const galleryItems = [
    {
      image: "/images/bakery1.jpg",
      description: "6-inch red velvet cake with cream cheese filling",
      price: "$45",
    },
    {
      image: "/images/bakery2.jpg",
      description: "6-inch chocolate cake with chocolate ganache filling",
      price: "$50",
    },
    {
      image: "/images/bakery3.jpg",
      description: "One dozen custom vanilla cupcakes",
      price: "$36",
    },
    {
      image: "/images/bakery4.jpg",
      description: "One dozen custom cake pops",
      price: "$42",
    },
    {
      image: "/images/bakery5.jpg",
      description: "Custom strawberry shortcake birthday cake",
      price: "$55",
    },
    {
      image: "/images/bakery6.jpg",
      description: "One dozen custom chocolate cupcakes",
      price: "$38",
    },
  ]


  // Gallery State

  const [currentImage, setCurrentImage] = useState(0)


  const nextImage = () => {
    setCurrentImage(
      (currentImage + 1) % galleryItems.length
    )
  }


  const previousImage = () => {
    setCurrentImage(
      (currentImage - 1 + galleryItems.length) %
        galleryItems.length
    )
  }


  // Temporary Calendar Data
  // Later this will come from the baker's availability settings.

  const calendarDays = Array.from(
    { length: 31 },
    (_, index) => index + 1
  )


  const marketDates = [
    3,
    10,
    17,
    24,
  ]


  const openDates = [
    5,
    6,
    12,
    13,
    19,
    20,
    26,
    27,
  ]


  const bookedDates = [
    8,
    9,
    15,
    16,
  ]


  const getDateStatus = (day) => {

    if (marketDates.includes(day)) {
      return "market"
    }

    if (openDates.includes(day)) {
      return "open"
    }

    if (bookedDates.includes(day)) {
      return "booked"
    }

    return null
  }


  return (

    <div className="relative min-h-screen overflow-hidden bg-cream px-4 py-10">


      {/* Background Decorations */}

      <div className="pointer-events-none absolute left-[-120px] top-[-100px] h-[400px] w-[400px] rounded-full bg-soft-peach/25 blur-3xl"></div>

      <div className="pointer-events-none absolute right-[-120px] top-[200px] h-[450px] w-[450px] rounded-full bg-light-brown/20 blur-3xl"></div>


      <div className="relative z-10 mx-auto max-w-5xl">


        {/* Back */}

        <Link
          to="/search"
          className="mb-6 inline-flex items-center gap-2 text-lg font-semibold text-chocolate transition hover:text-espresso"
        >
          ← Back to Search
        </Link>


        {/* Bakery Banner */}

        <div className="h-56 rounded-[2rem] border border-muted-peach bg-gradient-to-r from-soft-peach via-cream to-light-brown shadow-sm"></div>


        {/* Profile Card */}

        <div className="-mt-16 rounded-[2rem] border border-muted-peach bg-light-cream p-8 shadow-xl md:p-10">


          {/* Bakery Logo */}

          <div className="mb-6 flex justify-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-light-cream bg-soft-peach shadow-lg ring-4 ring-muted-peach/30">

              <span className="text-sm font-semibold text-chocolate">
                Logo
              </span>

            </div>

          </div>


          {/* Bakery Information */}

          <div className="text-center">

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-warm-brown">
              Home Bakery
            </p>


            <h1 className="text-4xl font-extrabold tracking-tight text-chocolate md:text-5xl">
              {bakery.businessName}
            </h1>


            <p className="mt-3 text-warm-brown">
              📍 {bakery.city}, {bakery.state}
            </p>


            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-espresso">
              {bakery.bio}
            </p>


            {/* Bakery Tags */}

            <div className="mt-5 flex flex-wrap justify-center gap-3">

              <span className="rounded-full border border-soft-peach bg-white px-4 py-2 text-sm font-medium text-chocolate">
                🧁 Custom Orders
              </span>


              <span className="rounded-full border border-soft-peach bg-white px-4 py-2 text-sm font-medium text-chocolate">
                📅 View Availability
              </span>

            </div>

          </div>



          {/* Our Work */}

          <div className="mt-12">


            {/* Gallery Header */}

            <div className="mb-5 text-center">

              <h2 className="text-2xl font-bold text-chocolate">
                Carousel of Sweets!
              </h2>


              <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-warm-brown">
                Browse past orders and examples of our work.
              </p>

            </div>



            {/* Main Gallery Card */}

            <div className="mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-soft-peach bg-white shadow-md">


              {/* Gallery Image */}

              <div className="relative">

                <img
                  src={galleryItems[currentImage].image}
                  alt={galleryItems[currentImage].description}
                  className="h-[300px] w-full object-cover"
                />


                {/* Previous */}

                <button
                  onClick={previousImage}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-light-cream/90 text-lg font-bold text-chocolate shadow-md transition hover:bg-soft-peach hover:text-white"
                >
                  ←
                </button>


                {/* Next */}

                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-light-cream/90 text-lg font-bold text-chocolate shadow-md transition hover:bg-soft-peach hover:text-white"
                >
                  →
                </button>

              </div>



              {/* Order Information */}

              <div className="p-5 text-center">

                <p className="font-semibold text-chocolate">
                  {galleryItems[currentImage].description}
                </p>


                <p className="mt-2 text-lg font-bold text-muted-peach">
                  {galleryItems[currentImage].price}
                </p>

              </div>

            </div>



            {/* Image Counter */}

            <p className="mt-3 text-center text-sm text-warm-brown">
              {currentImage + 1} / {galleryItems.length}
            </p>



            {/* Gallery Thumbnails */}

            <div className="mx-auto mt-4 flex max-w-2xl justify-center gap-2 overflow-x-auto pb-2">

              {galleryItems.map((item, index) => (

                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    currentImage === index
                      ? "border-muted-peach"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >

                  <img
                    src={item.image}
                    alt={item.description}
                    className="h-14 w-14 object-cover"
                  />

                </button>

              ))}

            </div>



            {/* Price Disclaimer */}

            <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-relaxed text-warm-brown">
              Prices shown are examples from past orders.
              Final pricing may vary depending on customization
              and order details.
            </p>

          </div>



          {/* Availability */}

          <div className="mt-14">


            {/* Availability Header */}

            <div className="mb-6 text-center">

              <h2 className="text-2xl font-bold text-chocolate">
                Availability
              </h2>


              <p className="mt-1 text-sm text-warm-brown">
                Check upcoming order availability and market dates.
              </p>

            </div>



            {/* Calendar */}

            <div className="mx-auto max-w-2xl rounded-[2rem] border border-soft-peach bg-white p-6 shadow-sm">


              {/* Calendar Header */}

              <div className="mb-6 flex items-center justify-between">

                <button className="text-xl font-bold text-chocolate transition hover:text-muted-peach">
                  ←
                </button>


                <h3 className="text-xl font-bold text-chocolate">
                  October 2026
                </h3>


                <button className="text-xl font-bold text-chocolate transition hover:text-muted-peach">
                  →
                </button>

              </div>



              {/* Days of Week */}

              <div className="mb-2 grid grid-cols-7 gap-2 text-center text-xs font-bold text-warm-brown">

                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>

              </div>



              {/* Calendar Dates */}

              <div className="grid grid-cols-7 gap-2">


                {/* October 2026 starts on Thursday */}

                <div></div>
                <div></div>
                <div></div>
                <div></div>


                {calendarDays.map((day) => {

                  const status = getDateStatus(day)


                  return (

                    <div
                      key={day}
                        className={`flex aspect-square items-center justify-center rounded-xl border text-sm font-semibold ${
                          status === "open"
                            ? "border-sage bg-sage/30 text-chocolate"
                            : status === "market"
                            ? "border-muted-purple bg-muted-purple/30 text-chocolate"
                            : status === "booked"
                            ? "border-dusty-red bg-dusty-red/30 text-chocolate"
                            : "border-cream bg-light-cream text-warm-brown"
                        }`}
                    >
                      {day}
                    </div>
                  )
                })}

              </div>



              {/* Calendar Legend */}

              <div className="mt-6 flex flex-wrap justify-center gap-5 text-sm text-espresso">

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-sage"></span>
                  Open for Orders
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-muted-purple"></span>
                  Market Date
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-dusty-red"></span>
                  Fully Booked
                </div>

              </div>

            </div>

          </div>


          {/* Order Inquiry */}

          <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-soft-peach bg-white p-8 text-center shadow-sm">

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-warm-brown">
              Order Inquiry
            </p>

            <h2 className="text-2xl font-bold text-chocolate">
              Ready to order or got questions?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-espresso">
              Submit an order request or inquiry to get started! Check out our
              order form to see exactly what we offer and tell us what you're
              looking for.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-warm-brown">
              We'll get back to you within 2 days to discuss your request,
              answer any questions, and confirm your order details.
            </p>

            <Link
              to="/order"
              className="mt-7 block w-full rounded-2xl bg-soft-peach py-4 text-center text-lg font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-muted-peach"
            >
              Start Order Request
            </Link>

          </div>


          {/* Social Links */}

          <div className="mt-12 text-center">

            <h2 className="text-xl font-bold text-chocolate">
              Connect with {bakery.businessName}
            </h2>

            <p className="mt-2 text-sm text-warm-brown">
              Follow along and see more of our work.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">

              <a
                href="#"
                className="rounded-full border border-light-brown bg-white px-5 py-2 font-semibold text-chocolate shadow-sm transition hover:border-muted-peach hover:bg-soft-peach/20"
              >
                Instagram
              </a>

              <a
                href="#"
                className="rounded-full border border-light-brown bg-white px-5 py-2 font-semibold text-chocolate shadow-sm transition hover:border-muted-peach hover:bg-soft-peach/20"
              >
                TikTok
              </a>

              <a
                href="#"
                className="rounded-full border border-light-brown bg-white px-5 py-2 font-semibold text-chocolate shadow-sm transition hover:border-muted-peach hover:bg-soft-peach/20"
              >
                Website
              </a>

            </div>

          </div>



          


        </div>

      </div>
      
 

    </div>
  )
}

export default BakeryProfile