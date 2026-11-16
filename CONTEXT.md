# 🍳 Recipe Sharing Platform - MVP Specification & Context

> **Project Context & MVP Specification Document**  
> Serves as the single source of truth for the entire development lifecycle (Frontend & Backend).

---

## 🎯 1. Project Overview
- **Concept:** A community recipe sharing platform integrated with an **AI Chef Assistant**.
- **MVP Scope (Phase 1):** 
  - Only **Admin** can create, edit, and manage recipes (ensuring high content quality and structured data).
  - **Users**: Search, filter, view recipes, interact with the AI Chef, save to personal bookmarks, rate, and comment.
  - User-submitted recipes will be enabled in a future release (Phase 2).
- **Core Tech Stack & Infrastructure:**
  - **Backend:** NestJS (NodeNext module resolution, TypeScript, **Hexagonal Architecture - Ports & Adapters**).
  - **Database:** PostgreSQL (with **Prisma ORM** for schema migrations and type safety).
  - **Frontend:** React + TypeScript + Vite + Tailwind CSS.
  - **AI Engine:** Google Gemini API (or OpenAI SDK) with context-aware prompting and token usage tracking.

---

## 👨‍🍳 2. User-Facing Features (User Side)

### A. Landing Page (Main Page)
- **Search Bar:** Real-time search by recipe title or ingredient keywords.
- **Recipe Feeds:** Latest recipes and featured/trending recipes.
- **Multi-Criteria Smart Filters:**
  - **Category:** Vegan, Soup, Stir-fry, Grilled/Roast, Dessert, etc.
  - **Cooking Time:** Under 15 mins, 15–30 mins, 30–60 mins, over 1 hour.
  - **Difficulty:** Easy, Medium, Hard.
  - **Original Region:** Northern, Central, Southern Vietnamese, Asian, Western, etc.

### B. Recipe Detail Page
- **Overview Information:**
  - Cover thumbnail, video tutorial URL (if available).
  - Recipe title, engaging description, author info, cooking time, difficulty level.
  - Portions / Servings count.
- **Interactive Ingredient List:**
  - Structured format: Ingredient Name + Quantity + Measurement Unit (e.g., 500g beef, 2 onions).
  - **Checkboxes (Tick boxes):** Users can check off ingredients as they prepare them.
- **Step-by-Step Instructions:**
  - Clear instructions accompanied by step illustrations/images (if available).
  - Checkboxes to track progress while cooking in the kitchen.

### C. AI Chef Assistant (Highlight Feature ⭐)
Designed as a **Floating Chatbox** or a **Dedicated Sidebar** next to the recipe being viewed. The AI automatically detects the current recipe context:
1. **Ingredient Substitution:**
   - *"I ran out of whipping cream, can I substitute it with fresh milk?"*
   - *"What is the difference between tapioca starch and cornstarch in this recipe?"*
2. **Cooking Troubleshooting:**
   - *"I accidentally put too much salt in the broth, how do I fix it?"*
   - *"Why won't my egg whites whip into stiff peaks?"*
3. **Personalization & Nutrition:**
   - *"Approximately how many calories does this dish contain?"*
   - *"How can I adapt this recipe for a vegetarian/vegan diet?"*
   - *"Suggest a beverage or side dish that pairs well with this recipe."*
4. **One-Tap Quick Prompts:**
   - Preset prompt chips under the recipe: `[Ingredient Substitutions]`, `[Tips to Avoid Burning]`, `[Estimate Calories]`, `[Fix Salty/Sweet]` allowing hands-free or quick 1-tap inquiries while cooking.

### D. Account & Social Interactions
- **Authentication:** Email/Password and Social Login (Google OAuth).
- **Personal Cookbook (Bookmarks / Favorites):** Save favorite dishes for quick access while in the kitchen.
- **Ratings & Reviews:** 1–5 star rating and comment section for feedback and real cooking tips.

---

## 🛡️ 3. Admin Portal (Admin Side)
The Admin Portal in the MVP focuses on fast and structured data entry, content moderation, and AI cost monitoring.

### A. Recipe & Catalog Management (CMS)
- **Recipe CRUD:**
  - Structured editor: Recipe title, cover image, video URL, cooking time, portions, difficulty, regional origin.
  - Structured ingredients input: Ingredient Name + Quantity + Measurement Unit.
  - Structured step-by-step instructions with media support.
- **Recipe Publication Status:**
  - `DRAFT`: Work in progress, not visible to users.
  - `PUBLISHED`: Publicly visible to all users.
  - `HIDDEN`: Temporarily hidden or archived.
- **Categories, Tags & Ingredient Dictionary:**
  - Manage recipe categories and tag labels (e.g., Vegetarian, Weight Loss, Holiday Specials).
  - Master ingredient dictionary for search autocomplete and filtering.

### B. User Management & Moderation
- **User Administration:** View user directory, ban/unban spam or abusive accounts.
- **Interaction Moderation:** Review and delete inappropriate, toxic, or spam comments and ratings.

### C. Analytics Dashboard
- **Growth Metrics:** Total recipes published, total registered users.
- **Trending Recipes:** Top 5 most viewed and bookmarked recipes of the week/month.
- **AI Monitoring & Cost Control:** Track daily/monthly AI call volume and token consumption to control operational API costs.

---

## 🗄️ 4. Core Data Entities

1. **User:** `id`, `email`, `username`, `passwordHash`, `displayName`, `avatarUrl`, `bio`, `role` (`ADMIN`, `USER`, `CHEF`), `status` (`ACTIVE`, `BANNED`, `DELETED`), `deletedAt`, `createdAt`, `updatedAt`.
2. **Recipe:** `id`, `title`, `slug`, `description`, `thumbnailUrl`, `videoUrl`, `cookingTimeMinutes`, `difficulty` (`EASY`, `MEDIUM`, `HARD`), `servings`, `region`, `status` (`DRAFT`, `PUBLISHED`, `HIDDEN`), `authorId`, `createdAt`, `updatedAt`.
3. **RecipeIngredient:** `id`, `recipeId`, `name`, `amount`, `unit`.
4. **RecipeStep:** `id`, `recipeId`, `stepNumber`, `instruction`, `imageUrl`.
5. **Bookmark:** `id`, `userId`, `recipeId`, `createdAt`.
6. **Review / Rating:** `id`, `userId`, `recipeId`, `rating` (1–5), `comment`, `createdAt`.
7. **AiConversation / Log:** `id`, `userId`, `recipeId`, `tokensUsed`, `createdAt`.
