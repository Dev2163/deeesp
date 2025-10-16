import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Heart } from "lucide-react"

export function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "devsp2106@gmail.com",
      href: "mailto:devsp2106@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-7016686728",
      href: "tel:+917016686728"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Gujarat, India",
      href: "#"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-text-gradient bg-clip-text text-transparent">
              Contact Me
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'd love to hear from you — whether it's a project, collaboration, opportunity, or just a tech talk. Let's connect!
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8 text-center"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm currently looking for new opportunities as a fresher developer. 
                Whether you have a project in mind, want to collaborate, or just want to say hi, 
                I'd be happy to hear from you!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-card-gradient shadow-elegant border-0 hover:shadow-glow transition-all duration-300 group">
                    <CardContent className="p-0">
                      <a 
                        href={info.href}
                        className="flex items-center justify-center gap-4 group-hover:text-primary transition-colors duration-300"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{info.label}</p>
                          <p className="text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {/* Social Links or Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-hero-gradient text-primary-foreground shadow-elegant border-0">
                <CardContent className="p-0 text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-lg font-semibold mb-2">Ready to Start!</h4>
                  <p className="opacity-90">
                    As a fresher, I'm excited to bring fresh ideas and energy to your team or project.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Thank You Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Card className="p-8 bg-muted/50 shadow-elegant border-0 max-w-2xl mx-auto">
            <CardContent className="p-0">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Thank You for Visiting!</h3>
              <p className="text-muted-foreground">
                I appreciate you taking the time to explore my portfolio. Looking forward to connecting with you and potentially working together on exciting projects!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}