document.addEventListener("DOMContentLoaded", function () {
  const fetchBtn = document.querySelector(".btn");

  fetchBtn.addEventListener("click", async () => {
    const textInput = document.querySelector(".filmTitle").value;
    console.log(textInput);
    const response = await fetch(".netlify/functions/webScraper", {
      method: "POST",
      body: JSON.stringify({ title: textInput }),
    });
    const data = await response.json();
    console.log(data);
  });
});
// filmRating().then((res) => console.log(res));
