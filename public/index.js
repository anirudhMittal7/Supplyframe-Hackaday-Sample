function SetLoader() {
	loaderDiv = document.createElement('div');
	loaderDiv.innerHTML = ` <div class="d-flex justify-content-center">
  								<div class="spinner-border" role="status">
    								<span class="sr-only">Loading...</span>
  								</div>
							</div>`;
	document.getElementById('loader').appendChild(loaderDiv);
}

function ClearLoader() {
	let loader = document.getElementById('loader');
	if(loader.hasChildNodes()){
		loader.removeChild(loader.childNodes[1]);
	}
}
 

function Populate(data) {
	console.log(data);
	data.projects.forEach(project => {
		let columnDiv = document.createElement('div');
		columnDiv.className='col-2';
		let cardDiv = document.createElement('div');
		cardDiv.class = 'card';
		cardDiv.innerHTML = `
							<img src=${project.image_url} class="card-img-top" alt="...">
							<div class="card-body">
    						<h5 class="card-title">${project.name}</h5>
    						<p class="card-text">${project.summary}</p>
    						<a href=${project.url} class="btn btn-primary" target="_blank">See project</a>
  							</div>
  							`;
  		columnDiv.appendChild(cardDiv);
  		document.getElementById('deck').appendChild(columnDiv);
	});
}



function GetProjects(pageNum=1) {

	SetLoader();
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == XMLHttpRequest.DONE) {
			if(xmlhttp.status === 200){
				ClearLoader();
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