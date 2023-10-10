function addList(){
    var select = document.getElementById("Task");
    var option = document.createElement('option');
    var count = document.getElementById("Task").length;
    let val = document.getElementById("Addlist").value;
    option.text = option.id = val;
    option.value = val;
    select.add(option, 0);
    }
    function submit() {
      document.getElementById("Names").value = document.getElementById("Name").textContent.split(":")[1]
      document.getElementById("Pictures").value = document.getElementById("Picture").src
    }
    function loads(){
      //remove current
      var selectElement = document.getElementById('Task');
      var s, L = selectElement.options.length - 1;
      for(s = L; s >= 0; s--) {
        selectElement.remove(s);
      }
      var selectElement = document.getElementById('Button1');
      var s, L = selectElement.options.length - 1;
      for(s = L; s >= 0; s--) {
        selectElement.remove(s);
      }
      var selectElement = document.getElementById('Button2');
      var s, L = selectElement.options.length - 1;
      for(s = L; s >= 0; s--) {
        selectElement.remove(s);
      }
      //cookie 
      var cookie = document.cookie
      var find = cookie.split(";")
      //element
      var task = document.getElementById("Task");
      var name = document.getElementById("Name");
      var button1 = document.getElementById("Button1");
      var button2 = document.getElementById("Button2");
      var check1 = document.getElementById("Button1Box")
      //locate cookie
      var section1 = "list"
      var section2 = "name"
      var section3 = "url"
      var section4 = "button1"
      var section5 = "button2"
      var section6 = "check"
      var section7 = "dropdown"
      //cookie manage
      var v;
      for (v=0;v<find.length;v++) {
        if (find[v].split("=")[0].includes(section1)) {
          //State
          var spilit = cookie.split(";")[v].split("=")[1].split(",")
          var i;
          for (i=0;i<spilit.length;i++) {
            var option = document.createElement('option');
            var count = document.getElementById("Task").length;
            option.text = option.id = spilit[i];
            option.value = spilit[i];
            task.add(option, 0);
          }
        }
        if (find[v].split("=")[0].includes(section2)) {
          //Name
          var spilit = cookie.split(";")[v].split("=")[1]
          name.textContent = "Name:" + spilit
        }
        if (find[v].split("=")[0].includes(section3)) {
          //Name
          var spilit = cookie.split(";")[v].split("=")[1]
          document.getElementById("Picture").src = spilit
        }
        if (find[v].split("=")[0].includes(section4)) {
          //Button1
          var spilit = cookie.split(";")[v].split("=")[1].split("_")
          var i;
          for (i=0;i<spilit.length;i++) {
            var option = document.createElement('option');
            var count = document.getElementById("Button1").length;
            option.text = option.id = spilit[i].split(",")[0];
            option.value = spilit[i]
            button1.add(option, 0);
          }
        }
        if (find[v].split("=")[0].includes(section5)) {
          //Button2
          var spilit = cookie.split(";")[v].split("=")[1].split("_")
          var i;
          for (i=0;i<spilit.length;i++) {
            var option = document.createElement('option');
            var count = document.getElementById("Button2").length;
            option.text = option.id = spilit[i].split(",")[0];
            option.value = spilit[i]
            button2.add(option, 0);
          }
        }
        if (find[v].split("=")[0].includes(section6)) {
          //CheckBox
          var spilit = cookie.split(";")[v].split("=")[1]
          if (spilit == "true") {
            check1.checked = true
          } else {
            check1.checked = false
          }
        }
        if (find[v].split("=")[0].includes(section7)) {
          //Select value
          var spilit = cookie.split(";")[v].split("=")[1].split("_")
          task.value = spilit[0]
          button1.value = spilit[1]
          button2.value = spilit[2]
        }
      }
    }
    function save() {
      //element
      var x = document.getElementById("Task");//select
      var nm = document.getElementById("Name");
      var pc = document.getElementById("Picture");
      var button1 = document.getElementById("Button1");//select
      var button2 = document.getElementById("Button2");//select
      var check1 = document.getElementById("Button1Box").checked
      //Task
      var txt = x.options[0].id;
      var i;
      for (i = 1; i < x.length; i++) {
        txt = txt.concat(",",x.options[i].id);
      }
      //button
        //button1
          var bt1txt = button1.options[0].value;
          var bt1;
          for (bt1 = 1; bt1 < button1.length; bt1++) {
            bt1txt = bt1txt.concat("_",button1.options[bt1].value);
          }
        //button2
        var bt2txt = button2.options[0].value;
          var bt2;
          for (bt2 = 1; bt2 < button2.length; bt2++) {
            bt2txt = bt2txt.concat("_",button2.options[bt2].value);
          }
      //cookie
      document.cookie = "list="+txt
      document.cookie = "name="+nm.textContent.split(":")[1]
      document.cookie = "url="+document.getElementById("Picture").src
      document.cookie = "button1=" + bt1txt
      document.cookie = "button2=" + bt2txt
      document.cookie = "check=" + check1
      document.cookie = "dropdown="+ x.value + "_" + button1.value + "_" + button2.value
    }
    function changename() {
      var nm = document.getElementById("Name")
      var input = document.getElementById("Names")
      nm.textContent = "Name:" +  input.value
    }
    function changeurl() {
      var input = document.getElementById("Pictures")
      document.getElementById("Picture").src = input.value
    }
    function remove() {
      var selectElement = document.getElementById('Task');
      selectElement.remove(document.getElementById('Task').value);
    }
    function Addbuttons(){
      var select = document.getElementById("Button1");
      var select2 = document.getElementById("Button2");
      var option = document.createElement('option');
      var option2 = document.createElement('option');
      let name = document.getElementById("AddButtonname").value;
      let url = document.getElementById("AddButtonurl").value;
      option.text = option.id = option2.text = option2.id = name;
      option.value = name + "," + url
      option2.value = option.value
      select.add(option, 0);
      select2.add(option2,0)
    }
    function Onsubmit(){
      const ask = confirm("Are you sure?")
      if (ask) {
        submit()
        save()
      }
    }