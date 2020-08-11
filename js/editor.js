$(function () {
	var $address = $('[name="address"]'),
		$parent = $('[name="parent"]');

	$address.fias({
		oneString: true,
		change: function (obj) {
			log(obj);
		}
	});

	$parent.change(function () {
		changeParent($(this).val());
	});

	changeParent($('[name="parent"]:checked').val());

	function changeParent(value) {
		var parentType = null,
			parentId = null;

		switch (value) {
			case 'kursk':
				parentType = $.fias.type.city;
				parentId = '4600000100000';
				break;
		}

		$address.fias({
			parentType: parentType,
			parentId: parentId
		});
	}

	function log(obj) {
		var $log, i;

		$('.js-log li').hide();

		for (i in obj) {
			$log = $('#' + i);

			if ($log.length) {
				$log.find('.value').val(obj[i]);
				$log.show();
			}
		}


	}

});

function costul() {
	var str = $("#fieldStreetName").val();
	if (str.substr(0, 3) == '305') {
		str = str.substr(32);
		var strend = str.split(' ')[0] + " ";
		$("#fieldStreetName").val(str.replace(strend, ''));
	}
	
	if(str=='Асеева' && $("#fieldStreet").val()=='переулок'){ $("#oldName").val("бывший Буйволовский"); }
}




let timerId = setInterval(() => resizeForm(), 1);

var Ulitsy_sootvetstvie, ulitsy_goroda;

function resizeForm() {
	
	if ($("#fieldStreetName").is(":focus")) {
		findOldName();
		costul();
		$('#fieldStreet').val($('#fieldStreet').val().toLowerCase());
	}
	
	if ($("#fieldStreetName").is(":focus") || $("#oldName").is(":focus")) {
		imageBlock();
	}

	if (getWidthOfText("#fieldStreetName") <= 450)
		$(".fields-left").width(744);
	else if (getWidthOfText("#fieldStreetName") > 450 && getWidthOfText("#fieldStreetName") <= 700)
		$(".fields-left").width(844);
	else if (getWidthOfText("#fieldStreetName") > 700)
		$(".fields-left").width(1044);

	if (getWidthOfText('#fieldHouseNumber') <= 220)
		$(".fields-right").width(228);
	else
		$(".fields-right").width(328);

	$(".fields").width($(".fields-left").width() + 66 + 100 + $(".fields-right").width() + 22);

	if ($(".imageblock").height() >= 40 && $(".imageblock").height() <= 42)
		$(".imageblock").css('margin-top', '-37px');
	else if ($(".imageblock").height() >= 46 && $(".imageblock").height() <= 47)
		$(".imageblock").css('margin-top', '-40px');
	else if ($(".imageblock").height() >= 57 && $(".imageblock").height() <= 58)
		$(".imageblock").css('margin-top', '-51px');




	if ($('.Ulitsy_sootvetstvie').attr('value') != '') {
		Ulitsy_sootvetstvie = JSON.parse($('.Ulitsy_sootvetstvie').attr('value'));
		$('.Ulitsy_sootvetstvie').attr('value', '');
	}

	if ($('.ulitsy_goroda').attr('value') != '') {
		ulitsy_goroda = JSON.parse($('.ulitsy_goroda').attr('value'));
		$('.ulitsy_goroda').attr('value', '');
	}
}

$(function () {
	loadExcel('Ulitsy_sootvetstvie.xlsx', '.Ulitsy_sootvetstvie');
	loadExcel('ulitsy_goroda_dlya_generatora_tablichek.xlsx', '.ulitsy_goroda');
	/*console.log(`
Работу выполнили студенты ЮЗГУ группы ПО-71б: 
Кузнецов Ю.С.
Бунина В.В.
Ревин А.А.
Финько И.С.
Степаков В.И.
Левченко Д.В.
Руднев И.А.
Черных Е.В.
Кобелев Д.Ю.
Кобелев А.С.
	2020г.
`);*/
});


function imageBlock() {

	if (historicalStreet() == true || $("#oldName").val() != "") {
		$("#imageblock_1").css('display', 'block');
		$("#imageblock_2").css('display', 'none');
	}
	else {
		$("#imageblock_1").css('display', 'none');
		$("#imageblock_2").css('display', 'block');
	}
	imageBlockMargin("#imageblock_1");
	imageBlockMargin("#imageblock_2");
}

