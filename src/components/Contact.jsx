import { useState } from 'react'
import { Send } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`Name: ${form.name}\nContact: ${form.contact}\n\n${form.message}`)
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-xs tracking-[0.3em] text-ice/80 uppercase text-center">
          Get in touch
        </p>
        <h2 className="mt-3 text-center font-display text-3xl md:text-4xl font-semibold text-snowlight">
          Send a message through the snow
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 md:p-8 shadow-frosted"
        >
          <div>
            <label htmlFor="name" className="mb-2 block font-mono text-[11px] tracking-widest text-ice/70 uppercase">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-body text-sm text-snowlight placeholder:text-mute/60 transition-colors focus:border-ice/50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="contact" className="mb-2 block font-mono text-[11px] tracking-widest text-ice/70 uppercase">
              Contact details
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              required
              value={form.contact}
              onChange={handleChange}
              placeholder="Email or phone number"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-body text-sm text-snowlight placeholder:text-mute/60 transition-colors focus:border-ice/50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-mono text-[11px] tracking-widest text-ice/70 uppercase">
              Message Me
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to build together?"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-body text-sm text-snowlight placeholder:text-mute/60 transition-colors focus:border-ice/50 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-ice/80 px-6 py-3 font-body text-sm font-semibold text-midnight transition-transform hover:scale-[1.02]"
          >
            <Send size={15} />
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}
