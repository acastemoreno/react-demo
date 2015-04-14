"use strict";

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var AppHeader = require("./AppHeader.jsx");

var About = React.createClass({
    render: function(){
        var gh_btn = (<iframe src='https://ghbtns.com/github-btn.html?user=acastemoreno&repo=react-demo&type=star&count=false&size=large'
                              style={{border:"none", width:"76px"}}
                              frameborder="0"
                              scrolling="0"
                              width="160px"
                              height="30px"></iframe>);
        return(
            <div id="aboutWrapper">
                <AppHeader/>
                <article>
                    <h3>Como utilizar</h3>
                    <p>
                        Cada <i>tag</i> de la <i>nube</i> es una palabra clave asociada a una ley aprobada por el congreso (autógrafa). El tamaño de cada 
                        tag se encuentra en proporción directa con la cantidad de leyes existentes en torno al tema señalado.</p>
                    <p> Los botones de años indican las legislaturas que se estan mostrando (por defecto se muestran todas). Presionando alguno de estos botones se puede activar o
                        filtrar las leyes de esa legislatura. Adicionalmente, se pueden ver los datos de las leyes asociadas a cada tag utilizando el navegador de tags (Browser)
                    </p>
                    <h3>Historia</h3>
                    <p>La idea de la <i>Nube de Leyes</i> surgió de la necesidad de comprender, de manera sencilla y rápida, sobre qué temas se ha legislado con mayor frecuencia en los 
                        últimos años. Esto, a su vez, permitiría que un mayor número de ciudadanos pudiese acceder a información clara y concisa sobre el trabajo legislativo que se viene 
                        realizando; fomentando, de esta forma, su participación activa en la vida democrática del país. </p>
                    <h3>¡Utilizamos Software Libre!</h3>
                    <p>Todo el codigo fuente utilizado en el desarrollo de este sitio web se encuentra alojado en GitHub bajo una licencia de software libre 
                        (<a href="http://www.gnu.org/licenses/agpl.html" target="_blank">AGPLv3</a>), con lo cual se le otorga a cualquier usuario la libertad de revisar, modificar
            y distribuir este proyecto con cualquier fin que este pudiese tener.</p>
                    {gh_btn}
                </article>
            </div>
        );
    }
});

module.exports = About;
