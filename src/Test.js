// import React, { useState, useEffect } from "react";
// import db from "./firebase";

// function Test() {
//   let arr = [];
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     db.collection("comments")
//       .where("comment_id", "==", "dEyb6t5d9Jsj6NAepCYs")
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           console.log(doc.data());
//         });
//       })
//       .catch((error) => {
//         console.log("Error getting documents: ", error);
//       });
//     console.log(posts);
//   }, []);
//   console.log(posts);
//   return <div>test</div>;
// }

// export default Test;
