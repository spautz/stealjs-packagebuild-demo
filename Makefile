# We want to do a build process which includes each nns/page as a separate module to build.
# steal/buildjs will give us a production.js file in each nns/page/* directory, along with
# a set of shared packages under ./packages
#
# Under the build target, nns/page/* is just a convenient shorthand. Some other options:
#   - You could list the explicit modules you want to build:
#       steal/js steal/buildjs module1 module2 module3 -packageBuild
#   - Use one or more variables to dynamically find the files you want:
#       JS_MODULES := $(shell ls -d nns/page/*)     # at the top of the Makefile
#       steal/js steal/buildjs $(JS_MODULES) -packageBuild
#

build: clean
	steal/js steal/buildjs nns/page/* -packageBuild

clean:
	rm -f nns/page/*/production.js packages/* tmp*

