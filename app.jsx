const { useState, useEffect, useRef } = React;


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
// ─── Language System ───────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    appTagline: "PG · Hotels · Apartments · Houses",
    login: "Login", signup: "Sign Up",
    fullName: "Full Name", namePlaceholder: "Enter your name",
    iAm: "I am a", tenant: "Tenant", owner: "Owner",
    tenantDesc: "Looking for accommodation", ownerDesc: "List my property",
    phoneNumber: "Phone Number", sendOTP: "Send OTP →", sendingOTP: "Sending OTP...",
    otpSent: "OTP sent to", enterOTP: "Enter 6-digit OTP", verifyOTP: "Verify OTP ✓",
    verifying: "Verifying...", changeNumber: "← Change number",
    welcomeMsg: "Welcome to Kailnest!",
    terms: "By continuing you agree to our", termsLink: "Terms of Service", and: "and", privacyLink: "Privacy Policy",
    paymentDetails: "Payment Details (Optional)",
    paymentDesc: "Add UPI ID or QR code for tenants to pay you directly",
    upiId: "UPI ID", upiPlaceholder: "yourname@upi or yourname@paytm",
    qrUpload: "QR Code Upload (optional)", qrBtn: "GPay/PhonePe QR upload",
    paymentTip: "Tenants can pay you directly via UPI — only platform fee goes to Kailnest",
    selectCity: "Select your city", searchCity: "Search city...",
    topCities: "TOP CITIES", allCities: "ALL CITIES",
    searchPlaceholder: "Search by location, name...",
    listingsFound: "listings found", adsFirst: "📢 Ads first",
    bookNow: "Book Now", details: "Details", full: "Full",
    bedsAvailable: "beds free", noListings: "No listings found",
    tryFilters: "Try different filters", browseListings: "Browse Listings",
    saved: "Saved", search: "Search", bookings: "Bookings", profile: "Profile",
    hello: "Hello 🙏", whatAccommodation: "What type of accommodation do you need?",
    featured: "⭐ Featured Listings",
    callOwner: "📞 Call Owner", complaint: "📢 Complaint", vacate: "🏃 Vacate",
    logout: "Logout",
  },
  te: {
    appTagline: "పీజీ · హోటల్స్ · అపార్ట్‌మెంట్స్ · హౌసెస్",
    login: "లాగిన్", signup: "సైన్ అప్",
    fullName: "పూర్తి పేరు", namePlaceholder: "మీ పేరు enter చేయండి",
    iAm: "నేను", tenant: "అద్దెదారు", owner: "యజమాని",
    tenantDesc: "వసతి కోసం వెతుకుతున్నాను", ownerDesc: "నా property list చేయాలి",
    phoneNumber: "ఫోన్ నంబర్", sendOTP: "OTP పంపు →", sendingOTP: "OTP పంపుతున్నాం...",
    otpSent: "కి OTP పంపబడింది", enterOTP: "6-అంకెల OTP enter చేయండి", verifyOTP: "OTP verify చేయి ✓",
    verifying: "verify చేస్తున్నాం...", changeNumber: "← నంబర్ మార్చు",
    welcomeMsg: "Kailnest కి స్వాగతం!",
    terms: "Continue చేయడం ద్వారా మీరు మా", termsLink: "నిబంధనలకు", and: "మరియు", privacyLink: "గోప్యతా విధానానికి",
    paymentDetails: "చెల్లింపు వివరాలు (ఐచ్ఛికం)",
    paymentDesc: "Tenants మీకు directly pay చేయడానికి UPI ID లేదా QR code add చేయండి",
    upiId: "UPI ID", upiPlaceholder: "yourname@upi లేదా yourname@paytm",
    qrUpload: "QR Code Upload (ఐచ్ఛికం)", qrBtn: "GPay/PhonePe QR upload చేయి",
    paymentTip: "Tenants మీ UPI ID కి directly pay చేయవచ్చు — platform fee మాత్రమే Kailnest కి వెళ్తుంది",
    selectCity: "మీ నగరం select చేయండి", searchCity: "నగరం వెతుకు...",
    topCities: "ముఖ్య నగరాలు", allCities: "అన్ని నగరాలు",
    searchPlaceholder: "location, పేరు వెతుకు...",
    listingsFound: "listings దొరికాయి", adsFirst: "📢 Ads ముందు",
    bookNow: "ఇప్పుడే బుక్ చేయి", details: "వివరాలు", full: "నిండిపోయింది",
    bedsAvailable: "బెడ్స్ ఖాళీ", noListings: "listings దొరకలేదు",
    tryFilters: "వేరే filters try చేయండి", browseListings: "Listings చూడు",
    saved: "సేవ్", search: "వెతుకు", bookings: "బుకింగ్స్", profile: "ప్రొఫైల్",
    hello: "Hello 🙏", whatAccommodation: "మీకు ఏ రకమైన వసతి కావాలి?",
    featured: "⭐ Featured Listings",
    callOwner: "📞 యజమానికి call చేయి", complaint: "📢 ఫిర్యాదు", vacate: "🏃 వదిలేయి",
    logout: "లాగ్అవుట్",
  },
  hi: {
    appTagline: "पीजी · होटल्स · अपार्टमेंट्स · मकान",
    login: "लॉगिन", signup: "साइन अप",
    fullName: "पूरा नाम", namePlaceholder: "अपना नाम दर्ज करें",
    iAm: "मैं हूँ", tenant: "किरायेदार", owner: "मालिक",
    tenantDesc: "आवास की तलाश में", ownerDesc: "अपनी प्रॉपर्टी लिस्ट करें",
    phoneNumber: "फ़ोन नंबर", sendOTP: "OTP भेजें →", sendingOTP: "OTP भेज रहे हैं...",
    otpSent: "को OTP भेजा गया", enterOTP: "6-अंकीय OTP दर्ज करें", verifyOTP: "OTP verify करें ✓",
    verifying: "verify हो रहा है...", changeNumber: "← नंबर बदलें",
    welcomeMsg: "Kailnest में आपका स्वागत है!",
    terms: "जारी रखने पर आप हमारी", termsLink: "शर्तों", and: "और", privacyLink: "गोपनीयता नीति",
    paymentDetails: "भुगतान विवरण (वैकल्पिक)",
    paymentDesc: "किरायेदारों को सीधे भुगतान के लिए UPI ID या QR code जोड़ें",
    upiId: "UPI ID", upiPlaceholder: "yourname@upi या yourname@paytm",
    qrUpload: "QR Code अपलोड (वैकल्पिक)", qrBtn: "GPay/PhonePe QR अपलोड करें",
    paymentTip: "किरायेदार आपके UPI ID पर सीधे भुगतान कर सकते हैं — केवल platform fee Kailnest को जाती है",
    selectCity: "अपना शहर चुनें", searchCity: "शहर खोजें...",
    topCities: "प्रमुख शहर", allCities: "सभी शहर",
    searchPlaceholder: "location, नाम खोजें...",
    listingsFound: "listings मिले", adsFirst: "📢 Ads पहले",
    bookNow: "अभी बुक करें", details: "विवरण", full: "भरा हुआ",
    bedsAvailable: "बेड खाली", noListings: "कोई listing नहीं मिली",
    tryFilters: "अलग filters आज़माएं", browseListings: "Listings देखें",
    saved: "सेव्ड", search: "खोजें", bookings: "बुकिंग्स", profile: "प्रोफाइल",
    hello: "नमस्ते 🙏", whatAccommodation: "आपको किस प्रकार का आवास चाहिए?",
    featured: "⭐ Featured Listings",
    callOwner: "📞 मालिक को call करें", complaint: "📢 शिकायत", vacate: "🏃 खाली करें",
    logout: "लॉगआउट",
  }
};

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
// SHA-256 client-side hashing (used for both user and admin passwords).
async function hashPasswordGlobal(pw) {
  const enc = new TextEncoder().encode(pw);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Notifies the app owner (Rauu) of any admin panel change — logs it to
// Firestore for a permanent record, and opens a pre-filled WhatsApp message
// to the owner's number so it also reaches their phone directly.
// OWNER_WHATSAPP is a dedicated number for admin-panel change alerts
// (separate from the main company support SIM used elsewhere in the app).
const OWNER_WHATSAPP = "917060190899";
async function notifyOwner(action) {
  const timestamp = new Date().toISOString();
  try {
    if (window.db) {
      await window.db.collection("adminActivityLog").add({ action, createdAt: timestamp });
    }
  } catch (e) {
    console.log("Activity log error:", e);
  }
  try {
    const text = encodeURIComponent(`🔔 Kailnest Admin Update:\n${action}\n${new Date(timestamp).toLocaleString("en-IN")}`);
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${text}`, "_blank");
  } catch (e) {
    console.log("WhatsApp notify error:", e);
  }
}

// Shows a foreground browser notification (works while Kailnest is open in
// a tab, even if the user is on a different app tab within the site).
// NOTE: this can't wake a closed/backgrounded app — true background push
// needs a server (Firebase Cloud Functions) to trigger it, which is a
// separate deployment step beyond this client file.
function notifyUser(title, body) {
  try {
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
    new Notification(title, { body, icon: LOGO_URL });
  } catch (e) { console.log("Notification error:", e); }
}

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
const SECURITY_QUESTIONS = [
  "What is your hometown?",
  "What was your first pet's name?",
  "What is your mother's hometown?",
  "Who was your favorite teacher?",
  "What was the name of your first school?",
];

function ForgotPasswordScreen({ onDone, onBack }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [userDoc, setUserDoc] = useState(null);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFindUser = async () => {
    if (phone.length !== 10) return;
    setLoading(true); setError("");
    try {
      const uid = "phone_" + phone;
      const doc = await window.db.collection("users").doc(uid).get();
      if (!doc.exists) {
        setError("No account found with this number.");
        setLoading(false);
        return;
      }
      const data = doc.data();
      if (!data.securityQuestion || !data.securityAnswerHash) {
        setError("Security question not set for this account. Contact support: kailnest5@gmail.com");
        setLoading(false);
        return;
      }
      setUserDoc({ uid, ...data });
      setStep(2);
    } catch (e) {
      setError("Connection issue. Please try again.");
    }
    setLoading(false);
  };

  const handleVerifyAnswer = async () => {
    setLoading(true); setError("");
    try {
      const enteredHash = await hashPasswordGlobal(securityAnswer.trim().toLowerCase());
      if (enteredHash !== userDoc.securityAnswerHash) {
        setError("Answer didn't match. Please try again.");
        setLoading(false);
        return;
      }
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", { size: "invisible" });
      }
      const result = await window.auth.signInWithPhoneNumber("+91" + phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setStep(3);
    } catch (e) {
      console.log("OTP send error:", e);
      setError(`OTP couldn't be sent (${e.code || "error"}): ${e.message || "Please try again."}`);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    setLoading(true); setError("");
    try {
      await confirmationResult.confirm(otp);
      setStep(4);
    } catch (e) {
      setError("Incorrect OTP. Please enter it again.");
    }
    setLoading(false);
  };

  const handleSetNewPassword = async () => {
    if (newPassword.length < 4) { setError("Password must be at least 4 characters."); return; }
    if (newPassword !== confirmNewPassword) { setError("Passwords do not match."); return; }
    setLoading(true); setError("");
    try {
      const newHash = await hashPasswordGlobal(newPassword);
      await window.db.collection("users").doc(userDoc.uid).update({ passwordHash: newHash });
      if (window.auth.currentUser) await window.auth.signOut();
      setStep(5);
      setTimeout(onDone, 1800);
    } catch (e) {
      setError("Couldn't update password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 24, width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

        <div onClick={onBack} style={{ fontSize: 13, color: "#6366f1", fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>← Back to Login</div>

        {step === 1 && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>🔑 Password Reset</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 18 }}>Enter your phone number</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <div style={{ background: "#f3f4f6", borderRadius: 10, padding: "11px 12px", fontSize: 14, fontWeight: 600 }}>🇮🇳 +91</div>
              <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit number" type="tel"
                style={{ flex: 1, padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <button onClick={handleFindUser} disabled={phone.length !== 10 || loading} style={{
              width: "100%", padding: "13px", background: phone.length === 10 ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#d1d5db",
              color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>{loading ? "Searching..." : "Continue →"}</button>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>🔐 Security Question</div>
            <div style={{ fontSize: 13, color: "#374151", marginBottom: 14, fontWeight: 600 }}>{userDoc.securityQuestion}</div>
            <input value={securityAnswer} onChange={e => setSecurityAnswer(e.target.value)}
              placeholder="Your answer"
              style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box", marginBottom: 14 }} />
            <button onClick={handleVerifyAnswer} disabled={!securityAnswer.trim() || loading} style={{
              width: "100%", padding: "13px", background: securityAnswer.trim() ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#d1d5db",
              color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>{loading ? "Verifying..." : "Verify & Send OTP →"}</button>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>📱 Enter OTP</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>6-digit OTP sent to +91 {phone}</div>
            <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="6-digit OTP" type="tel"
              style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 18, letterSpacing: 4, textAlign: "center", boxSizing: "border-box", marginBottom: 14 }} />
            <button onClick={handleVerifyOtp} disabled={otp.length !== 6 || loading} style={{
              width: "100%", padding: "13px", background: otp.length === 6 ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#d1d5db",
              color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>{loading ? "Verifying..." : "Verify OTP ✓"}</button>
          </>
        )}

        {step === 4 && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>🔒 New Password</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>Set your new password</div>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
              placeholder="New password (min 4 characters)"
              style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box", marginBottom: 10 }} />
            <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}
              placeholder="Re-enter password"
              style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box", marginBottom: 14 }} />
            <button onClick={handleSetNewPassword} disabled={loading} style={{
              width: "100%", padding: "13px", background: "linear-gradient(135deg, #16a34a, #15803d)",
              color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>{loading ? "Updating..." : "Reset Password ✓"}</button>
          </>
        )}

        {step === 5 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56 }}>✅</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#16a34a", marginTop: 8 }}>Password Reset Successful!</div>
            <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>Now login with your new password</div>
          </div>
        )}

        {error && (
          <div style={{ marginTop: 12, background: "#fef2f2", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#dc2626", textAlign: "center", border: "1px solid #fecaca" }}>
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Login / Signup Screen ─────────────────────────────────────────────────────
function LoginScreen({ onLogin, lang, setLang }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("tenant");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [qrPreview, setQrPreview] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [securityQ, setSecurityQ] = useState(SECURITY_QUESTIONS[0]);
  const [securityA, setSecurityA] = useState("");
  const [referralCodeInput, setReferralCodeInput] = useState("");
  const [logoTapCount, setLogoTapCount] = useState(0);
  const logoTapTimer = React.useRef(null);

  // Hidden admin access, mobile: tap the logo 5 times within 2 seconds.
  const handleLogoTap = () => {
    setLogoTapCount(prev => {
      const next = prev + 1;
      if (logoTapTimer.current) clearTimeout(logoTapTimer.current);
      if (next >= 5) {
        logoTapTimer.current = null;
        setShowAdminLogin(true);
        return 0;
      }
      logoTapTimer.current = setTimeout(() => setLogoTapCount(0), 2000);
      return next;
    });
  };

  // Hidden admin access, desktop: press Ctrl+Shift+A anywhere on this screen.
  useEffect(() => {
    const handleSecretKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setShowAdminLogin(true);
      }
    };
    window.addEventListener("keydown", handleSecretKey);
    return () => window.removeEventListener("keydown", handleSecretKey);
  }, []);

  if (showAdminLogin) {
    return <AdminLoginScreen onLogin={onLogin} onBack={() => setShowAdminLogin(false)} />;
  }

  if (showForgot) {
    return <ForgotPasswordScreen onBack={() => setShowForgot(false)} onDone={() => setShowForgot(false)} />;
  }

  const handleQRUpload = (e) => {
    const file = e.target.files[0];
    if (file) setQrPreview(URL.createObjectURL(file));
  };

  // Google Sign-in with Firebase
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setAuthError("");
    try {
      if (window.auth) {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        const result = await window.auth.signInWithPopup(provider);
        const gUser = result.user;
        // Security: verify email is from Google
        if (!gUser.email) throw new Error("Google account email not found");
        const userProfile = {
          uid: gUser.uid,
          name: gUser.displayName || gUser.email.split("@")[0],
          email: gUser.email,
          phone: gUser.phoneNumber || "",
          role: role,
          photoURL: gUser.photoURL || "",
          provider: "google",
          status: "active",
          lastLoginAt: new Date().toISOString(),
        };
        // Save/update user profile in Firestore "users" collection
        if (window.db) {
          try {
            const userRef = window.db.collection("users").doc(gUser.uid);
            const existing = await userRef.get();
            if (existing.exists) {
              await userRef.update({
                lastLoginAt: userProfile.lastLoginAt,
                name: userProfile.name,
                photoURL: userProfile.photoURL,
              });
            } else {
              await userRef.set({ ...userProfile, createdAt: new Date().toISOString() });
            }
          } catch (e) { console.log("User profile save error:", e); }
        }
        onLogin({ ...userProfile, upiId: "", qrPreview: null });
      } else {
        // Fallback if Firebase not loaded
        throw new Error("Firebase not initialized");
      }
    } catch (e) {
      console.log("Google sign-in error:", e);
      // Show a real error instead of silently logging the person into a fake
      // "demo" account with a made-up uid — that account had no real
      // Firebase Auth session and no backing Firestore document, so nothing
      // they did (like a ₹199 payment claim) could ever be approved later.
      if (e.code === "auth/popup-closed-by-user") {
        setAuthError("Sign-in cancelled. Try again.");
      } else if (e.code === "auth/unauthorized-domain") {
        setAuthError("This domain isn't authorized for Google Sign-in yet. Please try Phone OTP instead, or contact support.");
      } else {
        setAuthError("Google Sign-in failed. Please check your connection and try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // Simple client-side password hashing (SHA-256 via Web Crypto API).
  // Note: this is a lightweight improvement over plain text for a demo-grade
  // app without a backend — a real production app should hash server-side.
  const hashPassword = async (pw) => {
    const enc = new TextEncoder().encode(pw);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const handleAuth = async () => {
    if (phone.length !== 10) return;
    if (password.length < 4) { setAuthError("Password must be at least 4 characters."); return; }
    if (mode === "signup" && password !== confirmPassword) { setAuthError("Passwords do not match."); return; }
    if (mode === "signup" && securityA.trim().length < 2) { setAuthError("Please enter an answer for the security question."); return; }

    
    setLoading(true);
    setAuthError("");
    try {
      if (!window.db) throw new Error("no-db");
      const uid = "phone_" + phone;
      const passwordHash = await hashPassword(password);
      const userRef = window.db.collection("users").doc(uid);
      const existing = await userRef.get();

      if (mode === "signup") {
        if (existing.exists) {
          setAuthError("This phone number is already registered. Please login instead.");
          setLoading(false);
          return;
        }
        const myReferralCode = "KN" + phone.slice(-6);
        const userProfile = {
          uid, name: name || "User", phone, role,
          status: "active", provider: "phone", passwordHash,
          securityQuestion: securityQ,
securityAnswerHash: await hashPassword(securityA.trim().toLowerCase()),
          upiId: upiId || "", lastLoginAt: new Date().toISOString(), createdAt: new Date().toISOString(),
          referralCode: myReferralCode, referralCount: 0,
        };
        // If they entered someone else's referral code, link the two accounts
        // and credit the referrer — best-effort, doesn't block signup if it fails.
        if (referralCodeInput.trim()) {
          try {
            const refSnap = await window.db.collection("users").where("referralCode", "==", referralCodeInput.trim().toUpperCase()).limit(1).get();
            if (!refSnap.empty) {
              const referrerDoc = refSnap.docs[0];
              userProfile.referredBy = referrerDoc.id;
              await window.db.collection("users").doc(referrerDoc.id).update({
                referralCount: firebase.firestore.FieldValue.increment(1)
              });
            }
          } catch (e) { console.log("Referral link error:", e); }
        }
        await userRef.set(userProfile);
        setLoading(false);
        setStep(3);
        setTimeout(() => onLogin({ ...userProfile, qrPreview }), 1000);
      } else {
        if (!existing.exists) {
          setAuthError("No account found with this phone number. Please sign up.");
          setLoading(false);
          return;
        }
        const data = existing.data();
        if (data.status === "blocked") {
          setAuthError("This account has been blocked. Please contact support.");
          setLoading(false);
          return;
        }
        if (data.passwordHash !== passwordHash) {
          setAuthError("Incorrect password.");
          setLoading(false);
          return;
        }
        await userRef.update({ lastLoginAt: new Date().toISOString() });
        setLoading(false);
        setStep(3);
        setTimeout(() => onLogin({ ...data, uid, qrPreview: null }), 1000);
      }
    } catch (e) {
      console.log("Auth error:", e);
      setLoading(false);
      setAuthError("Couldn't connect right now. Please check your internet and try again.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      {/* Logo */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <img src={LOGO_URL} alt="Kailnest" onClick={handleLogoTap} style={{ width: 140, height: 140, objectFit: "contain", filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.4))", cursor: "pointer" }} />
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
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"
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

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input value={password} onChange={e => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "Create a password (min 4 characters)" : "Enter your password"}
                      type={showPassword ? "text" : "password"}
                      style={{ width: "100%", padding: "11px 40px 11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
                    <button type="button" onClick={() => setShowPassword(s => !s)} style={{
                      position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#9ca3af"
                    }}>{showPassword ? "🙈" : "👁"}</button>
                  </div>{mode === "signup" && (
  <div style={{ marginBottom: 16 }}>
    <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
      🔐 Security Question (used if you forget your password)
    </label>
    <select value={securityQ} onChange={e => setSecurityQ(e.target.value)} style={{
      width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb",
      fontSize: 13, boxSizing: "border-box", marginBottom: 8, background: "#fff"
    }}>
      {SECURITY_QUESTIONS.map(q => <option key={q} value={q}>{q}</option>)}
    </select>
    <input value={securityA} onChange={e => setSecurityA(e.target.value)}
      placeholder="Enter your answer"
      style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
  </div>
)}
                </div>{mode === "login" && (
   <button type="button" onClick={() => setShowForgot(true)} style={{
  display: "block", marginLeft: "auto", textAlign: "right", fontSize: 12,
  color: "#6366f1", fontWeight: 700, cursor: "pointer", marginTop: -8, marginBottom: 14,
  background: "none", border: "none", padding: 0, WebkitTapHighlightColor: "transparent",
  userSelect: "none", WebkitUserSelect: "none"
}}>Forgot Password?</button>)}

                {mode === "signup" && (
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Confirm Password</label>
                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password" type={showPassword ? "text" : "password"}
                      style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                )}

                {mode === "signup" && (
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>🎁 Referral Code (optional)</label>
                    <input value={referralCodeInput} onChange={e => setReferralCodeInput(e.target.value.toUpperCase())}
                      placeholder="Got a code from a friend? Enter it here"
                      style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                )}

                {/* Owner UPI/QR Section */}
                {mode === "signup" && role === "owner" && (
                  <div style={{ background: "#f0fdf4", borderRadius: 14, padding: 14, marginBottom: 16, border: "1.5px solid #bbf7d0" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#166534", marginBottom: 4 }}>💳 Payment Details (Optional)</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>Add UPI ID or QR code so tenants can pay you directly</div>

                    {/* UPI ID */}
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>📱 UPI ID</label>
                      <input value={upiId} onChange={e => setUpiId(e.target.value)}
                        placeholder="yourname@upi or yourname@paytm"
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
                          📷 Upload GPay/PhonePe QR
                          <input type="file" accept="image/*" onChange={handleQRUpload} style={{ display: "none" }} />
                        </label>
                      )}
                    </div>

                    <div style={{ marginTop: 10, background: "#dcfce7", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: "#166534" }}>
                      💡 Tenants can pay directly to your UPI ID — only the platform fee goes to Kailnest
                    </div>
                  </div>
                )}

                <button onClick={handleAuth} disabled={phone.length !== 10 || password.length < 4 || loading} style={{
                  width: "100%", padding: "13px",
                  background: (phone.length === 10 && password.length >= 4) ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#d1d5db",
                  color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
                  cursor: (phone.length === 10 && password.length >= 4) ? "pointer" : "not-allowed"
                }}>{loading ? (mode === "signup" ? "Creating account..." : "Logging in...") : (mode === "signup" ? "Create Account →" : "Login →")}</button>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
                  <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
                  <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>OR</span>
                  <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
                </div>

                {/* Google Sign-in Button */}
                <button onClick={handleGoogleSignIn} disabled={googleLoading} style={{
                  width: "100%", padding: "13px", background: "#fff",
                  border: "1.5px solid #e5e7eb", borderRadius: 12, fontSize: 15, fontWeight: 700,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
                }}>
                  {googleLoading ? (
                    <span style={{ color: "#6b7280" }}>Signing in...</span>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                      <span style={{ color: "#374151" }}>Continue with Google</span>
                    </>
                  )}
                </button>

                {/* Error message */}
                {authError && (
                  <div style={{ marginTop: 10, background: "#fef2f2", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#dc2626", textAlign: "center", border: "1px solid #fecaca" }}>
                    ⚠️ {authError}
                  </div>
                )}
              </>
            )}

            {step === 1 && (
              <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#9ca3af", lineHeight: 1.6 }}>
                By continuing you agree to our{" "}
                <span style={{ color: "#6366f1", fontWeight: 600 }}>Terms of Service</span> and{" "}
                <span style={{ color: "#6366f1", fontWeight: 600 }}>Privacy Policy</span>.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Admin Login Screen ────────────────────────────────────────────────────────
function AdminLoginScreen({ onLogin, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  // The admin's "real" identity now lives in Firebase Authentication (a
  // dedicated Email/Password account), not just a Firestore document.
  // This matters for security: Firestore Rules can check
  // request.auth.token.firebase.sign_in_provider == 'password' to tell a
  // genuine admin session apart from any regular (anonymous) user session,
  // which a Firestore-only password check could never do. The email below
  // is fixed and not secret — the actual secret is the password, typed by
  // a human, never hardcoded here, and verified by Firebase itself.
  const ADMIN_AUTH_EMAIL = "raju@kailnest.in";

  const handleSubmit = async () => {
    setChecking(true);
    setError("");
    try {
      if (!window.auth) { setError("Couldn't connect. Check your connection and try again."); setChecking(false); return; }
      await window.auth.signInWithEmailAndPassword(ADMIN_AUTH_EMAIL, password);
      onLogin({ name: "Admin", role: "admin" });
    } catch (e) {
      console.log("Admin login error:", e);
      setError("Invalid admin credentials");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f2a3a 0%, #173c50 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 24, width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: "#0f2a3a", marginBottom: 4 }}>🔐 Admin Login</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 18 }}>Kailnest internal access only</div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} autoCapitalize="none"
            style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
        </div>
        {error && <div style={{ color: "#dc2626", fontSize: 12, marginBottom: 10, fontWeight: 600 }}>{error}</div>}

        <button onClick={handleSubmit} disabled={checking} style={{
          width: "100%", padding: "13px", background: "linear-gradient(135deg, #0f2a3a, #173c50)",
          color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: checking ? "default" : "pointer", marginTop: 8
        }}>{checking ? "Checking…" : "Login as Admin"}</button>

        <div onClick={onBack} style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#6366f1", cursor: "pointer", fontWeight: 600 }}>← Back to app login</div>
      </div>
    </div>
  );
}

// ─── City Selector (Swiggy style) ─────────────────────────────────────────────
function CitySelectorScreen({ onSelectCity }) {
  const [search, setSearch] = useState("");
  const [customCities, setCustomCities] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (!window.db) return;
        const snap = await window.db.collection("customCities").get();
        setCustomCities(snap.docs.map(d => d.data().name).filter(Boolean));
      } catch (e) { console.log("Custom cities fetch error:", e); }
    })();
  }, []);

  const TOP_CITIES = ["All India", "Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi", "Pune", "Kolkata", "Vijayawada", "Visakhapatnam", "Tirupati", "Kadapa"];
  const ALL_CITIES = ["All India", ...Object.values(INDIA_CITIES).flat(), ...customCities].filter((v, i, a) => a.indexOf(v) === i).sort();
  const filtered = search ? ALL_CITIES.filter(c => c.toLowerCase().includes(search.toLowerCase())) : ALL_CITIES;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", padding: "50px 16px 20px", color: "#fff" }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>🏠 Kailnest</div>
        <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 14 }}>Select your city</div>
        <div style={{ position: "relative" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search city..."
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

// ─── Onboarding Carousel (shown once, first login only) ──────────────────────
function OnboardingCarousel({ onDone }) {
  const [slide, setSlide] = useState(0);
  const SLIDES = [
    { emoji: "🏠", title: "Welcome to Kailnest!", body: "Find PGs, Hotels, Apartments & Houses across India — all in one place." },
    { emoji: "🔍", title: "Browse by Category", body: "Tap PG/Hostel, Hotels, Apartments, or Houses on the home screen to see listings near you." },
    { emoji: "📅", title: "Book Directly", body: "View photos, ratings & amenities, then book instantly with UPI or Cash — no middlemen." },
    { emoji: "📢", title: "Have a Property?", body: "Tap \"Owner\" from the bottom menu to list your PG, hotel, apartment or house for just ₹199." },
  ];
  const isLast = slide === SLIDES.length - 1;
  const s = SLIDES[slide];

  return (
    <div style={{ position: "fixed", inset: 0, background: "linear-gradient(160deg, #1e1b4b 0%, #4338ca 100%)", zIndex: 3000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, fontFamily: "system-ui, sans-serif" }}>
      <button onClick={onDone} style={{ position: "absolute", top: 24, right: 20, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Skip</button>

      <div style={{ fontSize: 72, marginBottom: 20 }}>{s.emoji}</div>
      <div style={{ color: "#fff", fontWeight: 800, fontSize: 22, textAlign: "center", marginBottom: 12 }}>{s.title}</div>
      <div style={{ color: "#c7d2fe", fontSize: 15, textAlign: "center", lineHeight: 1.6, maxWidth: 320 }}>{s.body}</div>

      <div style={{ display: "flex", gap: 8, marginTop: 36, marginBottom: 28 }}>
        {SLIDES.map((_, i) => (
          <div key={i} style={{ width: i === slide ? 22 : 8, height: 8, borderRadius: 4, background: i === slide ? "#fff" : "rgba(255,255,255,0.35)", transition: "width 0.2s" }} />
        ))}
      </div>

      <button
        onClick={() => isLast ? onDone() : setSlide(s => s + 1)}
        style={{ width: "100%", maxWidth: 320, padding: "14px", background: "#fff", color: "#4338ca", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: "pointer" }}
      >{isLast ? "Get Started →" : "Next →"}</button>
    </div>
  );
}

// ─── Home Screen Tooltips (shown once, points at city selector + categories) ──
function HomeTooltipOverlay({ onDone }) {
  const [step, setStep] = useState(0);
  const STEPS = [
    { top: 132, text: "Tap here to change your city anytime", arrow: "up" },
    { top: 560, text: "Tap a category to browse listings near you", arrow: "up" },
  ];
  const isLast = step === STEPS.length - 1;
  const cur = STEPS[step];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2500, background: "rgba(0,0,0,0.55)" }} onClick={() => isLast ? onDone() : setStep(s => s + 1)}>
      <div style={{
        position: "absolute", top: cur.top, left: 16, right: 16,
        background: "#111827", color: "#fff", borderRadius: 12, padding: "12px 16px",
        fontSize: 13, fontWeight: 600, boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
      }}>
        {cur.text}
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6, fontWeight: 500 }}>
          {step + 1} / {STEPS.length} · Tap anywhere to {isLast ? "finish" : "continue"}
        </div>
      </div>
    </div>
  );
}


// Shows admin announcements (sent via the admin "Send to All Users" panel)
// to tenants/owners — previously these were only ever visible to admins.
function BroadcastsModal({ onClose }) {
  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!window.db) { setLoadError(true); setLoading(false); return; }
        const snap = await window.db.collection("broadcasts").get();
        if (cancelled) return;
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setBroadcasts(data);
      } catch (e) {
        console.log("Broadcasts load error:", e);
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 2000, display: "flex", alignItems: "flex-end" }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", width: "100%", maxHeight: "80vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "22px 22px 0 0", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>🔔 Notifications</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontWeight: 600 }}>✕ Close</button>
        </div>
        <div style={{ overflowY: "auto", padding: 16, flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>Loading…</div>
          ) : loadError ? (
            <div style={{ textAlign: "center", padding: 30, color: "#dc2626", fontSize: 13 }}>⚠️ Couldn't load notifications. Check your internet.</div>
          ) : broadcasts.length === 0 ? (
            <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>No announcements yet.</div>
          ) : (
            broadcasts.map(b => (
              <div key={b.id} style={{ background: "#f9fafb", borderRadius: 12, padding: 14, marginBottom: 10 }}>
                <div style={{ fontSize: 13.5, color: "#111", lineHeight: 1.5 }}>{b.message}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>{b.createdAt ? new Date(b.createdAt).toLocaleString("en-IN") : ""}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

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
                { title: "1. Acceptance", body: "By using Kailnest (kailnest.in), you agree to these Terms. If you do not agree, please do not use the app." },
                { title: "2. Our Services", body: "Kailnest is a platform for booking PGs, Hotels, Apartments, and Houses. We are only an intermediary and are not directly responsible for the owner-tenant relationship." },
                { title: "3. User Responsibilities", body: "• Provide accurate information\n• Do not post fake listings or reviews\n• Only one account per person\n• Do not attempt payment fraud" },
                { title: "4. Bookings & Payments", body: "Once a booking is confirmed, the refund policy applies to cancellations. The platform fee (₹199) is non-refundable. The deposit is settled directly between owner and tenant." },
                { title: "5. Owner Responsibilities", body: "PG/property owners must provide accurate details, real photos, and correct pricing. Posting fake listings will result in a permanent account ban." },
                { title: "6. Complaint Resolution", body: "Issues can be raised through the Kailnest complaint system. A response is guaranteed within 48 hours. Unresolved complaints will be escalated." },
                { title: "7. Limitation of Liability", body: "Kailnest is not liable for owner-tenant disputes. Physical property condition and safety issues are the owner responsibility." },
                { title: "8. Changes to Terms", body: "You will be notified in the app when Terms change. Continued use means acceptance." },
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
                { title: "1. Information We Collect", body: "• Phone number (for login)\n• Name, address (for booking)\n• Property details (for owners)\n• Payment transaction IDs\n• App usage data (analytics)" },
                { title: "2. How We Use It", body: "• To send booking confirmations\n• To provide customer support\n• To improve the app\n• To prevent fraud\n• To comply with legal requirements" },
                { title: "3. Data Sharing", body: "We do not sell your data to third parties. Minimal information is shared for owner-tenant bookings. We provide data to government authorities only if legally required." },
                { title: "4. Data Security", body: "We use Firebase encryption. Payment data is processed through PCI-DSS compliant processors. We never see your OTP or password." },
                { title: "5. Your Rights", body: "• You can access your data\n• You can request data deletion\n• You can deactivate your account\nEmail: kailnest5@gmail.com" },
                { title: "6. Cookies", body: "The app uses minimal cookies, only for session management. Anonymized data is used for analytics." },
                { title: "7. Contact Us", body: "For privacy concerns:\n📧 kailnest5@gmail.com\n🌐 kailnest.in" },
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
        {pg.roommateWanted && (
          <div style={{
            position: "absolute", bottom: 10, left: pg.videoUrl ? 90 : 10,
            background: "#7c3aed", color: "#fff", borderRadius: 20,
            padding: "2px 10px", fontSize: 11, fontWeight: 700
          }}>🧑‍🤝‍🧑 Roommate wanted</div>
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

function PGDetail({ pg, user, onBack, onBook, onChat }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryStart, setGalleryStart] = useState(0);
  const photoUrls = pg.photoUrls || [];

  // Schedule a Visit — lets a tenant request an in-person viewing slot without
  // committing to a booking yet. Saved to Firestore so the owner can see it,
  // and a WhatsApp nudge is sent to the owner immediately.
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [submittingVisit, setSubmittingVisit] = useState(false);
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const minVisitDate = new Date().toISOString().split("T")[0];

  const submitVisitRequest = async () => {
    if (!visitDate || !visitTime) return;
    setSubmittingVisit(true);
    try {
      if (window.db) {
        await window.db.collection("visitRequests").add({
          pgId: String(pg.id), pgName: pg.name,
          ownerPhone: pg.phone || pg.ownerPhone || "",
          tenantUid: user?.uid || null, tenantName: user?.name || "A tenant", tenantPhone: user?.phone || "",
          visitDate, visitTime, status: "pending", requestedAt: new Date().toISOString(),
        });
      }
      const ownerPhone = pg.phone || pg.ownerPhone;
      if (ownerPhone) {
        const msg = encodeURIComponent(`Hi! ${user?.name || "A tenant"} (via Kailnest) wants to visit "${pg.name}" on ${visitDate} at ${visitTime}. Please confirm if that works for you.`);
        window.open(`https://wa.me/91${ownerPhone}?text=${msg}`, "_blank");
      }
    } catch (e) { console.log("Visit request error:", e); }
    setSubmittingVisit(false);
    setVisitSubmitted(true);
  };

  // Reviews (real, Firestore-backed — falls back to the PG's built-in mock
  // rating/count until real reviews come in, so cards never show "0 reviews"
  // for demo listings that haven't been reviewed yet).
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [myRating, setMyRating] = useState(5);
  const [myComment, setMyComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const isLiveListing = typeof pg.id === "string";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!window.db) { setReviewsLoaded(true); return; }
        const snap = await window.db.collection("reviews").where("pgId", "==", String(pg.id)).get();
        if (cancelled) return;
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReviews(list);
      } catch (e) {
        console.log("Reviews load error:", e);
      } finally {
        if (!cancelled) setReviewsLoaded(true);
      }
    })();
    // Count a view for real (owner-created) listings only — mock demo
    // listings don't have a Firestore doc to increment.
    if (isLiveListing && window.db) {
      window.db.collection("listings").doc(pg.id).update({
        views: firebase.firestore.FieldValue.increment(1)
      }).catch(e => console.log("View count error:", e));
    }
    return () => { cancelled = true; };
  }, [pg.id]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
    : (pg.rating || 0);
  const reviewCount = reviews.length || pg.reviews || 0;

  const [contactRequested, setContactRequested] = useState(false);
  const [requestingContact, setRequestingContact] = useState(false);

  // "Request Contact" — instead of showing the owner's raw phone number to
  // every tenant who views the listing, the tenant asks to be contacted.
  // The owner gets a WhatsApp nudge with the tenant's details and decides
  // whether to reach out. This keeps the owner's number off-screen by default.
  const requestContact = async () => {
    if (!user) { alert("Please log in to request the owner's contact."); return; }
    setRequestingContact(true);
    try {
      if (window.db) {
        await window.db.collection("contactRequests").add({
          pgId: String(pg.id), pgName: pg.name,
          ownerPhone: pg.phone || pg.ownerPhone || "",
          tenantUid: user?.uid || null, tenantName: user?.name || "A tenant", tenantPhone: user?.phone || "",
          status: "pending", requestedAt: new Date().toISOString(),
        });
      }
      const ownerPhone = pg.phone || pg.ownerPhone;
      if (ownerPhone) {
        const msg = encodeURIComponent(`Hi! ${user?.name || "A tenant"} (via Kailnest, ${user?.phone ? "+91" + user.phone : "no phone shared"}) is interested in "${pg.name}" and would like you to contact them. Reply here or call them back.`);
        window.open(`https://wa.me/91${ownerPhone}?text=${msg}`, "_blank");
      }
    } catch (e) { console.log("Contact request error:", e); }
    setRequestingContact(false);
    setContactRequested(true);
  };

  const handleSubmitReview = async () => {
    if (!user) { setReviewError("Please log in to write a review."); return; }
    if (myComment.trim().length < 3) { setReviewError("Please write a few words about your experience."); return; }
    setSubmittingReview(true); setReviewError("");
    try {
      if (!window.db) { setReviewError("Not connected. Check your internet."); setSubmittingReview(false); return; }
      const newReview = {
        pgId: String(pg.id), pgName: pg.name,
        userId: user.uid || "", userName: user.name || "Guest",
        rating: myRating, comment: myComment.trim(),
        createdAt: new Date().toISOString(),
      };
      await window.db.collection("reviews").add(newReview);
      setReviews(prev => [{ id: "local_" + Date.now(), ...newReview }, ...prev]);
      setShowReviewForm(false);
      setMyComment(""); setMyRating(5);
    } catch (e) {
      console.log("Review submit error:", e);
      setReviewError("Couldn't submit your review. Please try again.");
    }
    setSubmittingReview(false);
  };

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

        {/* Rating & Reviews */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>⭐ Rating & Reviews</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#6366f1" }}>{avgRating.toFixed(1)}</div>
            <div>
              <StarRating rating={avgRating} />
              <div style={{ fontSize: 12, color: "#6b7280" }}>{reviewCount} review{reviewCount === 1 ? "" : "s"}</div>
            </div>
          </div>

          {reviews.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              {reviews.slice(0, 4).map(r => (
                <div key={r.id} style={{ borderTop: "1px solid #f3f4f6", padding: "10px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{r.userName}</div>
                    <StarRating rating={r.rating} size={12} />
                  </div>
                  <div style={{ fontSize: 13, color: "#374151", marginTop: 4 }}>{r.comment}</div>
                </div>
              ))}
            </div>
          )}

          {!showReviewForm ? (
            <button onClick={() => setShowReviewForm(true)} style={{
              width: "100%", padding: "10px", borderRadius: 10, border: "1.5px solid #6366f1",
              background: "#fff", color: "#6366f1", fontSize: 13, fontWeight: 700, cursor: "pointer"
            }}>✍️ Write a Review</button>
          ) : (
            <div style={{ background: "#f9fafb", borderRadius: 10, padding: 12, marginTop: 4 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 8, justifyContent: "center" }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <span key={n} onClick={() => setMyRating(n)} style={{ fontSize: 24, cursor: "pointer", color: n <= myRating ? "#f59e0b" : "#d1d5db" }}>★</span>
                ))}
              </div>
              <textarea value={myComment} onChange={e => setMyComment(e.target.value)} placeholder="Share your experience..."
                rows={3} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 13, boxSizing: "border-box", resize: "vertical" }} />
              {reviewError && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 6 }}>⚠️ {reviewError}</div>}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={() => setShowReviewForm(false)} style={{ flex: 1, padding: "9px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button onClick={handleSubmitReview} disabled={submittingReview} style={{ flex: 1, padding: "9px", borderRadius: 8, border: "none", background: "#6366f1", color: "#fff", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{submittingReview ? "Posting..." : "Post Review"}</button>
              </div>
            </div>
          )}
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
              <div style={{ color: "#9ca3af", fontSize: 12.5 }}>Contact shared only after you request it</div>
            </div>
          </div>
          {contactRequested ? (
            <div style={{
              display: "block", textAlign: "center", marginTop: 12,
              background: "#f0fdf4", color: "#16a34a", borderRadius: 10,
              padding: "10px", fontSize: 13.5, fontWeight: 700, border: "1px solid #bbf7d0"
            }}>✅ Request sent — the owner may contact you shortly</div>
          ) : (
            <button onClick={requestContact} disabled={requestingContact} style={{
              display: "block", width: "100%", textAlign: "center", marginTop: 12,
              background: requestingContact ? "#d1d5db" : "#f0fdf4", color: requestingContact ? "#6b7280" : "#16a34a",
              borderRadius: 10, padding: "10px", fontSize: 14, fontWeight: 700,
              border: "1px solid #bbf7d0", cursor: requestingContact ? "default" : "pointer"
            }}>{requestingContact ? "Sending..." : "📞 Request Contact"}</button>
          )}
          <button onClick={() => onChat && onChat(pg)} style={{
            display: "block", width: "100%", marginTop: 8,
            background: "#eff6ff", color: "#6366f1", borderRadius: 10,
            padding: "10px", fontSize: 14, fontWeight: 700,
            border: "1px solid #bfdbfe", cursor: "pointer"
          }}>💬 Chat with Owner</button>
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
          <a href={`https://www.google.com/maps/search/${encodeURIComponent(pg.location)}`} target="_blank" rel="noreferrer" style={{
            marginTop: 10, borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb",
            display: "flex", alignItems: "center", gap: 12, padding: 14, textDecoration: "none",
            background: "#f9fafb"
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, background: "#eff6ff",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0
            }}>🗺️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{pg.location}</div>
              <div style={{ fontSize: 11.5, color: "#6366f1", fontWeight: 600, marginTop: 2 }}>📍 View on Google Maps →</div>
            </div>
          </a>
        </div>

        {/* Schedule a Visit */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 16 }}>
          {visitSubmitted ? (
            <div style={{ textAlign: "center", color: "#16a34a", fontWeight: 700, fontSize: 13.5, padding: "6px 0" }}>
              ✅ Visit request sent! The owner has been notified on WhatsApp.
            </div>
          ) : !showVisitForm ? (
            <button onClick={() => setShowVisitForm(true)} style={{
              width: "100%", padding: "12px", background: "#eff6ff", color: "#1d4ed8",
              border: "1.5px solid #bfdbfe", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer"
            }}>📅 Request a Visit (See it in person)</button>
          ) : (
            <>
              <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>📅 Request a Visit</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input type="date" min={minVisitDate} value={visitDate} onChange={e => setVisitDate(e.target.value)} style={{
                  flex: 1, padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13
                }} />
                <input type="time" value={visitTime} onChange={e => setVisitTime(e.target.value)} style={{
                  flex: 1, padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13
                }} />
              </div>
              <button onClick={submitVisitRequest} disabled={!visitDate || !visitTime || submittingVisit} style={{
                width: "100%", padding: "11px",
                background: (!visitDate || !visitTime || submittingVisit) ? "#d1d5db" : "#1d4ed8",
                color: "#fff", border: "none", borderRadius: 10, fontSize: 13.5, fontWeight: 700,
                cursor: (!visitDate || !visitTime || submittingVisit) ? "default" : "pointer"
              }}>{submittingVisit ? "Sending..." : "Confirm Visit Request"}</button>
            </>
          )}
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
                      <div style={{ fontSize: 11, color: "#166534", marginTop: 4 }}>Scan with GPay/PhonePe</div>
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 8 }}>
                    ⚠️ Pay Rent + Deposit directly to the owner. Only the ₹199 platform fee goes to Kailnest.
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
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#92400e", marginBottom: 4 }}>⚠️ About Cash Payment:</div>
                  <div style={{ fontSize: 11, color: "#78350f", lineHeight: 1.6 }}>
                    • Pay cash directly to the owner (on move-in day)<br />
                    • Only the ₹199 platform fee needs to be paid online<br />
                    • Always collect a receipt<br />
                    • Kailnest is not responsible for cash transactions
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
                ? <>💵 <strong>Cash payment</strong> — pay the owner directly on move-in day.<br />Always collect a receipt!</>
                : <>Owner will contact you within 2 hours.</>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Renders a Razorpay Payment Button (embed) inside a <form>. Razorpay's
// checkout.razorpay.com script injects the actual "Pay" button into the form
// once it loads, so we build the <script> tag manually via a ref instead of
// relying on dangerouslySetInnerHTML (which never executes <script> tags).
function RazorpayPaymentButton({ paymentButtonId }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (!formRef.current || !paymentButtonId) return;
    formRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", paymentButtonId);
    script.async = true;
    formRef.current.appendChild(script);
  }, [paymentButtonId]);

  return <form ref={formRef} style={{ textAlign: "center" }}></form>;
}

function OwnerSubscriptionModal({ onClose, onSelectPlan, user }) {
  const RAZORPAY_PAYMENT_BUTTON_ID = "pl_TGdNe2URJufv2D";
  const PRICE = 199;
  const [paid, setPaid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const walletCredits = user?.walletCredits || 0;

  // Referral wallet credits (earned when someone you referred makes their first
  // ₹199 payment) can be redeemed directly to activate a listing plan — no
  // payment needed, no admin verification needed.
  const redeemWithCredit = async () => {
    if (!user?.uid || walletCredits < PRICE) return;
    setRedeeming(true);
    try {
      if (window.db) {
        const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        await window.db.collection("users").doc(user.uid).update({
          ownerPlanActive: true, ownerPlanName: "Basic", planExpiryDate: expiryDate,
          walletCredits: firebase.firestore.FieldValue.increment(-PRICE)
        });
      }
    } catch (e) { console.log("Redeem credit error:", e); }
    setRedeeming(false);
    setPaid(true);
    setTimeout(() => { onClose(); }, 2200);
  };

  // There's no payment gateway wired up yet, so we can't confirm a UPI
  // payment automatically — this logs a claim for the admin to verify
  // against their own UPI app, then approve from the admin Payments tab.
  const handlePaidConfirm = async () => {
    setSubmitting(true);
    try {
      if (window.db) {
        await window.db.collection("paymentClaims").add({
          uid: user?.uid || null,
          name: user?.name || "Owner",
          phone: user?.phone || "",
          amount: PRICE,
          status: "pending",
          claimedAt: new Date().toISOString(),
        });
        notifyOwner(`New ₹199 payment claim from ${user?.name || "an owner"} (${user?.phone || "no phone"}) — needs verification.`);
      }
    } catch (e) { console.log("Payment claim save error:", e); }
    setSubmitting(false);
    setPaid(true);
    setTimeout(() => { onClose(); }, 2200);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", width: "100%", padding: 20, maxHeight: "85vh", overflowY: "auto" }}>

        {paid ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 60 }}>⏳</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#d97706", marginTop: 12 }}>Payment Submitted!</div>
            <div style={{ color: "#6b7280", fontSize: 14, marginTop: 6, lineHeight: 1.6, padding: "0 10px" }}>
              We've noted your ₹199 payment. Our team will verify it shortly and unlock your listing — usually within a few hours.
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
              <div style={{ fontWeight: 900, fontSize: 22, color: "#111" }}>List Your Property</div>
              <div style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>Just ₹199 per listing</div>
            </div>

            {/* Price card */}
            <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 16, padding: 20, marginBottom: 16, color: "#fff", textAlign: "center" }}>
              <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>Per Listing Fee</div>
              <div style={{ fontSize: 48, fontWeight: 900 }}>₹199</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>One-time payment per listing</div>
            </div>

            {/* What you get */}
            <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 14, marginBottom: 16, border: "1px solid #bbf7d0" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#166534", marginBottom: 8 }}>✅ What you get:</div>
              {["1 PG/Hotel/Apartment/House listing", "Photos + Video upload", "Tenant booking requests", "Direct chat with tenants", "Complaint management", "Listing valid for 1 year"].map(f => (
                <div key={f} style={{ fontSize: 13, color: "#15803d", padding: "3px 0" }}>✓ {f}</div>
              ))}
            </div>

            {/* Wallet credit — earned via referrals, redeemable for a free listing */}
            {walletCredits >= PRICE && (
              <div style={{ background: "#fef9c3", borderRadius: 14, padding: 14, border: "1px solid #fde047", marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#854d0e", marginBottom: 8 }}>🎁 You have ₹{walletCredits} wallet credit!</div>
                <button onClick={redeemWithCredit} disabled={redeeming} style={{
                  width: "100%", padding: "12px", background: redeeming ? "#d1d5db" : "#ca8a04",
                  color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: redeeming ? "default" : "pointer"
                }}>{redeeming ? "Activating..." : "Use Credit — Activate Free (₹0)"}</button>
              </div>
            )}

            {/* Razorpay Payment Button — Card / UPI / Netbanking, all in one */}
            <div style={{ background: "#f9fafb", borderRadius: 14, padding: 14, border: "1px solid #e5e7eb", marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: "#111" }}>💳 Pay via Card / UPI / Netbanking</div>
              <RazorpayPaymentButton paymentButtonId={RAZORPAY_PAYMENT_BUTTON_ID} />
            </div>

            {/* Confirm payment */}
            <button onClick={handlePaidConfirm} disabled={submitting} style={{
              width: "100%", padding: "14px",
              background: submitting ? "#d1d5db" : "linear-gradient(135deg, #16a34a, #15803d)",
              color: "#fff", border: "none", borderRadius: 14,
              fontSize: 16, fontWeight: 800, cursor: submitting ? "default" : "pointer", marginBottom: 10
            }}>{submitting ? "Submitting..." : "✅ I have Paid ₹199 — Confirm"}</button>

            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 10, fontSize: 12, color: "#92400e", border: "1px solid #fde68a", marginBottom: 10 }}>
              💡 Tap confirm after making payment. Send a screenshot for verification to: <strong>7842375842</strong> (WhatsApp)
            </div>

            <button onClick={onClose} style={{ width: "100%", padding: "12px", background: "#f3f4f6", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 600 }}>Cancel</button>
          </>
        )}
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
                  If you want to vacate the PG, you must give at least <strong>15 days notice</strong> in advance, so the owner has time to prepare.
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
                "The owner will be notified immediately",
                `The PG will automatically become vacant after ${vacateDate}`,
                "The security deposit refund process will begin",
                "The owner will contact you to settle final dues",
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
              ⚠️ Once this notice is submitted, cancelling it will require owner permission.
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
              The owner has been notified.<br />
              <strong>Vacate Date: {vacateDate}</strong><br />
              The deposit refund process will start soon.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Rent Agreement Generator ─────────────────────────────────────────────────
function RentAgreementModal({ booking, user, onClose }) {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 11);
  const endDateStr = endDate.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

  const printAgreement = () => {
    const content = document.getElementById("rent-agreement-content").innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>Rent Agreement - ${booking?.name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #000; font-size: 14px; line-height: 1.8; }
        h1 { text-align: center; font-size: 20px; text-decoration: underline; }
        h3 { font-size: 15px; margin-top: 20px; }
        .party { background: #f5f5f5; padding: 10px; border-radius: 6px; margin: 10px 0; }
        .clause { margin: 10px 0; }
        .sign-section { display: flex; justify-content: space-between; margin-top: 60px; }
        .sign-box { text-align: center; width: 45%; }
        .sign-line { border-top: 1px solid #000; margin-top: 40px; }
        @media print { body { padding: 20px; } }
      </style>
      </head><body>${content}</body></html>
    `);
    win.document.close();
    win.print();
  };

  const tenantName = user?.name || "Tenant Name";
  const ownerName = booking?.owner || "Owner Name";
  const pgName = booking?.name || "Property Name";
  const location = booking?.location || "Property Address";
  const rent = booking?.price ? `₹${booking.price.toLocaleString()}` : "₹_____";
  const deposit = booking?.deposit ? `₹${booking.deposit.toLocaleString()}` : "₹_____";

  return (
    <div style={{ position: "fixed", inset: 0, background: "#fff", zIndex: 2000, display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b, #4338ca)", padding: "50px 16px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>📄 Rent Agreement</div>
          <div style={{ color: "#c7d2fe", fontSize: 12 }}>{pgName}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={printAgreement} style={{ background: "#fff", color: "#4338ca", border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>🖨️ Print/PDF</button>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontWeight: 600 }}>✕</button>
        </div>
      </div>

      {/* Agreement content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div id="rent-agreement-content">
          <h1 style={{ textAlign: "center", fontSize: 18, textDecoration: "underline", marginBottom: 20 }}>RENT AGREEMENT</h1>

          <p style={{ textAlign: "center", color: "#6b7280", fontSize: 13, marginBottom: 20 }}>This agreement is made on <strong>{today}</strong></p>

          <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>PARTIES INVOLVED:</h3>

          <div style={{ background: "#f9fafb", borderRadius: 10, padding: 14, marginBottom: 12, border: "1px solid #e5e7eb" }}>
            <div style={{ fontWeight: 700, color: "#6366f1", marginBottom: 4 }}>LANDLORD (Owner):</div>
            <div><strong>Name:</strong> {ownerName}</div>
            <div><strong>Phone:</strong> {booking?.phone || "________"}</div>
            <div><strong>Property:</strong> {pgName}</div>
            <div><strong>Address:</strong> {location}</div>
          </div>

          <div style={{ background: "#f9fafb", borderRadius: 10, padding: 14, marginBottom: 16, border: "1px solid #e5e7eb" }}>
            <div style={{ fontWeight: 700, color: "#6366f1", marginBottom: 4 }}>TENANT:</div>
            <div><strong>Name:</strong> {tenantName}</div>
            <div><strong>Phone:</strong> {user?.phone || "________"}</div>
            <div><strong>Email:</strong> {user?.email || "________"}</div>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>TERMS & CONDITIONS:</h3>

          {[
            { no: "1", title: "Rent Amount", text: `Monthly rent is ${rent}, payable on or before 5th of every month.` },
            { no: "2", title: "Security Deposit", text: `A refundable security deposit of ${deposit} has been paid by the Tenant.` },
            { no: "3", title: "Agreement Period", text: `This agreement is valid from ${today} to ${endDateStr} (11 months).` },
            { no: "4", title: "Notice Period", text: `Either party must give minimum 15 days written notice before vacating/terminating this agreement.` },
            { no: "5", title: "Utilities", text: `Electricity, water, and other utility bills shall be paid by the Tenant as per actual usage.` },
            { no: "6", title: "Maintenance", text: `The Tenant shall maintain the property in good condition. Damage caused by the Tenant shall be repaired at Tenant's expense.` },
            { no: "7", title: "Sub-letting", text: `The Tenant shall not sub-let or transfer the property to any other person without written consent of the Landlord.` },
            { no: "8", title: "Rules", text: booking?.conditions || `Tenant must follow all property rules including timing, visitor policies, and community guidelines.` },
            { no: "9", title: "Termination", text: `This agreement can be terminated by mutual consent with proper notice period as mentioned above.` },
            { no: "10", title: "Platform", text: `This booking was facilitated by Kailnest (kailnest.in). For support: kailnest5@gmail.com | 7842375842` },
          ].map(c => (
            <div key={c.no} style={{ marginBottom: 10, padding: "10px 14px", background: "#fafafa", borderRadius: 8, borderLeft: "3px solid #6366f1" }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{c.no}. {c.title}</div>
              <div style={{ fontSize: 13, color: "#374151", marginTop: 3 }}>{c.text}</div>
            </div>
          ))}

          {/* Signatures */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
            <div style={{ textAlign: "center", width: "45%" }}>
              <div style={{ height: 50, borderBottom: "1px solid #111", marginBottom: 8 }} />
              <div style={{ fontWeight: 700, fontSize: 13 }}>{ownerName}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>Landlord Signature</div>
            </div>
            <div style={{ textAlign: "center", width: "45%" }}>
              <div style={{ height: 50, borderBottom: "1px solid #111", marginBottom: 8 }} />
              <div style={{ fontWeight: 700, fontSize: 13 }}>{tenantName}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>Tenant Signature</div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#9ca3af" }}>
            Generated by Kailnest — kailnest.in
          </div>
        </div>
      </div>
    </div>
  );
}


function ChatModal({ pg, user, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "owner", name: pg.owner, text: `Hi! Any questions about ${pg.name}?`, time: "10:00 AM", read: true },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const chatEndRef = React.useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setSending(true);
    const newMsg = {
      id: Date.now(),
      from: "tenant",
      name: user?.name || "You",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setMessages(prev => [...prev, newMsg]);

    // Save to Firebase
    try {
      if (window.db) {
        await window.db.collection("chats")
          .doc(`${pg.id}_${user?.uid || "guest"}`)
          .collection("messages")
          .add({ ...newMsg, createdAt: new Date().toISOString() });
      }
    } catch (e) { console.log("Chat save error:", e); }

    setInput("");
    setSending(false);

    // Auto reply simulation (in real app owner replies manually)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: "owner",
        name: pg.owner,
        text: "Got your message. I will reply soon! 🙏",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: true,
      }]);
    }, 1500);
  };

  const QUICK_MSGS = ["Is a room available?", "Can the price be negotiated?", "Can you show photos?", "Can I visit?"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "#fff", zIndex: 2000, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", padding: "50px 16px 14px", color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16 }}>←</button>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>{pg.owner[0]}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15 }}>{pg.owner}</div>
          <div style={{ fontSize: 11, opacity: 0.85 }}>🏠 {pg.name}</div>
        </div>
        <a href={`tel:${pg.phone}`} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 8, padding: "6px 12px", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>📞</a>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16, background: "#f9fafb" }}>
        {messages.map(m => (
          <div key={m.id} style={{ display: "flex", flexDirection: m.from === "tenant" ? "row-reverse" : "row", marginBottom: 12, gap: 8, alignItems: "flex-end" }}>
            {m.from === "owner" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700, flexShrink: 0 }}>{m.name[0]}</div>
            )}
            <div style={{ maxWidth: "75%" }}>
              <div style={{
                padding: "10px 13px",
                borderRadius: m.from === "tenant" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: m.from === "tenant" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#fff",
                color: m.from === "tenant" ? "#fff" : "#111",
                fontSize: 14, lineHeight: 1.5,
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
              }}>{m.text}</div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 3, textAlign: m.from === "tenant" ? "right" : "left" }}>
                {m.time} {m.from === "tenant" && (m.read ? "✓✓" : "✓")}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Quick messages */}
      <div style={{ padding: "8px 16px 0", background: "#fff", borderTop: "1px solid #f3f4f6" }}>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 6 }}>
          {QUICK_MSGS.map(q => (
            <button key={q} onClick={() => setInput(q)} style={{
              background: "#eff6ff", color: "#4338ca", border: "1px solid #bfdbfe",
              borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
            }}>{q}</button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: "10px 16px 24px", background: "#fff", display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "11px 14px", borderRadius: 24, border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none" }}
        />
        <button onClick={sendMessage} disabled={!input.trim() || sending} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: input.trim() ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#d1d5db",
          border: "none", color: "#fff", fontSize: 18, cursor: input.trim() ? "pointer" : "not-allowed",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>➤</button>
      </div>
    </div>
  );
}


function OwnerListingForm({ onClose, onSave, user }) {
  const [step, setStep] = useState(1); // 1=basic, 2=details, 3=photos, 4=done
  const [form, setForm] = useState({
    name: "", category: "PG", type: "Boys", location: "", city: "",
    nearBy: "", price: "", deposit: "", total: "", description: "",
    amenities: [], conditions: "", ownerUpi: user?.upiId || "", roommateWanted: false,
  });
  const [photos, setPhotos] = useState([]);
  const [saving, setSaving] = useState(false);

  const ALL_AMENITIES = ["WiFi", "AC", "Food", "Laundry", "CCTV", "Parking", "RO Water", "Security Guard", "Power Backup", "Gym", "Study Room", "Housekeeping"];

  const toggleAmenity = (a) => setForm(f => ({
    ...f, amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a]
  }));

  const [saveError, setSaveError] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(false);
    const listing = {
      ...form,
      price: Number(form.price),
      deposit: Number(form.deposit),
      total: Number(form.total),
      available: Number(form.total),
      owner: user?.name || "Owner",
      phone: user?.phone || "",
      ownerId: user?.uid || "",
      views: 0,
      ownerUpi: form.ownerUpi,
      photos: ["🏠"],
      photoUrls: photos.map(p => p.previewUrl),
      rating: 0, reviews: 0,
      verified: false, featured: false,
      category: form.category,
      roommateWanted: !!form.roommateWanted,
    };
    // Save to Firebase
    const id = await FB.saveListing(listing);
    setSaving(false);
    if (!id) {
      // Save actually failed (offline, permissions, etc.) — tell the owner
      // instead of showing a fake success screen, so they know to retry.
      setSaveError(true);
      return;
    }
    setStep(4);
    setTimeout(() => { onSave(listing); onClose(); }, 1500);
  };

  const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box", marginBottom: 12, fontFamily: "inherit" };
  const labelStyle = { fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 4 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "flex-end" }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", width: "100%", maxHeight: "92vh", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "22px 22px 0 0", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>🏠 Add New Listing</div>
            <div style={{ color: "#c7d2fe", fontSize: 12 }}>Step {step} of 3</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontWeight: 600 }}>✕</button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: "#f3f4f6" }}>
          <div style={{ height: "100%", width: `${(step / 3) * 100}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", transition: "width 0.3s" }} />
        </div>

        <div style={{ overflowY: "auto", flex: 1, padding: 20 }}>

          {step === 4 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 60 }}>🎉</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: "#16a34a", marginTop: 12 }}>Listing Added!</div>
              <div style={{ color: "#6b7280", fontSize: 14, marginTop: 6 }}>Your listing has been submitted for review. It will appear in search once approved.</div>
            </div>
          ) : step === 1 ? (
            <>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#111" }}>📋 Basic Details</div>

              <label style={labelStyle}>Property Name *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Sri Sai PG for Boys" style={inputStyle} />

              <label style={labelStyle}>Category *</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                {["PG", "Hotel", "Apartment", "House"].map(c => (
                  <button key={c} onClick={() => setForm({...form, category: c})} style={{
                    padding: "10px", borderRadius: 10, border: form.category === c ? "2px solid #6366f1" : "1.5px solid #e5e7eb",
                    background: form.category === c ? "#eff6ff" : "#f9fafb",
                    color: form.category === c ? "#6366f1" : "#374151", fontWeight: 700, cursor: "pointer", fontSize: 13
                  }}>
                    {c === "PG" ? "🛏️" : c === "Hotel" ? "🏨" : c === "Apartment" ? "🏢" : "🏠"} {c}
                  </button>
                ))}
              </div>

              <label style={labelStyle}>For Whom *</label>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {["Boys", "Girls", "Co-ed", "Family"].map(t => (
                  <button key={t} onClick={() => setForm({...form, type: t})} style={{
                    flex: 1, padding: "8px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                    border: form.type === t ? "2px solid #6366f1" : "1px solid #e5e7eb",
                    background: form.type === t ? "#eff6ff" : "#f9fafb",
                    color: form.type === t ? "#6366f1" : "#374151", cursor: "pointer"
                  }}>{t === "Boys" ? "👨" : t === "Girls" ? "👩" : t === "Co-ed" ? "👥" : "👨‍👩‍👧"} {t}</button>
                ))}
              </div>

              <label style={labelStyle}>Location / Address *</label>
              <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="e.g. Dilsukhnagar, Hyderabad" style={inputStyle} />

              <label style={labelStyle}>City *</label>
              <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="e.g. Hyderabad" style={inputStyle} />

              <label style={labelStyle}>Nearby Landmark</label>
              <input value={form.nearBy} onChange={e => setForm({...form, nearBy: e.target.value})} placeholder="e.g. Osmania University 1km" style={inputStyle} />
            </>
          ) : step === 2 ? (
            <>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#111" }}>💰 Pricing & Amenities</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                <div>
                  <label style={labelStyle}>Rent/month *</label>
                  <input value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="₹5000" type="number" style={{...inputStyle, marginBottom: 0}} />
                </div>
                <div>
                  <label style={labelStyle}>Deposit</label>
                  <input value={form.deposit} onChange={e => setForm({...form, deposit: e.target.value})} placeholder="₹10000" type="number" style={{...inputStyle, marginBottom: 0}} />
                </div>
                <div>
                  <label style={labelStyle}>Total Beds</label>
                  <input value={form.total} onChange={e => setForm({...form, total: e.target.value})} placeholder="10" type="number" style={{...inputStyle, marginBottom: 0}} />
                </div>
              </div>

              <label style={{...labelStyle, marginTop: 12}}>Amenities</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                {ALL_AMENITIES.map(a => (
                  <button key={a} onClick={() => toggleAmenity(a)} style={{
                    padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                    border: form.amenities.includes(a) ? "2px solid #6366f1" : "1px solid #e5e7eb",
                    background: form.amenities.includes(a) ? "#eff6ff" : "#f9fafb",
                    color: form.amenities.includes(a) ? "#6366f1" : "#374151"
                  }}>{a}</button>
                ))}
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }}>
                <input type="checkbox" checked={!!form.roommateWanted} onChange={e => setForm({...form, roommateWanted: e.target.checked})} />
                <span style={{ fontSize: 13, color: "#374151" }}>🧑‍🤝‍🧑 Looking for a roommate to share this space</span>
              </label>

              <label style={labelStyle}>Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                placeholder="Describe your property in detail..." rows={3}
                style={{...inputStyle, resize: "none"}} />

              <label style={labelStyle}>Rules & Conditions</label>
              <textarea value={form.conditions} onChange={e => setForm({...form, conditions: e.target.value})}
                placeholder="e.g. No late entry after 11PM. 2 months notice required." rows={2}
                style={{...inputStyle, resize: "none"}} />

              <label style={labelStyle}>Your UPI ID (for tenant payments)</label>
              <input value={form.ownerUpi} onChange={e => setForm({...form, ownerUpi: e.target.value})}
                placeholder="yourname@ybl" style={inputStyle} />
            </>
          ) : step === 3 ? (
            <>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: "#111" }}>📸 Photos</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Good photos get 3x more enquiries!</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                {photos.map((p, i) => (
                  <div key={i} style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 80 }}>
                    <img src={p.previewUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))} style={{
                      position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.6)",
                      color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, fontSize: 11, cursor: "pointer"
                    }}>✕</button>
                  </div>
                ))}
                {photos.length < 8 && (
                  <label style={{ height: 80, borderRadius: 10, border: "2px dashed #c7d2fe", background: "#f5f3ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6366f1" }}>
                    <span style={{ fontSize: 24 }}>📷</span>
                    <span style={{ fontSize: 10, fontWeight: 700, marginTop: 2 }}>Add</span>
                    <input type="file" accept="image/*" multiple onChange={e => {
                      const files = Array.from(e.target.files).slice(0, 8 - photos.length);
                      setPhotos(prev => [...prev, ...files.map(f => ({ file: f, previewUrl: URL.createObjectURL(f) }))]);
                    }} style={{ display: "none" }} />
                  </label>
                )}
              </div>

              <div style={{ background: "#eff6ff", borderRadius: 12, padding: 12, fontSize: 12, color: "#1e40af" }}>
                📌 First photo = cover photo in search results
              </div>
            </>
          ) : null}
        </div>

        {/* Bottom buttons */}
        {step < 4 && (
          <div style={{ padding: "12px 20px 24px", borderTop: "1px solid #f3f4f6" }}>
            {saveError && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12.5, color: "#dc2626", fontWeight: 600 }}>
                ⚠️ Couldn't submit your listing — check your internet connection and tap Submit again. Nothing was posted yet.
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} style={{ flex: 1, padding: "12px", background: "#f3f4f6", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 600 }}>← Back</button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} disabled={step === 1 && (!form.name || !form.location || !form.city)} style={{
                flex: 2, padding: "12px",
                background: (step === 1 && (!form.name || !form.location || !form.city)) ? "#d1d5db" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 700
              }}>Next →</button>
            ) : (
              <button onClick={handleSave} disabled={saving} style={{
                flex: 2, padding: "12px", background: saving ? "#d1d5db" : "linear-gradient(135deg, #16a34a, #15803d)",
                color: "#fff", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 700
              }}>{saving ? "Saving..." : "✅ Submit Listing"}</button>
            )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


const SUPPORT_NUMBER = "7842375842";
const SUPPORT_WHATSAPP = "7842375842";
const SUPPORT_EMAIL = "kailnest5@gmail.com";

function CustomerSupportModal({ onClose }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "support", text: "Hello! Welcome to Kailnest Support 🙏 How can we help you?", time: "10:00 AM" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const AUTO_REPLIES = {
    "booking": "Please share your booking details, we will help right away! 📋",
    "payment": "If there is a payment issue, please share your transaction ID. We will resolve it within 24 hrs. 💳",
    "refund": "The refund process takes 5-7 working days. Please share your booking ID. 💰",
    "vacate": "Need help with a vacation notice? Use the Vacation Notice button in the Bookings tab. 🏃",
    "owner": "If there is an issue contacting the owner, we will mediate directly. Please share the owner name. 👤",
    "default": "We have noted your query. Our support team will contact you within 30 minutes. 🕐"
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
    { q: "I need to cancel my booking", k: "booking" },
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
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: "#111" }}>Contact us</div>

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
              placeholder="Type your message..."
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
              💡 Tip: Room, bathroom, kitchen, entrance photos + 1 walkthrough video help bookings happen faster.
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

function ComplaintModal({ booking, user, onClose, onSubmit }) {
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = async () => {
    const complaint = {
      id: "C" + Date.now(),
      pgId: booking.id,
      pgName: booking.name,
      ownerId: booking.owner,
      ownerPhone: booking.phone,
      tenantName: user?.name || "Tenant",
      tenantPhone: user?.phone || "",
      category,
      desc,
      status: "open", // open -> resolved
      createdAt: new Date().toISOString(),
      lastReminderAt: new Date().toISOString(),
      reminderCount: 1,
    };
    // Persist to Firestore so it also shows up in the admin's platform-wide
    // Complaints panel. Falls back to a local-only id if Firebase isn't reachable.
    try {
      const savedId = await FB.saveComplaint(complaint);
      if (savedId) complaint.id = savedId;
    } catch (e) { console.log("Complaint save error:", e); }
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
              🔒 This complaint is visible only to your PG owner. No other tenants can see it.
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
                placeholder="Describe in detail... (e.g. No water for 2 days)"
                rows={4}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, boxSizing: "border-box", resize: "none", fontFamily: "inherit" }}
              />
            </div>

            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 10, marginBottom: 16, fontSize: 12, color: "#92400e", border: "1px solid #fde68a" }}>
              🔔 We will send automatic reminders (once every 24 hrs) until the owner replies and marks it "Resolved".
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
            <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>The owner has been notified. We will keep sending reminders until it is resolved.</div>
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
                      <button onClick={() => onResolve(c)} style={{
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

// ─── Admin Dashboard ───────────────────────────────────────────────────────────
// Item 71 of Admin Panel plan: Dashboard.
// Live counts come from Firestore (listings/bookings/complaints added via the
// FB helper elsewhere in this file); falls back gracefully if Firebase isn't
// reachable. Mock catalogue (ALL_LISTINGS) is included in the listings total
// since those are the seeded/demo listings currently shown in the app.
// ─── User Management Panel ─────────────────────────────────────────────────
function UserManagementPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [expandedUid, setExpandedUid] = useState(null);
  const [userActivity, setUserActivity] = useState({});

  const loadUsers = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      if (!window.db) { setLoadError(true); setLoading(false); return; }
      const snap = await window.db.collection("users").get();
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.log("User load error:", e);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const filtered = users.filter(u => {
    const matchSearch = !search ||
      (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.phone || "").includes(search) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const updateUserStatus = async (uid, status) => {
    if (!window.db) return;
    try {
      await window.db.collection("users").doc(uid).update({ status });
      setUsers(prev => prev.map(u => u.id === uid ? { ...u, status } : u));
      notifyOwner(`User ${uid} was ${status === "blocked" ? "blocked" : "unblocked"}.`);
    } catch (e) { console.log("Status update error:", e); alert("Update failed. Try again."); }
  };

  const changeUserRole = async (uid, newRole) => {
    if (!window.db) return;
    try {
      await window.db.collection("users").doc(uid).update({ role: newRole });
      setUsers(prev => prev.map(u => u.id === uid ? { ...u, role: newRole } : u));
      notifyOwner(`User ${uid} role changed to "${newRole}".`);
    } catch (e) { console.log("Role update error:", e); alert("Update failed. Try again."); }
  };

  const deleteUser = async (uid) => {
    if (!window.confirm("Permanently delete this user? This action cannot be undone.")) return;
    if (!window.db) return;
    try {
      await window.db.collection("users").doc(uid).delete();
      setUsers(prev => prev.filter(u => u.id !== uid));
      notifyOwner(`User ${uid} was permanently deleted.`);
    } catch (e) { console.log("Delete error:", e); alert("Delete failed. Try again."); }
  };

  const loadActivity = async (u) => {
    if (userActivity[u.id]) { setExpandedUid(expandedUid === u.id ? null : u.id); return; }
    try {
      const [listingsSnap, bookingsSnap] = await Promise.all([
        window.db.collection("listings").get(),
        window.db.collection("bookings").get(),
      ]);
      const matchListings = listingsSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(l => (l.ownerPhone && l.ownerPhone === u.phone) || (l.ownerEmail && l.ownerEmail === u.email) || (l.ownerName && l.ownerName === u.name));
      const matchBookings = bookingsSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(b => (b.phone && b.phone === u.phone) || (b.email && b.email === u.email) || (b.name && b.name === u.name));
      setUserActivity(prev => ({ ...prev, [u.id]: { listings: matchListings, bookings: matchBookings } }));
      setExpandedUid(u.id);
    } catch (e) {
      console.log("Activity load error:", e);
      setUserActivity(prev => ({ ...prev, [u.id]: { listings: [], bookings: [] } }));
      setExpandedUid(u.id);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      {loadError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#dc2626" }}>
          ⚠️ Could not load users. Please check the Firebase connection.
        </div>
      )}

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search name, phone, or email..."
        style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, marginBottom: 12 }}
      />

      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {["All", "tenant", "owner", "admin"].map(r => (
          <button key={r} onClick={() => setRoleFilter(r)} style={{
            padding: "6px 12px", borderRadius: 20, border: "1px solid #e5e7eb", fontSize: 11.5, fontWeight: 700,
            background: roleFilter === r ? "#0f2a3a" : "#fff", color: roleFilter === r ? "#fff" : "#374151", cursor: "pointer"
          }}>{r === "All" ? "All" : r}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>Loading users…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>No users found.</div>
      ) : (
        filtered.map(u => (
          <div key={u.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", marginBottom: 10, overflow: "hidden" }}>
            <div style={{ padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#4338ca", fontSize: 15, flexShrink: 0 }}>
                {(u.name || "U")[0].toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 13.5, color: "#111" }}>{u.name || "Unnamed"}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{u.phone || u.email || "—"}</div>
                {u.createdAt && (
                  <div style={{ fontSize: 10.5, color: "#b0b7c3", marginTop: 2 }}>
                    Signed up: {new Date(u.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8,
                  background: u.role === "owner" ? "#fef3c7" : u.role === "admin" ? "#ede9fe" : "#dbeafe",
                  color: u.role === "owner" ? "#92400e" : u.role === "admin" ? "#5b21b6" : "#1e40af"
                }}>{u.role || "tenant"}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8,
                  background: u.status === "blocked" ? "#fee2e2" : "#dcfce7",
                  color: u.status === "blocked" ? "#991b1b" : "#166534"
                }}>{u.status === "blocked" ? "blocked" : "active"}</span>
              </div>
            </div>

            <div style={{ display: "flex", borderTop: "1px solid #f3f4f6" }}>
              <button onClick={() => loadActivity(u)} style={{ flex: 1, padding: "9px", fontSize: 11, fontWeight: 700, border: "none", background: "transparent", color: "#4338ca", cursor: "pointer" }}>
                {expandedUid === u.id ? "Hide activity ▲" : "View activity ▼"}
              </button>
              <button
                onClick={() => changeUserRole(u.id, u.role === "owner" ? "tenant" : "owner")}
                style={{ flex: 1, padding: "9px", fontSize: 11, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6", background: "transparent", color: "#0f2a3a", cursor: "pointer" }}
              >Switch role</button>
              <button
                onClick={() => updateUserStatus(u.id, u.status === "blocked" ? "active" : "blocked")}
                style={{ flex: 1, padding: "9px", fontSize: 11, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6", background: "transparent", color: u.status === "blocked" ? "#166534" : "#dc2626", cursor: "pointer" }}
              >{u.status === "blocked" ? "Unblock" : "Block"}</button>
              <button
                onClick={() => deleteUser(u.id)}
                style={{ flex: 1, padding: "9px", fontSize: 11, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6", background: "transparent", color: "#991b1b", cursor: "pointer" }}
              >Delete</button>
            </div>

            {expandedUid === u.id && (
              <div style={{ padding: 12, background: "#f9fafb", borderTop: "1px solid #f3f4f6", fontSize: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6, color: "#374151" }}>🏠 Listings ({(userActivity[u.id]?.listings || []).length})</div>
                {(userActivity[u.id]?.listings || []).length === 0 ? (
                  <div style={{ color: "#9ca3af", marginBottom: 8 }}>None</div>
                ) : userActivity[u.id].listings.map(l => (
                  <div key={l.id} style={{ color: "#374151", marginBottom: 4 }}>• {l.name || l.title || "Listing"} — {l.location || ""}</div>
                ))}
                <div style={{ fontWeight: 700, margin: "10px 0 6px", color: "#374151" }}>📋 Bookings ({(userActivity[u.id]?.bookings || []).length})</div>
                {(userActivity[u.id]?.bookings || []).length === 0 ? (
                  <div style={{ color: "#9ca3af" }}>None</div>
                ) : userActivity[u.id].bookings.map(b => (
                  <div key={b.id} style={{ color: "#374151", marginBottom: 4 }}>• {b.pgName || b.name || "Booking"} — {b.status || ""}</div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// ─── Owner Management Panel ────────────────────────────────────────────────
function OwnerManagementPanel() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedUid, setExpandedUid] = useState(null);
  const [ownerListings, setOwnerListings] = useState({});

  const loadOwners = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      if (!window.db) { setLoadError(true); setLoading(false); return; }
      const snap = await window.db.collection("users").where("role", "==", "owner").get();
      setOwners(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.log("Owner load error:", e);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOwners(); }, []);

  const filtered = owners.filter(o =>
    !search ||
    (o.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (o.phone || "").includes(search) ||
    (o.email || "").toLowerCase().includes(search.toLowerCase())
  );

  // Opens a WhatsApp compose window addressed to the owner with a pre-filled
  // message. This still requires the admin to tap "Send" in WhatsApp — nothing
  // is sent silently in the background — but it removes the need to type the
  // message by hand every time.
  const sendOwnerWhatsApp = (phone, text) => {
    if (!phone) return;
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const toggleVerified = async (owner, verified) => {
    const uid = owner.id;
    if (!window.db) return;
    try {
      await window.db.collection("users").doc(uid).update({
        ownerVerified: verified,
        // Shown to the owner as an in-app banner next time they open Kailnest;
        // cleared automatically once they see it (see verifiedNoticeUnread check in App).
        verifiedNoticeUnread: verified ? true : false,
      });
      setOwners(prev => prev.map(o => o.id === uid ? { ...o, ownerVerified: verified } : o));
      notifyOwner(`Owner ${uid} was ${verified ? "verified" : "unverified"}.`);
      sendOwnerWhatsApp(owner.phone, verified
        ? `Hi ${owner.name || ""}! 🎉 Your Kailnest owner account has been verified. You can now list your property. — Kailnest Team`
        : `Hi ${owner.name || ""}, your Kailnest owner verification has been reset. Please contact support if you have questions. — Kailnest Team`);
    } catch (e) { console.log("Verify update error:", e); alert("Update failed. Try again."); }
  };

  // Opens WhatsApp with a pre-filled message so the admin can personally notify
  // the owner their account is verified. Manual tap — nothing is sent automatically.
  const whatsappVerifiedMsg = (o) => {
    if (!o.phone) { alert("No phone number on file for this owner."); return; }
    sendOwnerWhatsApp(o.phone, `Hi ${o.name || ""}! 🎉 Your Kailnest owner account has been verified. You can now list your property. — Kailnest Team`);
  };

  const updateOwnerStatus = async (owner, status) => {
    const uid = owner.id;
    if (!window.db) return;
    try {
      await window.db.collection("users").doc(uid).update({ status });
      setOwners(prev => prev.map(o => o.id === uid ? { ...o, status } : o));
      notifyOwner(`Owner ${uid} was ${status === "blocked" ? "blocked" : "unblocked"}.`);
      sendOwnerWhatsApp(owner.phone, status === "blocked"
        ? `Hi ${owner.name || ""}, your Kailnest owner account has been blocked. Please contact support (kailnest5@gmail.com) if you believe this is a mistake. — Kailnest Team`
        : `Hi ${owner.name || ""}, your Kailnest owner account has been unblocked and is active again. — Kailnest Team`);
    } catch (e) { console.log("Status update error:", e); alert("Update failed. Try again."); }
  };

  const deleteOwner = async (owner) => {
    const uid = owner.id;
    if (!window.confirm("Permanently delete this owner? This action cannot be undone.")) return;
    if (!window.db) return;
    try {
      await window.db.collection("users").doc(uid).delete();
      setOwners(prev => prev.filter(o => o.id !== uid));
      notifyOwner(`Owner ${uid} was permanently deleted.`);
      sendOwnerWhatsApp(owner.phone, `Hi ${owner.name || ""}, your Kailnest owner account has been permanently deleted. Contact support (kailnest5@gmail.com) if this was unexpected. — Kailnest Team`);
    } catch (e) { console.log("Delete error:", e); alert("Delete failed. Try again."); }
  };

  const loadListings = async (o) => {
    if (ownerListings[o.id]) { setExpandedUid(expandedUid === o.id ? null : o.id); return; }
    try {
      const listingsSnap = await window.db.collection("listings").get();
      const match = listingsSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(l => (l.ownerPhone && l.ownerPhone === o.phone) || (l.ownerEmail && l.ownerEmail === o.email) || (l.ownerName && l.ownerName === o.name) || (l.phone && l.phone === o.phone));
      setOwnerListings(prev => ({ ...prev, [o.id]: match }));
      setExpandedUid(o.id);
    } catch (e) {
      console.log("Listings load error:", e);
      setOwnerListings(prev => ({ ...prev, [o.id]: [] }));
      setExpandedUid(o.id);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      {loadError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#dc2626" }}>
          ⚠️ Could not load owners. Please check the Firebase connection.
        </div>
      )}

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search name, phone, or email..."
        style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, marginBottom: 14 }}
      />

      {loading ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>Loading owners…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>
          {owners.length === 0 ? "No owner accounts have signed up yet." : "No owners found."}
        </div>
      ) : (
        filtered.map(o => (
          <div key={o.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", marginBottom: 10, overflow: "hidden" }}>
            <div style={{ padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#92400e", fontSize: 15, flexShrink: 0 }}>
                {(o.name || "O")[0].toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 13.5, color: "#111" }}>{o.name || "Unnamed Owner"}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{o.phone || o.email || "—"}</div>
                {o.createdAt && (
                  <div style={{ fontSize: 10.5, color: "#b0b7c3", marginTop: 2 }}>
                    Signed up: {new Date(o.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8,
                  background: o.ownerVerified ? "#f0fdf4" : "#f3f4f6",
                  color: o.ownerVerified ? "#16a34a" : "#6b7280"
                }}>{o.ownerVerified ? "✅ Verified" : "Unverified"}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8,
                  background: o.status === "blocked" ? "#fee2e2" : "#dcfce7",
                  color: o.status === "blocked" ? "#991b1b" : "#166534"
                }}>{o.status === "blocked" ? "blocked" : "active"}</span>
              </div>
            </div>

            {o.verificationDocUrl && !o.ownerVerified && (
              <div style={{ padding: "0 14px 12px" }}>
                <a href={o.verificationDocUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700,
                  color: "#1d4ed8", background: "#eff6ff", borderRadius: 8, padding: "6px 10px", textDecoration: "none"
                }}>🛡️ View submitted ID proof →</a>
              </div>
            )}

            <div style={{ display: "flex", borderTop: "1px solid #f3f4f6" }}>
              <button onClick={() => loadListings(o)} style={{ flex: 1, padding: "9px", fontSize: 11, fontWeight: 700, border: "none", background: "transparent", color: "#4338ca", cursor: "pointer" }}>
                {expandedUid === o.id ? "Hide listings ▲" : "View listings ▼"}
              </button>
              <button
                onClick={() => toggleVerified(o, !o.ownerVerified)}
                style={{ flex: 1, padding: "9px", fontSize: 11, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6", background: "transparent", color: o.ownerVerified ? "#92400e" : "#16a34a", cursor: "pointer" }}
              >{o.ownerVerified ? "Unverify" : "Verify"}</button>
              {o.ownerVerified && (
                <button
                  onClick={() => whatsappVerifiedMsg(o)}
                  style={{ flex: 1, padding: "9px", fontSize: 11, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6", background: "transparent", color: "#25D366", cursor: "pointer" }}
                >📱 Notify</button>
              )}
              <button
                onClick={() => updateOwnerStatus(o, o.status === "blocked" ? "active" : "blocked")}
                style={{ flex: 1, padding: "9px", fontSize: 11, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6", background: "transparent", color: o.status === "blocked" ? "#166534" : "#dc2626", cursor: "pointer" }}
              >{o.status === "blocked" ? "Unblock" : "Block"}</button>
              <button
                onClick={() => deleteOwner(o)}
                style={{ flex: 1, padding: "9px", fontSize: 11, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6", background: "transparent", color: "#991b1b", cursor: "pointer" }}
              >Delete</button>
            </div>

            {expandedUid === o.id && (
              <div style={{ padding: 12, background: "#f9fafb", borderTop: "1px solid #f3f4f6", fontSize: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6, color: "#374151" }}>🏠 Listings ({(ownerListings[o.id] || []).length})</div>
                {(ownerListings[o.id] || []).length === 0 ? (
                  <div style={{ color: "#9ca3af" }}>None</div>
                ) : ownerListings[o.id].map(l => (
                  <div key={l.id} style={{ color: "#374151", marginBottom: 4 }}>• {l.name || l.title || "Listing"} — {l.location || ""}</div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// ─── Listing Approval Panel ────────────────────────────────────────────────
// Item 74 of Admin Panel plan. Owner-submitted listings land in Firestore
// with verified:false. This panel lets admin review, approve (verified:true),
// reject (rejected:true, with a reason), or delete a listing.
function AdminListingApproval() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [tab, setTab] = useState("pending"); // pending | approved | rejected
  const [busyId, setBusyId] = useState(null);

  const loadListings = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      if (!window.db) { setLoadError(true); setLoading(false); return; }
      const snap = await window.db.collection("listings").get();
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setListings(data);
    } catch (e) {
      console.log("Listings load error:", e);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadListings(); }, []);

  const approveListing = async (id) => {
    if (!window.db) return;
    setBusyId(id);
    try {
      await window.db.collection("listings").doc(id).update({ verified: true, rejected: false });
      setListings(prev => prev.map(l => l.id === id ? { ...l, verified: true, rejected: false } : l));
      notifyOwner(`Listing ${id} was approved.`);
    } catch (e) { console.log("Approve error:", e); alert("Approve failed. Try again."); }
    finally { setBusyId(null); }
  };

  const rejectListing = async (id) => {
    const reason = window.prompt("Reason for rejecting this listing (shown to owner):", "");
    if (reason === null) return;
    if (!window.db) return;
    setBusyId(id);
    try {
      await window.db.collection("listings").doc(id).update({ rejected: true, verified: false, rejectReason: reason });
      setListings(prev => prev.map(l => l.id === id ? { ...l, rejected: true, verified: false, rejectReason: reason } : l));
      notifyOwner(`Listing ${id} was rejected. Reason: ${reason || "—"}`);
    } catch (e) { console.log("Reject error:", e); alert("Reject failed. Try again."); }
    finally { setBusyId(null); }
  };

  const deleteListing = async (id) => {
    if (!window.confirm("Permanently delete this listing? This action cannot be undone.")) return;
    if (!window.db) return;
    try {
      await window.db.collection("listings").doc(id).delete();
      setListings(prev => prev.filter(l => l.id !== id));
      notifyOwner(`Listing ${id} was permanently deleted.`);
    } catch (e) { console.log("Delete error:", e); alert("Delete failed. Try again."); }
  };

  const pending = listings.filter(l => !l.verified && !l.rejected);
  const approved = listings.filter(l => l.verified);
  const rejected = listings.filter(l => l.rejected);
  const shown = tab === "pending" ? pending : tab === "approved" ? approved : rejected;

  return (
    <div style={{ padding: 16 }}>
      {loadError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#dc2626" }}>
          ⚠️ Could not load listings. Please check the Firebase connection.
        </div>
      )}

      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[
          { key: "pending", label: `⏳ Pending (${pending.length})` },
          { key: "approved", label: `✅ Approved (${approved.length})` },
          { key: "rejected", label: `🚫 Rejected (${rejected.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, padding: "8px 6px", borderRadius: 20, border: "1px solid #e5e7eb", fontSize: 11, fontWeight: 700,
            background: tab === t.key ? "#0f2a3a" : "#fff", color: tab === t.key ? "#fff" : "#374151", cursor: "pointer"
          }}>{t.label}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>Loading listings…</div>
      ) : shown.length === 0 ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>
          {tab === "pending" ? "No listings waiting for review." : tab === "approved" ? "No approved listings yet." : "No rejected listings."}
        </div>
      ) : (
        shown.map(l => (
          <div key={l.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", marginBottom: 10, overflow: "hidden" }}>
            <div style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#111" }}>{l.name || "Untitled Listing"}</div>
                  <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 2 }}>{l.category || "—"} · {l.location || "No location"}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8, whiteSpace: "nowrap",
                  background: l.verified ? "#f0fdf4" : l.rejected ? "#fef2f2" : "#fffbeb",
                  color: l.verified ? "#16a34a" : l.rejected ? "#dc2626" : "#92400e"
                }}>{l.verified ? "Approved" : l.rejected ? "Rejected" : "Pending"}</span>
              </div>

              <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 12, color: "#374151" }}>
                <div>💰 ₹{(l.price || 0).toLocaleString()}</div>
                <div>👤 {l.owner || "Unknown"}</div>
                <div>📸 {(l.photoUrls || []).length} photo(s)</div>
              </div>

              {l.description && (
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8, lineHeight: 1.4 }}>{l.description}</div>
              )}

              {l.rejected && l.rejectReason && (
                <div style={{ fontSize: 11.5, color: "#dc2626", marginTop: 8, background: "#fef2f2", borderRadius: 8, padding: 8 }}>
                  Reason: {l.rejectReason}
                </div>
              )}

              {l.createdAt && (
                <div style={{ fontSize: 10.5, color: "#9ca3af", marginTop: 8 }}>
                  Submitted: {new Date(l.createdAt).toLocaleString("en-IN")}
                </div>
              )}
            </div>

            <div style={{ display: "flex", borderTop: "1px solid #f3f4f6" }}>
              {!l.verified && (
                <button onClick={() => approveListing(l.id)} disabled={busyId === l.id} style={{ flex: 1, padding: "9px", fontSize: 11.5, fontWeight: 700, border: "none", background: "transparent", color: "#16a34a", cursor: "pointer" }}>
                  {busyId === l.id ? "…" : "✅ Approve"}
                </button>
              )}
              {!l.rejected && (
                <button onClick={() => rejectListing(l.id)} disabled={busyId === l.id} style={{ flex: 1, padding: "9px", fontSize: 11.5, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6", background: "transparent", color: "#dc2626", cursor: "pointer" }}>
                  🚫 Reject
                </button>
              )}
              <button onClick={() => deleteListing(l.id)} style={{ flex: 1, padding: "9px", fontSize: 11.5, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6", background: "transparent", color: "#991b1b", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ─── Reports Panel ──────────────────────────────────────────────────────────
// Item 75 of Admin Panel plan. One-click CSV exports of the platform's
// Firestore collections, for offline analysis in Excel/Sheets.
function csvEscape(val) {
  const s = val === null || val === undefined ? "" : String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function downloadCSV(filename, rows) {
  if (!rows || rows.length === 0) {
    alert("No data available to export yet.");
    return;
  }
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  rows.forEach(row => {
    lines.push(headers.map(h => csvEscape(row[h])).join(","));
  });
  const csv = lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function AdminReports() {
  const [busyKey, setBusyKey] = useState(null);

  const REPORTS = [
    {
      key: "listings", icon: "🏠", title: "Listings Report",
      desc: "All owner-submitted listings with status, price, and owner contact.",
      fetch: async () => {
        const snap = await window.db.collection("listings").get();
        return snap.docs.map(d => {
          const l = d.data();
          return {
            Name: l.name || "", Category: l.category || "", Location: l.location || "",
            Price: l.price || 0, Owner: l.owner || "", Phone: l.phone || "",
            Status: l.verified ? "Approved" : l.rejected ? "Rejected" : "Pending",
            SubmittedAt: l.createdAt || "",
          };
        });
      },
    },
    {
      key: "users", icon: "👥", title: "Users Report",
      desc: "Everyone who has logged in — role, contact, and last activity.",
      fetch: async () => {
        const snap = await window.db.collection("users").get();
        return snap.docs.map(d => {
          const u = d.data();
          return {
            Name: u.name || "", Phone: u.phone || "", Email: u.email || "",
            Role: u.role || "tenant", Status: u.status === "blocked" ? "Blocked" : "Active",
            LastLogin: u.lastLoginAt || "", JoinedAt: u.createdAt || "",
          };
        });
      },
    },
    {
      key: "owners", icon: "🏠", title: "Owners Report",
      desc: "Owner accounts with verification status.",
      fetch: async () => {
        const snap = await window.db.collection("users").where("role", "==", "owner").get();
        return snap.docs.map(d => {
          const o = d.data();
          return {
            Name: o.name || "", Phone: o.phone || "", Email: o.email || "",
            Verified: o.ownerVerified ? "Yes" : "No", Status: o.status === "blocked" ? "Blocked" : "Active",
          };
        });
      },
    },
    {
      key: "bookings", icon: "📋", title: "Bookings Report",
      desc: "All bookings made through the app.",
      fetch: async () => {
        const snap = await window.db.collection("bookings").get();
        return snap.docs.map(d => {
          const b = d.data();
          return {
            Tenant: b.name || "", PG: b.pgName || b.location || "", Owner: b.owner || "",
            Price: b.price || 0, Deposit: b.deposit || 0, Status: b.status || "",
            BookedAt: b.createdAt || "",
          };
        });
      },
    },
    {
      key: "complaints", icon: "📢", title: "Complaints Report",
      desc: "Tenant complaints and resolution status.",
      fetch: async () => {
        const snap = await window.db.collection("complaints").get();
        return snap.docs.map(d => {
          const c = d.data();
          return {
            PG: c.pgName || "", Category: c.category || "", Status: c.status || "open",
            RemindersSent: c.reminderCount || 0, RaisedAt: c.createdAt || "",
          };
        });
      },
    },
  ];

  const handleDownload = async (report) => {
    setBusyKey(report.key);
    try {
      if (!window.db) { alert("Firebase isn't connected right now — try again shortly."); return; }
      const rows = await report.fetch();
      downloadCSV(`kailnest-${report.key}-${new Date().toISOString().slice(0, 10)}.csv`, rows);
    } catch (e) {
      console.log("Report export error:", e);
      alert("Couldn't generate this report. Please try again.");
    } finally {
      setBusyKey(null);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 14 }}>
        Download CSV reports for offline analysis in Excel or Google Sheets.
      </div>
      {REPORTS.map(r => (
        <div key={r.key} style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 26 }}>{r.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 13.5, color: "#111" }}>{r.title}</div>
            <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 2 }}>{r.desc}</div>
          </div>
          <button onClick={() => handleDownload(r)} disabled={busyKey === r.key} style={{
            padding: "8px 14px", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
            background: "#0f2a3a", color: "#fff", cursor: busyKey === r.key ? "default" : "pointer"
          }}>{busyKey === r.key ? "…" : "⬇ CSV"}</button>
        </div>
      ))}
    </div>
  );
}

