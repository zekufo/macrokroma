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
            At the intersection of physics and photography lies something profound - where fundamental principles 
            of light, matter, and energy transform into images that move people. When you understand the first 
            principles governing how photons become memories, your craft transcends technique and becomes art.
          </p>
        </div>





        {/* Author Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary font-sans mb-8 text-center">About the Author</h2>
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary font-sans mb-2">Ezequiel (Zeke) Davico</h3>
                  <p className="text-lg text-secondary mb-4">Physicist & Educator</p>
                  <div className="prose text-gray-700">
                    <p className="mb-4">
                      Explorer of the liminal space where rigorous science meets unbridled imagination. A physicist turned visual storyteller, hunting for moments when nature's blueprint becomes art: places where entropy creates unexpected patterns, where simple harmonic motion transforms into visual rhythm, instances when the universe accidentally reveals its most guarded aesthetic secrets.
                    </p>
                    <p>
                      Each image is an act of translation, converting the stark elegance of physics into something that bypasses the intellect entirely, speaking directly to that part of us that recognizes beauty before we understand why. At the intersection of physics and photography, scientific literacy becomes a form of visual fluency, and every photograph is both evidence and poetry.
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
              href="mailto:macrokroma@gmail.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white rounded-lg hover:bg-indigo-700 transition-colors font-sans font-medium"
            >
              Email Us
            </a>
            <a 
              href="https://instagram.com/macrokroma" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-sans font-medium"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}