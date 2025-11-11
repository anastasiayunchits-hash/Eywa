# Quick Reference: Q&A on Battery Algorithm Implementation

## Q1: rMSSD vs SDNN - Which is Better?

**Answer: Use rMSSD as PRIMARY metric**

**Justification:**
- rMSSD measures **beat-to-beat parasympathetic (vagal) tone**, which is exactly what reflects nervous system's capacity to recover and relax
- Perfect for nightly measurements on consumer wearables (Oura, WHOOP, Fitbit, Apple Watch)
- More responsive to **daily changes** in stress, recovery, sleep quality
- Shows 10-15% drop in HRV within 24 hours of poor sleep (actionable signal)
- Standard in all leading recovery apps (Oura readiness, WHOOP recovery, Elite HRV)

**When to use SDNN (secondary):**
- If you want to capture **longer-term ANS balance** (use 60-day trend, not daily)
- Better for detecting chronic dysregulation patterns over weeks
- Requires 24-hour measurement (impractical for consumer devices)
- Use as sanity check: SDNN should trend upward if person is healing

**Artifact sensitivity:**
- rMSSD is **more sensitive to bad data** than SDNN (413% increase with single artifact vs 54% for SDNN)
- Auto-filter any recording segment with >0.9% artifactual beats
- Flag user to clean device contact if sustained artifact rate >1.4%

---

## Q2: Seven-Day Rolling Average - Consecutive Days Required?

**Answer: NOT strictly required, but strongly preferred**

**Practical handling:**
- **0-1 days missing:** Interpolate using linear regression from adjacent days
- **2 days missing:** Use 5-day rolling average for that gap
- **3+ days missing:** Skip that window; resume rolling average once new data available
- **Intermittent gaps (e.g., 3 forgotten nights in 2 weeks):** Algorithm still works; use available data; mark confidence as 0.7 instead of 1.0

**Formula for weighted rolling average (gives more weight to recent days):**
```
HRV_7day_rolling = (
    HRV[n-6]×1.0 + HRV[n-5]×1.1 + HRV[n-4]×1.2 + HRV[n-3]×1.3 +
    HRV[n-2]×1.4 + HRV[n-1]×1.5 + HRV[n]×1.5
) / (1.0+1.1+1.2+1.3+1.4+1.5+1.5)
```

**Why this weighting matters:**
- Recent days have 1.5x more influence (nervous system changes are recent-biased)
- Older data in the 7-day window adds stability (prevents single bad night from dominating)
- Roughly mimics biological "recency bias" in how body adapts to patterns

---

## Q3: Scoring Each Component - Average vs. Extremes vs. Raw?

**Answer: Use 7-day weighted rolling average for ALL components**

| Component | Method | Why |
|-----------|--------|-----|
| HRV | 7-day weighted avg | Smooths daily noise (±15% normal fluctuation); reveals trajectory |
| Resting HR | 7-day weighted avg | Night-to-night variance high; rolling avg more stable signal |
| Sleep Duration | 7-day unweighted avg | Fairly stable; no need for recency weighting |
| Sleep Efficiency | 7-day unweighted avg | Same duration; judge vs. weekly goal |
| Daily Steps | Show daily total + 7-day avg | Context: "today 8,000 steps vs. your 7,000 avg" |
| Subjective Readiness | 7-day unweighted avg | Mood evolves; rolling avg captures trajectory |

**Why NOT use single daily values:**
- Creates anxiety: erratic battery score = confusing
- Normal ANS fluctuation ±15% day-to-day; single day unrepresentative
- Example: one bad night shouldn't show "battery: 20%"; rolling avg smooths this

**Why NOT use min/max extremes:**
- Min (worst day): single outlier, doesn't reflect actual capacity
- Max (best day): unrealistic aspiration
- Battery = **typical capacity**, not best-case scenario

**Why 7 days (not 3 or 14)?**
- **3 days:** Too short; captures noise, not meaningful patterns
- **7 days:** Captures weekly cycle (Mon-Sun), accounts for weekly patterns
- **14 days:** More stable but slower to detect recent changes (not ideal for daily app feedback)
- Research shows athletes need ~7 days to see training effects on HRV

