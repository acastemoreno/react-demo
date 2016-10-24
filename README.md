react-init
============
Blog con frontend con react y nodejs como backend.
### Estructura de carpetas
    .
    ├── build : CSS y Javascript compilados para navegador (creado al construir)
    │   ├── css
    │   └── js : Scripts de /src/app/ compilados
    │       └── vendor : Librerias externas (bower)
    ├── media : Achvios que se serviran en "/static/media"
    └── src
        ├── app : Scripts principales de cada pagina (jsx)
        ├── component : Componentes de react (jsx)
        ├── styles
        └── html : html estatico, se sirve en "/"
### JSX
Un componente de react por archivo en `src/component`. Los componentes se referenciaran entre si utilizando `require` (CommonJS). Ejemplo:
``` js
    /*Archivo: src/component/Foo.jsx */
    
    // Utilizamos el componente Faa que se encuentra en la misma carpeta
    var Faa = require("./Faa.jsx");
    
    var Foo = React.createClass({
        render: function(){
            return(<Faa data="lalala"/>);
        }
    });
    /* Al final de cada componente, hay que almacenarlo en module.exports
       para que pueda ser utilizado */
    module.exports = Foo;
```
``` js
    /* Archivo: src/app/index.jsx */
    
    // Utilizamos un componente de react en el script
    var Foo = require("../component/Foo.jsx");
    
    React.render(<Foo/>, document.body);
```
``` html
<!-- Archivo: src/html/index.html -->
<!DOCTYPE html>
<html>
    <head>
        <script src="static/js/vendor/vendor.js" />
        <script src="static/js/index.js" />
    </head>
    <body></body>
</html
```
### Como utilizar
#### Descargar Bourbon
Inicializar y clonar el submodulo de bourbon
```bash
$ git submodule init && git submodule update
```
#### Instalar dependencias
Utilizando npm
``` bash
$ npm install
```
O utilizando yarn
``` bash
$ yarn
```
#### Construir el código
Para construir.
``` bash
$ npm run build
```
Para construir continuamente.
``` bash
$ npm run watch
```
Para construir y minimizar.
``` bash
$ npm run deploy
```
Para ejecutar un servidor de prueba
``` bash
$ node app.js
```
