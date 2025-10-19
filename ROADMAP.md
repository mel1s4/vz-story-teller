# VZ Story Teller - Development Roadmap

> A comprehensive feature roadmap for competing with industry-standard screenplay software

## Table of Contents
- [Phase 1: Core Formatting](#phase-1-core-formatting)
- [Phase 2: Export & Import](#phase-2-export--import)
- [Phase 3: Advanced Script Elements](#phase-3-advanced-script-elements)
- [Phase 4: Collaboration](#phase-4-collaboration)
- [Phase 5: Writing Assistance](#phase-5-writing-assistance)
- [Phase 6: Production Tools](#phase-6-production-tools)
- [Phase 7: UI/UX Enhancements](#phase-7-uiux-enhancements)
- [Phase 8: Integration & Sync](#phase-8-integration--sync)
- [Phase 9: Advanced Features](#phase-9-advanced-features)

---

## Phase 1: Core Formatting

### 🔴 Required: PDF Export
**Priority:** Critical
**Description:** Generate properly formatted PDF files with industry-standard margins, fonts (Courier Prime), and page breaks. Must maintain screenplay formatting rules (1 page ≈ 1 minute of screen time).
**Implementation Notes:** Use a library like jsPDF or PDFKit. Ensure proper pagination and scene breaks.

### 🔴 Required: Title Page
**Priority:** Critical
**Description:** Professional title page with script title, author name, contact information, and copyright notice. Separate from the script body.
**Implementation Notes:** Create a dedicated title page editor with fields for title, subtitle, author, contact info, and copyright year.

### 🔴 Required: Page Breaks & Numbering
**Priority:** Critical
**Description:** Automatic page breaks and page numbers in print view. Industry standard is page number in top-right corner with scene numbers.
**Implementation Notes:** Implement CSS page-break rules and JavaScript pagination logic for accurate page counting.

### 🟡 Nice to Have: Auto-Formatting
**Priority:** High
**Description:** Smart formatting as you type - automatically capitalize character names, format sluglines, add proper spacing. Mimics Final Draft behavior.
**Implementation Notes:** Add event handlers to detect typing patterns and apply formatting rules automatically.

---

## Phase 2: Export & Import

### 🔴 Required: Final Draft (.fdx) Export/Import
**Priority:** Critical
**Description:** Import and export scripts in Final Draft XML format for compatibility with industry-standard software. Most screenwriters use Final Draft.
**Implementation Notes:** Parse and generate Final Draft XML format. Handle all script elements, formatting, and metadata.

### 🔴 Required: Fountain Format Support
**Priority:** High
**Description:** Import and export in Fountain format - an open, plain-text screenplay format. Widely supported by many tools.
**Implementation Notes:** Implement Fountain parser and generator. Fountain is plain text with simple markup (e.g., `INT. HOUSE - DAY` for sluglines).

### 🟡 Nice to Have: Microsoft Word (.docx) Export
**Priority:** Medium
**Description:** Export scripts as Word documents for sharing with non-screenwriting software users or for revision tracking.
**Implementation Notes:** Use docx library to generate properly formatted Word documents.

### 🟡 Nice to Have: HTML/Web Export
**Priority:** Medium
**Description:** Export script as a shareable HTML page with proper formatting, suitable for emailing or posting online.
**Implementation Notes:** Generate clean HTML with embedded CSS that maintains screenplay formatting.

### 🟢 Nice to Have: Import from PDF
**Priority:** Low
**Description:** Parse existing PDF scripts and convert them into editable script format. Useful for digitizing physical scripts.
**Implementation Notes:** Use PDF parsing library (difficult due to formatting complexity).

---

## Phase 3: Advanced Script Elements

### 🔴 Required: Dual Dialogue
**Priority:** High
**Description:** Two characters speaking simultaneously, displayed side-by-side. Common in overlapping conversations.
**Implementation Notes:** Create dual dialogue mode where two character/dialogue pairs are displayed horizontally.

### 🔴 Required: More/CONT'D Markers
**Priority:** High
**Description:** Indicate when dialogue continues from previous page (CONT'D) or when character has more dialogue (MORE).
**Implementation Notes:** Automatically detect when dialogue spans page breaks and add appropriate markers.

### 🟡 Nice to Have: Voice-Over (V.O.)
**Priority:** Medium
**Description:** Off-screen narration or character thoughts. Example: "JOHN (V.O.) I remember when this all started."
**Implementation Notes:** Add modifier to character name field or create separate character type.

### 🟡 Nice to Have: Off-Screen (O.S.)
**Priority:** Medium
**Description:** Character speaking from off-screen. Example: "JANE (O.S.) I'm in the kitchen!"
**Implementation Notes:** Similar to V.O., add modifier to character name.

### 🟡 Nice to Have: Montage
**Priority:** Medium
**Description:** Series of short scenes showing passage of time or multiple events. Special formatting with "MONTAGE" header.
**Implementation Notes:** Create montage container that groups multiple short scenes together.

### 🟡 Nice to Have: Series of Shots
**Priority:** Medium
**Description:** Visual sequence of quick shots, similar to montage but for action sequences.
**Implementation Notes:** Similar to montage, but with different formatting rules.

### 🟢 Nice to Have: Flashbacks
**Priority:** Low
**Description:** Mark scenes as flashbacks with special formatting. Example: "FLASHBACK - INT. HOUSE - 1995"
**Implementation Notes:** Add flashback modifier to slugline type.

### 🟢 Nice to Have: Intercut
**Priority:** Low
**Description:** Cutting between two locations. Example: "INTERCUT - PHONE CONVERSATION"
**Implementation Notes:** Special slugline type that groups alternating scenes.

### 🟢 Nice to Have: Split Screen
**Priority:** Low
**Description:** Two scenes happening simultaneously, displayed side-by-side.
**Implementation Notes:** Similar to dual dialogue but for entire scenes.

---

## Phase 4: Collaboration

### 🔴 Required: Comments & Notes
**Priority:** High
**Description:** Add inline comments and notes to script elements. Notes should be visible to collaborators but not appear in printed scripts.
**Implementation Notes:** Add comment system to each script item. Store comments separately from script content.

### 🔴 Required: Revision Tracking
**Priority:** High
**Description:** Track changes between script versions. Show what was added, deleted, or modified. Essential for professional workflow.
**Implementation Notes:** Implement diff algorithm to compare versions. Store revision history in database.

### 🟡 Nice to Have: Real-Time Co-Editing
**Priority:** High
**Description:** Multiple users editing the same script simultaneously with live updates. Similar to Google Docs.
**Implementation Notes:** Implement WebSocket or Server-Sent Events for real-time synchronization. Handle conflict resolution.

### 🟡 Nice to Have: User Roles & Permissions
**Priority:** Medium
**Description:** Define roles like Writer, Producer, Director, Reader with different permissions (edit, comment, view only).
**Implementation Notes:** Extend WordPress user roles system. Add permission checks for script access.

### 🟡 Nice to Have: Activity Feed
**Priority:** Medium
**Description:** Timeline showing who made what changes and when. Helps track script evolution and team contributions.
**Implementation Notes:** Log all changes with user ID and timestamp. Display in sidebar or separate panel.

### 🟡 Nice to Have: @Mentions
**Priority:** Medium
**Description:** Tag team members in comments or notes to notify them. Example: "@john please review this scene."
**Implementation Notes:** Parse @mentions in comments and send notifications to mentioned users.

### 🟢 Nice to Have: Colored Revision Pages
**Priority:** Low
**Description:** Industry-standard color coding for revisions (blue, pink, yellow, green, goldenrod, tan, cherry, etc.). Each revision gets a new color.
**Implementation Notes:** Track revision numbers and apply appropriate colors to changed pages in PDF export.

---

## Phase 5: Writing Assistance

### 🟡 Nice to Have: Character Name Suggestions
**Priority:** Medium
**Description:** Auto-complete character names as you type. Suggests existing characters from the script.
**Implementation Notes:** Track all character names and provide autocomplete suggestions in character input fields.

### 🟡 Nice to Have: Script Statistics
**Priority:** Medium
**Description:** Display page count, scene count, character count, speaking parts per character, estimated runtime.
**Implementation Notes:** Calculate statistics from script data. Display in sidebar or header.

### 🟡 Nice to Have: Character Arc Tracking
**Priority:** Low
**Description:** Track character development throughout the script. Show which scenes each character appears in.
**Implementation Notes:** Parse script to identify character appearances and create visual timeline.

### 🟡 Nice to Have: Beat Boards
**Priority:** Low
**Description:** Visual story structure tool with cards representing scenes or story beats. Drag and drop to reorganize story.
**Implementation Notes:** Create card-based UI showing scenes. Allow drag-and-drop reordering that updates script structure.

### 🟡 Nice to Have: Story Structure Templates
**Priority:** Low
**Description:** Pre-built templates for three-act structure, hero's journey, save the cat, etc. Helps organize script structure.
**Implementation Notes:** Create template library with predefined scene structures and prompts.

### 🟢 Nice to Have: Spell Checker
**Priority:** Low
**Description:** Screenplay-specific spell checking that recognizes character names, locations, and screenplay terminology.
**Implementation Notes:** Integrate spell checker library and build custom dictionary from script content.

---

## Phase 6: Production Tools

### 🟡 Nice to Have: Script Breakdown
**Priority:** Medium
**Description:** Tag script elements as characters, props, costumes, locations, special effects, etc. Essential for production planning.
**Implementation Notes:** Add tagging system to script items. Create breakdown view showing all tagged elements.

### 🟡 Nice to Have: Character List
**Priority:** Medium
**Description:** Auto-generate list of all characters in script with their speaking parts and scene appearances.
**Implementation Notes:** Parse script to identify all characters and their appearances.

### 🟡 Nice to Have: Location List
**Priority:** Medium
**Description:** Auto-generate list of all locations mentioned in sluglines with scene counts.
**Implementation Notes:** Parse sluglines to extract locations and count occurrences.

### 🟡 Nice to Have: Prop List
**Priority:** Low
**Description:** Extract all props mentioned in action lines. Helps production department plan props needed.
**Implementation Notes:** Use keyword detection or manual tagging to identify props in action lines.

### 🟢 Nice to Have: Shooting Schedule
**Priority:** Low
**Description:** Generate production shooting schedule based on locations and scenes. Optimizes filming order.
**Implementation Notes:** Group scenes by location and estimate shooting time. Allow manual reordering.

### 🟢 Nice to Have: Budget Tracking
**Priority:** Low
**Description:** Estimate production costs based on scene requirements (locations, props, cast, etc.).
**Implementation Notes:** Integrate with script breakdown to estimate costs per scene.

### 🟢 Nice to Have: Production Scene Numbers
**Priority:** Low
**Description:** Lock script with production scene numbers (separate from draft scene numbers). Used during filming.
**Implementation Notes:** Add production numbering mode that locks scene numbers and prevents further edits.

---

## Phase 7: UI/UX Enhancements

### 🟡 Nice to Have: Outline View
**Priority:** High
**Description:** Collapsed view showing only scene headers (sluglines) for quick navigation and story structure overview.
**Implementation Notes:** Create outline mode that hides all content except sluglines. Allow expanding/collapsing scenes.

### 🟡 Nice to Have: Navigator Panel
**Priority:** High
**Description:** Sidebar panel with scene list for quick navigation. Click to jump to any scene.
**Implementation Notes:** Create collapsible sidebar with clickable scene list and smooth scrolling.

### 🟡 Nice to Have: Character Panel
**Priority:** Medium
**Description:** View all dialogue for a specific character across the entire script. Useful for character consistency.
**Implementation Notes:** Filter script view to show only selected character's dialogue.

### 🟡 Nice to Have: Search and Replace
**Priority:** Medium
**Description:** Find and replace text across entire script. Essential for revisions (e.g., changing character names).
**Implementation Notes:** Add search/replace dialog with regex support and preview of changes.

### 🟡 Nice to Have: Keyboard Shortcuts
**Priority:** Medium
**Description:** Professional typist workflow with keyboard shortcuts for common actions (Tab for character, Enter for dialogue, etc.).
**Implementation Notes:** Implement comprehensive keyboard shortcuts matching Final Draft conventions.

### 🟡 Nice to Have: Focus Mode
**Priority:** Medium
**Description:** Distraction-free writing mode that hides UI chrome and highlights current editing area.
**Implementation Notes:** Add focus mode toggle that hides sidebars and highlights current script item.

### 🟡 Nice to Have: Night Mode
**Priority:** Low
**Description:** Dark theme for late-night writing sessions. Reduces eye strain.
**Implementation Notes:** Add theme toggle with dark color scheme.

### 🟢 Nice to Have: Customizable Toolbar
**Priority:** Low
**Description:** Allow users to customize which tools appear in the toolbar. Personalize workflow.
**Implementation Notes:** Add toolbar customization settings with drag-and-drop tool arrangement.

---

## Phase 8: Integration & Sync

### 🟡 Nice to Have: Cloud Sync
**Priority:** High
**Description:** Automatic backup and synchronization of scripts across devices. Never lose work.
**Implementation Notes:** Implement automatic save to cloud storage (WordPress media library or external service).

### 🟡 Nice to Have: Mobile Editing
**Priority:** Medium
**Description:** Edit scripts on mobile devices (phone/tablet). Optimized UI for touch interfaces.
**Implementation Notes:** Create responsive mobile UI with touch-friendly controls and simplified editing.

### 🟡 Nice to Have: Offline Mode
**Priority:** Medium
**Description:** Work without internet connection. Sync changes when connection is restored.
**Implementation Notes:** Implement service worker for offline functionality and sync queue for pending changes.

### 🟡 Nice to Have: Backup and Restore
**Priority:** Medium
**Description:** Automatic version backups and ability to restore previous versions. Safety net for writers.
**Implementation Notes:** Implement automatic backup system with version history and restore functionality.

### 🟢 Nice to Have: Dropbox/Google Drive Integration
**Priority:** Low
**Description:** Sync scripts directly to Dropbox or Google Drive for external backup and sharing.
**Implementation Notes:** Integrate with cloud storage APIs for automatic sync.

### 🟢 Nice to Have: Email Export
**Priority:** Low
**Description:** Send script directly via email as PDF or Fountain format attachment.
**Implementation Notes:** Add email functionality with template and attachment support.

---

## Phase 9: Advanced Features

### 🟡 Nice to Have: Script Locking
**Priority:** Medium
**Description:** Lock script for production to prevent further edits. Preserves script integrity during filming.
**Implementation Notes:** Add lock status to scripts with permission checks. Disable editing when locked.

### 🟡 Nice to Have: Watermarking
**Priority:** Medium
**Description:** Add "DRAFT", "CONFIDENTIAL", or custom watermarks to PDF exports. Protects intellectual property.
**Implementation Notes:** Add watermark overlay to PDF generation with customizable text and opacity.

### 🟡 Nice to Have: Version Comparison
**Priority:** Low
**Description:** Side-by-side comparison of two script versions showing all changes. Useful for reviewing revisions.
**Implementation Notes:** Implement diff view with side-by-side display of old and new versions.

### 🟡 Nice to Have: Script Notes (Separate)
**Priority:** Low
**Description:** Private notes that don't appear in printed scripts or exports. Writer's personal notes.
**Implementation Notes:** Add separate notes field per script item that's excluded from exports.

### 🟢 Nice to Have: Industry Standard Fonts
**Priority:** Low
**Description:** Use professional fonts like Courier Prime, Courier Screenplay, or Courier Final Draft. Industry standard.
**Implementation Notes:** License and embed professional fonts in PDF export.

### 🟢 Nice to Have: Page Count Tracking
**Priority:** Low
**Description:** Real-time page count with industry-standard calculation (1 page = 1 minute of screen time).
**Implementation Notes:** Implement accurate page counting algorithm that matches Final Draft calculations.

### 🟢 Nice to Have: Scene Length Tracking
**Priority:** Low
**Description:** Track estimated duration of each scene. Helps with pacing and timing.
**Implementation Notes:** Estimate scene length based on dialogue and action line counts.

### 🟢 Nice to Have: Character Speaking Time
**Priority:** Low
**Description:** Calculate how much dialogue each character has. Useful for casting and character development.
**Implementation Notes:** Count dialogue lines per character and estimate speaking time.

---

## Implementation Priority Guide

### 🔴 Required (Must Have)
These features are essential for competing with professional screenwriting software. Without these, the plugin won't be taken seriously by professional screenwriters.

### 🟡 Nice to Have (High Value)
These features significantly improve the user experience and bring the plugin closer to industry standards. Prioritize based on user feedback.

### 🟢 Nice to Have (Low Priority)
These are polish features that can be added over time. They enhance the product but aren't critical for initial success.

---

## Notes

- **User Feedback First:** Prioritize features based on actual user requests and needs
- **Iterative Development:** Release features in phases to get user feedback early
- **WordPress Integration:** Leverage WordPress ecosystem (plugins, themes, APIs) for competitive advantage
- **Open Source:** Consider making core plugin free with premium add-ons for advanced features
- **Community:** Build a community of screenwriters using WordPress to differentiate from standalone tools

---

**Last Updated:** January 2025
**Version:** 1.0.0

