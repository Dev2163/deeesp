import { Header } from "@/components/portfolio/header"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { EducationTimeline } from "@/components/portfolio/education-timeline"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { SplashScreen } from "@/components/portfolio/splash-screen"
import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { CosmicBackground } from "@/components/portfolio/cosmic-background"
import { MobileRedirect } from "@/components/portfolio/mobile-redirect"
import { useState, useEffect } from "react"

export default function Index() {
    const [showSplash, setShowSplash] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase()
            const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone']
            const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || window.innerWidth < 768
            setIsMobile(isMobileDevice)
            setIsChecking(false)
        }

        checkMobile()
    }, [])

    // While checking device type, show nothing
    if (isChecking) {
        return null
    }

    // If mobile, show mobile redirect immediately (no splash screen)
    if (isMobile) {
        return <MobileRedirect />
    }

    // If desktop and splash screen is active, show splash
    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />
    }

    // Desktop main content
    return (
        <>
            <CustomCursor />
            <CosmicBackground />
            <div className="min-h-screen bg-transparent relative z-10">
                <Header />
                <main>
                    <HeroSection />
                    <ProjectsSection />
                    <EducationTimeline />
                    <AboutSection />
                    <ContactSection />
                </main>
                <Footer />
            </div>
        </>
    )
}
