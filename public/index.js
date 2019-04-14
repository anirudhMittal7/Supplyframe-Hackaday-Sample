function ShowOrHide(element,param) {
	element.style.display = param;
}

function RemoveToolTip(tooltipId) {
	let element = document.getElementById(`user${tooltipId}`);
	element.parentNode.removeChild(element);

}

function CreateToolTip(userData, tooltipId) {
	let userDiv = document.createElement("div");
	userDiv.style.position='absolute';
	userDiv.style.zIndex=2;
	userDiv.id = `user${tooltipId}`;
	userDiv.style.backgroundColor='lightgrey';
	userDiv.innerHTML = `
							<span>Username: ${userData.username} </span><br/>
							<span>Screen Name: ${userData.screen_name} </span></br>
							<span>Location: ${userData.location} </span></br>
							<span>About: ${userData.about_me} </span></br>
						`;
	document.getElementById(`tooltip${tooltipId}`).appendChild(userDiv);
}

function FetchUserDetails(userId, tooltipId) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == XMLHttpRequest.DONE) {
			if(xmlhttp.status === 200){
				const userData = JSON.parse(xmlhttp.responseText);
				console.log(userData);
				CreateToolTip(userData,tooltipId);
			} else {
				alert(`error ${xmlhttp.status}`);
			}
		}
	}
	xmlhttp.open('GET',`user?userId=${userId}`,true);
	xmlhttp.send();
}


function Populate(data) {
	console.log(data);
	let cards = document.getElementsByClassName("card-container");
	data.projects.forEach((project,idx) => {
		const date = new Date(project.updated*1000);
		const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 		const year = date.getFullYear();
 		const month = months_arr[date.getMonth()];
 		const day = date.getDate();
		let lastUpdatedTime = `${day} ${month} ${year}`;
		let article = document.createElement('article');
		article.className="card";
		article.innerHTML = `<header class="card__title">
            					<h3>${project.name}</h3>
        					</header>
        					<main class="card__description">
            					<p>${project.summary}</p>
            					<div id="tooltip${idx}" onmouseover="FetchUserDetails(${project.owner_id}, ${idx})" onmouseout="RemoveToolTip(${idx})">
            						User ID: ${project.owner_id}	
            					</div>
            					<ul class="list">
            						<li>Followers: ${project.followers} </li>
            						<li>Skulls: ${project.skulls} </li>
            						<li>Comments: ${project.comments} </li>
            					</ul>
        					</main>
        					<a href="${project.url}" class="button" target="_blank">See Project</a>
        					<footer>
  								<p><small>Last updated: ${lastUpdatedTime}</small></p>
  							</footer>`;
        	cards[0].appendChild(article);
		});
}


function GetProjects(pageNum=1) {
	ShowOrHide(document.getElementsByClassName("lds-dual-ring")[0], "block");
	ShowOrHide(document.getElementById("topbutton"), "none");
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == XMLHttpRequest.DONE) {
			if(xmlhttp.status === 200){
				ShowOrHide(document.getElementsByClassName("lds-dual-ring")[0], "none");
				ShowOrHide(document.getElementById("topbutton"), "block");
				const data = JSON.parse(xmlhttp.responseText);
				Populate(data);
			} else {
				alert(`error ${xmlhttp.status}`);
			}
		}
	}
	xmlhttp.open('GET',`projects?page=${pageNum}`,true);
	xmlhttp.send();
}

document.getElementById("topbutton").addEventListener("click", function(){
	window.scrollTo({
  		top: 0,
  		left: 0,
  		behavior: 'smooth'
	});

});