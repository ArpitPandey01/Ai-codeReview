import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism, { highlight } from "prismjs";
import Editor from "react-simple-code-editor";
import "./App.css";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import Markdown from "react-markdown";

function App() {
  const [code, setCode] = useState(`function sum(){
 return a + b 
 }`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewCode() {
    const response = await axios.post("https://ai-codereview-l072.onrender.com/ai/get-review", {
      code,
    });
    setReview(response.data);
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 16,
                height: "100%",
                width: "100%",
                border: "2px solid #ddd",
                borderRadius: "5px",
              }}
            ></Editor>
          </div>
          <div className="review" onClick={reviewCode}>
            Review
          </div>
        </div>
        <div className="right">
          <Markdown
           rehypeplugins={[rehypeHighlight]}
          >{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
