import { motion } from "framer-motion"
import promoVideo from "/images/WhoWear_custom_tshirt_promo.mp4"
import codingVideo from "/images/video.mp4"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Video } from "lucide-react"

export function VideoSection() {
  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4">
            Project Showcase
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-text-gradient bg-clip-text text-transparent">
              My Work in Action
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch my projects come to life through detailed video demonstrations
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 bg-card-gradient border-primary/20 hover:border-primary/40 transition-all duration-300 group">
            <div className="aspect-video rounded-lg mb-4 overflow-hidden">
              <video src={promoVideo} controls className="w-full h-full object-cover"></video>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              WhoWear Custom T-Shirt Promo
            </h3>
            <p className="text-muted-foreground">
              A promotional video for a custom t-shirt design application.
            </p>
          </Card>

          <Card className="p-6 bg-card-gradient border-primary/20 hover:border-primary/40 transition-all duration-300 group">
            <div className="aspect-video rounded-lg mb-4 overflow-hidden">
              <video src={codingVideo} controls className="w-full h-full object-cover"></video>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Behind the Scenes: Coding Journey in Photos
            </h3>
            <p className="text-muted-foreground">
              A visual snapshot of the development process — captured through a series of images.
            </p>
          </Card>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground">
            More project videos will be added soon. Stay tuned! 🎬
          </p>
        </motion.div>
      </div>
    </section>
  )
}