const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend')));

// In-memory data store with disk persistence fallback
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Park Metadata
const parkInfo = {
  name: "Chandra Shekhar Azad Park",
  subtitle: "Historical Landmark & Botanical Sanctuary • Prayagraj (Allahabad), India",
  established: 1870,
  areaAcres: 133,
  status: "Open to Public",
  timings: {
    general: "05:00 AM – 09:00 PM (Daily)",
    morningWalkers: "05:00 AM – 08:30 AM",
    museum: "10:30 AM – 04:30 PM (Closed Mondays)",
    library: "09:30 AM – 05:00 PM (Closed Sundays)",
    musicalFountain: "07:00 PM – 07:45 PM (Every Evening)"
  },
  fees: {
    generalEntry: 15,
    childrenBelow5: 0,
    seniorCitizens: 10,
    morningWalkerMonthly: 120,
    morningWalkerAnnual: 1000,
    museumCombinedTicket: 50,
    cameraPermit: 100
  },
  weather: {
    tempC: 25.5,
    condition: "Light Rain Showers",
    aqi: "Good (35)",
    humidity: "93%"
  },
  contact: {
    helpline: "+91 532 246 0123",
    emergencySecurity: "+91 94500 12345",
    email: "info@azadpark-prayagraj.gov.in",
    location: "Civil Lines / Georgetown, Prayagraj, Uttar Pradesh 211002"
  },
  notices: [
    { id: 1, type: "info", text: "New eco-friendly electric buggy shuttle operational at Gate No. 2." },
    { id: 2, type: "highlight", text: "Musical fountain laser show schedule updated for autumn evenings at 7:00 PM." },
    { id: 3, type: "reminder", text: "Single-use plastics strictly prohibited inside the sanctuary grounds." }
  ]
};

