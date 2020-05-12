// wait for DOM to load before running JS
$(function () {

  //when "Clear" button is clicked

  $("#clear").click(function () {
    $("#filterInput").val("");
    $("#htmlinput").val("");
    $(".panel-group").empty();
    $(".modal-body").empty();
  })

  // When "Enter" key is pressed on filter.btn

  $("#filterInput").on("keydown", function (event) {
    if (event.keyCode == '13') {
      var strFilter = $("#filterInput").val();
      var strHtml = $("#htmlinput").val();

      var $dom = $("<html>").html(strHtml);
      var elements = $dom.find(strFilter);

      var editorArr = []

      if (strFilter.startsWith(".")) {
        strFilter = strFilter.substring(1);

        var arrayHtml = [];

        for (var i = 0; i < elements.length; i++) {
          var j = i + 1;
          var isIn = j == 1 ? " in" : '';
          $("#accordion").append(
            "<div class='panel panel-info'><div class='panel-heading' data-toggle='collapse' data-parent='#accordion' href='#collapse" + j + "'><h4 class='panel-title'>" + strFilter + "_" + j + "</h4></div><div id='collapse" + j + "' class='panel-collapse collapse in'></div></div>"
          )
          $("#collapse" + j).text(elements[i].outerHTML.toString());

          // for ace editor
          aceEdit(j);

          arrayHtml.push(elements[i].outerHTML)
        }
        console.log(arrayHtml);
        var htmlJson = { "html_class": strFilter, "html": arrayHtml };
        var stringified = JSON.stringify(htmlJson, null, 4);
        var o = JSON.parse(stringified);

        stringified = JSON.stringify(o, null, 4);

        $(".modal-body").text(stringified);

        //modal ace editor
        // var beautify = ace.require("ace/ext/beautify");
        var editorModal = ace.edit("modalBody");
        // beautify.beautify(editor.session);
        editorModal.setTheme("ace/theme/twilight");
        editorModal.session.setMode("ace/mode/json");

        function aceEdit(i) {
          ace.edit("collapse" + i).setTheme("ace/theme/twilight");
          ace.edit("collapse" + i).session.setMode("ace/mode/html");
          ace.edit("collapse" + i).setReadOnly(true);
        }
      }

    }
  })

});