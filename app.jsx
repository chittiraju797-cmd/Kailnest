const { useState, useEffect } = React;


// ─── Mock Data ───────────────────────────────────────────────────────────────
const PGS = [
  {
    id: 1,
    name: "Sri Sai PG for Boys",
    owner: "Ravi Kumar",
    phone: "9876543210",
    location: "Dilsukhnagar, Hyderabad",
    nearBy: "Osmania University 1.2km",
    type: "Boys",
    rating: 4.3,
    reviews: 28,
    price: 4500,
    deposit: 9000,
    available: 3,
    total: 10,
    photos: ["🛏️", "🚿", "🍽️"],
    photoUrls: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    amenities: ["WiFi", "AC", "Food", "Laundry", "CCTV", "Parking"],
    conditions: "No late entry after 11PM. 2 month notice required.",
    verified: true,
    featured: true,
    description: "Clean, safe PG near university. Home-cooked food included.",
  },
  {
    id: 2,
    name: "Green Valley Girls PG",
    owner: "Lakshmi Devi",
    phone: "9988776655",
    location: "Ameerpet, Hyderabad",
    nearBy: "JNTU 0.8km",
    type: "Girls",
    rating: 4.7,
    reviews: 45,
    price: 6000,
    deposit: 12000,
    available: 1,
    total: 15,
    photos: ["🛏️", "🚿", "🍽️"],
    photoUrls: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600",
    ],
    videoUrl: "",
    amenities: ["WiFi", "AC", "Food", "RO Water", "Security Guard", "Power Backup"],
    conditions: "Girls only. No visitors after 8PM. Monthly rent advance.",
    verified: true,
    featured: false,
    description: "Premium girls PG with 24/7 security and excellent food.",
  },
  {
    id: 3,
    name: "City Comfort Co-Living",
    owner: "Suresh Babu",
    phone: "9123456789",
    location: "Kukatpally, Hyderabad",
    nearBy: "Hitech City 3km",
    type: "Co-ed",
    rating: 3.9,
    reviews: 12,
    price: 8000,
    deposit: 16000,
    available: 5,
    total: 20,
    photos: ["🛏️", "🚿", "🍽️"],
    amenities: ["WiFi", "AC", "Gym", "Cafeteria", "Housekeeping", "Netflix"],
    conditions: "Working professionals preferred. 1 month notice.",
    verified: false,
    featured: false,
    description: "Modern co-living space for IT professionals near Hitech City.",
  },
  {
    id: 4,
    name: "Royal Residency Boys PG",
    owner: "Anand Rao",
    phone: "9000111222",
    location: "Vijayawada, Andhra Pradesh",
    nearBy: "SRM University 1km",
    type: "Boys",
    rating: 4.1,
    reviews: 33,
    price: 3500,
    deposit: 7000,
    available: 8,
    total: 25,
    photos: ["🛏️", "🚿", "🍽️"],
    amenities: ["WiFi", "Food", "Study Room", "Laundry", "CCTV"],
    conditions: "Students only. Mess mandatory. No smoking.",
    verified: true,
    featured: true,
    description: "Affordable PG for students with dedicated study room.",
  },
];

const AMENITY_ICONS = {
  WiFi: "📶", AC: "❄️", Food: "🍽️", Laundry: "👕", CCTV: "📷",
  Parking: "🚗", "RO Water": "💧", "Security Guard": "💂", "Power Backup": "⚡",
  Gym: "💪", Cafeteria: "☕", Housekeeping: "🧹", Netflix: "📺",
  "Study Room": "📚",
};

// ─── Components ───────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <span style={{ color: "#f59e0b", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#6b7280", marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

function Badge({ text, color = "#e0f2fe", textColor = "#0369a1" }) {
  return (
    <span style={{
      background: color, color: textColor, borderRadius: 20,
      padding: "2px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5
    }}>{text}</span>
  );
}

// ─── Logo URL (Kailnest official logo) ────────────────────────────────────────
// ─── Firebase Configuration ───────────────────────────────────────────────────
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAC8ZgnSvJEAsEgrGPOSA-Ih9UqNFIOPog",
  authDomain: "kailnest-app.firebaseapp.com",
  projectId: "kailnest-app",
  storageBucket: "kailnest-app.firebasestorage.app",
  messagingSenderId: "845274786181",
  appId: "1:845274786181:web:e47a6e96ea6e17ba35fcec",
  measurementId: "G-PMR1DKH7C6"
};

// Firebase helper functions (loaded via CDN in index.html)
// Real Firebase operations happen here
const FB = {
  // Save booking to Firestore
  async saveBooking(booking) {
    try {
      if (!window.db) return null;
      const ref = await window.db.collection("bookings").add({
        ...booking,
        createdAt: new Date().toISOString(),
        status: "confirmed"
      });
      return ref.id;
    } catch (e) { console.log("Firebase save error:", e); return null; }
  },

  // Save complaint to Firestore
  async saveComplaint(complaint) {
    try {
      if (!window.db) return null;
      const ref = await window.db.collection("complaints").add({
        ...complaint,
        createdAt: new Date().toISOString()
      });
      return ref.id;
    } catch (e) { console.log("Firebase complaint error:", e); return null; }
  },

  // Save PG listing (owner)
  async saveListing(listing) {
    try {
      if (!window.db) return null;
      const ref = await window.db.collection("listings").add({
        ...listing,
        createdAt: new Date().toISOString(),
        verified: false,
        featured: false
      });
      return ref.id;
    } catch (e) { console.log("Firebase listing error:", e); return null; }
  },

  // Get listings from Firestore
  async getListings(category) {
    try {
      if (!window.db) return [];
      const snap = await window.db.collection("listings")
        .where("category", "==", category)
        .get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { return []; }
  }
};

const LOGO_URL = "https://raw.githubusercontent.com/chittiraju797-cmd/Kailnest/main/1782926117778.png";

// ─── Login / Signup Screen ─────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("tenant");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [qrPreview, setQrPreview] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleQRUpload = (e) => {
    const file = e.target.files[0];
    if (file) setQrPreview(URL.createObjectURL(file));
  };

  const sendOTP = () => {
    if (phone.length !== 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1200);
  };

  const verifyOTP = () => {
    if (otp.length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      setTimeout(() => onLogin({ name: name || "User", phone, role, upiId, qrPreview }), 1000);
    }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      {/* Logo */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <img src={LOGO_URL} alt="Kailnest" style={{ width: 140, height: 140, objectFit: "contain", filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.4))" }} />
        <div style={{ color: "#c7d2fe", fontSize: 12, marginTop: 6 }}>PG · Hotels · Apartments · Houses</div>
      </div>

      <div style={{ background: "#fff", borderRadius: 20, padding: 24, width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        {step === 3 ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56 }}>✅</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#16a34a", marginTop: 8 }}>Welcome to Kailnest!</div>
            <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>Logging you in...</div>
          </div>
        ) : (
          <>
            {/* Mode toggle */}
            <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 12, padding: 4, marginBottom: 20 }}>
              {["login", "signup"].map(m => (
                <button key={m} onClick={() => { setMode(m); setStep(1); }} style={{
                  flex: 1, padding: "9px", borderRadius: 9, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  background: mode === m ? "#6366f1" : "transparent",
                  color: mode === m ? "#fff" : "#6b7280"
                }}>{m === "login" ? "Login" : "Sign Up"}</button>
              ))}
            </div>

            {step === 1 && (
              <>
                {mode === "signup" && (
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Full Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="మీ పేరు enter చేయండి"
                      style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                )}

                {/* Role selector */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>I am a</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[{ key: "tenant", label: "🏃 Tenant", desc: "Looking for accommodation" }, { key: "owner", label: "🏠 Owner", desc: "List my property" }].map(r => (
                      <div key={r.key} onClick={() => setRole(r.key)} style={{
                        flex: 1, padding: "10px", borderRadius: 12, cursor: "pointer", textAlign: "center",
                        border: role === r.key ? "2px solid #6366f1" : "1.5px solid #e5e7eb",
                        background: role === r.key ? "#eff6ff" : "#f9fafb"
                      }}>
                        <div style={{ fontSize: 20 }}>{r.label.split(" ")[0]}</div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: role === r.key ? "#6366f1" : "#374151", marginTop: 4 }}>{r.label.split(" ")[1]}</div>
                        <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{r.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Phone Number</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ background: "#f3f4f6", borderRadius: 10, padding: "11px 12px", fontSize: 14, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>🇮🇳 +91</div>
                    <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit number" type="tel"
                      style={{ flex: 1, padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                </div>

                {/* Owner UPI/QR Section */}
                {mode === "signup" && role === "owner" && (
                  <div style={{ background: "#f0fdf4", borderRadius: 14, padding: 14, marginBottom: 16, border: "1.5px solid #bbf7d0" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#166534", marginBottom: 4 }}>💳 Payment Details (Optional)</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>Tenants మీకు directly pay చేయడానికి UPI ID లేదా QR code add చేయండి</div>

                    {/* UPI ID */}
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>📱 UPI ID</label>
                      <input value={upiId} onChange={e => setUpiId(e.target.value)}
                        placeholder="yourname@upi లేదా yourname@paytm"
                        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 13, boxSizing: "border-box" }} />
                      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>GPay / PhonePe / Paytm / BHIM UPI ID</div>
                    </div>

                    {/* QR Code Upload */}
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>📷 QR Code Upload (optional)</label>
                      {qrPreview ? (
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <img src={qrPreview} alt="QR" style={{ width: 100, height: 100, borderRadius: 10, border: "2px solid #16a34a", objectFit: "cover" }} />
                          <button onClick={() => setQrPreview(null)} style={{
                            position: "absolute", top: -6, right: -6, background: "#ef4444", color: "#fff",
                            border: "none", borderRadius: "50%", width: 20, height: 20, fontSize: 11, cursor: "pointer"
                          }}>✕</button>
                          <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4, fontWeight: 600 }}>✅ QR uploaded</div>
                        </div>
                      ) : (
                        <label style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
                          background: "#fff", border: "2px dashed #86efac", borderRadius: 10,
                          cursor: "pointer", fontSize: 13, color: "#166534", fontWeight: 600
                        }}>
                          📷 GPay/PhonePe QR upload చేయి
                          <input type="file" accept="image/*" onChange={handleQRUpload} style={{ display: "none" }} />
                        </label>
                      )}
                    </div>

                    <div style={{ marginTop: 10, background: "#dcfce7", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: "#166534" }}>
                      💡 Tenants మీ UPI ID కి directly pay చేయవచ్చు — platform fee మాత్రమే Kailnest కి వెళ్తుంది
                    </div>
                  </div>
                )}

                <button onClick={sendOTP} disabled={phone.length !== 10 || loading} style={{
                  width: "100%", padding: "13px",
                  background: phone.length === 10 ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#d1d5db",
                  color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
                  cursor: phone.length === 10 ? "pointer" : "not-allowed"
                }}>{loading ? "Sending OTP..." : "Send OTP →"}</button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 32 }}>📱</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginTop: 8 }}>OTP sent to +91 {phone}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>6-digit OTP enter చేయండి</div>
                </div>
                <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="● ● ● ● ● ●" type="tel" maxLength={6}
                  style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1.5px solid #6366f1", fontSize: 22, fontWeight: 700, textAlign: "center", letterSpacing: 8, boxSizing: "border-box", marginBottom: 14 }} />
                <button onClick={verifyOTP} disabled={otp.length !== 6 || loading} style={{
                  width: "100%", padding: "13px",
                  background: otp.length === 6 ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#d1d5db",
                  color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
                  cursor: otp.length === 6 ? "pointer" : "not-allowed", marginBottom: 10
                }}>{loading ? "Verifying..." : "Verify OTP ✓"}</button>
                <button onClick={() => setStep(1)} style={{ width: "100%", padding: "10px", background: "none", border: "none", color: "#6366f1", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Change number</button>
              </>
            )}

            {step === 1 && (
              <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#9ca3af", lineHeight: 1.6 }}>
                Continue చేయడం ద్వారా మీరు మా{" "}
                <span style={{ color: "#6366f1", fontWeight: 600 }}>Terms of Service</span> మరియు{" "}
                <span style={{ color: "#6366f1", fontWeight: 600 }}>Privacy Policy</span> కి agree అవుతున్నారు.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── City Selector (Swiggy style) ─────────────────────────────────────────────
function CitySelectorScreen({ onSelectCity }) {
  const [search, setSearch] = useState("");
  const TOP_CITIES = ["All India", "Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi", "Pune", "Kolkata", "Vijayawada", "Visakhapatnam", "Tirupati", "Kadapa"];
  const ALL_CITIES = ["All India", ...Object.values(INDIA_CITIES).flat().filter((v, i, a) => a.indexOf(v) === i).sort()];
  const filtered = search ? ALL_CITIES.filter(c => c.toLowerCase().includes(search.toLowerCase())) : ALL_CITIES;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", padding: "50px 16px 20px", color: "#fff" }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>🏠 Kailnest</div>
        <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 14 }}>మీ city select చేయండి</div>
        <div style={{ position: "relative" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="City search చేయండి..."
            style={{ width: "100%", padding: "12px 40px 12px 14px", borderRadius: 12, border: "none", fontSize: 14, boxSizing: "border-box", background: "rgba(255,255,255,0.95)", outline: "none" }} />
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {!search && (
          <>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#6b7280", marginBottom: 12, letterSpacing: 1 }}>TOP CITIES</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {TOP_CITIES.map(city => (
                <div key={city} onClick={() => onSelectCity(city)} style={{
                  background: "#fff", borderRadius: 12, padding: "10px 8px", textAlign: "center",
                  cursor: "pointer", border: "1px solid #e5e7eb", fontSize: 12, fontWeight: 600, color: "#374151",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
                }}>
                  {city === "All India" ? "🇮🇳" : "🏙️"}<br />{city}
                </div>
              ))}
            </div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#6b7280", marginBottom: 12, letterSpacing: 1 }}>ALL CITIES</div>
          </>
        )}
        {filtered.map(city => (
          <div key={city} onClick={() => onSelectCity(city)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
            background: "#fff", borderRadius: 12, marginBottom: 8, cursor: "pointer",
            border: "1px solid #f3f4f6", boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
          }}>
            <span style={{ fontSize: 20 }}>{city === "All India" ? "🇮🇳" : "📍"}</span>
            <span style={{ fontWeight: 600, fontSize: 14, color: "#111" }}>{city}</span>
            <span style={{ marginLeft: "auto", color: "#9ca3af", fontSize: 16 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Terms & Privacy Modal ─────────────────────────────────────────────────────
function TermsPrivacyModal({ type, onClose }) {
  // type = "terms" | "privacy"
  const isTerms = type === "terms";
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 2000, display: "flex", alignItems: "flex-end" }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", width: "100%", maxHeight: "88vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "22px 22px 0 0", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{isTerms ? "📋 Terms of Service" : "🔒 Privacy Policy"}</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontWeight: 600 }}>✕ Close</button>
        </div>
        <div style={{ overflowY: "auto", padding: 20, flex: 1 }}>
          {isTerms ? (
            <>
              <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 16 }}>Last updated: July 1, 2026 · Effective immediately</p>
              {[
                { title: "1. Acceptance", body: "Kailnest (kailnest.in) వాడటం ద్వారా మీరు ఈ Terms కి agree అవుతున్నారు. మీకు agree లేకపోతే app వాడకండి." },
                { title: "2. Our Services", body: "Kailnest అనేది PG, Hotels, Apartments, మరియు Houses book చేయడానికి ఒక platform. మేము intermediary మాత్రమే — owner-tenant relationship కి directly responsible కాదు." },
                { title: "3. User Responsibilities", body: "• Accurate information provide చేయాలి\n• Fake listings / reviews post చేయకూడదు\n• ఒక account per person మాత్రమే\n• Payment fraud attempt చేయకూడదు" },
                { title: "4. Bookings & Payments", body: "Booking confirm అయిన తర్వాత cancellation కి refund policy వర్తిస్తుంది. Platform fee (₹199) non-refundable. Deposit owner మరియు tenant మధ్య directly settle అవుతుంది." },
                { title: "5. Owner Responsibilities", body: "PG/Property owners accurate details, real photos, correct pricing provide చేయాలి. Fake listings పెడితే account permanently banned అవుతుంది." },
                { title: "6. Complaint Resolution", body: "Kailnest complaint system ద్వారా issues raise చేయవచ్చు. 48 hours లో response guaranteed. Unresolved complaints escalate అవుతాయి." },
                { title: "7. Limitation of Liability", body: "Kailnest owner-tenant disputes కి liable కాదు. Physical property condition, safety issues owner responsibility." },
                { title: "8. Changes to Terms", body: "Terms change అయినప్పుడు app లో notification వస్తుంది. Continued use = acceptance." },
              ].map(s => (
                <div key={s.title} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-line" }}>{s.body}</div>
                </div>
              ))}
            </>
          ) : (
            <>
              <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 16 }}>Last updated: July 1, 2026 · We respect your privacy.</p>
              {[
                { title: "1. Information We Collect", body: "• Phone number (login కోసం)\n• Name, address (booking కోసం)\n• Property details (owners కోసం)\n• Payment transaction IDs\n• App usage data (analytics)" },
                { title: "2. How We Use It", body: "• Booking confirmations పంపడానికి\n• Customer support provide చేయడానికి\n• App improve చేయడానికి\n• Fraud prevent చేయడానికి\n• Legal requirements comply చేయడానికి" },
                { title: "3. Data Sharing", body: "మీ data third parties కి sell చేయము. Owner-tenant booking కోసం minimal info share అవుతుంది. Legal requirement వస్తే government authorities కి provide చేస్తాం." },
                { title: "4. Data Security", body: "Firebase encryption వాడతాం. Payment data PCI-DSS compliant processors ద్వారా process అవుతుంది. మీ OTP/password మాకు కనిపించదు." },
                { title: "5. Your Rights", body: "• మీ data access చేయవచ్చు\n• Data delete చేయమని request చేయవచ్చు\n• Account deactivate చేయవచ్చు\nEmail: kailnest5@gmail.com" },
                { title: "6. Cookies", body: "App లో minimal cookies వాడతాం — session management కోసం మాత్రమే. Analytics కోసం anonymized data వాడతాం." },
                { title: "7. Contact Us", body: "Privacy concerns కోసం:\n📧 kailnest5@gmail.com\n🌐 kailnest.in" },
              ].map(s => (
                <div key={s.title} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-line" }}>{s.body}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function MediaGallery({ pg, startIndex = 0, onClose }) {
  const media = [
    ...(pg.photoUrls || []).map(url => ({ type: "photo", url })),
    ...(pg.videoUrl ? [{ type: "video", url: pg.videoUrl }] : []),
  ];
  const [index, setIndex] = useState(startIndex);
  const current = media[index] || media[0];

  if (media.length === 0) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 2000, display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 16px 8px" }}>
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{index + 1} / {media.length}</div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 20, width: 32, height: 32, fontSize: 16, cursor: "pointer" }}>✕</button>
      </div>

      {/* Media display */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {current.type === "photo" ? (
          <img src={current.url} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
        ) : (
          <video src={current.url} controls autoPlay style={{ maxWidth: "100%", maxHeight: "100%" }} />
        )}

        {index > 0 && (
          <button onClick={() => setIndex(index - 1)} style={{
            position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
            borderRadius: "50%", width: 38, height: 38, fontSize: 18, cursor: "pointer"
          }}>‹</button>
        )}
        {index < media.length - 1 && (
          <button onClick={() => setIndex(index + 1)} style={{
            position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
            borderRadius: "50%", width: 38, height: 38, fontSize: 18, cursor: "pointer"
          }}>›</button>
        )}
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 6, padding: 12, overflowX: "auto" }}>
        {media.map((m, i) => (
          <div key={i} onClick={() => setIndex(i)} style={{
            width: 52, height: 52, borderRadius: 8, flexShrink: 0, cursor: "pointer",
            border: i === index ? "2px solid #fff" : "2px solid transparent",
            background: m.type === "photo" ? `url(${m.url}) center/cover` : "#374151",
            display: m.type === "video" ? "flex" : undefined,
            alignItems: m.type === "video" ? "center" : undefined,
            justifyContent: m.type === "video" ? "center" : undefined,
            fontSize: m.type === "video" ? 20 : undefined, color: "#fff"
          }}>{m.type === "video" && "▶️"}</div>
        ))}
      </div>
    </div>
  );
}

