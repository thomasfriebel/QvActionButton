$(function() {

	var cssFiles = [];
	cssFiles.push('Extensions/QvActionButton/actionbutton.css');
	for (var i = 0; i < cssFiles.length; i++) {
		Qva.LoadCSS(Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only' + '&name=' + cssFiles[i]);
	}

	Qva.AddExtension('QvActionButton', function() {
		var _this = this
		_this.version = '1.0'
		_this._uniqueId = _this.Layout.ObjectId.replace("\\","_");
		_this._buttonLabel = getQVStringProp(0) //Button label
		_this._actionCall = "" + getQVStringProp(1) //Function call paramters, force to be string
		_this._scriptCode = getQVStringProp(2) //source code

		if (!window.QvActionButton || !window.QvActionButton.wasSet || !window.QvActionButton.wasSet[_this._uniqueId]) {
			window.QvActionButton = window.QvActionButton || []
			window.QvActionButton.wasSet = window.QvActionButton.wasSet || []
			window.QvActionButton.wasSet[_this._uniqueId] = true;
			console.log("Setting action button once ",_this._uniqueId)
			var newButton = $("<button class='actionbutton' id='actionbtn_"+_this._uniqueId+"' type='button'>"+_this._buttonLabel+"</button>")
			$(_this.Element).append(newButton)
			$(newButton).on("click", function() {
						_this._function.call(this,_this._actionCall.split(","))
					})
		}

		_this._function = function(args){ 
				var args = args || _this._function.arguments
				eval(_this._scriptCode)
			}
		$("button", _this.Element).text(_this._buttonLabel)
		
		function getQVStringProp(idx) {
            var p = '';
			try {
                if (_this.Layout['Text' + idx]) {
                    p = _this.Layout['Text' + idx].text
                }
			} catch (Exception) {
				alert("Exception")
			}
            return p;
        }		
	})
})