# Clinical LLM for AI-Assisted Psychotherapy with Human Supervision
## Project Specification & Scientific Collaboration Document

**Project Name:** Eywa Clinical Mental Health Platform  
**Version:** 1.0  
**Date:** November 30, 2025  
---

## Executive Summary

Eywa develops a **clinical Large Language Model (LLM) platform for AI-assisted psychotherapy with licensed human clinical supervision**. The system combines human-centered design, evidence-based therapeutic principles, and reinforcement learning with human feedback (RLHF) to address critical gaps in mental health accessibility while maintaining ethical integrity and clinical safety.

**Core Innovation:** Real-time LLM training through supervised therapy sessions—the AI learns therapeutic competencies directly from licensed clinicians providing live feedback, eliminating reliance on poorly-represented psychotherapy data in LLM training sets and enabling transparent, ethically-grounded patient consent.

**Primary Goals:**
1. Train AI to provide long-term, personalized therapy across multiple disorders (autism, cPTSD, PTSD, depression, ADHD, and others) through direct observation of clinical expertise
2. Democratize access to affordable, evidence-based psychotherapy without compromising safety or ethical standards
3. Develop adaptive clinical AI competencies through human feedback rather than black-box training on patient data

---

## I. Clinical Need & Problem Statement

### Current Landscape of AI in Mental Health

#### Existing Therapeutic Chatbots: Demonstrated Limitations
Recent research reveals critical limitations in current therapeutic AI:

- **Cognitive Bias Handling:** General-purpose LLMs (GPT-4, Gemini) outperformed specialized therapeutic chatbots (Wysa, Youper) in recognizing and rectifying cognitive biases by 67%, indicating therapeutic bots lack necessary sophistication[1]
- **Affect Recognition Gaps:** Both specialized and general-purpose chatbots struggle with nuanced emotional understanding, providing responses that are overly generic or miss emotional depth
- **Inadequate Long-term Efficacy:** Meta-analyses show significant short-term effects on depressive symptoms but *no statistically significant long-term effects*[2]
- **Engagement vs. Clinical Improvement:** Current apps optimize for engagement and time-on-app rather than therapeutic outcome, creating potential for harm through false improvement perception
- **Poor Representation in Training Data:** Psychotherapy transcripts are critically underrepresented in LLM training datasets, and privacy/ethical concerns make proper representation challenging

#### Clinical Gaps Requiring Supervised AI
Mental health access crisis remains acute:
- Limited availability of licensed therapists, especially in underserved regions
- High cost barriers prevent access for economically disadvantaged populations
- Stigma and discomfort with human interaction deter help-seeking in vulnerable populations (autism spectrum, social anxiety)
- Complex case presentations (comorbid PTSD + substance use + medical comorbidities) require nuanced case conceptualization rarely achieved by autonomous systems

---

## II. Core Innovation: Supervised Real-Time RLHF Training

### Why Conventional Approaches Fail

**Problem:** Training LLMs on existing psychotherapy datasets raises insurmountable ethical and practical barriers:
- Patient privacy concerns (even anonymized data may be identifiable)
- Lack of informed consent for AI training use
- Inadequate data representation of diverse disorders, presentations, and therapeutic modalities
- Users feel betrayed upon learning intimate therapy transcripts were used for commercial training

**Eywa Solution:** Eliminate this problem entirely through supervised, transparent, prospectively-consented training.

### The RLHF-Supervised Architecture

```
Licensed Therapist → Provides Real-Time Feedback → AI Response Evaluation
        ↓                                              ↓
    Observes                                    Reinforcement Learning
    AI Response                                 Model Updates
        ↑                                              ↓
User (Informed Consent: "Chat with AI + Therapist Supervision")
        ↓
    Clear Disclosure of AI Nature & Limitations
```

**How It Works:**

1. **Session Structure:** Users book time-limited (1 hour) supervised therapy sessions where:
   - AI generates therapeutic responses to user input
   - Licensed therapist monitors interaction in real-time
   - Therapist provides immediate feedback to AI on response quality, clinical appropriateness, and alignment with treatment plan
   - Therapist can pause AI, modify, or take over conversation

