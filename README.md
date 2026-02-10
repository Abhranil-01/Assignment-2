# AI Product Card Generator

## Overview

This is a simple web application that generates **AI-powered product card details** (Title, Description, and Keywords) based on a user-provided **Product Name** and **Category**. The generated content is displayed as a styled product card.

The app demonstrates:

* Form handling
* REST-based AI integration
* Basic state management
* Conditional rendering

---

## Features

* Input form for **Product Name** and **Product Category**
* "Generate Details" button
* AI-generated:

  * Product title
  * Short description
  * 4 relevant keywords
* Graceful fallback if AI fails or returns invalid data
* Loading state during AI generation
* Clean, minimal UI with CSS styling

---

## Tech Stack

* **React (Vite)**
* **JavaScript (ES6+)**
* **CSS**
* **OpenRouter AI (REST API)**

---

## Project Structure

```
src/
 ├─ App.jsx
 ├─ App.css
 ├─ ProductForm/
 │   └─ ProductForm.jsx
 ├─ ProductCard/
 │   └─ ProductCard.jsx
 └─ service/
     └─ fetchDataFromAi.js
```

---

## How AI Is Used

* The app calls **OpenRouter's Chat Completion API** using `fetch`
* User inputs (product name & category) are sent to the AI model
* A **strict system prompt** ensures:

  * No empty fields
  * Title contains both product name & category
  * Exactly 4 relevant keywords
  * No placeholders like "Generic" or "Unspecified"
* The response is parsed as JSON
* If AI output is invalid, a **fallback product object** is used

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-product-card-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### 4. Run the App

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## Example Output

**Title:** Sports Equipment Cricket Bat
**Description:** A high-quality cricket bat designed for professional and practice matches.
**Keywords:** cricket bat, sports equipment, professional gear, quality item

---

## Assignment Requirements Checklist

* ✅ React used
* ✅ AI integration via REST API
* ✅ Form with product name & category
* ✅ Generate button
* ✅ AI-generated title, description & keywords
* ✅ Styled product card output
* ✅ Simple state management
* ✅ README included

---

## Notes

* Uses a **free AI model** via OpenRouter
* Defensive coding ensures the UI never breaks due to bad AI responses
* Suitable for beginner-level AI + frontend integration demos

---

## Author

**Abhranil Kundu**
