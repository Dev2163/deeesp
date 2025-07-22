import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-muted-foreground">Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 mx-2 text-red-500 fill-current" />
            </motion.div>
            <span className="text-muted-foreground">by</span>
            <span className="ml-1 font-semibold bg-text-gradient bg-clip-text text-transparent">
              Dev Suthar
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Dev Suthar. All rights reserved. | Fresher Developer & Content Creator
          </p>
        </motion.div>
      </div>
    </footer>
  )
}