# Hospital Dashboard Technical Assessment

This project implements a single-page Hospital Dashboard based on the technical and UI/UX requirements specified.

The application leverages **React** and **TypeScript** for front-end development, utilizes **Zustand** for state management.

---

## Setup Instructions

Follow these steps to set up and run the project locally.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Tech-Genius/Hospital-Dahboard
    cd hospital-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application in development mode:**
    ```bash
    npm run dev
    ```

4.  The application will be accessible at the address displayed in your console (typically `http://localhost:5173`).

---

## Libraries Used

The following core libraries were selected to meet the assessment's requirements for functionality, state management, and code quality.

| Library | Purpose | Rationale |
| :--- | :--- | :--- |
| **React & TypeScript** | UI Development and Type Safety | Required by the assessment. TypeScript is crucial for ensuring strong typing across all data structures and interfaces. |
| **Zustand** | Global State Management | Required by the assessment as a lightweight, hook-based alternative to Redux. Used to manage the global application state, including the hospital list, filtering parameters, and UI stats. |
| **Axios** | API Communication | Utilized for robust and efficient handling of external API calls, providing improved request/response handling and error management compared to the native Fetch API. |
| **Tailwind CSS** | Styling and Theming | Chosen for rapid development and flexibility. Used to precisely match the specified dark-mode aesthetic, responsiveness, and component structures from the provided UI designs. |

---

### Implementation Highlights

* **Data Requirements:** The application successfully fetches the list of hospitals, filtering specifically for **Nigeria** (`countryId: 166`), and implements pagination showing **10 hospitals per page** to cover the required 30 most recent records.

* **Modularity:** The project uses a clean architecture with separate directories for `api`, `store`, `types`, and components, ensuring high maintainability and separation of concerns.

