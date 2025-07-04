
# 🌐 EchoRoom – Anonymous Mental Health Support Platform

> **"Where unspoken thoughts find a voice."**
> EchoRoom is a global, anonymous mental health support platform that connects individuals struggling with depression, anxiety, and emotional isolation to peer communities and verified mental health professionals—powered by AI for sentiment detection, safety, and emotional awareness.

---

## 🧠 About the Project

In a world full of noise, **EchoRoom** is the space where people can express their unspoken feelings without judgment. Users can:

* Join anonymous themed chatrooms
* Talk 1-on-1 with others feeling the same
* Write and react to journal entries
* Get real-time emotional analysis powered by AI
* Connect with verified mental health experts

All while remaining **completely anonymous** and secure.

---

## ✨ Key Features

* 🔐 **Anonymous Login:** UUID-based identity, no signup needed
* 💬 **Themed Chat Rooms:** Real-time global chat on topics like heartbreak, loneliness, exam stress
* 🤝 **1-on-1 Peer Matching:** Anonymous conversations with others going through similar struggles
* 🧠 **AI-Powered Sentiment Analysis:** Detects emotional tone and flags high-risk content using Gemini API
* 📓 **Journaling + Community Reactions:** Anonymous mental health journaling with support from others
* 👨‍⚕️ **Doctor & Counselor Connection:** Verified professionals available via chat or video call
* 🌍 **Multilingual Support:** Translate messages in real-time for cross-language support
* 🆘 **Emergency Help Access:** Direct links to global suicide prevention and crisis support resources

---

## 🧰 Tech Stack

### 🖥️ Frontend

* `React` + `Next.js`
* `Tailwind CSS` + `Shadcn UI`
* `Zustand` / `Context API` for global state
* `Socket.IO` (for real-time chat)

### 🔧 Backend

* `Node.js + Express` / `Next.js API Routes`
* `MongoDB` / `Supabase`
* `Python + FastAPI` (for AI services)
* `Redis` (optional for queueing chat matches)

### 🤖 AI & NLP

* **Gemini Pro API** for:

  * Sentiment detection
  * Emotion tagging
  * Toxicity filtering
  * Real-time mental health tips

> **Gemini API Key (used internally):**


### 📹 Video / Chat APIs

* `Daily.co` / `Agora` for doctor video chat
* `Firebase` (fallback for real-time messaging)

---

## 📦 Project Structure

```
/client
  /components
  /pages
  /context
  /services
  /styles

/server
  /routes
  /controllers
  /models
  /ai
    - sentiment.py (Gemini)
    - journal_analyzer.py
```

---

## 🚀 Getting Started (Local Dev)

1. **Clone the repo**

```bash
git clone https://github.com/<your-org>/echoroom.git
cd echoroom
```

2. **Install dependencies**

```bash
cd client
npm install
# (in a new terminal)
cd ../server
npm install
```

3. **Create `.env` files**
   For both `client` and `server`, set up your `.env`:

```
NEXT_PUBLIC_GEMINI_API_KEY=your-api-key
MONGO_URI=<your-mongodb-uri>
```

4. **Run the app**

```bash
# In server/
npm run dev

# In client/
npm run dev
```

---

## 🛡️ Ethics & Privacy

* No personal information is stored
* End-to-end encrypted chats
* Users can leave or block at any time
* AI alerts are designed for *support*, not surveillance
* Complies with GDPR and Mental Health Act (India, 2017)

---

## 🌍 Target Audience

* Students, working professionals, teenagers, and anyone facing mental health issues
* Urban and rural deployment supported
* Available globally

---

## 🙌 Contributing

We welcome open-source contributors! Want to add a feature, improve UI/UX, or enhance moderation logic? Open an issue or submit a PR.

---

## 📫 Contact & Socials

* 🧠 **Project Lead:** Srikanth Karthikeyan
* 🌐 \[Live Website Coming Soon]
* 📧 For collaborations or partnerships: `msrikanthkarthikeyan@gmail.com`

---

## 🫂 Our Mission

> Mental health care shouldn't be a privilege. EchoRoom strives to make it a right—open, anonymous, and safe for every human being.

---

