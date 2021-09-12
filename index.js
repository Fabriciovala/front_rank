let dataResponse = [];
let screenData = [];

listUser.forEach(async (user) => {
  const responseFetch = await fetch(
    `https://www.codewars.com/api/v1/users/${user}`
  );
  const data = await responseFetch.json();
  dataResponse = [...dataResponse, data];
});

const prizeDrawEmoji = (number) => {
  switch (number) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    case 3:
      return "🎖️";
    case 4:
      return "🎖️";
    default:
      return "👩‍💻";
  }
};

const createElement = () => {
  setTimeout(() => {
    screenData = dataResponse.sort((a, b) => b.honor - a.honor);

    const criarCard = (data, index) => {
      if (index <= 4) {
        const containerCardId = document.querySelector("#containerCardId");
        console.log(index);
        const blockHTML = `
          <div class="iconNameUser">
              <div class="icon">${prizeDrawEmoji(index)}</div>
              <h3 class="nameUser">${data.username}</h3>
          </div>
          <p class="qtdKata">QTD de katas: ${
            data.codeChallenges.totalCompleted
          }</p>
          <div class="honor">
              <p class="score">Score: ${data.honor}</p>
          </div>
      `;

        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = blockHTML;

        containerCardId.appendChild(div);
      }
    };

    screenData.forEach((element, index) => criarCard(element, index));
  }, 500);
};

createElement();
