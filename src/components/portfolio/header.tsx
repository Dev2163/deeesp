import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/80 backdrop-blur-lg shadow-md"
                    : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#home");
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Dev Suthar
                    </motion.a>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="text-foreground hover:text-primary transition-colors font-medium"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.name}
                            </motion.a>
                        ))}

                        {/* Theme Toggle */}
                        <motion.button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-foreground" />
                            ) : (
                                <Moon className="w-5 h-5 text-foreground" />
                            )}
                        </motion.button>
                    </nav>

                    {/* Mobile Menu Button & Theme Toggle */}
                    <div className="flex md:hidden items-center gap-4">
                        <motion.button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-foreground" />
                            ) : (
                                <Moon className="w-5 h-5 text-foreground" />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <motion.nav
                    className="md:hidden mt-4 flex flex-col gap-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                >
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.href);
                            }}
                        >
                            {item.name}
                        </a>
                    ))}
                </motion.nav>
            </div>
        </motion.header>
    );
}
