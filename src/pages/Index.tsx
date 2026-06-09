import { Header } from "@/components/portfolio/header"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { EducationTimeline } from "@/components/portfolio/education-timeline"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { SplashScreen } from "@/components/portfolio/splash-screen"
import { WhiteAnimatedBackground } from "@/components/portfolio/white-animated-background"
import { useState, useEffect } from "react"
import { db, isConfigured } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function Index() {
    const [showSplash, setShowSplash] = useState(true)

    // Log visitor to Firebase
    useEffect(() => {
        const logVisitor = async () => {
            if (!isConfigured || !db) return;
            
            // Check session storage so we don't log the same user multiple times in one session
            if (sessionStorage.getItem('visitor_logged')) return;

            try {
                await addDoc(collection(db, 'visitors'), {
                    timestamp: serverTimestamp(),
                    userAgent: navigator.userAgent,
                    language: navigator.language
                });
                sessionStorage.setItem('visitor_logged', 'true');
            } catch (error) {
                console.error("Error logging visitor:", error);
            }
        };

        logVisitor();
    }, []);

    // If splash screen is active, show splash
    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />
    }

    // Main content (runs on both mobile and desktop)
    return (
        <>
            <WhiteAnimatedBackground />
            <div className="min-h-screen w-full bg-transparent relative z-10">
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

