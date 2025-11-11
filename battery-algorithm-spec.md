# Nervous System Battery Algorithm Specification
## Wearable-Based Recovery & Readiness Scoring for Mental Health

---

## Executive Summary

This specification outlines a **dynamic, personalized algorithm** for calculating a "Nervous System Battery" score that reflects autonomic nervous system (ANS) recovery capacity and physiological readiness. The battery metaphor represents autonomic flexibility—the parasympathetic nervous system's capacity to mobilize resources and restore homeostasis throughout the day.

The algorithm operates in **two distinct stages**: (1) **Baseline Calibration Phase** (days 1-14+), where personal reference values are established, and (2) **Dynamic Monitoring Phase**, where real-time battery scores are calculated with continuous baseline recalibration every 30-60 days to account for nervous system healing trajectories (e.g., recovery from trauma, PTSD, depression).

---

## PART 1: TECHNICAL FOUNDATION & SCIENTIFIC RATIONALE

### 1.1 Metric Selection: RMSSD vs. SDNN

**Recommendation: PRIMARY = RMSSD | SECONDARY = SDNN**

**Rationale:**

- **rMSSD (Root Mean Square of Successive Differences)**
  - Measures **beat-to-beat parasympathetic activity** (vagal tone)
  - More sensitive to **short-term daily recovery** (perfect for morning baseline)
  - Less artifact-prone than frequency-domain metrics at brief recording intervals
  - **Responsive to daily stressors** and lifestyle changes
  - Strongly correlates with perception of recovery state
  - **Best for consumer wearables** with nightly measurement periods (5-60 minutes)
  - Standard in Oura, WHOOP, Elite HRV apps

- **SDNN (Standard Deviation of NN intervals)**
  - Captures **long-term ANS balance** (sympathetic + parasympathetic)
  - Better for assessing **chronic stress resilience** and baseline health trends
  - More stable across days but less reactive to acute changes
  - Requires **longer recording periods** (ideal: 24 hours)
  - Less practical for consumer devices measuring only overnight HRV

**Implementation:**
- **Primary metric:** rMSSD from nightly sleep (average of 5-minute samples throughout night)
- **Secondary metric:** SDNN if available from 24-hour data or if device deteriorates HRV quality
- **Weighting:** rMSSD = 70% of HRV component, SDNN = 30% (if available)

**Artifact handling:**
- Automatically flag and exclude segments with >0.9% artifactual data
- When artifacts exceed threshold: use Coefficient of Variation (CV) from 7-day rolling average to detect potential data quality issues
- Alert user to clean contact/sensor placement if sustained artifact rate >1.4%

---

### 1.2 7-Day Rolling Average Implementation

**Definition:** A continuous moving average that incorporates the past 7 consecutive calendar days, with **weighted recency bias** (past 2-5 days weighted 1.3-1.5x more than earlier days).

**Does it require 7 consecutive days without breaks?**
- **Partially yes, but with intelligent interpolation:**
  - If 1-2 days of data are missing: interpolate using adjacent day values
  - If 3+ consecutive days missing: exclude that window and use prior 7-day baseline
  - User can manually flag data gaps (e.g., "didn't wear device") to prevent algorithm confusion
  - Once baseline is established (14+ days), short gaps don't reset the baseline calculation

**Formula:**
```
HRV_7day_rolling[day_n] = (
    HRV[n-6] × 1.0 +
    HRV[n-5] × 1.1 +
    HRV[n-4] × 1.2 +
    HRV[n-3] × 1.3 +
    HRV[n-2] × 1.4 +
    HRV[n-1] × 1.5 +
    HRV[n] × 1.5
) / (1.0 + 1.1 + 1.2 + 1.3 + 1.4 + 1.5 + 1.5)
```

**Updates:** Recalculate every morning after HRV measurement

---

## PART 2: TWO-STAGE ALGORITHM ARCHITECTURE

### Stage 1: BASELINE CALIBRATION PHASE (Days 1-14, Extended to Day 30)

**Objective:** Establish personal physiological reference points across best-case (well-recovered) and worst-case (depleted) states.

#### 2.1 Data Collection Requirements

**Required:** Minimum **5 days** of data before any battery score is displayed (to smooth out anomalies)

**Optimal for accurate baseline:** **14 consecutive days** (2 weeks)

- Captures day-to-day variability
- Accounts for weekly patterns (weekday vs. weekend effects)
- Sufficient for initial machine learning adaptation

**Extended calibration window:** Collect for **28-30 days** if possible, as:
- Sleep patterns stabilize by week 3
- Individual stress response patterns emerge
- Circadian rhythm phase can be estimated more accurately

#### 2.2 Morning Self-Assessment Integration

**User provides three morning assessments (screens 1-3, all on 1-5 scale):**

1. **Sleep Quality** (subjective restoration)
   - 1 = Restless, fragmented, unrefreshed
   - 5 = Deep, nourishing, clear mind

2. **Sleep Sufficiency** (vs. personal needs)
   - 1 = Completely unrefreshed, heavy
   - 5 = Energized and clear

3. **Daily Readiness** (physical + emotional capacity)
   - 1 = Unsteady, tense, heavy, unsettled
   - 5 = Empowered, focused, open, ready

**Average these three scores:** `SubjectiveReadiness = (Q1 + Q2 + Q3) / 3`
- Range: 1.0–5.0

**During baseline calibration:**
- Map each day's **objective physiology** (HRV, HR, RHR, sleep metrics) to subjective readiness
- Identify the **personal correlation coefficient** between objective metrics and subjective experience
- Establish what "100% battery" and "0% battery" mean for this individual

#### 2.3 Baseline Values to Track

Collect all available data from Thryve API:

| Metric | Source | Description |
|--------|--------|-------------|
| **Night HRV (rMSSD)** | Wearable | Mean of 5-min samples during sleep; units = ms |
| **Resting HR** | Wearable | Lowest HR during sleep; units = bpm |
| **Sleep Duration** | Wearable | Total sleep time; units = minutes |
| **Sleep Efficiency** | Wearable | (Total Sleep Time / Time in Bed) × 100; units = % |
| **Sleep Stages** | Wearable | Deep%, Light%, REM%, Awake% (if available) |
| **Respiratory Rate** | Wearable | Breaths per minute (if available) |
| **Skin Temperature Deviation** | Wearable | Deviation from personal baseline (if available) |
| **Activity (Daily Steps)** | Wearable/Phone | Step count; units = steps |
| **Activity Intensity** | Wearable | Moderate-vigorous activity minutes; units = minutes |
| **Subjective Readiness** | App | User's 3-question assessment averaged; units = 1–5 |