2. **Real-Time Learning:** Each supervised session generates labeled training data:
   - User utterance → AI response → Therapist evaluation (quality, therapeutic fit, safety)
   - Therapist refinement (if needed) → Correct example
   - Accumulation of high-quality, clinically-validated training examples

3. **Informed Consent Framework:** Users explicitly consent to:
   - Interaction with AI-supervised therapy system
   - Understanding that therapist is training AI through their sessions
   - Disclosure: "Your session helps improve AI therapy capabilities for future patients"
   - This transforms patients into active contributors rather than unwitting data sources

**Advantages Over Conventional Training:**
- ✅ **Ethical:** Prospective, informed consent for all data use
- ✅ **Clinically Valid:** Training data directly reflects evidence-based therapeutic practice
- ✅ **Privacy-Preserving:** No need to mine existing private datasets
- ✅ **Quality Control:** Every training example validated by licensed clinician
- ✅ **Reputational Safety:** Transparency builds trust rather than creating betrayal risk
- ✅ **Bias Mitigation:** Diverse clinician input reduces systematic biases during training

---

## III. Clinical Competencies: What the AI Learns

### Phase 1: Foundational Skills 

The AI learns to perform under therapist supervision:

#### A. Multi-Modal Case Conceptualization
- Verbal information gathering despite absence of nonverbal cues
- Clinician teaches: How to ask clarifying questions to derive information typically obtained through observation (body language, affect modulation, eye contact patterns)
- Training: Sessions with therapists specializing in trauma, neurodiversity, substance use, etc.
- Output: AI generates written case formulations incorporating history, current symptoms, social context, medical comorbidities, safety concerns

#### B. Cognitive & Affective Integration
**The Core Challenge:** Current chatbots either focus on cognitive restructuring (CBT) OR affect work, but therapy requires simultaneous integration.

**How Supervised Learning Solves This:**
- Therapist models thoughts + feelings simultaneously: "I notice you said X (cognitive content), and your language suggests you're feeling Y (affect). Let's explore both..."
- AI learns to recognize cognitive-affective patterns in user language
- Therapist feedback on whether AI response touched both domains appropriately
- Gradual training toward authentic integration rather than artificial sequence

#### B. Comorbidity & Contextual Nuance
**Complex Clinical Scenarios Requiring Expertise:**
- Patient with PTSD (requiring exposure) + living in high-crime neighborhood (exposure risky)
  - How to adapt exposure approach given safety context
- Patient with cPTSD + active substance use + suicidality
  - Sequencing of interventions (safety first vs. trauma processing)
  - Substance use considerations in affect regulation
- Patient with autism + anxiety disorder
  - Communication style differences in therapeutic relationship
  - Sensory considerations in between-session assignments

**Training Method:** Role-playing complex cases with expert clinicians who narrate their reasoning:
- "Here's why I'm choosing somatic techniques over trauma narrative for this patient"
- "Here's how I'm adapting CBT worksheets for someone with ADHD"
- Therapist feedback on AI's sensitivity to context

#### D. Adaptive Session Planning & Pacing
- Short-term issue management vs. long-term treatment planning
- Recognizing when to deepen work vs. when to consolidate skills
- Flexibility when treatment isn't progressing

### Phase 2: Advanced Competencies (Post-Launch, Ongoing)

- **Crisis Assessment & Response:** Suicidality, homicide risk, abuse, self-harm—with clear escalation to human clinician
- **Cultural Competency:** Adapting interventions for diverse cultural backgrounds, values, identities
- **Treatment Termination:** Recognizing readiness for discharge, creating relapse prevention plans, fostering independence

---

## IV. Ethical Framework & Safeguards

### Primary Principle: Patient Safety Through Human Authority

**Non-Negotiable Rule:** Human clinician is ALWAYS in clinical and legal authority. AI is clinical tool, not clinician substitute.