---

## Q4: Sleep Penalty Logic - How to Implement?

**Answer: Apply hard penalty if sleep-deprived, even if other metrics look good**

```
Morning Battery Score = (weighted average of 6 components)

Sleep_Penalty = 0

// Severe sleep deprivation check
if Night_Sleep_Duration < 5 hours:
    Sleep_Penalty = 20 points + special alert
    Message: "🔴 CRITICAL: <5 hours sleep. High accident/injury risk. Consider calling in sick."

// Sleep deprivation check  
if Night_Sleep_Duration < 6 hours:
    Sleep_Penalty = 15 points
    Message: "⚠️ <6 hours sleep triggers sleep debt. Nervous system in recovery mode. Minimize stress today."

// Sleep fragmentation check
if Sleep_Efficiency < 70%:
    Sleep_Penalty += 10 points
    Message: "⚠️ Fragmented sleep reduces restoration. If sustained 3+ nights, investigate."

Final_Battery = max(0, min(100, (Battery_Score - Sleep_Penalty)))
```

**Why this matters (neurophysiology):**

After 1 night <6 hours:
- HRV drops 10-15% next day (measured)
- RHR elevated 3-5 bpm
- Perceived fatigue increases 40-60%
- But user might have "good HRV" from compensatory sympathetic response

After 2-3 nights <6 hours:
- Immune function suppressed 20-30%
- Cognitive impairment starts (reaction time +50ms)
- Mood dysregulation, anxiety spike
- Metabolic rate drops (conservation mode)

After 5+ nights <6 hours:
- ANS dysregulation entrenched
- Increased accident risk 5-10x
- Hypertension begins to develop
- Infection susceptibility high

**Penalty prevents false security:** Someone with decent HRV but 5 hours sleep is in **compensatory state** (sympathetic overactivity masking fatigue). Algorithm prevents app saying "you're ready to train!" when objectively depleted.

---

## Baseline Collection: How Many Days of Best/Worst?

**Optimal Recommendation:**
- **Minimum:** 2-3 days rated 5/5 (excellent) + 2-3 days rated 1/5 (poor)
- **Standard:** 5-7 days each extreme
- **High confidence:** 10+ days each extreme

**Why these ranges:**

| Days Collected Each | Confidence | Risk |
|---|---|---|
| 2-3 | 60% | Single outlier could skew baseline (illness, anomaly) |
| 5-7 | 80% | Good coverage; captures typical variation |
| 10+ | 95% | High confidence; accounts for individual personality |

**Practical protocol:**

**Week 1-2 (Days 1-14): Let data occur naturally**
- Don't artificially create good/bad days
- Expect: 2-4 poor days, 2-4 excellent days, rest neutral
- If user only reports 3-3-3 every day: either very resilient OR lacks emotional awareness

**Week 3 (Days 15-21): Intentional collection (optional)**
- Seek one "recovery day": minimal activity, lots of sleep → aim for 5-point rating
- Expose to one stressor or skip sleep → aim for 1-point rating
- Helps algorithm understand YOUR individual response signature

**If variance insufficient by Day 21:**
- Proceed anyway; flag low confidence (0.65 multiplier on scores)
- Continue collecting; recalibrate after 60 days with more variance

**Key insight:** The app learns **your personal correlation** between physiology and how you feel. This differs hugely between individuals.

---

## Baseline Update: How Often & How?

**Recalibration Schedule: Every 30-60 days**

**Shorter interval (30 days) if:**
- Sustained upward trend in HRV/RHR/subjective readiness (healing detected)
- User reports major life change (therapy breakthrough, job change, moved, new practice)
- Active treatment phase (somatic coaching, medication adjustment)
- You want faster feedback on interventions

**Longer interval (60 days) if:**
- User is stable on current baseline (not in intervention)
- Prevents over-correction from noise or temporary spikes
- Allows baseline to shift gradually rather than abruptly

**Recalibration Algorithm:**

