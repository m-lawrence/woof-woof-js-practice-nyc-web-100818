document.addEventListener('DOMContentLoaded', e => {
  const domController = new DOMController
})

const dogBar = document.querySelector('div#dog-bar')

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
  
}

getDogNames()