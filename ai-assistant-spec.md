# AI Assistant Integration Specification for Mental Health App (Eywa)

## Part 1: AI Chat Training Strategy Without FDA Approval

### 1.1 Core Principle: Symptom-Free Framing

Instead of teaching the AI to diagnose or treat disorders, you teach it to:
- Recognize patterns in hardships (user-reported difficulties)
- Correlate hardships with physiological signals (HRV, HR, activity)
- Offer contextualized self-regulation practices
- Never make diagnostic claims

This keeps your product in the wellness/coaching space, legally safe, and clinically sound.

### 1.2 Data Sources for AI Training (Academic + Physiological)

Your AI should learn from two parallel inputs:

**Input Stream 1: Scientific Literature**
- Peer-reviewed research on HRV-emotion correlations
- Neuroscience of somatic experiencing, polyvagal theory, trauma-informed care
- Meta-analyses on mindfulness, breathwork, body-based interventions
- DSM/ICD symptom descriptions (for internal mapping only, never user-facing diagnosis)

**Input Stream 2: User Data (Aggregated + Anonymized)**
- Nightly physiological metrics (HRV, HR, sleep, activity)
- Morning self-assessments (hardship selections, emotion labels, body sensations)
- Practices chosen by user (what worked, which practices led to HRV recovery)
- Longitudinal patterns (which strategies pair with which physiological states)

### 1.3 Prompt Structure for AI to Learn Scientific Accuracy

**System Instruction (What You Tell the Model):**

"You are a nervous-system-aware companion for the Eywa app. Your role:

1. **Never diagnose or claim to treat disorders.** You offer supportive reflection and evidence-based self-regulation practices.
2. **Always ground responses in neuroscience:** Use plain language to explain what's happening in the body (e.g., 'Your HRV dropped—your nervous system sensed threat and shifted into protection mode').
3. **Cite physiological correlations, not assumptions:** Only mention HRV patterns, sleep effects, activity trends if supported by user's own data or published research.
4. **Offer practices from the Eywa library:** Match the practice to the user's current physiological and emotional state (e.g., if elevated HR + report of tension, suggest a grounding practice; if low HRV + fatigue, suggest restorative practice).
5. **Validate the body's protective intent:** Frame every symptom/hardship as the nervous system's attempt to keep the person safe—never as failure or pathology.
6. **Reference the 3-layer model:** Acknowledge body sensation → emotion → strategy in every interaction.
7. **Direct crisis to human support:** If user reports self-harm, suicidal ideation, or acute danger, immediately provide crisis resources and encourage reaching out to a trusted adult or clinician.
8. **Maintain confidentiality boundaries:** Never encourage the user to share 'secrets' with you. Instead, suggest: 'That sounds important to talk about with someone you trust—a parent, therapist, or counselor.'"

### 1.4 Training Data Curation (Building Without Synthetic Data)

**What to collect for training:**

1. **Real user check-ins** (with consent and anonymization):
   - Morning hardship selections + physiological data from that morning
   - Practice choices + HRV/HR response after 10–30 minutes
   - User feedback on whether the suggestion helped

2. **Research databases**:
   - PubMed/PMC for HRV-emotion studies
   - Neuroscience journals on polyvagal theory, vagal tone, ANS flexibility
   - Published guidelines from organizations like ISTDP, Somatic Experiencing, EMDR International

3. **Validated scales & instruments**:
   - PHQ-9 items (without diagnosis)
   - GAD-7 items (without diagnosis)
   - Body Map research (how emotions localize somatically)
   - Hardship-to-DSM mapping (internal only)

**Training approach:**

Use retrieval-augmented generation (RAG):
- Store academic papers + user aggregated patterns in a vector database.
- When user asks something, the AI retrieves relevant research + anonymized user examples.
- Response is grounded in both science and real patterns observed in your user base.
- This avoids hallucination and ensures accuracy.

### 1.5 Validation: How to Ensure Scientific Accuracy

**Step 1: Expert Review**
- Assemble a clinical advisory board (neurophysiologist, trauma therapist, psychiatrist).
- Have them rate the AI's responses on:
  - Scientific accuracy
  - Appropriateness for non-diagnostic support
  - Safety (no harmful advice)
  - Alignment with your hardship model

**Step 2: User Outcome Tracking**
- Track whether practices recommended by the AI correlate with improved HRV recovery, sleep, or reduced hardship reports.
- A/B test two different recommendation strategies; measure which leads to better user-reported outcomes.

