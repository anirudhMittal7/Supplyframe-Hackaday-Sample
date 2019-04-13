function ShowOrHideLoadIcon(param) {
	document.getElementsByClassName("lds-dual-ring")[0].style.display = param;
}

function Populate(data) {
	console.log(data);
	let cards = document.getElementsByClassName("card-container");
	data.projects.forEach(project => {
		let date = new Date(project.updated*1000);
		let hours = date.getHours();
		let minutes = '0' + date.getMinutes();
		let seconds = '0' + date.getSeconds();
		let lastUpdatedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

		let article = document.createElement('article');
		article.className="card";
		// article.style.backgroundImage = `url(${project.image_url})`;

		article.innerHTML = `<header class="card__title">
            					<h3>${project.name}</h3>
        					</header>
        					<main class="card__description">
            					<p>${project.summary}</p>
            					<p>User ID: ${project.owner_id}</p>
            					<ul class="list">
            						<li>Followers: ${project.followers} </li>
            						<li>Skulls: ${project.skulls} </li>
            						<li>Comments: ${project.comments} </li>
            					</ul>
        					</main>
        					<a href="${project.url}" class="button" target="_blank">See Project</a>`;
        cards[0].appendChild(article);
	})
}


function GetProjects(pageNum=1) {

	ShowOrHideLoadIcon("block");
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == XMLHttpRequest.DONE) {
			if(xmlhttp.status === 200){
				ShowOrHideLoadIcon("none");
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