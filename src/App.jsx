import React, { useEffect } from "react";
import Navbar from "./Compo/NavBar";
import Content from "./Compo/Content";
import FillBlanks from "./Compo/FillBlanks";

export default function App() {
  // console.log("https://github.com/yghugardare/Sample/blob/main/sample.json");
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/yghugardare/Sample/main/sample.json"
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Content data={data}/>
    </>
  );
}
