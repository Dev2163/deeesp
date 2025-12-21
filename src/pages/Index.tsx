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
import { useState } from "react"

export default function Index() {
    const [showSplash, setShowSplash] = useState(true)

    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />
    }

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
