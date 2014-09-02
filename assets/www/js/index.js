/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
	$("#ajax_loader").show();
	$.getJSON( "http://datos.santander.es/api/rest/datasets/agenda_cultural.json", function( data ) {
		var items = [];
		$.each( data.resources, function( key, val ) {
		    items.push( "<li onclick='app.visitavinculo("+val['dc:identifier']+");' id='" + key + "' class='list-group-item' style='text-align:center'><img src='" + val['ayto:imagen']+"'><br><b>Cuando: </b> "+val['ayto:datetime']+"<br>"+val['dc:name'] + "</li>" );
  		});
		$( "<ul/>", {
		    "class": "list-group",
		    html: items.join( "" )
		  }).appendTo( ".starter-template" );
		$("#ajax_loader").hide();
		});
    	},
    visitavinculo: function (id) {
	$("#ajax_loader").show();
	var map;
	$.getJSON( "http://datos.santander.es/api/datos/agenda_cultural/"+id+".json", function( data ) {
		var items = [];
		$.each( data.resources, function( key, val ) {
		    items.push( "<li id='" + key + "' class='list-group-item' style='text-align:center'><img src='" + val['ayto:imagen']+"'><br><b>Cuando: </b>"+val['ayto:datetime']+"<br>"+val['dc:description'] + "</li>" );
  		});
		$('.starter-template').html('');
		$( "<ul/>", {
		    "class": "list-group",
		    html: items.join( "" )
		  }).appendTo( ".starter-template" );
		});

		$('.active').removeClass('active');
		$("#ajax_loader").hide();

    }
};
