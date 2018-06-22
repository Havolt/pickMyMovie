

let vm = new Vue({
    el: '#vApp',
    data: {
        test: 'hello world',
        pageTitle: 'Film Decider',
        buttonTxt: 'Add Film',
        userMovies: [],
        userMovieInput: '',
        movieResults: [],
        userWant: 0,
        moviesBestOrder: [],
        chosenMovieInfo: {name: '', genre: '', runTime: '', director: '', actors: '', year: '', rating: '', posterLink: '', plot: '', score: '<i class="fas fa-star"></i>'}
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

            if(vm.movieResults.length == vm.userMovies.length){ 

                for(let i = 0; i < vm.movieResults.length; i++){
                    if(vm.movieResults[i].badTitle){
                        vm.movieResults.splice(i, 1);
                        i--;
                    }
                }
                if(vm.movieResults.length > 0){
                    this.pickFilm()
                }else{
                    console.log('no good films found');
                    vm.clearData();
                    vm.noFilms();
                }
            };
        },
        pickFilm: function(){

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
                vm.movieResults.map(function(item, int){
                    if(int == 0){
                        vm.moviesBestOrder.push(item);
                    }else{
                        let score = parseFloat(item.imdbRating);
                        vm.moviesBestOrder.map(function(item2, int2){
                            let currFinished = false;
                            if((parseFloat(item2.imdbRating) < score && !currFinished)){
                                vm.moviesBestOrder.splice(int2, 0, item);
                                currFinished = true;
                            }else if(int2 == vm.moviesBestOrder.length-1 && !currFinished){
                                vm.moviesBestOrder.push(item);
                                currFinished = true;
                            }
                        })
                    }
                    
                })
            }else if(vm.userWant == 2){
                while(vm.chosenMovieInfo.name == '' && vm.movieResults.length > 0){
                    let rNum = Math.floor(Math.random() * vm.movieResults.length);
                    if(vm.movieResults[rNum].Response == 'True'){
                        vm.getFilm(vm.movieResults[rNum]);
                    }else{
                        vm.movieReults.splice(rNum, 1);
                    }
                }
            }
            let tmpArr = [];
            vm.moviesBestOrder.map(function(item, int){
                if(!item.badTitle){
                    tmpArr.push(item);
                }
            })
            vm.moviesBestOrder = tmpArr;
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

            if(vm.chosenMovieInfo.rating/2 > 1){
                vm.chosenMovieInfo.score = '';
            }
            for(let i = 1; i <= vm.chosenMovieInfo.rating/2; i++){

                vm.chosenMovieInfo.score += '<i class="fas fa-star"></i>';
                if((vm.chosenMovieInfo.rating/2 - i) < 1 && (vm.chosenMovieInfo.rating/2 - i) >= 0.5 ){
                    vm.chosenMovieInfo.score += '<i class="fas fa-star-half"></i>';
                }
            }
            document.querySelector('.movieResults').classList.remove('pmHidden');
            vm.clearData()
        },
        clearData: function(){
            this.userMovies = [];
            this.userMovieInput = '';
            this.movieResults = [];
            this.userWant = 0;
            this.moviesBestOrder = [];
            document.querySelector('.movieSearchSec').classList.add('pmHidden');
        },
        checkRadTxtColor: function(e){
            
            document.querySelectorAll('.radText').forEach(function(item){
                let classExist = false;
                item.classList.forEach(function(item){
                    if(item == 'fadeRadTxt'){
                        classExist = true;
                    }
                })
                if(!classExist){
                    item.classList.add('fadeRadTxt');
                }
            })
            e.target.nextSibling.classList.remove('fadeRadTxt');
        },
        noFilms: function(){
            document.querySelector('.moviesIn').classList.add('shakeDiv');
        }
        
    }
});


/*
(function initApp(){
    
})()
*/