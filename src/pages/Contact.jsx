import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <section className="container-responsive py-10">
      <h1 className="text-2xl font-bold tracking-tight">Contact</h1>
      <p className="text-gray-600">We usually respond within 1-2 business days.</p>
      <div className="mt-6">
        <ContactForm />
      </div>
    </section>
  )
}