function imageBlockMargin(id) {
	if ($(id).height() >= 40 && $(id).height() <= 42)
		$(id).css('margin-top', '-37px');
	else if ($(id).height() >= 46 && $(id).height() <= 47)
		$(id).css('margin-top', '-43px');
	else if ($(id).height() >= 57 && $(id).height() <= 65)
		$(id).css('margin-top', '-54px');
}

function getWidthOfText(txt) {
	var c = document.createElement('canvas');
	var ctx = c.getContext('2d');
	ctx.font = $(txt).css('font-size') + " " + $(txt).css('font-family');
	var length = ctx.measureText($(txt).val()).width;
	return Math.round(length);
}

$('#fieldStreetName').focus(function () {
	$(this).select();
});
$('#oldName').focus(function () {
	$(this).select();
});
$('#fieldStreet').focus(function () {
	$(this).select();
});
$('#fieldHouseNumber').focus(function () {
	$(this).select();
});
$('#last-number').focus(function () {
	$(this).select();
});
$('#next-number').focus(function () {
	$(this).select();
});

function historicalStreet() {

	for (var i = 0; i < ulitsy_goroda.length; i++) {
		if (ulitsy_goroda[i].Улица == $("#fieldStreetName").val()) {
			if(ulitsy_goroda[i].Зона == 'Улица в культурно-исторической зоне')
				return true;
			else
				return false;
		}
	}
	return false;

}


//if(ttt == undefined)

function loadExcel(url,text) {
var arrayStreets;
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  arrayStreets = XLSX.utils.sheet_to_json(worksheet,{raw:true});
  $(text).attr('value',JSON.stringify(arrayStreets))
}

oReq.send();
}



function checkInput(input) {
	if (input.val() != " " || input.val() != "") {
		return true;
	}
}

function FindStreet(array, find) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].Современное_название == find) {
			return i;
		}
	}
	return -1;
}

function getElemntFromArray(array, index) {
	return array[index].Историческое_название;
}

function findOldName() { //отвечает за поиск старого названия
	if (checkInput($("#fieldStreetName"))) {
		var index = FindStreet(Ulitsy_sootvetstvie, $("#fieldStreetName").val());
		if (index >= 0) {
			$("#oldName").val(getElemntFromArray(Ulitsy_sootvetstvie, index));
		}
		else{
				$("#oldName").val("");
			}
	}
}


$("#buttonDownloadSignName").click(function editBound() {

	var width = $(".fields").width()-100, height = $(".fields").height();
	var fullHouseLength = $(".fields-left").width() + 56;
	
	var doc = new jsPDF('l', 'mm', [fullHouseLength, height])
	
	streetName(doc);
	
	doc.save($("#fieldStreet").val() + ' ' + $("#fieldStreetName").val() + '.pdf')
	
});

$("#buttonDownloadSignNumber").click(function editBound() {

	var width = $(".fields").width()-100, height = $(".fields").height();
	var streetNumber = $(".fields-right").width() + 22;
	
	var doc = new jsPDF('l', 'mm', [streetNumber, height])
	
	streetNameNumber(doc, streetNumber);
	
	doc.save($("#fieldStreetName").val() + ' № ' + $("#fieldHouseNumber").val() + '.pdf')
	
});


