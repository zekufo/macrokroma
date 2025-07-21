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
            About macrokroma
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Exploring the fascinating intersection of physics, technology, and art in photography. 
            From quantum mechanics in digital sensors to the chemistry of film development.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary font-sans mb-4 text-center">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-center">
                To make the complex physics behind photography accessible to photographers, 
                students, and anyone curious about how cameras capture light and create images. 
                We believe understanding the science enhances both technical skill and creative vision.
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
          <h2 className="text-3xl font-bold text-primary font-sans mb-8 text-center">About the Author</h2>
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary font-sans mb-2">Dr. Sarah Chen</h3>
                  <p className="text-lg text-secondary mb-4">Optical Engineer & Photography Researcher</p>
                  <div className="prose text-gray-700">
                    <p className="mb-4">
                      Dr. Chen holds a PhD in Optical Engineering from MIT and has spent over 15 years 
                      researching camera sensor technology and optical systems. She has published numerous 
                      papers on quantum efficiency in CMOS sensors and has worked with major camera manufacturers.
                    </p>
                    <p className="mb-4">
                      Combining her deep technical expertise with a passion for photography, Dr. Chen started 
                      this blog to bridge the gap between complex physics concepts and practical photography knowledge.
                    </p>
                    <p>
                      When not writing about photographic physics, she can be found experimenting with vintage 
                      film cameras and exploring the relationship between scientific understanding and artistic expression.
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