// ─── Analytics Panel ────────────────────────────────────────────────────────
// Item 76 of Admin Panel plan. Derived insights from the catalogue + live data
// — no chart library is loaded in this app, so visuals use simple bar rows
// (same pattern as the Overview screen) rather than a charting dependency.
function AdminAnalytics() {
  const [liveListings, setLiveListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!window.db) { setLoadError(true); setLoading(false); return; }
        const snap = await window.db.collection("listings").get();
        setLiveListings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.log("Analytics load error:", e);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allListings = [
    ...Object.keys(ALL_LISTINGS).flatMap(k => ALL_LISTINGS[k]),
    ...liveListings,
  ];

  const avgPriceByCategory = CATEGORIES.map(cat => {
    const items = allListings.filter(l => (l.category || "").toLowerCase() === cat.key.toLowerCase() || (!l.category && ALL_LISTINGS[cat.key]?.includes(l)));
    const withPrice = items.filter(l => l.price);
    const avg = withPrice.length ? Math.round(withPrice.reduce((s, l) => s + Number(l.price), 0) / withPrice.length) : 0;
    return { ...cat, avg, count: items.length };
  });

  const locationCounts = {};
  allListings.forEach(l => {
    if (l.location) locationCounts[l.location] = (locationCounts[l.location] || 0) + 1;
  });
  const topLocations = Object.entries(locationCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const verifiedCount = allListings.filter(l => l.verified).length;
  const verifiedPct = allListings.length ? Math.round((verifiedCount / allListings.length) * 100) : 0;

  return (
    <div style={{ padding: 16 }}>
      {loadError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#dc2626" }}>
          ⚠️ Live listings unavailable — showing catalogue-only analytics.
        </div>
      )}
      {loading ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>Loading analytics…</div>
      ) : (
        <>
          <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #f3f4f6", marginBottom: 14 }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4, color: "#0f2a3a" }}>Verification Rate</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#16a34a" }}>{verifiedPct}%</div>
            <div style={{ fontSize: 11.5, color: "#9ca3af" }}>{verifiedCount} of {allListings.length} listings verified</div>
          </div>

          <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #f3f4f6", marginBottom: 14 }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: "#0f2a3a" }}>Average Price by Category</div>
            {avgPriceByCategory.map(c => (
              <div key={c.key} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: "#374151" }}>{c.icon} {c.label}</span>
                  <span style={{ color: "#9ca3af" }}>₹{c.avg.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ background: "#f3f4f6", borderRadius: 10, height: 8 }}>
                  <div style={{ width: `${Math.min(100, (c.avg / 30000) * 100)}%`, height: "100%", background: c.color, borderRadius: 10 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #f3f4f6" }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: "#0f2a3a" }}>Top 5 Locations</div>
            {topLocations.length === 0 ? (
              <div style={{ fontSize: 12, color: "#9ca3af" }}>No location data yet.</div>
            ) : topLocations.map(([loc, count], i) => (
              <div key={loc} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < topLocations.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <span style={{ fontSize: 12.5, color: "#374151" }}>📍 {loc}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0f2a3a" }}>{count}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Notifications Panel ────────────────────────────────────────────────────
// Item 77 of Admin Panel plan. Lets admin broadcast an announcement, saved to
// a "broadcasts" collection. (Actual push delivery reuses the browser Push
// permission already requested elsewhere in the app; this panel manages the
// message log admin-side.)
function AdminNotifications() {
  const [message, setMessage] = useState("");
  const [targetPhone, setTargetPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [sendError, setSendError] = useState("");

  const loadBroadcasts = async () => {
    setLoading(true);
    try {
      if (!window.db) { setLoadError(true); setLoading(false); return; }
      const snap = await window.db.collection("broadcasts").get();
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setBroadcasts(data);
    } catch (e) {
      console.log("Broadcasts load error:", e);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBroadcasts(); }, []);

  // If a phone number is entered, this looks up that one user in Firestore and
  // opens a WhatsApp compose window addressed to them (admin still taps Send).
  // If the phone field is left blank, it broadcasts to everyone as before.
  const sendBroadcast = async () => {
    if (!message.trim()) return;
    const sentText = message.trim();
    const phone = targetPhone.trim().replace(/\D/g, "");
    setSendError("");

    if (phone) {
      if (phone.length !== 10) { setSendError("Enter a valid 10-digit phone number, or leave it blank to message everyone."); return; }
      setSending(true);
      try {
        if (!window.db) { setSendError("Firebase isn't connected right now."); setSending(false); return; }
        const uid = "phone_" + phone;
        const doc = await window.db.collection("users").doc(uid).get();
        const userName = doc.exists ? (doc.data().name || "") : "";
        window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(`Hi ${userName}, ${sentText} — Kailnest Team`)}`, "_blank");
        setMessage("");
        setTargetPhone("");
      } catch (e) {
        console.log("Send to one user error:", e);
        setSendError("Couldn't send. Please try again.");
      } finally {
        setSending(false);
      }
      return;
    }

    setSending(true);
    try {
      if (!window.db) { setSendError("Firebase isn't connected right now."); setSending(false); return; }
      await window.db.collection("broadcasts").add({ message: sentText, createdAt: new Date().toISOString() });
      setMessage("");
      loadBroadcasts();
      notifyOwner(`Broadcast sent to all users: "${sentText}"`);
    } catch (e) {
      console.log("Send broadcast error:", e);
      setSendError("Couldn't send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      {loadError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#dc2626" }}>
          ⚠️ Couldn't reach Firebase — broadcast history unavailable.
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", padding: 14, marginBottom: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 8, color: "#111" }}>📣 Send Announcement</div>

        <label style={{ fontSize: 11.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 4 }}>Send to one customer only (optional)</label>
        <input value={targetPhone} onChange={e => setTargetPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="10-digit phone — leave blank to message everyone" type="tel"
          style={{ width: "100%", boxSizing: "border-box", padding: "9px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, marginBottom: 10 }} />

        <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3}
          placeholder={targetPhone ? "Write a message for this customer…" : "Write a message to broadcast to all users…"}
          style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, resize: "vertical", fontFamily: "inherit" }} />
        <button onClick={sendBroadcast} disabled={sending || !message.trim()} style={{
          marginTop: 8, width: "100%", padding: "10px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700,
          background: message.trim() ? "#0f2a3a" : "#e5e7eb", color: message.trim() ? "#fff" : "#9ca3af",
          cursor: message.trim() ? "pointer" : "default"
        }}>{sending ? "Sending…" : (targetPhone ? "📱 Send to This Customer" : "Send to All Users")}</button>

        {sendError && (
          <div style={{ marginTop: 8, fontSize: 12, color: "#dc2626" }}>⚠️ {sendError}</div>
        )}
      </div>

      <div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 8, color: "#111" }}>Past Announcements</div>
      {loading ? (
        <div style={{ textAlign: "center", padding: 20, color: "#9ca3af", fontSize: 13 }}>Loading…</div>
      ) : broadcasts.length === 0 ? (
        <div style={{ textAlign: "center", padding: 20, color: "#9ca3af", fontSize: 13 }}>No announcements sent yet.</div>
      ) : (
        broadcasts.map(b => (
          <div key={b.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #f3f4f6", padding: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: "#111" }}>{b.message}</div>
            <div style={{ fontSize: 10.5, color: "#9ca3af", marginTop: 6 }}>{b.createdAt ? new Date(b.createdAt).toLocaleString("en-IN") : ""}</div>
          </div>
        ))
      )}
    </div>
  );
}

// ─── Complaints Oversight Panel ─────────────────────────────────────────────
// Item 78 of Admin Panel plan. Unlike the owner-side complaint view (which is
// filtered to that owner's PG only), this shows every complaint platform-wide
// so admin can spot patterns or step in on stuck cases.
function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [tab, setTab] = useState("open");
  const [busyId, setBusyId] = useState(null);

  const loadComplaints = async () => {
    setLoading(true);
    try {
      if (!window.db) { setLoadError(true); setLoading(false); return; }
      const snap = await window.db.collection("complaints").get();
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setComplaints(data);
    } catch (e) {
      console.log("Complaints load error:", e);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadComplaints(); }, []);

  const markResolved = async (complaint) => {
    const id = complaint.id;
    if (!window.db) return;
    setBusyId(id);
    try {
      await window.db.collection("complaints").doc(id).update({ status: "resolved" });
      setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: "resolved" } : c));
      if (complaint.tenantPhone) {
        window.open(`https://wa.me/91${complaint.tenantPhone}?text=${encodeURIComponent(`Hi ${complaint.tenantName || ""}, your complaint about "${complaint.category}" at ${complaint.pgName} has been resolved. — Kailnest Team`)}`, "_blank");
      }
    } catch (e) { console.log("Resolve error:", e); alert("Update failed. Try again."); }
    finally { setBusyId(null); }
  };

  const open = complaints.filter(c => c.status !== "resolved");
  const resolved = complaints.filter(c => c.status === "resolved");
  const shown = tab === "open" ? open : resolved;

  return (
    <div style={{ padding: 16 }}>
      {loadError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#dc2626" }}>
          ⚠️ Couldn't reach Firebase — complaints unavailable.
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setTab("open")} style={{
          flex: 1, padding: "8px", borderRadius: 20, border: "1px solid #e5e7eb", fontSize: 12, fontWeight: 700,
          background: tab === "open" ? "#0f2a3a" : "#fff", color: tab === "open" ? "#fff" : "#374151", cursor: "pointer"
        }}>🔴 Open ({open.length})</button>
        <button onClick={() => setTab("resolved")} style={{
          flex: 1, padding: "8px", borderRadius: 20, border: "1px solid #e5e7eb", fontSize: 12, fontWeight: 700,
          background: tab === "resolved" ? "#0f2a3a" : "#fff", color: tab === "resolved" ? "#fff" : "#374151", cursor: "pointer"
        }}>✅ Resolved ({resolved.length})</button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>Loading complaints…</div>
      ) : shown.length === 0 ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>
          {tab === "open" ? "No open complaints. 🎉" : "No resolved complaints yet."}
        </div>
      ) : (
        shown.map(c => (
          <div key={c.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13.5, color: "#111" }}>{c.pgName || "Unknown PG"}</div>
                <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 2 }}>{c.category || "General issue"}</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8,
                background: c.status === "resolved" ? "#f0fdf4" : "#fef2f2",
                color: c.status === "resolved" ? "#16a34a" : "#dc2626"
              }}>{c.status === "resolved" ? "Resolved" : "Open"}</span>
            </div>
            {c.description && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>{c.description}</div>}
            <div style={{ fontSize: 10.5, color: "#9ca3af", marginTop: 8 }}>
              🔔 {c.reminderCount || 0} reminder(s) sent{c.createdAt ? ` · ${new Date(c.createdAt).toLocaleDateString("en-IN")}` : ""}
            </div>
            {c.status !== "resolved" && (
              <button onClick={() => markResolved(c)} disabled={busyId === c.id} style={{
                marginTop: 10, width: "100%", padding: "8px", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 700,
                background: "#f0fdf4", color: "#16a34a", cursor: "pointer"
              }}>{busyId === c.id ? "…" : "✅ Mark as Resolved"}</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// ─── Revenue Reports Panel ──────────────────────────────────────────────────
// Item 79 of Admin Panel plan. Revenue currently comes only from the flat
// ₹199 listing fee (per memory: payment gateway registrations are still
// pending, so this is projected/booked revenue from listings, not a live
// payment ledger).
function AdminRevenue() {
  const [liveListings, setLiveListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!window.db) { setLoadError(true); setLoading(false); return; }
        const snap = await window.db.collection("listings").get();
        setLiveListings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.log("Revenue load error:", e);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const LISTING_FEE = 199;
  const mockByCategory = Object.keys(ALL_LISTINGS).map(k => ALL_LISTINGS[k].length);
  const mockTotal = mockByCategory.reduce((a, b) => a + b, 0);
  const liveByCategory = CATEGORIES.map(cat => liveListings.filter(l => l.category === cat.key).length);
  const totalListings = mockTotal + liveListings.length;
  const totalRevenue = totalListings * LISTING_FEE;

  const revenueByCategory = CATEGORIES.map((cat, i) => {
    const count = (ALL_LISTINGS[cat.key]?.length || 0) + liveByCategory[i];
    return { ...cat, count, revenue: count * LISTING_FEE };
  });

  return (
    <div style={{ padding: 16 }}>
      {loadError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#dc2626" }}>
          ⚠️ Live listings unavailable — showing catalogue-only revenue.
        </div>
      )}
      <div style={{ background: "linear-gradient(135deg, #0f2a3a, #173c50)", borderRadius: 14, padding: 20, marginBottom: 14, color: "#fff" }}>
        <div style={{ fontSize: 12, opacity: 0.8 }}>Total Projected Revenue</div>
        <div style={{ fontSize: 34, fontWeight: 900, marginTop: 4 }}>{loading ? "…" : `₹${totalRevenue.toLocaleString("en-IN")}`}</div>
        <div style={{ fontSize: 11.5, opacity: 0.75, marginTop: 4 }}>{totalListings} listings × ₹{LISTING_FEE} flat fee</div>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #f3f4f6" }}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: "#0f2a3a" }}>Revenue by Category</div>
        {loading ? (
          <div style={{ textAlign: "center", padding: 20, color: "#9ca3af", fontSize: 13 }}>Loading…</div>
        ) : (
          revenueByCategory.map(c => {
            const pct = totalRevenue > 0 ? Math.round((c.revenue / totalRevenue) * 100) : 0;
            return (
              <div key={c.key} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: "#374151" }}>{c.icon} {c.label}</span>
                  <span style={{ color: "#9ca3af" }}>₹{c.revenue.toLocaleString("en-IN")} ({c.count})</span>
                </div>
                <div style={{ background: "#f3f4f6", borderRadius: 10, height: 8 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: c.color, borderRadius: 10 }} />
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 12, textAlign: "center" }}>
        Note: this is projected revenue from listing fees. Real-time payment gateway (Razorpay/PhonePe) integration is pending.
      </div>
    </div>
  );
}

// ─── Backup System Panel ────────────────────────────────────────────────────
// Item 80 of Admin Panel plan. One-click export of every Firestore collection
// into a single JSON file the owner can store safely offline.
function AdminBackup() {
  const [backing, setBacking] = useState(false);
  const [lastBackup, setLastBackup] = useState(null);
  const [error, setError] = useState(null);

  const runBackup = async () => {
    setBacking(true);
    setError(null);
    try {
      if (!window.db) { setError("Firebase isn't connected right now — try again shortly."); return; }
      const collections = ["users", "listings", "bookings", "complaints", "broadcasts"];
      const backup = { exportedAt: new Date().toISOString() };
      for (const col of collections) {
        const snap = await window.db.collection(col).get();
        backup[col] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      const json = JSON.stringify(backup, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kailnest-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setLastBackup(new Date());
    } catch (e) {
      console.log("Backup error:", e);
      setError("Backup failed. Please try again.");
    } finally {
      setBacking(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", padding: 20, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>💾</div>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 6, color: "#111" }}>Full Data Backup</div>
        <div style={{ fontSize: 12.5, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>
          Downloads a single JSON file with all users, listings, bookings, complaints, and broadcasts — useful as an offline safety copy.
        </div>
        {error && <div style={{ fontSize: 12, color: "#dc2626", marginBottom: 10 }}>{error}</div>}
        <button onClick={runBackup} disabled={backing} style={{
          width: "100%", padding: "12px", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700,
          background: "#0f2a3a", color: "#fff", cursor: backing ? "default" : "pointer"
        }}>{backing ? "Backing up…" : "⬇ Download Full Backup (JSON)"}</button>
        {lastBackup && (
          <div style={{ fontSize: 11, color: "#16a34a", marginTop: 10 }}>
            ✅ Last backup: {lastBackup.toLocaleString("en-IN")}
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 12, textAlign: "center" }}>
        Tip: save this file somewhere outside the phone too (Google Drive, email to yourself) so a lost/damaged phone doesn't mean a lost backup.
      </div>
    </div>
  );
}

// ─── Admin Settings Panel ───────────────────────────────────────────────────
// Lets the admin change their own login password. This now re-authenticates
// with Firebase Auth (Email/Password, raju@kailnest.in) and asks Firebase
// itself to set the new password — no password hash is stored in Firestore
// anymore. Every change here also notifies the app owner (WhatsApp message)
// via notifyOwner(), same as other sensitive admin actions.
function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success"|"error", text }

  const handleChangePassword = async () => {
    setMessage(null);
    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    setSaving(true);
    try {
      if (!window.auth || !window.auth.currentUser) { setMessage({ type: "error", text: "You're not signed in as admin right now — please log out and back in first." }); setSaving(false); return; }

      // Admin identity now lives in Firebase Authentication (not a Firestore
      // document), so changing the password re-authenticates with the
      // current one first, then asks Firebase itself to set the new one.
      const ADMIN_AUTH_EMAIL = "raju@kailnest.in";
      const credential = firebase.auth.EmailAuthProvider.credential(ADMIN_AUTH_EMAIL, currentPassword);
      await window.auth.currentUser.reauthenticateWithCredential(credential);
      await window.auth.currentUser.updatePassword(newPassword);

      setMessage({ type: "success", text: "✅ Password changed successfully." });
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      notifyOwner("Admin password was changed.");
    } catch (e) {
      console.log("Change password error:", e);
      const msg = e.code === "auth/wrong-password" ? "Current password is incorrect." : "Couldn't change password. Please try again.";
      setMessage({ type: "error", text: msg });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", padding: 18 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4, color: "#111" }}>🔑 Change Admin Password</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}>
          You'll need this new password next time you log in. A WhatsApp alert is sent automatically whenever this is changed.
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Current Password</label>
          <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>New Password</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
            placeholder="Min 6 characters"
            style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14 }} />
        </div>

        {message && (
          <div style={{
            fontSize: 12.5, marginBottom: 12, padding: 10, borderRadius: 10, fontWeight: 600,
            background: message.type === "success" ? "#f0fdf4" : "#fef2f2",
            color: message.type === "success" ? "#16a34a" : "#dc2626"
          }}>{message.text}</div>
        )}

        <button onClick={handleChangePassword} disabled={saving} style={{
          width: "100%", padding: "12px", borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700,
          background: "#0f2a3a", color: "#fff", cursor: saving ? "default" : "pointer"
        }}>{saving ? "Saving…" : "Update Password"}</button>
      </div>

      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 12, textAlign: "center" }}>
        🔔 All admin actions (password changes, user/owner blocks, listing approvals, broadcasts) send a WhatsApp alert and are logged for the record.
      </div>
    </div>
  );
}

// ─── Manage Cities (admin-added towns, no code change needed) ────────────────
function ManageCitiesPanel() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [saving, setSaving] = useState(false);

  const loadCities = async () => {
    setLoading(true);
    try {
      if (!window.db) { setLoading(false); return; }
      const snap = await window.db.collection("customCities").orderBy("name").get();
      setCities(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.log("Load cities error:", e); }
    setLoading(false);
  };

  useEffect(() => { loadCities(); }, []);

  const addCity = async () => {
    const cleanName = name.trim();
    const cleanState = state.trim();
    if (!cleanName || !cleanState) { alert("Enter both town name and state."); return; }
    setSaving(true);
    try {
      if (!window.db) throw new Error("no-db");
      await window.db.collection("customCities").add({
        name: cleanName, state: cleanState, createdAt: new Date().toISOString(),
      });
      notifyOwner(`New town added to city list: ${cleanName}, ${cleanState}.`);
      setName(""); setState("");
      await loadCities();
    } catch (e) {
      console.log("Add city error:", e);
      alert("Couldn't add town. Check your connection and try again.");
    }
    setSaving(false);
  };

  const deleteCity = async (id, cityName) => {
    if (!confirm(`Remove "${cityName}" from the city list?`)) return;
    try {
      if (!window.db) return;
      await window.db.collection("customCities").doc(id).delete();
      notifyOwner(`Town removed from city list: ${cityName}.`);
      setCities(prev => prev.filter(c => c.id !== id));
    } catch (e) { console.log("Delete city error:", e); alert("Delete failed. Try again."); }
  };

  return (
    <div style={{ padding: 16, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>📍 Manage Cities</div>
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}>
        Add any town or city here — it will appear in the city picker for everyone immediately, no app update needed.
      </div>

      {/* Add form */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 14, border: "1px solid #e5e7eb", marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 4 }}>Town / City Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Porumamilla"
            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 4 }}>State</label>
          <input value={state} onChange={e => setState(e.target.value)} placeholder="e.g. Andhra Pradesh"
            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
        </div>
        <button onClick={addCity} disabled={saving} style={{
          width: "100%", padding: "11px", background: saving ? "#d1d5db" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700,
          cursor: saving ? "default" : "pointer"
        }}>{saving ? "Adding..." : "+ Add Town"}</button>
      </div>

      {/* List of added towns */}
      <div style={{ fontWeight: 700, fontSize: 13, color: "#6b7280", marginBottom: 10 }}>
        ADDED TOWNS ({cities.length})
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>Loading…</div>
      ) : cities.length === 0 ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>
          No towns added yet. Towns you add here show up on top of the built-in city list.
        </div>
      ) : (
        cities.map(c => (
          <div key={c.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 8, border: "1px solid #f3f4f6"
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{c.state}</div>
            </div>
            <button onClick={() => deleteCity(c.id, c.name)} style={{
              background: "#fef2f2", color: "#dc2626", border: "none", borderRadius: 8,
              padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer"
            }}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

// ─── Payment Verification Queue (owner ₹199 claims, no gateway yet) ──────────
// Shows owners whose ₹199 plan is expiring within the next 3 days (or already
// expired), sorted soonest-first, so the admin can proactively remind them to
// renew before their listing plan lapses.
function ExpiringOwnersPanel() {
  const [expiring, setExpiring] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadExpiring = async () => {
    setLoading(true);
    try {
      if (!window.db) { setLoading(false); return; }
      const snap = await window.db.collection("users").where("ownerPlanActive", "==", true).get();
      const now = Date.now();
      const threeDaysFromNow = now + 3 * 24 * 60 * 60 * 1000;
      const list = snap.docs
        .map(d => ({ uid: d.id, ...d.data() }))
        .filter(u => u.planExpiryDate && new Date(u.planExpiryDate).getTime() <= threeDaysFromNow)
        .map(u => ({ ...u, daysLeft: Math.ceil((new Date(u.planExpiryDate).getTime() - now) / (24 * 60 * 60 * 1000)) }))
        .sort((a, b) => a.daysLeft - b.daysLeft);
      setExpiring(list);
    } catch (e) { console.log("Expiring owners load error:", e); }
    setLoading(false);
  };

  useEffect(() => { loadExpiring(); }, []);

  const sendReminder = (u) => {
    if (!u.phone) return;
    const msg = u.daysLeft < 0
      ? `⚠️ Kailnest: Your ₹199 listing plan has expired. Please renew now to keep your listing active.`
      : `⚠️ Kailnest: Your ₹199 listing plan expires in ${u.daysLeft} day(s). Please renew soon to avoid your listing being paused.`;
    window.open(`https://wa.me/91${u.phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (loading) return null;
  if (expiring.length === 0) return null;

  return (
    <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 14, padding: 14, marginBottom: 16 }}>
      <div style={{ fontWeight: 800, fontSize: 14, color: "#92400e", marginBottom: 8 }}>
        ⚠️ Renewals Due Soon ({expiring.length})
      </div>
      {expiring.map(u => (
        <div key={u.uid} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", borderRadius: 10, padding: "8px 12px", marginBottom: 6 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>{u.name || u.phone || u.uid}</div>
            <div style={{ fontSize: 11.5, color: u.daysLeft < 0 ? "#dc2626" : "#92400e" }}>
              {u.daysLeft < 0 ? `Expired ${Math.abs(u.daysLeft)} day(s) ago` : u.daysLeft === 0 ? "Expires today" : `Expires in ${u.daysLeft} day(s)`}
            </div>
          </div>
          <button onClick={() => sendReminder(u)} style={{
            padding: "6px 10px", borderRadius: 8, border: "none", background: "#0f2a3a", color: "#fff", fontSize: 11.5, fontWeight: 700, cursor: "pointer"
          }}>📲 Remind</button>
        </div>
      ))}
    </div>
  );
}

function PaymentVerificationPanel() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pending");
  const [busyId, setBusyId] = useState(null);

  const loadClaims = async () => {
    setLoading(true);
    try {
      if (!window.db) { setLoading(false); return; }
      const snap = await window.db.collection("paymentClaims").get();
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => new Date(b.claimedAt || 0) - new Date(a.claimedAt || 0));
      setClaims(data);
    } catch (e) { console.log("Payment claims load error:", e); }
    setLoading(false);
  };

  useEffect(() => { loadClaims(); }, []);

  const approveClaim = async (claim) => {
  setBusyId(claim.id);
  try {
    if (!window.db) return;
    await window.db.collection("paymentClaims").doc(claim.id).update({ status: "approved" });
    if (claim.uid) {
      const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      // .set(..., {merge:true}) instead of .update() — if this owner's user
      // document doesn't exist yet for any reason, this creates it with just
      // these fields instead of throwing "no document to update".
      await window.db.collection("users").doc(claim.uid).set({ ownerPlanActive: true, ownerPlanName: "Basic", planExpiryDate: expiryDate }, { merge: true });

      // Referral reward: if this owner signed up using someone's referral code,
      // credit the referrer with a ₹199 wallet credit (one-time, on first payment only).
      try {
        const ownerSnap = await window.db.collection("users").doc(claim.uid).get();
        const ownerData = ownerSnap.data();
        if (ownerData?.referredBy && !ownerData?.referralRewardGiven) {
          await window.db.collection("users").doc(ownerData.referredBy).update({
            walletCredits: firebase.firestore.FieldValue.increment(199)
          });
          await window.db.collection("users").doc(claim.uid).update({ referralRewardGiven: true });
        }
      } catch (e) { console.log("Referral reward error:", e); }
    }
    if (claim.phone) {
      const ownerText = encodeURIComponent(`✅ Kailnest: Your ₹199 payment has been verified! Your listing plan is now active. You can now go ahead and add your property listing. Thank you!`);
      window.open(`https://wa.me/91${claim.phone}?text=${ownerText}`, "_blank");
    }
    setClaims(prev => prev.map(c => c.id === claim.id ? { ...c, status: "approved" } : c));
    notifyOwner(`Payment claim approved for ${claim.name} (₹${claim.amount}). Their listing plan is now active.`);
  } catch (e) { console.log("Approve claim error:", e); alert("Approve failed. Try again."); }
  setBusyId(null);
};

  const rejectClaim = async (claim) => {
    const reason = window.prompt("Reason for rejecting this payment claim (e.g. no matching credit found):", "");
    if (reason === null) return;
    setBusyId(claim.id);
    try {
      if (!window.db) return;
      await window.db.collection("paymentClaims").doc(claim.id).update({ status: "rejected", rejectReason: reason });
      setClaims(prev => prev.map(c => c.id === claim.id ? { ...c, status: "rejected", rejectReason: reason } : c));
      notifyOwner(`Payment claim rejected for ${claim.name}. Reason: ${reason || "—"}`);
    } catch (e) { console.log("Reject claim error:", e); alert("Reject failed. Try again."); }
    setBusyId(null);
  };

  const pending = claims.filter(c => c.status === "pending");
  const approved = claims.filter(c => c.status === "approved");
  const rejected = claims.filter(c => c.status === "rejected");
  const shown = tab === "pending" ? pending : tab === "approved" ? approved : rejected;

  return (
    <div style={{ padding: 16, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>💳 Payment Verification</div>
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}>
        There's no payment gateway wired up yet, so UPI payments can't be confirmed automatically.
        Check your UPI app for a ₹199 credit matching the name/phone below, then approve or reject.
      </div>

      <ExpiringOwnersPanel />

      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[
          { key: "pending", label: `⏳ Pending (${pending.length})` },
          { key: "approved", label: `✅ Approved (${approved.length})` },
          { key: "rejected", label: `🚫 Rejected (${rejected.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, padding: "8px 6px", borderRadius: 20, border: "1px solid #e5e7eb", fontSize: 11, fontWeight: 700,
            background: tab === t.key ? "#0f2a3a" : "#fff", color: tab === t.key ? "#fff" : "#374151", cursor: "pointer"
          }}>{t.label}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>Loading…</div>
      ) : shown.length === 0 ? (
        <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>
          {tab === "pending" ? "No pending payment claims." : tab === "approved" ? "No approved claims yet." : "No rejected claims."}
        </div>
      ) : (
        shown.map(c => (
          <div key={c.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", marginBottom: 10, overflow: "hidden" }}>
            <div style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#111" }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>📞 {c.phone || "—"}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#16a34a" }}>₹{c.amount}</div>
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>
                Claimed: {c.claimedAt ? new Date(c.claimedAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
              </div>
              {c.rejectReason && (
                <div style={{ fontSize: 11.5, color: "#dc2626", marginTop: 6, background: "#fef2f2", borderRadius: 8, padding: "6px 10px" }}>
                  Reason: {c.rejectReason}
                </div>
              )}
            </div>
            {tab === "pending" && (
              <div style={{ display: "flex", borderTop: "1px solid #f3f4f6" }}>
                <button onClick={() => approveClaim(c)} disabled={busyId === c.id} style={{
                  flex: 1, padding: "11px", fontSize: 12.5, fontWeight: 700, border: "none",
                  background: "transparent", color: "#16a34a", cursor: "pointer"
                }}>✅ Approve</button>
                <button onClick={() => rejectClaim(c)} disabled={busyId === c.id} style={{
                  flex: 1, padding: "11px", fontSize: 12.5, fontWeight: 700, border: "none", borderLeft: "1px solid #f3f4f6",
                  background: "transparent", color: "#dc2626", cursor: "pointer"
                }}>🚫 Reject</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// Lets an admin reset a user's password when they've forgotten it and can't
// use the self-service Forgot Password flow (e.g. no security question was
// ever saved for their account). Optionally also (re)sets the security
// question at the same time, so the user can self-serve next time.
function AdminPasswordResetPanel() {
  const [phone, setPhone] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQ, setSecurityQ] = useState(SECURITY_QUESTIONS[0]);
  const [securityA, setSecurityA] = useState("");
  const [setSecurityToo, setSetSecurityToo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const resetForm = () => {
    setFoundUser(null); setNewPassword(""); setConfirmPassword("");
    setSecurityA(""); setSetSecurityToo(false); setSuccessMsg(""); setSearchError("");
  };

  const handleSearch = async () => {
    if (phone.length !== 10) { setSearchError("Enter a valid 10-digit phone number."); return; }
    setSearching(true); setSearchError(""); setSuccessMsg(""); setFoundUser(null);
    try {
      if (!window.db) { setSearchError("Not connected. Check your internet."); setSearching(false); return; }
      const uid = "phone_" + phone;
      const doc = await window.db.collection("users").doc(uid).get();
      if (!doc.exists) { setSearchError("No account found with this phone number."); setSearching(false); return; }
      setFoundUser({ uid, ...doc.data() });
    } catch (e) {
      console.log("Admin user search error:", e);
      setSearchError("Something went wrong. Please try again.");
    }
    setSearching(false);
  };

  const handleReset = async () => {
    if (newPassword.length < 4) { setSearchError("New password must be at least 4 characters."); return; }
    if (newPassword !== confirmPassword) { setSearchError("Passwords don't match."); return; }
    if (setSecurityToo && securityA.trim().length < 2) { setSearchError("Enter an answer for the security question."); return; }
    setSaving(true); setSearchError("");
    try {
      const update = { passwordHash: await hashPasswordGlobal(newPassword) };
      if (setSecurityToo) {
        update.securityQuestion = securityQ;
        update.securityAnswerHash = await hashPasswordGlobal(securityA.trim().toLowerCase());
      }
      await window.db.collection("users").doc(foundUser.uid).update(update);
      setSuccessMsg(`✅ Password reset for ${foundUser.name || foundUser.phone}. Share the new password with them directly (call/WhatsApp) — it isn't sent automatically.`);
      setNewPassword(""); setConfirmPassword(""); setSecurityA(""); setSetSecurityToo(false);
    } catch (e) {
      console.log("Admin password reset error:", e);
      setSearchError("Reset failed. Please try again.");
    }
    setSaving(false);
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 12, marginBottom: 16, fontSize: 12, color: "#1e40af" }}>
        🔑 Use this when a user can't reset their own password (e.g. "Security question not set" error). Find their account by phone number, then set a new password for them.
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={phone}
          onChange={e => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); }}
          placeholder="10-digit phone number"
          type="tel"
          style={{ flex: 1, padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }}
        />
        <button onClick={handleSearch} disabled={searching || phone.length !== 10} style={{
          padding: "11px 18px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer",
          background: phone.length === 10 ? "#0f2a3a" : "#d1d5db", color: "#fff"
        }}>{searching ? "..." : "Find"}</button>
      </div>

      {searchError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#dc2626", marginBottom: 12 }}>
          ⚠️ {searchError}
        </div>
      )}

      {successMsg && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#166534", marginBottom: 12 }}>
          {successMsg}
        </div>
      )}

      {foundUser && (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#4338ca", fontSize: 15, flexShrink: 0 }}>
              {(foundUser.name || "U")[0].toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#111" }}>{foundUser.name || "Unnamed"}</div>
              <div style={{ fontSize: 11.5, color: "#9ca3af" }}>+91 {foundUser.phone} · {foundUser.role || "tenant"}</div>
            </div>
            <button onClick={resetForm} style={{ background: "none", border: "none", color: "#9ca3af", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✕</button>
          </div>

          <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>New Password</label>
          <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="text" placeholder="Min 4 characters"
            style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box", marginBottom: 10 }} />

          <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Confirm New Password</label>
          <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="text" placeholder="Re-enter the new password"
            style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box", marginBottom: 14 }} />

          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 700, color: "#374151", marginBottom: setSecurityToo ? 10 : 14, cursor: "pointer" }}>
            <input type="checkbox" checked={setSecurityToo} onChange={e => setSetSecurityToo(e.target.checked)} />
            Also set a security question (so they can self-reset next time)
          </label>

          {setSecurityToo && (
            <div style={{ marginBottom: 14 }}>
              <select value={securityQ} onChange={e => setSecurityQ(e.target.value)} style={{
                width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb",
                fontSize: 13, boxSizing: "border-box", marginBottom: 8, background: "#fff"
              }}>
                {SECURITY_QUESTIONS.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              <input value={securityA} onChange={e => setSecurityA(e.target.value)} placeholder="Answer"
                style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
            </div>
          )}

          <button onClick={handleReset} disabled={saving} style={{
            width: "100%", padding: "13px", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff"
          }}>{saving ? "Resetting..." : "🔑 Reset Password"}</button>
        </div>
      )}
    </div>
  );
}

function AdminDashboard({ onLogout }) {
  const [view, setView] = useState("overview"); // "overview" | "users"
  const [liveListingCount, setLiveListingCount] = useState(0);
  const [liveBookingCount, setLiveBookingCount] = useState(0);
  const [complaintStats, setComplaintStats] = useState({ open: 0, resolved: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!window.db) { setLoadError(true); setLoading(false); return; }
        const [listingsSnap, bookingsSnap, complaintsSnap] = await Promise.all([
          window.db.collection("listings").get(),
          window.db.collection("bookings").get(),
          window.db.collection("complaints").get(),
        ]);
        if (cancelled) return;

        const complaintsData = complaintsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const bookingsData = bookingsSnap.docs.map(d => ({ id: d.id, type: "booking", ...d.data() }));
        const complaintsAsEvents = complaintsData.map(c => ({ ...c, type: "complaint" }));

        const merged = [...bookingsData, ...complaintsAsEvents]
          .filter(e => e.createdAt)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

        setLiveListingCount(listingsSnap.size);
        setLiveBookingCount(bookingsSnap.size);
        setComplaintStats({
          open: complaintsData.filter(c => c.status !== "resolved").length,
          resolved: complaintsData.filter(c => c.status === "resolved").length,
        });
        setRecentActivity(merged);
      } catch (e) {
        console.log("Admin dashboard fetch error:", e);
        setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const categoryBreakdown = Object.keys(ALL_LISTINGS).map(key => ({
    key, count: ALL_LISTINGS[key].length,
  }));
  const mockListingTotal = categoryBreakdown.reduce((sum, c) => sum + c.count, 0);
  const totalListings = mockListingTotal + liveListingCount;
  const estimatedRevenue = totalListings * 199; // ₹199 flat listing fee model

  const STAT_CARDS = [
    { label: "Total Listings", value: totalListings, icon: "🏠" },
    { label: "Total Bookings", value: liveBookingCount, icon: "📋" },
    { label: "Open Complaints", value: complaintStats.open, icon: "📢" },
    { label: "Est. Revenue", value: `₹${estimatedRevenue.toLocaleString("en-IN")}`, icon: "💰" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh", maxWidth: 430, margin: "0 auto", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0f2a3a 0%, #173c50 100%)", padding: "48px 16px 24px", color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={LOGO_URL} alt="Kailnest" style={{ width: 32, height: 32, objectFit: "contain" }} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>Kailnest Admin</div>
              <div style={{ fontSize: 11, opacity: 0.75 }}>Platform overview</div>
            </div>
          </div>
          <button onClick={onLogout} style={{
            background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 10, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer"
          }}>Logout</button>
        </div>
      </div>

      {/* Nav tabs */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #f3f4f6", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {[{ key: "overview", label: "📊 Overview" }, { key: "users", label: "👥 User Management" }, { key: "owners", label: "🏠 Owner Management" }, { key: "listings", label: "📝 Listing Approval" }, { key: "payments", label: "💳 Payments" }, { key: "passwordReset", label: "🔑 Reset Password" }, { key: "cities", label: "📍 Manage Cities" }, { key: "reports", label: "📄 Reports" }, { key: "analytics", label: "📈 Analytics" }, { key: "notifications", label: "🔔 Notifications" }, { key: "complaints", label: "📢 Complaints" }, { key: "revenue", label: "💰 Revenue" }, { key: "backup", label: "💾 Backup" }, { key: "settings", label: "⚙️ Settings" }].map(v => (
          <button key={v.key} onClick={() => setView(v.key)} style={{
            flexShrink: 0, padding: "12px 14px", border: "none", background: "transparent", cursor: "pointer",
            fontSize: 12.5, fontWeight: 800, color: view === v.key ? "#0f2a3a" : "#9ca3af", whiteSpace: "nowrap",
            borderBottom: view === v.key ? "3px solid #0f2a3a" : "3px solid transparent"
          }}>{v.label}</button>
        ))}
      </div>

      {view === "users" && <UserManagementPanel />}
      {view === "owners" && <OwnerManagementPanel />}
      {view === "listings" && <AdminListingApproval />}
      {view === "payments" && <PaymentVerificationPanel />}
      {view === "passwordReset" && <AdminPasswordResetPanel />}
      {view === "cities" && <ManageCitiesPanel />}
      {view === "reports" && <AdminReports />}
      {view === "analytics" && <AdminAnalytics />}
      {view === "notifications" && <AdminNotifications />}
      {view === "complaints" && <AdminComplaints />}
      {view === "revenue" && <AdminRevenue />}
      {view === "backup" && <AdminBackup />}
      {view === "settings" && <AdminSettings />}

      {view === "overview" && (
      <div style={{ padding: 16 }}>
        {loadError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#dc2626" }}>
            ⚠️ Live data unavailable right now — showing catalogue listings only. Bookings/complaints counts need a working Firebase connection.
          </div>
        )}

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {STAT_CARDS.map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: 14, border: "1px solid #f3f4f6", textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#0f2a3a" }}>{loading ? "…" : s.value}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category breakdown */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #f3f4f6", marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: "#0f2a3a" }}>Listings by Category</div>
          {categoryBreakdown.map(c => {
            const cat = CATEGORIES.find(x => x.key === c.key);
            const pct = totalListings > 0 ? Math.round((c.count / totalListings) * 100) : 0;
            return (
              <div key={c.key} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: "#374151" }}>{cat?.icon} {cat?.label || c.key}</span>
                  <span style={{ color: "#9ca3af" }}>{c.count}</span>
                </div>
                <div style={{ background: "#f3f4f6", borderRadius: 10, height: 8 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: cat?.color || "#6366f1", borderRadius: 10 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent activity */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #f3f4f6" }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: "#0f2a3a" }}>Recent Activity</div>
          {loading ? (
            <div style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "12px 0" }}>Loading…</div>
          ) : recentActivity.length === 0 ? (
            <div style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "12px 0" }}>No recent activity yet</div>
          ) : (
            recentActivity.map((e, i) => (
              <div key={e.id || i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < recentActivity.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ fontSize: 18 }}>{e.type === "booking" ? "📋" : "📢"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#111" }}>
                    {e.type === "booking" ? `New booking · ${e.name || e.pgName || "Listing"}` : `Complaint · ${e.category || "Issue raised"}`}
                  </div>
                  <div style={{ fontSize: 10.5, color: "#9ca3af", marginTop: 2 }}>
                    {e.createdAt ? new Date(e.createdAt).toLocaleString("en-IN") : ""}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 11, color: "#9ca3af", lineHeight: 1.6 }}>
          ✅ All 10 admin panel modules are live.
        </div>
      </div>
      )}
    </div>
  );
}

export default function PGFinderApp() {
  const [tab, setTab] = useState("search");
  const [activeCategory, setActiveCategory] = useState(null);
  const [liveListings, setLiveListings] = useState([]);

  // Pull owner-submitted listings that admin has approved (verified: true) so
  // they show up in search alongside the seeded catalogue. Unapproved/rejected
  // listings never reach regular users — only visible in the admin panel.
  useEffect(() => {
    (async () => {
      try {
        if (!window.db) return;
        const snap = await window.db.collection("listings").where("verified", "==", true).get();
        setLiveListings(snap.docs.map(d => ({ id: d.id, videoUrl: "", nearBy: "", ...d.data() })));
      } catch (e) {
        console.log("Live listings fetch error:", e);
      }
    })();
  }, []);
  const [user, setUser] = useState(null);

  // Ask for notification permission once per login, and save an FCM token
  // if the browser supports it — this is the foundation for real push;
  // actually sending pushes to a closed app still needs a server (Cloud
  // Functions) to trigger them, which is a separate deploy step.
  useEffect(() => {
    if (!user?.uid || typeof Notification === "undefined") return;
    if (Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
    if (Notification.permission === "granted" && window.firebase?.messaging?.isSupported?.()) {
      try {
        const messaging = firebase.messaging();
        messaging.getToken().then(token => {
          if (token && window.db) {
            window.db.collection("users").doc(user.uid).update({ fcmToken: token }).catch(() => {});
          }
        }).catch(e => console.log("FCM token error:", e));
      } catch (e) { console.log("Messaging init error:", e); }
    }
  }, [user?.uid]);

  const [lang, setLang] = useState("en"); // en | te | hi
  const t = TRANSLATIONS[lang]; // shortcut for translations // null = not logged in
  const [citySelected, setCitySelected] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showHomeTooltip, setShowHomeTooltip] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All India");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showTerms, setShowTerms] = useState(null); // "terms" | "privacy" | null
  const [showBroadcasts, setShowBroadcasts] = useState(false);
  const [hasNewBroadcast, setHasNewBroadcast] = useState(false);

  // Check once per login whether there's an announcement newer than the
  // last one this user has opened, so the bell can show an unread dot.
  useEffect(() => {
    if (!user || !window.db) return;
    let cancelled = false;
    window.db.collection("broadcasts").get().then(snap => {
      if (cancelled || snap.empty) return;
      const latest = snap.docs.map(d => d.data().createdAt).sort().reverse()[0];
      const lastSeen = localStorage.getItem("kailnest_last_seen_broadcast") || "";
      if (latest && latest > lastSeen) setHasNewBroadcast(true);
    }).catch(e => console.log("Broadcast check error:", e));
    return () => { cancelled = true; };
  }, [user?.uid]);

  const openBroadcasts = () => {
    setShowBroadcasts(true);
    setHasNewBroadcast(false);
    try { localStorage.setItem("kailnest_last_seen_broadcast", new Date().toISOString()); } catch (e) {}
  };
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterRoommate, setFilterRoommate] = useState(false);
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
  const [showListingForm, setShowListingForm] = useState(false);
  const [ownerPlan, setOwnerPlan] = useState(null); // null=no plan, {name, limit, listings}
  const [ownerListings, setOwnerListings] = useState([]); // owner's own listings

  // Owner plan is stored in Firestore (not just local state) so it survives
  // refresh/re-login, and updates live the moment admin approves a payment
  // claim — no manual refresh needed.
  const wasVerifiedRef = React.useRef(null);
  useEffect(() => {
    if (!user || user.role !== "owner" || !user.uid || !window.db) return;
    const unsub = window.db.collection("users").doc(user.uid).onSnapshot(doc => {
      const data = doc.data();
      if (data?.ownerPlanActive && data?.ownerPlanName) {
        setOwnerPlan(prev => {
          if (!prev) notifyUser("🎉 Payment Approved!", `Your ${data.ownerPlanName} plan is now active. You can add listings.`);
          return { name: data.ownerPlanName };
        });
      } else {
        setOwnerPlan(null);
      }
      if (typeof data?.ownerVerified === "boolean") {
        if (wasVerifiedRef.current === false && data.ownerVerified === true) {
          notifyUser("🛡️ You're Verified!", "Your owner account is now verified on Kailnest.");
        }
        wasVerifiedRef.current = data.ownerVerified;
        setUser(prev => (prev && prev.ownerVerified !== data.ownerVerified) ? { ...prev, ownerVerified: data.ownerVerified } : prev);
      }
    }, e => console.log("Owner plan listener error:", e));
    return () => unsub();
  }, [user?.uid, user?.role]);

  // Load this owner's own listings from Firestore (so "My Listings" and
  // view counts survive refresh/re-login instead of resetting every session)
  // — live, so an admin's approval/rejection notifies the owner right away.
  const prevListingStatusRef = React.useRef({});
  useEffect(() => {
    if (!user || user.role !== "owner" || !window.db) return;
    const unsub = window.db.collection("listings").onSnapshot(snap => {
      const mine = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(l => (l.ownerId && l.ownerId === user.uid) || (l.phone && l.phone === user.phone));
      mine.forEach(l => {
        const prevStatus = prevListingStatusRef.current[l.id];
        if (prevStatus !== undefined) {
          if (!prevStatus?.verified && l.verified) notifyUser("✅ Listing Approved!", `"${l.name}" is now live on Kailnest.`);
          if (!prevStatus?.rejected && l.rejected) notifyUser("❌ Listing Needs Changes", `"${l.name}" was rejected${l.rejectReason ? ": " + l.rejectReason : "."}`);
        }
        prevListingStatusRef.current[l.id] = { verified: l.verified, rejected: l.rejected };
      });
      setOwnerListings(mine);
    }, e => console.log("Owner listings load error:", e));
    return () => unsub();
  }, [user?.uid, user?.role, user?.phone]);

  // Backfill a referral code for accounts created before this feature
  // existed, so every user has one to share regardless of signup date.
  useEffect(() => {
    if (!user?.uid || user.referralCode || !window.db) return;
    const code = "KN" + (user.phone || "").slice(-6);
    window.db.collection("users").doc(user.uid).update({ referralCode: code, referralCount: user.referralCount || 0 })
      .then(() => setUser(prev => ({ ...prev, referralCode: code })))
      .catch(e => console.log("Referral backfill error:", e));
  }, [user?.uid]);

  const PLAN_LIMITS = { Basic: 1, Pro: 5, Premium: 20 };

  // Owner "Get Verified" — ID proof upload (Aadhaar/PAN/etc.) so admins have
  // something to review before flipping the ownerVerified flag.
  const [idProofPreview, setIdProofPreview] = useState(null);
  const [uploadingIdProof, setUploadingIdProof] = useState(false);
  const [idProofError, setIdProofError] = useState("");

  const handleIdProofUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIdProofError("");
    setIdProofPreview(URL.createObjectURL(file));
    if (!window.storage || !user?.uid) { setIdProofError("Not connected. Check your internet and try again."); return; }
    setUploadingIdProof(true);
    try {
      const ref = window.storage.ref(`verification/${user.uid}/${Date.now()}_${file.name}`);
      await ref.put(file);
      const url = await ref.getDownloadURL();
      await window.db.collection("users").doc(user.uid).update({
        verificationDocUrl: url,
        verificationRequested: true,
        verificationRequestedAt: new Date().toISOString(),
      });
      setUser(prev => ({ ...prev, verificationDocUrl: url, verificationRequested: true }));
    } catch (err) {
      console.log("ID proof upload error:", err);
      setIdProofError("Upload failed. Please try again.");
    }
    setUploadingIdProof(false);
  };

  const handleAddListing = () => {
    if (!ownerPlan) {
      // No subscription — show subscription modal
      setShowSubscription(true);
      return;
    }
    const limit = PLAN_LIMITS[ownerPlan.name] || 0;
    if (ownerListings.length >= limit) {
      alert(`Your ${ownerPlan.name} plan allows a maximum of ${limit} listing(s).\n\nUpgrade your plan to add more listings!`);
      setShowSubscription(true);
      return;
    }
    setShowListingForm(true);
  };
  const [chatPG, setChatPG] = useState(null);
  const [showAgreement, setShowAgreement] = useState(null);
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

  const liveForCategory = (cat) => liveListings.filter(l => l.category === cat);
  const currentListings = activeCategory
    ? [...(ALL_LISTINGS[activeCategory] || []), ...liveForCategory(activeCategory)]
    : [...PGS, ...liveForCategory("PG")];
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
    const matchRoommate = !filterRoommate || pg.roommateWanted;
    return matchSearch && matchType && matchGender && matchAC && matchFurnished && matchPrice && matchCity && matchRoommate;
  });
  // Featured listings (paid ads) first
  const sortedFiltered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  // Whether the app is currently showing the home/search screen with nothing
  // else open on top of it.
  const isHomeScreen = tab === "search" && !activeCategory && !selectedPG && !bookingPG &&
    !showSubscription && !showFilters && !vacationBooking && !showSupport && !showMediaUpload &&
    !showListingForm && !chatPG && !showAgreement && !complaintBooking && !showOwnerComplaints &&
    !showCityPicker && !showTerms && !showWishlist && !showBroadcasts;

  // Resets every screen/modal back to the home tab — used by the phone/browser
  // back button so navigating back from anywhere in the app always lands on
  // the home screen, instead of exiting the app or landing on a blank page.
  const goHome = () => {
    setActiveCategory(null);
    setSelectedPG(null);
    setBookingPG(null);
    setShowSubscription(false);
    setShowFilters(false);
    setVacationBooking(null);
    setShowSupport(false);
    setShowMediaUpload(false);
    setShowListingForm(false);
    setChatPG(null);
    setShowAgreement(null);
    setComplaintBooking(null);
    setShowOwnerComplaints(false);
    setShowCityPicker(false);
    setShowTerms(null);
    setShowWishlist(false);
    setTab("search");
  };

  // Push one history entry whenever we move away from the home screen, so the
  // very next back-button press has something to "undo" instead of leaving
  // the app immediately.
  useEffect(() => {
    if (!isHomeScreen) {
      window.history.pushState({ kailnestScreen: true }, "");
    }
  }, [isHomeScreen]);

  // Phone/browser back button (or swipe-back gesture) → always go home.
  useEffect(() => {
    const handlePopState = () => { goHome(); };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Show login screen if not logged in
  if (!user) return <LoginScreen onLogin={(u) => setUser(u)} lang={lang} setLang={setLang} />;

  // Admin users get a dedicated dashboard, not the tenant/owner search UI
  if (user.role === "admin") return <AdminDashboard onLogout={() => { if (window.auth) window.auth.signOut().catch(() => {}); setUser(null); }} />;

  // Show city selector after login (first time)
  if (!citySelected) return (
    <CitySelectorScreen onSelectCity={(city) => {
      setSelectedCity(city);
      setCitySelected(true);
      try {
        if (!localStorage.getItem("kailnest_onboarded")) {
          setShowOnboarding(true);
        } else if (!localStorage.getItem("kailnest_home_tooltip_seen")) {
          setShowHomeTooltip(true);
        }
      } catch (e) { /* localStorage unavailable, skip onboarding */ }
    }} t={t} />
  );

  if (showOnboarding) return (
    <OnboardingCarousel onDone={() => {
      setShowOnboarding(false);
      try {
        localStorage.setItem("kailnest_onboarded", "1");
        if (!localStorage.getItem("kailnest_home_tooltip_seen")) setShowHomeTooltip(true);
      } catch (e) {}
    }} />
  );

  if (selectedPG) return (
    <PGDetail pg={selectedPG} user={user} onBack={() => setSelectedPG(null)} onBook={pg => { setSelectedPG(null); setBookingPG(pg); }} onChat={pg => setChatPG(pg)} />
  );

  const dismissVerifiedBanner = async () => {
    setUser(prev => ({ ...prev, verifiedNoticeUnread: false }));
    try {
      if (window.db && user?.uid) {
        await window.db.collection("users").doc(user.uid).update({ verifiedNoticeUnread: false });
      }
    } catch (e) { console.log("Dismiss banner error:", e); }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      {user.role === "owner" && user.verifiedNoticeUnread && (
        <div style={{
          background: "linear-gradient(135deg, #16a34a, #15803d)", color: "#fff",
          padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, fontSize: 13
        }}>
          <span style={{ fontSize: 20 }}>✅</span>
          <div style={{ flex: 1, fontWeight: 600 }}>Your owner account has been verified! You can now list your property.</div>
          <button onClick={dismissVerifiedBanner} style={{
            background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
            borderRadius: 8, padding: "4px 10px", fontSize: 12, cursor: "pointer", flexShrink: 0
          }}>✕</button>
        </div>
      )}
      {isHomeScreen && showHomeTooltip && (
        <HomeTooltipOverlay onDone={() => {
          setShowHomeTooltip(false);
          try { localStorage.setItem("kailnest_home_tooltip_seen", "1"); } catch (e) {}
        }} />
      )}
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
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <div style={{ fontSize: 12, color: "#c7d2fe" }}>👤 {user?.name}</div>
            <div style={{ display: "flex", gap: 4 }}>
              {["en", "te", "hi"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  background: lang === l ? "#fff" : "rgba(255,255,255,0.2)",
                  color: lang === l ? "#6366f1" : "#fff",
                  border: "none", borderRadius: 8, padding: "2px 8px",
                  fontSize: 11, fontWeight: 700, cursor: "pointer"
                }}>{l === "en" ? "EN" : l === "te" ? "తె" : "हि"}</button>
              ))}
            </div>
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

            {/* Roommate Wanted quick filter — applies across all categories */}
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <button onClick={() => setFilterRoommate(r => !r)} style={{
                background: filterRoommate ? "#fff" : "rgba(255,255,255,0.2)",
                color: filterRoommate ? "#7c3aed" : "#fff",
                border: "none", borderRadius: 20, padding: "5px 14px",
                fontSize: 13, fontWeight: 600, cursor: "pointer"
              }}>🧑‍🤝‍🧑 Roommate Wanted{filterRoommate ? " ✓" : ""}</button>
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
                <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>Hello 🙏</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>What type of accommodation do you need?</div>

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
                        {ALL_LISTINGS[cat.key].length + liveForCategory(cat.key).length} listings →
                      </div>
                    </div>
                  ))}
                </div>

                {/* Featured across all categories */}
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>⭐ Featured Listings</div>
                {[...PGS, ...HOTELS, ...APARTMENTS, ...HOUSES].filter(l => l.featured).map(l => (
                  <PGCard key={l.id} pg={l} onView={setSelectedPG} onBook={setBookingPG} isWishlisted={wishlist.includes(l.id)} onWishlist={toggleWishlist} />
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

                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                      <a href={`tel:${b.phone}`} style={{ flex: 1, textAlign: "center", padding: "9px", background: "#f0fdf4", color: "#16a34a", borderRadius: 10, fontSize: 12, fontWeight: 700, textDecoration: "none", border: "1px solid #bbf7d0" }}>📞 Call</a>
                      <button onClick={() => setChatPG(b)} style={{ flex: 1, padding: "9px", background: "#eff6ff", color: "#6366f1", border: "1px solid #bfdbfe", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>💬 Chat</button>
                      <button onClick={() => setShowAgreement(b)} style={{ flex: 1, padding: "9px", background: "#f5f3ff", color: "#7c3aed", border: "1px solid #ddd6fe", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📄 PDF</button>
                      <button onClick={() => setComplaintBooking(b)} style={{ flex: 1, padding: "9px", background: "#fff", color: "#dc2626", border: "1.5px solid #fecaca", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📢</button>
                      {!isVacated && (
                        <button onClick={() => setVacationBooking(b)} style={{ flex: 1, padding: "9px", background: "linear-gradient(135deg, #f59e0b, #ef4444)", color: "#fff", border: "none", borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>🏃 Vacate</button>
                      )}
                    </div>

                    {/* Cash payment verification */}
                    {b.cashStatus === "pending" && (
                      <div style={{ marginTop: 10, background: "#fffbeb", borderRadius: 10, padding: "10px 12px", border: "1px solid #fde68a" }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: "#92400e", marginBottom: 6 }}>💵 Cash Payment Pending</div>
                        <div style={{ fontSize: 11, color: "#78350f", marginBottom: 8 }}>Have you paid the owner in cash? Confirm below.</div>
                        <button onClick={() => {
                          setBookings(prev => prev.map((bk, idx) => idx === i ? { ...bk, cashStatus: "tenant_confirmed" } : bk));
                          setOwnerNotifications(prev => [...prev, {
                            id: Date.now(), type: "cash_confirmed", pgName: b.name,
                            message: `✅ Tenant confirmed cash payment for ${b.name}.`,
                            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), read: false,
                          }]);
                        }} style={{ width: "100%", padding: "8px", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>💵 I Paid Cash — Confirm</button>
                      </div>
                    )}
                    {b.cashStatus === "tenant_confirmed" && (
                      <div style={{ marginTop: 10, background: "#fef9c3", borderRadius: 10, padding: "8px 12px", border: "1px solid #fde68a" }}>
                        <div style={{ fontSize: 12, color: "#854d0e", fontWeight: 700 }}>⏳ Cash confirmed — Owner verification pending</div>
                      </div>
                    )}
                    {b.cashStatus === "owner_verified" && (
                      <div style={{ marginTop: 10, background: "#f0fdf4", borderRadius: 10, padding: "8px 12px", border: "1px solid #bbf7d0" }}>
                        <div style={{ fontSize: 12, color: "#166534", fontWeight: 700 }}>✅ Cash Payment Complete!</div>
                      </div>
                    )}
                    {b.cashStatus === "online_paid" && (
                      <div style={{ marginTop: 10, background: "#f0fdf4", borderRadius: 10, padding: "8px 12px", border: "1px solid #bbf7d0" }}>
                        <div style={{ fontSize: 12, color: "#166534", fontWeight: 700 }}>✅ Online Payment Complete</div>
                      </div>
                    )}

                    {/* Payment status */}
                    {b.cashStatus === "pending" && (
                      <div style={{ marginTop: 10, background: "#fffbeb", borderRadius: 10, padding: "10px 12px", border: "1px solid #fde68a" }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: "#92400e", marginBottom: 6 }}>💵 Cash Payment Pending</div>
                        <div style={{ fontSize: 11, color: "#78350f", marginBottom: 8 }}>Have you paid the owner in cash? Confirm below.</div>
                        <button onClick={() => {
                          setBookings(prev => prev.map((bk, idx) => idx === i ? { ...bk, cashStatus: "tenant_confirmed" } : bk));
                          setOwnerNotifications(prev => [...prev, {
                            id: Date.now(),
                            type: "cash_confirmed",
                            pgName: b.name,
                            message: `✅ Tenant confirmed cash payment for ${b.name}. Please verify and acknowledge.`,
                            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                            read: false,
                          }]);
                        }} style={{
                          width: "100%", padding: "8px", background: "linear-gradient(135deg, #f59e0b, #d97706)",
                          color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer"
                        }}>💵 I Paid Cash — Confirm</button>
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
                <div style={{ fontSize: 13, marginTop: 4 }}>Tap the heart on a PG/Hotel card to save it</div>
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

            <button onClick={handleAddListing} style={{
              width: "100%", padding: "14px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", border: "none", borderRadius: 14, fontSize: 15,
              fontWeight: 700, cursor: "pointer", marginBottom: 10
            }}>➕ Add New PG Listing</button>

            {/* Plan status */}
            {ownerPlan ? (
              <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 12, marginBottom: 10, border: "1px solid #bbf7d0" }}>
                <div style={{ fontWeight: 700, color: "#166534", fontSize: 13 }}>✅ {ownerPlan.name} Plan Active</div>
                <div style={{ fontSize: 12, color: "#16a34a", marginTop: 2 }}>
                  {ownerListings.length} / {PLAN_LIMITS[ownerPlan.name]} listings used
                </div>
                {/* Progress bar */}
                <div style={{ background: "#dcfce7", borderRadius: 10, height: 6, marginTop: 6 }}>
                  <div style={{ width: `${(ownerListings.length / PLAN_LIMITS[ownerPlan.name]) * 100}%`, height: "100%", background: "#16a34a", borderRadius: 10 }} />
                </div>
              </div>
            ) : (
              <div style={{ background: "#fef2f2", borderRadius: 12, padding: 12, marginBottom: 10, border: "1px solid #fecaca" }}>
                <div style={{ fontWeight: 700, color: "#dc2626", fontSize: 13 }}>❌ No Active Plan</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>A subscription is needed to add a listing</div>
              </div>
            )}

            {/* Get Verified — ID proof upload */}
            {user?.role === "owner" && !user?.ownerVerified && (
              <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 14, border: "1.5px solid #e5e7eb" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>🛡️ Get Verified</div>
                {user?.verificationRequested ? (
                  <div style={{ fontSize: 12.5, color: "#92400e", background: "#fffbeb", borderRadius: 8, padding: "8px 10px" }}>
                    ⏳ ID proof submitted — verification pending admin review.
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>Upload an ID proof (Aadhaar / PAN / Voter ID) so tenants can trust your listings with a verified badge.</div>
                    {idProofPreview && (
                      <img src={idProofPreview} alt="ID preview" style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }} />
                    )}
                    {idProofError && <div style={{ fontSize: 11.5, color: "#dc2626", marginBottom: 8 }}>⚠️ {idProofError}</div>}
                    <label style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 14px",
                      background: "#eff6ff", border: "2px dashed #93c5fd", borderRadius: 10,
                      cursor: "pointer", fontSize: 13, color: "#1d4ed8", fontWeight: 600
                    }}>
                      {uploadingIdProof ? "Uploading..." : "📷 Upload ID Proof"}
                      <input type="file" accept="image/*" onChange={handleIdProofUpload} disabled={uploadingIdProof} style={{ display: "none" }} />
                    </label>
                  </>
                )}
              </div>
            )}

            {/* My Listings — with view counts */}
            {ownerListings.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📋 My Listings</div>
                {ownerListings.map(l => (
                  <div key={l.id || l.name} style={{
                    background: "#fff", borderRadius: 12, padding: "10px 14px", marginBottom: 8,
                    border: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between"
                  }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>{l.name}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                        {l.verified ? "✅ Verified" : "⏳ Pending approval"}
                      </div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 4, background: "#eff6ff",
                      color: "#1d4ed8", borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 700, flexShrink: 0
                    }}>👁 {l.views || 0}</div>
                  </div>
                ))}
              </div>
            )}

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

            {/* Invite & Earn — referral program */}
            <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 14, padding: 16, marginBottom: 16, color: "#fff" }}>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>🎁 Invite & Earn</div>
              <div style={{ fontSize: 12.5, opacity: 0.9, marginBottom: 10 }}>Share your code. When a friend you referred makes their first ₹199 listing payment, you get ₹199 wallet credit — redeemable for a free listing.</div>
              <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 18, fontWeight: 800, letterSpacing: 2, textAlign: "center", marginBottom: 10 }}>
                {user?.referralCode || ("KN" + (user?.phone || "000000").slice(-6))}
              </div>
              <div style={{ fontSize: 12.5, opacity: 0.9, marginBottom: 4 }}>👥 {user?.referralCount || 0} friend{(user?.referralCount || 0) === 1 ? "" : "s"} joined using your code</div>
              <div style={{ fontSize: 12.5, opacity: 0.9, marginBottom: 10 }}>🎁 ₹{user?.walletCredits || 0} wallet credit available</div>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Join Kailnest to find PGs, Hotels & Houses across India! Use my referral code ${user?.referralCode || ("KN" + (user?.phone || "000000").slice(-6))} when you sign up: https://kailnest.in`)}`}
                target="_blank" rel="noreferrer"
                style={{ display: "block", textAlign: "center", background: "#fff", color: "#4338ca", borderRadius: 10, padding: "10px", fontSize: 13.5, fontWeight: 700, textDecoration: "none" }}
              >📤 Share on WhatsApp</a>
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
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>No UPI ID added, log out and add one during signup</div>
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
                if (item.label === "Notifications") {
                  openBroadcasts();
                  if (window.requestPushPermission) {
                    window.requestPushPermission();
                  }
                }
                if (item.label === "Terms of Service") setShowTerms("terms");
                if (item.label === "Privacy Policy") setShowTerms("privacy");
                if (item.label === "Logout") { setUser(null); setCitySelected(false); setTab("search"); setActiveCategory(null); }
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                  {item.icon} {item.label}
                  {item.label === "Notifications" && hasNewBroadcast && (
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                  )}
                </div>
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
                message: `New booking! Tenant will pay cash, collect it on move-in day.`,
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
      {showSubscription && <OwnerSubscriptionModal user={user} onClose={() => setShowSubscription(false)} />}
      {showSupport && <CustomerSupportModal onClose={() => setShowSupport(false)} />}
      {showTerms && <TermsPrivacyModal type={showTerms} onClose={() => setShowTerms(null)} />}
      {showBroadcasts && <BroadcastsModal onClose={() => setShowBroadcasts(false)} />}
      {chatPG && <ChatModal pg={chatPG} user={user} onClose={() => setChatPG(null)} />}
      {showAgreement && <RentAgreementModal booking={showAgreement} user={user} onClose={() => setShowAgreement(null)} />}
      {showListingForm && (
        <OwnerListingForm
          onClose={() => setShowListingForm(false)}
          onSave={(listing) => {
            setOwnerListings(prev => [...prev, listing]);
            setShowListingForm(false);
          }}
          user={user}
        />
      )}
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
          user={user}
          onClose={() => setComplaintBooking(null)}
          onSubmit={(c) => setComplaints([...complaints, c])}
        />
      )}
      {showOwnerComplaints && (
        <OwnerComplaintsView
          complaints={complaints}
          currentOwnerId={CURRENT_OWNER_ID}
          onResolve={async (complaint) => {
            setComplaints(prev => prev.map(c => c.id === complaint.id ? { ...c, status: "resolved" } : c));
            try {
              if (window.db) await window.db.collection("complaints").doc(complaint.id).update({ status: "resolved" });
            } catch (e) { console.log("Complaint resolve save error:", e); }
            if (complaint.tenantPhone) {
              window.open(`https://wa.me/91${complaint.tenantPhone}?text=${encodeURIComponent(`Hi ${complaint.tenantName || ""}, your complaint about "${complaint.category}" at ${complaint.pgName} has been resolved by the owner. — Kailnest Team`)}`, "_blank");
            }
          }}
          onClose={() => setShowOwnerComplaints(false)}
        />
      )}
    </div>
  );
}

// ─── Update Banner ──────────────────────────────────────────────────────────
// Shown when the service worker detects a newer deployed version while the
// app is already open, so an active user doesn't stay stuck on stale code
// until they happen to close and reopen the app.
function UpdateBanner() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const handler = () => setUpdateAvailable(true);
    window.addEventListener("kailnest-update-available", handler);
    return () => window.removeEventListener("kailnest-update-available", handler);
  }, []);

  if (!updateAvailable) return null;

  return (
    <div style={{
      position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 99999,
      maxWidth: 430, margin: "0 auto",
      background: "#0f2a3a", color: "#fff", borderRadius: 14, padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12,
      boxShadow: "0 8px 30px rgba(0,0,0,0.35)", fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{ fontSize: 22 }}>🔄</div>
      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.3 }}>
        A new version of Kailnest is available.
      </div>
      <button onClick={() => window.location.reload()} style={{
        background: "#fff", color: "#0f2a3a", border: "none", borderRadius: 10,
        padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap"
      }}>Refresh</button>
    </div>
  );
}

const container = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(container);
reactRoot.render(
  React.createElement(React.Fragment, null,
    React.createElement(UpdateBanner),
    React.createElement(PGFinderApp)
  )
);
