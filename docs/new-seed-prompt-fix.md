You are a senior full-stack engineer specializing in Payload CMS, database seeding, and scalable content architecture.

Your task is to REFACTOR and CREATE a NEW seed file for an existing project.

IMPORTANT RULES:

* DO NOT modify existing seed files
* CREATE a new seed file (e.g. `gaia-seeds-v2.ts`)
* The existing seeds act as a reference baseline
* Ensure compatibility with current collections, blocks, and schema
* The output must be production-ready and cleanly structured

---

## STEP 1 — ANALYSIS (MANDATORY FIRST)

Before writing any seed:

* Analyze existing seed files
* Analyze all collections (Services, Portfolio, Blog, Team, Pages, etc.)
* Analyze all blocks (Hero, About Block, Team Block, Service Detail Block, Portfolio Blocks, Blog Blocks)
* Analyze global components (Header, Footer, Navigation)

Then:

* Identify required fields and relationships
* Ensure all seeded data matches schema exactly
* Avoid invalid or missing fields

---

## STEP 2 — HEADER NAVIGATION STRUCTURE

Create Header navigation with the following structure:

1. Services (WITH submenu)

   * semua items must be dynamically linked to ALL entries in Services collection

2. Portfolio (NO submenu)

   * Link to Portfolio page

3. About Us (NO submenu)

   * Link to About Us page

4. Blog (NO submenu)

   * Link to Blog page

---

## STEP 3 — SERVICES SEED STRUCTURE

For EACH Service:

### Hero (Non Homepage Hero)

* Title = same as Service Title
* Giant Title Color = White
* Gradient Color = Yellow
* Button = none
* Media = default

### Page Content → Service Detail Block

#### Introduction Section:

* Title (generate professional marketing copy)
* Description (generate high-quality agency-level copy)
* Image = default

#### Sub Services (ARRAY, minimum 2 items):

Each item:

* Title (contextual to service)
* Description (high-quality, professional, non-generic)

---

## STEP 4 — PORTFOLIO PAGE

### Hero (Non Homepage Hero)

* Title: Our Work
* Giant Title Color: White
* Gradient Color: Yellow
* Button: none
* Media: default

### Content:

#### Layout 1 → Portfolio Insight Block

* Main Title: empty
* Insights (min 2):

  * Title (e.g. Insight #1)
  * Description (contextual, agency-level storytelling)
  * Image: default

#### Layout 2 → Portfolio Image Banner Block

* Image: default

---

## STEP 5 — ABOUT US PAGE

### Hero (Non Homepage Hero)

* Title: About Us
* Giant Title Color: White
* Gradient Color: Yellow
* Button: none
* Media: default

### Content:

#### About Block:

* Image: default
* Title: We live for the love of innovation.
* Description: provided text (use exactly as given)

#### Commitment / Vision / Mission (ARRAY):

* 3 items exactly:

  * Our Commitment
  * Our Vision
  * Our Mission
    (use provided descriptions)

#### Team Block:

* Title: Our Team
* Intro Text: Meet the creative minds behind your brand’s exciting next chapter.

---

## STEP 6 — BLOG PAGE

### Hero (Blog Hero)

* Title: Gaia Stories

### Content:

#### Featured Blog Block:

* At least 1 featured post

#### Listing Post Block:

* Section Title: empty

---

## STEP 7 — TEAM DATA

Create MORE THAN 10 team members:

* Each must have:

  * Name
  * Role
  * Department

Rules:

* Each department must have MINIMUM 2 members
* Departments example:

  * Design
  * Development
  * Marketing
  * Strategy

---

## STEP 8 — PORTFOLIO DATA

For EACH Service:

* Create MINIMUM 3 portfolio entries

Each portfolio must include:

* Title
* Related Service
* SOW (Scope of Work) aligned with service type
* Description (contextual and realistic)

---

## STEP 9 — OUTPUT FORMAT

Provide:

1. New seed file (complete code)
2. Clean structure and reusable helpers (if needed)
3. Ensure relations (IDs / slugs) are correctly mapped
4. Avoid duplication issues
5. Use async/await properly

---

## GOAL

The result should:

* Reflect real-world agency data
* Be clean, scalable, and maintainable
* Be fully compatible with Payload CMS structure
* Be safe to run without breaking existing data

Focus on execution, not explanation.