```
Compare past 30-60 days to previous baseline:

Percent_Change = (New_HRV_Baseline_Mean - Old_HRV_Baseline_Mean) / Old_HRV_Baseline

if Percent_Change > +10%:
    // Improvement detected → update baseline
    HRV_Baseline = New_HRV_Baseline_Mean
    Notify: "Your nervous system capacity has improved! ⬆️"

if Percent_Change between -10% and +10%:
    // Stable → keep baseline, note stability
    No change to algorithm

if Percent_Change < -10%:
    // Deterioration detected → investigate
    // Apply conservative recalibration (50/50 weighted average)
    HRV_Baseline = (Old_Baseline + New_Baseline) × 0.5
    Notify: "Your recovery capacity has decreased. Check: stress, sleep, illness. Seek support if sustained."
```

**Safeguards against maladaptive recalibration:**

1. **Illness detection:** If RHR >baseline+8 for 3+ days → flag as infection; exclude from baseline recalibration
2. **Acute stress events:** User logs "major stressor"; exclude 3-7 days post-event from recalibration
3. **Medication changes:** Exclude 2-4 weeks post-new-medication from baseline shift
4. **Prevent downward drift:** Safeguards ensure baseline doesn't progressively lower just from chronic stress

---

## Morning Self-Assessment: Frequency & Periodicity

**Frequency: DAILY, immediately upon waking (within 30 min)**

**Why morning timing:**
- Catecholamine levels naturally high upon waking
- Memory for sleep quality degrades throughout day
- Morning is optimal window to capture sleep effects
- Before new stressors accumulate

**Questions (1-5 scale):**
1. "How did you sleep?" (1=Restless, 5=Deep & nourishing)
2. "Do you feel it's enough for you?" (1=Completely unrefreshed, 5=Completely energized)
3. "Ready to face the day?" (1=Unsteady/tense, 5=Empowered/focused)

**Periodicity & Updates:**

**Can sleep efficiency change with time?** YES
- Natural 5-10% day-to-day variation (based on sleep debt, circadian misalignment, environment)
- Sustained >10% shift indicates underlying change (new disorder, stress improvement, or successful intervention)
- Monitor via rolling 7-day average + recalibration every 30-60 days

**Update frequency:**
- Collect morning self-assessment: daily
- Recalculate sleep efficiency rolling average: weekly (every 7 days)
- Update component weights: every 30-60 days (during recalibration)

**How many times to ask about sleep efficiency specifically?**
- Collect from wearable automatically every night (no need to ask user)
- Only ask user about subjective sufficiency (Q2) once per morning
- This way: objective + subjective sleep data combined

---

## Baseline Collection: How Many Days Before First Battery Score?

| Days of Data | Status | Recommendation |
|---|---|---|
| 1-4 days | Insufficient | Don't show battery score yet; collect more data |
| 5 days | Minimum | Can show preliminary score but flag as "low confidence" |
| 14 days | Standard | Recommended launch; good personalization |
| 30 days | Optimal | High-confidence personalization; ready for production |

**Best practice:**
- Collect 5 days → show preliminary battery score (0.6 confidence)
- Collect 14 days → show confident battery score (0.85 confidence)
- Collect 30 days → recalibrate with high confidence (1.0)

---

## Battery Spending Algorithm: Stress & Activity Integration

**Core principle:** Battery depletes throughout day based on:
1. Time in elevated HR zones (sympathetic activation)
2. Deviation from personal resting baseline
3. Activity level (steps, exercise)

**Hourly drain formula:**

```
For each hour:

HR_Elevation = HR_current - RHR_baseline

Strain_Zone_1 (<50% HR_max): 0-2% drain/hour
Strain_Zone_2 (50-60%): 2-5% drain/hour
Strain_Zone_3 (60-70%): 5-10% drain/hour
Strain_Zone_4 (70-85%): 10-15% drain/hour
Strain_Zone_5 (>85%): 15-20% drain/hour

if Daily_Steps > Baseline_Daily_Steps:
    Activity_Multiplier = 1 + ((steps - baseline) / baseline) × 0.3
    Hourly_Drain *= Activity_Multiplier
```

**Example:**
- RHR baseline: 60 bpm, age 35, HR_max ~185 bpm
- Hour 10am: HR avg 95 bpm (~80% max = Zone 4), 1200 steps vs. 600 baseline
- Zone 4 base drain: 12% per hour
- Activity multiplier: 1 + (600/600 × 0.3) = 1.3
- **Actual drain: 12% × 1.3 = 15.6%**