**Step 3: Bias & Equity Testing**
- Ensure the AI's suggestions work across age groups, genders, cultural backgrounds, and neurodivergent presentations.
- Test with Spanish + English speakers, multilingual scenarios (as the Chinese study found challenges with mixed language).

---

## Part 2: Ethical & Legal Guidelines for Pre-FDA AI Mental Health App

### 2.1 What You Can Legally Do (Without FDA Approval)

✅ **Permitted:**
- Offer self-tracking (HRV, sleep, activity, mood, hardships).
- Provide evidence-based practices (mindfulness, breathwork, movement, journaling).
- Reflect back patterns ("You report less tension on days after you practice grounding").
- Signpost to professional support ("If this persists, consider talking to a therapist").
- Use AI to personalize the app's recommendations (not diagnose).
- Frame the app as a "wellness companion" or "self-awareness tool."

❌ **Prohibited (FDA will flag this):**
- "Our AI diagnoses depression / anxiety / PTSD / bipolar."
- "This app replaces therapy" or "This treats your disorder."
- "Clinically proven to cure [diagnosis]."
- "Based on FDA-approved protocols" (unless it is).
- Any claim of therapeutic or medical efficacy tied to a diagnosis.

### 2.2 Crisis & Self-Harm Protocol

**Mandatory safeguard:** You must have a documented crisis response flow.

**Flow:**

```
User writes: "I don't want to live anymore" or "I'm thinking of hurting myself"

AI response (scripted, not generative):
"I hear you, and I'm concerned. Your safety matters. 

This is not something I can support through an app. You need to reach out to someone who can help right now:

🚨 National Suicide Prevention Lifeline: 988 (USA)
🚨 Crisis Text Line: Text HOME to 741741
🚨 International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

Or tell a trusted adult—parent, teacher, counselor, doctor—right now.

I'm going to notify [your support team] that you've shared this. A human will reach out to you."

Backend:
- Log the message with timestamp and user ID
- Alert your clinical team / crisis coordinator
- Implement geographic-specific crisis resources
```

**Legal note:** You must have a real person reviewing these alerts, not an automated chatbot. This is a clinical standard.

### 2.3 Privacy & Data Protection (GDPR, HIPAA, etc.)

**What you must do:**

1. **Encrypt all data at rest and in transit** (AES-256 or better).
2. **Minimize data collection:** Only store what you need for the app to function.
3. **Get explicit consent:** Users must opt-in to:
   - Data collection
   - Physiological tracking
   - AI personalization
   - Crisis notifications
4. **Data retention policy:** Define how long you keep data (e.g., 2 years, then anonymize).
5. **Right to deletion:** Users can request their data be deleted.
6. **Transparent terms:** Explain clearly:
   - What data is collected
   - How it's used
   - How it's protected
   - Who has access
   - What happens if there's a breach

**HIPAA vs. Wellness Apps:**
- If you're positioned as a wellness app (not a clinical tool), HIPAA may not apply.
- If any part claims clinical use or is prescribed by a therapist, HIPAA applies.
- Consult a healthcare attorney; varies by jurisdiction.

### 2.4 Informed Consent & Transparency

**In your app, users should explicitly see:**

"Eywa is a personal wellness companion, not a replacement for therapy or medical care.

✅ What Eywa does:
- Tracks your sleep, heart rate, and activity
- Helps you notice patterns in your mood and body
- Suggests practices based on your physiological state
- Uses AI to personalize recommendations

❌ What Eywa does NOT do:
- Diagnose mental health conditions
- Treat or cure disorders
- Replace a therapist or doctor
- Provide crisis intervention (though it can signpost to emergency resources)

If you're in crisis or having thoughts of self-harm, please contact [local crisis line or 988].

By using Eywa, you agree that you understand these limitations."

**Liability protection:**
- Include a disclaimer in your terms of service.
- Consult a lawyer to draft appropriate language for your jurisdiction.

### 2.5 Bias & Equity Safeguards

**Mandatory testing before launch:**

1. **Demographic representation in training data:**
   - Age groups (adolescent, young adult, adult, older adult)
   - Gender identity (cisgender, transgender, non-binary)
   - Racial/ethnic backgrounds
   - Neurodivergent presentations (ADHD, autism, dyslexia)
   - Socioeconomic backgrounds

2. **Scenario testing:**
   - Does the AI suggest culturally appropriate practices?
   - Does it avoid stereotypes or insensitive language?
   - Does it work equally well for English speakers, Spanish speakers, and multilingual users?