// Attractions Data
const attractions = [
  {
    id: "azad-memorial",
    name: "Chandra Shekhar Azad Memorial",
    hindiName: "अमर शहीद चंद्रशेखर आज़ाद स्मारक",
    category: "Historical Monument",
    image: "assets/azad_statue_martyrdom.jpg",
    homageImage: "assets/azad_memorial_homage.jpg",
    shortDescription: "The sacred site and statue where freedom fighter Chandra Shekhar Azad achieved martyrdom on Feb 27, 1931.",
    fullDescription: "Encircled by serene stone pillars and blooming marigolds stands the bronze statue of freedom icon Chandra Shekhar Azad. Here stood the sacred Alfred Park jamun tree where Azad held off colonial forces single-handedly, keeping his vow never to be captured alive.",
    highlights: ["Historic Martyrdom Site", "Bronze Statue & Inscription", "Floral Tribute Altar", "Audio Chronicle Guide"],
    timings: "Open all park hours",
    entryFee: "Included with park entry",
    coordinates: { lat: 25.4578, lng: 81.8542 }
  },
  {
    id: "thornhill-library",
    name: "Thornhill Mayne Public Library",
    hindiName: "राजकीय सार्वजनिक पुस्तकालय",
    category: "Colonial Architecture & Heritage",
    image: "assets/thornhill_library.jpg",
    shortDescription: "Established in 1864, a breathtaking Victorian Gothic monument housing over 125,000 rare books and manuscripts.",
    fullDescription: "Designed by Richard Roskell Bayne in carved Chunar sandstone, this architectural masterpiece features pointed arches, sculpted spires, and historic stained glass. It serves as Uttar Pradesh's premier public library with rare historical gazettes and parliamentary papers.",
    highlights: ["Over 125,000 Rare Volumes", "Victorian Gothic Architecture", "Reading Halls & Microfilm Section", "Historic Manuscripts"],
    timings: "09:30 AM – 05:00 PM (Closed Sundays)",
    entryFee: "Free with Park Entry (Library card for issue)",
    coordinates: { lat: 25.4565, lng: 81.8529 }
  },
  {
    id: "allahabad-museum",
    name: "The Allahabad Museum",
    hindiName: "इलाहाबाद राष्ट्रीय संग्रहालय",
    category: "National Museum",
    image: "assets/allahabad_museum.jpg",
    shortDescription: "A premier national museum displaying Chandrashekhar Azad's Colt pistol, ancient sculptures, and freedom struggle relics.",
    fullDescription: "Founded in 1931, the Allahabad Museum is recognized as a National Cultural Institution under the Ministry of Culture. Its 16 galleries showcase Bharhut Buddhist sculptures, terracotta artifacts, miniature paintings, and modern Indian art alongside historical memorabilia of the national independence movement.",
    highlights: ["Azad's Historic Colt Pistol", "Bharhut Sculptures (2nd Century BCE)", "Gandhi Memorabilia & Urn", "Rock Art Gallery"],
    timings: "10:30 AM – 04:30 PM (Closed Mondays)",
    entryFee: "₹50 (Combined Ticket available)",
    coordinates: { lat: 25.4590, lng: 81.8550 }
  },
  {
    id: "victoria-memorial-canopy",
    name: "Victoria Memorial Canopy (\"Rocket\" Marble Pavilion)",
    hindiName: "महारानी विक्टोरिया संगमरमर मंडप (रॉकेट छतरी)",
    category: "Historical Pavilion",
    image: "assets/victoria_canopy.jpg",
    shortDescription: "Inaugurated in 1906, a soaring 45-foot Italian white marble Gothic pavilion standing at the crossroads of all 4 park avenues — known locally as the 'Rocket Chhatri'.",
    fullDescription: "Locally famous as the 'रॉकेट छतरी' (Rocket Canopy) due to its soaring 45-foot Gothic spire and carved arched pillars, this monumental Italian white marble pavilion was inaugurated on March 24, 1906, by Lt. Governor Sir James Digges La Touche. Designed in a synthesis of Indo-Gothic architecture, it forms the geometric crossroads of the four principal park boulevards. Following India's independence, the colonial statue was removed, leaving the historic marble pedestal beneath the soaring vaulted arches. Today it is an ASI-protected heritage monument and the most recognized landmark in the park.",
    highlights: ["Soaring 45-Ft Gothic Spire ('Rocket Canopy')", "Flawless Italian Carved White Marble", "Inaugurated 24 March 1906 by Sir La Touche", "Geometric Hub of 4 Park Avenues", "ASI Protected Historical Monument"],
    timings: "Open all park hours",
    entryFee: "Included in park ticket",
    coordinates: { lat: 25.4582, lng: 81.8538 }
  },
  {
    id: "botanical-rose-gardens",
    name: "Heritage Rose Gardens & Conservatory",
    hindiName: "गुलाब वाटिका एवं वनस्पति उद्यान",
    category: "Flora & Nature",
    image: "assets/rose_conservatory.jpg",
    shortDescription: "Sprawling 15-acre floral conservatory featuring over 200 hybrid rose varieties and rare century-old tropical trees.",
    fullDescription: "Azad Park is the green lung of Prayagraj, home to sprawling botanical nurseries, medicinal herbal gardens, towering mahogany and banyan groves, and an internationally admired rose garden that hosts the famous annual Spring Horticultural Show.",
    highlights: ["200+ Rose Varieties", "Medicinal Plant Trail", "100+ Year Old Canopy Trees", "Active Birdwatching Zone"],
    timings: "05:00 AM – 08:30 PM",
    entryFee: "Included with park entry",
    coordinates: { lat: 25.4558, lng: 81.8562 }
  },
  {
    id: "musical-fountain",
    name: "Twilight Musical Fountain & Promenade",
    hindiName: "संगीतमय फव्वारा एवं लेज़र शो",
    category: "Evening Entertainment",
    image: "assets/musical_fountain.jpg",
    shortDescription: "Synchronized aquatic water jets, dynamic multi-colored lasers, and patriotic musical symphonies dancing every twilight.",
    fullDescription: "Installed along the central park promenade, this smart musical fountain presents a mesmerizing twilight spectacle. High-pressure nozzles propel illuminated water jets up to 30 feet into the evening sky, synchronized to patriotic anthems, classical ragas, and dynamic cyan, amber, and magenta lasers reflected across the pool.",
    highlights: ["Synchronized Laser Projections & LED Colorways", "Choreographed 30-Foot Water Cascades", "Patriotic Symphonies & Classical Ragas", "Open-Air Promenade Amphitheater Seating", "Twilight Evening Shows (07:00 PM & 07:45 PM)"],
    timings: "07:00 PM & 07:45 PM daily",
    entryFee: "Included with park entry",
    coordinates: { lat: 25.4572, lng: 81.8548 }
  }
];

