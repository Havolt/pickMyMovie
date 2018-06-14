

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
        chosenMovieInfo: {}
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
                getFilm(vm.moviesBestOrder[0]);
            }
        },
        getFilm(film){
            vm.chosenMovieInfo.name = item.Title;
            vm.chosenMovieInfo.genre = item.Genre;
            vm.chosenMovieInfo.runTime = item.Runtime
        }
        
    }
});


/*
(function initApp(){
    
})()
*/