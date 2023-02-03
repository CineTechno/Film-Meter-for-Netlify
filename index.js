const button = document.querySelector(".btn");
console.log(button.innerHTML);

button.addEventListener("click", async function (e) {
  e.preventDefault();
  rating = await fetch("http://127.0.0.1:3000");
  data = await rating.json();
  console.log(data);
});

// filmRating().then((res) => console.log(res));