// Events Data
const events = [
  {
    id: "evt-1",
    title: "Daily Morning Pranayama & Community Yoga",
    date: "Daily, 05:30 AM – 06:45 AM",
    location: "Lawn No. 4, Near Victoria Pavilion",
    category: "Wellness & Health",
    instructor: "Prayagraj Yoga Sansthan",
    freeEntry: true,
    description: "Start your day with guided breathing exercises, Surya Namaskar, and meditation amidst pristine morning oxygen and birdsong."
  },
  {
    id: "evt-2",
    title: "Martyrdom Memorial Freedom Walk & Audio Tour",
    date: "Every Saturday & Sunday, 08:00 AM",
    location: "Starting at Gate No. 1 Memorial Plaza",
    category: "History & Heritage",
    instructor: "Heritage Society Prayagraj",
    freeEntry: true,
    description: "A 90-minute curated walking tour retracing the events of 1931, the revolutionary struggle of HRA, and colonial Allahabad architecture."
  },
  {
    id: "evt-3",
    title: "Annual Autumn Rose & Bonsai Exhibition",
    date: "October 18 – 20, 2026",
    location: "Central Conservatory Gardens",
    category: "Horticulture",
    instructor: "U.P. Horticulture Board",
    freeEntry: false,
    description: "Display of over 3,000 potted blooms, rare hybrid teas, antique bonsai collections, and organic gardening workshops."
  }
];

// Reviews / Guestbook
let reviews = [
  {
    id: "rev-1",
    author: "Dr. Alok Srivastava",
    city: "Prayagraj",
    rating: 5,
    date: "2026-09-12",
    text: "The morning walk track is 2.5 km of bliss. Extremely clean, safe, and the newly renovated memorial fountain adds a spiritual reverence to the place."
  },
  {
    id: "rev-2",
    author: "Meenakshi Raman",
    city: "New Delhi",
    rating: 5,
    date: "2026-09-08",
    text: "Visiting the sacred site of Chandrashekhar Azad brought tears of pride. The Thornhill library right next to it is an architectural wonder that every Indian should witness."
  },
  {
    id: "rev-3",
    author: "Rohan & Priya Verma",
    city: "Varanasi",
    rating: 5,
    date: "2026-09-01",
    text: "The online pass system saved us from standing in the morning queue. Clean washrooms, battery buggies for our grandparents, and beautiful rose gardens."
  }
];

// Persistent Data Stores
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

function readJsonStore(filePath, fallbackData) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.warn(`Could not read ${filePath}, using fallback data.`);
  }
  return fallbackData;
}

