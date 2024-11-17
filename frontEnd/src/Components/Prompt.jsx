// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "../styles/prompt.css";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/chat", {
        prompt: prompt,
      })
      .then((response) => {
        const data = response.data;
        const mainData = data.replace(/(\*\*|#)/, "\n");
        const filterData = mainData.replace(/(\*\*|\*)/g, "");
        setResponse(filterData);
        setPrompt("");
      })
      .catch((error) => {
        console.error("Error sending prompt:", error);
        setResponse("Error: " + error.message);
      });
  };
  return (
    <div className="box">
      <div className="response">{response}</div>
      <form onSubmit={handleSubmit} className="prompt">
        <input
          type="text"
          value={prompt}
          onChange={handleChange}
          placeholder="Enter your prompt"
          className="pro"
        />
        <button className="but" type="submit">Send</button>
      </form>
    </div>
  );
};

export default Prompt;
