# [New Static Site](http://latehours.net)

A simple template for starting to develop static websites such as portfolio, landing page etc. This project utilizes customized [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) and handful of build scripts that ensure fast and iterative development and easy deployment.

## Quick start

1. Make sure you have latest Node.js and nginx installed in your machine
2. Clone repository: ```git clone https://github.com/jozan/new-static-site.git my-cat-pics```
3. Follow build instructions below
4. Configure nginx with the settings below


#### Build

    npm install -g grunt-cli bower
    npm install && bower install
    grunt

1. Use node package manager ```npm``` to install ```grunt-cli``` and ```bower``` globally ```-g``` in your machine
2. Install required scripts and their dependecies decleared in ```package.json``` and ```bower.json```
3. Run ```grunt``` to build your site from source and deploy to ```public``` directory in the project root

When everything is ready to be published use ```grunt dist``` to minify HTML, CSS, JS, and images.

### Tips

- For continious development and to avoid running ```grunt``` separately after each save use ```grunt watch```. It detects modified files in ```src/``` and runs ```grunt``` automatically.
- To have clean git history initialize new git repository by removing ```.git/``` in the project root and run ```git init```.
- Build script compiles Jinja2 templates by default. Albeit this project is meant to be used for static sites only, having templates is handy in many cases.


------------------------------


#### Nginx dev config

    server {
        listen 8089;
        server_name new-project.tunk.io;
        root /path/to/public;

        location = / {
            rewrite ^ /index.html last;
        }

        location / {
            try_files $uri $uri.html =404;
        }
    }

#### Nginx production config

    #
    # New Static Site (new-project.tunk.io)
    #

    server {
        listen 80;
        server_name new-project.tunk.io;
        return 301 $scheme://new-project.tunk.io$request_uri;
    }

    server {
        listen 80;

        root /var/www/new-static-site/public;
        #index index.html;

        server_name new-project.tunk.io;
        
        client_max_body_size 5M;    
        
        location = / {
            rewrite ^ /index.html last;
        }

        location / {
            try_files $uri $uri.html =404;
        }

        error_page 404 /404.html;
    }

## License

Copyright (c) 2014 Johan Ruokangas

License is yet to be decided.