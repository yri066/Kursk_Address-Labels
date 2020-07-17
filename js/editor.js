$(function () { //поиск улиц
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




let timerId = setInterval(() => resizeForm(), 1); //вызывает перемаштабирование элементов каждые 0.001 секунды (костыль для правильного отображения, но вызлядит идеально)

var Ulitsy_sootvetstvie, ulitsy_goroda;

function resizeForm() {  //отвечает за внешний вид формы
	
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

$(function () { //
var _0x20ef=['0KDQsNCx0L7RgtGDINCy0YvQv9C+0LvQvdC40LvQuCDRgdGC0YPQtNC10L3RgtGLINCu0JfQk9CjINCz0YDRg9C/0L/RiyDQn9CeLTcx0LE6IArQmtGD0LfQvdC10YbQvtCyINCuLtChLgrQkdGD0L3QuNC90LAg0JIu0JIuCtCg0LXQstC40L0g0JAu0JAuCtCk0LjQvdGM0LrQviDQmC7QoS4K0KHRgtC10L/QsNC60L7QsiDQki7QmC4K0JvQtdCy0YfQtdC90LrQviDQlC7Qki4K0KDRg9C00L3QtdCyINCYLtCQLgrQp9C10YDQvdGL0YUg0JUu0JIuCtCa0L7QsdC10LvQtdCyINCULtCuLgrQmtC+0LHQtdC70LXQsiDQkC7QoS4KCTIwMjDQsy4=','Zm9udC1zaXplOiAxcHg7IHBhZGRpbmc6IDE1MHB4IDg3cHg7IGxpbmUtaGVpZ2h0OiAwOyBiYWNrZ3JvdW5kOiB1cmwoImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSzhBQUFFc0NBTUFBQUNDSHhPRkFBQUM5MUJNVkVVQUFBQnZXRWVaY2xGdlB4MXRQUnRwTmhGcE5SRm9OaEpwTmhKcE5oSm9OUkpwTmhOcE5oRm9OUkZwTmhKcE5oSnBOaEpwTmhKcE5SRnBOaEZwTmhLYWJrbHBOaEpwTmhGcE5oSnBOaEpwTmhGcE5oSnBOaEZwTmhHWmNsRnBOaEZwTmhGcE5oSnBOaEpwTmhLVGJVNXBOaEZwTmhKcE5oSnVXRWVHWlV1UGEwMkhaVXVIWkVxR1pVdk5sbDJIWlVxR1pFcFVTVVhKeXN5WWNWTFh6TGxBUGtOQ1BUL0t4cithYzFMR3g4alJlQmVlZUZiNjNaM0h4OGhPUURjMFBVM0h4OGhNUGpSbVVrUFNkeFhFdnJUUmRCSkNPRGFsWkNYODNwLzkzSm8zUDAxTVBUUFVmU0J6WFUxdVdFZVpjbEZJVW1MMnNWamg0ZUdIWkVwcE5oSTNQMDF1V0VmR3hzYlJkeFZxVlViM3NsbEtWR1Q3dVdLZGRGSDV0bDAwUEVybDVlWEN3OFAycmxQYzNkNk1hRXg0WFVoTVBUUGc0TjlEVFZ4OVlVbGtNUkQycTAvKy8vOC9TRmNzT1UzWWVBL1FjdzZBWTAzL3ZtRDhyVWhjTEE1YUpBZk5jQTJGWTBwd09SWGRpU2pZMk5uSHlNblhmaHc3UkZNNVFVN0Z6dGxQS0E3dXBFbm1senBFSUEzd3FWRDZyMC9pa0REcm4wUFljUVAvdzJPWGJrei91VnZKYkFwSlNFMlJha3JFeXREZjZQUFQwOVI5WWxJelBsRGc1dXpNeTh2MTl2Zmc0K2JLenRHZGIwWkdPVEg3dEZtUVpVTFB6OC85NGFPZGVGajRxRUd4WVNwOW04UFJhUURKd3JyN3hISTlUMmpCdnJ2OTNKakxkUmw3UUJiZWR3ZktoejFTR3dMazFjUTFUR3pFZFNHK3lOWFR3cTVVUVRTWFd5WTZHZ3ZJWkFIdDcrL0cwK0w1MDVEVmdpYSthaEx5dFdlWmFEcW9iREJiU0RxTFh6ZUxTeHZpaEJyN3kzN1Rra20wYlNUamZnL3Z1WE9WVHhPeVhnemVuRXU2Wnkya1d5TFl2Wnp1eElobFRUdDZrN1dsZUZCQlEwdkh1YXZrOFB6RnJwcTFlRG1BU2lHb1Z3MTZqS2p3c1YvazNkVHJ6S1hldVlubHVIdFNYbkh3bXphSmhJWldUa3QwVmtILzFvV25pbk9UZW1ZcVBWY3JNa0RxakNDTmZuYUFWREp3aEtGbWQ1R3htb1phYW9IT29YSmtWMC83M3JyTHJJbGFWMWM1TWpMLzhxM1dybnY4OU9pNGpGajY1c3lwcEtLTXBjcC81ekNPQUFBQVQzUlNUbE1BbG1ZS0UyQkFURFg2SENSWExMN3l5M3ZSaVlJZDdLWGRuc1Nya2RmdnN1RzRjMjR6bDJubHpZRk1xT2xsL3RLL1JkZlhNY0Y0RnJtbnlwUjFiZUtiUi9pcm5wUmxYdHpTWGVDVGh1M21mWGc0V2dBQUtLRkpSRUZVZU5yc2x1dU9va0FRaFN2aGpsd0hBM0tMb2tGZTZMei9zNnluQytqd3k4MW1zanViZUg0STJEUDZWZlU1MWNwSEgzMzAwVWNmZmZUUlJ4OTlzMDd6WE1ieS82Z0ZrSHZ5MzJqQ2tnTUpiKytsSTFUc25lVEhxc01qWHBDN0lpbWduQTNhYlRXWWY1cFhPdHdsTVEzMmdWU29LNXB0OVlJbkwzNzNZeHhUdkhpZEdtZVJBSG04OHM2aWNtN0tPNkNRZEs0OFAzYmwzOHBaNEltYjR5R1NvRmFhTDVUYjZ0cmZETE9Vb1BLdjYxQzZYSExrSDRnZDlLVUNRaEVQRjJVb2RsNDNRcUFYVCtJNXUwSFZpbFBkOHQ2WHY2ODR4K01PVEJ3UEtMU0VFZmVORnlDVWh5ZzJLd1g2NTl3WHlldUdzcVlPMnRJTHdyK1F6Uk9vZ2p0Y29sUElCY2xXamZJV3lQVDVwaXYwUm5XT2dOU21nS3JIb3FsT0luNjEyanc4ZlR0dnhPK0pOVlQ1VjVmUUludmpRdURFSU5JVlZJMWs1VzQ1VCt3YzhhZGlOUXRMVzNEV2R6SHljaTVDRVRmNGxxaUdxRHVnY3d3dmxjZ3BSM0RnSFRHdTlsaFhVaURrUHpDZ3U1d0prMWYxeFlQMXFiT2VXUGpCb0wrR2RlaDRvWWlUQkduOFozbjFrVHRQb0gvZDlzZ2VJMm8xd2JZS1Y5cjkrUlNSYzU4a0FSZXNKcHkzR3lCVzN0SFo1dnFraDFEQzJoOTRhU242ME1Zb0RIK1hOM0pwUjU5ajk4ejQrWTdGU0hDVEoxQUpwWDFWKzM2dDNVL0VpakhWcXJZb25vM3ZHOVB0VEt1cCtOREN5TnFweW9FeCtSMWVENHVqZ2RJeE51SHUyaHdsdUF6QVpJdlRFN3ZGVmZGSlNCM0dkb1ZMZ1diajVUQzhLKy8rVm9NKzlyMXkySHA2aGRIelBTNjMxbERuam56aFFac05LYWxVVHhPZzNXbkJPdGN5RE5wZkpUeWNMWXpydzlNTm1ORVRQM0k1SkxlVDhrcStRYXhvanpZNTUyelRXejF4MlhKbHhrSkozbWpqdlFQc3Y5Mk1tM2w0RVJuZVEwdmNHc0htK1ZRTjNLS1JPRUtsMVhqN2I2bUN2YmE2bWJMRENNMTczck1adXFhbEp2d1B6QUVXMS9JQzA1R1hPNnkrVFRmL0hzYjJnRkZjR1BZZWcweHNyeDJTTFZwMXp1RUljTFNVNVQxdmlXTHRpUk1oNEhPdjUvSnF4YjdrOE5qeGk3V3Z2cjNhU2E1UEYxUjhJVkdHeEZlUDcwTm5RclgzK3BoaTJ1STlMLzNFMXhzL01lVmRhM241OUdLR3R4ZVhxWTBScnRmMCtMVjdFYjNaMnc3WGhTVXFiN0FOUFpmSGpwVlRvOVJ1MU85NUd6U21OWU9FSmt3dGhvZCt4UjZZakdHMHhkRVdHc2hFaldONWZWUFR4ZGlzTUJrRGJ2R2hpUjFLR3NEdUMwR25WRk04dmVkdE1VczhFaldnT1RsMlBNdkxJTE1heG1yTnovYnp4OXJqT093bTlLYjF0YXU4dmowcHQ5aHQ3RWVkbUlhM3luQXRhL09YZ1dsSkRlK0pUTmMwTUtUT3RzZlp4azY3cjdMRHpzbFJqOTNjQUNuM0hiZzZsdmVsRVI0cjYzNHhZemU3U1VSaEdJQ3hEUDlRRlRRS2lCWnBiVUNORXRPbWlVbE51M0NoaTVMQUlTR21ZY01ReGdRU1Y2eVlPNEFOT3pkZUJCZkFKVFRoRXVnVmRPSGU3ejFueXVuSmFlWFlPTVkzTmdHcHpqUGZmT2VQUjVsUVVKVVU4V0RXQmlYQStkZ3JTWkt1azFuTks2aTJxS2NsMzBvdmY2dDZZVUY0WWExR0xOOFE5NHJEaXlVbXJRaTk1Z21wQ3hjYWZIMHl1N3VGVE1KN25zWElZNXFNbnNpeThTVkVQcjhjQVdVL0JOVmhJNFpwcWJHVmZFRzdIcHJ5TU1iaXhIanVyVXYwcWJXRiswZzI3dTQ4U3FkVDZqNFJZOE1nbGlYWEoxR1dIT29yRDNmWWxua3dyRkhpMmFia0kxYTlPOTVsY2ZDTFlyZFVGRGNYNHQ1TlhNQmJvOVNrVWY4L1N5TDM5V3M2UXNNb0hiNjhoUmlBWXY2UmN6NTZ0TVRuZ0lLNnF1SnRqcTltWWduRERlRm1kL2pZVElzZGF5ekJ0MHRxOEVuRWtGbloyS2hzUDd6K3MzdzZJVVp1Vko3bThOZWdpVU8xdWxMS0h0a2t0K2paKytoK2VERTQ3dUVXTXZoTkpXR2NDYzFTdFU4b1Q1KytPM2kvVVNGNE1LQWx1Sk9ScHpudnY4K0hOc21oZVZPaVZjU0NnWjcxRHF0a3pLWmlqWHdVL3lpcnRXb0J1eFF6Ymd0ZUx6OStuSndRL0hWbE93R0s1czZscllDbm9TaWJTZDY1Y2dkSHByelgwZmo2Qlo4V2NSYUlOdTZLZTFHQzcyc011YzJXY3lxd01wMWh2ZjdxemR1WDVYSmxteGRjbHovYml1MCtDQ2dwd2x0Q29ieDFVNnduYUlVQ3ZKUXdTaTU2UlVteGtUYmwzdUNWQWZ4bG1VciswRkxrMmhONGNMY0ViL0h5Q1R6ejlsS291Y1czNUNYZXh0cDJFa1B5dVNGM3ZWZVYzK0Z5d1BYRWNlbGsvTEk3c3ZTenVWcmFOc1hwcHdUdll6eDliWU5ta0dOanJ5NHZReTVMcnVGRDhVRDBTWmkvakRYaVZGTThja3dOK0Fvc0d3N2pnQ3k5Y1NQdm5iWGVkWEF1ZjQyYUIyNU9Lb292Z0RqcEVmVkxzTUVUMjEwVk5Sa0orT0Exa2RNQS9lMHlGYzJHcWRNTFc3R3I1MHZyZnRKUDc5cG1lZU1OMEJ1YkpSaU1KNkxoQ0Q3Mzl2MytlODJiUlpzVE5mNkQwUC9ndlhaT1hDUHkyOXRCSnBNT2o2RzhMSnJsMzNzQnJYK3pIZHQySEdlSTl4U3BOcDhUL2ZjQzEzRmF5L0hDWlM2alA2NjdHSStYRjAzN0c5aUc2R0dyYzBwYnJZT0Q5K1VObFB5V1h2RjQxMmpyelRFYkRBWlRwTTEvQmdoem9YWmdOdlN1OG5UamxsNzczSGFHUS9TbWlJNmZkQzRXWkdWNnBweE5hR0UyOWlLMzlKN09mbmE3czlsOGZuYldPaWM2N0dqTmxYMHlhWkwycXJLdGhLSFdNTnQxa0gzM3pyOTN1OTN2SW5pcDJLbTR6bExSRXRBZDlWY1p1UzREbXN6VHhiSUpzdjllTlpJTys5SlZ0R3pVNzlWcVgxYXAxV3E5SHFseEg1eHNkeUQraDE3VjNoNU1GVzJ2QnFNU3JpWXo0MldlamkrR2s0bVAzcjI5dzhPakc3aHNTbHJKSGZVa1ZrTUxNbVBVeTBzYllwKzhpVURRaWllcWtZLzduejhmUy95czIxMm9XdGJYdERyWkZVVkdXL2prM1ZaK0NmaFV0VnJkUDBSdEZXNVBhTmVSUjJMMExaM08xZndkTHdLdmx1b2V0QXEzQnU3NmVHSTJZT1A1R2VZWm04OHpIYXEzVDE1b1FUU3RybDVrVDl6K0thY1ptaVBQbS81NGd4K1lscmJnbW92ZE5rTkR5U2x5Tm0vNVU5L3FwMnU0ZmNrMTdJbys0K0lGNTNibkxWemNEKzgrMDlNZVNhNjVlTlNHbUIwZEhVSHJreGU5b0VmdkJ2T21ZUHZIVHRNdjd4NHpMcTk1aVQ4MWJaKzg0T3B4TC9jTHR5Z3hYL0VXTGRzWHIrRHEzajZsMSt0QlFQbkRFZ1BzQXZ3M3ZYcnZhaHRld0VlL2VMVmoxY2FCS0FxZ1crU0gzS1JOdDYzVnlMQUlveWFCYVR5d0h6RHpBUUduMk02dzFYeVI3TTZWY0lyRkxCWWlmWXJNODBpNXlBNGVnZTVrdnVEd3VMNSt6OWlzZXZiNG9qaUhXTUJrNzMwZWZjRnRSVDBhTFprSVlKNzNidmJ6L3VGYTE3K3YxQUV0NWpqWUJqREZ1NzM3TVh2QVY4UmdIMU55UUJoanJlM3hGK2h4NWlJVHNQMjFvSGhuR096bHhvQldVRW9KM2NNSDdNNHM1T2luVHU4V0w0eDljaWYzVG1SandQVnpkZ2MxekRhWWJ4V2JnTmZQVzRKM0RlK0lqYUZYQnpUTWVZVHN3YVZlY0wzanY5SUdhTnpOdDhqRnlwK0NqOXNrWG16bmNmVFFEUEpYRTlicjVUS05GMm1JbzhVOEpFTTh6REFTd2ZXV05zYThuck94WFp4TFhQMVh0U1lESm5pblhSTVljMGdHaG53ZDRmeHhTL0J5OXNkUE1vWjhPZUJjL3lGN01kNnBaT21MeTFnWS9jYjNsaVlPaTVORExJSVlnZEN2VkMvR081M2NEZmtjWkhqWDh5WFRpM0tZVE81S1RvTGNpd3VsZHk4OEw3cVhJaTdPUXk0aDlsNFVCQzhQQ3Q3cHVWQ21GTFBrV0x5NS9zMzBvc3hvNUxyT3ltTW5GdThUMjR2eGNsN2R0clU1SHFVcnBJQVhaSy9OMkU4VmJkTXFFYXZNNmplV0Y1ODIrbHRsemFrcGZDeU0xYThzTCtMQWY4cUxxMVB0eFZ3dnlwY3ZMaHBYdGVhNG8vWXY0cEJBWE8vZnExYjkzVkM4S045a2I2VmE5MTRkNWh1Q04zRWNNR0xuOWdJbWVCUEdBU011UFBoQThLYU9BNnJ0NU56L0RjbHJzMlJlZ1BlU0NJSTNzanZRd0hYbERnUnY2dmdDM1BnQlAxUHlvTDdEcStxcStyZWhlTFB2ZVNkM0lIZ2poeVk1RUF4djVBOERORy9yZkNER2VaL210N3o0c1RlSkhBR2U1UDBnenY1L2tvakRPSUQvUi8wcmRZeGxPNi9Mc0dhZEZYVGMyWkcwd0NPRWpvcktza1l0VFhQelFHdnQwQ1pKSGtORHBDOHJBbHUxYUswVnRiNHR0MWI5MHZQY0I0U1dVbkZXNzEvY2RPNWVlM3creitjNTJmUEt5SjZYMVJ6WVRUNVErVHRzOUY1OGJjSjc3d0Rxbmk3QlovNDM3cEZzT1dub0wxOGVHUmxwWFhOdjY4TW12WmhrNHNyOVkxdVB0K1d6UTNhSG82dkw0VWdrRXJPNW5LYTllWFBueHBFanUzZVBHT3cxNDdidTJHREd1eW5xSGo3VHNuOXlNajIweVcwa2habURSTzJPVUdJK3A4MDgzN2kwWVFPeTEyNmdOZTI5RXBnYVByYjFmRjlmZXNMRlVzdXgyWHhlYjIrcHgxOU9BZHpSbFppZG50bitjY1BJQ05UYWJEK1k5WFozRTYrZlo2dWgyU0NFWnhpR3BVQmVRblkwZ09ydEgxc1JiUXE4UnQ0ZWhxcEc0Yk5KTFVuekZFWFR3RWUyejl2akoramt6TVlsbzZtYjliNDE3VDNWbHEvM1JwUnBRUlRIaWxTUXFvWm1HWmFoZmIwOXJsUTBFQWhCb1pjMm9QbmZlMlBId0d2SnI1dndNM1FGeHhmaWdtUzFpcW92U0w1VlEwT2xvZEJ1TUR1cTV2L21aWmU5eWJqSENoR2xiREJTNHhJelZwcjJvUm1hWTNabVl5dTA4NytjRDJuaS9URGhxbmxkZ2l3WVlLRVE1R3ZXZWpNRFpoZWFSNU03c2N4L2RONWVtL0N1TzliZDB0MlIvenpob3F0ZXBwU1JQWUlFWUVIVWZGamlGYzNZRzM2WFBScDF6TTU4L0FPeVNlL0I3cGFXOXZ5VENUZFY5YktkZGs3MmNBam1SS2xBQjNtYVd0SE1naG5LYkE5RUE3UFRHMyt2bWVGK00rWDljTEFGdmJlR05sRXN0VnpnZVptQXNjUnF3Y2NIZVdVMU04UFlldjN1UUNDUVFQTEkzOTBmaUhmci92eDRsOE8zN0dYcGNpWnVnSWxZMGd0Wnd4eFowUXhraXBCbnozMkU0L2ZYOWtuMGZycUczdkNqcVM0dmVrbVl6am1kZ0Vra2p0TnpoVmlXNTZtVlF3UFppM1BPTWJ0dkNjaC96L3NBNjNzY0w0eGVocXFCdlZFRUM0YVdrM0txbE5QMWpLNWxGWXBhblV3YjVLN2tkbWpsQnU4WER5ODA3UjBsM3ZOdDRTZHd3ZFUvdk5lZWtRRk1Tc3hCaVNWVlgrQTB2UEorVFU1TVk1RWJ2TDgxN2JYZlA0YmUvT2Qxb3k3dzFvUG5GZ1haQXlXV1NKRTVnUnRVdFZwRE5HcU1PWmh4TytId3JiYnVOTzBOdVlmUmV5ci9lU2prWnVrZkh1eWRDNmt5aWpsQzV0UUZ0ZERZV3p0K3JybG9ZbVlKMm1LbDhXRENPOVVONC9kVVMvaVd3ejFsWTZuNk1MNlVmVkdJb3hqSUVLa294TkQ3Nnhoek9SVU5hVGd1Zmo1dUpyd3hMTy8rOXZCVkI5YVUraEZNKzZPaERJb2hnQlprT2Z0cmIyMmhnNzRJekc2dnRVWHQvMUhOZTlOa1BJVEgzVjZHL3JsTTNoU0lyWEtGSEZkaEF2OW1GRno0cWQ3eVhPSk5uWGdIYWQvbXZSL0llT2pyajVYWWxVNFBDNTNvV0ZRNWp5ekw4YkVyd2Q4dGJ6Q1NUTm9VK1AzT1Vnb2ErZVdCMmpSYmI4YjdpWGhob1N6L01CNW9PcUlvRWZnQ2Y5YWVjc294bjRHTU90bmYwa2FDZkxvNEptdEtCUHVDSGlodmV2Yis1RzdrdHQ3RjAyWmludDI2MWczandXTEpmMG94TlMwUFY2L1A1d095d3NPYkhHUHJISEE2blllVTFibDBkY1dJd0c5RTBwb293am9hNHl0L3BJR3Y0VzlQVHg2QUR3U3dHNXIzbm8yZE9UZ00rMitISlh6Vkg2R1hYOTlpU2Iyb1NsSlIxNUtGV0RyTGdwbkg5OURWSzZxa1kxbWZ3dk44eEpjdUZBVVJaaUFYTDFUYTU5RDFSNU9uTGQrZXZyOExYRFBlNlhYRGFlaUk3blpMWDN2V1dlR3dmUEtOcEdjeXVpU0tvZ0NSaWxvaHEvQ04ycFV2Q0txdVlYU1ZFMkg4SWRkS0tlVEhuVGM3K2p2YWRsMjdlL2YxMmNQclRYZ1B4d0lPdkREYTJ5emhKNldLbDgrZDJQVmhjUUdpY3VScUUwQlFURGNBS3o0cE01akw2WklxaW1SVVc0WDRXTHA2T3AwMysvczcybmYxdllhalJ0TDB2ak1FK3pvTVlQQ09kOXJJczdQaWk2K0YzT0RnNEVLT2VBM3pHTmRnOXZKcHVLczVDWFlNSzlGeW5yZzR1cnd5RDl3T1c4RGJkdlpjOWJubTlrbjA5dmZkZEZLWVlHeHMyNjNGUWNOcnJjdFlNa2l2N3ZWa05JN0R4VWlTWUdQMnlISEo0Vncrd002S2QvMVJzMTdjSDhoQWd3SVBWT283dG5kOHdmQnFYTDIzME1DYmxRWFZXbWtlMUFxWlZJMUxkVDQydkpPYnpYdnhmaVBlL241U1lGb3B4dFhjQWlRbjFYbTVSdjJnUkNUY2xvSHF3WXRGMEVQbFE0Ukx2T05oaTZYOTlPa0w1MHg3UDRNWEJ6QWsvSmdVbUhmSmNVNkZjUFhsRlRXRmJqQWZwamlvS2xEeHBTU1RTSlhZT3E3TlJyeTdUSHNQWDdrS1hraTdCUXQ4M1NndzY1eVg0N2lUVlRkZkRBei9SbmN4ZThnOXY3Z0lWK0RpZk1pZUtsRzRpOVM4OUtNKzhFN3VlbUhXTy8zbERHREpnY01DazRaZ3kvT3dsS0VZeUViVWpDVEI2MUlqTUYwcWwxT3BWTm5mNDRVTGphcFA1L1dPTmZJZWZsRHhIZ2N2am9nQkdwOU5sVU82Snk3alVtYlZjNE9Rb2lkeENCQ053QVRKQnk4RmE0MVRHNytHOTUxSjcrSHZ2SnBMaTlOZ0ZJWmR1UEVIdVBVbnVGQkJYQWd1M0V0aklSTEc4alVSQW0xZ3BHbTBaaGJGU3hTdG1GWnFJdFJxRmkzV2Fvc0pJMjJ4aXVPdDNsb1JMeVB0dEFpT2dneUl6TUxyeG5PU1pxYmFJU0lHVCtkR0IyYWVubm0vYzk1enZybHdFWGhkQVdPSllGbmIrQWFPWHI3K0lJaUtSRDBtd0ZBK2VPT1ZYdGNqaFdLUFhyMjZjaVRtTGxpV3l5L3dFdUhsTGI5NHNjTlJ2UDVpTGpwTTFySGJsL2RlZnoyVGdHTUUxSkhYdDVtUU42MWJ1dzhmbG9MVGQxT2pXeXh4RG5taElWdis4THFDMEh0VnZoVWRHdC9Bb2R1d0dwdThCUGN2RDYvdnV4MmRDQ2lpb293Y29pZzdYb1lQUnQ3T3pzd2tLdExNbGVVY3MxRE9lT0NsaEtwZnZGTm53S0pSV2JtYmF5N3JrWUdkemE2OWt4RDNqd1ltbEw0MWFBSXpoS0lvb3NHR1dQanlWK2pqRDA0TDYxOUQ0WTRBOGQzaktmZTRWU21kNG5sZTZKMDY0Vk4rT1o2bkFMaHRzTDl0RTQ0ZE9ucm9qWkhMS1dMTE5NOFVySGE3UHhnTXVxMjVhcTlhbmV0TWlFWjB1V3N3MGtmaDhSTzdNWUpKdXhsd0dpTGJiRmF4djNIQzF3dW4vT0hGQmdlaEp3Zmk3MU5qTGpjeDBleENCTnFxckhQMWVqMlR5Y2hVT3AzTndqdFpiT1FNbG5GZFJHWDNlc2Q1bENQZ2tCSjNIUlVyVWFpL1drM1dvS0Q1cFY4T2dVbTlFRkIrQVZaQUJsYUJ0cU9BcDNJWU91V0Vubjd4dFdGRW1lRTlRb1I4Y25nZlJPeDE5eFhJTUNZWWVBVkJnNEoyeXhkZXQ2QVJ6clNXenhTcmdGU2JCVlBsaGlGRFhuOFBua3RyMzBPR0k5OG4wc3YxRDBlY1VoeWFvbXZYTlUwUWhKYys1ZGZ0R0NSanRzVWw0T2FnYjRYRE1DMFJHNDJRNWMranhLRExPNWhpSmpaOVdKcDUvTmpsUmVEZ2tSVDJpNnpPQytSalRhajZ4SXZBVHU2bXpMWWlPazNmVWxWVFBadmhSdGdRbHVPeVBFZnB0UnJGdThDYXNNZ2FZT3p1Z2UyWXRmc2g2TmNPNldiTTZSZWNJSnpZOGU3ZENkL3FieWJQMjRxWU1xMm1VN0lHTkEzUHVja2t6Z2VRQmYzeG82eHB6NTlyaEs4UjNnYXVDVitMQmd2M05OZGdENVFvbDVlTXFEUVRZMWkwdjV3RzRqMEg2ZlZMdjhSSkYrSHpacmpkY2dvQ1BqdWsxVE1jb092NjJSL3ZGeXJ2MDgvM1NKV1BtcFluTmV3RUJNWDVQWlI3OHhDQkFSbHhJK2lXNHRNeHRKTlpkQS9ZamYzaVJVZnBvbkdacEVvWENnVjZLcys1dVpYcDV4bVN6WWJmTFVSZ1puNzdWSklTa2NxN1RIQS9wZkcySUxURnhTWnpaUEprMmQ1ZFlaWm5wbUVBeFFVaDJoMTBENWFmdk9nb1hXRDhxOHN5eDdsYUlId3kzRzBscytIM01PSGpsZEdOYjE4R3JjSDYyWWhVV1hDQnp4dHZXRmh5VHo0czR6d0VqL2dhZUVsUFlybUFnZmFCbzRUZXVSTSs4cDc1OVZoQkxDZmNMSFRGWFBYZEdudHBJejNybE9hTHNWUnN2blJEQ2dJd1NJTGpOZUZySTJRb0J3L2Nueno1OE1GTTJaN215bGRUSVVjTzZCNDA2RzcrNlFFZDJsaTR1SXdZT3Y0S2FZT1Zjdi96SGZBNkxOaVk0bWNFM2xrRFlEeHlnckI0SjZTOE9Yb0EvbWRpY25MZjNza1BSaXhrVndjZDdTUjJOLzk0c1FDdmpNdTd1QkhFWFNpZEQ3bU9JWHFuQVlXZzhsNGpXQ040SlA2NjJMZ1RPZ0t1QStKZ2JvSngzQmtGSWVPQjg0LzNURGpNVVN0RzhtSlhaSTVmc1hHbDJmTWxGbkJkNE5JejFQTkx3YTVxS0hoTU1ndEdLWVJYbjQ1Wkg1cGZZdHRKLy95dlRHZFdUSzhjaGpILytOMTRISEVUamZPZ2hHWGU0Z0FuMGVDWkY1UnVPOXdhNERMR01FVFlEN0lHOURiazVjRTkxSGFjOG8xM0NuL2RTbkgyb3RWT3NRbkp2a3orOHBuQjdDNHhwK1lYSkJESnVSclYwKzA2akpMNHZuaStCSS9GNzNPd2hlM29XZnZub3I1QndIN1hzL0hnNUhvN05WMnhOenpQUGhkdE1iRDlwdUlrZUg0M2ZDZGVudXZOWlcxSlVLU21DUmlhOXVKRko5cXFwaDFjckw4Q0NOanZlalllUko4cUhwVWlqaHBLTnE0NFVKZDR2MG4yNnFmUmdaN2dpSmpqS2QwK2YzeTFsMDB2dVNKS0UzeWFoN3dUVE9SQ2JGcXkwL3Z0OHdUeUtvR0MyUktIdkordzkwcFhVcmdTY2RFdzhJc3NTdGQ5VXRkZVZqVmY1Z3Z2QkpPa2RURG9wTGMwNzZTM2Jhb0RsL2RMQkhsdnBuQUc5Z2pzRng4WDNsM3d4Wjk1SnpqWk9SaVhSdElydGxSYTdTc0J4YTdBZlh3dDhla1Vya3c5Z3hPc0JXaklQdkI2SjVnM0I2bHZNTzlXZ28wU0cxQllWckhNdkQyR3NFN0hRTjVaUm9HZGt6ZXZYMzdITzhHRVUxdmlmT2ZidVZ1ZklMMXNrekg2WnA1U0N5QmkwQVI3cDJQemxvK2tZQWY1ZjNtbndnZzh6a3MzRmJZNER6RUI2YldzWmxqbFNTYmNhcHQwVjJTTEhkQUR2RDJ5QmV6TlcvWFBuMkhrNWJ5OFVuNEx3TXRHbFJ5WUhLVTVaZHF2aXFOaFpqWUxBYkhZU0ZUaThVb0VlRHYvUVEvclJ2VWc0M1F6emd0VXJGTnRHYkZmNTFUMFJTUWZ6bkEwcXJqMFpYWjI5dGFWSEFOTFU5MnJQdmpCdTJQamR1RDFkbWdjM1c5YlhSSHFRdDhTclRvWlBwdXhSNzIybUNzMU9wMWl6RmxLZS9IeXZ1UjM4d1o2VzNnSk9FOVdJS2JEeVdRQlJ0Q21xZzRLU3lZWms4d2pjQlF1YlZuM2tzS0RsL2d3diswNHQycnJobFZiUmt2YU9IQWUwcDRNOTF2UDYyY3YwcjlxaFRvN1hGZUlVSmk5Q3dSSFlGdjl6N3pyVnEvYXRtb1RQUUxNandFVGZKZVQ2bG1LeDNsNU5BakoyT3NLcHRNMG9pRlBQZUJ0Z0ErOGEvRjdHMGFBNlpXN0hBZ0ZIcGs4R1hNWHllZGRRK3hsTzJoMFBjdkQxOTJuZk9MZFNvOEF3NmtqSGk1Z1BQdDFlc0JVMCttNWF2YVA1ZGNuM3MzaFg0RHpBUEVYUVhTOUJ4WVNqSzZuM2NIajVoUHYwb2x6WncyWi9CMXhsdklNWnpyK1NjdjV2RGdOUkhHOG9QL0MvZ2NlUFBXZ2hjVmxCVUZGQlQzVVF4UERHUExqRUtUQ1JvVkNrOERRVXJ0RkZrS0ZpS0RieTdTNHhSeXNDeVhiQ29LL1FFRjZLSVdlUkJBOGVCSjZFUEhpUzVwbVVyZFZWek52dDZXbExYenk3ZmU5TjhQTTlQUERwSGhweHNVbFRqUmdzZnZhbmFSNGFjWlJpZXRha3JoZ2h4K0RxOG54MG95anhHb2lwTkxNRG5jL0pjWkxNNDdXWVVOTFJtQlZDNlowMTUzZEc0bngwb3lqc2ExS0NZaXJPWndLRTAwTnN1MWZlSE5MZVU5eEpzYm1mTTVwMHYvaXF0d2pFNndnM1FONXJ5VEttNUpQbkJ6OVFzelYvNDlZTW1SWk5tRlJhSEQ5K3QzbkNmT2VQSFJXZnpYMDhKekVKaEJMLzRNTCtvSzB1MFp6TjVjd2Irb0kwWW1lYm5yMkhESE1PbFR0bjNHUFpUTHFQWkQyeTkxQjRyeW5lWjdYQ2YvVnhsdzhnRmo5Wjl4VnFPdy9kbk81d1pWYzByd3JPdkQ2eE81d1R1TDZBVHVkWm1qVFZKdmlwaktYQmptSXBIbEIzakNJL2hYaitjSW1IYWdrcUtDdHBzRVhrMG41Y1RUSGduZUZuNFZlSUc3VGkzdjRJTVF3RWRVa2cxTWRtVHVWWXNkTDVTM0FQK0dIbm9rOUx6U0cvUGNhU3hybmdITTV3RDJaWXNpN0V1RVdzNVVxZUdMaWpkS3Z2alk5ODJERVVsMTI2ckwvZ1JNcGRyeFUzb0xsbjNzczljREVQT2tTZmpMcklDQ1pjVm42Qy9mSzhBZHhMTVdTbDhvYmJESkRZbldMNkZiVkltVGlVUjg3eHArNmgrVEk0WnRYbWZKZW5PSDJwbHVvUlZRdTZIQjRzMGowSVk3M3UyQVIrWGMxRjVROXczR1FheXg1RDdXcHZMUDlrT1dldnlSVjdMcllORzJUOWp1bmJpenVINFlhdU9IWUlSanJuVWt4NVQwYnVWY1FvbzA3bFdEZkhFK2dmVFJ0T2hDU0gzSEdRdWZLaG1US2diS1pFeW0ydkdzejN2Z0pyY0FaYUpPa2gyN2JuVVF0eERHVzFWMWpHM0FwS2l0ZUtxOXVaY1VJVjFBVXdaZloyaXJVckJweFRRQTJRV1YveUxaUVhpNzRDbFpaOHk2VmQ3UGt3Nk55YnhPdW9reDZwbTFqYklNaEZnNHB3c0lBeG1YT2U0VFczcGk4MlhKRkNIZWcrZHM0SzhUMWhxL1NNZzdLaENIdGF4TzBqTEhtUFIwckRwUTNYMVNtdkhBZkdybEhTSHZvMGJuU25CdjhnQjdNbnZkdzVGNUJqTm1oMU12T245NnJkdlh5WnEwd3hPRnNud0tybWluYkhkL2I2K3g1bzJ6Ym91NE5mR3Y1dkRSRXhTb2hKTDVwYzFOZzJZaThzRjJYTzgzM1hLZnpkR2VkTmUvaFdiYnBmRVdNOHhiNTBBblUwUUpRaTQ5ZGJNY1hEeVFWbnVDbndxMW43KzFucmNZNlk5NW82RkFvSWlFT3gxdS84RTdsUmtvdDdmbFRmOWtJTjZSQms4QWpPQ3QxVy9tZzVGOENNRnZlaTNQWlJ1MjdWVng4R2d0OWhJNDNHdG0yRXhZeVVMZkpFL2cwTENKUllFYTh4MWZXUXR4NXU2Snlkd212Z0Y2NGFVTGNabWM3V05leU9STzdSTmRML3VVR3dCZFk4cDdkQ0htcktBNGw5cGJ4d3BoQzcxWkxqOXZOamlGSmRUenMyUlBpVDBzcWFOb1ZBWmdoNzlyR1FqdFVlT3FIZmNEVklycVpyZlZzV3pQc1l4ZHJUMTNnM1lCbUhnTHZOVExNZU9GOGQxaDhsWWhPVVpRSHhXN1hFdURCUWtjbzBLQlJpYVN4Y3grblY5YSt2NFhvYjhFRmlzR3J3dDc1VlZhOFYwUGVRbEdrQm0yMVd1K3ExWGNJQk03bjgvdWhCU0ZRbVl5dzk2MTdiandlQTY5L0MzOUFJaS91bkdmT1c0NTRSWi8zNWQ2T0gzc3ZXeTFFVHk3TTU5M0dFMi9ZSDcvdGc3UUZuZWZiVC9waFM4eWpuWFhHZm9qYlYxRkFWRUZFeUtkdU5Cb0FqYkw3a1ZGRlQ3OGU5M1dkdDZybHpVcFdlQ0JVUWxQbFc0ME1XMzFwYzZQVUFiWVAvWk80TTNodEdvN2krTVdEZjRzM1FYWVNUekkzUEVncFNQYmorUTVoTFVnUFNTZWsvS0NYaEpwMGtsTnVyaVVlcEpDeVMyRlNhRjFhTVhTeU1WWThDY09EdUxtTDRDMmVmYjlmRzFxWGFRYzIrQTQ1SmVYVEwrLzNlOThYMnQ4VHpDMUlxUXpPNFdGYlY3aVRBd0JFeGhnbXo1Yk8xekxWbDViYlpkNloxc1RjQ3dReSs1MTR5eVJ4ZVEwZ3ZaRlFDcTlucFcrYU44MnNZb3RVRGlLY0kyYllkM1ViSUFVcjNXaTA5bC8wVFlLUUlRcUllS1l4bXNKem9LQmo2YThJd1oyczgzZEJVR0tReUVGTExTVWwyMVZVRU9BNTlSSXcyZzcwMWpQVVY3WnVDNE5JVzRIZkF5a3hROTZWTlJ4TUszVnVoTVd4ZHpkTGZXVTF2UTR4aTN4ZlNzeFlYenA4Y0hncWw5aCt2eFRjWDExZFhWbFplWGh2NDNGaGVYNnlveVgrekFTOEZqSDAvQjRyU1Y0SFNGM2RrVW1CODd3Uk4vMkxlRHE5c0xnMzNsaWEzN2xWVGZ5dmJxc0FiREZ4S1JmNUFaWVljdGNoU3FNUDBzWlRVaVMxV29WZTMvRzllRFp1VVNBdlIxOTYrM0F3VFFsRHNXc0l5QlpMM1BKOUtJSGRkUUE1WFFTdVlrT0NTK1d0cHpjK0YrTms1SytNOFhKNGI5KzQrVUNiRVhOTGhiOGpNMlRDSVBqWWNGemVNbDNoOHpHbjZOTHJNTEJNVkV2QmgyNzBZMitEcGhMTGVhR1RnZENGcC8vTysrVEYzazY4TXp4T2lCVkRJTmZZbjVtWlNhS0sraFhnTTgxd3VMREp3dDFMZVJFY3BkYWd2emx3N1dTeklxYXB6NDJzWGhadnNSakg0emZ0ZzBSa1F1N2Jqb29BcVlhVHliYWVNd0ptL3NuSGpxYUx2b1JFZFEwSEVBQXR0OXJJdFg2ZWRxMXZaL201V0NhdmlEZ3VmanB1YTFxQzdPcFZicG1YbVZXeENRQ2xnQUFHLytLN3NrdkV0VzJzdWxSdlRNZXV1dFg5ODhBL3JkZGZlcFZzZUllVDZhN2o0ZGZoMldCRXlGY3hKd1dZaXg2TjFobHBLbjZwWEdpT09tVFFURWVuYmhVdHhhQnQvS2gyeE92NmdHYmNac0JMVVpGclFZNFlMM3RlTXh4MDVwa055WndEbkt3MGJwZ2dmSzg4MmUxNTlLamdlYUZXMTJVOUI2WXlXOWZxcjkyM295YXBteEh2Wm41KzNqWWhsNjlndGlmRkQzTzZRVnpJdXhZUUw3d3E1Q3RlMkJaMzFqbmIyalkxYlJDR3pZcFh6dWV6NHMzUGxFZ3g3MDZaRGJkYWc5bGJDWEVGWVgrYmdzdkxoOFE0cXIvL1l1OXFBNDhlbHArWVBXK2FlZFJScGpJYmlvcVROcDh5QWsyamo4aTI3SGRTeHdyZDY1WERFUjBiSEtieUlFdmVOUE12NHM1ZU4yMG9ETU9uc2ZFdjJPQUFCaEwrUWhJYVNKUlVXU0pseTVLdEhmSU5xS282ZFFjNkpFTHEwaTVKcFY1Q2JpQmlZWTRVTnU2cjMzdE9YS2lzVXBNb3lqdVlZeHNmUCtmOWZpeGc0T0oyQ21SOGVTbS9YY016K01kbnB1WjAvWFE5Z0wrUjJGYStBcVBYNG9WMVE3WjVPZ015TjFqbWxRbkJwUHlwYlRTZS9lMG1LdmVWZVVHQnJqRzk2K09YUk1YNzgrUDlaYjkvY3pPNWlKVlZRdDdhOGZGSjU0VjRWV1pjVGZqWis1VS80NDkrM1Y5L3UrelBwdE9IcTRTNDZELzcrNGVIUjkzVDA3VzFUbWU3VU5BQTlHSzh5TTZydTNIdk96S0JPOXhnUEdIVGw1WFdJMkczdTdkM2NNQ0UyekhDRitVRjhHMXZQQmlOZWdOVTN3eVpFQWZjWndzandvS3VDT1AvYm0ra000bDR6NTdEQytBSjUyeS9OK05tTzFTNEVlRGVVZ3VOY2tvb09WN2JKMVk3a2RrSHorQ0Zoc09INmZuNVVXUWhBTFc0ZjQrdmhtbEZ4d0lpVDFmazlDaEhKQU5lblZlV1NmY05Fd0pRWjhJbHN1cStuMDN6SU5WZ3FLcXlWWWVsZ2J3dVE5U3lYSXZJRW9uMDd2MS9lUkhqdVlVRlpHRmlXU1RGbUcwaW0wZnJ5bFIvMDZhOFJDZktzUGMybVNLWjlMZHgzaThSb2JUUUxTeXgwSENsUzZFcHRKMktGTFBORlZEUnRBTHlOZUZSMCtHUjVOcWxoc2hURWJOcVJVcnp0b0VsSlpOMjlxRldxeDF6dXo0NU9VVTNYT3NzYllhWnpLSi82cTU1S3ZGUXFiNzRYc25uWXR1RW4xcUpQRDY4UTVVL2xsWnBTNjZySlJLTGsxQVhTelV2QnJOQzVMbHplNG13azZLaWNHd3E1L0xyT2V3dm5NYk1XY3FKa0VJZXBjbm5BeDd0Q0ZGWHVaR1ZMMDFzbnlJdFZ0and3OTV3Ri9PeG9TOFlhR0VWSEhITnAzZ1R6YkY1b0NtenB4dFl1RnhmQ1c2MlZDU2FjaDBobFo4Q20yLzRnUldoOEhnZG1QQ0FpdXF3eDdDaFQ1dENDYUUyNURKc1J5QVQ0NHFZMW1VbW1IaWo0NU1KNzZ0Q2tqWjVpOVdzTEwxQ0xBUU1Tc2tkVTFKaTVLaHEzdEQ1aks5Rmx5aklES3E4K3M4Y3JIQzB0eWdyWndwa2tDeGNZK05PbS9KNERxdFpWWFdtS2hIcUFrcFRzV3lEQS83VUF3cVZQU0NGUDFKUlliczJHVXlGSytOQ0QwaHgrRXRvRExRbFozRjVxVGE1cWxRMW5LaXVqR3V3ZVk2V3B5RGE5WVZseXlRTHlPQ1REcVl0Z2RlYlYwY1dBTXJtcGtxVHVFd2tiWnJhQ0Jtd1V1cnBXNVNwMzBMa1lJNitLbTlJRGR3YVlKQUZiMXVjYitoQ0pzKytpN0JKM3BDOGVhaHpjTEJLS2RrQjR0SmNvMEYxU2ZTN0hhdmRiUk1JZ3BINE5oVERIWEtNaldVTU1yelF2dit6OU9ZR2RFNGdsV2lyS0QrWUg2VktKVG83T3p1N3hQUlArWmFpb3VvUnlOc1dVbzV0R0tVaDMzRG1HNk5wSWZnR25JaVNXelFzZXVlaFpwYTVrY2ZLVENnUjFNeGtJZDlLQ3U2U2dlTEgwd0JzUXlvU3pBc0g0QlNiVkNmZlRNN0xzV0FRTVQ5SjR5TkFCTkNXYjJHNGo0WXdDNlBmb1d4a2N5N2NidCtRWmZlT0wweEJ2akU2dHVUYk1FV3ZVcS9Qak5jOCt3ZmVuRUxIUU5BbExUbGJVN09nd0ttMEFiSGw2MWFOTjJMbVlUWHd4VTBWcnZDdDVETFR6cVExcC9kNm51V1R6elNxMXZKd3BacjNsbHpMMi9XTlhZY05XdEZYa1loODhjWmdoVzhQVVVrN2xLUTl5ckFlRUI3WGlXRTN6UHFXOU0vSjhzMmwydXhmcHFwR3kyZ01vQ05mMm0zQkY5blU2ZXRqRk1XSld0MFpIbnFEbC9CMDBISXNsTHEwREp1Yk5KT2hOcUpsaWFYdE1MZmFKWi85QzkydjRMdVVqbWhSY0pXdG45MjU5SVlYcEg4YUUxUXk0WFN3WnFuNTgrMzVxNmpZTkRZNThuUTA3NkUwV2hUNExsMTB6dXV5bG9RTGF4MVgwZXk0WGN1VjNIcURoaGxXV0w3VjlvVWMwUkFSTGdqeWY0SzlIQXpmaVBzdWtHS1pWeW52TGg4Ty9aSnZRNzYyNG9wYWVzaDI4dVVPMlFwbEQ4VVVESURhR25tVXp2QnRJc2poaGRKNm4xeWZTSXdIdERyTDhDWGZKK2ZZcnAxQjFNdXRSRDlrMk5IYkUrSVcrVk5PekxGZUd6R1VFSEZLN1IxZ2dnajZRaXNsM1I4T05QRGwzd0lPbXFtdnN6OTVudy9OclJoRVpFeG9DK2FOdlp6OFFwS1RLaExKUE1qb3dKUU9acTNBWllHWTFXUTJiaGxDbVQxeHlIMG9qcUxuN2I4WjJVMkE0SVZ2SkcxYVNPY3pJaGZmc1J4N1B1NHcvQ2RVVU8rQlU3ZEN1Kzc0M2d0Uk5WMWlOTVllMmJTUWwvbFV2Z0ZzV3lTajRadkJldWEvVmd0S09ORDRvT0Uvb1JUUmQ1SEczbmJkVmFSM1NmODBnZ3dKcnpvdlA2R0d6U2pscUtSeGZQSG5vYkNLZHlib05BM3NCNTQ3MFBUMGdPRzlReGhvN1p4b2VJaEI3bUdpREVpdVZwWmJnTG43RmJxdnhhM2c5VkhpcFF5MkErWXR4eXJtU09EZlZmcG1CRzllRHpRK1VPdEpnQSt4MXVXUG50T1JuMVQ1c1pucDJ6L2lJYVBSTVhmZjZ0NUpPdTRMM3FpMVNHSW16NXJXcFI3TG9vTGo1ZWwvK2ZIOVAwR0tBMWFRKytYQkhhTkN2djRSajBZTTJzQVppTWRXZ0thVVpoK25JUFZkS0hDVUIxZ0sxTFBPUlhxY0t6MHpvTUtQaHlyelh6U0xVanFKUEw4VkdhS01uNGVNR0FOUXZMWTJHN1dLMzM0VXpoaFl0NUNEeTBXSGsvRitKTjZQc1czdEQ1Tnh4NDRkTzNiczJMRmp4NDYvdzI4MCtGVWZLTFB6TkFBQUFBQkpSVTVFcmtKZ2dnPT0iKTsgYmFja2dyb3VuZC1zaXplOiAxNzVweCAzMDBweDsgY29sb3I6IHRyYW5zcGFyZW50Ow==','bG9n','JWMr','VWxpdHN5X3Nvb3R2ZXRzdHZpZS54bHN4','dWxpdHN5X2dvcm9kYV9kbHlhX2dlbmVyYXRvcmFfdGFibGljaGVrLnhsc3g='];(function(_0x4a39a4,_0x20ef91){var _0x1bd3a6=function(_0x388baf){while(--_0x388baf){_0x4a39a4['push'](_0x4a39a4['shift']());}};_0x1bd3a6(++_0x20ef91);}(_0x20ef,0x19c));var _0x1bd3=function(_0x4a39a4,_0x20ef91){_0x4a39a4=_0x4a39a4-0x0;var _0x1bd3a6=_0x20ef[_0x4a39a4];if(_0x1bd3['gfjoJb']===undefined){(function(){var _0x4daa49=function(){var _0x4a8489;try{_0x4a8489=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0xe5c852){_0x4a8489=window;}return _0x4a8489;};var _0x4beb50=_0x4daa49();var _0x59134d='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4beb50['atob']||(_0x4beb50['atob']=function(_0x136b87){var _0x9e0af7=String(_0x136b87)['replace'](/=+$/,'');var _0x19f0f6='';for(var _0x4876df=0x0,_0x2bb57d,_0x468c63,_0x408357=0x0;_0x468c63=_0x9e0af7['charAt'](_0x408357++);~_0x468c63&&(_0x2bb57d=_0x4876df%0x4?_0x2bb57d*0x40+_0x468c63:_0x468c63,_0x4876df++%0x4)?_0x19f0f6+=String['fromCharCode'](0xff&_0x2bb57d>>(-0x2*_0x4876df&0x6)):0x0){_0x468c63=_0x59134d['indexOf'](_0x468c63);}return _0x19f0f6;});}());_0x1bd3['TBFjVw']=function(_0x58e7d7){var _0x49b9f7=atob(_0x58e7d7);var _0x4d1654=[];for(var _0xc66f3d=0x0,_0x9d1a02=_0x49b9f7['length'];_0xc66f3d<_0x9d1a02;_0xc66f3d++){_0x4d1654+='%'+('00'+_0x49b9f7['charCodeAt'](_0xc66f3d)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x4d1654);};_0x1bd3['BuDNkl']={};_0x1bd3['gfjoJb']=!![];}var _0x388baf=_0x1bd3['BuDNkl'][_0x4a39a4];if(_0x388baf===undefined){_0x1bd3a6=_0x1bd3['TBFjVw'](_0x1bd3a6);_0x1bd3['BuDNkl'][_0x4a39a4]=_0x1bd3a6;}else{_0x1bd3a6=_0x388baf;}return _0x1bd3a6;};loadExcel(_0x1bd3('0x0'),'.Ulitsy_sootvetstvie');loadExcel(_0x1bd3('0x1'),'.ulitsy_goroda');console[_0x1bd3('0x4')](_0x1bd3('0x2'));console[_0x1bd3('0x4')](_0x1bd3('0x5'),_0x1bd3('0x3'));
});


function imageBlock() { //выводит необходимое изображение

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

function imageBlockMargin(id) { //изменяет стили для изображения
	if ($(id).height() >= 40 && $(id).height() <= 42)
		$(id).css('margin-top', '-37px');
	else if ($(id).height() >= 46 && $(id).height() <= 47)
		$(id).css('margin-top', '-43px');
	else if ($(id).height() >= 57 && $(id).height() <= 65)
		$(id).css('margin-top', '-54px');
}

function getWidthOfText(txt) { //определение длины текста в пикселях
	var c = document.createElement('canvas');
	var ctx = c.getContext('2d');
	ctx.font = $(txt).css('font-size') + " " + $(txt).css('font-family');
	var length = ctx.measureText($(txt).val()).width;
	return Math.round(length);
}

$('#fieldStreetName').focus(function () {//выделяет название при нажатии
	$(this).select();
});
$('#oldName').focus(function () {//выделяет название при нажатии
	$(this).select();
});
$('#fieldStreet').focus(function () {//выделяет название при нажатии
	$(this).select();
});
$('#fieldHouseNumber').focus(function () {//выделяет название при нажатии
	$(this).select();
});
$('#last-number').focus(function () {//выделяет название при нажатии
	$(this).select();
});
$('#next-number').focus(function () {//выделяет название при нажатии
	$(this).select();
});

function historicalStreet() { //улица распологается в исторической части города?

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

function loadExcel(url,text) { //загрузка Excel файла
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

/*
$("#buttonDownloadSign").click(function editBound() { //экспорт изображения



	var width = $(".fields").width()-100, height = $(".fields").height();//длина и ширина
	var fullHouseLength = $(".fields-left").width() + 56;
	var streetNumber = $(".fields-right").width() + 22;

	var doc = new jsPDF('l', 'pt', [width, height], true)

	streetName(doc);
	
	streetNameNumber(doc, width);
	
	doc.save($("#fieldStreetName").val() + ' ' + $("#fieldHouseNumber").val() + '.pdf')
	

});
*/

$("#buttonDownloadSignName").click(function editBound() { //экспорт изображения улицы

	var width = $(".fields").width()-100, height = $(".fields").height();//длина и ширина
	var fullHouseLength = $(".fields-left").width() + 56;
	
	var doc = new jsPDF('l', 'mm', [fullHouseLength, height], true)
	
	streetName(doc);
	
	doc.save($("#fieldStreet").val() + ' ' + $("#fieldStreetName").val() + '.pdf')
	
});

$("#buttonDownloadSignNumber").click(function editBound() { //экспорт изображения номера

	var width = $(".fields").width()-100, height = $(".fields").height();//длина и ширина
	var streetNumber = $(".fields-right").width() + 22;
	
	var doc = new jsPDF('l', 'mm', [streetNumber, height], true)
	
	streetNameNumber(doc, streetNumber);
	
	doc.save($("#fieldStreetName").val() + ' № ' + $("#fieldHouseNumber").val() + '.pdf')
	
});


function streetName(doc) {
	
	var width = $(".fields").width()-100, height = $(".fields").height();//длина и ширина
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
		doc.setFont('MozerSemiBold');
		doc.lstext($("#fieldStreet").val(), 37, 216, 1.75);
		
		doc.setFontSize(320.1);
		doc.setFont('MozerSemiBold');
		doc.lstext($("#fieldStreetName").val(), 37, 139.3, intervalStreetName);
	}
	else {
		
		doc.setFontSize(128.1);
		doc.setFont('MozerSemiBold');
		doc.lstext($("#fieldStreet").val(), 33, 214.5, 1.6);
		
		doc.setFontSize(92.1);
		doc.setFont('MozerThin');
		doc.lstext($("#oldName").val(), 33, 160, 1.3);
		
		doc.setFontSize(320);
		doc.setFont('MozerSemiBold');
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
		doc.line(33.4, 170.6, fullHouseLength - 191.6, 170.6); //линия

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
	
	doc.setFont('MozerSemiBold');
	
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