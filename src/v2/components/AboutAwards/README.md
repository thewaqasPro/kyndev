# Kyndev V2 &bull; Awards Starburst & Recognition (`AboutAwards`)

> **Component ID**: `about-awards` / `AboutAwards`  
> **Type**: Pattern B (Awards Accordion & Starburst Medal Component)  
> **Preview URL**: `/preview/about-awards`  
> **Source Directory**: `src/v2/components/AboutAwards/`  
> **Status**: Production Ready &bull; Modular V2 Architecture  

---

## 1. Overview & Visual Effects

The **AboutAwards** component showcases Kyndev's international awards pedigree:
1. **Interactive Starburst Medal Widget**:
   - Rotating geometric 8-point starburst medal with bold white "58" tally badge.
   - Mouse parallax tilting and scaling reacting to cursor coordinates.
2. **Category Filter Tabs**:
   - Real-time tab filtering: `All Honors (58)`, `Awwwards (29)`, `FWA (20)`, `CSSDA (02)`, `The Webby Awards (02)`.
   - Smooth accordion show/hide transitions.
3. **Typography & Line Dividers**:
   - Three-column structured layout: Organization, 3-digit padded count (`001`, `010`), and award achievement title.
   - Micro-interaction audio triggers on filter selection via `audioManager`.

---

## 2. File Structure & Responsibilities

| File | Type | Responsibility |
| :--- | :--- | :--- |
| `AboutAwards.astro` | Astro Component | Header layout, 3D starburst medal container, filter tabs, award items grid, telemetry footer. |
| `AboutAwardsScene3D.ts` | WebGL Scene | Authentic 3D 8-point geometric starburst with 16 faceted wedges, `/assets/textures/award_gradient.png` chromatic sweep shader, specular cursor sheen, and continuous zero-G rotation. |
| `AboutAwardsController.ts` | Controller | Filter logic, 3D WebGL scene lifecycle, and sound effect triggers. |
| `aboutAwards.css` | Stylesheet | Scoped styling for dark container (`#0b0c0e`), radial gradients, badges, and dashed borders. |
| `README.md` | Documentation | Architecture overview, data structures, and AI prompt cheatsheet. |

---

## 3. Award Data Schema

```typescript
export interface AwardItem {
  org: string;        // 'Awwwards', 'FWA', etc.
  count: string;      // Formatted '001', '010'
  title: string;      // 'Site of the Year', etc.
}

export interface AwardCategory {
  id: string;         // 'awwwards', 'fwa', 'cssda', 'webby'
  name: string;       // Display organization name
  tally: string;      // '29 HONORS'
  items: AwardItem[];
}
```

---

## 4. AI Agent Prompt Cheatsheet

| User Request | Target File | What to Adjust |
| :--- | :--- | :--- |
| **"Add or update an award"** | `AboutAwards.astro` | Modify `categories` array and items (e.g. increase count or add new item). |
| **"Change total awards count from 58"** | `AboutAwards.astro` | Update `.awards-total-number` text and filter pill label. |
| **"Adjust Starburst medal size or rotation"** | `aboutAwards.css` & `AboutAwardsController.ts` | Modify `.awards-starburst-svg` dimensions and `rotate(${x * 40}deg)`. |