**Circadian Rhythm Phase (Optional but Valuable):**
- Estimate from activity actigraphy + light exposure using published algorithms (Kronauer model or open-source CircaCP)
- Identify if user's sleep is optimally aligned with their circadian phase
- A "good" sleep-circadian phase angle is typically when sleep occurs 2-4 hours after dim light melatonin onset (DLMO)

---

### Stage 2: DYNAMIC MONITORING PHASE (Day 15+)

Once baseline is established, calculate **real-time Battery Score** as a weighted composite.

---

## PART 3: BATTERY SCORE ALGORITHM (STAGE 2)

### 3.1 Component Scores (Each Calculated 0–100)

The final battery score is a **weighted average of 6 independent component scores**, each normalized to a 0–100 scale based on the individual's baseline.

#### **Component 1: HRV Recovery Score (Weight: 25%)**

**Formula:**
```
HRV_current = today's rMSSD (ms)
HRV_baseline_mean = average rMSSD over past 60 days
HRV_baseline_sd = standard deviation of rMSSD over past 60 days

Z_score_HRV = (HRV_current - HRV_baseline_mean) / HRV_baseline_sd

HRV_Score = min(100, max(0, 50 + (Z_score_HRV × 15)))
```

**Interpretation:**
- HRV at baseline mean = 50 points
- HRV > baseline + 1 SD = 65 points
- HRV > baseline + 2 SD = 80 points
- HRV < baseline - 1.5 SD = 25 points (depleted parasympathetic)

**Rationale:** HRV is the single best marker of vagal tone and ANS flexibility. Deviations beyond ±2 SD indicate significant autonomic dysregulation requiring intervention.

---

#### **Component 2: Resting Heart Rate Recovery Score (Weight: 20%)**

**Formula:**
```
RHR_current = tonight's resting heart rate (lowest during sleep, bpm)
RHR_baseline_mean = average RHR over past 60 days
RHR_baseline_sd = standard deviation of RHR over past 60 days

Z_score_RHR = -(RHR_current - RHR_baseline_mean) / RHR_baseline_sd
              [Note: negative because LOWER RHR = BETTER recovery]

RHR_Score = min(100, max(0, 50 + (Z_score_RHR × 12)))
```

**Interpretation:**
- RHR at baseline = 50 points
- RHR > 5 bpm below baseline = 62 points (good recovery)
- RHR > 10 bpm below baseline = 74 points (excellent recovery)
- RHR > 10 bpm above baseline = 26 points (sympathetic dominance/poor recovery)

**Rationale:** Elevated RHR (>5-10 bpm above personal baseline) indicates sympathetic overactivity, inadequate parasympathetic rebound, or subclinical illness. Used by Oura and WHOOP as primary readiness indicator.

---

#### **Component 3: Sleep Quality & Efficiency Score (Weight: 20%)**

**Composite of sleep metrics:**

```
SleepDuration_score:
  - Target: 7–9 hours (420–540 min)
  - If 420–540 min: 100 points
  - If 360–420 min or 540–600 min: 85 points
  - If <360 min or >600 min: 50 points

SleepEfficiency_score:
  - Target: 85%+ (can extract from wearable)
  - If 85%+: 100 points
  - If 80–85%: 85 points
  - If 75–80%: 70 points
  - If <75%: 50 points

SleepStages_score (if available):
  - Deep sleep + REM: 60%+ of total sleep = 100 points
  - Deep sleep + REM: 45–60% = 85 points
  - Deep sleep + REM: <45% = 60 points

Sleep_Quality_Score = (
    SleepDuration_score × 0.35 +
    SleepEfficiency_score × 0.40 +
    SleepStages_score × 0.25
)
```

**Special consideration - Sleep Penalty Logic:**
- **If total sleep duration < 6 hours:** Apply 15-point penalty to final battery score (regardless of other metrics)
- **If sleep efficiency < 70%:** Apply 10-point penalty
- **Rationale:** Prevents misleading "you're fine" messages when someone is objectively sleep-deprived, even if other metrics look reasonable. Chronic sleep deprivation impairs immune function, cognitive recovery, and ANS adaptation within 3-5 days.

**Subjective-Objective Integration:**
- If user reports sleep quality = 1–2 (poor/low), but wearable shows high efficiency (>85%), **weight subjective 60% / objective 40%**
- Rationale: Some people experience "sleep state misperception" (common in anxiety, PTSD); trust user's phenomenology as a signal of deeper sleep issues
- Flag for investigation: possible sleep fragmentation not captured by actigraphy, or anxiety-driven hyperarousal during sleep

---

#### **Component 4: Subjective Readiness Score (Weight: 15%)**

**Formula:**
```
Subjective_Raw = (Q1_SleepQuality + Q2_SleepSufficiency + Q3_DailyReadiness) / 3
              Range: 1–5

Subjective_Normalized_0to100 = ((Subjective_Raw - 1) / 4) × 100
```

**Adjustment for subjective-objective mismatch:**
- **If Subjective < Objective by 20+ points:** Likely early dysregulation signal (anxiety, rumination despite good physiology) → weight subjective 70% / objective 30% in final score
- **If Subjective > Objective by 20+ points:** Possible denial or dissociation → weight objective 70% / subjective 30%
- **Correlation tracking:** Calculate Pearson correlation between subjective and objective weekly; if r < 0.4, flag as potential dissociation or emotional blindness

**Why included (despite physiological focus)?**
- Mind-body bidirectional effects: subjective perception *influences* ANS tone via anticipation and belief
- Early warning signal for psychological dysregulation before physiology fully reflects it
- Individual differences in symptom awareness; some notice burnout before HRV drops

---

#### **Component 5: Activity-Stress Load Score (Weight: 12%)**

**Objective:** Inverse relationship—**high unplanned stress/activity = lower score; planned recovery activity = neutral/positive**

**Formula:**
```
Daily_Steps = today's total steps
Intense_Activity_Minutes = moderate-vigorous exercise (min)
Strain_Score = WHOOP strain or Fitbit intensity data (if available)

Baseline_Steps = median daily steps over past 60 days
Baseline_Intense_Min = median intense activity min over past 60 days

Activity_Load = (
    (Daily_Steps / Baseline_Steps) × 40 +
    (Intense_Activity_Minutes / Baseline_Intense_Min) × 60
)
  [Capped at 100 if exceeds baseline significantly]

Activity_Stress_Score = 100 - min(100, Activity_Load)
```

