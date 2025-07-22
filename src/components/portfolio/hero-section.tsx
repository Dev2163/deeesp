import { motion } from "framer-motion"
import profileImg from "/images/pro.png"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Download, Mail, MapPin, Phone, Youtube } from "lucide-react"
import { useState, useEffect } from "react"
import { Github, Linkedin, Instagram } from "lucide-react"


export function HeroSection() {
  const roles = [ "Android & IOS Developer", "Web Developer", "Software Developer", "Video Editor"]
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-hero-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-bounce-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div 
            className="text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 text-sm font-medium px-4 py-2">
                <MapPin className="w-3 h-3 mr-1" />
                Available for Work
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-4">
                <span className="text-black dark:text-white">
                  Hi, I'm Dev
                </span>
              </h1>
            </motion.div>

            <motion.div
              className="text-xl lg:text-2xl text-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <span>I'm a </span>
              <motion.span 
                className="font-semibold text-black dark:text-white"
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {roles[currentRoleIndex]}
              </motion.span>
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              A passionate developer and content creator from Gujarat, India. Specialized in Android & Flutter development with a creative eye for video editing and UI/UX design.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
                            <div className="relative">
                <Button size="lg" className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all duration-300" onClick={() => setShowContacts(!showContacts)}>
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                </Button>
                {showContacts && (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
    className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4"
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <motion.a
      href="#contact"
      className="w-12 h-12 rounded-full flex items-center justify-center bg-card shadow-md"
      initial={{ y: 50, opacity: 0, rotate: -90 }}
      animate={{ y: -60, opacity: 1, rotate: 0 }}
      exit={{ y: 50, opacity: 0, rotate: 90 }}
      transition={{ duration: 0.6, ease: "backOut" }}
    >
      <Mail className="w-6 h-6" />
    </motion.a>

    <motion.a
      href="#contact"
      className="w-12 h-12 rounded-full flex items-center justify-center bg-card shadow-md"
      initial={{ y: 50, opacity: 0, rotate: -90 }}
      animate={{ y: -70, opacity: 1, rotate: 0 }}
      exit={{ y: 50, opacity: 0, rotate: 90 }}
      transition={{ duration: 0.7, ease: "backOut", delay: 0.1 }}
    >
      <Phone className="w-6 h-6" />
    </motion.a>

    <motion.a
      href="#contact"
      className="w-12 h-12 rounded-full flex items-center justify-center bg-card shadow-md"
      initial={{ y: 50, opacity: 0, rotate: -90 }}
      animate={{ y: -60, opacity: 1, rotate: 0 }}
      exit={{ y: 50, opacity: 0, rotate: 90 }}
      transition={{ duration: 0.8, ease: "backOut", delay: 0.2 }}
    >
      <Github className="w-6 h-6" />
    </motion.a>
  </motion.div>
)}


              </div>
              <a href="/Dev_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
              </a>
            </motion.div>
            
            {/* 👇 Add this just below the button block 👇 */}
            <div className="flex justify-center sm:justify-start gap-6 pt-4">
              {/* GitHub */}
              <a
                href="https://github.com/dee184-coder"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 rounded-full flex items-center justify-center 
                           bg-white dark:bg-gray-900 shadow-md 
                           border-2 border-blue-500 text-blue-500 
                           transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                {/* Glowing inner border */}
                <div className="absolute inset-1 rounded-full border-2 border-blue-400 opacity-30 group-hover:animate-pulse" />
                <Github className="w-5 h-5 z-10" />
              </a>
            
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dev-suthar-648986312/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 rounded-full flex items-center justify-center 
                           bg-white dark:bg-gray-900 shadow-md 
                           border-2 border-blue-500 text-blue-500 
                           transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="absolute inset-1 rounded-full border-2 border-blue-400 opacity-30 group-hover:animate-pulse" />
                <Linkedin className="w-5 h-5 z-10" />
              </a>
            
              {/* Instagram */}
              <a
                href="https://www.instagram.com/dev_s_21_/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 rounded-full flex items-center justify-center 
                           bg-white dark:bg-gray-900 shadow-md 
                           border-2 border-blue-500 text-blue-500 
                           transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="absolute inset-1 rounded-full border-2 border-blue-400 opacity-30 group-hover:animate-pulse" />
                <Instagram className="w-5 h-5 z-10" />
              </a>
              {/* youtube */}
              <a
                href="https://www.youtube.com/@DSautos03"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 rounded-full flex items-center justify-center 
                           bg-white dark:bg-gray-900 shadow-md 
                           border-2 border-blue-500 text-blue-500 
                           transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="absolute inset-1 rounded-full border-2 border-blue-400 opacity-30 group-hover:animate-pulse" />
                <Youtube className="w-5 h-5 z-10" />
              </a>
            </div>
          </motion.div>

          {/* Right side - Profile image/video */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Profile image container */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-card-gradient shadow-elegant overflow-hidden border-4 border-primary/20">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <img src={profileImg} alt="Dev Suthar" className="w-full h-full object-cover" />
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl">💡</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}