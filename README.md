# QuestSearch

QuestSearch is a dynamic and user-friendly search interface for question databases. It supports various question types, filters, and pagination, providing an efficient way to query and manage question data. The project is built with a React frontend and a Node.js/Golang backend, communicating via gRPC. MongoDB is used for storage.

## Features
- Search and filter questions by type (e.g., MCQ, Anagram, etc.).
- Support for pagination and responsive UI.
- Integration with gRPC for backend communication.
- TailwindCSS for modern styling.
- Uses shadcn/ui for consistent UI components.

---

## Tech Stack

### Frontend
- React (Vite for development)
- TailwindCSS
- shadcn/ui components
- Framer Motion for animations

### Backend
- Node.js or Golang
- gRPC
- MongoDB

---

## Setup and Installation

### Frontend

1. **Initialize Project**:
    ```bash
    npm create vite@latest --template react
    cd frontend
    npm install
    ```

2. **Install TailwindCSS**:
    ```bash
    npm install tailwindcss @tailwindcss/vite
    npm install -D @tailwindcss/postcss
    ```
    Configure TailwindCSS following [TailwindCSS Setup](https://tailwindcss.com/docs/installation).

3. **Add shadcn/ui**:
    ```bash
    npx shadcn@latest init
    npx shadcn@latest add accordion
    ```
    Follow the [shadcn/ui Vite setup](https://ui.shadcn.com/docs/installation/vite).

### Backend

1. **Generate gRPC files**:
    ```bash
    protoc -I=. questions.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=typescript,mode=grpcwebtext:.
    ```

2. **Run the backend**:
    - Set up your Node.js or Golang server.
    - Ensure MongoDB is connected and properly configured.

---

## Deployment

### Frontend
Host the frontend on [Netlify](https://www.netlify.com/):
1. Push the project to a Git repository (e.g., GitHub).
2. Connect the repository to Netlify.
3. Set the build command to:
    ```bash
    npm run build
    ```
4. Deploy the site.

### Backend
Host the backend on [Render](https://render.com/):
1. Push the backend code to a Git repository.
2. Create a new Web Service on Render.
3. Configure the environment variables for MongoDB and gRPC.
4. Deploy the service.

---

## Example Question JSON Structure

### Anagram Question
```json
{
  "_id": { "$oid": "665568f4ac3f6205c943a937" },
  "type": "ANAGRAM",
  "anagramType": "WORD",
  "blocks": [
    { "text": "T", "showInOption": true, "isAnswer": true },
    { "text": "O", "showInOption": true, "isAnswer": true },
    { "text": "Y", "showInOption": true, "isAnswer": true }
  ],
  "solution": "TOY",
  "title": "Rearrange the letters to form a word"
}
```

### MCQ Question
```json
{
  "_id": { "$oid": "6655b1c5d3d666003d3b1d83" },
  "type": "MCQ",
  "options": [
    { "text": "under", "isCorrectAnswer": true },
    { "text": "below", "isCorrectAnswer": false },
    { "text": "above", "isCorrectAnswer": false },
    { "text": "over", "isCorrectAnswer": false }
  ],
  "title": "In my previous job, I often had to complete tasks ______ tight deadlines."
}
```

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue for discussion.

