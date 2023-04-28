document.addEventListener("DOMContentLoaded", (event) => {
  let divMain = document.querySelector("div.main");
  let button = document.querySelector("button");
  let result = document.querySelector("input[name=result]");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    let input = document.querySelector("input[name=vin]").value;
    console.log(input);
    fetch(`https://testyoursite.ru:9002/cars/${input}`)
      .then((response) => response.json())
      .then((data) => {
        result.value = data[0].gosnomer;
        // let { car_id, gosnomer, vin_nomer, office, model } = element;
        // divMain.innerHTML =
        //   divMain.innerHTML +
        //   `
        // <p>${car_id}${gosnomer}${vin_nomer}${office}${model}</p>
        // `;
      });
  });
});
