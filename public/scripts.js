async function fetchContainerInfo() {
  try {
    const response = await fetch('/docker/ps');
    const data = await response.json();
    //const jsonStrings = document.getElementById('containerInfoResult').innerText = JSON.stringify(data, null, 2);
    const jsonData = JSON.parse(JSON.stringify(data))
    console.log(jsonData.length)
    document.getElementById('dataCount').innerText = jsonData.length
    const dataRowsContainer = document.getElementById('dataRows')
    jsonData.forEach(function(element){
	const newRow = document.createElement("tr")

	const propertyName = ["Id","Names","State","Status"]
	propertyName.forEach(function(property){
		const cell = document.createElement("td")
		cell.textContent = Array.isArray(element[property]) ? element[property].join(", ").replace(/\//g, '') : element[property]
		newRow.appendChild(cell)
	})

	dataRowsContainer.appendChild(newRow)
    })
    //const container = JSON.parse(JSON.stringify(data))[0];
    //document.getElementById("idcontainer").innerText = container.Id ;
    //document.getElementById("name").innerText = container.Names ;
    //document.getElementById("state").innerText = container.State ;
    //document.getElementById("status").innerText = container.Status ;
  } catch (error) {
    console.error('Error fetching container info:', error);
  }
}

async function fetchContainerLogs() {
  const containerName = document.getElementById('containerName').value;
  if (!containerName) {
    alert('Please enter a container name.');
    return;
  }

  try {
    const response = await fetch(`/docker/logs/${containerName}`);
    const data = await response.text();
    document.getElementById('containerLogsResult').innerText = data;
  } catch (error) {
    console.error('Error fetching container logs:', error);
  }
}
