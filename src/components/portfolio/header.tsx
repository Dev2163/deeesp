import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function Header() {
    const [activeSection, setActiveSection] = useState("home")
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { scrollY } = useScroll()
    const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 1])
    const headerBlur = useTransform(scrollY, [0, 100], [0, 20])

    const navItems = [
        { id: "home", label: "Home", icon: "🏠" },
        { id: "about", label: "About", icon: "👨‍💻" },
        { id: "projects", label: "Projects", icon: "🚀" },
        { id: "contact", label: "Contact", icon: "💬" },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            // Update active section based on scroll position
            const sections = navItems.map(item => item.id)
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
        setMobileMenuOpen(false) // Close menu after clicking
    }

    return (
        <motion.header
            style={{
                opacity: headerOpacity,
                backdropFilter: `blur(${headerBlur}px)`,
            }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className={`rounded-full glass-strong shadow-neural transition-all duration-300 ${isScrolled ? 'shadow-glow' : ''
                    }`}>
                    <nav className="flex items-center justify-between px-6 py-4">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToSection("home")
                            }}
                            className="font-display text-2xl font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-gradient-neural">Dev Suthar</span>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map((item, i) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-6 py-2 rounded-full font-medium transition-all ${activeSection === item.id
                                        ? 'text-white'
                                        : 'hover:bg-white/10'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">{item.icon}</span>
                                        {item.label}
                                    </span>

                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 rounded-full bg-gradient-to-r from-neural-600 to-quantum-600 -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-full glass hover:bg-white/10"
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {mobileMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M3 12h18M3 6h18M3 18h18" />
                                )}
                            </svg>
                        </motion.button>
                    </nav>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden mt-4 mx-4"
                    >
                        <div className="rounded-2xl glass-strong p-4 grid grid-cols-2 gap-2">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-4 py-3 rounded-xl font-medium transition-all ${activeSection === item.id
                                        ? 'text-white'
                                        : 'hover:bg-white/10'
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="text-xl">{item.icon}</span>
                                        {item.label}
                                    </span>

                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeMobileNav"
                                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-neural-600 to-quantum-600 -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
