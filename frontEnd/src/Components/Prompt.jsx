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
      })
      .catch((error) => {
        console.error("Error sending prompt:", error);
        setResponse("Error: " + error.message);
      });
  };
  return (
    <div className="box w-[100%] h-screen ">
      <div className=" mainbox flex justify-center items-center w-full h-[85%]  ">
        <div className="response w-[70%] h-[89%]  bg-slate-300 p-10 rounded-lg text-wrap">
          <h3 className="  underline decoration-red-500 text-wrap text-overflow:ellipsis ">{prompt}</h3>
          <div className="text-left w-full underline decoration-sky-500 text-wrap">{response}</div>
        </div>
      </div>
      <div className="flex justify-center items-center w-[100%]">
        <form onSubmit={handleSubmit} className="prompt w-[80%] flex">
          <div className="rounded-l-3xl focus:outline-none placeholder:pl-10 bg-slate-300 w-[90%]">
            <input
              type="text"
              value={prompt}
              onChange={handleChange}
              placeholder="Enter your prompt"
              className="pro px-15 py-5 w-full rounded-l-3xl ml-10 focus:outline-none placeholder:pl-10 bg-slate-300"
            />
          </div>
          <button
            className="but rounded-r-3xl px-15 py-5 bg-white font-bold w-[15%] bg-slate-300"
            type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Prompt;
