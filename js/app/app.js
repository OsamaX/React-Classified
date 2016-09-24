function createAd() {
	var pTitle = document.getElementById("product-title").value;
	var pDesc = document.getElementById("product-desc").value;
	var pName = document.getElementById("product-title").value;
	var pEmail = document.getElementById("seller-name").value;
	var pNumber = document.getElementById("seller-email").value;
	var pPrice= document.getElementById("seller-number").value;

	var parentDiv = document.getElementById("user-ads");
	var column = document.createElement("div");
	column.setAttribute("class", "col-sm-6 col-md-5");
	parentDiv.appendChild(column);

	var thumbnail = document.createElement("div");
	thumbnail.setAttribute("class", "thumbnail");
	parentDiv.appendChild(thumbnail);
	column.appendChild(thumbnail)

	var img = document.createElement("img");
	
	var img_data = localStorage.getItem('imgData');

	img.src = (img_data.length > 0) ? img_data : 'img/sample.png' ;

	img_data = localStorage.setItem('imgData', '');

	// img.style.width = "50%";
	thumbnail.appendChild(img);


	var caption = document.createElement("div");
	caption.setAttribute("class", "caption");
	parentDiv.appendChild(caption);
	column.appendChild(caption);

	var h3 = document.createElement("h3");
	var h3Text = document.createTextNode(pTitle);
	h3.appendChild(h3Text);
	caption.appendChild(h3);

	var p = document.createElement("p");
	var pText = document.createTextNode(pDesc);
	p.appendChild(pText);
	caption.appendChild(p);

	var buttonView = document.createElement("button");
	buttonView.setAttribute("class", "btn btn-primary");
	var buttonTxt = document.createTextNode("View More");
	buttonView.appendChild(buttonTxt);
	caption.appendChild(buttonView);


}

function validate () {
	var post_form = document.getElementById('post-form');
	var  elm = document.getElementsByClassName("field-validate");
	var errorPlace = document.getElementById("error-place");

	var x = 0;

	while (x < elm.length) {	
		if (elm[x].value.length < 1) {
			errorPlace.innerHTML = "<div class='alert alert-danger'>All fields are required</div>";
			break;
		}
		errorPlace.innerHTML = "";
		x++;

		if (x > 5) {
			createAd();
			var dismiss = document.getElementById("post-ads");
			dismiss.setAttribute("data-dismiss", "modal");
			post_form.reset();
		}
	}
}