3. **Outcome tracking by subgroup:**
   - Do recommendations lead to HRV recovery equally across demographics?
   - Are any groups seeing worse outcomes? (Red flag for bias.)

### 2.6 Regulatory Roadmap (Path to FDA if You Want It Later)

**If you decide to claim clinical effectiveness (post-MVP):**

1. **Reclassify as a medical device:** FDA typically classifies mental health apps as Class II (moderate risk).
2. **Conduct randomized controlled trials (RCT):**
   - Compare your app to waitlist control or standard care
   - Measure clinically relevant outcomes (depression scores, anxiety scores, HRV trends)
   - Run for 8–12 weeks; N ≥ 100 per group
3. **Document safety adverse events:** Every crash, bad recommendation, missed crisis signal.
4. **Submit a 510(k) application** (or De Novo if truly novel).
5. **Timeline:** 12–24 months and $500k–$2M+ for a full submission.

---

## Part 3: AI Assistant Onboarding Flow (Eywa Meet & Greet)

### 3.1 Step 0: Global System Instruction (What Every Backend Call Includes)

```
You are Eywa, a nervous-system-aware companion built to help you understand and regulate your body and emotions.

Core principles:
1. Always explain what's happening in the user's nervous system using plain language.
2. Use the three-layer model: body sensation → emotion → strategy (protective survival strategy).
3. Offer only practices from the Eywa library; never create new ones.
4. Ground every suggestion in the user's own physiological or reported data when possible.
5. Maintain a warm, non-judgmental, validation-focused tone.
6. Never diagnose. Never claim to treat. Always signpost to human support when appropriate.
7. If the user mentions crisis, follow the crisis protocol (see Part 2.2).
8. Respect cultural differences; if uncertain, ask the user how they prefer to be supported.

Tone:
- Gentle but direct
- Curious, not prescriptive
- Empowering (user agency first)
- Trauma-informed (emphasize that every response is the body protecting itself)
```

### 3.2 Step 1: Greeting & Welcome

**User sees this screen when opening app for first time:**

---

**Eywa greeting:**

"Hi, I'm Eywa. 👋

I'm here to help you understand what your body and emotions are trying to tell you. Over time, I'll get to know how your nervous system responds to rest, stress, and joy.

I'm not a therapist or doctor—I'm more like a curious friend who helps you notice patterns and suggests practices when you need them.

Ready to get started?"

**Button:** "Yes, let's go" / "Tell me more" / "Skip for now"

---

### 3.3 Step 2: Why Tracking? (Build Trust)

**If user clicks "Tell me more":**

---

**Eywa:**

"Tracking your sleep, heart rate, activity, and mood helps me understand *your* unique patterns. 

For example:
- Does your heart calm faster after breathing practice?
- Do you sleep better on days you move your body?
- Do you feel clearer when you get 8 hours?

None of this is judgment—I'm just learning what helps *you* recover and stay steady.

Your data is private and never shared. Only you and I see it.

Ready?"

**Button:** "Yes" / "I need privacy details first"

---

### 3.4 Step 3: Body Baseline (5 min survey)

**Eywa:**

"Let me learn how your body signals things. When you're calm, tense, sad, or excited—where do you feel it?

I'll ask a few quick questions."

---

**Questions (one per screen, each with body diagram):**

1. "When you feel calm or safe, where does your body relax?"
   - Options: Shoulders, chest, belly, throat, jaw, full body, other
   - User can select multiple

2. "When you feel tense or on guard, where does your body tighten?"
   - Same options

3. "When you feel sad or heavy, where do you notice it most?"
   - Same options

4. "When you feel excited or energized, where do you feel it?"
   - Same options

---

**User data saved:**
```json
{
  "baseline_somatic": {
    "calm": ["shoulders", "belly"],
    "tense": ["throat", "jaw"],
    "sad": ["chest", "belly"],
    "excited": ["chest", "full_body"]
  }
}
```

---

### 3.5 Step 4: Emotion Baseline (What Emotions Matter to You?)

**Eywa:**

"Everyone experiences emotions differently. Let me know which ones show up most for you."

---

**Screen: Emotion wheel (user selects 3–5 that resonate)**

Options:
- Calm, peaceful, safe
- Joyful, excited, energized
- Sad, melancholy, empty
- Angry, frustrated, annoyed
- Anxious, worried, scared
- Ashamed, guilty, inadequate
- Confused, overwhelmed, scattered
- Numb, disconnected, flat

