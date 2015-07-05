//var TodoRouter = Backbone.Router.extend({
//    routes: {
//            '/:f' : 'feature'
//    },
//
//    'feature' : function(f){
//        alert('Coming here...');
//        if(f == 'featureOne'){
//            obj.launchFeatureOne();
//        }else{
//             obj.launchFeatureOne();
//        }
//    }
//});


var myBBLearningApp = {
    'param' : {

    },

    'init' : function() {
            obj.bbCollection();
    },

    'bbCollection' : function(){
            var TodoModel = Backbone.Model.extend({
                defaults : {
                    'title' : 'test title',
                    'completed' : false
                },
                initialize : function(obj){
                    console.log(JSON.stringify(obj));
                },
                say : function(){
                    console.log('i said....'+ this.get('name')+', '+this.get('age'));
                }
            });

            var TodoView = Backbone.View.extend({
                                        tagName : 'li',
                                        myTemplate : _.template( $('#item-template').html() ),

                                        initialize: function() {
                                            this.listenTo(this.model, 'change', this.render);
                                        },
                                        render: function() {
                                            this.$el.html( this.myTemplate( this.model.toJSON() ) );
                                            return this;
                                        }

                                    });

            var TodoList = Backbone.Collection.extend({
                model :TodoModel,

            });

            var todoListObj = new TodoList();

            var AppView = Backbone.View.extend({
                el : '#appId',

                events: {
                          'click #b1': 'createOnEnter'
                },
                initialize : function(){
                    this.$createButton = this.$('#b1');
                    this.listenTo(todoListObj, 'add', function(todo){
                            console.log('item added to the collection '+JSON.stringify(todo));
                            var view = new TodoView({model : todo});
                            this.$('#listId').append(view.render().el);
                           });
                },

                createOnEnter : function(){
                    console.log('executing createOnEnter()....');
                    var completed = (todoListObj.length %3 == 0);
                    var m = new TodoModel({title:'test title on click',  completed : completed});
                    todoListObj.add(m);
                }
               });

            var appViewObj = new AppView();

    }


};

var obj = myBBLearningApp;

