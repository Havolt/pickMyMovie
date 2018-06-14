

let vm = new Vue({
    el: '#vApp',
    data: {
        test: 'hello world',
        pageTitle: 'Pick My Movie',
        buttonTxt: 'Add Film',
        userMovies: [],
        userMovieInput: '',
        movieResults: [],
        userWant: 0,
        moviesBestOrder: [],
        chosenMovieInfo: {name: '', genre: '', runTime: '', director: '', actors: '', year: '', rating: '', posterLink: '', plot: '', score: ''}
    },
    methods: {
        addFilmFunc: function(){
            if(this.userMovieInput.length > 1){
                let newObj = {};
                newObj.name = this.userMovieInput;
                newObj.num = this.userMovies.length;
                this.userMovies.push(newObj);
                this.userMovieInput = '';
                this.userHiddenToggle(document.querySelector('.movieSearchSec'));
            }
        },
        crossMOver: function(e){
            e.target.parentElement.classList.add('redBorder');
        },
        crossMOff: function(e){
            e.target.parentElement.classList.remove('redBorder');
        },
        userHiddenToggle: function(el){

            if(this.userMovies.length < 1){
                el.classList.add('pmHidden');
            }else{
                el.classList.remove('pmHidden');
            }

        },deleteMovie: function(e){
            console.log(e.target.attributes.value.value)

            this.userMovies.splice(e.target.attributes.value.value, 1);
            this.userMovies.map(function(item){
                if(item.num >= e.target.attributes.value.value){
                    item.num--;
                }
            })
            this.userHiddenToggle(document.querySelector('.movieSearchSec'));
        },
        searchMovies: function(){
            let vals = document.getElementsByName('searchType');


            vals.forEach(function(item, int){
                if(item.checked){
                    vm.userWant = int;
                }
            })
            this.userMovies.map(function(item){
                vm.searchAPI(item);
            })
        },
        searchAPI: function(obj){
            let newScr = document.createElement('script');
            newScr.src = "http://www.omdbapi.com/?i=tt3896198&apikey=b7594f35&t=" + obj.name + "&callback=vm.searchCallback";
            document.body.appendChild(newScr);
        },
        searchCallback: function(data){
            if(data.Response == 'True'){
                vm.movieResults.push(data);
            }
            else{
                vm.movieResults.push({badTitle: true});
            }

            if(vm.movieResults.length == vm.userMovies.length){ this.pickFilm()};
        },
        pickFilm: function(){
            console.log(vm.userWant);
            console.log(vm.movieResults);


            if(vm.userWant == 0){
                vm.movieResults.map(function(item, int){
                    if(int == 0){
                        vm.moviesBestOrder.push(item);
                    }else{
                        let runTime = parseInt(item.Runtime);
                        vm.moviesBestOrder.map(function(item2, int2){
                            let currFinished = false;
                            if((parseInt(item2.Runtime) > runTime && !currFinished)){
                                vm.moviesBestOrder.splice(int2, 0, item);
                                currFinished = true;
                            }else if(int2 == vm.moviesBestOrder.length-1 && !currFinished){
                                vm.moviesBestOrder.push(item);
                                currFinished = true;
                            }
                        })
                    }
                    
                })
            }else if(vm.userWant == 1){

            }else if(vm.userWant == 2){

            }
            let tmpArr = [];
            vm.moviesBestOrder.map(function(item, int){
                if(!item.badTitle){
                    tmpArr.push(item);
                }
            })
            vm.moviesBestOrder = tmpArr;
            console.log(vm.moviesBestOrder);
            if(vm.moviesBestOrder.length > 0){
                vm.getFilm(vm.moviesBestOrder[0]);
            }
        },
        getFilm(film){
            vm.chosenMovieInfo.name = film.Title;
            vm.chosenMovieInfo.genre = film.Genre;
            vm.chosenMovieInfo.runTime = film.Runtime;
            vm.chosenMovieInfo.director = film.Director;
            vm.chosenMovieInfo.actors = film.Actors;
            vm.chosenMovieInfo.year = film.Year;
            vm.chosenMovieInfo.rating = parseInt(film.imdbRating);
            vm.chosenMovieInfo.posterLink = film.Poster;
            vm.chosenMovieInfo.plot = film.Plot;

            for(let i = 1; i <= vm.chosenMovieInfo.rating/2; i++){

                vm.chosenMovieInfo.score += '<i class="fas fa-star"></i>';
                if((vm.chosenMovieInfo.rating/2 - i) < 1 && (vm.chosenMovieInfo.rating/2 - i) >= 0.5 ){
                    vm.chosenMovieInfo.score += '<i class="fas fa-star-half"></i>';
                }
            }
            console.log(vm.chosenMovieInfo.rating)

            document.querySelector('.movieResults').classList.remove('pmHidden');
        }
        
    }
});


/*
(function initApp(){
    
})()
*/