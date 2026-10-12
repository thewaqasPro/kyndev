# Kyndev V2 &bull; Agency Profile & Team Index (`AboutWho`)

> **Component ID**: `about-who` / `AboutWho`  
> **Type**: Pattern B (Multi-Column Typography & Team Showcase)  
> **Preview URL**: `/preview/about-who`  
> **Source Directory**: `src/v2/components/AboutWho/`  
> **Status**: Production Ready &bull; Modular V2 Architecture  

---

## 1. Overview & Visual Effects

The **AboutWho** component presents Kyndev's creative identity, cross-disciplinary agency scope, and leadership team:
1. **Multi-Column Typography & Matrix Grid**:
   - Monumental agency headline (*"WE ARE KYNDEV — A CREATIVE PRODUCTION STUDIO..."*).
   - Precision cross grid top border (`+ + + + +`).
2. **Worldwide Talent Callout**:
   - Glassmorphic manifesto banner highlighting global specialists across London, Tokyo, Zurich, and Berlin.
3. **Interactive Team Showcase Carousel**:
   - Dynamic team card indexed from `[[ 001 ]]` to `[[ 006 ]]`.
   - Previous/Next interactive navigation with audio cues and live progress fill indicator.
   - Profile biographies, leadership roles, and studio locations.

---

## 2. File Structure & Responsibilities

| File | Type | Responsibility |
| :--- | :--- | :--- |
| `AboutWho.astro` | Astro Component | Agency headline, cross matrix strip, statement callout, and team card markup. |
| `AboutWhoController.ts` | Controller | Team roster dataset, carousel step progression, and DOM text updates. |
| `aboutWho.css` | Stylesheet | Scoped styling for dark container (`#0b0c0e`), radial gradients, and progress bar animation. |
| `README.md` | Documentation | Architecture overview, team data roster, and AI prompt cheatsheet. |

---

## 3. Team Member Data Structure

```typescript
export interface TeamMember {
  num: string;        // '001', '002', etc.
  name: string;       // Display name
  role: string;       // Studio title
  bio: string;        // Profile biography
  location: string;   // City, Country
}
```

---

## 4. AI Agent Prompt Cheatsheet

| User Request | Target File | What to Adjust |
| :--- | :--- | :--- |
| **"Add or edit team members"** | `AboutWhoController.ts` | Modify `TEAM_MEMBERS` array with new name, role, bio, and location. |
| **"Change headline text or slogan"** | `AboutWho.astro` | Update `who-headline-main` content in Astro template. |
| **"Adjust progress bar color"** | `aboutWho.css` | Edit `.who-progress-fill` `background` (default `#061dfb`). |
| **"Change team card background or border"** | `aboutWho.css` | Edit `.who-team-card` `background` and `border`. |
