const select = document.querySelector('.select-user')
const female = document.querySelector('.female')
const male = document.querySelector('.male')

// select.addEventListener('change',(event) => {
    female.addEventListener('click', (event) => {
        loadFemale()
    })
    male.addEventListener('click', (event) => {
        loadMale()
    })
    // if(event.target.value === 'female'){
    //     loadFemale()
    // }else if(event.target.value === 'male'){
    //     loadMale()
    // }
    

document.addEventListener("DOMContentLoaded", () => {
    const random = getRandomInt(1, 151)
    axiosApi(random)
})

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const loadFemale = async (id) => {
    console.log('entro');
    const res = await axios(`https://randomuser.me/api/?gender=female`)
    const data = res.data.results[0]
    dataPerson(data)

    
}
const loadMale = async (id) => {
    console.log('entro');
    const res = await axios(`https://randomuser.me/api/?gender=male`)
    const data = res.data.results[0]
    dataPerson(data)

    
}

const dataPerson = (data) => {
    const person = {
        image: data.picture.large,
        name: {
            title: data.name.title,
            first: data.name.first,
            last: data.name.last
        },
        email: data.email,
        birthday: data.dob.date,
        address: {
            city: data.location.city,
            state: data.location.state,
            country: data.location.country
        },
        phone: data.phone,
        password: data.login.password
    }
    pintarUser(person)
}

const axiosApi = async (id) => {
    try {
        const res = await axios(`https://randomuser.me/api/?results=5000/${id}`)
        const data = res.data.results[0]
        console.log(data)

        dataPerson(data)
    

        
    
    } catch (error) {
        console.log(error)
    }
}
const pintarUser = (person) => {
    const container = document.querySelector('#container')
    const template = document.querySelector('#template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-img').setAttribute('src', person.image)
    clone.querySelectorAll('.content-information h3')[0].textContent = `${person.name.title} ${person.name.first} ${person.name.last} `
    clone.querySelectorAll('.content-information h3')[1].textContent = `${person.email}  `
    clone.querySelectorAll('.content-information h3')[2].textContent = `${person.birthday}  `
    clone.querySelectorAll('.content-information h3')[3].textContent = `${person.address.city} (${person.address.country}) State - ${person.address.state} `
    clone.querySelectorAll('.content-information h3')[4].textContent = `${person.phone} `
    clone.querySelectorAll('.content-information h3')[5].textContent = `${person.password} `

    fragment.appendChild(clone)
    container.appendChild(fragment)
}




