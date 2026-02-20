.PHONY: full html clean
full:
	TEXINPUTS=.:../tex:../doc: latexmk -pdf -f -norc circuitikzmanual.tex
	TEXINPUTS=.:../tex:../doc: lwarpmk cleanall circuitikzmanual
	TEXINPUTS=.:../tex:../doc: lwarpmk html circuitikzmanual
	TEXINPUTS=.:../tex:../doc: lwarpmk limages circuitikzmanual

html:
	TEXINPUTS=.:../tex:../doc: lwarpmk html1 # force redo
	TEXINPUTS=.:../tex:../doc: lwarpmk limages


