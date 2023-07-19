import React, { useEffect, useState } from "react";

// export default function Test() {
//   const [resourceType, setResourceType] = useState("posts");
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         setItems(json);
//       });
//   }, [resourceType]);

//   return (
//     <>
//       <div>
//         <button onClick={() => setResourceType("posts")}>Posts</button>
//         <button onClick={() => setResourceType("users")}>Users</button>
//         <button onClick={() => setResourceType("comments")}>Comments</button>
//         <h1>{resourceType}</h1>
//         {items.map((i) => (
//           <pre key={i.id}>{JSON.stringify(i)}</pre>
//         ))}
//       </div>
//     </>
//   );
// }

export default function Test() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  console.count("render");
  return (
    <>
      <div>{windowWidth}</div>
      {windowWidth > 600 ? <h1>TEST</h1> : <p>test</p>}
    </>
  );
}
