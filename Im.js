/*
*	imjs library
*		author:hakuna
*		github:http://gitbub.com/hakunamatata
*/

(function ($, scope) {

    var 
	
	certificate = {
		
		cert: 'xymbtc',
		
		proj: 'database'
		
	},
	
    // the class defineder

	Class = function (parent) {

	    var klass = function () {

	        this.init.apply(this, arguments);

	    };

		if(parent){
		
			var subclass = function(){};
			
			subclass.prototype = parent.prototype;
			
			klass.prototype = new subclass;
			
		};		

	    klass.prototype.init = function () { };

	    klass.fn = klass.prototype;
	    
	    klass.fn.parent = klass;
	    
	    klass._super = klass.__proto__;



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
    
	// the server class
	
	$server = new Class;
	
	$server.extend({
			
		hostname : 'localhost',

	    port : 3000,
	
    	authorize : 'authorize',

        obtain : 'obtain',
        
        
        _cert : certificate.cert,
        
        _proj : certificate.proj
		
	});
	
/*    // the connection Class

    $connection = new Class($server);

    $connection.extend({

        init: function () {
				
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

*/

    // the collection claass

    var 

    $collection = new Class($server);

    $collection.extend({

        init: function () {

            this.type = 'collections';

        },

        // the get method

        get: function (where, select, success, error) {

            var url = ['http://',

                        this.hostname, ':',

					    this.port, '/',

                        this.obtain,

                      ].join(''),

                data = {

                    type: this.type,

                    where: where,

                    select: select,
                    
                    cert: this._cert,
                    
                    proj: this._proj,

                    ts: (new Date).toString()

                };

            $.ajax({ type: 'POST', url: url, data: data, dataType: 'json', success: success, error: error || noop });

        }

    });

	// the document class
	
	var 
	
	$document = new Class($server);
	
	$document.extend({
		
		init: function(){
		
			this.type = 'documents';
		
				
		},
		
		get: function(where, select, success, error){
		
			var n = arguments.length,
				w = where,
				s = select,
				$s = success,
				$e = error;


			
			switch(n)
			{
				case 0:
					throw 'arguments missed';
					break;
				case 1:
					w = null;
					s = null;
					$s = arguments[0];
					break;
				case 2:
					s = null;
					$s = arguments[1];
					break;
				default:
					break;
			}
			
			var url = ['http://',
						
						this.hostname, ':',
						
						this.port, '/',
						
						this.obtain,
			
					  ].join(''),
					  
				data = {
				
					type: this.type,
					
					where: w,
					
					select: s,
					
					cert: this._cert,
                    
                    proj: this._proj,
					
					ts:(new Date).toString()
					
				};
				
			$.ajax({ type: 'POST', url: url, data: data, dataType: 'json', success: $s, error: $e || noop });
					
		}
		
	})

    //  the Imjs Class

    var $imjs = new Class;

    $imjs.extend({

        collection: new $collection(),
        
        document: new $document()

    });


	scope.imjs = new $imjs();

})(jQuery, window);