function PGCard({ pg, onView, onBook, isWishlisted, onWishlist }) {
  const availColor = pg.available === 0 ? "#fef2f2" : pg.available <= 2 ? "#fffbeb" : "#f0fdf4";
  const availText = pg.available === 0 ? "#dc2626" : pg.available <= 2 ? "#d97706" : "#16a34a";

  return (
    <div style={{
      background: "#fff", borderRadius: 16, overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: 16,
      border: pg.featured ? "2px solid #6366f1" : "1px solid #f3f4f6"
    }}>
      {/* Photo Strip */}
      <div style={{
        background: pg.photoUrls?.[0] ? `url(${pg.photoUrls[0]}) center/cover` : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        height: 100, display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative"
      }}>
        {!pg.photoUrls?.[0] && <span style={{ fontSize: 48 }}>{pg.photos[0]}</span>}
        {pg.videoUrl && (
          <div style={{
            position: "absolute", bottom: 10, left: 10,
            background: "rgba(0,0,0,0.6)", color: "#fff", borderRadius: 20,
            padding: "2px 9px", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 3
          }}>🎬 Video</div>
        )}
        {pg.featured && (
          <div style={{
            position: "absolute", top: 10, left: 10,
            background: "linear-gradient(135deg, #f59e0b, #ef4444)", color: "#fff", borderRadius: 20,
            padding: "2px 10px", fontSize: 11, fontWeight: 700
          }}>📢 Ad</div>
        )}
        {pg.verified && (
          <div style={{
            position: "absolute", top: 10, right: 40,
            background: "#10b981", color: "#fff", borderRadius: 20,
            padding: "2px 10px", fontSize: 11, fontWeight: 700
          }}>✓ Verified</div>
        )}
        {/* Wishlist Heart Button */}
        <button onClick={(e) => { e.stopPropagation(); onWishlist && onWishlist(pg.id); }} style={{
          position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.9)",
          border: "none", borderRadius: "50%", width: 30, height: 30,
          fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
        }}>{isWishlisted ? "❤️" : "🤍"}</button>
        <div style={{
          position: "absolute", bottom: 10, right: 10,
          background: availColor, color: availText, borderRadius: 20,
          padding: "2px 10px", fontSize: 11, fontWeight: 700, border: `1px solid ${availText}`
        }}>
          {pg.available === 0 ? "Full" : `${pg.available} beds free`}
        </div>
      </div>

      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{pg.name}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>📍 {pg.location}</div>
          </div>
          <Badge
            text={pg.type}
            color={pg.type === "Boys" ? "#eff6ff" : pg.type === "Girls" ? "#fdf2f8" : "#f0fdf4"}
            textColor={pg.type === "Boys" ? "#1d4ed8" : pg.type === "Girls" ? "#be185d" : "#15803d"}
          />
        </div>

        <div style={{ marginTop: 6 }}>
          <StarRating rating={pg.rating} />
          <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 6 }}>({pg.reviews} reviews)</span>
        </div>

        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>🏫 {pg.nearBy}</div>

        {/* Amenities */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
          {pg.amenities.slice(0, 5).map(a => (
            <span key={a} style={{
              background: "#f9fafb", border: "1px solid #e5e7eb",
              borderRadius: 8, padding: "2px 8px", fontSize: 11, color: "#374151"
            }}>{AMENITY_ICONS[a] || "✓"} {a}</span>
          ))}
          {pg.amenities.length > 5 && (
            <span style={{ fontSize: 11, color: "#6366f1", padding: "2px 4px" }}>+{pg.amenities.length - 5} more</span>
          )}
        </div>

        {/* Price & Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <div>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#6366f1" }}>₹{pg.price.toLocaleString()}</span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>/month</span>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>Deposit: ₹{pg.deposit.toLocaleString()}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onView(pg)} style={{
              background: "#f3f4f6", color: "#374151", border: "none",
              borderRadius: 10, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontWeight: 600
            }}>Details</button>
            <button onClick={() => onBook(pg)} disabled={pg.available === 0} style={{
              background: pg.available === 0 ? "#d1d5db" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: pg.available === 0 ? "#9ca3af" : "#fff", border: "none",
              borderRadius: 10, padding: "8px 16px", fontSize: 13, cursor: pg.available === 0 ? "not-allowed" : "pointer",
              fontWeight: 700
            }}>{pg.available === 0 ? "Full" : "Book Now"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PGDetail({ pg, onBack, onBook }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryStart, setGalleryStart] = useState(0);
  const photoUrls = pg.photoUrls || [];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        padding: "50px 16px 20px", color: "#fff"
      }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
          borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer", marginBottom: 12
        }}>← Back</button>
        <div style={{ fontSize: 22, fontWeight: 800 }}>{pg.name}</div>
        <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>📍 {pg.location}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {pg.verified && <Badge text="✓ Verified" color="rgba(255,255,255,0.2)" textColor="#fff" />}
          {pg.featured && <Badge text="⭐ Featured" color="rgba(255,255,255,0.2)" textColor="#fff" />}
          <Badge text={pg.type} color="rgba(255,255,255,0.2)" textColor="#fff" />
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Photo Gallery */}
        {photoUrls.length > 0 ? (
          <div style={{ marginBottom: 16 }}>
            <div onClick={() => { setGalleryStart(0); setGalleryOpen(true); }} style={{
              position: "relative", borderRadius: 14, overflow: "hidden", height: 180, cursor: "pointer"
            }}>
              <img src={photoUrls[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {pg.videoUrl && (
                <div style={{
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                  background: "rgba(0,0,0,0.5)", borderRadius: "50%", width: 52, height: 52,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
                }} onClick={(e) => { e.stopPropagation(); setGalleryStart(photoUrls.length); setGalleryOpen(true); }}>▶️</div>
              )}
              <div style={{
                position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.6)",
                color: "#fff", borderRadius: 8, padding: "3px 9px", fontSize: 11, fontWeight: 600
              }}>📷 {photoUrls.length}{pg.videoUrl ? " + 🎬 1" : ""}</div>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              {photoUrls.slice(1, 4).map((url, i) => (
                <div key={i} onClick={() => { setGalleryStart(i + 1); setGalleryOpen(true); }} style={{
                  flex: 1, height: 56, borderRadius: 10, overflow: "hidden", cursor: "pointer"
                }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
              {pg.videoUrl && (
                <div onClick={() => { setGalleryStart(photoUrls.length); setGalleryOpen(true); }} style={{
                  flex: 1, height: 56, borderRadius: 10, background: "#1f2937", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20
                }}>🎬</div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
            {["Room", "Bathroom", "Common Area"].map((label, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, hsl(${240 + i * 30}, 70%, 60%), hsl(${260 + i * 30}, 70%, 50%))`,
                borderRadius: 12, height: 80, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", color: "#fff"
              }}>
                <span style={{ fontSize: 28 }}>{pg.photos[i] || "🏠"}</span>
                <span style={{ fontSize: 10, marginTop: 2 }}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {galleryOpen && <MediaGallery pg={pg} startIndex={galleryStart} onClose={() => setGalleryOpen(false)} />}

        {/* Rating */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>⭐ Rating & Reviews</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#6366f1" }}>{pg.rating}</div>
            <div>
              <StarRating rating={pg.rating} />
              <div style={{ fontSize: 12, color: "#6b7280" }}>{pg.reviews} reviews</div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>💰 Pricing</div>
          {[
            { label: "Monthly Rent", value: `₹${pg.price.toLocaleString()}` },
            { label: "Security Deposit", value: `₹${pg.deposit.toLocaleString()}` },
            { label: "Beds Available", value: `${pg.available} / ${pg.total}` },
          ].map(row => (
            <div key={row.label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "6px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14
            }}>
              <span style={{ color: "#6b7280" }}>{row.label}</span>
              <span style={{ fontWeight: 700, color: "#111" }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>🏠 Amenities</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {pg.amenities.map(a => (
              <div key={a} style={{
                background: "#f0f0ff", borderRadius: 8, padding: "8px 10px",
                fontSize: 13, color: "#4338ca", fontWeight: 500
              }}>{AMENITY_ICONS[a]} {a}</div>
            ))}
          </div>
        </div>

        {/* Owner Details */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>👤 Owner Details</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 20, fontWeight: 700
            }}>{pg.owner[0]}</div>
            <div>
              <div style={{ fontWeight: 700 }}>{pg.owner}</div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>📞 {pg.phone}</div>
            </div>
          </div>
          <a href={`tel:${pg.phone}`} style={{
            display: "block", textAlign: "center", marginTop: 12,
            background: "#f0fdf4", color: "#16a34a", borderRadius: 10,
            padding: "10px", fontSize: 14, fontWeight: 700, textDecoration: "none",
            border: "1px solid #bbf7d0"
          }}>📞 Call Owner</a>
        </div>

        {/* Conditions */}
        <div style={{ background: "#fffbeb", borderRadius: 12, padding: 14, marginBottom: 16, border: "1px solid #fde68a" }}>
          <div style={{ fontWeight: 700, marginBottom: 6, color: "#92400e" }}>📋 Rules & Conditions</div>
          <div style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{pg.conditions}</div>
        </div>

        {/* Nearby */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🗺️ Nearby</div>
          <div style={{ fontSize: 13, color: "#374151" }}>🏫 {pg.nearBy}</div>
          <div style={{
            marginTop: 10, background: "#f3f4f6", borderRadius: 10, height: 80,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#9ca3af", fontSize: 13
          }}>🗺️ Map View (GPS integration)</div>
        </div>

        {/* Book Button */}
        <button onClick={() => onBook(pg)} disabled={pg.available === 0} style={{
          width: "100%", padding: "16px",
          background: pg.available === 0 ? "#d1d5db" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: pg.available === 0 ? "#9ca3af" : "#fff", border: "none",
          borderRadius: 14, fontSize: 17, fontWeight: 800, cursor: pg.available === 0 ? "not-allowed" : "pointer"
        }}>{pg.available === 0 ? "This PG is Full" : `Book Now — ₹${pg.price.toLocaleString()}/month`}</button>
      </div>
    </div>
  );
}

function BookingModal({ pg, onClose, onPay, ownerUpi, ownerQr }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", moveIn: "", roomType: "Single" });
  const [payMethod, setPayMethod] = useState("UPI / GPay / PhonePe");
  const [cashPaid, setCashPaid] = useState(false); // tenant marks cash as paid

  const isCash = payMethod === "Cash (Pay to Owner)";
  const handlePay = () => {
    setStep(3);
    setTimeout(() => {
      onPay({ payMethod, cashPaid: isCash ? cashPaid : false });
      onClose();
    }, 2000);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "flex-end", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", borderRadius: "20px 20px 0 0",
        width: "100%", padding: 20, maxHeight: "85vh", overflowY: "auto"
      }}>
        {step === 1 && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>📋 Booking Details</div>
            <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>{pg.name}</div>
            {[
              { label: "Your Name", key: "name", type: "text", placeholder: "Full name" },
              { label: "Phone Number", key: "phone", type: "tel", placeholder: "10-digit mobile" },
              { label: "Move-in Date", key: "moveIn", type: "date" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>{f.label}</label>
                <input
                  type={f.type} placeholder={f.placeholder}
                  value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: 10,
                    border: "1px solid #e5e7eb", fontSize: 14, boxSizing: "border-box"
                  }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Room Type</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["Single", "Double", "Triple"].map(rt => (
                  <button key={rt} onClick={() => setForm({ ...form, roomType: rt })} style={{
                    flex: 1, padding: "8px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                    border: form.roomType === rt ? "2px solid #6366f1" : "1px solid #e5e7eb",
                    background: form.roomType === rt ? "#eff6ff" : "#fff",
                    color: form.roomType === rt ? "#6366f1" : "#374151", cursor: "pointer"
                  }}>{rt}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{
                flex: 1, padding: "12px", background: "#f3f4f6", border: "none",
                borderRadius: 12, fontSize: 15, cursor: "pointer", fontWeight: 600
              }}>Cancel</button>
              <button onClick={() => setStep(2)} style={{
                flex: 2, padding: "12px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", borderRadius: 12, fontSize: 15, color: "#fff",
                cursor: "pointer", fontWeight: 700
              }}>Continue →</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>💳 Payment</div>
            {[
              { label: "First Month Rent", value: payMethod === "Cash (Pay to Owner)" ? "Cash to Owner" : pg.price },
              { label: "Security Deposit", value: payMethod === "Cash (Pay to Owner)" ? "Cash to Owner" : pg.deposit },
              { label: "Platform Fee", value: 199 },
            ].map(row => (
              <div key={row.label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "10px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14
              }}>
                <span style={{ color: "#6b7280" }}>{row.label}</span>
                <span style={{ fontWeight: 700 }}>
                  {typeof row.value === "number" ? `₹${row.value.toLocaleString()}` : row.value}
                </span>
              </div>
            ))}
            <div style={{
              display: "flex", justifyContent: "space-between",
              padding: "12px 0", fontSize: 16, fontWeight: 800, color: "#6366f1"
            }}>
              <span>Total</span>
              <span>₹{(pg.price + pg.deposit + 199).toLocaleString()}</span>
            </div>
            <div style={{ background: "#f0f0ff", borderRadius: 12, padding: 12, marginBottom: 16 }}>
              {/* Owner UPI Direct Payment */}
              {(ownerUpi || ownerQr) && payMethod === "UPI / GPay / PhonePe" && (
                <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 12, marginBottom: 12, border: "1.5px solid #bbf7d0" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#166534", marginBottom: 8 }}>💳 Owner UPI Details</div>
                  {ownerUpi && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 20 }}>📱</span>
                      <div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>UPI ID</div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{ownerUpi}</div>
                      </div>
                      <button onClick={() => navigator.clipboard?.writeText(ownerUpi)} style={{
                        marginLeft: "auto", background: "#dcfce7", border: "none", borderRadius: 8,
                        padding: "4px 10px", fontSize: 11, color: "#166534", fontWeight: 700, cursor: "pointer"
                      }}>Copy</button>
                    </div>
                  )}
                  {ownerQr && (
                    <div style={{ textAlign: "center" }}>
                      <img src={ownerQr} alt="QR" style={{ width: 120, height: 120, borderRadius: 10, border: "2px solid #16a34a" }} />
                      <div style={{ fontSize: 11, color: "#166534", marginTop: 4 }}>GPay/PhonePe తో scan చేయి</div>
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 8 }}>
                    ⚠️ Rent + Deposit owner కి directly pay చేయి. Platform fee ₹199 మాత్రమే Kailnest కి.
                  </div>
                </div>
              )}

              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Pay via</div>
              {["UPI / GPay / PhonePe", "Net Banking", "Credit / Debit Card", "Cash (Pay to Owner)"].map(method => (
                <div key={method} onClick={() => setPayMethod(method)} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px", marginBottom: 6, background: "#fff",
                  borderRadius: 10, fontSize: 13, cursor: "pointer",
                  border: payMethod === method ? "2px solid #6366f1" : "1px solid #e5e7eb"
                }}>
                  <input type="radio" checked={payMethod === method} readOnly />
                  <span style={{ flex: 1 }}>
                    {method === "UPI / GPay / PhonePe" && "📱 "}
                    {method === "Net Banking" && "🏦 "}
                    {method === "Credit / Debit Card" && "💳 "}
                    {method === "Cash (Pay to Owner)" && "💵 "}
                    {method}
                  </span>
                  {method === "Cash (Pay to Owner)" && (
                    <span style={{ fontSize: 10, background: "#fef3c7", color: "#92400e", borderRadius: 6, padding: "2px 6px", fontWeight: 700 }}>OFFLINE</span>
                  )}
                </div>
              ))}

              {/* Cash warning */}
              {payMethod === "Cash (Pay to Owner)" && (
                <div style={{ background: "#fffbeb", borderRadius: 10, padding: 10, marginTop: 6, border: "1px solid #fde68a" }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#92400e", marginBottom: 4 }}>⚠️ Cash Payment గురించి:</div>
                  <div style={{ fontSize: 11, color: "#78350f", lineHeight: 1.6 }}>
                    • Owner ని directly cash ఇవ్వాలి (move-in రోజు)<br />
                    • ₹199 platform fee మాత్రమే online pay చేయాలి<br />
                    • Receipt తప్పకుండా తీసుకో<br />
                    • Kailnest cash transactions కి responsible కాదు
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{
                flex: 1, padding: "12px", background: "#f3f4f6", border: "none",
                borderRadius: 12, fontSize: 15, cursor: "pointer", fontWeight: 600
              }}>← Back</button>
              <button onClick={handlePay} style={{
                flex: 2, padding: "12px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", borderRadius: 12, fontSize: 15, color: "#fff",
                cursor: "pointer", fontWeight: 700
              }}>
                {payMethod === "Cash (Pay to Owner)"
                  ? `Confirm Booking + Pay ₹199`
                  : `Pay ₹${(pg.price + pg.deposit + 199).toLocaleString()}`}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>{payMethod === "Cash (Pay to Owner)" ? "🤝" : "✅"}</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#16a34a", marginBottom: 8 }}>Booking Confirmed!</div>
            <div style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7 }}>
              Your booking at <strong>{pg.name}</strong> is confirmed.<br />
              {payMethod === "Cash (Pay to Owner)"
                ? <>💵 <strong>Cash payment</strong> — move-in రోజు owner కి directly ఇవ్వాలి.<br />Receipt తప్పకుండా తీసుకో!</>
                : <>Owner will contact you within 2 hours.</>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OwnerSubscriptionModal({ onClose }) {
  const KAILNEST_UPI = "7993315482-2@ybl";
  const plans = [
    { name: "Basic", price: 499, period: "month", listings: 1, features: ["1 PG listing", "Basic analytics", "Email support"] },
    { name: "Pro", price: 2999, period: "year", listings: 5, features: ["5 PG listings", "Priority listing", "Photo gallery", "Chat with tenants", "Detailed analytics"], popular: true },
    { name: "Premium", price: 7999, period: "year", listings: 20, features: ["20 PG listings", "Top search placement", "Verified badge", "Dedicated support", "Owner dashboard"] },
  ];

  const [copied, setCopied] = useState("");

  const copyUPI = (planName) => {
    navigator.clipboard?.writeText(KAILNEST_UPI).then(() => {
      setCopied(planName);
      setTimeout(() => setCopied(""), 2000);
    }).catch(() => {
      // fallback
      const el = document.createElement("textarea");
      el.value = KAILNEST_UPI;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(planName);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", width: "100%", padding: 20, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>🏠 List Your PG</div>
        <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>Choose a subscription plan</div>
        {plans.map(plan => (
          <div key={plan.name} style={{
            border: plan.popular ? "2px solid #6366f1" : "1px solid #e5e7eb",
            borderRadius: 14, padding: 14, marginBottom: 10, position: "relative"
          }}>
            {plan.popular && (
              <div style={{
                position: "absolute", top: -1, right: 12,
                background: "#6366f1", color: "#fff", fontSize: 11,
                fontWeight: 700, padding: "2px 10px", borderRadius: "0 0 8px 8px"
              }}>Most Popular</div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{plan.name}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>Up to {plan.listings} listing{plan.listings > 1 ? "s" : ""}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: "#6366f1" }}>₹{plan.price}</span>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>/{plan.period}</span>
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              {plan.features.map(f => (
                <div key={f} style={{ fontSize: 12, color: "#374151", padding: "2px 0" }}>✓ {f}</div>
              ))}
            </div>

            {/* Payment section */}
            <div style={{ marginTop: 12, background: "#f9fafb", borderRadius: 12, padding: 12, border: "1px solid #e5e7eb" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "#111" }}>💳 Pay ₹{plan.price} via UPI</div>

              {/* QR Code via Google Charts API */}
              <div style={{ textAlign: "center", marginBottom: 10 }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=${KAILNEST_UPI}%26pn=Kailnest%26am=${plan.price}%26tn=Kailnest+${plan.name}+Plan%26cu=INR`}
                  alt="UPI QR"
                  style={{ width: 130, height: 130, borderRadius: 10, border: "2px solid #e5e7eb" }}
                />
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>📱 Phone తో scan చేయి</div>
              </div>

              {/* UPI ID copy */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 10, padding: "8px 12px", border: "1px solid #e5e7eb" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>UPI ID</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>{KAILNEST_UPI}</div>
                </div>
                <button onClick={() => copyUPI(plan.name)} style={{
                  background: copied === plan.name ? "#16a34a" : "#6366f1",
                  color: "#fff", border: "none", borderRadius: 8,
                  padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer"
                }}>{copied === plan.name ? "✅ Copied!" : "📋 Copy"}</button>
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6, textAlign: "center" }}>
                GPay / PhonePe / Paytm / BHIM లో UPI ID enter చేయి
              </div>

              {/* Mobile app buttons */}
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <a href={`upi://pay?pa=${KAILNEST_UPI}&pn=Kailnest&am=${plan.price}&tn=Kailnest+${plan.name}&cu=INR`} style={{
                  flex: 1, textAlign: "center", padding: "8px", background: "#5f259f", color: "#fff",
                  borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: "none"
                }}>💜 PhonePe</a>
                <a href={`upi://pay?pa=${KAILNEST_UPI}&pn=Kailnest&am=${plan.price}&tn=Kailnest+${plan.name}&cu=INR`} style={{
                  flex: 1, textAlign: "center", padding: "8px", background: "#1a73e8", color: "#fff",
                  borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: "none"
                }}>🔵 GPay</a>
                <a href={`upi://pay?pa=${KAILNEST_UPI}&pn=Kailnest&am=${plan.price}&tn=Kailnest+${plan.name}&cu=INR`} style={{
                  flex: 1, textAlign: "center", padding: "8px", background: "#00BAF2", color: "#fff",
                  borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: "none"
                }}>💙 Paytm</a>
              </div>
            </div>

            <div style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 8 }}>
              Pay చేసిన తర్వాత screenshot పంపు: <strong>7842375842</strong> (WhatsApp)
            </div>
          </div>
        ))}

        <div style={{ background: "#fffbeb", borderRadius: 10, padding: 10, marginBottom: 10, fontSize: 12, color: "#92400e", border: "1px solid #fde68a" }}>
          💡 Payment చేసిన తర్వాత screenshot పంపండి: {" "}
          <strong>kailnest5@gmail.com</strong> లేదా WhatsApp: <strong>7842375842</strong>
        </div>

        <button onClick={onClose} style={{
          width: "100%", padding: "12px", background: "#f3f4f6", border: "none",
          borderRadius: 12, fontSize: 15, cursor: "pointer", fontWeight: 600, marginTop: 4
        }}>Close</button>
      </div>
    </div>
  );
}

// ─── Vacation Notice Modal ────────────────────────────────────────────────────
function VacationNoticeModal({ booking, onClose, onSubmit }) {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 15);
  const minDateStr = minDate.toISOString().split("T")[0];

  const [vacateDate, setVacateDate] = useState(minDateStr);
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1); // 1=form, 2=confirm, 3=done

  const daysLeft = Math.ceil((new Date(vacateDate) - today) / (1000 * 60 * 60 * 24));

  const handleSubmit = () => {
    setStep(3);
    setTimeout(() => { onSubmit({ ...booking, vacateDate, reason }); onClose(); }, 2200);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", width: "100%", padding: 20, maxHeight: "90vh", overflowY: "auto" }}>

        {step === 1 && (
          <>
            {/* Title */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ fontSize: 28 }}>🏃</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17 }}>Vacation Notice</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{booking.name}</div>
              </div>
            </div>

            {/* 15-day rule banner */}
            <div style={{
              background: "linear-gradient(135deg, #fef3c7, #fde68a)",
              borderRadius: 12, padding: 12, marginTop: 12, marginBottom: 16,
              border: "1px solid #f59e0b", display: "flex", gap: 10, alignItems: "flex-start"
            }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#92400e" }}>15-Day Notice Rule</div>
                <div style={{ fontSize: 12, color: "#78350f", marginTop: 2, lineHeight: 1.5 }}>
                  మీరు PG vacate చేయాలంటే minimum <strong>15 రోజుల ముందే</strong> notice ఇవ్వాలి. Owner కి prepare అవ్వడానికి time ఉంటుంది.
                </div>
              </div>
            </div>

            {/* Vacate Date */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
                📅 Vacate Date (minimum 15 days from today)
              </label>
              <input
                type="date"
                value={vacateDate}
                min={minDateStr}
                onChange={e => setVacateDate(e.target.value)}
                style={{
                  width: "100%", padding: "11px 12px", borderRadius: 10,
                  border: "1.5px solid #6366f1", fontSize: 15, boxSizing: "border-box",
                  color: "#111", fontWeight: 600, background: "#f5f3ff"
                }}
              />
              <div style={{ fontSize: 12, color: "#6366f1", marginTop: 5, fontWeight: 600 }}>
                📌 {daysLeft} days from today · Owner will be notified immediately
              </div>
            </div>

            {/* Reason */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
                📝 Reason for Vacating
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                {["Job change", "College done", "Personal reasons", "Found better PG", "Going home", "Other"].map(r => (
                  <button key={r} onClick={() => setReason(r)} style={{
                    padding: "8px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                    border: reason === r ? "2px solid #6366f1" : "1px solid #e5e7eb",
                    background: reason === r ? "#eff6ff" : "#f9fafb",
                    color: reason === r ? "#6366f1" : "#374151", cursor: "pointer"
                  }}>{r}</button>
                ))}
              </div>
              <textarea
                placeholder="Additional message to owner (optional)..."
                rows={3}
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: 10,
                  border: "1px solid #e5e7eb", fontSize: 13, boxSizing: "border-box",
                  resize: "none", fontFamily: "inherit", color: "#374151"
                }}
              />
            </div>

            {/* What happens next */}
            <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 12, marginBottom: 16, border: "1px solid #bbf7d0" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#166534", marginBottom: 6 }}>✅ What happens next?</div>
              {[
                "Owner కి తక్షణమే notification వెళ్తుంది",
                `${vacateDate} తర్వాత PG automatically vacant అవుతుంది`,
                "Security deposit refund process start అవుతుంది",
                "Final dues settle చేయడానికి owner contact చేస్తారు",
              ].map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: "#15803d", padding: "2px 0" }}>
                  {i + 1}. {s}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{
                flex: 1, padding: "12px", background: "#f3f4f6", border: "none",
                borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 600
              }}>Cancel</button>
              <button onClick={() => setStep(2)} disabled={!reason} style={{
                flex: 2, padding: "12px",
                background: reason ? "linear-gradient(135deg, #f59e0b, #ef4444)" : "#d1d5db",
                color: "#fff", border: "none", borderRadius: 12, fontSize: 14,
                cursor: reason ? "pointer" : "not-allowed", fontWeight: 700
              }}>Submit Notice →</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>⚠️ Confirm Vacation Notice</div>
            <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>Once submitted, owner will be notified</div>

            <div style={{ background: "#fef2f2", borderRadius: 14, padding: 16, marginBottom: 16, border: "1px solid #fecaca" }}>
              {[
                { label: "PG Name", value: booking.name },
                { label: "Location", value: booking.location },
                { label: "Vacate Date", value: vacateDate },
                { label: "Days Notice", value: `${daysLeft} days` },
                { label: "Reason", value: reason },
              ].map(row => (
                <div key={row.label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "7px 0", borderBottom: "1px solid #fee2e2", fontSize: 13
                }}>
                  <span style={{ color: "#9ca3af" }}>{row.label}</span>
                  <span style={{ fontWeight: 700, color: "#111", maxWidth: "55%", textAlign: "right" }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 10, marginBottom: 16, fontSize: 12, color: "#92400e", border: "1px solid #fde68a" }}>
              ⚠️ ఈ notice submit అయిన తర్వాత cancel చేయడానికి owner permission కావాలి.
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{
                flex: 1, padding: "12px", background: "#f3f4f6", border: "none",
                borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 600
              }}>← Back</button>
              <button onClick={handleSubmit} style={{
                flex: 2, padding: "12px",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff", border: "none", borderRadius: 12, fontSize: 14,
                cursor: "pointer", fontWeight: 700
              }}>✅ Confirm & Notify Owner</button>
            </div>
          </>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>📨</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#d97706", marginBottom: 8 }}>Notice Sent!</div>
            <div style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
              Owner కి notification వెళ్ళింది.<br />
              <strong>Vacate Date: {vacateDate}</strong><br />
              Deposit refund process soon start అవుతుంది.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Customer Support Modal ───────────────────────────────────────────────────
const SUPPORT_NUMBER = "7842375842";
const SUPPORT_WHATSAPP = "7842375842";
const SUPPORT_EMAIL = "kailnest5@gmail.com";

function CustomerSupportModal({ onClose }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "support", text: "నమస్కారం! Kailnest Support కి స్వాగతం 🙏 మీకు ఎలా help చేయాలి?", time: "10:00 AM" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const AUTO_REPLIES = {
    "booking": "మీ booking గురించి details చెప్పండి, మేము immediately help చేస్తాం! 📋",
    "payment": "Payment issue ఉంటే మీ transaction ID share చేయండి. 24hrs లో resolve చేస్తాం. 💳",
    "refund": "Refund process 5-7 working days తీసుకుంటుంది. మీ booking ID ఇవ్వండి. 💰",
    "vacate": "Vacation notice గురించి help కావాలా? Bookings tab లో 'Vacation Notice' button use చేయండి. 🏃",
    "owner": "Owner contact issue ఉంటే మేము directly mediate చేస్తాం. Owner name చెప్పండి. 👤",
    "default": "మీ query note చేశాం. Support team 30 minutes లో contact చేస్తారు. 🕐"
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const lower = input.toLowerCase();
      const key = Object.keys(AUTO_REPLIES).find(k => lower.includes(k)) || "default";
      setMessages(prev => [...prev, { from: "support", text: AUTO_REPLIES[key], time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
      setTyping(false);
    }, 1200);
  };

  const FAQS = [
    { q: "Booking cancel చేయాలి", k: "booking" },
    { q: "Payment issue", k: "payment" },
    { q: "Refund status", k: "refund" },
    { q: "Vacation notice", k: "vacate" },
    { q: "Owner contact problem", k: "owner" },
  ];

  const quickSend = (text) => {
    setInput(text);
    setTimeout(() => {
      const userMsg = { from: "user", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      setMessages(prev => [...prev, userMsg]);
      setTyping(true);
      setTimeout(() => {
        const lower = text.toLowerCase();
        const key = Object.keys(AUTO_REPLIES).find(k => lower.includes(k)) || "default";
        setMessages(prev => [...prev, { from: "support", text: AUTO_REPLIES[key], time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
        setTyping(false);
      }, 1000);
      setInput("");
    }, 100);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", width: "100%", maxHeight: "92vh", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "22px 22px 0 0", padding: "16px 20px", color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎧</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>Customer Support</div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>● Online · Avg reply: 5 min</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>✕ Close</button>
          </div>
        </div>

        <div style={{ overflowY: "auto", flex: 1, padding: 16 }}>

          {!chatOpen ? (
            <>
              {/* Contact Options */}
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: "#111" }}>మాతో contact చేయండి</div>

              {/* Voice Call */}
              <a href={`tel:${SUPPORT_NUMBER}`} style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#f0fdf4", borderRadius: 14, padding: "14px 16px", marginBottom: 10, border: "1.5px solid #bbf7d0", cursor: "pointer" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📞</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#15803d" }}>Voice Call</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Mon–Sat · 9AM–8PM</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>{SUPPORT_NUMBER}</div>
                  </div>
                  <div style={{ fontSize: 20, color: "#16a34a" }}>›</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a href={`https://wa.me/91${SUPPORT_WHATSAPP}?text=Hello%20Kailnest%20Support%2C%20I%20need%20help%20with%20my%20booking.`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#f0fdf4", borderRadius: 14, padding: "14px 16px", marginBottom: 10, border: "1.5px solid #bbf7d0", cursor: "pointer" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>💬</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#15803d" }}>WhatsApp Chat</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>24/7 Available · Quick replies</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#25D366" }}>wa.me/91{SUPPORT_WHATSAPP}</div>
                  </div>
                  <div style={{ fontSize: 20, color: "#25D366" }}>›</div>
                </div>
              </a>

              {/* In-App Chat */}
              <div onClick={() => setChatOpen(true)} style={{ display: "flex", alignItems: "center", gap: 14, background: "#eff6ff", borderRadius: 14, padding: "14px 16px", marginBottom: 10, border: "1.5px solid #bfdbfe", cursor: "pointer" }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>💭</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#4338ca" }}>In-App Chat</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Chat with support agent now</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#6366f1" }}>Tap to open chat →</div>
                </div>
                <div style={{ fontSize: 20, color: "#6366f1" }}>›</div>
              </div>

              {/* Email */}
              <a href={`mailto:${SUPPORT_EMAIL}?subject=Kailnest Support`} style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#faf5ff", borderRadius: 14, padding: "14px 16px", marginBottom: 16, border: "1.5px solid #e9d5ff", cursor: "pointer" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#9333ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#7e22ce" }}>Email Support</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Reply within 24 hours</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#9333ea" }}>{SUPPORT_EMAIL}</div>
                  </div>
                  <div style={{ fontSize: 20, color: "#9333ea" }}>›</div>
                </div>
              </a>

              {/* Timings */}
              <div style={{ background: "#f9fafb", borderRadius: 12, padding: 14, border: "1px solid #f3f4f6", marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🕐 Support Timings</div>
                {[
                  { channel: "📞 Voice Call", time: "Mon–Sat · 9AM–8PM" },
                  { channel: "💬 WhatsApp", time: "24/7 Available" },
                  { channel: "💭 In-App Chat", time: "Mon–Sun · 8AM–10PM" },
                  { channel: "📧 Email", time: "Reply in 24 hrs" },
                ].map(r => (
                  <div key={r.channel} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13, borderBottom: "1px solid #f3f4f6" }}>
                    <span>{r.channel}</span>
                    <span style={{ color: "#6b7280" }}>{r.time}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Chat Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <button onClick={() => setChatOpen(false)} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 13 }}>← Back</button>
                <div style={{ fontWeight: 700, fontSize: 14 }}>💭 Live Chat Support</div>
              </div>

              {/* Chat Messages */}
              <div style={{ marginBottom: 10 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: m.from === "user" ? "row-reverse" : "row", marginBottom: 10, alignItems: "flex-end", gap: 6 }}>
                    {m.from === "support" && (
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🎧</div>
                    )}
                    <div style={{
                      maxWidth: "75%", padding: "10px 13px", borderRadius: m.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: m.from === "user" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#f3f4f6",
                      color: m.from === "user" ? "#fff" : "#111", fontSize: 13, lineHeight: 1.5
                    }}>
                      {m.text}
                      <div style={{ fontSize: 10, opacity: 0.65, marginTop: 3, textAlign: "right" }}>{m.time}</div>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎧</div>
                    <div style={{ background: "#f3f4f6", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", fontSize: 13, color: "#6b7280" }}>typing...</div>
                  </div>
                )}
              </div>

              {/* Quick FAQ Buttons */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 6, fontWeight: 600 }}>QUICK QUESTIONS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {FAQS.map(f => (
                    <button key={f.q} onClick={() => quickSend(f.q)} style={{ background: "#eff6ff", color: "#4338ca", border: "1px solid #bfdbfe", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{f.q}</button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Chat Input — only show when chat is open */}
        {chatOpen && (
          <div style={{ padding: "10px 16px 24px", borderTop: "1px solid #f3f4f6", display: "flex", gap: 8, background: "#fff" }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="మీ message type చేయండి..."
              style={{ flex: 1, padding: "10px 14px", borderRadius: 24, border: "1.5px solid #e5e7eb", fontSize: 13, outline: "none" }}
            />
            <button onClick={sendMessage} style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>➤</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Owner Media Upload Modal ──────────────────────────────────────────────────
function OwnerMediaUploadModal({ onClose, onSave }) {
  const [photos, setPhotos] = useState([]); // array of {file, previewUrl}
  const [video, setVideo] = useState(null); // {file, previewUrl}
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const handlePhotoSelect = (e) => {
    const files = Array.from(e.target.files).slice(0, 8 - photos.length);
    const newPhotos = files.map(f => ({ file: f, previewUrl: URL.createObjectURL(f) }));
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) setVideo({ file, previewUrl: URL.createObjectURL(file) });
  };

  const removePhoto = (i) => setPhotos(prev => prev.filter((_, idx) => idx !== i));

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setDone(true);
      setTimeout(() => { onSave({ photos, video }); onClose(); }, 1500);
    }, 1800);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", width: "100%", padding: 20, maxHeight: "90vh", overflowY: "auto" }}>

        {done ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>✅</div>
            <div style={{ fontWeight: 800, fontSize: 19, color: "#16a34a" }}>Media Uploaded!</div>
            <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>{photos.length} photos{video ? " + 1 video" : ""} added to listing.</div>
          </div>
        ) : uploading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>⏳</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#6366f1" }}>Uploading to server...</div>
            <div style={{ background: "#f3f4f6", borderRadius: 20, height: 8, marginTop: 16, overflow: "hidden" }}>
              <div style={{ width: "70%", height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 20 }} />
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>📸 Add Photos & Video</div>
            <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>Good photos get 3x more enquiries</div>

            {/* Photo grid */}
            <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>Photos ({photos.length}/8)</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              {photos.map((p, i) => (
                <div key={i} style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 70 }}>
                  <img src={p.previewUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <button onClick={() => removePhoto(i)} style={{
                    position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.6)",
                    color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20,
                    fontSize: 11, cursor: "pointer", lineHeight: 1
                  }}>✕</button>
                  {i === 0 && (
                    <div style={{ position: "absolute", bottom: 2, left: 2, background: "#6366f1", color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 5, padding: "1px 5px" }}>COVER</div>
                  )}
                </div>
              ))}
              {photos.length < 8 && (
                <label style={{
                  height: 70, borderRadius: 10, border: "2px dashed #c7d2fe",
                  background: "#f5f3ff", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6366f1"
                }}>
                  <span style={{ fontSize: 22 }}>📷</span>
                  <span style={{ fontSize: 9, fontWeight: 700, marginTop: 2 }}>Add</span>
                  <input type="file" accept="image/*" multiple onChange={handlePhotoSelect} style={{ display: "none" }} />
                </label>
              )}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 16 }}>📌 First photo = cover photo shown in search results</div>

            {/* Video */}
            <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>PG Video Tour (optional)</div>
            {video ? (
              <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
                <video src={video.previewUrl} style={{ width: "100%", maxHeight: 160, objectFit: "cover" }} controls />
                <button onClick={() => setVideo(null)} style={{
                  position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.6)",
                  color: "#fff", border: "none", borderRadius: "50%", width: 26, height: 26,
                  fontSize: 13, cursor: "pointer"
                }}>✕</button>
              </div>
            ) : (
              <label style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                height: 60, borderRadius: 12, border: "2px dashed #c7d2fe",
                background: "#f5f3ff", cursor: "pointer", color: "#6366f1", marginBottom: 16, fontWeight: 600, fontSize: 13
              }}>
                🎬 Upload PG Video Tour (max 60 sec)
                <input type="file" accept="video/*" onChange={handleVideoSelect} style={{ display: "none" }} />
              </label>
            )}

            <div style={{ background: "#eff6ff", borderRadius: 10, padding: 10, marginBottom: 16, fontSize: 12, color: "#1e40af", border: "1px solid #bfdbfe" }}>
              💡 Tip: Room, bathroom, kitchen, entrance photos + 1 walkthrough video పెడితే bookings fast అవుతాయి.
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{
                flex: 1, padding: "12px", background: "#f3f4f6", border: "none",
                borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 600
              }}>Cancel</button>
              <button onClick={handleUpload} disabled={photos.length === 0} style={{
                flex: 2, padding: "12px",
                background: photos.length > 0 ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#d1d5db",
                color: "#fff", border: "none", borderRadius: 12, fontSize: 14,
                cursor: photos.length > 0 ? "pointer" : "not-allowed", fontWeight: 700
              }}>Upload {photos.length} Photo{photos.length !== 1 ? "s" : ""}{video ? " + Video" : ""}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Complaint System ──────────────────────────────────────────────────────────
// PRIVACY RULE: A complaint is tagged with pgId + ownerId + tenantId.
// - Tenant sees ONLY their own complaints.
// - Owner sees ONLY complaints for THEIR OWN PG (never other owners' complaints, never other tenants' complaints).
// - Auto-reminder fires to the owner every 24hrs until status = "resolved".

const COMPLAINT_CATEGORIES = ["Water issue", "Electricity", "Food quality", "Cleanliness", "Noise/Safety", "Maintenance", "Owner behaviour", "Other"];

function ComplaintModal({ booking, onClose, onSubmit }) {
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    const complaint = {
      id: "C" + Date.now(),
      pgId: booking.id,
      pgName: booking.name,
      ownerId: booking.owner,
      ownerPhone: booking.phone,
      tenantName: "You", // in real app: logged-in tenant name
      category,
      desc,
      status: "open", // open -> resolved
      createdAt: new Date().toISOString(),
      lastReminderAt: new Date().toISOString(),
      reminderCount: 1,
    };
    setStep(2);
    setTimeout(() => { onSubmit(complaint); onClose(); }, 1600);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", width: "100%", padding: 20, maxHeight: "90vh", overflowY: "auto" }}>
        {step === 1 ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ fontSize: 26 }}>📢</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17 }}>Raise a Complaint</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{booking.name}</div>
              </div>
            </div>

            <div style={{ background: "#eff6ff", borderRadius: 10, padding: 10, marginTop: 12, marginBottom: 16, fontSize: 12, color: "#1e40af", border: "1px solid #bfdbfe" }}>
              🔒 ఈ complaint మీ PG owner కి మాత్రమే కనిపిస్తుంది. ఇతర tenants ఎవరూ చూడలేరు.
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>Category</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {COMPLAINT_CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCategory(c)} style={{
                    padding: "9px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                    border: category === c ? "2px solid #ef4444" : "1px solid #e5e7eb",
                    background: category === c ? "#fef2f2" : "#f9fafb",
                    color: category === c ? "#dc2626" : "#374151", cursor: "pointer"
                  }}>{c}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Describe the issue</label>
              <textarea
                value={desc} onChange={e => setDesc(e.target.value)}
                placeholder="Detail గా రాయండి... (ఉదా: 2 రోజులుగా water రావడం లేదు)"
                rows={4}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, boxSizing: "border-box", resize: "none", fontFamily: "inherit" }}
              />
            </div>

            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 10, marginBottom: 16, fontSize: 12, color: "#92400e", border: "1px solid #fde68a" }}>
              🔔 Owner reply ఇచ్చి "Resolved" mark చేసేవరకు automatic reminder messages పంపుతాం (24hrs కి ఒకటి).
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{ flex: 1, padding: "12px", background: "#f3f4f6", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 600 }}>Cancel</button>
              <button onClick={handleSubmit} disabled={!category || !desc.trim()} style={{
                flex: 2, padding: "12px",
                background: category && desc.trim() ? "linear-gradient(135deg, #ef4444, #dc2626)" : "#d1d5db",
                color: "#fff", border: "none", borderRadius: 12, fontSize: 14,
                cursor: category && desc.trim() ? "pointer" : "not-allowed", fontWeight: 700
              }}>📢 Submit Complaint</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>✅</div>
            <div style={{ fontWeight: 800, fontSize: 19, color: "#16a34a" }}>Complaint Sent!</div>
            <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>Owner కి notification వెళ్ళింది. Resolve అయ్యేవరకు reminders పంపుతాం.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Owner side: shows ONLY complaints where complaint.ownerId === current owner's name/id.
