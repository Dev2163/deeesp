import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Smartphone, MapPin, Send, ArrowRight, Github, Linkedin, MessageSquare, Sparkles, Copy, CheckCircle2, Loader2 } from "lucide-react"
import { db, isConfigured } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [copied, setCopied] = useState(false)

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("devsp2106@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError("Please fill in all fields")
      return
    }

    if (!isConfigured || !db) {
      setSubmitError("Database not configured. Please use direct email.")
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    // 1. Save to Firebase Database (Optional / Non-blocking)
    let firebaseSuccess = false;
    try {
      if (isConfigured && db) {
        await addDoc(collection(db, "messages"), {
          ...formData,
          timestamp: serverTimestamp(),
        })
        firebaseSuccess = true;
      }
    } catch (firebaseError) {
      console.error("Firebase Database Error:", firebaseError)
      // We don't return here, we still want to try sending the email!
    }

    // 2. Send Email via Web3Forms (if configured)
    let emailSuccess = false;
    try {
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3FormsKey && web3FormsKey !== "your_web3forms_key_here") {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Portfolio Message from ${formData.name}`,
            from_name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
        
        if (response.ok) {
            emailSuccess = true;
        }
      }
    } catch (emailError) {
      console.error("Web3Forms Email Error:", emailError)
    }

    if (!firebaseSuccess && !emailSuccess) {
        setSubmitError("Something went wrong. Please try again or use direct email.")
        setIsSubmitting(false)
        return;
    }
      
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
    
    setIsSubmitting(false)
  }

  const socialLinks = [
    { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "https://github.com/Dev2163", color: "hover:bg-slate-800 hover:text-white" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/devsuthar21", color: "hover:bg-blue-600/20 hover:text-blue-400 border-blue-600/20" }
  ]

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#ffb703]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/20 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-[#ffb703] tracking-wide uppercase">Available for work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight transition-colors duration-500">
            Let's build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb8500] dark:from-[#ffb703] to-[#ffb703] dark:to-[#fb8500] italic">together</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed transition-colors duration-500">
            Whether you have a groundbreaking idea, a project that needs a fresh perspective, or just want to talk tech—I'm just a message away.
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Main Email Card */}
            <div className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 relative overflow-hidden group shadow-sm dark:shadow-none transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffb703]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

              <div className="mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#ffb703]/20 flex items-center justify-center mb-6 border border-[#ffb703]/30">
                  <Mail className="w-6 h-6 text-[#ffb703]" />
                </div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 transition-colors duration-500">Direct Email</h3>
                <p className="text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white break-all transition-colors duration-500">
                  devsp2106<br />@gmail.com
                </p>
              </div>

              <div className="flex gap-3">
                <a href="mailto:devsp2106@gmail.com" className="flex-1 py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold flex items-center justify-center gap-2 hover:bg-[#fb8500] dark:hover:bg-[#ffb703] transition-colors shadow-sm dark:shadow-none">
                  <Send className="w-4 h-4" /> Send Email
                </a>
                <button onClick={handleCopyEmail} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all flex items-center justify-center relative shadow-sm dark:shadow-none">
                  {copied ? <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Other Details Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 flex flex-col items-start gap-4 hover:border-[#fb8500]/40 dark:hover:border-[#ffb703]/30 transition-colors shadow-sm dark:shadow-none">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/5 transition-colors duration-500">
                  <Smartphone className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1 transition-colors duration-500">Phone</h4>
                  <a href="tel:+917016686728" className="text-slate-700 dark:text-slate-200 font-medium hover:text-[#fb8500] dark:hover:text-[#ffb703] transition-colors">+91-7016686728</a>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 flex flex-col items-start gap-4 hover:border-[#fb8500]/40 dark:hover:border-[#ffb703]/30 transition-colors shadow-sm dark:shadow-none">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/5 transition-colors duration-500">
                  <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-1 transition-colors duration-500">Location</h4>
                  <span className="text-slate-700 dark:text-slate-200 font-medium transition-colors duration-500">Gujarat, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: "Quick Form" visual & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="flex-1 p-8 sm:p-10 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-sm dark:shadow-none transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent pointer-events-none transition-colors duration-500" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2 transition-colors duration-500">
                  <MessageSquare className="w-6 h-6 text-[#fb8500] dark:text-[#ffb703]" /> Start a conversation
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors duration-500">Drop your details and let's discuss how I can add value to your team.</p>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 transition-colors duration-500">Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full px-5 py-3.5 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#fb8500]/50 dark:focus:border-[#ffb703]/50 focus:ring-1 focus:ring-[#fb8500]/50 dark:focus:ring-[#ffb703]/50 transition-all shadow-inner dark:shadow-none" 
                        disabled={isSubmitting || isSubmitted}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 transition-colors duration-500">Email</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com" 
                        className="w-full px-5 py-3.5 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#fb8500]/50 dark:focus:border-[#ffb703]/50 focus:ring-1 focus:ring-[#fb8500]/50 dark:focus:ring-[#ffb703]/50 transition-all shadow-inner dark:shadow-none" 
                        disabled={isSubmitting || isSubmitted}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 transition-colors duration-500">Message</label>
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell me about your project..." 
                      className="w-full px-5 py-3.5 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#fb8500]/50 dark:focus:border-[#ffb703]/50 focus:ring-1 focus:ring-[#fb8500]/50 dark:focus:ring-[#ffb703]/50 transition-all resize-none shadow-inner dark:shadow-none"
                      disabled={isSubmitting || isSubmitted}
                    ></textarea>
                  </div>
                  
                  {submitError && (
                    <p className="text-red-500 text-sm font-medium px-2">{submitError}</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group mt-4 shadow-md dark:shadow-none ${
                      isSubmitted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gradient-to-r from-[#fb8500] dark:from-[#ffb703] to-[#ffb703] dark:to-[#fb8500] text-white dark:text-slate-950 hover:opacity-90'
                    }`}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : isSubmitted ? (
                      <><CheckCircle2 className="w-5 h-5" /> Message Sent!</>
                    ) : (
                      <>Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Social Links Ribbon */}
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/60 dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 transition-colors duration-500 shadow-sm dark:shadow-none">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 pl-4 transition-colors duration-500">Or connect via:</span>
              <div className="flex gap-2 ml-auto pr-2">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 transition-all ${social.color} hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm dark:shadow-none`}>
                    {social.icon} <span className="text-sm font-medium hidden sm:block">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

       

      </div>
    </section>
  )
}
