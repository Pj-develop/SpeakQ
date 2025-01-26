npm create vite@latest --template frontend
cd frontend
npm install
npm install tailwindcss @tailwindcss/vite

https://ui.shadcn.com/docs/installation/vite

npm install -D @tailwindcss/postcss

npx shadcn@latest add accordion     


npx shadcn@latest init           

protoc -I=. questions.proto --js_out=import_style=commonjs: . --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
protoc --proto_path=. questions.proto --js_out=import_style=commonjs: . --grpc-web_out=import_style=typescript,mode=grpcwebtext:.


{
  "_id": {
    "$oid": "665568f4ac3f6205c943a937"
  },
  "type": "ANAGRAM",
  "anagramType": "WORD",
  "blocks": [
    {
      "text": "T",
      "showInOption": true,
      "isAnswer": true
    },
    {
      "text": "O",
      "showInOption": true,
      "isAnswer": true
    },
    {
      "text": "Y",
      "showInOption": true,
      "isAnswer": true
    }
  ],
  "siblingId": {
    "$oid": "66555f1a3735a7caf45b6f09"
  },
  "solution": "TOY",
  "title": "Rearrange the letters to form a word"
},
{
  "_id": {
    "$oid": "6654d0bc8571bf23e1bef300"
  },
  "type": "ANAGRAM",
  "anagramType": "SENTENCE",
  "blocks": [
    {
      "text": "I started learning",
      "showInOption": true,
      "isAnswer": true
    },
    {
      "text": "to play the guitar",
      "showInOption": true,
      "isAnswer": true
    },
    {
      "text": "because",
      "showInOption": true,
      "isAnswer": true
    },
    {
      "text": "I dream of forming a band",
      "showInOption": true,
      "isAnswer": true
    },
    {
      "text": "and playing",
      "showInOption": true,
      "isAnswer": true
    },
    {
      "text": "in concerts.",
      "showInOption": true,
      "isAnswer": true
    }
  ],
  "siblingId": {
    "$oid": "6654bf1de7b8dd361ba05bf3"
  },
  "solution": "I started learning to play the guitar because I dream of forming a band and playing in concerts.",
  "title": "Rearrange the words to form a sentence"
},
{
  "_id": {
    "$oid": "6655b1c5d3d666003d3b1d83"
  },
  "type": "MCQ",
  "options": [
    {
      "text": "under",
      "isCorrectAnswer": true
    },
    {
      "text": "below",
      "isCorrectAnswer": false
    },
    {
      "text": "above",
      "isCorrectAnswer": false
    },
    {
      "text": "over",
      "isCorrectAnswer": false
    }
  ],
  "siblingId": {
    "$oid": "66554e47c59979a52d16b1e9"
  },
  "title": "In my previous job, I often had to complete tasks ______ tight deadlines."
},