// This filtering is the privacy boundary — owners never see other owners' or other tenants' complaints.
function OwnerComplaintsView({ complaints, currentOwnerId, onResolve, onClose }) {
  const myComplaints = complaints.filter(c => c.ownerId === currentOwnerId);
  const open = myComplaints.filter(c => c.status === "open");
  const resolved = myComplaints.filter(c => c.status === "resolved");

  const daysAgo = (iso) => Math.floor((Date.now() - new Date(iso)) / (1000 * 60 * 60 * 24));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg, #ef4444, #f59e0b)", borderRadius: "22px 22px 0 0", padding: "16px 20px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>📢 My PG Complaints</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>Only your PG's complaints shown here · {open.length} open</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>✕</button>
        </div>

        <div style={{ overflowY: "auto", padding: 16, flex: 1 }}>
          {myComplaints.length === 0 ? (
            <div style={{ textAlign: "center", padding: 30, color: "#9ca3af" }}>
              <div style={{ fontSize: 40 }}>✅</div>
              <div style={{ fontSize: 14, marginTop: 8 }}>No complaints. All good!</div>
            </div>
          ) : (
            <>
              {open.length > 0 && (
                <>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#dc2626", marginBottom: 8 }}>🔴 OPEN ({open.length})</div>
                  {open.map(c => (
                    <div key={c.id} style={{ background: "#fef2f2", borderRadius: 14, padding: 14, marginBottom: 10, border: "1.5px solid #fecaca" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#991b1b" }}>{c.category}</span>
                        <span style={{ fontSize: 11, color: "#9ca3af" }}>{daysAgo(c.createdAt)}d ago</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#374151", marginTop: 6, lineHeight: 1.5 }}>{c.desc}</div>
                      <div style={{ fontSize: 11, color: "#dc2626", marginTop: 8, fontWeight: 600 }}>
                        🔔 Reminder sent {c.reminderCount}x · PG: {c.pgName}
                      </div>
                      <button onClick={() => onResolve(c.id)} style={{
                        width: "100%", marginTop: 10, padding: "9px",
                        background: "linear-gradient(135deg, #16a34a, #15803d)", color: "#fff",
                        border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer"
                      }}>✅ Mark as Resolved</button>
                    </div>
                  ))}
                </>
              )}
              {resolved.length > 0 && (
                <>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#16a34a", marginBottom: 8, marginTop: 16 }}>✅ RESOLVED ({resolved.length})</div>
                  {resolved.map(c => (
                    <div key={c.id} style={{ background: "#f0fdf4", borderRadius: 14, padding: 14, marginBottom: 10, border: "1px solid #bbf7d0", opacity: 0.8 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: "#166534" }}>{c.category}</span>
                      <div style={{ fontSize: 13, color: "#374151", marginTop: 6 }}>{c.desc}</div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


const HOTELS = [
  { id: 101, name: "Sri Venkateswara Lodge", owner: "Prasad Rao", phone: "9811122233", location: "Tirupati, AP", nearBy: "Bus stand 0.3km", type: "Standard", rating: 4.1, reviews: 87, price: 800, deposit: 0, available: 5, total: 20, photos: ["🏨"], photoUrls: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Room Service", "Parking", "CCTV"], conditions: "Check-in 12PM, Check-out 11AM.", verified: true, featured: true, description: "Budget hotel near Tirupati bus stand.", category: "Hotel" },
  { id: 102, name: "Kadapa Grand Inn", owner: "Suresh Babu", phone: "9922334455", location: "Kadapa, AP", nearBy: "Railway station 1km", type: "Deluxe", rating: 3.8, reviews: 34, price: 1200, deposit: 0, available: 3, total: 15, photos: ["🏨"], photoUrls: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Restaurant", "Power Backup"], conditions: "Valid ID mandatory at check-in.", verified: false, featured: false, description: "Comfortable stay in heart of Kadapa.", category: "Hotel" },
];

const APARTMENTS = [
  { id: 201, name: "Green View Apartments", owner: "Lakshmi Reddy", phone: "9700011122", location: "Gachibowli, Hyderabad", nearBy: "Hitech City 2km", type: "2BHK", rating: 4.5, reviews: 19, price: 18000, deposit: 36000, available: 2, total: 8, photos: ["🏢"], photoUrls: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Gym", "Security", "Parking", "Power Backup"], conditions: "11-month agreement mandatory. 2 months notice.", verified: true, featured: true, description: "Modern 2BHK flats for IT professionals.", category: "Apartment" },
  { id: 202, name: "Sai Residency", owner: "Ramu Chowdary", phone: "9600022233", location: "Vijayawada, AP", nearBy: "MG Road 0.5km", type: "1BHK", rating: 4.0, reviews: 11, price: 8000, deposit: 16000, available: 1, total: 6, photos: ["🏢"], photoUrls: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"], videoUrl: "", amenities: ["WiFi", "Security", "Parking"], conditions: "Families preferred. 1 month notice.", verified: false, featured: false, description: "Affordable 1BHK in prime location.", category: "Apartment" },
];

const HOUSES = [
  { id: 301, name: "Independent House - Porumamilla", owner: "Krishna Murthy", phone: "9500033344", location: "Porumamilla, Kadapa", nearBy: "Town center 0.8km", type: "3BHK", rating: 4.2, reviews: 7, price: 6000, deposit: 12000, available: 1, total: 1, photos: ["🏠"], photoUrls: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600"], videoUrl: "", amenities: ["Parking", "Garden", "Borewell", "Solar Power"], conditions: "Family only. 2 months notice required.", verified: true, featured: false, description: "Spacious 3BHK independent house with garden.", category: "House" },
  { id: 302, name: "Corner House - Nandyal", owner: "Venkat Rao", phone: "9400044455", location: "Nandyal, AP", nearBy: "Market 1km", type: "2BHK", rating: 3.9, reviews: 5, price: 4500, deposit: 9000, available: 1, total: 1, photos: ["🏠"], photoUrls: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600"], videoUrl: "", amenities: ["Parking", "Borewell", "Power Backup"], conditions: "No pets. 1 month notice.", verified: false, featured: false, description: "Good 2BHK house in calm neighborhood.", category: "House" },
];

const INDIA_CITIES = {
  "Andhra Pradesh": ["Hyderabad", "Vijayawada", "Visakhapatnam", "Tirupati", "Kadapa", "Nellore", "Guntur", "Kurnool", "Porumamilla"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Delhi": ["New Delhi", "Noida", "Gurgaon", "Faridabad"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
  "Telangana": ["Hyderabad", "Warangal", "Karimnagar"],
};

// India-wide extra listings (added to existing AP listings)
const EXTRA_PGS = [
  { id: 11, name: "Bangalore Boys PG", owner: "Mohan Das", phone: "9811100001", location: "Koramangala, Bangalore", nearBy: "Forum Mall 0.5km", type: "Boys", rating: 4.4, reviews: 62, price: 7000, deposit: 14000, available: 4, total: 12, photos: ["🛏️"], photoUrls: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Food", "Laundry", "CCTV"], conditions: "No late entry after 11PM.", verified: true, featured: true, description: "Premium PG in Koramangala IT hub.", category: "PG" },
  { id: 12, name: "Delhi Girls Hostel", owner: "Priya Sharma", phone: "9811100002", location: "Lajpat Nagar, Delhi", nearBy: "Metro Station 0.2km", type: "Girls", rating: 4.6, reviews: 89, price: 8500, deposit: 17000, available: 2, total: 20, photos: ["🛏️"], photoUrls: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Food", "Security Guard", "CCTV"], conditions: "Girls only. No visitors.", verified: true, featured: false, description: "Safe girls hostel near metro.", category: "PG" },
  { id: 13, name: "Mumbai Co-Living", owner: "Rahul Mehta", phone: "9811100003", location: "Andheri West, Mumbai", nearBy: "Andheri Station 1km", type: "Co-ed", rating: 4.2, reviews: 45, price: 12000, deposit: 24000, available: 3, total: 15, photos: ["🛏️"], photoUrls: ["https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Gym", "Cafeteria", "Netflix"], conditions: "Working professionals preferred.", verified: true, featured: true, description: "Modern co-living space in Mumbai.", category: "PG" },
  { id: 14, name: "Chennai Student PG", owner: "Vijay Kumar", phone: "9811100004", location: "Anna Nagar, Chennai", nearBy: "Anna Nagar Tower 0.8km", type: "Boys", rating: 3.9, reviews: 28, price: 5500, deposit: 11000, available: 6, total: 18, photos: ["🛏️"], photoUrls: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], videoUrl: "", amenities: ["WiFi", "Food", "Study Room", "Laundry"], conditions: "Students only. Mess mandatory.", verified: false, featured: false, description: "Budget PG for students.", category: "PG" },
];

const EXTRA_HOTELS = [
  { id: 201, name: "Bangalore Business Inn", owner: "Suresh Nair", phone: "9811200001", location: "MG Road, Bangalore", nearBy: "Brigade Road 0.3km", type: "Deluxe", rating: 4.3, reviews: 124, price: 1800, deposit: 0, available: 8, total: 30, photos: ["🏨"], photoUrls: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Restaurant", "Parking", "Room Service"], conditions: "Check-in 2PM, Check-out 12PM.", verified: true, featured: true, description: "Business hotel in heart of Bangalore.", category: "Hotel" },
  { id: 202, name: "Mumbai Sea View Hotel", owner: "Anita Bose", phone: "9811200002", location: "Marine Lines, Mumbai", nearBy: "Marine Drive 0.1km", type: "Premium", rating: 4.7, reviews: 203, price: 3500, deposit: 0, available: 2, total: 25, photos: ["🏨"], photoUrls: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Restaurant", "Gym", "Sea View"], conditions: "Check-in 3PM, Check-out 11AM.", verified: true, featured: true, description: "Premium hotel with sea view.", category: "Hotel" },
  { id: 203, name: "Delhi Budget Stay", owner: "Ramesh Gupta", phone: "9811200003", location: "Karol Bagh, Delhi", nearBy: "Karol Bagh Metro 0.5km", type: "Standard", rating: 3.7, reviews: 56, price: 900, deposit: 0, available: 10, total: 20, photos: ["🏨"], photoUrls: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Parking"], conditions: "ID proof mandatory.", verified: false, featured: false, description: "Affordable stay near metro.", category: "Hotel" },
];

const EXTRA_APARTMENTS = [
  { id: 301, name: "Bangalore IT Park Flat", owner: "Deepa Krishnan", phone: "9811300001", location: "Whitefield, Bangalore", nearBy: "ITPL 0.5km", type: "2BHK", rating: 4.6, reviews: 34, price: 22000, deposit: 44000, available: 1, total: 10, photos: ["🏢"], photoUrls: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Gym", "Swimming Pool", "Security", "Parking"], conditions: "11-month agreement. 2 months notice.", verified: true, featured: true, description: "Premium 2BHK near ITPL tech park.", category: "Apartment" },
  { id: 302, name: "Mumbai Studio Apartment", owner: "Kavita Shah", phone: "9811300002", location: "Powai, Mumbai", nearBy: "Hiranandani 0.3km", type: "Studio", rating: 4.1, reviews: 18, price: 25000, deposit: 50000, available: 1, total: 5, photos: ["🏢"], photoUrls: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"], videoUrl: "", amenities: ["WiFi", "AC", "Security", "Parking", "Power Backup"], conditions: "Working professionals only.", verified: true, featured: false, description: "Modern studio in Powai.", category: "Apartment" },
  { id: 303, name: "Pune IT Hub 1BHK", owner: "Amit Joshi", phone: "9811300003", location: "Hinjewadi, Pune", nearBy: "Infosys Campus 1km", type: "1BHK", rating: 4.0, reviews: 22, price: 12000, deposit: 24000, available: 2, total: 8, photos: ["🏢"], photoUrls: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600"], videoUrl: "", amenities: ["WiFi", "Parking", "Security"], conditions: "Families & professionals. 1 month notice.", verified: false, featured: false, description: "Affordable 1BHK near IT hub.", category: "Apartment" },
];

const EXTRA_HOUSES = [
  { id: 401, name: "Jaipur Heritage Bungalow", owner: "Rajesh Singhania", phone: "9811400001", location: "Civil Lines, Jaipur", nearBy: "City Palace 3km", type: "4BHK", rating: 4.5, reviews: 9, price: 15000, deposit: 30000, available: 1, total: 1, photos: ["🏠"], photoUrls: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600"], videoUrl: "", amenities: ["Parking", "Garden", "Borewell", "AC", "Security"], conditions: "Family preferred. 3 months notice.", verified: true, featured: true, description: "Spacious heritage bungalow.", category: "House" },
  { id: 402, name: "Bangalore Villa", owner: "Sunita Rao", phone: "9811400002", location: "Sarjapur Road, Bangalore", nearBy: "Electronic City 5km", type: "3BHK", rating: 4.3, reviews: 14, price: 35000, deposit: 70000, available: 1, total: 1, photos: ["🏠"], photoUrls: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600"], videoUrl: "", amenities: ["AC", "Parking", "Garden", "Security", "Swimming Pool"], conditions: "Families only. 2 months notice.", verified: true, featured: false, description: "Luxury villa with pool.", category: "House" },
];

const ALL_LISTINGS = {
  PG: [...PGS, ...EXTRA_PGS],
  Hotel: [...HOTELS, ...EXTRA_HOTELS],
  Apartment: [...APARTMENTS, ...EXTRA_APARTMENTS],
  House: [...HOUSES, ...EXTRA_HOUSES],
};

const CATEGORIES = [
  { key: "PG", label: "PG / Hostel", icon: "🛏️", color: "#6366f1", bg: "#eff6ff", desc: "Paying Guest accommodations" },
  { key: "Hotel", label: "Hotels", icon: "🏨", color: "#0891b2", bg: "#ecfeff", desc: "Daily / short stay hotels" },
  { key: "Apartment", label: "Apartments", icon: "🏢", color: "#059669", bg: "#f0fdf4", desc: "Furnished & unfurnished flats" },
  { key: "House", label: "Houses", icon: "🏠", color: "#d97706", bg: "#fffbeb", desc: "Independent houses for rent" },
];

export default function PGFinderApp() {
  const [tab, setTab] = useState("search");
  const [activeCategory, setActiveCategory] = useState(null);
  const [user, setUser] = useState(null); // null = not logged in
  const [citySelected, setCitySelected] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All India");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showTerms, setShowTerms] = useState(null); // "terms" | "privacy" | null
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterGender, setFilterGender] = useState("All"); // for Houses/Apartments
  const [filterAC, setFilterAC] = useState("All"); // All/AC/Non-AC
  const [filterFurnished, setFilterFurnished] = useState("All"); // All/Furnished/Unfurnished
  const [wishlist, setWishlist] = useState([]); // listing ids saved
  const [showWishlist, setShowWishlist] = useState(false);
  const [maxPrice, setMaxPrice] = useState(50000);

  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const [selectedPG, setSelectedPG] = useState(null);
  const [bookingPG, setBookingPG] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [ownerNotifications, setOwnerNotifications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [vacationBooking, setVacationBooking] = useState(null);
  const [vacatedBookings, setVacatedBookings] = useState([]);
  const [showSupport, setShowSupport] = useState(false);
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [complaintBooking, setComplaintBooking] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [showOwnerComplaints, setShowOwnerComplaints] = useState(false);
  const CURRENT_OWNER_ID = "Ravi Kumar"; // simulates the logged-in owner; in real app this comes from auth

  // Auto-reminder simulation: every 20s (demo speed) bump reminderCount for open complaints
  // In production this would be a backend cron job sending push/SMS/WhatsApp to the owner every 24hrs
  useEffect(() => {
    const interval = setInterval(() => {
      setComplaints(prev => prev.map(c =>
        c.status === "open"
          ? { ...c, reminderCount: c.reminderCount + 1, lastReminderAt: new Date().toISOString() }
          : c
      ));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const currentListings = activeCategory ? (ALL_LISTINGS[activeCategory] || []) : PGS;
  const filtered = currentListings.filter(pg => {
    const matchSearch = pg.name.toLowerCase().includes(search.toLowerCase()) ||
      pg.location.toLowerCase().includes(search.toLowerCase()) ||
      pg.nearBy.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || pg.type === filterType;
    const matchGender = filterGender === "All" || pg.type === filterGender;
    const matchAC = filterAC === "All" ||
      (filterAC === "AC" && pg.amenities?.includes("AC")) ||
      (filterAC === "Non-AC" && !pg.amenities?.includes("AC"));
    const matchFurnished = filterFurnished === "All" ||
      (filterFurnished === "Furnished" && pg.amenities?.some(a => a.toLowerCase().includes("furnish"))) ||
      (filterFurnished === "Unfurnished" && !pg.amenities?.some(a => a.toLowerCase().includes("furnish")));
    const matchPrice = pg.price <= maxPrice;
    const matchCity = selectedCity === "All India" || pg.location.toLowerCase().includes(selectedCity.toLowerCase());
    return matchSearch && matchType && matchGender && matchAC && matchFurnished && matchPrice && matchCity;
  });
  // Featured listings (paid ads) first
  const sortedFiltered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  // Show login screen if not logged in
  if (!user) return <LoginScreen onLogin={(u) => setUser(u)} />;

  // Show city selector after login (first time)
  if (!citySelected) return (
    <CitySelectorScreen onSelectCity={(city) => { setSelectedCity(city); setCitySelected(true); }} />
  );

  if (selectedPG) return (
    <PGDetail pg={selectedPG} onBack={() => setSelectedPG(null)} onBook={pg => { setSelectedPG(null); setBookingPG(pg); }} />
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        padding: "48px 16px 20px", color: "#fff"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={LOGO_URL} alt="Kailnest" style={{ width: 36, height: 36, objectFit: "contain" }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: -0.5, color: "#fff" }}>Kailnest</div>
              <div style={{ fontSize: 10, opacity: 0.8 }}>PG · Hotels · Apartments · Houses</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#c7d2fe" }}>👤 {user?.name}</div>
            <div style={{ fontSize: 11, color: "#a5b4fc", marginTop: 2, textTransform: "capitalize" }}>{user?.role}</div>
          </div>
        </div>

        {/* City selector pill */}
        <div onClick={() => setCitySelected(false)} style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10,
          background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "5px 14px",
          cursor: "pointer", border: "1px solid rgba(255,255,255,0.3)"
        }}>
          <span style={{ fontSize: 14 }}>📍</span>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{selectedCity}</span>
          <span style={{ color: "#c7d2fe", fontSize: 11 }}>▼</span>
        </div>

        {tab === "search" && activeCategory && (
          <>
            <div style={{ position: "relative", marginTop: 14 }}>
              <input
                placeholder={`Search ${activeCategory}s by location or name...`}
                value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "12px 40px 12px 14px", borderRadius: 12,
                  border: "none", fontSize: 14, boxSizing: "border-box",
                  background: "rgba(255,255,255,0.95)", outline: "none"
                }}
              />
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
            </div>

            {/* Quick filters — PG only shows Boys/Girls/Co-ed */}
            {activeCategory === "PG" && (
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {["All", "Boys", "Girls", "Co-ed"].map(t => (
                  <button key={t} onClick={() => setFilterType(t)} style={{
                    background: filterType === t ? "#fff" : "rgba(255,255,255,0.2)",
                    color: filterType === t ? "#6366f1" : "#fff",
                    border: "none", borderRadius: 20, padding: "5px 14px",
                    fontSize: 13, fontWeight: 600, cursor: "pointer"
                  }}>{t}</button>
                ))}
              </div>
            )}

            {showFilters && (
              <div style={{ marginTop: 10, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 12, color: "#fff", marginBottom: 4 }}>
                  Max Rent: ₹{maxPrice.toLocaleString()}
                </div>
                <input type="range" min={500} max={50000} step={500} value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  style={{ width: "100%" }} />
              </div>
            )}
            <button onClick={() => setShowFilters(!showFilters)} style={{
              background: "rgba(255,255,255,0.2)", color: "#fff", border: "none",
              borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 600,
              cursor: "pointer", marginTop: 8
            }}>⚙️ Filters</button>
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 80px" }}>
        {tab === "search" && (
          <>
            {/* HOME SCREEN — Category Cards */}
            {!activeCategory ? (
              <>
                <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>నమస్కారం 🙏</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>ఏ రకమైన accommodation కావాలి?</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                  {CATEGORIES.map(cat => (
                    <div key={cat.key} onClick={() => { setActiveCategory(cat.key); setFilterType("All"); setSearch(""); }} style={{
                      background: cat.bg, borderRadius: 16, padding: 18, cursor: "pointer",
                      border: `1.5px solid ${cat.color}22`, textAlign: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                    }}>
                      <div style={{ fontSize: 40, marginBottom: 8 }}>{cat.icon}</div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: cat.color }}>{cat.label}</div>
                      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>{cat.desc}</div>
                      <div style={{ marginTop: 8, background: cat.color, color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, display: "inline-block" }}>
                        {ALL_LISTINGS[cat.key].length} listings →
                      </div>
                    </div>
                  ))}
                </div>

                {/* Featured across all categories */}
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>⭐ Featured Listings</div>
                {[...PGS, ...HOTELS, ...APARTMENTS, ...HOUSES].filter(l => l.featured).map(l => (
                  <PGCard key={l.id} pg={l} onView={setSelectedPG} onBook={setBookingPG} isWishlisted={wishlist.includes(l.id)} onWishlist={toggleWishlist} isWishlisted={wishlist.includes(pg.id)} onWishlist={toggleWishlist} />
                ))}
              </>
            ) : (
              <>
                {/* CATEGORY LISTING SCREEN */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <button onClick={() => setActiveCategory(null)} style={{
                    background: "#f3f4f6", border: "none", borderRadius: 8,
                    padding: "6px 12px", fontSize: 13, cursor: "pointer", fontWeight: 600
                  }}>← Back</button>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>
                    {CATEGORIES.find(c => c.key === activeCategory)?.icon} {CATEGORIES.find(c => c.key === activeCategory)?.label}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>{sortedFiltered.length} listings found</div>
                  <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 600 }}>📢 Ads first</div>
                </div>

                {/* Filter chips */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {(activeCategory === "House" || activeCategory === "Apartment") &&
                    ["All", "Boys", "Girls", "Co-ed"].map(g => (
                      <button key={g} onClick={() => setFilterGender(g)} style={{
                        background: filterGender === g ? "#6366f1" : "#f3f4f6",
                        color: filterGender === g ? "#fff" : "#374151",
                        border: "none", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer"
                      }}>{g === "Girls" ? "👩" : g === "Boys" ? "👨" : ""} {g}</button>
                    ))
                  }
                  {["All", "AC ❄️", "Non-AC 🌀"].map(a => (
                    <button key={a} onClick={() => setFilterAC(a.split(" ")[0])} style={{
                      background: filterAC === a.split(" ")[0] ? "#0891b2" : "#f3f4f6",
                      color: filterAC === a.split(" ")[0] ? "#fff" : "#374151",
                      border: "none", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer"
                    }}>{a}</button>
                  ))}
                  {["All", "Furnished 🛋️", "Unfurnished"].map(f => (
                    <button key={f} onClick={() => setFilterFurnished(f.split(" ")[0])} style={{
                      background: filterFurnished === f.split(" ")[0] ? "#059669" : "#f3f4f6",
                      color: filterFurnished === f.split(" ")[0] ? "#fff" : "#374151",
                      border: "none", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer"
                    }}>{f}</button>
                  ))}
                </div>

                {filtered.length === 0 ? (
                  <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>
                    <div style={{ fontSize: 48 }}>{CATEGORIES.find(c => c.key === activeCategory)?.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>No listings found</div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>Try different filters</div>
                  </div>
                ) : (
                  sortedFiltered.map(pg => (
                    <PGCard key={pg.id} pg={pg} onView={setSelectedPG} onBook={setBookingPG} isWishlisted={wishlist.includes(pg.id)} onWishlist={toggleWishlist} />
                  ))
                )}
              </>
            )}
          </>
        )}

        {tab === "bookings" && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>My Bookings</div>

            {bookings.length === 0 && (
              <div style={{ background: "#f0f0ff", borderRadius: 12, padding: 12, marginBottom: 14, border: "1px dashed #6366f1", fontSize: 13, color: "#4338ca" }}>
                💡 Book a PG first to see it here. Or add demo booking below:
                <button onClick={() => setBookings([PGS[0]])} style={{ display: "block", marginTop: 8, background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Add Demo Booking</button>
              </div>
            )}

            {bookings.length === 0 ? (
              <div style={{ textAlign: "center", padding: 30, color: "#9ca3af" }}>
                <div style={{ fontSize: 48 }}>📋</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>No bookings yet</div>
                <button onClick={() => setTab("search")} style={{ marginTop: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 12, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Find a PG</button>
              </div>
            ) : (
              bookings.map((b, i) => {
                const isVacated = vacatedBookings.includes(b.id);
                return (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 14, marginBottom: 14, border: isVacated ? "1.5px solid #fca5a5" : "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{b.name}</div>
                        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>📍 {b.location}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>👤 {b.owner} · 📞 {b.phone}</div>
                      </div>
                      <div style={{ background: isVacated ? "#fef2f2" : "#f0fdf4", color: isVacated ? "#dc2626" : "#16a34a", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, border: `1px solid ${isVacated ? "#fecaca" : "#bbf7d0"}` }}>
                        {isVacated ? "🚪 Notice Sent" : "✅ Active"}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 12, marginTop: 10, background: "#f9fafb", borderRadius: 10, padding: "8px 12px" }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: "#6366f1" }}>₹{b.price?.toLocaleString()}</div>
                        <div style={{ fontSize: 10, color: "#9ca3af" }}>Rent/mo</div>
                      </div>
                      <div style={{ width: 1, background: "#e5e7eb" }} />
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: "#374151" }}>₹{b.deposit?.toLocaleString()}</div>
                        <div style={{ fontSize: 10, color: "#9ca3af" }}>Deposit</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <a href={`tel:${b.phone}`} style={{ flex: 1, textAlign: "center", padding: "9px", background: "#f0fdf4", color: "#16a34a", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none", border: "1px solid #bbf7d0" }}>📞 Call</a>
                      <button onClick={() => setComplaintBooking(b)} style={{ flex: 1, padding: "9px", background: "#fff", color: "#dc2626", border: "1.5px solid #fecaca", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>📢 Complaint</button>
                      {!isVacated && (
                        <button onClick={() => setVacationBooking(b)} style={{ flex: 1, padding: "9px", background: "linear-gradient(135deg, #f59e0b, #ef4444)", color: "#fff", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>🏃 Vacate</button>
                      )}
                    </div>

                    {/* Payment status */}
                    {b.cashStatus === "pending" && (
                      <div style={{ marginTop: 10, background: "#fffbeb", borderRadius: 10, padding: "10px 12px", border: "1px solid #fde68a" }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: "#92400e", marginBottom: 6 }}>💵 Cash Payment Pending</div>
                        <div style={{ fontSize: 11, color: "#78350f", marginBottom: 8 }}>Owner కి cash ఇచ్చారా? Confirm చేయండి.</div>
                        <button onClick={() => {
                          setBookings(prev => prev.map((bk, idx) => idx === i ? { ...bk, cashStatus: "tenant_confirmed" } : bk));
                          setOwnerNotifications(prev => [...prev, {
                            id: Date.now(),
                            type: "cash_confirmed",
                            pgName: b.name,
                            message: `✅ Tenant cash payment confirm చేశారు — ${b.name}. Please verify and acknowledge.`,
                            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                            read: false,
                          }]);
                        }} style={{
                          width: "100%", padding: "8px", background: "linear-gradient(135deg, #f59e0b, #d97706)",
                          color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer"
                        }}>💵 Cash Pay చేశాను — Confirm</button>
                      </div>
                    )}

                    {b.cashStatus === "tenant_confirmed" && (
                      <div style={{ marginTop: 10, background: "#fef9c3", borderRadius: 10, padding: "8px 12px", border: "1px solid #fde68a" }}>
                        <div style={{ fontSize: 12, color: "#854d0e", fontWeight: 700 }}>⏳ Cash confirmed by you — Owner verification pending</div>
                      </div>
                    )}

                    {b.cashStatus === "owner_verified" && (
                      <div style={{ marginTop: 10, background: "#f0fdf4", borderRadius: 10, padding: "8px 12px", border: "1px solid #bbf7d0" }}>
                        <div style={{ fontSize: 12, color: "#166534", fontWeight: 700 }}>✅ Cash Payment Complete — Owner verified!</div>
                      </div>
                    )}

                    {b.cashStatus === "online_paid" && (
                      <div style={{ marginTop: 10, background: "#f0fdf4", borderRadius: 10, padding: "8px 12px", border: "1px solid #bbf7d0" }}>
                        <div style={{ fontSize: 12, color: "#166534", fontWeight: 700 }}>✅ Online Payment Complete</div>
                      </div>
                    )}
                    {complaints.filter(c => c.pgId === b.id && c.status === "open").length > 0 && (
                      <div style={{ marginTop: 10, background: "#fef2f2", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#991b1b", border: "1px solid #fecaca" }}>
                        📢 {complaints.filter(c => c.pgId === b.id && c.status === "open").length} complaint(s) pending with owner
                      </div>
                    )}

                    {isVacated && (
                      <div style={{ marginTop: 10, background: "#fffbeb", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#92400e", border: "1px solid #fde68a" }}>
                        ⏳ Owner notified. Deposit refund process pending.
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </>
        )}

        {/* Wishlist Tab */}
        {tab === "wishlist" && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>❤️ Saved Listings</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>{wishlist.length} saved</div>
            {wishlist.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>
                <div style={{ fontSize: 48 }}>🤍</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>No saved listings yet</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>PG/Hotel card మీద ❤️ నొక్కి save చేయి</div>
                <button onClick={() => setTab("search")} style={{
                  marginTop: 14, background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff", border: "none", borderRadius: 12, padding: "10px 24px",
                  fontSize: 14, fontWeight: 700, cursor: "pointer"
                }}>Browse Listings</button>
              </div>
            ) : (
              [...PGS, ...EXTRA_PGS, ...HOTELS, ...EXTRA_HOTELS, ...APARTMENTS, ...EXTRA_APARTMENTS, ...HOUSES, ...EXTRA_HOUSES]
                .filter(pg => wishlist.includes(pg.id))
                .map(pg => (
                  <PGCard key={pg.id} pg={pg} onView={setSelectedPG} onBook={setBookingPG}
                    isWishlisted={true} onWishlist={toggleWishlist} />
                ))
            )}
          </>
        )}

        {tab === "owner" && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>Owner Portal</div>
            <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>List and manage your PGs</div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Total Listings", value: "2", icon: "🏠" },
                { label: "Active Tenants", value: "14", icon: "👥" },
                { label: "Enquiries", value: "8", icon: "📞" },
                { label: "Revenue", value: "₹63K", icon: "💰" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "#fff", borderRadius: 12, padding: 14,
                  border: "1px solid #f3f4f6", textAlign: "center"
                }}>
                  <div style={{ fontSize: 24 }}>{s.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "#6366f1" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setShowSubscription(true)} style={{
              width: "100%", padding: "14px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", border: "none", borderRadius: 14, fontSize: 15,
              fontWeight: 700, cursor: "pointer", marginBottom: 10
            }}>➕ Add New PG Listing</button>

            <button onClick={() => setShowMediaUpload(true)} style={{
              width: "100%", padding: "14px",
              background: "#fff", color: "#6366f1", border: "2px solid #6366f1", borderRadius: 14, fontSize: 15,
              fontWeight: 700, cursor: "pointer", marginBottom: 10
            }}>📸 Add Photos & Video to Listing</button>

            {/* Owner Notifications */}
            {ownerNotifications.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                  <span>🔔 Notifications ({ownerNotifications.filter(n => !n.read).length} new)</span>
                  <span onClick={() => setOwnerNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                    style={{ fontSize: 12, color: "#6366f1", cursor: "pointer", fontWeight: 600 }}>All read</span>
                </div>
                {ownerNotifications.slice().reverse().map(n => (
                  <div key={n.id} onClick={() => setOwnerNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))} style={{
                    background: n.read ? "#f9fafb" : "#eff6ff",
                    borderRadius: 12, padding: "12px 14px", marginBottom: 8, cursor: "pointer",
                    border: n.read ? "1px solid #f3f4f6" : "1.5px solid #bfdbfe"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ fontSize: 20 }}>
                        {n.type === "cash_pending" ? "💵" : n.type === "cash_confirmed" ? "✅" : "💳"}
                      </div>
                      <div style={{ fontSize: 10, color: "#9ca3af" }}>{n.time}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#111", marginTop: 4 }}>{n.pgName}</div>
                    <div style={{ fontSize: 12, color: "#374151", marginTop: 3, lineHeight: 1.5 }}>{n.message}</div>
                    {n.type === "cash_confirmed" && (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setBookings(prev => prev.map(b => b.name === n.pgName ? { ...b, cashStatus: "owner_verified" } : b));
                        setOwnerNotifications(prev => prev.map(x => x.id === n.id ? { ...x, type: "done", read: true, message: "✅ Cash verified by you!" } : x));
                      }} style={{
                        marginTop: 8, width: "100%", padding: "7px",
                        background: "linear-gradient(135deg, #16a34a, #15803d)",
                        color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer"
                      }}>✅ Cash Received — Verify</button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => setShowOwnerComplaints(true)} style={{
              width: "100%", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "#fff", color: "#dc2626", border: "2px solid #fecaca", borderRadius: 14, fontSize: 15,
              fontWeight: 700, cursor: "pointer", marginBottom: 10
            }}>
              📢 My PG Complaints
              {complaints.filter(c => c.ownerId === CURRENT_OWNER_ID && c.status === "open").length > 0 && (
                <span style={{ background: "#dc2626", color: "#fff", borderRadius: 20, padding: "2px 9px", fontSize: 12 }}>
                  {complaints.filter(c => c.ownerId === CURRENT_OWNER_ID && c.status === "open").length}
                </span>
              )}
            </button>

            <div style={{ background: "#fffbeb", borderRadius: 12, padding: 14, border: "1px solid #fde68a" }}>
              <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 4 }}>📢 Subscription Active</div>
              <div style={{ fontSize: 13, color: "#78350f" }}>Pro Plan · Expires Dec 2025 · 2/5 listings used</div>
            </div>
          </>
        )}

        {tab === "profile" && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Profile</div>
            <div style={{ background: "#fff", borderRadius: 14, padding: 20, textAlign: "center", marginBottom: 16 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 12px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, color: "#fff", fontWeight: 800
              }}>{user?.name?.[0]?.toUpperCase() || "U"}</div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{user?.name}</div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>📞 +91 {user?.phone}</div>
              <div style={{
                display: "inline-block", marginTop: 6, background: user?.role === "owner" ? "#fef3c7" : "#eff6ff",
                color: user?.role === "owner" ? "#92400e" : "#1d4ed8",
                borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700
              }}>{user?.role === "owner" ? "🏠 Owner" : "🏃 Tenant"}</div>
            </div>

            {/* Owner UPI card */}
            {user?.role === "owner" && (
              <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 16, border: "1.5px solid #bbf7d0" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#166534", marginBottom: 10 }}>💳 Payment Details</div>
                {user?.upiId ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>📱</span>
                    <div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>UPI ID</div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{user.upiId}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>UPI ID add చేయలేదు — logout చేసి signup లో add చేయండి</div>
                )}
                {user?.qrPreview && (
                  <div style={{ marginTop: 10, textAlign: "center" }}>
                    <img src={user.qrPreview} alt="QR" style={{ width: 100, height: 100, borderRadius: 10, border: "2px solid #16a34a" }} />
                    <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>✅ QR Code uploaded</div>
                  </div>
                )}
              </div>
            )}
            {[
              { icon: "📋", label: "My Bookings" },
              { icon: "❤️", label: "Saved PGs" },
              { icon: "🔔", label: "Notifications" },
              { icon: "🏠", label: "List Your PG" },
              { icon: "💳", label: "Payment History" },
              { icon: "⚙️", label: "Settings" },
              { icon: "📋", label: "Terms of Service" },
              { icon: "🔒", label: "Privacy Policy" },
              { icon: "❓", label: "Help & Support" },
              { icon: "🚪", label: "Logout" },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#fff", borderRadius: 12, padding: "14px 16px",
                marginBottom: 8, cursor: "pointer"
              }} onClick={() => {
                if (item.label === "List Your PG") setShowSubscription(true);
                if (item.label === "Help & Support") setShowSupport(true);
                if (item.label === "Terms of Service") setShowTerms("terms");
                if (item.label === "Privacy Policy") setShowTerms("privacy");
                if (item.label === "Logout") { setUser(null); setCitySelected(false); setTab("search"); setActiveCategory(null); }
              }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{item.icon} {item.label}</div>
                <div style={{ color: "#9ca3af" }}>›</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Floating Support Button */}
      <button onClick={() => setShowSupport(true)} style={{
        position: "fixed", bottom: 78, right: "calc(50% - 195px)",
        width: 50, height: 50, borderRadius: "50%",
        background: "linear-gradient(135deg, #25D366, #16a34a)",
        border: "none", color: "#fff", fontSize: 22, cursor: "pointer",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)", zIndex: 50
      }}>🎧</button>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430, background: "#fff",
        borderTop: "1px solid #f3f4f6",
        display: "flex", justifyContent: "space-around", padding: "8px 0 12px"
      }}>
        {[
          { id: "search", icon: "🔍", label: "Search" },
          { id: "bookings", icon: "📋", label: "Bookings" },
          { id: "wishlist", icon: "❤️", label: "Saved", badge: wishlist.length },
          { id: "owner", icon: "🏠", label: "Owner", badge: ownerNotifications.filter(n => !n.read).length },
          { id: "profile", icon: "👤", label: "Profile" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, cursor: "pointer",
            opacity: tab === t.id ? 1 : 0.45, position: "relative"
          }}>
            <span style={{ fontSize: 22, position: "relative" }}>
              {t.icon}
              {t.badge > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -6,
                  background: "#ef4444", color: "#fff", borderRadius: "50%",
                  width: 16, height: 16, fontSize: 9, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{t.badge}</span>
              )}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: tab === t.id ? "#6366f1" : "#9ca3af"
            }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Modals */}
      {bookingPG && (
        <BookingModal pg={bookingPG} onClose={() => setBookingPG(null)}
          ownerUpi={bookingPG?.ownerUpi || ""}
          ownerQr={bookingPG?.ownerQr || null}
          onPay={({ payMethod, cashPaid }) => {
            const newBooking = {
              ...bookingPG,
              payMethod,
              cashStatus: payMethod === "Cash (Pay to Owner)" ? "pending" : "online_paid",
              bookedAt: new Date().toISOString(),
            };
            setBookings([...bookings, newBooking]);
            // Owner notification
            if (payMethod === "Cash (Pay to Owner)") {
              setOwnerNotifications(prev => [...prev, {
                id: Date.now(),
                type: "cash_pending",
                pgName: bookingPG.name,
                message: `New booking! Tenant cash pay చేస్తారు — move-in రోజు collect చేయండి.`,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                read: false,
              }]);
            } else {
              setOwnerNotifications(prev => [...prev, {
                id: Date.now(),
                type: "online_paid",
                pgName: bookingPG.name,
                message: `New booking confirmed! Online payment received via ${payMethod}.`,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                read: false,
              }]);
            }
            setBookingPG(null);
          }} />
      )}
      {showSubscription && <OwnerSubscriptionModal onClose={() => setShowSubscription(false)} />}
      {showSupport && <CustomerSupportModal onClose={() => setShowSupport(false)} />}
      {showTerms && <TermsPrivacyModal type={showTerms} onClose={() => setShowTerms(null)} />}
      {showMediaUpload && (
        <OwnerMediaUploadModal
          onClose={() => setShowMediaUpload(false)}
          onSave={() => {}}
        />
      )}
      {vacationBooking && (
        <VacationNoticeModal
          booking={vacationBooking}
          onClose={() => setVacationBooking(null)}
          onSubmit={(b) => {
            setVacatedBookings([...vacatedBookings, b.id]);
            setVacationBooking(null);
          }}
        />
      )}
      {complaintBooking && (
        <ComplaintModal
          booking={complaintBooking}
          onClose={() => setComplaintBooking(null)}
          onSubmit={(c) => setComplaints([...complaints, c])}
        />
      )}
      {showOwnerComplaints && (
        <OwnerComplaintsView
          complaints={complaints}
          currentOwnerId={CURRENT_OWNER_ID}
          onResolve={(id) => setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: "resolved" } : c))}
          onClose={() => setShowOwnerComplaints(false)}
        />
      )}
    </div>
  );
}

const container = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(container);
reactRoot.render(React.createElement(PGFinderApp));
