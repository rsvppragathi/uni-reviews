'use strict';


$(document).ready(function(){
	var router = new Router();
	Backbone.history.start({pushState: true});
});


var QuestionCollection = Backbone.Collection.extend({
	idAttribute: '_id',
	url: '/api/questions'
});

var SchoolView = Backbone.View.extend({
	container: '#app',
	template: _.template($("#school_template").html()),
  	initialize: function(){
  		console.log('School!');
  		this.fetchQuestions();
  	},
  	fetchQuestions: function(){
  		this.collection = new QuestionCollection();
  		this.listenTo(this.collection, 'sync', this.render);
  		this.collection.fetch();
  	},
  	render: function(){
  		this.$el.html(this.template({name: 'Cal Poly SLO'}));
    	$(this.container).html(this.$el);
  	}
});

var QuestionView = Backbone.View.extend({
	template: _.template($("#question_template").html()),
  	initialize: function(options){
  		this.render();
  	},
  	render: function(){
  		this.$el.html(this.template({name: 'Cal Poly SLO'}));
    	$(this.container).html(this.$el);
  	}
});


var Router = Backbone.Router.extend({
  routes: {
    '': 'school',
  },
  initialize: function(){
  	// var nav = new Nav();
  },
  school: function(){
    var school = new SchoolView();
  }
});

