


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
            }
        },
        crossMOver: function(e){
            e.target.parentElement.classList.add('redBorder');
        },
        crossMOff: function(e){
            e.target.parentElement.classList.remove('redBorder');
        }
    }
});


/*
(function initApp(){
    
})()
*/