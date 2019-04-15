function ShowOrHide(element,param) {
	element.style.display = param;
}

function RemoveToolTip(tooltipId) {
	let element = document.getElementById(`user${tooltipId}`);
	if(element && element.parentNode)
		element.parentNode.removeChild(element);

}

function CreateToolTip(userData, tooltipId) {
	let userDiv = document.createElement("div");
	userDiv.style.position='absolute';
	userDiv.style.width = '30rem';
	userDiv.style.borderRadius = "1em";
	userDiv.style.border = "solid thin gray";
	userDiv.style.backgroundColor='lightgrey';
	userDiv.id = `user${tooltipId}`;
	
	userDiv.innerHTML = `
							<span><b>Username:</b> ${userData.username} </span><br/>
							<span><b>Screen Name:</b> ${userData.screen_name} </span></br>
							<span><b>Location: </b> ${userData.location} </span></br>
							<span><b>About: </b> ${userData.about_me} </span></br>
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
            					<div id="tooltip${idx}" onmouseover="FetchUserDetails(${project.owner_id}, ${idx})" onmouseout="RemoveToolTip(${idx})" onblur="RemoveToolTip(${idx})">
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


function GetProjects(pageNum) {
	ShowOrHide(document.getElementsByClassName("lds-dual-ring")[0], "block");
	ShowOrHide(document.getElementById("topbutton"), "none");
	ShowOrHide(document.getElementById("prevbutton"), "none");
	ShowOrHide(document.getElementById("nextbutton"), "none");
	if(!pageNum)
		if(!parseInt(window.location.href.split('=')[1]))
			pageNum=1;
		else
			pageNum = parseInt(window.location.href.split('=')[1]);
	window.history.pushState(null,'', `?page=${pageNum}`);

	document.getElementById('pageNumDisplay').innerHTML = `Fetching Page ${pageNum}...`;
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == XMLHttpRequest.DONE) {
			if(xmlhttp.status === 200){
				ShowOrHide(document.getElementsByClassName("lds-dual-ring")[0], "none");
				ShowOrHide(document.getElementById("topbutton"), "block");
				ShowOrHide(document.getElementById("prevbutton"), "block");
				ShowOrHide(document.getElementById("nextbutton"), "block");
				document.getElementById('pageNumDisplay').innerHTML = `Page ${pageNum}`;
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

function GetPreviousPageProjects() {
	let pageNum = parseInt(window.location.href.split('=')[1]);
	if(pageNum>=2){
		let cards = document.getElementsByClassName("card-container");
		cards[0].innerHTML='';
		GetProjects(pageNum-1);
	}
}

function GetNextPageProjects() {
	let pageNum = parseInt(window.location.href.split('=')[1]);
	let cards = document.getElementsByClassName("card-container");
	cards[0].innerHTML='';
	GetProjects(pageNum+1);
}

document.getElementById("topbutton").addEventListener("click", function(){
	window.scrollTo({
  		top: 0,
  		left: 0,
  		behavior: 'smooth'
	});
});