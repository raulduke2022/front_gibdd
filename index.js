document.addEventListener("DOMContentLoaded", (event) => {
  let button = document.querySelector("button");
  let result = document.querySelector(".result");
  let notFound = document.querySelector(".notFound");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    notFound.style.display = "none";
    let input = document.querySelector("input[name=vin]").value;
    console.log(input);
    fetch(`https://testyoursite.ru:9002/checks_vin/${input}`)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            let {
              gosnomer,
              vin_nomer,
              office,
              check_date,
              diagnosticcards,
              dcexpirationdate,
              pointaddress,
              chassis,
              operatorname,
              odometervalue,
              dcnumber,
              dcdate,
            } = data;
            result.style.display = "block";
            console.log(gosnomer, dcexpirationdate);
            result.innerHTML = `
            <h2>Результат запроса</h2>
            <p>Общие данные</p>
            <ul>
              <li>Госномер</li>
              <li>Офис</li>
              <li>Марка/Модель</li>
            </ul>
            <p>Данные о диагностической карте</p>
            <div class="dataVipuska">ДАТА выпуска ${dcexpirationdate}</div>
            `;
          });
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .catch((error) => {
        result.innerHTML = ``;
        console.log(error);
        notFound.style.display = "block";
      });
  });
});
