import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Smartphone, Globe, Filter } from "lucide-react"
import { useState } from "react"


export function ProjectsSection() {
  const [filter, setFilter] = useState("All")

  const projects = [
    {
      title: "WhoWear (Clothing Website)",
      description: "An e-commerce fashion site showcasing dynamic product displays, category filters, and secure checkout.",
      image: "/images/whowear.jpg",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "Web",
      liveDemo: "#",
      sourceCode: "#"
    },
    {
      title: "DS Car Show",
      description: "A platform for showcasing latest and upcoming cars with direct video reviews from YouTube.",
      image: "/images/carshow.jpg",
      technologies: ["Django", "SQLite", "Bootstrap"],
      category: "Web",
      liveDemo: "#",
      sourceCode: "#"
    },
    {
      title: "Finance Tracker App",
      description: "A finance and expense tracking web app for managing budgets, invoices, and trends.",
      image: "/images/finance.jpg",
      technologies: ["MERN Stack"],
      category: "Web",
      liveDemo: "#",
      sourceCode: "#"
    },
    {
      title: "Plug & Charge Zone (EV App)",
      description: "An app showing real-time charging station availability for electric vehicles.",
      image: "/images/ev.jpg",
      technologies: ["Kotlin", "Firebase"],
      category: "Mobile",
      liveDemo: "#",
      sourceCode: "#"
    },
    {
      title: "Grocery Purchase App",
      description: "A grocery app with cart, bill generation, and PDF export, for both Android & web.",
      image: "🛒",
      technologies: ["Flutter", "SQLite"],
      category: "Mobile",
      liveDemo: "#",
      sourceCode: "#"
    },
    {
      title: "Sundarkand Booking App",
      description: "Simple Gujarati/English interface to book Sundarkand, view bookings, export Excel, and send WhatsApp reminders easily. all in one app!",
      image: "🛒",
      technologies: ["Flutter", "SQLite"],
      category: "Mobile",
      liveDemo: "#",
      sourceCode: "#"
    }
  ]

  const categories = ["All", "Web", "Mobile"]

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <section id="projects" className="py-20 bg-muted/30">
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
              My Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Here are some of the projects I've worked on during my learning journey as a fresher developer.
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className="flex items-center gap-2"
              >
                {category === "All" && <Filter className="w-4 h-4" />}
                {category === "Web" && <Globe className="w-4 h-4" />}
                {category === "Mobile" && <Smartphone className="w-4 h-4" />}
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-card-gradient shadow-elegant border-0 hover:shadow-glow transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="h-48 bg-hero-gradient flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {project.image.startsWith("/images/") ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"/>) : (
                        <div className="text-6xl">{project.image}</div>)}
                  </div>

                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          asChild
                        >
                          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          asChild
                        >
                          <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-hero-gradient text-primary-foreground shadow-elegant border-0 max-w-2xl mx-auto">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">Excited to Build More!</h3>
              <p className="text-lg opacity-90 mb-6">
                As a fresher, I'm always eager to take on new challenges and contribute to exciting projects. Let's build something amazing together!
              </p>
              <a href="#contact">
                <Button variant="secondary" size="lg">
                  Let's Collaborate
                </Button>
              </a>
            
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}