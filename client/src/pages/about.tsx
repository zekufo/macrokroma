import { Camera, Microscope, BookOpen, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary font-sans mb-6">
            physics + photography
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Diving deep into the science behind photography - from the quantum mechanics governing digital sensors 
            to the chemistry of silver halide crystals in film. Understanding the physics makes you a better photographer.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary font-sans mb-4 text-center">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-center">
                To bridge the gap between complex physics concepts and practical photography knowledge. 
                Whether you're a photographer wanting to understand your tools better, a student exploring optics, 
                or simply curious about how light becomes an image - this is your guide to the science of photography.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Cover */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary font-sans mb-8 text-center">What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Microscope className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-primary font-sans mb-2">Digital Photography</h3>
                <p className="text-sm text-gray-600">
                  Sensor technology, quantum efficiency, pixel architecture, and digital processing
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-primary font-sans mb-2">Film Photography</h3>
                <p className="text-sm text-gray-600">
                  Silver halide crystals, photochemical processes, emulsion science, and development
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-primary font-sans mb-2">Optics & Physics</h3>
                <p className="text-sm text-gray-600">
                  Lens design, aberrations, diffraction, interference, and light behavior
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-primary font-sans mb-2">Technique</h3>
                <p className="text-sm text-gray-600">
                  Practical applications of physics principles in photography techniques
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Author Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary font-sans mb-8 text-center">About Ezequiel (Zeke) Davico</h2>
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary font-sans mb-2">Ezequiel (Zeke) Davico</h3>
                  <p className="text-lg text-secondary mb-4">Physicist & Educator</p>
                  <div className="prose text-gray-700">
                    <p className="mb-4">
                      Physicist with a diverse professional background spanning academia, data analysis, and cryptography. 
                      Zeke currently leads InSight, a program dedicated to supporting students throughout their academic 
                      journeys by seamlessly integrating educational resources and initiatives into the broader student experience.
                    </p>
                    <p className="mb-4">
                      Previously, Zeke conducted research in quantum cryptography, where he designed and tested cryptographic 
                      algorithms based on quantum principles. His work included building models and simulations to assess the 
                      security and efficiency of these cutting-edge techniques. Collaborating with interdisciplinary teams of 
                      physicists, engineers, and cybersecurity experts, he applied advanced methods to real-world data 
                      transmission systems, ensuring their resilience against potential threats.
                    </p>
                    <p className="mb-4">
                      Before transitioning to research and program management, Zeke spent several years in the education sector, 
                      where he developed and implemented a next-generation science curriculum grounded in the latest educational 
                      research. This effort was inspired by his work with NSF-supported studies on the peer-led, team-learning 
                      model, which has demonstrated success in various university-level STEM courses.
                    </p>
                    <p>
                      Throughout his career, Zeke has blended technical expertise with a strong commitment to education and 
                      mentoring, striving to positively impact academic systems and students' lives. Outside of work, he enjoys 
                      outdoor activities such as skiing and paddle boarding, reflecting his appreciation for physical challenges 
                      and nature. Zeke brings a global perspective to his work, combining scientific innovation with a passion 
                      for teaching, personal growth, and problem-solving.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary font-sans mb-4">Get In Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions about photographic physics or suggestions for future articles?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contact@physicsofphotography.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white rounded-lg hover:bg-indigo-700 transition-colors font-sans font-medium"
            >
              Email Us
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-sans font-medium"
            >
              Follow on Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}