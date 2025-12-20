import { Header } from "@/components/portfolio/header"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { SplashScreen } from "@/components/portfolio/splash-screen"
import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { BackgroundAnimation } from "@/components/portfolio/background-animation"
import { useState } from "react"

export default function Index() {
    const [showSplash, setShowSplash] = useState(true)

    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />
    }

    return (
        <>
            <CustomCursor />
            <BackgroundAnimation />
            <div className="min-h-screen bg-background relative z-10">
                <Header />
                <main>
                    <HeroSection />
                    <AboutSection />
                    <ProjectsSection />
                    <ContactSection />
                </main>
                <Footer />
            </div>
        </>
    )
}
