class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files;

    if (file && file[0]) {
        reader.onloadend = (e) => {
            var img_file = e.target.result;
            document.getElementById('img-preview').src = img_file;

            localStorage.setItem('ad_img', img_file);
        }
    }

    reader.readAsDataURL(file[0])
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    
    return (
      <div className="previewComponent">
        <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
        <div className="img-wrap-up">
          <img id="img-preview" src="" />
        </div>
      </div>
    )
  }
}

function Navbar() {
            return(
               <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span> 
            </button>
            <a className="navbar-brand" href="#">Classified App</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">

              <li>
              <a href="#" data-toggle="modal" data-target="#addPostModal" >
              <span className="glyphicon glyphicon-edit"></span> Post an Ad
              </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      

              );
    }

var data = [
  {title : "Forza", description: "rndom text rndom text rndom text rndom text", image: "img/img2.jpg", seller_no: '03452116062', name: 'Osama Bashir', email: 'osama@gmail.com', price: '10000'},
  {title : "PlayStation 4", description: "Lorem ipsum jipsum Lorem ipsum jipsum", image: "img/img1.jpg", seller_no: '03452116062', name: 'Osama', email: 'osama@gmail.com', price: '10000' },
  {title : "Xbox one", description: "Lorem ipsum jipsum Lorem ipsum jipsum", image: "img/img3.png", seller_no: '03452116062', name: 'Saad', email: 'osama@gmail.com', price: '10000' },
  {title : "MacBook", description: "Lorem ipsum jipsum Lorem ipsum jipsum", image: "img/img4.jpg", seller_no: '03452116062', name: 'Hamza', email: 'osama@gmail.com', price: '10000' },
];

