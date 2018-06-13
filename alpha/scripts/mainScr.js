


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
                this.userMovies.push(this.userMovieInput);
                this.userMovieInput = '';
                this.userHiddenToggle(document.querySelector('.userAllMovies'));
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

        }
    }
});


/*
(function initApp(){
    
})()
*/