**Interpretation:**
- No activity, baseline steps only: 100 points (recovery day)
- Typical daily activity: 70–80 points
- Heavy training or high step count (>150% baseline): 40–50 points
- Extreme activity (>200% baseline) + poor sleep: 20–30 points

**Context incorporation:**
- **Planned workout** (logged by user): penalizes score less (treated as stress adaptation, not unexpected strain)
- **Unplanned activity** (detected by steps alone): penalizes more (unexpected stressor)
- **Rest day** (user logs it): score gets small boost (+5 points) if activity truly minimal

**Why this matters for mental health:**
- Chronic hyperactivity (activity > 150% baseline most days) correlates with manic patterns, anxiety-driven hyperarousal, or avoidant coping
- Recovery capacity depends on activity-rest balance
- In PTSD/depression populations, sudden spikes in activity often precede crashes

---

#### **Component 6: Circadian Rhythm Alignment Score (Weight: 8%)**

**Optional but recommended for advanced personalization**

**Formula:**
```
Sleep_Onset_Time = average sleep start time (user's typical bedtime)
Sleep_Midpoint = (Sleep_Onset_Time + Wake_Time) / 2
Wake_Time = average wake time

Estimated_DLMO = Sleep_Onset_Time - 2 to 3 hours
              [Dim Light Melatonin Onset; approximated from activity + light data]

Sleep_Circadian_Phase_Angle = Sleep_Midpoint - (DLMO + 5 hours)
  [Optimal: ±1 to 3 hours]

If phase angle within ±3 hours:
    Circadian_Score = 90 + (3 - |phase_angle|) × 3
    [Max 100 if perfectly aligned, min 81 if ±3 hours off]

If phase angle > ±4 hours (severe circadian misalignment):
    Circadian_Score = 60 - (|phase_angle| - 4) × 5
    [Indicates potential shift work, jet lag, or chronic delayed sleep phase]

Calculate from actigraphy using published CircaCP algorithm (open-source) or
approximation from sleep timing patterns.
```

**Interpretation:**
- Perfect alignment (sleep midpoint 2-3 hrs after DLMO): 95–100 points
- Mild misalignment (±2 hours): 85–90 points
- Moderate misalignment (±4 hours): 65–75 points (suggests possible DSWPD or shift schedule)
- Severe misalignment (>±6 hours): 40–50 points (intervention needed)

**Data source:** 
- Calculate from wearable sleep/wake times over past 14 days
- If device provides light exposure data → more accurate DLMO estimate
- If not available, use published algorithms; research shows activity-based DLMO prediction has ~±1.4 hour accuracy

---

### 3.2 BATTERY SCORE CALCULATION (Final Weighted Composite)

```
Battery_Score = (
    HRV_Score × 0.25 +
    RHR_Score × 0.20 +
    Sleep_Quality_Score × 0.20 +
    Subjective_Readiness × 0.15 +
    Activity_Stress_Score × 0.12 +
    Circadian_Score × 0.08
)

Apply Sleep Penalty (if applicable):
if Sleep_Duration < 6 hours:
    Battery_Score -= 15
if Sleep_Efficiency < 70%:
    Battery_Score -= 10

Final_Battery_Score = max(0, min(100, Battery_Score))
```

**Output format:**
- **Score 0–100** (battery percentage)
- **Color coding:**
  - 80–100: Full battery 🟢 (Ready to engage, good capacity for stress/activity)
  - 60–79: Partial battery 🟡 (Functional but conserve energy, lighter day recommended)
  - 40–59: Low battery 🟠 (Depleted, focus on rest and gentle movement)
  - 0–39: Critical battery 🔴 (Severe dysregulation; may need clinical support)

---

## PART 4: BATTERY SPENDING THROUGHOUT THE DAY

### 4.1 Daytime Strain Algorithm (Activity-Based Decrement)

**Objective:** Model how battery depletes during waking hours based on stress, activity, and heart rate patterns.

**Core principle:** Battery spends based on:
1. **Sustained elevated HR** (sympathetic activation)
2. **Deviation from resting baseline** 
3. **Cumulative stress load** (measured as time in elevated HR zones)

#### 4.2 Hourly Battery Drain Calculation

```
For each hour of waking time:

HR_Elevation = HR_current - RHR_baseline
HRV_current_daytime = if available from wearable (many don't track daytime HRV)

Stress_Zones (define based on % of max HR):
  - Zone 1 (Rest): <50% HR_max → Drain = 0–2% per hour
  - Zone 2 (Light): 50–60% HR_max → Drain = 2–5% per hour
  - Zone 3 (Moderate): 60–70% HR_max → Drain = 5–10% per hour
  - Zone 4 (Hard): 70–85% HR_max → Drain = 10–15% per hour
  - Zone 5 (Max): 85%+ HR_max → Drain = 15–20% per hour

HR_max = 220 - age [or use user's measured max if available]

Hourly_Drain = Drain_Rate × (minutes_in_zone / 60)

If step_count_hourly > baseline_hourly_steps:
    Activity_Multiplier = 1 + (excess_steps / baseline_hourly_steps) × 0.3
    Hourly_Drain *= Activity_Multiplier
```

**Example:**
- User with RHR = 60 bpm, age 35, HR_max ≈ 185 bpm
- Baseline hourly steps: 600 steps
- Hour 10 AM: HR averages 95 bpm (~80% of HR_max = Zone 4), 1200 steps
  - Baseline Zone 4 drain: 12% per hour
  - Activity multiplier: 1 + (1200-600)/600 × 0.3 = 1.3
  - Hourly drain: 12% × 1.3 = **15.6%**

#### 4.3 Daily Battery Spending Model

```
Morning Battery (at wake) = today's calculated Battery_Score (0–100)

Cumulative_Hourly_Drain = sum of Hourly_Drain for hours 1 to N

Current_Battery = Morning_Battery - Cumulative_Hourly_Drain

Battery updates in real-time as wearable collects HR and activity data.
```

**Constraints:**
- Battery can't go below 0% (clamped at 0)
- Battery updates every 15–30 minutes in app (not in real-time, to avoid anxiety from constant fluxuation)
- User sees: "Current battery: 62% | Projected end-of-day: 35%"