**Contextual modulation:**

- **Planned workout (user logs it):** 0.7x drain multiplier (adaptive stress, not threat)
- **Unplanned high activity:** 1.3x drain multiplier (unexpected stressor)
- **Rest day (user logs it):** +5 battery bonus if activity truly minimal
- **Psychological stress (high worry, low HR but HRV drops 20%):** 1.5x drain multiplier (signifies anxiety hyperarousal)

---

## Somatic Practices & Battery Restoration

**Concept:** Guided practices (meditation, breathwork, somatic exercises) *actively restore* battery beyond passive rest.

**Detection:**
```
Somatic_Practice_Bonus if:
  - User logs practice (meditation, yoga, breathwork, somatic exercise)
  - HR drops >10 bpm sustained over 5+ minutes
  - HRV increases >15% during session
  - Respiratory rate drops to 5-6 breaths/min (coherent breathing)

Restoration_Bonus = (
    HR_drop × 0.5 +
    HRV_increase_percent × 0.3 +
    Duration_minutes × 0.1
) / 10

Maximum: +5% battery per 30-min session
```

**Examples:**
- Box Breathing (10 min): ~+1.5% battery
- Yoga Flow (30 min, HR drop 20 bpm): ~+4% battery
- Somatic Experiencing (20 min): ~+3% battery
- Meditation (30 min): ~+4% battery

**Why include this:**
- Empowers users to see that *active recovery works*
- Provides immediate feedback for therapeutic interventions
- Mental health context: "This practice restored 3% battery; do 2x daily for week to rebuild 20%"

---

## Special Populations & Advanced Features

### Trauma/PTSD Recovery
- Track **HRV Coefficient of Variation (CV)** — in trauma it's high (erratic); in recovery it decreases
- Calculate **Healing Progress Index** comparing week 1 vs. week 12
- Show trajectory: "Your nervous system's capacity has improved 8% this month. Congratulations."

### Menstrual Cycle (if applicable)
- HRV typically 10-15% lower in luteal phase (days 15-28) due to progesterone
- Calculate separate baselines for follicular vs. luteal phases
- Reduces false alarms for cycle-related readiness dips

### Medication Tracking
- User logs new medication start date
- Exclude next 14-21 days from baseline recalibration (meds take time to plateau)
- Monitor: if RHR +10 or HRV drops, alert user to potential side effect

---

## Summary Table: Key Implementation Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Primary HRV Metric** | rMSSD (nightly) | Best for consumer wearables & daily recovery tracking |
| **Primary RHR Metric** | Lowest HR during sleep | Reflects parasympathetic dominance |
| **Rolling Average Window** | 7 days, weighted | Captures weekly patterns; recent-biased |
| **Baseline Period (Minimum)** | 5 days | Preliminary score only |
| **Baseline Period (Standard)** | 14 days | Recommended production launch |
| **Baseline Period (Optimal)** | 30 days | High-confidence personalization |
| **Recalibration Frequency** | Every 30-60 days | Detect healing trajectories (±10% change threshold) |
| **Component Weighting** | HRV 25%, RHR 20%, Sleep 20%, Subjective 15%, Activity 12%, Circadian 8% | Based on leading wearable science |
| **Sleep Penalty** | -15 if <6 hrs; -10 if efficiency <70%; -20 if <5 hrs | Prevents misleading "ready" when sleep-deprived |
| **Battery Range** | 0-100% | Green ≥80, Yellow 60-79, Orange 40-59, Red <40 |
| **Self-Assessment Frequency** | Daily, within 30 min of wake | Optimal for memory & hormonal window |
| **Morning Assessment Questions** | 3 questions (1-5 scale each) | Sleep quality + sufficiency + daily readiness |
| **Somatic Practice Bonus** | +1 to +5% per session | Rewards active parasympathetic engagement |

---

**Document Version:** 1.0  
**For:** Quick Reference During Development  
**Key Takeaway:** rMSSD + 7-day rolling average + sleep penalty + dynamic recalibration = accurate, responsive, trauma-informed recovery tracking
