[![Human Hands Logo](https://imagedelivery.net/q-41_Eh4Vh68wzQLFCdK2g/159ef558-bbd3-4585-4b60-f973b2c7fd00/public)](http://www.canwefixityeswecan.info/)

# Human Hands 👐

## Overview

**Human Hands** is a voice-controlled AI assistant project designed to liberate your hands!  This project allows you to interact with digital interfaces and perform tasks using natural language voice commands, freeing you from the constraints of traditional input methods like keyboards and mice.  Imagine controlling your computer, interacting with tutorials, and generating content, all while keeping your hands free for other activities. This project leverages the power of AI, specifically large language models (LLMs) and speech-to-text/text-to-speech technologies, to create a seamless and intuitive hands-free experience.

## Core Concept: Free Your Hands!

The primary goal of Human Hands is to empower users by enabling them to interact with technology without needing to physically touch a device.  This has numerous applications, including:

*   **Accessibility:**  Assisting individuals with limited mobility or dexterity.
*   **Multitasking:**  Enabling users to control applications while performing other manual tasks (e.g., cooking, working with tools, assembling products).
*   **Tutorials and Training:**  Providing interactive, voice-guided tutorials where users can follow along with physical instructions without needing to switch focus between a screen and their hands.
*   **Enhanced Productivity:**  Streamlining workflows by allowing users to control their digital environment through voice.

## Features

*   **Voice-Controlled Interface:**  Interact with the application using natural language commands.
*   **AI-Powered Conversations:**  Engage in dynamic conversations with an AI assistant powered by Google's Gemini.
*   **Interactive Tutorials:**  Access step-by-step, voice-guided tutorials for various tasks (e.g., assembling furniture, technical procedures).
*   **Multimedia Integration:**  Seamlessly incorporate images and videos into the interactive experience.
*   **Customizable Agents:**  The architecture supports multiple AI "agents" tailored to specific domains (e.g., an IKEA furniture assembly agent, a Grundfos pump maintenance agent).
*   **Real-time Audio Visualization:** Provides visual feedback of audio input.
*   **Text-to-Speech (TTS):** Uses ElevenLabs for high-quality, natural-sounding voice output.

## Technology Stack

*   **Frontend:**
    *   [Next.js](https://nextjs.org/): A React framework for building server-rendered and statically generated web applications.
    *   [React](https://react.dev/): A JavaScript library for building user interfaces.
    *   [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds static typing.
    *   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
    *   [Shadcn/ui](https://ui.shadcn.com/): UI component library.
*   **Backend:**
    *   [Python](https://www.python.org/):  Used for the agents API.
    *   [Flask](https://flask.palletsprojects.com/): A lightweight Python web framework.
    *   [Google Generative AI (Gemini)](https://ai.google.dev/):  Powers the core conversational AI capabilities.
    *   [ElevenLabs](https://elevenlabs.io/): Provides text-to-speech functionality.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (or yarn, pnpm, or bun)
*   [Python 3.7+](https://www.python.org/)
*   A Google AI Studio API key (for Gemini)
*   An ElevenLabs API key (optional, for TTS)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install frontend dependencies:**

    ```bash
    npm install
    # or
    yarn
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Set up the backend (agents API):**

    ```bash
    cd src/agents-api
    python -m venv venv
    source venv/bin/activate  # On Linux/macOS
    # or
    venv\Scripts\activate  # On Windows
    pip install -r requirements.txt
    ```

4.  **Create a `.env` file in the `src/agents-api` directory:**

    ```
    GOOGLE_API_KEY=<your-google-ai-api-key>
    FLASK_APP=app.py
    FLASK_ENV=development
    # ELEVENLABS_API_KEY=<your-elevenlabs-api-key>  (Optional)
    ```
    Add your Google AI Studio API key.  If you plan to use ElevenLabs for text-to-speech, also add your ElevenLabs API key.

### Running the Application

1.  **Start the backend (agents API):**

    ```bash
    cd src/agents-api
    python -m venv venv
    source venv/bin/activate or source venv\Scripts\activate  # On Windows
    pip install -r requirements.txt
    flask run
    ```
    This will typically start the Flask server on `http://127.0.0.1:5000`.

2.  **Start the frontend (Next.js development server):**

    ```bash
    # In the root directory of the project
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

3.  **Open your browser:**

    Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

*   **`src/app`:**  Contains the main application code, including pages, API routes, and components.
    *   `api`:  Next.js API routes (serverless functions).
    *   `chat`: API route for handling chat interactions.
    *   `tutorials`: Pages for specific tutorials (e.g., `grundfoss`, `ikea-shelf`).
    *   `page.tsx`: The main landing page.
*   **`src/components`:**  Reusable React components.
    *   `AudioVisualizer.tsx`: Visualizes audio input.
    *   `ElevenLabsConversation.tsx`: Handles text-to-speech using ElevenLabs.
    *   `Navbar.tsx`: The application's navigation bar.
    *   `Tutorials.tsx`:  Displays the list of available tutorials.
    *   `ui`: Shadcn/ui components.
*   **`src/lib`:**  Utility functions and helper classes.
    *   `gemini-handler.ts`:  Manages interactions with the Google Gemini API.
    *   `utils.ts`: General utility functions.
*   **`src/agents-api`:** Python Flask backend for AI agents.
    *   `app.py`: Main Flask application file.
    *   `requirements.txt`: Lists Python dependencies.
    *   `utils.py`: Utility functions for the backend.

## Contributing

Contributions are welcome!  Please feel free to submit issues or pull requests.

## Learn More (Next.js Specific)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
