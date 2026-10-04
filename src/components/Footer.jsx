import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-warm-brown">
      <p>© 2026 CottageCart</p>

      <div className="mt-2 flex justify-center gap-4">
        <Link
          to="/privacy"
          className="transition hover:text-chocolate hover:underline"
        >
          Privacy Policy
        </Link>

        <Link
          to="/terms"
          className="transition hover:text-chocolate hover:underline"
        >
          Terms of Service
        </Link>

        <Link
          to="/contact"
          className="transition hover:text-chocolate hover:underline"
        >
          Contact
        </Link>
      </div>
    </footer>
  )
}

export default Footer