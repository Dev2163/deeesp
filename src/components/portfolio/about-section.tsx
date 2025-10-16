import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Code, Award } from "lucide-react"

export function AboutSection() {
  const technologies = [
    "c", "HTML", "CSS", "JavaScript", "Kotlin", "SQLite", "Dart", "Flutter", "Python", "Django", 
    "React", "Node.js", "MongoDB", "Firebase", "PostgreSQL"
  ]

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      period: "2024 – Present",
      cgpa: "7.08",
      description: "Strengthening my technical depth and exploring advanced systems."
    },
    {
      degree: "Bachelor of Science in IT (B.Sc. IT)",
      period: "2021 – 2024", 
      cgpa: "7.43",
      description: "Gained a solid foundation in programming, databases, and web tech."
    }
  ]

  const achievements = [
    "Built Android apps with Kotlin and Flutter",
    "Developed dynamic web applications with MERN Stack",
    "Created engaging video content as YouTuber",
    "Proficient in UI/UX design principles"
  ]

  return (
    <section id="about" className="py-20 bg-background">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate fresher developer and content creator from Gujarat, India, ready to make an impact in the tech world.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-card-gradient shadow-elegant border-0">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-black dark:text-white">
                  <span className="text-3xl mr-3">👋</span>
                  Hi, I'm Dev Suthar
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A multi-skilled developer, creator, and lifelong learner passionate about building impactful digital solutions. As a fresher in the tech industry, I bring fresh perspectives and enthusiasm to every project.
                  </p>
                  <p>
                    Beyond coding, I'm also a YouTuber and video editor, which gives me a unique creative approach to UI/UX design and user experience.
                  </p>
                  <div className="pt-4">
                    <h4 className="font-semibold text-foreground mb-3">What I Can Build:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-primary mr-2">🌐</span>
                        <span>Websites & Web Applications</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">📱</span>
                        <span>Android and iOS Apps</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">💻</span>
                        <span>Custom Software Solutions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-primary" />
              My Journey
            </h3>
            
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-card-gradient shadow-elegant border-0 hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                      <Badge variant="secondary" className="text-xs">
                        CGPA: {edu.cgpa}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-2">{edu.period}</p>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
            <Code className="w-6 h-6 mr-3 text-primary" />
            Technologies I Use
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
            <Award className="w-6 h-6 mr-3 text-primary" />
            Major Projects & Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-card-gradient shadow-elegant border-0 hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-0 flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-4 animate-pulse"></div>
                    <p className="text-foreground">{achievement}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        
      </div>
    </section>
  )
}