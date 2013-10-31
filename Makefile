
build: clean
	steal/js steal/buildjs nns/page/* -packageBuild

clean:
	rm -f nns/page/*/production.js packages/* tmp*

