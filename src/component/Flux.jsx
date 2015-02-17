"use strict";

var Fluxxor = require("fluxxor");

var constants = {
    //Async Load constants
    LOAD_LEYES: "LOAD_LEYES",
    URL_DATA: "data/leyes_aprobadas.json",
    LOAD_LEYES_SUCCESS: "LOAD_LEYES_SUCCESS",
    LOAD_LEYES_FAIL: "LOAD_LEYES_FAIL",

    // Year Buttons constant
    TOGGLE_YEAR: "TOOGLE_YEAR"
};

var actions = {
    loadLeyes: function(){
        // Al comenzar la peticion
        this.dispatch(constants.LOAD_LEYES);
        
        // Al finalizar la peticion
        d3.json(constants.URL_DATA, function(error, json){
            if (error)
                this.dispatch(console.LOAD_LEYES_FAIL, {error: error});
            else 
                this.dispatch(constants.LOAD_LEYES_SUCCESS, {data: json});
        }.bind(this));
    },
    toggleYear: function(year){
        this.dispatch(constants.TOGGLE_YEAR, {year: year});
    }
};

var LeyStore = Fluxxor.createStore({
    initialize: function(){
        this.leyes = [];
        this.loading = false;
        this.error = null;

        this.bindActions(
            constants.LOAD_LEYES, this.onLoadLeyes,
                 constants.LOAD_LEYES_SUCCESS, this.onLoadLeyesSuccess,
                      constants.LOAD_LEYES_FAIL, this.onLoadLeyesFail
        );
    },

    onLoadLeyes: function(payload){
        this.loading = true;
        this.emit("change");
    },
    onLoadLeyesSuccess: function(payload){
        this.loading = false;
        this.error = null;

        this.leyes = payload.data;
        this.emit("change");
    },
    onLoadLeyesFail: function(payload){
        this.loading = false;
        this.error = payload.error;
        this.emit("change");
    }
});

var YearStore = Fluxxor.createStore({
    initialize: function(){
        this.years = {
            2011: false,
            2012: false,
            2013: false,
            2014: true
        };

        this.bindActions(
            constants.TOGGLE_YEAR, this.onToggleYear
        );
    },
    onToggleYear: function(payload){
        this.years[payload.year] = ! this.years[payload.year];
        this.emit("change");
    }
});


var stores = {
    LeyStore: new LeyStore(),
    YearStore: new YearStore()
};


var flux = new Fluxxor.Flux(stores, actions);

//For debug
flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

module.exports = flux;