---

### 4.4 Contextual Spending Rates (Scenario-Based)

**Scenario 1: Planned Exercise/Training**
- If user logs workout: apply **0.7x spending multiplier** (nervous system recognizes it as adaptive stress, not threat)
- Battery drain during workout: lower than same HR achieved during work stress
- Example: 30 min at HR Zone 4 during gym = 6% drain; same during work crisis = 9% drain

**Scenario 2: Psychological Stress (High Worry/Anxiety at Low HR)**
- If HR is low but HRV suddenly drops 20%+ (indicating sympathetic tension without movement):
  - Increase drain rate by **1.5x** for that hour
  - Signal: possible anxiety, rumination, or threat perception despite physical relaxation
  - Recommend: grounding exercise, somatic practice

**Scenario 3: Intense Focus (Flow State)**
- Moderate HR elevation with low physical movement
- If HRV *stable or increases* during focus period: treat as low drain (flow is restorative)
- Example: Coding for 2 hours, HR 85–95: only 4–6% drain if HRV stable

**Scenario 4: Recovery Practices (Meditation, Breathwork)**
- User logs meditation/yoga/somatic exercise
- If HR drops >10 bpm or HRV increases during practice: **battery gains 2–5%**
- Rationale: parasympathetic activation actively restores resources
- See "Further Exploration" section below for implementation

---

## PART 5: DYNAMIC BASELINE RECALIBRATION

### 5.1 Why Recalibration is Necessary

The autonomic nervous system can **heal and recover** over time, especially when:
- Exiting trauma/PTSD (vagal tone improves with therapy, somatic work)
- Recovering from depression (baseline HRV can increase 30–50% over 6–12 months)
- Reducing chronic stress (burnout → sabbatical → nervous system recalibration)
- Consistent sleep restoration or meditation practice

**Static baseline would create false negative signal:** If a user recovers from depression over 3 months, a baseline set in month 1 (at low HRV) would forever show them as "recovered" at 80% battery, when they've truly improved to 95%.

### 5.2 Recalibration Schedule

**Recommendation: Every 30–60 days**

**Shorter window (30 days) if:**
- User shows sustained upward trend in HRV, RHR, or subjective readiness
- User reports therapeutic breakthrough or major life change
- User is in active treatment (therapy, somatic coaching, medication adjustment)

**Longer window (60 days) if:**
- User is stable and not in active intervention
- Prevents over-correction from noise or temporary fluctuations
- Allows baseline to shift gradually rather than abruptly

### 5.3 Recalibration Algorithm

```
Recalibration_Window_Start = 30 or 60 days ago
Recalibration_Window_End = today

New_HRV_Baseline_Mean = mean(rMSSD) over window
Old_HRV_Baseline_Mean = previous baseline

Percent_Change = (New_HRV_Baseline_Mean - Old_HRV_Baseline_Mean) / Old_HRV_Baseline_Mean

If Percent_Change > +10% (indicating improvement):
    # Recalibrate: nervous system is adapting/healing
    HRV_Baseline = New_HRV_Baseline_Mean
    RHR_Baseline = New_RHR_Baseline (similar calculation)
    Sleep_Target = adjusted if sleep duration pattern changed
    
    # Notify user
    show: "Your nervous system capacity has improved! ⬆️"

If Percent_Change between -10% and +10% (stable):
    # Keep baseline but note stability
    no change to algorithm
    
If Percent_Change < -10% (indicating deterioration):
    # Investigate: could be stress, illness, life change, or seasonal effect
    # Apply recalibration conservatively (use 50/50 weighted average)
    HRV_Baseline = (Old_HRV_Baseline + New_HRV_Baseline) × 0.5
    
    # Notify user + provide guidance
    show: "Your recovery has decreased recently. Consider: sleep, stress, illness. Seek support if sustained."
```

### 5.4 Preventing Maladaptive Recalibration

**Safeguard 1: Illness Detection**
- If RHR > baseline + 8 bpm for 3+ consecutive days: flag as possible infection
- Don't recalibrate baseline downward; instead, isolate those days from calculation
- Rationale: Temporary illness shouldn't permanently lower "healthy" baseline

**Safeguard 2: Extreme Stress Events**
- User can manually log: "Major stressor" (e.g., death in family, job loss, accident)
- Exclude the 3–7 days following from baseline recalibration
- Rationale: Acute stress responses aren't indicative of long-term capacity

**Safeguard 3: Medication Changes**
- User logs new medication or dosage change
- Exclude data for 2–4 weeks post-change (medication take time to equilibrate)
- Then reassess if improvement or side effect

---

## PART 6: DATA COLLECTION & FREQUENCY RECOMMENDATIONS

### 6.1 Morning Self-Assessment Frequency

**Recommendation: Daily, immediately upon waking (within 30 min of wake time)**

**Timing importance:**
- Catecholamine levels are naturally high upon waking
- Subjective clarity about sleep quality degrades over the day (memory fading)
- Morning is optimal window to capture sleep effects before new stressors accumulate

**Periodicity considerations:**
- Users who miss 3+ consecutive mornings: algorithm pauses and prompts re-entry
- If user misses assessment but wearable data present: use objective metrics only (battery score calculated but flagged as "incomplete subjective data")

### 6.2 Sleep Efficiency Data Collection

**Sleep Efficiency = (Total Sleep Time / Time in Bed) × 100**

**Frequency:** Every night (automatic from wearable)

**Update frequency:** 
- Recalculate rolling baseline weekly (every 7 days)
- Capture both short-term trends (this week) and long-term trends (past 60 days)

**Can it change with time?**
- **Yes.** Sleep efficiency naturally varies 5–10% day-to-day based on:
  - Sleep debt accumulation
  - Circadian misalignment
  - Environmental factors (noise, temperature, light)
  - Medication or substance use
  - Illness

**Long-term changes in efficiency (>10% sustained shift):**
- Indicate underlying condition change: new sleep disorder, chronic stress improvement/deterioration, or successful sleep hygiene intervention
- Monitor via recalibration process

### 6.3 Recommended Baseline Collection Protocol

| Phase | Duration | Data Sources | Frequency |
|-------|----------|--------------|-----------|
| **Calibration** | 14–30 days | Wearable (all metrics) + 3 daily questions | Daily |
| **Observation** | Days 31–60 | Same | Daily |
| **Dynamic Monitoring** | Day 61+ | Same | Daily, with 30–60 day recalibration |

