export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container-responsive py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Service Manager</p>
        <p>
          Built with <span className="text-blue-600">React</span> & Tailwind
        </p>
      </div>
    </footer>
  )
}


