'use strict';


var Question = Backbone.Model.extend({

});

var QuestionCollection = Backbone.Collection.extend({
	idAttribute: '_id',
	model: Question,
	initialize: function(options){
		this.search = options.search ? options.search : null;
	},
	url: function(){
		if(this.search){
			return '/api/search/'+encodeURI(this.search);

		} else {
			return '/api/questions/';
		}
	}
});

var SchoolView = Backbone.View.extend({
	container: '#app',
	template: _.template($("#school_template").html()),
	events: {
		'click #ask-btn': 'handleSearch'
	},
  	initialize: function(){
  		this.schoolData = {
  			'name': 'Cal Poly San Luis Obispo',
  			'image': 'calpolybackground.jpg'
  		};
  		this.render();
  	},
  	handleSearch: function(event){
  		var q = this.$('#ask').val();
  		var search = new SearchView({search: q});
  	},
  	render: function(){
  		this.$el.html(this.template(this.schoolData));
    	$(this.container).html(this.$el);
    	this.$el.find('#ask').focus();
  	}
});

// var QuestionView = Backbone.View.extend({
// 	template: _.template($("#question_template").html()),
//   	initialize: function(options){
//   		this.render();
//   	},
//   	render: function(){
//   		this.$el.html(this.template({name: 'Cal Poly SLO'}));
//     	$(this.container).html(this.$el);
//   	}
// });

var SearchView = Backbone.View.extend({
	container: '#app',
	template: _.template($("#search_results_template").html()),
  	initialize: function(options){
  		this.search = options.search ? options.search : null;
  		this.fetchQuestions();
  	},
  	fetchQuestions: function(){
  		this.collection = new QuestionCollection({search: this.search});
  		this.listenTo(this.collection, 'sync', this.render);
  		this.collection.fetch();
  	},
  	render: function(){
  		this.$el.html(this.template({questions: this.collection.toJSON(), search: this.search}));
    	$(this.container).html(this.$el);
  	}
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'school',
    'search/:query': 'search'
  },
  initialize: function(){
  	// var nav = new Nav();
  },
  school: function(){
    var school = new SchoolView();
  }
});

$(document).ready(function(){
	var router = new Router();
	Backbone.history.start({pushState: true});
});