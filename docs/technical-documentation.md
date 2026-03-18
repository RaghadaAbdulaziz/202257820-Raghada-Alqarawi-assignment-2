# Technical Documentation

## Overview

This portfolio is a client-side web application designed to demonstrate proficiency in modern front-end development. It extends Assignment 1 by adding interactivity, dynamic behavior, and improved user experience using JavaScript.

The application follows a single-page structure where all interactions are handled on the client side without requiring a backend.

---

## Technical Architecture

### 1. Styling Strategy

**CSS Variables**
- The design uses `:root` and `[data-theme="dark"]` to manage light and dark themes.
- This allows dynamic theme switching without modifying individual styles.

**Flexbox & Grid**
- Flexbox is used for layout alignment in:
    - Navigation Bar
    - Hero Section
    - Footer
- CSS Grid is used for the Project Gallery (`.cards`) to create a responsive layout that automatically adjusts across screen sizes.

---

### 2. JavaScript Implementation

**Theme Management**
- Uses `localStorage` to store user theme preference.
- An event listener toggles the `data-theme` attribute on the `<html>` element.
- The selected theme persists after page refresh.

**Dynamic Content Handling**
- Project filtering is implemented using `data-category` attributes.
- Search functionality filters projects in real time using user input.
- DOM manipulation is used to show/hide project cards dynamically.

**Modal System**
- Each project card includes `data-*` attributes.
- When the "View Details" button is clicked:
    - JavaScript extracts the data
    - Updates modal content
    - Displays the modal dynamically

**Form Handling & Validation**
- Uses `e.preventDefault()` to stop default form submission.
- Validates inputs:
    - Required fields check
    - Email format using Regex
- Displays:
    - Error messages
    - Loading message
    - Success confirmation

**User Feedback System**
- Displays clear messages for:
    - Validation errors
    - Submission status
    - Empty search/filter results

---

### 3. Animations & Interactions

**Scroll Reveal Animation**
- Implemented using the `IntersectionObserver` API.
- Elements appear smoothly when they enter the viewport.

**Smooth Scrolling**
- Navigation links scroll smoothly between sections.

**Hover & Transition Effects**
- Buttons and cards include transitions to improve visual feedback.

---

### 4. Responsive Design

**Breakpoints**
- Desktop: > 768px (multi-column layout)
- Mobile/Tablet: < 768px (single-column layout)

**Adjustments**
- Navigation adapts to smaller screens
- Layout elements stack vertically
- Font sizes scale appropriately

---
## Folder Structure




## Improvements from Assignment 1

- Added project filtering and search functionality
- Introduced modal popup for dynamic project details
- Improved form structure by adding labels.
- Implemented localStorage for theme persistence
- Added animations (scroll reveal and transitions)
- Improved navigation with active section highlighting
- Organized JavaScript into modular functions

---

## Known Issues & Future Improvements

- Add backend integration for real form submission
- Add keyboard navigation support
- Replace placeholder visuals with real project images
- Add advanced animations for modal transitions

---
