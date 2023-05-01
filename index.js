document.addEventListener("DOMContentLoaded", (event) => {
  let button = document.querySelector("button");
  let result = document.querySelector(".result");
  let notFound = document.querySelector(".notFound");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    notFound.style.display = "none";
    let input = document.querySelector("input[name=vin]").value;
    if (input) {
      input = input.toUpperCase();
    }
    fetch(`https://testyoursite.ru:9002/checks_gosnomer/${input}`)
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
            result.innerHTML = "";
            setTimeout(() => {
              result.innerHTML = `
            <div class="main-data">
            <p>
            <span class="badge rounded-pill bg-light text-dark"
              >Результат запроса
            </p>
            <p>
              <span class="badge rounded-pill bg-light text-dark"
                >Данные об автомобиле
              </p>
            <p>
              <span class="badge rounded-pill bg-success pill-response"
                >Госномер</span
              >
              ${gosnomer}
            </p>
            <p>
              <span class="badge rounded-pill bg-success pill-response"
                >Офис</span
              >
              ${office}
            </p>
            <p>
              <span class="badge rounded-pill bg-success pill-response"
                >VIN номер</span
              >
              ${vin_nomer}
            </p>
          </div>
          <p>
            <span class="badge rounded-pill bg-light text-dark"
              >Данные диагностической карты
            </p>          <div class="diagnostic">
            <p>
              <span class="badge rounded-pill bg-info text-dark pill-response"
                >Дата проверки</span
              >
              ${check_date}
            </p>
            <p>
              <span class="badge rounded-pill bg-info text-dark pill-response"
                >Статус</span
              >
              ${diagnosticcards}
            </p>
            <p>
              <span class="badge rounded-pill bg-info text-dark pill-response"
                >Дата регистрации</span
              >
              ${dcdate}
            </p>
            <p>
              <span class="badge rounded-pill bg-info text-dark pill-response"
                >Срок действия</span
              >
              ${dcexpirationdate}
            </p>
            <p>
              <span class="badge rounded-pill bg-info text-dark pill-response"
                >Адрес</span
              >
              ${pointaddress}
            </p>
            <p>
              <span class="badge rounded-pill bg-info text-dark pill-response"
                >Номер оператора</span
              >
              ${operatorname}
            </p>
            <p>
              <span class="badge rounded-pill bg-info text-dark pill-response"
                >Значение оператора</span
              >
              ${odometervalue}
            </p>
            <p>
              <span class="badge rounded-pill bg-info text-dark pill-response"
                >Номер диагностической карты</span
              >
              ${dcnumber}
            </p>
          </div>
        </div>
            `;
            }, 100);
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
