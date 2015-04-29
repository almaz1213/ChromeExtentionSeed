hydra
============
:+1: a chrome extention seed build with angular and powerd by gulp

##How to start up
    git clone git@github.com:KevinOfNeu/hydra.git

    cd hydra

    bower install

    npm install

##How to develop
     src|
        |-app.js
        |-index.html
        |-manifest.json
        |-popup.html
        |-popup.js
        |-js|
            |-content.js
        |-scss|
              |-*.scss
        |-module|
                |*.js

Those file should be customized to your need

##How to dist
     gulp dist

there will be a directory name dist/,using chrome to distribute your extention


License
-------

MIT is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