**Minimum acceptable data:**
- 5 consecutive days: calculate preliminary battery score (low confidence)
- 14 consecutive days: confident baseline (recommended launch)
- 30 consecutive days: high-confidence personalization

---

## PART 7: SPECIFIC RECOMMENDATIONS

### 7.1 rMSSD vs. SDNN Decision Tree

| Scenario | Recommendation |
|----------|-----------------|
| Consumer wearable (Oura, WHOOP, Fitbit, Apple Watch) | PRIMARY: rMSSD, only nightly |
| Medical-grade ECG device | PRIMARY: rMSSD + SECONDARY: SDNN (24-hr) |
| Data quality poor (<50% valid nightly HRV) | Use SDNN from daytime measurements if available; otherwise fallback to resting HR only |
| User in acute stress/trauma treatment | PRIMARY: rMSSD (more responsive to daily changes); AVOID: SDNN (too stable, misses acute dysregulation) |
| User in stable maintenance phase | EQUAL: rMSSD 50% / SDNN 50% (captures both vagal tone + overall ANS balance) |

---

### 7.2 7-Day Rolling Average: Consecutive Days Required?

**Answer: Not strictly required, but preferred.**

**Practical handling:**
- **0–1 days missing:** Interpolate using linear regression from adjacent days
- **2 days missing:** Use 5-day rolling average for that period
- **3+ days missing:** Flag data gap; don't calculate rolling average for that window; resume when new data starts
- **Intermittent missing data** (e.g., forgot device 3 times in 2 weeks): Recalculate rolling average using available data; algorithm is robust to occasional gaps

**Algorithm adjustment:**
```
If data_gaps_count >= 3 in 14 days:
    use 7_day_rolling_average_when_available
    + recommend user set reminder for consistent device wearing
    + still calculate battery score but flag confidence as 0.7 instead of 1.0
```

---

### 7.3 Scoring Each Component: Average 7-Day vs. Extremes vs. Raw

**Recommendation: Use 7-day weighted rolling average for all components**

| Component | Calculation Method | Rationale |
|-----------|-------------------|-----------|
| HRV | 7-day weighted rolling avg | Smooths daily noise; captures trajectory |
| Resting HR | 7-day weighted rolling avg | Night-to-night variability high; rolling avg more stable |
| Sleep Duration | 7-day avg (unweighted) | Sleep duration more stable; weights same across week |
| Sleep Efficiency | 7-day avg (unweighted) | Goal is consistent efficiency; no recency bias needed |
| Daily Steps | daily sum + 7-day avg | Show daily total, but judge against weekly average |
| Subjective Readiness | 7-day avg (unweighted) | Perception evolves; rolling avg captures mood trajectory |

**Why NOT use extremes (min/max):**
- Single best day doesn't reflect capacity
- Single worst day can be outlier (illness, poor sleep one night)
- Battery metaphor implies *typical* capacity, not best-case scenario

**Why NOT use raw daily values without smoothing:**
- Too noisy; creates anxiety and false alarms
- Natural ANS fluctuation ±15% day-to-day
- User sees erratic battery score: frustrating and non-actionable

---

### 7.4 Sleep Penalty Logic Implementation

**Sleep Penalty prevents false reassurance when sleep-deprived**

```
Morning Battery_Score = (all components weighted as described)

Sleep_Penalty = 0

if Night_Sleep_Duration < 6 hours:
    Sleep_Penalty += 15
    msg: "⚠️ Last night you slept <6 hours. Your nervous system is in sleep debt. 
           Prioritize rest today."

if Sleep_Efficiency < 70%:
    Sleep_Penalty += 10
    msg: "⚠️ Sleep was fragmented. Quality was compromised. 
           If sustained, consider sleep hygiene or medical evaluation."

if Night_Sleep_Duration < 5 hours:
    Sleep_Penalty += additional_20
    msg: "🔴 CRITICAL: Severe sleep deprivation detected. 
           Consider calling in sick if possible. High accident risk."

Final_Battery = max(0, min(100, Battery_Score - Sleep_Penalty))
```

**Neuroscience rationale:**
- After 1 night <6 hours: next-day HRV drops 10–15%, RHR elevated
- After 2–3 consecutive nights: cognitive impairment, immune suppression begins
- After 5+ consecutive nights: metabolic dysregulation, mood disorders more likely
- Chronic sleep <6 hours: autonomic dysregulation, hypertension risk

**Why override other metrics?**
- Someone with "good HRV + low RHR" but only 5 hours sleep is in compensatory state
- Algorithm prevents messaging "you're ready to train!" when objectively depleted
- Protects user from overreaching injuries or crashes

---

## PART 8: BASELINE DATA COLLECTION PROTOCOL

### 8.1 How Many Days of "Best" (5 Points) and "Worst" (1 Point) to Collect?

**Objective:** Establish individual's phenomenological range on 1–5 scale and map to physiology.

**Recommendation:**
- **Minimum:** 2–3 days rating 5 (excellent) + 2–3 days rating 1 (poor)
- **Optimal:** 5–7 days rating 5 + 5–7 days rating 1
- **Extended:** 10 days each (establishes individual personality of "bad" and "good" days)

**Why this range?**

| Days Collected | Confidence | Risk |
|---|---|---|
| 2–3 each extreme | 60% | Single outlier skews baseline; may be anomaly (illness, anomalous event) |
| 5–7 each extreme | 80% | Good coverage; captures typical range |
| 10+ each extreme | 95% | High confidence; accounts for within-state variability |

**Practical approach:**

**Week 1–2 (Days 1–14):**
- Collect data as it naturally occurs
- Expect: 2–4 days of low readiness (1–2), 2–4 days of high readiness (4–5), rest neutral (3)
- If user only reports 3–4 all days: lack of variability suggests:
  - Very high resilience (baseline already optimized)
  - Dissociation or lack of emotional awareness
  - App usability issue (user not understanding scale)

**Week 3 (Days 15–21) — Targeted Collection:**
- Intentionally seek one "recovery day" (low activity, lots of sleep): target 5-point rating
- Intentionally expose to stressor or skip sleep: target 1-point rating
- This intentional collection helps algorithm understand individual's response signature

