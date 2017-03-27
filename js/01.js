$(document).ready(function($) {
	var AudioContext = window.AudioContext || window.webkitAudioContext || false;

	if (!AudioContext) {
		alert('Sorry, but the Web Audio API is not supported by your browser.');
	} else {
		var audioCtx = new window.AudioContext();
		var data, frequencyRatioTempered = 1.059463;

		var xml = new XMLHttpRequest();
		xml.responseType = 'arraybuffer';
		xml.open('GET', 'media/piano.mp3', true);
		xml.onload = function() {
			// 音源ファイルをバイナリデータからデコード
			audioCtx.decodeAudioData(
				xml.response,
				function(_data) {
					data = _data;
				},
				function(e) {
					alert(e.err);
				}
			);
		};
		xml.send();

		//var arrKeyboard = jQuery.makeArray($('keyboard'));
		var keyboards = jQuery.makeArray(document.getElementsByClassName('keyboard'));

		keyboards.reverse().map(function(keyboard, index) {
			var i, frequencyRatio;
			frequencyRatio = 1;
			for (i = 0; i < index; i++) {
				frequencyRatio /= frequencyRatioTempered;
			}
			$(keyboard).on('click', function() {
				var bufferSource;
				bufferSource = audioCtx.createBufferSource();
				bufferSource.buffer = data;
				bufferSource.playbackRate.value = frequencyRatio;
				bufferSource.connect(audioCtx.destination);
				bufferSource.start(0);
			});

		});

	}
});