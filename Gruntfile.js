module.exports = function (grunt) {
    grunt.initConfig({
        /*usado para fazer copia
         copy: {
         project: {
         expand: true,
         cwd: '.',
         src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
         dest: 'dist'
         }
         },
         clean: {
         dist: {
         src: 'dist'
         }
         },*/
        usemin: {
            html: 'app/views/**/*.ejs'
        },
        useminPrepare: {
            options: {
                root: 'public',
                dest: 'public'
            },
            html: 'app/views/**/*.ejs'
        },
        ngAnnotate: {
            scripts: {
                expand: true,
                src: ['public/js/**/*.js']
            }
        }
    });

    /*grunt.registerTask('default', ['dist', 'minifica']);
     grunt.registerTask('dist', ['clean', 'copy']);*/
    grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'usemin']);


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-ng-annotate');
};