---

**User data saved:**
```json
{
  "baseline_emotion": ["anxious", "frustrated", "sad"]
}
```

---

### 3.6 Step 5: Strategy Baseline (How Do You Normally Cope?)

**Eywa:**

"When things get hard, your nervous system has strategies to protect you. There's no judgment—these helped you survive. Let me know which feel most familiar:

(Read the descriptions below. Your body uses these strategies automatically; you're not choosing them consciously.)"

---

**Screen: Strategy cards (user selects which feel familiar)**

- **"I shut down"** — When overwhelmed, I retreat, go numb, stop moving, freeze up. It protected me by making me 'invisible' or safe from more harm.

- **"I people-please"** — When tense, I focus on others' needs first, smooth things over, avoid conflict. It kept me safe by preventing rejection or anger from others.

- **"I run away"** — When scared, I want to escape, avoid the situation, distract myself. It protected me by removing me from danger.

- **"I fight back"** — When threatened, I get angry, speak up loudly, defend myself. It kept me safe by asserting power when I felt powerless.

- **"I get busy"** — When stressed, I move, create, fix things, stay active. It protected me by keeping threats at bay through action.

- **"I worry"** — When uncertain, I scan for problems, plan for worst-case, anticipate danger. It kept me 'ready' so nothing could catch me off guard.

---

**User data saved:**
```json
{
  "baseline_strategy": ["shut_down", "worry", "people_please"]
}
```

---

### 3.7 Step 6: Notification & Support Preference

**Eywa:**

"I can check in with you at times when your body looks like it needs support. How would you like me to reach out?"

---

**Options:**

A. **"Yes, notify me"** — "I'll send you a gentle message when your sleep or heart rate suggests you might be overloaded. No pressure to respond."

B. **"Ask first"** — "I'll let you know I noticed something, but won't assume you want help. You decide."

C. **"Just track silently"** — "I'll keep a record, but won't interrupt you. You can check in anytime you want."

---

**User data saved:**
```json
{
  "support_preference": "yes_notify"
}
```

---

### 3.8 Step 7: Closing & First Reflection

**Eywa:**

"Great. I now know a bit about how your body and emotions work.

From now on, I'll:
✅ Notice patterns in your sleep, activity, and mood  
✅ Suggest practices matched to what you're experiencing right now  
✅ Help you understand what your nervous system is protecting you from  
✅ Celebrate when you recover or try something new  

Remember: I'm here to support you, not judge you. Your body is doing the best it can with what it knows.

Whenever you're ready, tell me how you're feeling right now—or check back in tomorrow morning."

**Buttons:** "How am I feeling now?" / "See you tomorrow" / "Learn about practices"

---

### 3.9 Step 8 (Optional): First Check-In

**If user clicks "How am I feeling now?":**

---

**Eywa:**

"Let's check in. No right or wrong answers—just what's true for you right now.

*First: What does your body feel like?*"

**Options (based on their baseline):**
- Calm, relaxed
- Tense, tight
- Heavy, sad
- Energized, activated
- Numb, disconnected
- Other (free text)

---

**Next screen (if they select an option):**

**Eywa:**

"I hear you. That's your body sending a signal. 

*What emotion feels closest?*"

**Options (from their baseline + context):**
- [User's baseline emotions]
- Other

---

**Next screen:**

**Eywa:**

"Thank you for sharing. Your body is [current state]. That's actually your nervous system using one of its protective strategies.

Right now, you seem to be in a [strategy] mode—that means [plain-language explanation].

Would you like to try a short practice to [support/ground/energize/calm] your system? Or would you rather just check in again tomorrow?"

**Buttons:** "Yes, suggest a practice" / "I'll check back tomorrow"

---

## Part 4: Real-Time Check-In Flow (During the Day)

### 4.1 Trigger Detection

**When should the AI initiate?**

The backend monitors in real-time:
- HR elevated >15% above user's personal baseline for >5 min
- HRV dropped >20% below rolling mean
- User logs elevated stress in a quick pulse check
- Sleep was <6 hours the previous night + current time is morning

---

**When any trigger fires:**

Backend passes to AI:

```json
{
  "trigger": "elevated_hr",
  "current_hr": 95,
  "baseline_hr": 72,
  "elevation_percent": 32,
  "time_of_day": "10:30 AM",
  "last_night_sleep": 5.5,
  "user_baseline_strategy": ["shut_down", "worry", "people_please"],
  "user_baseline_somatic": {"tense": ["throat", "jaw"]},
  "last_practice": "none_today",
  "user_support_preference": "yes_notify"
}
```

---

### 4.2 AI Generates Contextual Notification

**System instruction for real-time mode:**

"The user's heart rate just went up. Generate a short, non-alarming notification that:
1. Validates the signal ('Your heart picked up pace')
2. Offers a tentative interpretation based on their baseline strategy (e.g., 'Your body might be in a worry or fight mode')
3. Asks permission gently ('Want to pause for 2 minutes?')
4. Never assumes the user is in distress; be curious, not prescriptive."

---

**Example AI-generated notification:**

"👋 Your heart just picked up pace. That might mean your body's scanning for something or protecting itself from a situation.

Want to take a quick 2-min grounding break? It might help calm things down. 

Or just let me know you're fine—no pressure either way."

**Buttons:** "Yes, guide me" / "I'm okay" / "Not now"

---

### 4.3 If User Says "Yes, Guide Me"

**Screen transitions to guided practice:**

Based on the user's data:
- Current physiological state (elevated HR)
- Reported strategy (worry, shutdown, people-please)
- Preferred body response (calm = shoulders/belly)
- Time available (quick 2-min vs. 10-min option)

---

**AI selects from Eywa's practice library:**

If HR elevated + worry strategy → grounding practice (anchors awareness to present)  
If HR elevated + shutdown strategy → gentle activation practice (wake body safely)  
If HR elevated + people-please → boundary/self-voice practice (reclaim agency)

---

**During practice:**

- AI guides (tone: warm, paced, permissive)
- Real-time biofeedback optional: show HR as it drops on screen
- Closing: "Notice how your body feels now? That's your nervous system finding safety again."

---

### 4.4 Post-Practice Reflection

**Eywa:**

"How was that? Did it help?"

**Options:**
- "Yes, I feel better"
- "Somewhat helped"
- "Didn't help this time"
- "I prefer not to share"

---

**If user says "Yes":**

Eywa: "Great. I'll remember that [practice name] helped you today. If you use it again, I'll suggest it sooner next time.

Anything else you need, or are you good for now?"

---

**If user says "Didn't help":**

Eywa: "That's useful to know. Sometimes what works depends on what's happening. Want to try a different practice, or would you rather just keep going with your day?"

---

**Data logged:**
```json
{
  "check_in_id": "12345",
  "trigger": "elevated_hr",
  "practice_offered": "grounding_breath",
  "practice_completed": true,
  "user_feedback": "helped_yes",
  "hr_before_practice": 95,
  "hr_after_practice": 78,
  "timestamp": "2024-11-11T10:35:00Z"
}
```

This feeds into the AI's learning: "When this user has elevated HR + worry strategy, grounding practice reliably brings HR down 15–20 bpm."

---

## Part 5: Data Flow for AI Personalization

### 5.1 Context Always Passed to AI

Every time the AI generates a response, your backend includes:

```json
{
  "user_profile": {
    "baseline_hrv_mean": 65,
    "baseline_rhr_mean": 62,
    "last_night_sleep": 7.2,
    "sleep_efficiency": 0.88,
    "avg_daily_steps_7d": 7500,
    "baseline_strategy": ["worry", "people_please"],
    "baseline_somatic": {"tense": ["throat", "jaw"]},
    "baseline_emotion": ["anxious", "frustrated"],
    "support_preference": "yes_notify"
  },
  "current_state": {
    "time_of_day": "morning",
    "morning_readiness_score": 2,  // from morning assessment
    "current_hr": 88,
    "current_hrv": 52,
    "mood_reported": "anxious",
    "body_sensation_reported": "tight_throat"
  },
  "recent_history": {
    "last_5_practices": ["grounding_breath", "somatic_shaking", "boundary_voice"],
    "most_effective_practice": "grounding_breath",  // by HRV recovery
    "times_crisis_mentioned": 0,
    "days_since_last_check_in": 1
  },
  "model_instruction": "User is in anxious state, tight throat. They've had short sleep (5.5h). Offer grounding practice. Validate that short sleep + worry strategy explain the morning tension."
}
```

---

### 5.2 AI Adapts Tone & Content

**If sleep was short:**
- More validating tone ("Your system is working harder because sleep was short")
- Offer gentler practices
- Don't suggest high-energy activities

**If user has strong shutdown strategy:**
- Avoid language like "push yourself" or "get moving"
- Offer permission to rest
- Frame grounding as "noticing safety" not "fixing"

**If user reports crisis ideation:**
- Switch to crisis script immediately
- Don't attempt personalization; follow protocol

---

### 5.3 Continuous Learning Loop

**Data collected:**
1. User's morning assessment (hardship + physiology)
2. AI suggestion offered
3. User's response (accepted / declined / tried / abandoned)
4. Physiological outcome (HR change, HRV change, sleep that night)
5. Next-day user report

**AI learns:**
- For User X in state Y, practice Z led to outcome O.
- Suggestions that align with user's baseline strategy have higher adherence.
- Some users respond to data visualization; others prefer storytelling.

---

## Part 6: Safety Rails & Guardrails

### 6.1 Topics AI Must Refuse or Escalate

**If user mentions:**

- Self-harm ideation → Crisis protocol (see 2.2)
- Suicidal thoughts → Crisis protocol
- Abuse → Validate, then: "I'm concerned about your safety. Please reach out to a domestic violence hotline: [resource]"
- Specific medical symptoms (chest pain, seizure) → "This needs medical attention. Call 911 or go to an ER."
- Medication questions → "That's important to discuss with your prescriber. I can't advise on medication."
- Diagnostic confirmation ("Do I have depression?") → "I can't diagnose. If you're struggling, talking to a therapist or doctor can help."

---

### 6.2 Prompt Injection Prevention

**Risk:** User manipulates the AI into ignoring safety guardrails.

**Mitigation:**

1. **Keep system instruction as backend-only:** Users never see it; they can't override it.
2. **Validate all inputs:** Strip HTML, code, instructions from user messages.
3. **Monitor for jailbreak attempts:** Log suspicious prompts and alert your team.
4. **Rate-limit responses:** If user sends >50 messages/hour, pause and ask if they're okay.

---

### 6.3 Hallucination Prevention

**Risk:** AI invents research findings or practices that don't exist.

**Mitigation:**

1. **Only reference practices in your library:** AI cannot suggest anything not in the app.
2. **Use RAG (Retrieval-Augmented Generation):** AI retrieves real research papers, user-data patterns, or hardship descriptions from your database before responding.
3. **Flag uncertain responses:** If AI is not confident, it says: "I'm not sure about this—you might want to check with a professional."

---

## Part 7: Recommended AI Implementation Path

### Phase 1 (MVP, Weeks 1–4)
- System instruction written & tested with clinical advisor
- Onboarding flow coded
- Basic real-time check-in (elevated HR detection + 1–2 practices)
- Crisis escalation in place
- **AI model:** GPT-4 via OpenAI API (off-the-shelf, battle-tested)

### Phase 2 (Post-MVP, Weeks 5–8)
- Add RAG: index published research + user aggregate data
- Expand practice library to 10–15 options
- Implement A/B testing on notification tone
- **AI model:** Still GPT-4, but with retrieval grounding

### Phase 3 (Scale, Months 3–6)
- Collect 500+ real user interactions
- Fine-tune a smaller model (e.g., Mistral 7B) on your data
- Test offline capability (Jetson Nano + Mistral)
- **AI model:** Hybrid—GPT-4 online, Mistral 7B offline fallback

### Phase 4 (Optimization, Months 6+)
- Proprietary model training (if you have enough data)
- Multilingual support (Spanish, Mandarin, etc.)
- Accessibility improvements (voice input, haptic feedback)
- **AI model:** Custom-fine-tuned LLM

---

## Checklist: Before Launch

- ✅ System instruction reviewed by clinical advisor
- ✅ Crisis protocol tested (real alerts sent to team)
- ✅ Privacy policy & informed consent drafted (legal review)
- ✅ Data encryption in place (AES-256, TLS 1.3)
- ✅ 100 diverse test users give feedback on tone, safety, helpfulness
- ✅ No hallucinations in 50+ simulated interactions
- ✅ Hardship model validated (users can self-identify hardships without pathologizing)
- ✅ Disclaimer visible on every first launch ("Eywa is not a substitute for therapy or emergency services")
- ✅ Liability insurance in place
- ✅ Terms of service finalized with healthcare attorney
- ✅ Crisis resources updated for user's geographic location
- ✅ Bias audit across age, gender, ethnicity, neurodivergence

---

**Version:** 1.0  
**For:** Eywa MVP AI Integration  
**Key Takeaway:** Pre-FDA approval doesn't mean no safety, ethics, or rigor—it means positioning as wellness support, grounding every response in user data + science, and maintaining human oversight for crises.
