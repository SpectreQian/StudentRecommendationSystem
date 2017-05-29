// Backbone Model

var Record = Backbone.Model.extend({
	defaults:{
		Student: '',
		Major: '',
		GPA: ''
	}
});

// Backbone Collection

var Records = Backbone.Collection.extend({});


// instantiate a collection
var records = new Records();

// Backbone view for one record
var RecordView = Backbone.View.extend({
	model: new Record(),
	tagName: 'tr',
	initialize: function(){
		this.template = _.template($('.records-list-template').html());
	},
	events: {
		'click .edit-record': 'edit',
		'click .update-record': 'update',
		'click .cancel-update': 'cancel',
		'click .delete-record': 'delete'
	},
	edit: function(){
		$('.edit-record').hide();
		this.$('.update-record').show();
		$('.delete-record').hide();
		this.$('.cancel-update').show();

		var Student = this.$('.Student').html();
		var Major = this.$('.Major').html();
		var GPA = this.$('.GPA').html();

		this.$('.Student').html('<input type="text" class="form-control Student-update" value= ' + Student + '>');
		this.$('.Major').html('<input type="text" class="form-control Major-update" value= ' + Major + '>');
		this.$('.GPA').html('<input type="text" class="form-control GPA-update" value= ' + GPA + '>');
	
	},
	update: function() {
		this.model.set({'Student': this.$('.Student-update').val(),
						'Major': this.$('.Major-update').val(),
						'GPA': this.$('.GPA-update').val()});
	},
	cancel: function() {
		recordsView.render();
	},
	delete: function() {
		this.model.destroy();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});
// Backbone view for all records
var RecordsView = Backbone.View.extend({
	model: records,
	el: $('.records-list'),
	initialize: function(){
		this.model.on('add', this.render, this);
		this.model.on('change', this.render, this);
		this.model.on('remove', this.render, this);
	},
	
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(record) {
			self.$el.append((new RecordView({model: record})).render().$el);
		});
		return this;
	}
});

var recordsView = new RecordsView();
$(document).ready(function(){
	$('.add-record').on('click', function(){
		var record = new Record({
			Student: $('.Student-input').val(),
			Major: $('.Major-input').val(),
			GPA: $('.GPA-input').val()
		});
		// clear the input
		$('.Student-input').val('');
		$('.Major-input').val('');
		$('.GPA-input').val('');
		//console.log(record.toJSON());
		records.add(record);
	})

}
	)