var Post = React.createClass({
  render: function () {
    var post_id = 0;
    var ad_id = '';

    var postNodes = this.props.data.map(function(post) {
                    {post_id = post_id + 1}
                    {ad_id = '#'+post_id}
                    return (
                      <div className = "col-sm-6 col-md-4">
                        <div className = "thumbnail">
                          <img src={post.image} alt="product-image"/>
                        </div>
                        <div className = "caption">
                          <div className="border">
                            <h3>{post.title}</h3>
                            <p>{post.description}</p> 
                            <button className = "btn btn-primary" role = "button" data-toggle="modal" data-target={ad_id}>
                              View Details
                            </button>  
                          </div>
                        </div>

                        <div className="modal fade" id={post_id} role="dialog">
                            <div className="modal-dialog">   

                              <div className="modal-content">
                                <div className="modal-header"> 
                                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                                  <h4 className="modal-title">Ad Details</h4>
                                </div>

                                <div className="modal-body view-ads-body">
                                   <h1 className="">{post.title}</h1>
                                   <img src={post.image} alt={post.title} className="details-img" />
                                   <div className="view-ads-details">
                                     <p><span className="more-desc">Seller Name</span>:  {post.name}</p>
                                     <p><span className="more-desc">Seller Email</span>:  {post.email}</p>
                                     <p><span className="more-desc">Seller No</span>: {post.seller_no}</p>
                                     <p><span className="more-desc">Product Description</span>: {post.description}</p>
                                     <p><span className="more-desc">Product Price</span>: {post.price}</p>
                                   </div>
                                </div>

                                <div className="modal-footer">
                                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>                       
                          </div>
                        </div>

                      </div>

                    );

                });
    return (
      <div>
        {postNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <Post data={data} />,
  document.getElementById('all_ads')
);

var ValidatePost = React.createClass({
    closedModalPoint: function () {
        document.getElementById('img-preview').src = "";
        localStorage.removeItem('ad_img', '');
    },
    CheckingPost: function(){
      var productArray = this.props.data;

      var post_form = document.getElementById('post-form');
      var  elm = document.getElementsByClassName("field-validate");

      var title = elm[0].value;
      var desc = elm[1].value;
      var name = elm[2].value;
      var email = elm[3].value;
      var number = elm[4].value;
      var price = elm[5].value;

        if (localStorage.getItem('ad_img')) {
            var image = localStorage.getItem('ad_img');
        }else {
            var image = 'img/sample.png';
        }

      var errorPlace = document.getElementById("error-place");
      var dismiss = document.getElementById("post_id");

      var x = 0;
      var ads = {};

      while (x < elm.length) {  
        if (elm[x].value.length < 1) {
          dismiss.removeAttribute("data-dismiss");
          errorPlace.innerHTML = "<div class='alert alert-danger'>All fields are required</div>";
          break;
        }
        errorPlace.innerHTML = "";
        x++;

        if (x > 5) {
          var ads = {
            title: title,
            description: desc,
            image: image,
            name: name,
            email: email,
            seller_no: number,
            price: price,
          };
          dismiss.setAttribute("data-dismiss", "modal");
          productArray.push(ads);
          document.getElementById('img-preview').src = "";
          localStorage.removeItem('ad_img', '');
          post_form.reset();
        }
      }

      ReactDOM.render(
        <Post data={productArray} />,
        document.getElementById('all_ads')
      );

      // var adsPlace = document.getElementById('all_ads')
      // adsPlace.innerHTML = ads.title;

    },
    render: function(){
      return(
          <div>
            <button type="button" className="btn btn-default" id="cancel-ads" onClick={this.closedModalPoint} data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" id="post_id" onClick={this.CheckingPost}><span className="glyphicon glyphicon-pencil"></span>  Post Add </button>
          </div>
      );
    }

});


var Search = React.createClass({
	searchAd: function() {
			var user_query = document.getElementById("search-product").value;
			var default_ads = this.props.data;
			var search_results = [];

			if(user_query.length > 0) {
				for(var i=0; i < default_ads.length; i++) {
				  if(default_ads[i].title.toLowerCase().indexOf(user_query.toLowerCase()) > -1) {
				  		search_results.push(default_ads[i]);
				  }

				}
			}
			

			if(search_results.length > 0) {
						ReactDOM.render(
						  <Post data={search_results} />,
						  document.getElementById('all_ads')
						);
			} else {

			ReactDOM.render(
			  <Post data={default_ads} />,
			  document.getElementById('all_ads')
			);
			   }
			
	  },

	render: function() {
		 return(
		 	<div className="search-bound">
		 	<i className="glyphicon glyphicon-search"></i>
		 		<input type="text" autocomplete="off" placeholder="Search Products" autocomplete="off" className="form-control" id="search-product" onKeyUp={this.searchAd}/>
		 	</div>
		 	);
	}
});

function PostModal() {
    return (
        <form id="post-form">
          <div className="modal fade" id="addPostModal" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content" >
                <div className="modal-header" >
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h3 className="modal-title" id="exampleModalLabel">Post Your Add</h3>

                </div>
                <div className="modal-body">
                   <span id="errorPlace" >

                  </span>               
                    <div className="form-group">
                      <label htmlFor="product-title" className="control-label">Title:</label>
                    <input type="text" placeholder="My Book" className="form-control field-validate" id="product-title" name="pro_title"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-desc" className="control-label">Description:</label>
                    <textarea className="form-control field-validate" placeholder="Description here . . ." id="product-desc" name="pro_desc"></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="seller-name" className="control-label">
                      Seller Name: 
                      <i data-toggle="tooltip" title="This can be your or seller name." data-placement="right" className="glyphicon glyphicon-question-sign"></i>
                    </label>
                    <input type="text" placeholder="Osama" className="form-control field-validate" id="seller-name" name="sel_name"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="seller-email" className="control-label">
                      Seller Email:
                      <i data-toggle="tooltip" title="This can be your or seller email through which the buyer can contact you" data-placement="right" className="glyphicon glyphicon-question-sign"></i>
                    </label>
                    <input type="email" placeholder="someone@somedomain.com" className="form-control field-validate" id="seller-email" name="sel_email"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="seller-number" className="control-label">
                      Seller Contact No:
                      <i data-toggle="tooltip" title="This can be your or seller number through which the buyer can contact you" data-placement="right" className="glyphicon glyphicon-question-sign"></i>
                    </label>
                    <input type="number" placeholder="+92" className="form-control field-validate" id="seller-number" name="sel_no"/>
                  </div>
                    <div className="form-group">
                      <label htmlFor="price" className="control-label">
                        Price:
                        <i className="glyphicon glyphicon-question-sign"></i>
                      </label>
                      <input size="2" type="number" placeholder="66.00" className="form-control field-validate" id="price" name="price"/>
                    </div>
                  <div className="form-group">
                    <label htmlFor="seller-email" className="control-label">
                      Product Image:
                      <i data-toggle="tooltip" title="Upload picture of your product" data-placement="right" className="glyphicon glyphicon-question-sign"></i>
                    </label>
                    <div id="uploader">
                      <ImageUpload/>                    
                    </div>
                  </div> 
                <div id="error-place"></div>
              </div>
              <div className="modal-footer">
                <ValidatePost data={data} />
              </div>
            </div>
          </div>
        </div> 
      </form>

  );

}


function Slider() {
  return (
<div className="">
  <br />
  <div id="myCarousel" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
      <li data-target="#myCarousel" data-slide-to="3"></li>
    </ol>
    <div className="carousel-inner" role="listbox">
      <div className="item active">
        <img src="img/img1.jpg" alt="Playstation 4" />
        <div className="carousel-caption">
          <h3>PlayStation 4</h3>
          <p>"Buy PS4 console and get prepared for the most immersive gaming experience ever."</p>
        </div>
      </div>
    <div className="item">
        <img src="img/img2.jpg" alt="" />
        <div className="carousel-caption">
          <h3>Forza</h3>
          <p>"Forza Motorsport is a racing video game for the Xbox and Microsoft Windows."</p>
        </div>
      </div>    
      <div className="item">
        <img src="img/img3.png" alt="Xbox One" />
        <div className="carousel-caption">
          <h3>Xbox One</h3>
          <p>"Welcome to a new generation of games and entertainment. Welcome to the all-in-one, Xbox One."</p>
        </div>
      </div>
      <div className="item">
        <img src="img/img4.jpg" alt="Macbook" />
        <div className="carousel-caption">
          <h3>MacBook</h3>
          <p>"The incredibly thin and light MacBook features sixth-generation processors, improved graphics performance."</p>
        </div>
      </div>
    </div>
    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>
    );
}


function Seacrhbar() {
    return(
       <div className="container">
<br />
<div className="row">
           <div className="col-md-12 search">
        <div className="form-group">
            <div className="icon-addon addon-lg">
                 
                 <Search data={data} />

            </div>
          </div>
             </div>
            </div>
          </div>
      );
}

ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<PostModal />, document.getElementById('postmodal'));
ReactDOM.render(<Slider />, document.getElementById('caruosel'));
ReactDOM.render(<Seacrhbar />, document.getElementById('seacrh_bar'));
