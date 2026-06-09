import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/Dev2163" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/devsuthar21" },

  ]

  const helpfulLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ]

  return (
    <footer className="relative bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white overflow-hidden pt-24 pb-8 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
          
          {/* Left: Heading & Button */}
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-8"
            >
              Have a Cool Idea?<br />
              Let's Collaborate<span className="text-[#ffb703]">.</span>
            </motion.h2>
            
            <motion.a 
              href="#contact" 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-4 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full pl-6 pr-2 py-2 transition-all group shadow-sm dark:shadow-none"
            >
              <span className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white transition-colors duration-500">Get In Touch</span>
              <span className="w-8 h-8 rounded-full bg-[#fb8500] dark:bg-[#ffb703] text-white dark:text-black flex items-center justify-center group-hover:rotate-90 transition-transform">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
            </motion.a>
          </div>

          {/* Right: Grid Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:w-3/5">
            
            {/* Location */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4"
            >
              <h4 className="text-slate-900 dark:text-white font-semibold mb-2 transition-colors duration-500">Location</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-500">
                Ahmedabad, Gujarat,<br />
                India
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h4 className="text-slate-900 dark:text-white font-semibold mb-2 transition-colors duration-500">Contact</h4>
              <a href="tel:+917016686728" className="text-slate-600 dark:text-slate-400 text-sm hover:text-[#fb8500] dark:hover:text-[#ffb703] transition-colors">+91-7016686728</a>
              <a href="mailto:devsp2106@gmail.com" className="text-slate-600 dark:text-slate-400 text-sm hover:text-[#fb8500] dark:hover:text-[#ffb703] transition-colors">devsp2106@gmail.com</a>
            </motion.div>

            {/* Social */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <h4 className="text-slate-900 dark:text-white font-semibold mb-2 transition-colors duration-500">Social</h4>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 text-sm hover:text-[#fb8500] dark:hover:text-[#ffb703] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb8500] dark:bg-[#ffb703]" />
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Helpful Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col gap-4"
            >
              <h4 className="text-slate-900 dark:text-white font-semibold mb-2 transition-colors duration-500">Helpful Links</h4>
              <div className="flex flex-col gap-3">
                {helpfulLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-slate-600 dark:text-slate-400 text-sm hover:text-[#fb8500] dark:hover:text-[#ffb703] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-px bg-slate-200 dark:bg-white/10 mb-8 origin-left transition-colors duration-500" 
        />

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-600 dark:text-slate-400 transition-colors duration-500"
        >
          <p>©Dev Suthar {currentYear}</p>
          
          <p className="flex items-center gap-2">
            <span className="text-[#fb8500] dark:text-[#ffb703]">📍</span> Made with Love in India
          </p>

          <div className="flex items-center gap-3">
            <span>Created by</span>
            <img src="/images/dev.png" alt="Dev Suthar" className="w-6 h-6 rounded-full object-cover border border-slate-300 dark:border-white/20" />
            <span className="font-['Dancing_Script'] text-2xl text-slate-900 dark:text-white ml-1 transform -rotate-6 transition-colors duration-500">Suthar</span>
          </div>
        </motion.div>
      </div>

      {/* Massive Background Text */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -bottom-10 md:-bottom-24 left-0 w-full overflow-hidden flex justify-center pointer-events-none z-0"
      >
        <h1 className="text-[25vw] md:text-[28vw] font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-[#fb8500] dark:from-[#ffb703] to-transparent leading-none select-none tracking-tighter">
          SUTHAR
        </h1>
      </motion.div>
    </footer>
  )
}
