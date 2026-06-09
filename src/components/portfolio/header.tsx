import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

export function Header() {
    const [activeSection, setActiveSection] = useState("home")
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const { theme, setTheme } = useTheme()
    const lastScrollY = useRef(0)
    const { scrollY } = useScroll()

    const navItems = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "projects", label: "Projects" },
        { id: "education", label: "Education" },
        { id: "contact", label: "Contact" },
    ]

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50)
        if (latest > lastScrollY.current && latest > 150) {
            if (!mobileMenuOpen) {
                setIsVisible(false)
            }
        } else {
            setIsVisible(true)
        }
        lastScrollY.current = latest

        const sections = navItems.map(item => item.id)
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i]
            const element = document.getElementById(section)
            if (element) {
                const rect = element.getBoundingClientRect()
                if (rect.top <= window.innerHeight / 2) {
                    setActiveSection(section)
                    break
                }
            }
        }
    })

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset
            window.scrollTo({ top: offsetPosition, behavior: "smooth" })
        }
        setMobileMenuOpen(false)
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-4 z-[49] pointer-events-auto" onMouseEnter={() => setIsVisible(true)} />

            <motion.header
                onMouseEnter={() => setIsVisible(true)}
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: "-110%", opacity: 0 }
                }}
                animate={isVisible ? "visible" : "hidden"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled ? 'py-4 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-white/5 shadow-xl' : 'py-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm'
                }`}
            >
                <div className="container mx-auto px-6 md:px-12">
                    <nav className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToSection("home")
                            }}
                            className="font-display text-xl md:text-2xl font-black uppercase tracking-widest text-[#ffb703] drop-shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            DEV SUTHAR
                        </motion.a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8 lg:gap-12">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative py-2 text-sm lg:text-base tracking-wide transition-colors duration-300 ${
                                        activeSection === item.id ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_white]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Decorative Toggle Switch */}
                        <div className="hidden md:flex items-center">
                            <motion.button 
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={`w-14 h-7 rounded-full p-1 flex items-center transition-colors duration-300 ${
                                    theme === 'dark' ? 'bg-white' : 'bg-[#ffb703]'
                                }`}
                                whileTap={{ scale: 0.9 }}
                            >
                                <motion.div 
                                    className={`w-5 h-5 rounded-full shadow-md ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
                                    animate={{ x: theme === 'dark' ? 28 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <AnimatePresence>
                            {activeSection !== "projects" && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="md:hidden p-2 rounded-full text-[#ffb703]"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        {mobileMenuOpen ? (
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path d="M3 12h18M3 6h18M3 18h18" />
                                        )}
                                    </svg>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </nav>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/5"
                        >
                            <div className="flex flex-col items-center py-6 gap-6">
                                {navItems.map((item) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative text-lg tracking-wide ${
                                            activeSection === item.id ? 'text-[#ffb703] font-bold' : 'text-slate-600 dark:text-white'
                                        }`}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.label}
                                        {activeSection === item.id && (
                                            <motion.div
                                                layoutId="activeMobileUnderline"
                                                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#ffb703]"
                                            />
                                        )}
                                    </motion.button>
                                ))}
                                <motion.button 
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className={`mt-4 w-14 h-7 rounded-full p-1 flex items-center ${
                                        theme === 'dark' ? 'bg-white' : 'bg-[#ffb703]'
                                    }`}
                                >
                                    <motion.div 
                                        className={`w-5 h-5 rounded-full ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
                                        animate={{ x: theme === 'dark' ? 28 : 0 }}
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    )
}