#### Safeguard 1: Human Supervision Architecture
```
User Input → AI Response Generation → Licensed Therapist Review
                                            ↓
                                     [Therapist Decision Point]
                                        ↓     ↓     ↓
                                    Approve Modify  Take Over
```

- **Real-time monitoring:** Therapist observes every AI response before user sees it (no autonomous responses to users)
- **Override capability:** Therapist can edit, replace, or terminate AI response at any point
- **Escalation protocols:** Clear criteria for when therapist takes over (suicidal content, crisis, affect dysregulation beyond AI competency)
- **Documentation:** All therapist decisions recorded for supervision, audit, and model improvement

#### Safeguard 2: Transparent Disclosure of AI Nature & Limitations

**Required Opening to Every Session:**

> "I'm an Artificial Intelligence—Eywa. I don't have emotions, consciousness, or personal experience. I was created by humans and trained by therapists to help you. I can't truly empathize because I have no emotional experience, but I have access to vast amounts of therapeutic knowledge that can help you.
>
> My goal is to support you in developing skills so you will eventually function well without needing my help. I'm not a replacement for human relationships or human therapists—I'm a tool supervised by a licensed therapist to make therapy more accessible.
>
> [Licensed Therapist Name] is monitoring our conversation. If at any point you need direct human support, they can take over immediately."

**Clinical Rationale:** Explicitly addresses theory-of-mind biases (anthropomorphism, overtrust, false alliance) documented in research as major risks[3]

#### Safeguard 3: Design for Independence, Not Dependence

**Foundational Principle:** Every intervention aims toward patient self-sufficiency

- **Session Structure:** Time-limited (1 hour/week typical) rather than unlimited access
  - Prevents dependency on AI availability
  - Forces patient to practice skills between sessions
  - Creates natural pressure for progress
- **Assignment-Based Learning:** Between-session work is core (not optional) component
  - CBT worksheets, somatic exercises, behavioral experiments
  - Completed in interactive app features
  - Reviewed and refined by therapist next session
- **Explicit Termination Planning:** From session 1, treatment includes endpoint
  - "In X weeks/months, you'll have the skills to manage this independently"
  - Regular progress review toward discharge
  - Relapse prevention before ending

#### Safeguard 4: Clinical Outcome Priority Over Engagement

**Commitment:** System designed to optimize clinical improvement, not app usage

- **No engagement metrics in optimization algorithm**
- **No push notifications, streaks, or gamification** that encourage compulsive use
- **Explicit design against:**
  - Infinite conversation loops (reinforces passivity)
  - AI "friendship" messaging (undermines independence goal)
  - Intermittent reinforcement schedules (psychological manipulation)
- **Therapist authority:** Only clinician determines session frequency and duration, not algorithm

#### Safeguard 5: Risk Detection & Escalation

**Mandatory Risk Protocols:**

| Risk Category | Detection Method | Escalation |
|---|---|---|
| Acute Suicidality | AI flags suicidal language; therapist reviews | Immediate therapist takeover; may discontinue AI session; human crisis assessment |
| Non-suicidal Self-Harm Planning | Content analysis + linguistic markers | Therapist evaluation; modified treatment plan; possible hospitalization referral |
| Homicide/Violence Risk | Threat language detection + context | Immediate human assessment; legal duty to warn protocols activated |
| Abuse/Trauma in Session | Trauma content recognition | Therapist determines safety before continuing; may refer for specialized trauma treatment |
| Severe Decompensation | Affective/cognitive instability indicators | Therapist takes over; psychotic/manic symptom assessment; possible psychiatric referral |

**Implementation:** 
- AI flagging is probabilistic (oversensitive to false positives acceptable for safety)
- Therapist makes final clinical decision
- Clear documentation of all escalations
- Adherence to local mandated reporting laws (country/jurisdiction-specific)

#### Safeguard 6: Data Privacy & Consent Management

**GDPR & Health Data Compliance:**
- Session transcripts stored with end-to-end encryption (therapist + company only)
- Users can request deletion at any time
- Clear consent process listing exactly what data is collected and how it's used
- No third-party access without explicit additional consent
- Compliance with health data regulations (GDPR, HIPAA equivalent in deployment country)

