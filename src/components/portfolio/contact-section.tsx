import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [hoveredContact, setHoveredContact] = useState<number | null>(null)

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "devsp2106@gmail.com",
      href: "mailto:devsp2106@gmail.com",
      gradient: "from-neural-500 to-quantum-500",
      description: "Drop me an email"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+91-7016686728",
      href: "tel:+917016686728",
      gradient: "from-quantum-500 to-photon-500",
      description: "Give me a call"
    },
    {
      icon: "📍",
      label: "Location",
      value: "Gujarat, India",
      href: "#",
      gradient: "from-photon-500 to-plasma-500",
      description: "Where I'm based"
    }
  ]

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      href: "https://github.com/Dev2163",
      gradient: "from-neural-500 to-neural-600"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: "https://www.linkedin.com/in/devsuthar21",
      gradient: "from-quantum-500 to-quantum-600"
    }
  ]

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient-neural opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="text-6xl">💬</span>
          </motion.div>
          <h2 className="font-display text-5xl md:text-7xl mb-6">
            <span className="text-gradient-quantum">Contact Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'd love to hear from you — whether it's a project, collaboration, opportunity,
            or just a tech talk. Let's connect!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Get In Touch Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2 }}
            className="mb-12 p-8 rounded-3xl glass-strong shadow-neural"
          >
            <div className="text-center">
              <h3 className="font-display text-3xl mb-4">Get In Touch</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                I'm currently looking for new opportunities as a fresher developer.
                Whether you have a project in mind, want to collaborate, or just want to say hi,
                I'd be happy to hear from you!
              </p>
            </div>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onMouseEnter={() => setHoveredContact(i)}
                onMouseLeave={() => setHoveredContact(null)}
                className="group relative block"
              >
                <div className="relative h-full p-6 rounded-2xl glass-strong shadow-void hover:shadow-glow transition-all duration-500 overflow-hidden">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: hoveredContact === i ? 1.2 : 1,
                      rotate: hoveredContact === i ? 360 : 0
                    }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl mb-4"
                  >
                    {info.icon}
                  </motion.div>

                  {/* Label */}
                  <h4 className="font-semibold text-lg mb-1">{info.label}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{info.description}</p>

                  {/* Value */}
                  <motion.p
                    className="font-mono text-sm group-hover:text-gradient-neural transition-all"
                    animate={{
                      x: hoveredContact === i ? 5 : 0
                    }}
                  >
                    {info.value}
                  </motion.p>

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredContact === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${info.gradient} origin-left`}
                  />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-center font-semibold text-lg mb-6">Connect on Social Media</h3>
            <div className="flex gap-4 justify-center">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-16 h-16 rounded-2xl glass-strong flex items-center justify-center hover:shadow-glow transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
                  />
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Ready to Start Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.8 }}
            className="relative p-8 rounded-3xl overflow-hidden"
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-neural-600 to-quantum-600"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Content */}
            <div className="relative z-10 text-center text-white">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                🚀
              </motion.div>
              <h4 className="font-display text-2xl mb-2">Ready to Start!</h4>
              <p className="opacity-90">
                As a fresher, I'm excited to bring fresh ideas and energy to your team or project.
              </p>
            </div>
          </motion.div>

          {/* Thank You Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1 }}
            className="mt-12 p-8 rounded-3xl glass-strong shadow-quantum text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              ❤️
            </motion.div>
            <h3 className="font-display text-2xl mb-3">Thank You for Visiting!</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I appreciate you taking the time to explore my portfolio. Looking forward to
              connecting with you and potentially working together on exciting projects!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-neural-500/10 to-quantum-500/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-quantum-500/10 to-photon-500/10 blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  )
}