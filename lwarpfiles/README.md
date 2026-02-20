## Building the manual with lwarp

A quick and dirty guide on how you can use [lwarp](https://github.com/bdtc/lwarp) to build an HTML version of the CircuiTikZ manual.

1. You need some (minimal) changes to the main `circuitikz` manual. Those have been added to the general repository in the [pull request 922](https://github.com/circuitikz/circuitikz/pull/922) and in the [previous one](https://github.com/circuitikz/circuitikz/pull/920). The best path is to clone the [circuitikz](https://github.com/circuitikz/circuitikz) repository. 

2. You can also have a look at the [complex story behind it](https://github.com/circuitikz/circuitikz/pull/921) if you are curious.

3. You need [the files](https://github.com/Rmano/circuitikz/tree/html/lwarpfiles) from the directory where this README is located (all of them). Download the directory and put it in the root directory of your cloned folder.

4. Create a directory, call it `lwarpbuild`, at the same level of the `lwarpfiles` one you downloaded before.

5. Go to the `lwarpfiles` directory, execute `bash prepare_build.sh`.

6. This thing will copy all the needed files to the build directory. Notice that you really do *not* need to use a git clone; you can just create the directory manually with all the files in `lwarpfiles` and adding `circuitikzmanual.tex`, `ctikmanutils.sty` and `changelog.tex` (if you want it) from the sources.

7. Now go into `lwarpbuild` and do `make full`. Go having a coffee.

8. When this is finished, from the same directory, do a `bash ../lwarpfiles/deploy.sh`: this will copy the site files to a directory `docs`  at the same level of the previous two directory.

9. Point your browser to `....docs/index.html`.

Yep. I know. It could be streamlined a lot. But for now, this is it.

Notice that all this would have been impossible without the help of Jonathan P. Spratte (just look [here](https://github.com/circuitikz/circuitikz/pull/921))!