**If still not enough variance by Day 21:**
- Proceed anyway with available data
- Flag in algorithm that personalization is low confidence (0.65 multiplier on normalized scores)
- Continue collecting; recalibrate after 60 days when more variance available

---

### 8.2 Collecting Subjective-Objective Correlation

**Goal:** Learn how well user's *feeling* correlates with wearable *physiology*

**Calculation during baseline phase:**

```
For each day in baseline period:

Subjective_Raw = (Q1 + Q2 + Q3) / 3  [Range: 1–5]

Objective_Proxy = (HRV_percentile + RHR_inverse_percentile) / 2
  [Both normalized to 0–1 scale based on 14-day distribution]
  
HRV_percentile = rank(today_HRV) / 14  [0 = lowest HRV in 2 weeks, 1 = highest]
RHR_inverse = 1 - [rank(today_RHR) / 14]  [0 = highest RHR, 1 = lowest]

Correlation = Pearson(Subjective_Raw_array, Objective_Proxy_array)
```

**Interpretation:**
- **r = 0.7–1.0:** Strong alignment; user is well-calibrated to their physiology. Weight subjective 50%, objective 50%
- **r = 0.4–0.7:** Moderate; some dissociation or delayed awareness. Weight objective 60%, subjective 40%
- **r = 0.0–0.4:** Weak/no correlation; user poor at reading own body. Weight objective 80%, subjective 20%
- **r < 0:** Inverse correlation (user feels worse when physiology good, or vice versa); suggests anxiety misinterpretation or trauma-related hypervigilance. Weight subjective 70%, objective 30%

**Store this correlation and re-evaluate every 30 days.**

---

## PART 9: BATTERY SPENDING IN REAL WORLD (Scenarios & Examples)

### 9.1 Example 1: Typical Workday (Office Professional)

```
Morning Battery: 72% (decent sleep, moderate HRV)

08:00 wake, breakfast, commute
  Avg HR: 72 bpm (baseline RHR 60), light activity
  → Spend: 3% → Battery: 72% → 69%

09:00–12:00 focused work, meetings
  Avg HR: 82 bpm (Zone 3), 800 steps/hour
  → Spend: 3.5%/hour × 3 hours = 10.5% → Battery: 58.5%

13:00 lunch break, walk outside
  Avg HR: 75 bpm, 3000 steps
  → Spend: 2% → Battery: 56.5%

14:00–17:00 high-stress meeting + email overload
  Avg HR: 95 bpm (Zone 4, sustained), 300 steps
  → Spend: 14%/hour × 3 hours = 42%
  → Battery: 14.5% 🟠 (critical!)

17:30 goes home, tries meditation
  HR drops to 68 bpm, stays elevated HRV for 20 min
  → Battery gains: +3% → Battery: 17.5%

Evening recovery: light dinner, short walk, early bed
  → System notes: user attempting recovery
  → Tomorrow morning assessment will show if adequate restoration
```

**Takeaway:** Even with decent morning battery, one high-stress afternoon depleted it. User would benefit from mid-day reset practice or stress reduction techniques.

---

### 9.2 Example 2: Recovery Day (Post-Burnout)

```
Morning Battery: 45% (poor sleep, HRV still low from previous week's stress)

User plans: "recovery day" (logged)

09:00–17:00 minimal activity
  Avg HR: 62 bpm (below baseline RHR 65; parasympathetic activation)
  → Spend: 0.5%/hour × 8 hours = 4% → Battery: 41%

12:00–12:40 yoga + breathing practice (user logs as "meditation")
  HR drops to 58 bpm, HRV increases 15% during session
  → Algorithm detects parasympathetic shift
  → Battery GAINS: 4% (restorative practice benefit) → Battery: 45%

17:00 evening free time, social connection
  Avg HR: 70 bpm (still in rest zone), 2000 steps
  → Spend: 1% → Battery: 44%

Evening: 8.5 hours sleep, high efficiency, good dreams (user logs)

Next morning:
  HRV: 52 ms (up from yesterday's 48 ms)
  RHR: 62 bpm (down from 65)
  Subjective: 4/5 (recovered)
  → Morning Battery: 58% ⬆️ +13 points from yesterday
```

**Takeaway:** Strategic recovery day + somatic practice can partially restore battery overnight. Not complete reversal, but meaningful improvement. Shows nervous system's capacity to bounce back.

---

### 9.3 Example 3: Untreated Anxiety/Hypervigilance

```
Morning Battery: 62% (objectively good: HRV 55 ms, RHR 63, 7.5 hrs sleep, 87% efficiency)

But user rates: Subjective Readiness = 2/5 ("Anxious, not settled, body tense")

Algorithm detects mismatch:
  Objective: 72 points
  Subjective: 25 points
  Correlation coefficient: 0.15 (poor alignment)

Action:
  - Weights subjective 70%, objective 30%
  - Final Battery: (72 × 0.3) + (25 × 0.7) = 21.6 + 17.5 = 39 points 🟠 LOW
  
  - Sends message: "Your body's physiology shows recovery, but your mind reports stress.
    This disconnect is common in anxiety. Consider: grounding exercise, somatic work,
    or speaking with a therapist about hypervigilance."

Throughout day:
  HR slightly elevated (75–85 bpm) despite low activity = hyperarousal signature
  Activity high (10,000 steps + gym) = possible anxiety-driven hyperactivity
  → Spending rate higher than activity alone would predict
  
Evening:
  User tries Box Breathing (4-4-4-4) for 10 min
  HR drops noticeably, HRV increases
  User reports calmer
  → Battery gains partial recovery
  
Next morning: Subjective = 3/5 (slight improvement with practice)
```

**Takeaway:** Algorithm catches mind-body disconnect and flags it for intervention. Over days/weeks, somatic practices + therapy can improve correlation (r goes from 0.15 → 0.6), and battery scores become more stable and reliable.

---

## PART 10: FURTHER EXPLORATION & FUTURE ENHANCEMENTS

### 10.1 Somatic Practices & Battery Recovery

**Concept:** Certain guided practices (meditation, breathwork, somatic exercises) *actively restore* battery beyond passive rest.

