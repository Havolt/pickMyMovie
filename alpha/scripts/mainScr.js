


let vm = new Vue({
    el: '#vApp',
    data: {
        test: 'hello world',
        pageTitle: 'Pick My Movie',
        buttonTxt: 'Add Film',
        userMovies: [],
        userMovieInput: ''
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
        }
        
    }
});


/*
(function initApp(){
    
})()
*/