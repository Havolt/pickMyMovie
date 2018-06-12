


let vm = new Vue({
    el: '#vApp',
    data: {
        test: 'hello world',
        buttonTxt: 'Add Film',
        userMovies: [],
        userMovieInput: ''
    },
    methods: {
        addFilmFunc: function(){
            this.userMovies.push(this.userMovieInput);
            this.userMovieInput = '';
            console.log(this.userMovies);
        }
    }
})