#### Detection Method:
```
Somatic_Practice_Detected if:
  - User logs practice (tag: "meditation", "yoga", "breathwork", "somatic exercise")
  - AND heart rate drops >10 bpm sustained over >5 minutes
  - AND HRV increases >15% during practice window
  - OR respiratory rate decreases to 5–6 breaths/min (coherent breathing signature)

Practice_Restoration_Bonus = (
    HR_drop_magnitude × 0.5 +          [breathing effect]
    HRV_increase_percent × 0.3 +        [vagal activation]
    Duration_minutes × 0.1              [cumulative parasympathetic load]
) / 10

Capped at 5% battery gain per 30-min session
```

#### Examples:
- **Box Breathing (4-4-4-4) for 10 min:** ~+1.5% battery
- **Yoga Flow (30 min, drop HR 20 bpm, HRV +25%):** ~+4% battery
- **Somatic Experiencing sequence (20 min):** ~+3% battery (if user feels "processed")
- **Transcendental Meditation (30 min):** ~+4% battery

#### Implementation:
1. User logs practice in app (dropdown: Meditation, Yoga, Breathwork, Somatic Exercise, etc.)
2. Algorithm tracks HR/HRV during logged time window
3. If parasympathetic metrics improve: award restoration bonus
4. Don't award if user logs "meditation" but HR stays elevated or rises (indicates not genuine relaxation)

**Why this matters:**
- Empowers user to see that *active recovery practices work*
- Provides immediate feedback for somatic/mindfulness interventions
- Helps in mental health treatment: therapist can say "This practice restored 3% battery; do it 2x daily for week to rebuild 20%"

---

### 10.2 Trauma Recovery & Nervous System Healing Tracking

**Special application for PTSD, Complex Trauma, Attachment Trauma populations:**

#### Metrics to Track:
```
1. Baseline HRV trajectory (should increase over weeks/months of therapy)
2. HRV_CV (Coefficient of Variation): in trauma, CV is high (erratic); in recovery, CV decreases
3. Resting Heart Rate: elevated in hyperarousal; should decrease with therapy
4. Sleep efficiency: disrupted in trauma; should improve
5. Subjective-Objective correlation: initially poor (dissociation); should improve as somatic awareness builds

Healing_Progress_Index = (
    (HRV_Week1 - HRV_Week12) / HRV_Week1 * 100 +      [HRV increase %]
    (RHR_Week1 - RHR_Week12) / RHR_Week1 * 100 +      [RHR decrease %]
    (Correlation_Week12 - Correlation_Week1) +        [improved mind-body connection]
    (CV_Week1 - CV_Week12) * 50                        [reduced HRV erraticism]
) / 4

Interpreted as:
  < 5: minimal healing progress; reassess treatment
  5–15: modest recovery; continue current approach
  15–30: significant healing trajectory; maintain
  > 30: major nervous system reorganization; celebrate + solidify gains
```

#### Integration with Battery:
- For trauma survivors: show **"Healing Trajectory"** alongside battery score
- Color-code: red (worsening) → yellow (stable) → green (improving)
- Monthly message: "Your nervous system's capacity has improved by 8% this month. Congratulations."

---

### 10.3 Medication & Supplement Tracking

**When user starts/changes medication (antidepressants, stimulants, etc.), baseline shifts:**

```
Medication_Log_Format:
  - Name, dosage, start date, type (SSRI, stimulant, sleep aid, etc.)
  
When new medication added:
  - Flag: exclude next 14–21 days from baseline recalibration (medication take time to plateau)
  - Monitor for side effects: if RHR +10 bpm or HRV drops, alert user + doctor
  
Expected effects (after ~4 weeks):
  - SSRI (depression): HRV should increase 15–30%, subjective readiness improve
  - Stimulant (ADHD): RHR may increase 5–10%, HRV may be stable or increase (focus helps)
  - Sleep aid (insomnia): Sleep efficiency should increase, but beware REM suppression
  
Track: "Before medication" vs. "4 weeks on medication" battery improvement
```

---

### 10.4 Menstrual Cycle Tracking (for people who menstruate)

**Hormonal variations affect HRV, RHR, sleep efficiency dramatically**

```
Menstrual_Phase_Detection:
  - User logs period start date
  - Calculate cycle day [1–35, 28-day avg]
  
Expected HRV patterns (published research):
  - Follicular phase (days 1–14): HRV lower, RHR higher (estrogen rising)
  - Ovulation (day 14±2): HRV peaks temporarily
  - Luteal phase (days 15–28): HRV stabilizes lower, sleep efficiency decreases (progesterone)
  
Baseline adjustment:
  - Calculate separate baseline for Follicular vs. Luteal phases
  - During interpretation, compare today's metrics to phase-appropriate baseline
  
Algorithm insight:
  - User rates 2/5 readiness on day 23 (deep luteal): might be normal for her cycle
    vs. true dysregulation
  - Reduces false alarm for cycle-aware users
```

---

## PART 11: THRYVE PLATFORM INTEGRATION

### 11.1 Data Already Available (No Custom Calculation Needed)

Based on Thryve's biomarker coverage, these are likely **pre-calculated and directly accessible via API:**

| Biomarker | Thryve Availability | Use in Algorithm |
|-----------|-------------------|------------------|
| Heart Rate (HR) | ✅ Yes | RHR_Score component |
| HRV (rMSSD) | ✅ Yes | HRV_Recovery_Score component |
| HRV (SDNN) | ✅ Likely | Secondary backup metric |
| Sleep Duration | ✅ Yes | Sleep_Quality_Score component |
| Sleep Efficiency | ✅ Yes | Sleep_Quality_Score component |
| Sleep Stages (Deep%, REM%, Light%) | ✅ Likely | Sleep_Quality_Score sub-component |
| Respiratory Rate | ✅ Possibly | Could enhance score if available |
| Skin Temperature Deviation | ✅ Possibly | Circadian & illness detection |
| Steps/Activity Count | ✅ Yes | Activity_Stress_Score component |
| Moderate-Vigorous Activity Minutes | ✅ Likely | Activity_Stress_Score component |
| Heart Rate Zones (if available) | ✅ Check | Improves Activity_Stress_Score accuracy |

**Action items:**
1. Request Thryve API documentation on available biomarkers for each supported device
2. Test connections with 3–5 devices (Oura, WHOOP, Fitbit, Apple Watch, Garmin)
3. Map which metrics each device provides; build fallback logic if device misses some metrics

### 11.2 Custom Calculations Needed (Build In-House)