function streetName(doc) {
	
	var width = $(".fields").width()-100, height = $(".fields").height();
	var fullHouseLength = $(".fields-left").width() + 56;

	var solovey = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 108 151" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><rect id="Монтажная-область1" serif:id="Монтажная область1" x="0" y="0" width="108" height="151" style="fill:none;"/><path d="M0.612,10.273l2.296,0.907l2.183,1.318l2.012,1.565l2.467,1.879l1.559,1.211l0.51,0.434l0.51,0.323l1.247,0.173l0.794,-0.216l0.624,-1.987l-1.9,-3.421l-6.406,-12.425l9.978,6.991l4.649,-0.363l3.968,0.212l3.884,0.995l3.572,1.735l3.174,2.407l2.552,2.9l1.955,3.33l1.276,3.637l0.595,3.816l-0.085,6.701l-0.141,5.734l0.51,4.465l1.36,4.286l2.155,3.937l4.762,6.012l5.159,5.647l5.584,5.25l1.701,1.633l11.877,12.296l11.225,12.926l10.489,13.516l-9.44,-5.227l-0.708,0.059l-0.454,0.579l0.142,0.711l5.641,8.963l5.159,9.27l4.592,9.541l4.053,9.788l2.325,7.138l0.142,0.975l-0.539,0.822l-0.964,0.249l-0.878,-0.456l-2.467,-2.812l-1.7,2.373l-10.602,-15.157l-3.742,-5.48l-3.968,-5.312l-3.94,-4.408l-4.422,-3.912l-3.544,-2.537l-3.827,-2.14l-4.025,-1.718l-1.672,-0.581l-2.296,6.446l-0.142,0.193l-15.335,22.323l-2.155,0.207l15.024,-24.571l0.142,-0.227l0,-3.934l-1.134,-2.254l-3.884,-0.995l0,3.413l0,3.77l-15.42,24.591l-2.098,0l13.465,-26.884l-1.588,-6.103l-6.775,-1.737l-6.661,-2.217l-5.528,-2.54l-5.13,-3.254l-4.677,-3.912l-3.26,-3.631l-2.75,-4.037l-2.183,-4.368l-1.615,-5.02l-0.879,-5.207l-0.085,-5.278l1.162,-8.099l1.984,-7.94l2.07,-8.813l0.453,-4.428l-0.283,-4.439l-1.304,-4.651l-2.155,-4.317l-2.948,-3.824l-6.037,-6.999l0.765,0.184"/></svg>';

	var monastyr = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 487 165" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M1.814,163.225l-1.826,0l0,-1.891l8.082,-1.074l-0.255,0.142l19.459,-2.339l0,-0.335l-0.36,-0.36l-0.062,-2.749l0.422,-0.42l0,-8.11l-0.629,-0.632l-0.045,-2.009l-0.023,-1.018l-0.59,0.014l-0.019,-0.859l0.141,-0.011l-1.241,-3.439l0,-3.024l2.007,0l0,-5.395l2.432,0l4.218,-3.614l4.7,-2.962l5.079,-2.242l5.355,-1.48l0,-3.878l1.548,0l0,-4.271l0.924,0l1.009,-1.752l1.539,-1.316l0.267,-1.564l1.051,-1.191l1.245,-0.697l0.343,0l0,-18.819l1.791,0l0,18.819l0.408,0l1.245,0.697l1.051,1.191l0.267,1.564l1.539,1.316l1.009,1.752l0.924,0l0,4.271l1.548,0l0,3.878l5.355,1.48l5.079,2.242l4.7,2.962l4.218,3.614l2.432,0l0,5.395l2.007,0l0,3.024l-1.241,3.439l0.141,0.011l-0.019,0.859l-0.59,-0.014l-0.068,3.027l-0.629,0.632l0,8.11l0.422,0.42l-0.062,2.749l-0.36,0.36l0,0.309l17.801,1.591l3.714,-0.443l3.73,0.261l3.614,0.956l80.785,0l0,-1.46l6.174,-1.358l0,-2.546l2.245,-0.89l0,-11.727l17.405,-3.262l0,-15.024l-0.545,0l0,-2.792l-3.367,-3.368l4.941,0l1.491,-3.104l2.08,-2.744l2.588,-2.273l0,-2.917l0.406,-1.457l0.975,-1.153l1.372,-0.638l0,-16.742l1.788,0l0,16.739l1.372,0.641l0.978,1.153l0.408,1.457l0,2.917l2.586,2.273l2.08,2.744l1.494,3.104l4.941,0l-3.368,3.368l0,2.792l-0.544,0l0,11.259l6.415,-1.224l0,-2.455l1.644,0l0.352,-19.902l-0.389,0l0,-1.874l-0.751,0l0,-1.284l-0.374,0l0,-5.38l-1.199,-0.882l-2.172,0l0,-4.481l3.592,-0.55l-0.434,-0.434l0,-3.591l0.678,0l1.111,-6.271l2.007,-6.046l2.857,-5.692l3.651,-5.216l4.368,-4.637l4.992,-3.955l5.511,-3.194l5.913,-2.361l0.343,-0.797l0.564,-0.655l0.47,-0.927l0.678,-0.785l0.726,-1.244l1.077,-0.967l-0.199,-1.006l0.057,-1.026l0.992,-1.721l1.389,-1.437l1.673,-1.08l1.02,-0.386l0,-18.774l1.786,0l0,18.82l0.85,0.34l1.673,1.08l1.36,1.437l1.021,1.721l0.057,1.026l-0.227,1.006l1.077,0.967l0.737,1.244l0.68,0.785l0.482,0.927l0.567,0.655l0.34,0.797l5.896,2.361l5.528,3.194l4.989,3.955l4.365,4.637l3.657,5.216l2.835,5.692l2.012,6.046l1.106,6.271l0.68,0l0,3.591l-0.425,0.434l3.6,0.55l0,4.481l-2.183,0l-1.19,0.882l0,5.38l-0.369,0l0,1.284l-0.765,0l0,1.874l-0.397,0l0.368,19.902l1.644,0l0,2.455l6.407,1.224l0,-11.259l-0.539,0l0,-2.792l-3.373,-3.368l4.932,0l1.503,-3.104l2.097,-2.744l2.58,-2.273l0,-2.917l0.397,-1.451l0.963,-1.151l1.361,-0.643l0,-16.745l1.786,0l0,16.736l1.389,0.635l0.992,1.157l0.397,1.462l0,2.917l2.608,2.273l2.069,2.744l1.502,3.104l4.933,0l-3.374,3.368l0,2.792l-0.538,0l0,15.024l10.857,2.038l14.4,0l21.628,4.521l0,-12.333l-0.879,-0.888l0,-1.023l0.936,-0.938l0.141,-6.271l0.454,-17.784l-0.312,-0.009l0.057,-1.868l-0.907,-0.022l0.028,-1.137l0.482,0l0,-5.258l-0.879,-0.224l0,-0.757l0.851,-0.848l0.028,-1.919l-0.255,-0.005l-0.624,-0.672l0,-0.836l5.783,0l0.34,-2.733l0.765,-2.639l1.191,-2.483l2.693,-3.949l3.345,-3.407l0,-7.356l-0.397,-1.026l2.778,-2.787l1.701,-21.387l1.984,-25.447l0,-19.698l1.757,0l0,19.8l1.985,25.345l1.7,21.387l2.778,2.787l-0.396,1.026l0,7.356l3.344,3.407l2.665,3.949l1.191,2.483l0.793,2.639l0.34,2.733l5.783,0l0,0.836l-0.652,0.672l-0.227,0.005l0.029,1.919l0.85,0.848l0,0.757l-0.879,0.224l0,5.258l0.454,0l0.057,1.137l-0.907,0.022l0.056,1.868l-0.312,0.009l0.426,17.784l0.17,6.271l0.935,0.938l0,1.023l-0.879,0.888l0,22.566l0.879,0.241l0,2.843l4.252,1.284l-1.247,0.641l0,0.706l-0.624,0l0,1.414l34.498,0l0,1.919l-35.717,0l0,-1.919l-0.255,0l-0.17,0l0,-1.621l-3.09,-0.689l0,-2.789l-0.878,-0.244l-0.029,-26.206l-0.17,-7.266l-0.51,-20.066l0.709,0l0.056,-6.851l-0.028,-2.081l-4.989,0l0,-3.129l-0.652,-3.056l-1.276,-2.852l-1.785,-2.744l-2.126,-2.483l-2.438,-2.174l0,-8.912l-2.325,-2.333l-1.615,-22.425l-0.652,-8.941l-0.652,8.941l-1.644,22.425l-2.325,2.333l0,8.912l-2.438,2.174l-2.097,2.483l-1.786,2.744l-1.276,2.852l-0.652,3.056l-0.028,3.129l-4.961,0l-0.056,2.081l0.085,6.851l0.708,0l-0.51,20.066l-0.17,7.266l-0.028,16.843l-2.353,-0.493l-21.827,-4.57l-14.4,0l-12.784,-2.395l0,-18.896l0.538,0l0,-1.553l0.397,-0.374l-1.389,0l-0.992,-2.721l-1.502,-2.486l-1.928,-2.155l-2.296,-1.743l0,-3.98l-0.425,-0.876l-0.879,-0.408l-0.226,0l-0.086,-0.006l-0.113,0.003l-0.907,0.391l-0.454,0.896l0,3.98l-2.296,1.743l-1.927,2.155l-1.503,2.486l-0.992,2.721l-1.389,0l0.397,0.374l0,1.553l0.539,0l0,15.934l-10.658,-2.035l0,-2.087l-1.616,0l-0.029,-2.117l-0.396,-22.017l0.425,0l0,-1.874l0.765,0l0,-1.284l0.369,0l0,-1.391l-0.369,0l0,-2.569l0.369,0l0,-1.125l1.02,0l1.616,-1.176l0.737,0l0,-0.55l-3.742,-0.576l0,-2.514l0.595,-0.59l0,-0.595l-0.51,0l-0.737,-5.681l-1.474,-5.53l-2.239,-5.272l-2.92,-4.921l-3.572,-4.473l-4.167,-3.946l-4.648,-3.342l-5.046,-2.676l-5.386,-1.959l-0.283,-0.998l-0.766,-0.711l-0.311,-1.08l-0.794,-0.788l-0.425,-1.007l-0.794,-0.748l-1.021,-0.371l0,-1.616l0.341,-1.168l-1.219,-1.74l-1.758,-1.231l-0.85,-0.232l-0.822,0.232l-1.758,1.231l-1.247,1.74l0.34,1.168l0,1.616l-1.02,0.371l-0.766,0.748l-0.425,1.007l-0.822,0.788l-0.306,1.08l-0.76,0.711l-0.283,0.998l-5.38,1.959l-5.06,2.676l-4.652,3.342l-4.147,3.946l-3.572,4.473l-2.928,4.921l-2.228,5.272l-1.488,5.53l-0.717,5.681l-0.516,0l0,0.595l0.59,0.59l0,2.514l-3.745,0.576l0,0.55l0.748,0l1.605,1.176l1.017,0l0,1.125l0.375,0l0,2.569l-0.375,0l0,1.391l0.375,0l0,1.284l0.748,0l0,1.874l0.431,0l-0.431,24.134l-1.605,0l0,2.087l-10.649,2.035l0,-15.934l0.544,0l0,-1.553l0.374,-0.374l-1.389,0l-0.986,-2.721l-1.489,-2.486l-1.933,-2.155l-2.31,-1.743l0,-3.98l-0.408,-0.876l-0.876,-0.408l-0.25,0l-0.249,0l-0.873,0.408l-0.411,0.876l0,3.98l-2.31,1.743l-1.934,2.155l-1.488,2.486l-0.986,2.721l-1.389,0l0.374,0.374l0,1.553l0.544,0l0,18.896l-17.402,3.263l0,11.406l-2.248,0.891l0,2.812l-4.056,0.89l1.114,1.114l0,1.227l-5.346,0l-81.173,0l-3.436,-0.961l-3.557,-0.255l-3.535,0.462l-20.061,-1.791l0,-3.121l0.38,-0.38l0.023,-0.995l-0.403,-0.403l0,-9.864l0.649,-0.649l0.026,-1.044l-0.675,0l0,-2.185l0.723,0l0.026,-1.069l0.586,0.014l0.023,-1l0.488,0.042l0.564,-1.556l0,-0.536l-2.007,0l0,-5.397l-1.205,0l-3.541,-3.223l-3.934,-2.724l-4.266,-2.177l-4.516,-1.587l-4.688,-0.973l0,-1.556l0.363,-0.768l0,-1.165l-2.464,0l0,-2.415l0.36,0l0,-0.706l0.559,0l0,-1.154l-0.559,0l-0.402,-1.771l-1.171,-1.387l-1.678,-0.697l0,-0.992l0.351,-0.635l-0.323,-0.646l-0.691,-0.389l-0.72,0l-0.718,0l-0.691,0.389l-0.323,0.646l0.351,0.635l0,0.992l-1.678,0.697l-1.171,1.387l-0.402,1.771l-0.559,0l0,1.154l0.559,0l0,0.706l0.36,0l0,2.415l-2.464,0l0,1.165l0.363,0.768l0,1.556l-4.688,0.973l-4.516,1.587l-4.266,2.177l-3.934,2.724l-3.541,3.223l-1.205,0l0,5.397l-2.007,0l0,0.536l0.565,1.556l0.487,-0.042l0.023,1l0.587,-0.014l0.025,1.069l0.723,0l0,2.185l-0.675,0l0.026,1.044l0.649,0.649l0,9.864l-0.403,0.403l0.023,0.995l0.38,0.38l0,3.121l-20.619,2.327l-6.959,0.924"/></svg>';

	const parser = new DOMParser();

	var svgElement;

	var intervalStreetName = 0;

	doc.setFillColor(241, 240, 234);
	doc.roundedRect(0, 0, fullHouseLength, 250, 15, 15, "F");

	doc.setDrawColor(0);
	doc.setFillColor(241, 240, 234);
	doc.roundedRect(10, 10, fullHouseLength - 20, 230, 10, 10, "FD");


	if (fullHouseLength == 800)
		intervalStreetName = 5.5;
	else if (fullHouseLength == 900)
		intervalStreetName = -0.4;
	else
		intervalStreetName = 0;


	if ($("#oldName").val() == '' || $("#oldName").val() == ' ') {
		
		doc.setFontSize(120.1);
		doc.setFont('Mozer-SemiBold');
		doc.lstext($("#fieldStreet").val(), 37, 216, 1.75);
		
		doc.setFontSize(320.1);
		doc.setFont('Mozer-SemiBold');
		doc.lstext($("#fieldStreetName").val(), 37, 139.3, intervalStreetName);
	}
	else {
		
		doc.setFontSize(128.1);
		doc.setFont('Mozer-SemiBold');
		doc.lstext($("#fieldStreet").val(), 33, 214.5, 1.6);
		
		doc.setFontSize(92.1);
		doc.setFont('Mozer-Thin');
		doc.lstext($("#oldName").val(), 33, 160, 1.3);
		
		doc.setFontSize(320);
		doc.setFont('Mozer-SemiBold');
		doc.lstext($("#fieldStreetName").val(), 33, 111, intervalStreetName);
	}

	if ($("#imageblock_1").css('display') == "none") {
		doc.setLineWidth(0.8);
		doc.line(33.4, 173, fullHouseLength - 39, 173); //линия

		svgElement = parser.parseFromString(solovey, "image/svg+xml").firstElementChild;
		svg2pdf(svgElement, doc, { xOffset: fullHouseLength - 75, yOffset: 124.1, scale: 0.532 });
	}
	else {

		doc.setLineWidth(0.7);
		doc.line(33.4, 170.6, fullHouseLength - 191.6, 170.6);

		svgElement = parser.parseFromString(monastyr, "image/svg+xml").firstElementChild;
		svg2pdf(svgElement, doc, { xOffset: fullHouseLength - 191.7, yOffset: 113.3, scale: 1.72 });
	}
	return doc;
}