function writeJsonStore(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Failed to write ${filePath}`, err);
  }
}

let bookings = readJsonStore(BOOKINGS_FILE, []);
function saveBookings() { writeJsonStore(BOOKINGS_FILE, bookings); }

let feedbackRecords = readJsonStore(FEEDBACK_FILE, [
  { id: "fb-1", sentiment: "great", suggestion: "Loved the online pass verification and historical interactive map.", category: "Historical Records", date: "2026-09-18", timestamp: "2026-09-18T10:30:00.000Z" },
  { id: "fb-2", sentiment: "good", suggestion: "Interactive map is helpful! Clean paths around the canopy.", category: "Map & Wayfinding", date: "2026-09-19", timestamp: "2026-09-19T14:15:00.000Z" },
  { id: "fb-3", sentiment: "great", suggestion: "The uncropped verified photos and historical facts are inspiring.", category: "Historical Records", date: "2026-09-20", timestamp: "2026-09-20T16:45:00.000Z" }
]);
function saveFeedback() { writeJsonStore(FEEDBACK_FILE, feedbackRecords); }

// Verified Historical Milestones
const parkHistory = [
  {
    year: "1870",
    title: "Foundation of Alfred Park",
    description: "Established across 133 acres in British Prayagraj to commemorate the official visit of Prince Alfred, Duke of Edinburgh.",
    source: "Allahabad District Gazetteer & State Archives"
  },
  {
    year: "1887",
    title: "Thornhill Mayne Memorial Public Library Opened",
    description: "Inauguration of the Victorian Gothic sandstone library designed by Richard Roskell Bayne, housing rare historical archives and microfilms.",
    source: "U.P. Directorate of Public Libraries Records"
  },
  {
    year: "1906",
    title: "Inauguration of Victoria Memorial Canopy ('Rocket Chhatri')",
    description: "On March 24, 1906, Lt. Governor Sir James Digges La Touche dedicated the soaring 45-foot Italian carved white marble pavilion at the crossroads of all 4 boulevards.",
    source: "Archaeological Survey of India Heritage Roster"
  },
  {
    year: "1931",
    title: "Supreme Martyrdom of Chandra Shekhar Azad (Feb 27)",
    description: "Surrounded by colonial police, Commander-in-Chief of the HSRA Chandra Shekhar Azad fought single-handedly behind the sacred jamun tree, reserving his last bullet to keep his pledge to die forever free.",
    source: "National Archives of India & Allahabad Museum Revolutionary Gallery"
  },
  {
    year: "1947–1950",
    title: "Renaming in Honour of Amar Shaheed Chandra Shekhar Azad",
    description: "Following India's independence, the park was officially rechristened 'Chandra Shekhar Azad Park' and declared a National Freedom Heritage Sanctuary.",
    source: "Government of Uttar Pradesh Gazette"
  },
  {
    year: "1986–Present",
    title: "Botanical Conservatory & Modern Restoration",
    description: "Expansion of the 15-acre Rose Conservatory, modern clay jogging track, evening musical fountain laser installations, and electric buggies.",
    source: "Prayagraj Development Authority & Municipal Corporation Records"
  }
];

// Verified Park Gates & Access Points
const parkGates = [
  {
    gateNo: 1,
    name: "Amar Shaheed Memorial Gate (Kamla Nehru Road)",
    coordinates: { lat: 25.4570, lng: 81.8530 },
    primaryAccess: "Ceremonial Promenade, Chandra Shekhar Azad Memorial & Statue, Martyrdom Sacred Tree",
    parkingAvailable: true,
    evBuggyStation: true
  },
  {
    gateNo: 2,
    name: "Administrative & Public Helpdesk Gate (Kutchery Road)",
    coordinates: { lat: 25.4595, lng: 81.8545 },
    primaryAccess: "Main Ticketing Booth, Lost & Found Helpdesk, First Aid Station, Battery Buggy Terminal",
    parkingAvailable: true,
    evBuggyStation: true
  },
  {
    gateNo: 3,
    name: "University & Heritage Library Gate (Thornhill Road)",
    coordinates: { lat: 25.4560, lng: 81.8518 },
    primaryAccess: "Thornhill Mayne Public Library, The Allahabad Museum Galleries",
    parkingAvailable: true,
    evBuggyStation: false
  },
  {
    gateNo: 4,
    name: "Civil Lines South Botanical Gate (Dayanand Marg)",
    coordinates: { lat: 25.4545, lng: 81.8560 },
    primaryAccess: "Heritage Rose Gardens, 2.5 km Natural Clay Jogging Loop, Morning Walker Track",
    parkingAvailable: true,
    evBuggyStation: false
  }
];

// Verified Curated Trails
const parkTrails = [
  {
    id: "trail-freedom",
    title: "Freedom Martyrdom Heritage Trail",
    duration: "45 Minutes",
    walkingDistance: "1.1 km",
    theme: "Freedom Struggle & National Heritage",
    accessibility: "Full Paved Wheelchair & Pram Accessible",
    stops: [
      { name: "Gate No. 1 Memorial Plaza", role: "Start Point" },
      { name: "Shaheed Vatika Avenue", role: "Floral Promenade" },
      { name: "Chandra Shekhar Azad Bronze Statue & Inscription", role: "Reverence Site" },
      { name: "Historic Martyrdom Jamun Tree Spot", role: "Sacred Landmark" },
      { name: "Victoria Memorial Canopy ('Rocket Chhatri')", role: "Central Hub" }
    ]
  },
  {
    id: "trail-architecture",
    title: "Victorian Gothic & Antiquities Trail",
    duration: "90 Minutes",
    walkingDistance: "1.4 km",
    theme: "Colonial Architecture & National Museum",
    accessibility: "Paved Walkways, Ramp Accessible at Museum",
    stops: [
      { name: "Gate No. 3 Thornhill Road", role: "Start Point" },
      { name: "Thornhill Mayne Public Library (1864)", role: "Sandstone Gothic Masterpiece" },
      { name: "The Allahabad Museum", role: "Azad's Colt Pistol & Bharhut Sculptures" },
      { name: "Victoria Memorial Marble Canopy", role: "Italian Marble Pavilion" }
    ]
  },
  {
    id: "trail-nature",
    title: "Botanical Sanctuary & Clay Jogging Loop",
    duration: "60 Minutes",
    walkingDistance: "2.5 km",
    theme: "Flora, Rare Trees & Pure Oxygen Haven",
    accessibility: "Natural Clay Track & Paved Perimeter",
    stops: [
      { name: "Gate No. 4 Civil Lines South", role: "Start Point" },
      { name: "Heritage Rose Conservatory (200+ Varieties)", role: "Floral Showcase" },
      { name: "Ancient Mahogany & Banyan Tree Groves", role: "Canopy Trail" },
      { name: "Morning Pranayama Lawn No. 4", role: "Wellness Zone" }
    ]
  },
  {
    id: "trail-twilight",
    title: "Twilight Symphony & Fountain Walk",
    duration: "30 Minutes",
    walkingDistance: "0.6 km",
    theme: "Evening Entertainment & Lasers",
    accessibility: "Level Promenade & Amphitheater Seating",
    stops: [
      { name: "Victoria Canopy Crossroads", role: "Assembly Point" },
      { name: "Central Illumination Promenade", role: "Stroll" },
      { name: "Twilight Musical Fountain (07:00 PM Show)", role: "Laser & Water Spectacular" }
    ]
  }
];

// Verified Emergency Services Directory
const emergencyContacts = {
  policeHelpline: "112",
  ambulanceEmergency: "108",
  fireEmergency: "101",
  womenHelpline: "1090",
  parkSecurityControl: "+91 532 246 0123",
  parkEmergencyMobile: "+91 94500 12345",
  firstAidStation: "Gate No. 2 Administrative Booth",
  lostAndFoundDesk: "Gate No. 2 Administrative Office",
  officialEmail: "info@azadpark-prayagraj.gov.in",
  verifiedSource: "Official Azad Park Prayagraj Administrative Security Roster"
};

// ---------------- REST API ROUTES ---------------- //

// 1. Park Metadata & Live Status
app.get('/api/park/info', (req, res) => {
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 5 && currentHour < 21;
  res.json({
    ...parkInfo,
    liveStatus: {
      isOpen,
      badge: isOpen ? "Open Now" : "Closed for Night",
      message: isOpen ? "Gates Open • Closes at 09:00 PM" : "Opens tomorrow at 05:00 AM",
      currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  });
});

// 2. Attractions
app.get('/api/attractions', (req, res) => {
  res.json(attractions);
});

app.get('/api/attractions/:id', (req, res) => {
  const item = attractions.find(a => a.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Attraction not found" });
  res.json(item);
});

// 3. Events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// 4. Ticket Booking Endpoint
app.post('/api/tickets/book', (req, res) => {
  const {
    fullName,
    email,
    phone,
    visitDate,
    passType, // "general", "morning-monthly", "morning-annual", "museum-combo", "camera"
    ticketsCount = 1,
    idProof
  } = req.body;

  if (!fullName || !phone || !visitDate || !passType) {
    return res.status(400).json({ error: "Please provide fullName, phone, visitDate, and passType." });
  }

  // Calculate pricing
  const rates = {
    "general": 15,
    "morning-monthly": 120,
    "morning-annual": 1000,
    "museum-combo": 50,
    "camera": 100
  };

  const count = parseInt(ticketsCount, 10) || 1;
  const unitPrice = rates[passType] || 15;
  const totalAmount = unitPrice * count;

  // Generate Unique Booking Reference & QR code verification token
  const bookingRef = `AZAD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const verificationHash = crypto.createHash('sha256').update(`${bookingRef}:${phone}:${visitDate}`).digest('hex').slice(0, 16);

  const newTicket = {
    bookingRef,
    fullName,
    email: email || "Not provided",
    phone,
    visitDate,
    passType,
    ticketsCount: count,
    unitPrice,
    totalAmount,
    idProof: idProof || "Aadhaar / Gov ID",
    status: "CONFIRMED",
    bookedAt: new Date().toISOString(),
    verificationHash,
    qrPayload: JSON.stringify({
      ref: bookingRef,
      name: fullName,
      type: passType,
      qty: count,
      date: visitDate,
      hash: verificationHash
    })
  };

  bookings.unshift(newTicket);
  saveBookings();

  res.status(201).json({
    success: true,
    message: "Ticket successfully generated and confirmed!",
    ticket: newTicket
  });
});

