import { Header } from "@/components/portfolio/header";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { VideoSection } from "@/components/portfolio/video-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";
import { AnimatedCursor } from "@/components/portfolio/animated-cursor";

export default function Index() {
    return (
        <div className="min-h-screen">
            <AnimatedCursor />
            <Header />
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <VideoSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
