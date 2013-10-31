This is a minimal project which sets up and loads javascript modules with StealJS, and builds
them into optimized packages for production. The app itself does nothing useful; it just
demonstrates the overall file/module organization.


## Usage

All of the files are already in place: you can use `index-dev.html` to load modules/dependencies
using StealJS in development mode (one at a time from the raw source), or `index-production.html`
to load the same modules/code using StealJS production mode (using pre-built files and packages).

Note that the index-*.html file should be retrieved from a server: opening it off the local
filesystem won't work in all browsers. You can use a dev console's "Network" tab to watch the
files load in their dependency order -- StealJS does the dependency-handling automatically.

There is a `Makefile` for re-building the production js files. If you make a change to any of
the source files, you'll need to run `make` for those changes to appear in index-production.html.


## Organization

Each module gets its own directory (usually with tests and other associated files, although
those are not present here). We separate our general-use modules from our page-specific ones;
in this project the (lone) general-use module lives under `nns/control` while the page-specific
ones live under `nns/page`. The page-specific modules are the main entry point.

This is (very loosely) based on the architecture we use for our own CanJS-based project,
a medium-sized admin tool with about a dozen distinct pages, ~70 js modules, and ~150
client-side templates. We use StealJS to handle all of the dependenicies.

In our project we dynamically generate the markup for each page (which looks roughly like either
index-dev.html or index-production.html, depending on the environment/config). When the markup
loads, the page steals and invokes a page-specific pagecontroller (`demo` in this project) and
then that pagecontroller steals and makes use of further modules and dependencies. From there
it works more-or-less like a normal single-page app -- we just built our system as a dozen
small single-page apps instead of one gigantic one.

That approach has worked very well for our needs, but YMMV. There's more than one right way
to do it.


## Where StealJS Lives

In this project, StealJS lives under /steal, in the project root. It is possible to move it
to a different directory (e.g., to /lib/steal), but that makes the packageBuild approach a little
more complicated.

See the StealJS docs for information on `steal.config.root` if you want more information on this.

Here is what we did to make packageBuild work with steal residing under /lib/steal:

1. Move /steal to /lib/steal
2. Move stealconfig.js to lib/stealconfig.js
3. In lib/stealconfig.js, add a line to set up the root:

    `root: steal.config('root').join('..'),`

4. In the "paths" section of lib/stealconfig.js, add an entry so that stealing 'steal' modules still works:

    `'steal/': 'lib/steal/'`

5. In the markup/html, load `lib/steal/steal.js?{module}` instead of `steal/steal.js?{module}`
6. In *production mode only*, the initial module loaded by steal needs to be specified as the raw
path to the module, relative to the directory above stealjs, instead of as the 'official' module
name, because that file gets loaded before steal.config.root takes effect.

    `<script src="./lib/steal/steal.production.js?../nns/page/demo,production" [...]`
    (note the `../` in front of the nns/page/demo module)

This was easier than the list above makes it seem, but ultimate we decided it was easiest to
just keep steal at the root, for our project.