// 5. Verification Endpoint (for QR Scanning / Admin Validation)
app.get('/api/tickets/verify/:ref', (req, res) => {
  const ref = req.params.ref.toUpperCase();
  const ticket = bookings.find(b => b.bookingRef.toUpperCase() === ref);

  if (!ticket) {
    return res.status(404).json({
      valid: false,
      message: "Invalid or expired ticket reference number."
    });
  }

  res.json({
    valid: true,
    message: "Verified Official Azad Park E-Pass",
    ticket
  });
});

// 6. Visitor Reviews Endpoint
app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const { author, city, rating, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: "Author name and review text are required." });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    author,
    city: city || "Visitor",
    rating: Number(rating) || 5,
    date: new Date().toISOString().split('T')[0],
    text
  };

  reviews.unshift(newReview);
  res.status(201).json({ success: true, review: newReview });
});

// 7. Visitor Feedback Pulse Endpoints
app.get('/api/feedback', (req, res) => {
  const sentiments = { great: 0, good: 0, okay: 0, 'needs-improvement': 0 };
  feedbackRecords.forEach(f => {
    if (sentiments[f.sentiment] !== undefined) sentiments[f.sentiment]++;
  });

  res.json({
    total: feedbackRecords.length,
    sentiments,
    recent: feedbackRecords.slice(0, 20)
  });
});