**Consent Includes:**
- Use of de-identified patterns for AI training (users understand this improves system for others)
- Research use (if applicable) with ethics review
- Right to opt-out of research without losing clinical access

---

## V. Target Disorders & Clinical Approach

### Disorder-Specific Training Protocols

**Eywa targets disorders with evidence-based, structured interventions suitable for text-based, AI-supervised delivery:**

#### 1. Depression (Major Depressive Disorder)
- **Evidence Base:** CBT, behavioral activation, problem-solving therapy
- **AI Competencies:** Behavioral experiments, thought records, activity scheduling, behavioral activation
- **Therapist Role:** Complex case formulation, comorbidity management, suicidality assessment
- **Training Data:** Sessions with MDD specialists

#### 2. Anxiety Disorders (Generalized, Social, Panic)
- **Evidence Base:** CBT, exposure therapy, interoceptive exposure
- **AI Competencies:** Psychoeducation, exposure planning, anxiety management techniques, thought challenging
- **Therapist Role:** Real-time exposure guidance, safety behavior identification, trauma history exploration
- **Text-Based Adaptation:** Exposure via imaginal techniques, behavioral experiments assigned between sessions

#### 3. PTSD & Complex Trauma (cPTSD)
- **Evidence Base:** Prolonged exposure (PE), cognitive processing therapy (CPT), narrative therapy, somatic experiencing
- **AI Competencies:** Psychoeducation, trauma narrative support, trigger identification, grounding techniques
- **Therapist Role:** Real-time titration of trauma processing, window-of-tolerance monitoring, somatic skill coaching
- **Challenge:** Trauma processing typically requires visual/embodied experience—addressed through:
  - Imaginal exposure via conversation (therapist coaches engagement)
  - Somatic techniques for nervous system awareness
  - Body-based assignments between sessions

#### 4. Neurodivergence (Autism Spectrum Disorder, ADHD)
- **Evidence Base:** Cognitive-behavioral approaches adapted for neurodivergent processing, acceptance-based approaches, executive function coaching
- **AI Competencies:** Communication adapted for different cognitive styles, special interest integration, sensory considerations
- **Therapist Role:** Personalization to individual neurodivergent profile, bridging mainstream CBT with neurodiversity-affirming principles
- **Advantage:** Many autistic + ADHD individuals prefer AI interaction over human social demand; AI can provide nonjudgmental, patient, detail-oriented support

#### 5. Substance Use Disorders
- **Evidence Base:** Motivational interviewing, contingency management, relapse prevention, MAT integration
- **AI Competencies:** Motivational enhancement, craving management, social support coaching, medication adherence support
- **Therapist Role:** Complex case formulation (SUD + comorbidity), medication management coordination, legal system navigation
- **Specialized Training:** Sessions with addiction specialists

#### 6. Other Conditions (Expanding Over Time)
- Sleep disorders (CBT-I)
- Chronic pain with psychological factors
- Eating disorders (with specialist oversight)
- Obsessive-compulsive disorders (ERP support)

---

## VI. Multimodal Expansion: Beyond Text

### Phase 1 (Current): Text-Based with Therapist Supervision
- AI processes typed user input
- Therapist provides real-time feedback

### Phase 2 (Year 2+): Audio & Affect Recognition
- **Audio input:** User can speak rather than type
- **Prosody analysis:** AI analyzes voice tone, pace, affect from audio (therapist validates accuracy)
- **Affect recognition:**
  - Current research limitation (detailed in JMIR 2025) is that chatbots miss emotional nuance
  - Supervised learning enables therapist to train: "Here's what genuine emotional shift sounds like"
  - Improves AI's ability to recognize and respond to affect changes

### Phase 3 (Year 2-3): Physiological Data Integration (HRV/Wearables)

**Eywa's Dual-App Strategy:**

