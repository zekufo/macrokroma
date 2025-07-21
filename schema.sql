-- macrokroma blog database schema for Cloudflare D1

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    category TEXT NOT NULL,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    read_time INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Images table
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    caption TEXT,
    post_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- Insert sample data
INSERT INTO posts (title, content, excerpt, category, cover_image, published, read_time) VALUES
('Understanding Quantum Efficiency in Modern CMOS Sensors', 
'<h2>Introduction to Quantum Efficiency</h2><p>Quantum efficiency (QE) is a fundamental parameter that determines how effectively a digital camera sensor converts incident photons into electrical signals. In this comprehensive exploration, we''ll dive deep into the physics behind this crucial metric and its implications for photography.</p><h3>What is Quantum Efficiency?</h3><p>Quantum efficiency is defined as the ratio of electrons generated to incident photons at a given wavelength. Mathematically, it''s expressed as:</p><p><strong>QE(λ) = (Number of electrons generated) / (Number of incident photons)</strong></p><h3>The Physics Behind Photon-to-Electron Conversion</h3><p>When a photon strikes the silicon substrate of a CMOS sensor, it must have sufficient energy to promote an electron from the valence band to the conduction band. This process follows the photoelectric effect, where:</p><ul><li>Photon energy E = hν (where h is Planck''s constant and ν is frequency)</li><li>Silicon bandgap energy ≈ 1.12 eV at room temperature</li><li>Photons with wavelengths longer than ~1100nm lack sufficient energy</li></ul><h3>Factors Affecting Quantum Efficiency</h3><p>Several factors influence the QE of modern sensors:</p><ul><li><strong>Wavelength dependency:</strong> QE varies significantly across the visible spectrum</li><li><strong>Sensor architecture:</strong> Front-side vs. back-side illuminated designs</li><li><strong>Microlens efficiency:</strong> Light gathering and focus optimization</li><li><strong>Anti-reflective coatings:</strong> Minimizing surface reflections</li></ul>',
'Explore how quantum mechanics principles govern the light-to-electron conversion process in digital camera sensors, and why quantum efficiency matters for low-light photography performance.',
'digital', 
'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', 
true, 
8),

('The Chemistry of Silver Halide Crystals',
'<h2>The Foundation of Film Photography</h2><p>Silver halide crystals form the heart of photographic film, enabling the capture of images through photochemical processes that have remained fundamentally unchanged for over a century.</p><h3>Crystal Structure and Composition</h3><p>Silver halide crystals in photographic emulsions are typically composed of:</p><ul><li>Silver bromide (AgBr) - primary component</li><li>Silver chloride (AgCl) - for faster processing</li><li>Silver iodide (AgI) - for enhanced sensitivity</li></ul><h3>The Photographic Process</h3><p>When light strikes a silver halide crystal, the following cascade occurs:</p><ol><li>Photon absorption creates electron-hole pairs</li><li>Electrons migrate to sensitivity specks</li><li>Silver atoms form at these nucleation sites</li><li>Latent image formation occurs with just 4-6 silver atoms</li></ol>',
'Deep dive into the photochemical processes that make film photography possible, from exposure to development.',
'film',
'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
true,
5),

('Chromatic Aberration: Physics vs. Digital Correction',
'<h2>Understanding Chromatic Aberration</h2><p>Chromatic aberration occurs because different wavelengths of light refract at slightly different angles when passing through optical elements.</p><h3>Types of Chromatic Aberration</h3><ul><li><strong>Longitudinal:</strong> Different wavelengths focus at different distances</li><li><strong>Lateral:</strong> Wavelengths focus at different positions off-axis</li></ul>',
'Understanding how different wavelengths of light focus at different points and modern correction techniques.',
'optics',
'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
true,
7);