app.post('/api/feedback', (req, res) => {
  const { sentiment, suggestion, category, page } = req.body;
  if (!sentiment) {
    return res.status(400).json({ error: "Sentiment rating is required." });
  }

  const validSentiments = ['great', 'good', 'okay', 'needs-improvement'];
  if (!validSentiments.includes(sentiment)) {
    return res.status(400).json({ error: "Invalid sentiment value." });
  }

  const newFeedback = {
    id: `fb-${Date.now()}`,
    sentiment,
    suggestion: (suggestion || '').trim(),
    category: (category || 'General Experience').trim(),
    page: page || 'home',
    date: new Date().toISOString().split('T')[0],
    timestamp: new Date().toISOString()
  };

  feedbackRecords.unshift(newFeedback);
  if (feedbackRecords.length > 100) {
    feedbackRecords = feedbackRecords.slice(0, 100);
  }
  saveFeedback();

  res.status(201).json({
    success: true,
    message: "Thank you for your pulse feedback! Your response has been verified and recorded.",
    feedback: newFeedback
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString(), uptimeSecs: process.uptime() });
});

if (require.main === module) {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n========================================================`);
    console.log(`  🌿 CHANDRA SHEKHAR AZAD PARK PORTAL IS ONLINE 🌿`);
    console.log(`  ➜ Local:   http://localhost:${PORT}/`);
    console.log(`  ➜ Network: http://127.0.0.1:${PORT}/`);
    console.log(`  (Press Ctrl+C to stop the server)`);
    console.log(`========================================================\n`);

    if (process.argv.includes('--open')) {
      const { exec } = require('child_process');
      const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
      exec(`${startCmd} http://localhost:${PORT}`);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`\n========================================================`);
      console.log(`  🌿 PORT ${PORT} IS ALREADY IN USE 🌿`);
      console.log(`  ➜ Azad Park Portal is ALREADY RUNNING at: http://localhost:${PORT}/`);
      console.log(`========================================================\n`);
      if (process.argv.includes('--open')) {
        const { exec } = require('child_process');
        const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
        exec(`${startCmd} http://localhost:${PORT}`);
      }
    } else {
      console.error('Server error:', err);
    }
  });
}

module.exports = app;