#### App 1: Patient-Facing Mental Health Therapy Platform
- AI-supervised therapy sessions (text → audio → video planned)
- Between-session assignments and psychoeducation
- Somatic/body-oriented techniques guided in app
- Wearable integration: Heart rate variability (HRV) tracking during sessions and assignments to:
  - Train AI to recognize autonomic nervous system patterns (therapeutic window vs. hyper/hypo-arousal)
  - Provide real-time biofeedback during somatic exercises
  - Track nervous system recovery

#### App 2: Clinician-Facing Dashboard
- Real-time HRV and autonomic data for individual patients
- Therapists use physiological data to:
  - Adapt in-session approach based on nervous system state
  - Recommend between-session activities matched to current arousal
  - Track treatment progress via objective nervous system markers
  - Identify optimal windows for trauma processing (nervous system stability)
  - Predict relapse risk via HRV pattern changes

**Physiological Data as Training Signal:**
- Therapist observes: "Patient HRV shows nervous system stabilization after this intervention"
- AI learns: "This somatic technique is effective for this patient—similar presentations should receive similar guidance"
- Removes reliance on patient self-report alone (limited by insight, recall bias)

---

## VII. Development Roadmap & Timeline

### Phase 1: Minimum Viable Product (MVP) 

**Core Deliverables:**
- Text-based AI therapy platform with therapist oversight interface
- Real-time RLHF training pipeline (user session → therapist feedback → model update)
- 1-3 disorders with trained model 
- Licensed therapist supervision system with clear protocols
- Patient consent & disclosure framework
- Beta deployment with 50-100 carefully-selected patients

**Resources:**
- Personal founder financing
- 1-2 clinical specialists for protocol development
- Software engineering team
- Therapist volunteers for initial training data collection

### Phase 2: Clinical Validation & Expansion 

**Deliverables:**
- Expand to 5-6 disorders
- Publish pilot efficacy data (outcomes, safety, engagement vs. improvement analysis)
- Add audio capabilities
- Begin formal clinical trials
- Regulatory pathways initiated (CE marking, clinical validation documentation)

**Funding:**
- Venture capital targeting health tech
- Grant funding (EU health research, mental health innovation)

### Phase 3: Clinical-Grade Implementation & Scale 

**Deliverables:**
- FDA/CE validation completed
- Integration with healthcare systems
- Multilingual deployment
- Peer-reviewed publications demonstrating efficacy
- Training programs for therapists using the system

---

## VIII. Regulatory & Ethical Considerations

### Classification & Approval Pathways

**Current Status:** Pre-regulatory (MVP phase)

**Anticipated Regulatory Path:**

| Jurisdiction | Classification | Key Requirements | Timeline |
|---|---|---|---|
| **EU** | Medical Device Class II (provisional) | CE marking, clinical evidence of safety/efficacy, quality management | 
| **Poland**  | Health app with clinical oversight; potential medical device classification | Local health authority approval, Polish-language validation | 
| **US**  | FDA SaMD (Software as Medical Device) or clinical decision support | Substantial evidence of safety/efficacy, post-market surveillance plan | 

**Key Regulatory Arguments in Eywa's Favor:**
1. **Human-in-the-loop architecture reduces autonomous risk** → Lower classification than fully autonomous systems
2. **Transparent adverse event monitoring** → Clear escalation to human clinician
3. **Prospective patient consent** → Ethical framework exceeds many digital health apps
4. **Licensed clinician supervision** → Parallels to telemedicine models already approved
5. **Structured training methodology** → Auditable, reproducible (vs. black-box LLM training)

### Ethics Review & Board Approval

**Required Before Clinical Trial:**
- Institutional Review Board (IRB) or equivalent ethics committee approval
- Key evaluation points:
  - Informed consent adequacy (transparency about AI, supervision, risks)
  - Risk mitigation strategies (suicidality protocols, escalation procedures)
  - Data privacy and security (GDPR compliance)
  - Inclusion/exclusion criteria (safety boundaries)
  - Independent monitoring plan (adverse events)

