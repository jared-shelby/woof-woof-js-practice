// add pups to dog bar
const dogBar = document.getElementById("dog-bar");
const dogInfo = document.getElementById("dog-info");

function createPup(pup) {
    let newSpan = document.createElement("span");
    newSpan.innerHTML = pup.name;
    newSpan.dataset.id = pup.id;

    // show more info about pup when clicked
    newSpan.addEventListener("click", event => {
        dogInfo.innerHTML = 
            `<img src=${pup.image}>
            <h2>${pup.name}</h2>
            <button>${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`
        dogInfo.querySelector("button").dataset.id = pup.id;
            // toggle good dog
        const goodBadButton = dogInfo.querySelector("button");
        goodBadButton.addEventListener("click", event => {
            let currentPupId = goodBadButton.dataset.id;
            let newStatus = goodBadButton.innerHTML.includes("Good") ? false : true;
            let configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({isGoodDog: newStatus})
            };
            fetch(`http://localhost:3000/pups/${pup.id}`, configObj)
                .then(response => response.json())
                .then(data => newStatus ? goodBadButton.innerHTML = "Good Dog!" : goodBadButton.innerHTML = "Bad Dog!");
        });
    });
    return newSpan;
}

fetch("http://localhost:3000/pups")
    .then(result => result.json())
    .then(data => data.forEach(pup => dogBar.appendChild(createPup(pup))));
