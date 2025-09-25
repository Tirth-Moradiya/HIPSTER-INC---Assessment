import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [submissions, setSubmissions] = useState([])
  const [captchaToken, setCaptchaToken] = useState('')
  const captchaRef = useRef(null)

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

  useEffect(() => {
    if (!siteKey || !window.grecaptcha) return
    const interval = setInterval(() => {
      if (!window.grecaptcha || !window.grecaptcha.render) return
      clearInterval(interval)
      try {
        const id = window.grecaptcha.render(captchaRef.current, {
          sitekey: siteKey,
          callback: (token) => setCaptchaToken(token),
          'error-callback': () => setCaptchaToken(''),
          'expired-callback': () => setCaptchaToken(''),
        })
        // id retained implicitly; not needed further for demo
      } catch {}
    }, 200)
    return () => clearInterval(interval)
  }, [siteKey])

  function onSubmit(values) {
    if (siteKey && !captchaToken) {
      // Require captcha when site key is configured
      alert('Please complete the reCAPTCHA')
      return
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        setSubmissions((list) => [{ ...values, captchaToken }, ...list])
        reset()
        setCaptchaToken('')
        resolve()
      }, 500)
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input {...register('name', { required: 'Name is required' })} className="mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" {...register('email', { required: 'Email is required' })} className="mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea rows={5} {...register('message', { required: 'Message is required' })} className="mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
          {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
        </div>
        {!siteKey ? (
          <div className="flex items-start gap-3 rounded-md border border-dashed p-4">
            <input
              id="captcha"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              {...register('captcha', { required: 'Please verify you are human' })}
            />
            <label htmlFor="captcha" className="text-sm text-gray-700 select-none">
              I'm not a robot (mock reCAPTCHA)
            </label>
          </div>
        ) : (
          <div className="g-recaptcha" ref={captchaRef} aria-label="reCAPTCHA" />
        )}
        <button type="submit" disabled={isSubmitting} className="inline-flex rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-50">
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
      </form>
      <div>
        <h3 className="text-lg font-semibold">Recent submissions (mock)</h3>
        <ul className="mt-3 space-y-2">
          {submissions.length === 0 && <li className="text-gray-600">No submissions yet.</li>}
          {submissions.map((s, idx) => (
            <li key={idx} className="text-sm text-gray-700">
              <span className="font-medium">{s.name}</span> ({s.email}): {s.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