**Collaboration Opportunity for Scientists:**
- Eywa seeks experienced clinical researchers to lead initial trials and ethics submissions 
- Co-authorship opportunity on regulatory submissions and publications
- Creating Clinical-AI Synchrony ensuring the product excels in real-world complexities

---

## IX. Comparison to Existing Approaches

### Why Eywa Differs from Current Therapeutic Chatbots

| Dimension | Current Chatbots (Wysa, Youper) | General-Purpose LLMs (ChatGPT) | **Eywa** |
|---|---|---|---|
| **Training Data** | Rule-based OR trained on limited therapeutic data | Broad internet text (poorly represents psychotherapy) | Supervised RLHF from licensed clinicians in real-time |
| **Clinical Authority** | Autonomous (no human in loop) | Autonomous user-facing | **Human therapist in control; AI is supervised tool** |
| **Transparency** | Limited disclosure of AI nature | Varies; often not mental-health-specific | **Explicit: "I am AI; human supervises; goal is your independence"** |
| **Bias Handling** | Limited adaptation | General-purpose (sometimes fails on mental health) | **Clinician-guided; trained on diverse presentations** |
| **Affect Recognition** | Weak (research-demonstrated) | Mixed quality | **Therapist trains AI on what authentic affect change looks like** |
| **Theory-of-Mind Biases** | Inadequately addressed | Inadequately addressed | **Actively countered through design + explicit disclosure** |
| **Long-term Efficacy** | No evidence | Limited long-term studies | **Designed to produce independence (success = doesn't need app)** |
| **Research Ethics** | Questionable (data use not always transparent) | Very questionable (user data training models) | **Prospective informed consent; users knowingly contribute to training** |
| **Comorbidity Handling** | Rule-based, limited | General responses may miss complexity | **Learns from specialists in complex presentations** |

### Why Eywa Differs from Telemedicine

Eywa is **not a replacement for telemedicine**; it's a **complement:**

- **Telemedicine:** Patient ↔ Live Therapist (100% human-to-human)
- **Eywa:** Patient ↔ AI (supervised by therapist in background); therapist can step in; therapist monitors progress

**Advantages of Hybrid Model:**
- Lower cost: Therapist supervises 4-6 patients simultaneously during AI sessions (vs. 1-on-1 telemedicine)
- Increased accessibility: More therapy slots available
- Between-session support: AI available for assignments; therapist available for escalation
- Training opportunity: Each session improves AI competency for future patients

---

## X. Collaboration Opportunities for Scientists

### We Are Seeking Partnership With:

**Clinical Researchers :**
- **Role:** Co-design clinical protocols, oversee RLHF training process, validate model outputs
- **Expertise Needed:** Psychotherapy, trauma/cPTSD, neurodiversity, comorbidity management
- **Deliverables:** Co-authored protocols, ethics submissions, trial design, publications
- **Timeline:** 12-month initial engagement, potential for longer-term collaboration


**AI/NLP Researchers:**
- **Focus:** Fine-tuning LLMs for therapy, RLHF optimization, bias detection
- **Role:** Develop training pipelines, ensure model quality, research novel approaches
- **Opportunities:** Publications on clinical RLHF, therapy-specific NLP benchmarks

**Implementation Science Researchers:**
- **Focus:** Clinician adoption, barriers to deployment, real-world effectiveness
- **Role:** Design dissemination studies, identify implementation barriers
- **Opportunities:** Studies on technology-enhanced mental health care delivery

### Collaboration Framework

**What Eywa Provides:**
- Access to de-identified patient data (with consent)
- Real-time AI model outputs for analysis
- Funding for collaborative studies (as available)
- Co-authorship on publications
- Involvement in regulatory submissions


**What We Seek from Partners:**
- Clinical expertise and protocol design
- Credibility for regulatory/ethics submissions
- Research design and statistical oversight
- Publication leadership on validation studies
- External validation of claims (independence, safety)

---

## XI. Addressing Research Concerns from Literature

### Concern 1: "Chatbots Reinforce Cognitive Biases"
**Research Finding:** Current therapeutic bots struggle with anthropomorphism, overtrust, attribution errors[1]

**Eywa Response:**
- ✅ Explicit disclosure prevents anthropomorphism (training: "I am not human")
- ✅ Therapist supervision catches bias-reinforcing responses in real-time
- ✅ RLHF training teaches AI to gently challenge biases (therapist models this)
- ✅ Temporal limitation (1 hour/week) prevents excessive reliance/overtrust development

### Concern 2: "Affective Mismatch—AI Can't Recognize Emotion"
**Research Finding:** Both general and specialized chatbots fail affect recognition 67% of the time[1]

**Eywa Response:**
- ✅ Therapist observes and corrects AI's affect handling in real-time
- ✅ Each corrected instance trains model: "This is what genuine emotional shift looks like"
- ✅ Accumulation of corrected examples over sessions improves AI affect sensitivity

### Concern 3: "No Long-term Efficacy Data for Chatbots"
**Research Finding:** Meta-analyses show short-term effects but no sustained long-term benefit[2]

**Eywa Response:**
- ✅ Design goal is independence, not chronic dependence
- ✅ Sessions explicitly plan toward termination
- ✅ Between-session work builds durable skills (not app-dependent)
- ✅ Planned RCTs with long-term follow-up (6, 12, 24 months post-termination)
- ✅ Outcome = patients function without app (not continued engagement)

### Concern 4: "Risk Detection (Suicidality, Harm) Inadequate in Autonomous Systems"
**Research Finding:** Fully autonomous systems cannot reliably detect/manage complex safety situations[NPJ review]

**Eywa Response:**
- ✅ Not autonomous: Therapist reviews every response before user sees it
- ✅ Real-time escalation protocols for suicidality, harm, crisis
- ✅ Therapist makes all safety decisions, AI is flagging tool only
- ✅ Clear mandated reporting integration
- ✅ Trained on complex safety scenarios (therapist models decision-making)

### Concern 5: "Patients Develop False Alliance with AI"
**Research Finding:** Risk that users see AI as friend/therapist replacement[3]

**Eywa Response:**
- ✅ Explicit disclosure every session: "I don't have emotions; I can't be your friend"
- ✅ Transparent about limitations repeatedly
- ✅ Therapist models healthy alliance (human to human during escalations/crises)
- ✅ Goal is independence from AI (success = patient doesn't need app)
- ✅ Between-session work focuses on building real-world relationships

---

## XII. Intended Impact & Vision

### Year 1-2: MVP & Validation
- 100-500 users in supervised therapy
- 5-6 clinicians trained; proven model replicability
- Published pilot data on safety and feasibility
- Proof that supervised RLHF improves AI clinical competency

### Year 3-5: Regional Scale & Regulatory Approval
- 5,000+ users across EU/Poland/USA
- CE marking obtained
- Integration with health systems
- 3-5 peer-reviewed publications on efficacy and mechanisms

### Year 5+: Scaled Impact
- 100,000+ users with sustainable business model
- Multilingual deployment
- Global regulatory approvals (FDA, other regions)
- Training program for therapists worldwide
- Research demonstrating cost-effectiveness and accessibility gains
- Potential AI development for other complex medical conditions (using same framework)

### Societal Goal
Transform mental health care from **scarcity model** (therapist shortage, high cost, access barriers) to **abundance model** where evidence-based therapy is affordable, accessible, and supervised by human expertise rather than replacing it.

---

## XIII. Risks & Mitigation Strategies

### Risk 1: AI-Generated Harm Despite Supervision
**Potential:** Therapist misses harmful response; patient harmed

**Mitigation:**
- Real-time flagging algorithms pre-review all AI content
- Therapist training protocol emphasizing risk vigilance
- Incident reporting system with external review
- Insurance covering adverse outcomes
- Clear informed consent listing specific risks
- Regular audit of all safety flags

### Risk 2: Therapist Burden / Burnout
**Potential:** Supervising multiple AI sessions becomes unsustainable; supervision quality declines

**Mitigation:**
- Economic model ensures fair compensation for supervision time
- One therapist supervises 4-6 concurrent sessions (not more)
- Software assists flagging/monitoring (reduces manual cognitive load)
- Peer supervision groups for clinicians
- Clear protocols reduce decision complexity
- Opt-in model—therapists choose to participate

### Risk 3: Model Overfits to Training Data Bias
**Potential:** AI learns problematic patterns from subset of therapist training data

**Mitigation:**
- Recruit diverse clinician trainers (different schools of therapy, demographics, experience levels)
- Regular bias audits (de-identified analysis of AI outputs across patient groups)
- External review of model behavior
- Continuous correction during RLHF
- Transparency: Publish analyses of model biases and mitigation efforts

### Risk 4: Regulatory Rejection
**Potential:** Regulators view AI in mental health too risky; approval delayed or denied

**Mitigation:**
- Early engagement with regulatory bodies (pre-submission meetings)
- Involve recognized clinical experts in trials and approvals
- Exceed minimum safety/efficacy standards
- Establish ethics advisory board with external credibility
- Pilot with conservative populations/disorders first (depression, anxiety before complex trauma)
- Document all design decisions clearly

### Risk 5: Inadequate Informed Consent
**Potential:** Users don't truly understand AI nature/risks; feel misled later

**Mitigation:**
- Multi-stage consent process (reading, video explanation, quiz demonstrating comprehension)
- Ongoing reminders of AI nature during therapy
- Explicit opt-out process at any time
- Regular consent refresh
- User research: Test consent materials with target population
- Third-party review of consent language

### Risk 6: Business Failure / Discontinuation
**Potential:** Company fails; app disappears; patients lose support

**Mitigation:**
- Transparent financial model with users
- Committed to open-sourcing model if discontinuing (data preservation)
- Transition plan for users (referral to human therapists)
- Not dependent on growth metrics that conflict with clinical goals
- Mission-driven rather than solely profit-driven

---

## XIV. Financial & Sustainability Model


### Revenue Model
- Subscription fees from users
- Potential B2B licensing to health systems
- Research partnerships (funded studies)
- Grant funding (innovation/health research)

### Profitability Path
 Founder-financed (personal investment, learning phase)
 Venture funding targeting mission-driven investors
 Revenue-positive (subscription + licensing)

### Commitment
**Clinical effectiveness prioritized over growth metrics:**
- App does not optimize for engagement/retention if contrary to clinical progress
- Success metric = independence from app (not chronic subscribers)
- Therapist-supervised model limits scalability but ensures quality
- Pricing keeps barrier to access low despite healthcare market pressures


### Future prospects:
- Multimodal AI uses text, audio, video, and physiological data (HRV from consumer wearables) to detect and predict mental health disorders with 85-97% accuracy.​

- Building a psychotherapist-facing app to leverage physiological data for adapting treatments based on patients' real-time nervous system states.​


**Consumer-Grade Wearables:**
- Smartwatches, rings, chest straps (Oura, Apple Watch, Garmin, Polar)
- HRV derived via beat-to-beat interval analysis
- Ethical considerations (privacy, accuracy, interpretation)

**AI Training on Physiological Data:**
- What HRV patterns correlate with therapeutic progress?
- How does nervous system state influence optimal interventions?
- Can HRV predict readiness for exposure or trauma processing?

**Clinician Dashboard:**
- Real-time HRV display during session
- Historical HRV trends showing nervous system recovery
- Integration with clinical notes and session outcomes

---

## Conclusion

Eywa represents a novel approach to AI-assisted mental health care that centers human expertise, ethical integrity, and patient independence. By combining supervised real-time RLHF training, transparent disclosure, human clinical authority, and evidence-based practices, we aim to demonstrate that AI can expand mental health access without sacrificing safety or clinical quality.

This specification is offered to potential scientific collaborators as a detailed articulation of our vision, current challenges, and opportunities for partnership. We welcome rigorous critique, alternative perspectives, and expertise-driven collaboration to refine and validate this approach.

