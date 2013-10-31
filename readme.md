This is a minimal project which sets up and loads javascript modules with StealJS, and builds
them into optimized packages for production. The app itself does nothing useful; it just
demonstrates the overall file/module organization and the build system.

Note: The "nns" namespace is just what our company uses to identify itself. It has no special
meaning here, and could just as easily be called "myapp" or something.


## Usage

All of the files are already in place: you can use `index-dev.html` to load modules/dependencies
using StealJS in development mode (one at a time from the raw source), or `index-production.html`
to load the same modules/code using StealJS production mode (using pre-built files and packages).

Note that these files should be opened over http from a webserver: opening them off the local
filesystem won't work in all browsers. You can use Firebug or another dev console's "Network" tab
to watch as StealJS loads the files and their dependencies.

There is a Makefile for re-building the production js files. If you make a change to any of
the source files, you'll need to rebuild for those changes to appear in `index-production.html`.


## Organization and Background

Each module gets its own directory (usually with tests and other associated files, although
those are not present here). We separate our general-use modules from our page-specific ones;
in this project the (lone) general-use module lives under `nns/control` while the page-specific
ones live under `nns/page`. The page-specific modules are the main entry point.

This is (loosely) based on the architecture we use for our own CanJS-based project, a medium-sized
admin tool with about a dozen distinct pages, ~70 js modules, and ~150 client-side templates.
This approach has worked very well with this project size, although we haven't tried it on
larger apps.

In our project we dynamically generate the markup for each page (which looks roughly like either
index-dev.html or index-production.html, depending on the environment/config). When the markup
loads, the page steals and invokes a page-specific pagecontroller ("demo" in this project).
That "demo" pagecontroller, when loaded, then steals and makes use of further modules and
dependencies. From there each page works more-or-less like a normal single-page app -- we just
built our system as several small single-page apps instead of one gigantic one.


## Where StealJS Lives

In this project, StealJS lives under /steal, in the project root. It is possible to move it
to a different directory (e.g., to /lib/steal), but that makes the packageBuild approach a little
more complicated.

For more information, search the StealJS docs for `steal.config.root`.

Here is what we did to make packageBuild work with steal residing under /lib/steal:

1. Move /steal to /lib/steal
2. Move stealconfig.js to lib/stealconfig.js
3. In lib/stealconfig.js, configure a new root:

    `root: steal.config('root').join('..'),`

4. In the "paths" section of lib/stealconfig.js, add an entry so that stealing 'steal' modules
still works:

    `'steal/': 'lib/steal/'`

5. In the markup/html, load `lib/steal/steal.js?{module}` instead of `steal/steal.js?{module}`
6. In *production mode only*, the initial module loaded by steal needs to be specified as the raw
path to the module, relative to the directory above stealjs, instead of as the 'official' module
name, because that file gets loaded before steal.config.root takes effect.

    `<script src="./lib/steal/steal.production.js?../nns/page/demo,production" ...`

    (note the "../" in front of the nns/page/demo module)

7. In the Makefile, execute steal/js from within /lib: it won't work if you try to run /lib/steal/js

    `cd lib/; steal/js steal/buildjs ...`

8. In the Makefile, you must pass an explicit list of modules: you can't rely on asterisks or
other filesystem-based shortcuts because the files' paths will no longer match their module paths.

    `cd lib/; steal/js steal/buildjs $(JS_MODULES) -packageBuild`



These steps were easier than the list above makes it seem, but we ultimately decided it was
easiest to just keep steal at the root, for our project.
