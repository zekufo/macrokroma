import { db } from "./db";
import { posts } from "@shared/schema";

const samplePosts = [
  {
    title: "Understanding Quantum Efficiency in Modern CMOS Sensors",
    content: `<h2>Introduction to Quantum Efficiency</h2>
    <p>Quantum efficiency (QE) is a fundamental parameter that determines how effectively a digital camera sensor converts incident photons into electrical signals. In this comprehensive exploration, we'll dive deep into the physics behind this crucial metric and its implications for photography.</p>
    
    <h3>What is Quantum Efficiency?</h3>
    <p>Quantum efficiency is defined as the ratio of electrons generated to incident photons at a given wavelength. Mathematically, it's expressed as:</p>
    <p><strong>QE(λ) = (Number of electrons generated) / (Number of incident photons)</strong></p>
    
    <h3>The Physics Behind Photon-to-Electron Conversion</h3>
    <p>When a photon strikes the silicon substrate of a CMOS sensor, it must have sufficient energy to promote an electron from the valence band to the conduction band. This process follows the photoelectric effect, where:</p>
    <ul>
    <li>Photon energy E = hν (where h is Planck's constant and ν is frequency)</li>
    <li>Silicon bandgap energy ≈ 1.12 eV at room temperature</li>
    <li>Photons with wavelengths longer than ~1100nm lack sufficient energy</li>
    </ul>
    
    <h3>Factors Affecting Quantum Efficiency</h3>
    <p>Several factors influence the QE of modern sensors:</p>
    <ul>
    <li><strong>Wavelength dependency:</strong> QE varies significantly across the visible spectrum</li>
    <li><strong>Sensor architecture:</strong> Front-side vs. back-side illuminated designs</li>
    <li><strong>Microlens efficiency:</strong> Light gathering and focus optimization</li>
    <li><strong>Anti-reflective coatings:</strong> Minimizing surface reflections</li>
    </ul>`,
    excerpt: "Explore how quantum mechanics principles govern the light-to-electron conversion process in digital camera sensors, and why quantum efficiency matters for low-light photography performance.",
    category: "digital",
    coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    published: true,
    readTime: 8,
  },
  {
    title: "The Chemistry of Silver Halide Crystals",
    content: `<h2>The Foundation of Film Photography</h2>
    <p>Silver halide crystals form the heart of photographic film, enabling the capture of images through photochemical processes that have remained fundamentally unchanged for over a century.</p>
    
    <h3>Crystal Structure and Composition</h3>
    <p>Silver halide crystals in photographic emulsions are typically composed of:</p>
    <ul>
    <li>Silver bromide (AgBr) - primary component</li>
    <li>Silver chloride (AgCl) - for faster processing</li>
    <li>Silver iodide (AgI) - for enhanced sensitivity</li>
    </ul>
    
    <h3>The Photographic Process</h3>
    <p>When light strikes a silver halide crystal, the following cascade occurs:</p>
    <ol>
    <li>Photon absorption creates electron-hole pairs</li>
    <li>Electrons migrate to sensitivity specks</li>
    <li>Silver atoms form at these nucleation sites</li>
    <li>Latent image formation occurs with just 4-6 silver atoms</li>
    </ol>`,
    excerpt: "Deep dive into the photochemical processes that make film photography possible, from exposure to development.",
    category: "film",
    coverImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    published: true,
    readTime: 5,
  },
  {
    title: "Chromatic Aberration: Physics vs. Digital Correction",
    content: `<h2>Understanding Chromatic Aberration</h2>
    <p>Chromatic aberration occurs because different wavelengths of light refract at slightly different angles when passing through optical elements.</p>
    
    <h3>Types of Chromatic Aberration</h3>
    <ul>
    <li><strong>Longitudinal:</strong> Different wavelengths focus at different distances</li>
    <li><strong>Lateral:</strong> Wavelengths focus at different positions off-axis</li>
    </ul>`,
    excerpt: "Understanding how different wavelengths of light focus at different points and modern correction techniques.",
    category: "optics",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    published: true,
    readTime: 7,
  }
];

async function seed() {
  console.log("Seeding database...");
  
  try {
    // Clear existing posts
    await db.delete(posts);
    
    // Insert sample posts
    await db.insert(posts).values(samplePosts);
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seed().then(() => process.exit(0));

export { seed };