| Calculation | Why Custom |
|-------------|-----------|
| 7-day weighted rolling average | Specific weighting scheme (past 2–5 days more weight) |
| Z-score normalization per component | Individual baseline comparison |
| Sleep Quality Composite Score | Multi-metric weighting (duration + efficiency + stages) |
| Activity-Stress Load Score | Custom stress zone definitions |
| Circadian Rhythm Alignment Score | Open-source CircaCP algorithm needed |
| Battery Score Weighted Composite | Unique 6-component weighting (25% HRV, 20% RHR, etc.) |
| Sleep Penalty Logic | Thresholding for sleep deprivation |
| Battery Spending Throughout Day | Real-time HR zone tracking + drain calculations |
| Baseline Recalibration Logic | ±10% change detection + safeguards |

---

## PART 12: IMPLEMENTATION ROADMAP

### Phase 1: MVP (Weeks 1–6)
- [ ] Integrate Thryve API (HRV, HR, sleep metrics)
- [ ] Implement Stage 1 (Baseline Calibration) for 14-day collection
- [ ] Build 3 primary component scores: HRV, RHR, Sleep Quality
- [ ] User morning self-assessment (3 questions, 1–5 scale)
- [ ] Weighted composite Battery Score (3 components, basic weighting)
- [ ] Display: Battery % + color coding (green/yellow/red)

### Phase 2: Enhanced Baseline (Weeks 7–12)
- [ ] Add Subjective Readiness Score (Component 4)
- [ ] Implement 7-day weighted rolling average (all metrics)
- [ ] Add Sleep Penalty Logic
- [ ] Correlation tracking (subjective vs. objective)
- [ ] Baseline recalibration logic (every 30 days)
- [ ] User dashboard: trends over 2–4 weeks

### Phase 3: Activity & Stress (Weeks 13–18)
- [ ] Integrate daily activity data (steps, exercise minutes)
- [ ] Build Activity-Stress Load Score (Component 5)
- [ ] Implement Battery Spending Throughout Day (hourly HR-based drain)
- [ ] Real-time battery updates (every 30 min)
- [ ] Projection: "Current 62% | End-of-day projection 35%"
- [ ] Context: mark "planned exercise" vs. "unplanned activity"

### Phase 4: Circadian & Advanced Features (Weeks 19–24)
- [ ] Integrate CircaCP algorithm (open-source) or simplified DLMO estimation
- [ ] Build Circadian Rhythm Alignment Score (Component 6)
- [ ] Somatic practice detection & restoration bonus (+battery)
- [ ] Medication tracking (with baseline exclusion windows)
- [ ] Weekly healing progress report

### Phase 5: Personalization & Refinement (Weeks 25+)
- [ ] Menstrual cycle phase detection + phase-specific baselines
- [ ] Trauma recovery trajectory tracking
- [ ] AI assistant integration: contextual guidance based on battery + subjective patterns
- [ ] A/B testing: different weighting schemes by user population
- [ ] Feedback loop: user reports accuracy; machine learning refines weights

---

## PART 13: SCIENTIFIC REFERENCES & VALIDATION

### Key Studies Cited:
1. **HRV as autonomic marker:** Thayer & Sternberg (2006); Koenig et al. (2016)
2. **rMSSD vs. SDNN for daily monitoring:** Laborde et al. (2017); Malik et al. (1996)
3. **Recovery score methodology:** WHOOP/Oura white papers; Achermann two-process model
4. **Sleep efficiency calculation:** AASM standardized scoring
5. **Circadian phase estimation:** Kronauer model; CircaCP algorithm (Marques et al., 2021)
6. **Stress response & HR zones:** Lampert et al. (2005); Sztajzel et al. (2004)
7. **Trauma & nervous system:** Porges Polyvagal Theory; van der Kolk "The Body Keeps the Score"
8. **Somatic practices & HRV:** Laborde et al. (2021) on HRV biofeedback
9. **Subjective-Objective sleep discrepancy:** Trinder et al. (2001); Herzog et al. (2025)

---

## PART 14: ETHICAL CONSIDERATIONS & Limitations

### 14.1 Known Limitations
- **No daytime HRV:** Consumer wearables don't reliably measure HRV during day; only nightly HRV captured
- **Individual variability:** HRV, RHR, and sleep architecture vary wildly by genetics, age, sex; algorithm attempts personalization but won't be equally accurate for all
- **Cannot replace clinical assessment:** Battery score is not a medical diagnosis; users with persistent low scores should seek professional support
- **Medication/substance confounds:** Alcohol, stimulants, antidepressants affect metrics; user must log these

### 14.2 Ethical Guidelines
1. **Transparency:** Clearly state that algorithm is personalized estimate, not medical truth
2. **No pathologizing language:** Avoid "you're sick" or "your nervous system is broken"; use "currently depleted" or "recovery-oriented"
3. **Privacy:** Don't share biomarker data externally without explicit consent; store locally if possible
4. **Trauma-informed:** Be aware that some users may have dissociation or hypervigilance; gentle, non-alarming messaging
5. **Encourage professional help:** If battery consistently <30% for >2 weeks, in-app message: "Consider speaking with a therapist or doctor."

---

## SUMMARY: Quick Reference Card

| Element | Specification |
|---------|---------------|
| **Primary HRV Metric** | rMSSD (nightly average of 5-min samples) |
| **Primary RHR Metric** | Lowest HR during sleep |
| **Primary Sleep Metric** | Duration + Efficiency composite (with stage weighting if available) |
| **Baseline Window** | 14–30 days (minimum 5 days) |
| **Rolling Average** | 7 days, weighted (past 2–5 days: 1.3–1.5x) |
| **Component Weighting** | HRV 25%, RHR 20%, Sleep 20%, Subjective 15%, Activity 12%, Circadian 8% |
| **Sleep Penalty** | -15 if <6 hrs; -10 if efficiency <70%; -20 if <5 hrs |
| **Recalibration** | Every 30–60 days; detect >±10% HRV change |
| **Battery Range** | 0–100% (Green 80–100, Yellow 60–79, Orange 40–59, Red 0–39) |
| **Spending Model** | Hourly drain based on HR zone + activity multiplier |
| **Somatic Bonus** | +1–5% per session if HR drops + HRV increases |
| **Data Source** | Thryve API (Oura, WHOOP, Fitbit, Apple, Garmin, etc.) + user self-reports |

---

**Document Version:** 1.0  
**Date:** November 2025  
**For:** Mental Health Wearables App Development  
**Author Expert Role:** 30 years neurophysiology + 30 years mental health technology
