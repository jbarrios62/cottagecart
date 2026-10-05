import { useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"

function BakeryProfile() {

  // MOCK BAKERY DATA
  // Later this will come from Supabase for the specific baker.

  const bakery = {
    businessName: "Thrifted Bakery",
    city: "Cerritos",
    state: "CA",
    bio: "Home-based bakery specializing in custom cakes, cake pops, and desserts.",

    responseTime: "2 days",

    instagram: "#",
    tiktok: "#",
    website: "#",
  }


  // MOCK GALLERY DATA
  // Bakers will eventually be able to upload up to 12 gallery items.

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


  // GALLERY STATE

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

// MOCK REVIEW DATA
// Later this will come from completed CottageCart orders in Supabase.
// Reviews can only be submitted after an order is fulfilled.

const reviews = [
  {
    id: 1,
    customerName: "Sarah M.",
    rating: 5,
    review:
      "The cake was beautiful and tasted amazing! Everything looked exactly how I wanted and pickup was super easy.",
    date: "October 2026",
    verified: true,
    photos: [
      "/images/review1.jpg",
      "/images/review2.jpg",
    ],
  },
  {
    id: 2,
    customerName: "Ashley R.",
    rating: 5,
    review:
      "Everything was perfect! The desserts were a huge hit at my party and communication was great throughout the whole process.",
    date: "September 2026",
    verified: true,
    photos: [],
  },
  {
    id: 3,
    customerName: "Emily T.",
    rating: 4,
    review:
      "Loved my order! The cake was super cute and tasted great. I would definitely order again.",
    date: "August 2026",
    verified: true,
    photos: [
      "/images/review3.jpg",
    ],
  },
]

const averageRating =
  reviews.reduce((total, review) => total + review.rating, 0) /
  reviews.length

  // MOCK CALENDAR DATA
  // Later this will come from the baker's Supabase availability data.

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


      <div className="relative z-10 mx-auto max-w-6xl">


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

          </div>



          {/* Gallery + Availability */}

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">


            {/* Our Work */}

            <div className="rounded-[2rem] border border-soft-peach bg-white p-6 shadow-sm">

              <div className="mb-5 text-center">

                <h2 className="text-2xl font-bold text-chocolate">
                  Carousel of Sweets!
                </h2>

                <p className="mt-1 text-sm text-warm-brown">
                  Browse past orders and examples of our work.
                </p>

              </div>


              {/* Main Gallery Image */}

              <div className="relative overflow-hidden rounded-2xl bg-light-cream">

                <img
                  src={galleryItems[currentImage].image}
                  alt={galleryItems[currentImage].description}
                  className="h-[260px] w-full object-cover"
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


              {/* Order Details */}

              <div className="pt-5 text-center">

                <p className="font-semibold leading-relaxed text-chocolate">
                  {galleryItems[currentImage].description}
                </p>

                <p className="mt-2 text-lg font-bold text-muted-peach">
                  {galleryItems[currentImage].price}
                </p>

              </div>


              {/* Counter */}

              <p className="mt-3 text-center text-xs text-warm-brown">
                {currentImage + 1} / {galleryItems.length}
              </p>


              {/* Compact Thumbnails */}

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">

                {galleryItems.map((item, index) => (

                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      currentImage === index
                        ? "border-muted-peach"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >

                    <img
                      src={item.image}
                      alt={item.description}
                      className="h-11 w-11 object-cover"
                    />

                  </button>

                ))}

              </div>


              {/* Price Disclaimer */}

              <p className="mt-3 text-center text-xs leading-relaxed text-warm-brown">
                Prices shown are examples from past orders.
                Final pricing may vary depending on customization
                and order details.
              </p>

            </div>



            {/* Availability */}

            <div className="rounded-[2rem] border border-soft-peach bg-white p-6 shadow-sm">


              {/* Availability Header */}

              <div className="mb-5 text-center">

                <h2 className="text-2xl font-bold text-chocolate">
                  Availability
                </h2>

                <p className="mt-1 text-sm text-warm-brown">
                  Check upcoming order availability and market dates.
                </p>

              </div>


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

                {/* October 2026 starts Thursday */}

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

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-espresso">

                <div className="flex items-center gap-2">

                  <span className="h-3 w-3 rounded-full bg-sage"></span>

                  <span>
                    Open for Orders
                  </span>

                </div>


                <div className="flex items-center gap-2">

                  <span className="h-3 w-3 rounded-full bg-muted-purple"></span>

                  <span>
                    Market Date
                  </span>

                </div>


                <div className="flex items-center gap-2">

                  <span className="h-3 w-3 rounded-full bg-dusty-red"></span>

                  <span>
                    Fully Booked
                  </span>

                </div>

              </div>

            </div>

          </div>



          {/* Order Inquiry */}

          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-soft-peach bg-white p-8 text-center shadow-sm">

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-warm-brown">
              Order Inquiry
            </p>

            <h2 className="text-2xl font-bold text-chocolate">
              Ready to order?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-espresso">
              Submit an order request or inquiry to get started!
              Check out our order form to see exactly what we offer
              and tell us what you're looking for.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-warm-brown">
              We'll get back to you within {bakery.responseTime} to
              discuss your request, answer any questions, and confirm
              your order details.
            </p>

            <Link
              to="/order"
              className="mx-auto mt-7 block w-full max-w-md rounded-2xl bg-soft-peach py-4 text-center text-lg font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-muted-peach"
            >
              Start Order Request
            </Link>

          </div>

          {/* Review Section */}
{/* Review Section */}

<div className="mx-auto mt-12 max-w-5xl">

  {/* Review Header */}

  <div className="text-center">

    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-warm-brown">
      Customer Reviews
    </p>

    <h2 className="text-3xl font-bold text-chocolate">
      What Customers Are Saying
    </h2>

    <div className="mt-4 flex items-center justify-center gap-3">

      <span className="text-2xl font-bold text-chocolate">
        ★ {averageRating.toFixed(1)}
      </span>

      <span className="text-sm text-warm-brown">
        {reviews.length} Verified Reviews
      </span>

    </div>

    <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-warm-brown">
      Reviews are submitted by customers after completing an order
      through CottageCart.
    </p>

  </div>


  {/* Review Cards */}

  <div className="mt-8 grid gap-5">

    {reviews.map((review) => (

      <div
        key={review.id}
        className="rounded-[2rem] border border-soft-peach bg-white p-6 shadow-sm"
      >

        {/* Stars + Verified */}

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div className="text-lg tracking-wide text-muted-peach">

            {"★".repeat(review.rating)}

            <span className="text-light-brown">
              {"★".repeat(5 - review.rating)}
            </span>

          </div>


          {review.verified && (

            <span className="rounded-full bg-sage/30 px-3 py-1 text-xs font-semibold text-chocolate">
              ✓ Verified Order
            </span>

          )}

        </div>


        {/* Review */}

        <p className="mt-4 leading-relaxed text-espresso">
          “{review.review}”
        </p>


        {/* Optional Customer Photos */}

        {review.photos.length > 0 && (

          <div className="mt-5 flex flex-wrap gap-3">

            {review.photos.map((photo, index) => (

              <img
                key={index}
                src={photo}
                alt={`Customer order photo ${index + 1}`}
                className="h-28 w-28 rounded-xl border border-soft-peach object-cover shadow-sm"
              />

            ))}

          </div>

        )}


        {/* Customer + Date */}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-cream pt-4">

          <p className="font-semibold text-chocolate">
            {review.customerName}
          </p>

          <p className="text-sm text-warm-brown">
            {review.date}
          </p>

        </div>

      </div>

    ))}

  </div>


  {/* View All Reviews */}

  <div className="mt-6 text-center">

    <button className="rounded-2xl border border-muted-peach bg-light-cream px-6 py-3 font-semibold text-chocolate shadow-sm transition hover:bg-soft-peach/20">
      View All Reviews
    </button>

  </div>

</div>

          {/* Social Links */}

          <div className="mt-12 border-t border-soft-peach pt-8 text-center">

            <h2 className="text-xl font-bold text-chocolate">
              Connect with {bakery.businessName}
            </h2>

            <p className="mt-2 text-sm text-warm-brown">
              Follow us to stay updated and connect!
            </p>


            <div className="mt-5 flex flex-wrap justify-center gap-3">


              {/* Instagram */}

              {bakery.instagram && (

                <a
                  href={bakery.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-light-brown bg-white px-5 py-2 font-semibold text-chocolate shadow-sm transition hover:border-muted-peach hover:bg-soft-peach/20"
                >
                  Instagram
                </a>

              )}


              {/* TikTok */}

              {bakery.tiktok && (

                <a
                  href={bakery.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-light-brown bg-white px-5 py-2 font-semibold text-chocolate shadow-sm transition hover:border-muted-peach hover:bg-soft-peach/20"
                >
                  TikTok
                </a>

              )}


              {/* Optional Website */}

              {bakery.website && (

                <a
                  href={bakery.website}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-light-brown bg-white px-5 py-2 font-semibold text-chocolate shadow-sm transition hover:border-muted-peach hover:bg-soft-peach/20"
                >
                  Website
                </a>

              )}

            </div>

          </div>


        </div>
        <Footer/>
      </div>

    </div>
  )
}

export default BakeryProfile