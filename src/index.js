document.addEventListener('DOMContentLoaded', e => {
  const domController = new DOMController
})

const dogBar = document.querySelector('div#dog-bar')
const dogInfoDiv = document.querySelector('div#dog-info')
const pupImg = document.createElement('img')
const pupName = document.createElement('h2')
const pupButton = document.createElement('button')
let currPupObj = {}
const goodFilterButton = document.querySelector('button#good-dog-filter')

function getDogNames() {

  fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then(dogs => dogs.forEach(dog => displayDogName(dog)))
}

function displayDogName(dogObj) {
  const dogSpan = document.createElement('span')
  dogSpan.dataset.id = dogObj.id

  dogSpan.textContent = dogObj.name 

  dogBar.append(dogSpan)
}

dogBar.addEventListener('click', function(e) {
  const pupId = e.target.dataset.id
  fetch(`http://localhost:3000/pups/${pupId}`)
    .then(r => r.json())
    .then(showMorePup)
})

function showMorePup(pupObj) {
  dogInfoDiv.innerHTML = ""

  currPupObj = pupObj

  pupImg.src = pupObj.image
  pupName.textContent = pupObj.name
  pupButton.textContent = pupObj.isGoodDog ? "Good Dog!" : "Bad Dog!"
  pupButton.dataset.id = pupObj.id

  dogInfoDiv.append(pupImg, pupName, pupButton)
}

pupButton.addEventListener('click', function(e){
  
  fetch(`http://localhost:3000/pups/${pupButton.dataset.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({isGoodDog: !currPupObj.isGoodDog})
  })
  .then(r => r.json())
  .then(showMorePup)
})

goodFilterButton.addEventListener('click', function(e) {
  if (goodFilterButton.dataset.on == 'false') {
    goodFilterButton.dataset.on = 'true'
    goodFilterButton.textContent = 'Filter good dogs: ON'
    dogBar.innerHTML = ""
    getOnlyGoodDogs()
  }
  else if (goodFilterButton.dataset.on == 'true') {
    goodFilterButton.dataset.on = 'false'
    goodFilterButton.textContent = 'Filter good dogs: OFF'
    dogBar.innerHTML = ""
    getDogNames()
  }

})

function getOnlyGoodDogs() {
  fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then(dogs => {
      const goodDogs = dogs.filter(dog => dog.isGoodDog)
      goodDogs.forEach(dog => displayDogName(dog))
    })
}

getDogNames()