function streetNameNumber(doc, width) {
	var fullHouseLength = $(".fields-left").width() + 56;
	var streetNumber = $(".fields-right").width() + 22;
	
	var left = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 21 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M0.004,11.05l20.992,-11.057l0,11.057l0,11.057l-20.992,-11.057"/></svg>';

	var right = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 21 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M20.992,11.05l-20.984,11.057l0,-22.114l20.984,11.057"/></svg>';

	const parser = new DOMParser();

	var svgElement;
	
	doc.setFillColor(241, 240, 234);
	doc.roundedRect(width - streetNumber, 0, streetNumber, 250, 15, 15, "F");


	doc.setFillColor(241, 240, 234);
	doc.roundedRect(width - streetNumber + 10, 10, streetNumber - 20, 230, 10, 10, "FD");
	
	doc.setFont('Mozer-SemiBold');
	
	doc.setFontSize(79.4);
	doc.writeText(width - 66, 231.2, $("#next-number").val(), { width: 0, spacing: 1.2 });
	
	doc.setFontSize(79.4);
	doc.writeText(width - streetNumber + 65, 231.2, $("#last-number").val(), { align: 'right', width: 0, spacing: 1.2 });

	doc.setFontSize(396.9);
	doc.writeText(width - streetNumber, 168.3, $("#fieldHouseNumber").val(), { align: 'center', width: streetNumber, spacing: 1.2 });	

	if($("#last-number").val() != '')
	{
		svgElement = parser.parseFromString(left, "image/svg+xml").firstElementChild;
		svg2pdf(svgElement, doc, { xOffset: width - streetNumber + 42, yOffset: 184.5, scale: 0.23 });
	}

	if($("#next-number").val() != '')
	{
		svgElement = parser.parseFromString(right, "image/svg+xml").firstElementChild;
		svg2pdf(svgElement, doc, { xOffset: width - 65, yOffset: 184.5, scale: 0.23 });
	}
}

let page = document.querySelector('.page');
let themeButton = document.querySelector('.theme-button');

themeButton.onclick = function() {
  page.classList.toggle('light-theme');
  page.classList.toggle('dark-theme');
};