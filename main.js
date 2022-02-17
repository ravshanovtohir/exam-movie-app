//api key
let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'


//pagination page
let page = 1


//tokenlar
let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`


//Pagination uchun kerakli HTML teglar.
let buttons = document.querySelectorAll('.btns')
let oldingi = document.querySelector(".prev")
let keyingi = document.querySelector(".next")
let paginationNum = document.querySelector('.title')


//Render uchun kerakli HTML teglar.
let appendDiv = document.querySelector('.append')


//filter uchun kerakli HTML teglar.
let nameMovie = document.querySelector("#search")
let dateFrom = document.querySelector("#min")
let dateTo = document.querySelector("#max")
let voteAverage = document.querySelector("#score")
let submit = document.querySelector(".btn")


class Films {

    //API dan kinolarni olib uni DOMga ulagan holda render qilish funksiyasi.
    async renderFilms() {
        let filmFromLocal = window.localStorage.getItem("page") || "top_rated"
        if (filmFromLocal == "top_rated") {
            let result = await fetch(tokenTop)
            result = await result.json()
            result = result.results
            console.log(result);
            appendDiv.innerHTML = null
            for (let i of result) {
                let div = document.createElement("div")
                div.classList.add("movie")
                div.innerHTML = getHtmlElements(i)
                appendDiv.append(div)
            }

        } else if (filmFromLocal == "popular") {
            let result = await fetch(tokenPopular)
            result = await result.json()
            result = result.results
            console.log(result);
            appendDiv.innerHTML = null
            for (let i of result) {
                let div = document.createElement("div")
                div.classList.add("movie")
                div.innerHTML = getHtmlElements(i)
                appendDiv.append(div)
            }
        } else if (filmFromLocal == "upcoming") {
            let result = await fetch(tokenUpComing)
            result = await result.json()
            result = result.results
            console.log(result);
            appendDiv.innerHTML = null
            for (let i of result) {
                let div = document.createElement("div")
                div.classList.add("movie")
                div.innerHTML = getHtmlElements(i)
                appendDiv.append(div)
            }
        }
    }

    //paginatsiya uchun qilingan. API dagi page ni ozgartirish uchun qildim
    forPagination() {
        tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
        tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
        tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`
    }

    //filter. Qidirish uchun funksiya.
    async filter(nameOfFilm, min, max, vote) {
        let filmFromLocal = window.localStorage.getItem("page") || "top_rated"
        let info = null
        if (filmFromLocal == "top_rated") {
            let result = await fetch(tokenTop)
            result = await result.json()
            result = result.results
            info = result
            console.log(result);
            appendDiv.innerHTML = null
            for (let i of result) {
                let div = document.createElement("div")
                div.classList.add("movie")
                div.innerHTML = getHtmlElements(i)
                appendDiv.append(div)
            }

        } else if (filmFromLocal == "popular") {
            let result = await fetch(tokenPopular)
            result = await result.json()
            result = result.results
            info = result
            console.log(result);
            appendDiv.innerHTML = null
            for (let i of result) {
                let div = document.createElement("div")
                div.classList.add("movie")
                div.innerHTML = getHtmlElements(i)
                appendDiv.append(div)
            }
        } else if (filmFromLocal == "upcoming") {
            let result = await fetch(tokenUpComing)
            result = await result.json()
            result = result.results
            info = result
            console.log(result);
            appendDiv.innerHTML = null
            for (let i of result) {
                let div = document.createElement("div")
                div.classList.add("movie")
                div.innerHTML = getHtmlElements(i)
                appendDiv.append(div)
            }
        }
        info = info.filter((el, i) => {
            let filmName = nameOfFilm ? el.title.toLowerCase().includes(nameOfFilm.toLowerCase()) : true
            let resultMin = min ? el.release_date.slice(0, 4) >= min : true
            let resultMax = max ? el.release_date.slice(0, 4) <= max : true
            let resultVote = vote ? el.vote_average >= vote : true


            return filmName && resultMin && resultMax && resultVote
        })

        appendDiv.innerHTML = null
        if (info.length) {
            console.log(info)
            for (let i of info) {
                let div = document.createElement("div")
                div.classList.add("movie")
                div.innerHTML = getHtmlElements(i)
                appendDiv.append(div)
            }

        } else {
            alert("Not found ")
        }
    }
}


let film = new Films()


//render funksiya chaqirilgan
film.renderFilms()


//kino type larni tanlash uchun buttonlarni bosilishi uchun. Shu joyda localstoradgega ham saqlidi.
for (let i of buttons) {
    i.addEventListener("click", (event) => {
        event.preventDefault()
        page = 1
        paginationNum.textContent = page
        film.forPagination()
        window.localStorage.setItem("page", event.target.value)
        film.renderFilms()
    })
}


//pagination da oldingi page ga qaytish
oldingi.addEventListener("click", (event) => {
    event.preventDefault()
    if (page > 1) {
        page -= 1
        paginationNum.textContent = page
        film.forPagination()
        film.renderFilms()
    }
})


//pagination da keyingi page ga o'tish.
keyingi.addEventListener("click", (event) => {
    event.preventDefault()
    page += 1
    paginationNum.textContent = page
    film.forPagination()
    film.renderFilms()
})

//filter

submit.addEventListener("click", (event) => {
    console.log("1");
    film.filter(nameMovie.value, dateFrom.value, dateTo.value, voteAverage.value)
})