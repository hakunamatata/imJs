/*
*	imjs library
*		author:hakuna
*		github:http://gitbub.com/hakunamatata
*/

(function ($, scope) {



    var 

    // remote Server Options

    remoteOption = {

        hostname: 'localhost',

        port: 3000,

        authorize: 'authorize',

        obtain: 'obtain'

    },

    // the class defineder

	Class = function () {

	    var klass = function () {

	        this.init.apply(this, arguments);

	    };



	    klass.prototype.init = function () { };

	    klass.fn = klass.prototype;



	    klass.extend = function (obj) {

	        var extended = obj.exnteded;

	        for (var i in obj)

	            klass.fn[i] = obj[i];

	        if (extended) extended(klass);

	    };



	    return klass;

	},



    noop = function () { };





    var 

    // the connection Class

    connection = new Class;

    connection.extend({

        init: function () {

            this.hostname = remoteOption.hostname;

            this.port = remoteOption.port;

            this.authorize = remoteOption.authorize;

            this.form = arguments.length == 1 ?

						    document.forms[arguments[0].toString()] :

						    document.forms[0];

        },



        connect: function (success, error) {



            var url = ['http://',

					    this.hostname, ':',

					    this.port, '/',

					    this.authorize, '/'

				      ].join(''),
				      
				data = {
				
						username: this.form.name.value,
				
						password: this.form.password.value,
				
						ts: (new Date).toString()
				
				};



            $.ajax({ type: 'POST', url: url, data: data, dataType: 'json', success: success, error: error || noop });

        }

    });





    // the collection claass

    var 

    collection = new Class;

    collection.extend({

        init: function () {

            this.hostname = remoteOption.hostname;

            this.port = remoteOption.port;

            this.obtain = remoteOption.obtain;

            this.class = 'collection';

        },

        // the get method

        get: function (where, select, success, error) {

            var url = ['http://',

                        this.hostname, ':',

					    this.port, '/',

                        this.obtain,

                      ].join(''),

                data =

                {

                    class: this.class,

                    where: where,

                    select: select,

                    ts: (new Date).toString()

                };



            $.ajax({ type: 'POST', url: url, data: data, dataType: 'json', success: success, error: error || noop });

        }



    });



    //  the Imjs Class

    var im = new Class;



    im.extend({

        connection: connection,

        collection: new collection()

    });



    scope.Imjs = new im();



})(jQuery, window);