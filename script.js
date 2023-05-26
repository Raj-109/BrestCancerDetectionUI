var percentageValues = {};

document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  
  var textDisplay = document.getElementById("textDisplay");
  var imageDisplay = document.getElementById("imageDisplay");
  var textNode = document.createElement("p");
  //var loader = document.getElementById("loader");
  var submitButton = document.getElementById("submitButton");
  submitButton.disabled = true;
 
  const apiUrl = 'http://localhost:5000/predict';

  const fileInput = document.getElementById("my-file");
  const file = fileInput.files[0]; // Get the selected file from the input field

  const formData = new FormData();
  formData.append("image", file); // Append the file to the FormData object

  const requestOptions = {
    method: 'POST', // Use the appropriate HTTP method for your API
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: formData // Pass the FormData object as the body of the request
  };

 

  async function postData() {

    try {
      if (fileInput.value) {
        submitButton.disabled = false;
      }
       
      
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log(data);
  
      // Example: Update text display with the API response
      var textDisplay = document.getElementById("textDisplay");
      
  
      // Create a separate <p> element for each data item
      var benignNode = document.createElement("p");
      var insituNode = document.createElement("p");
      var normalNode = document.createElement("p");
      var invasiveNode = document.createElement("p");
  
      // Set the text content for each <p> element
      benignNode.textContent = "Cancer Percentage of Benign in the Image: " + data.Benign;
      insituNode.textContent = "Cancer Percentage of Insitu in the Image: " + data.InSitu;
      normalNode.textContent = "Cancer Percentage of Normal in the Image: " + data.Normal;
      invasiveNode.textContent = "Cancer Percentage of Invasive in the Image: " + data.Invasive;
  
      // Append the <p> elements to the text display
      textDisplay.appendChild(benignNode);
      textDisplay.appendChild(insituNode);
      textDisplay.appendChild(normalNode);
      textDisplay.appendChild(invasiveNode);
  
      // Example: Update image display with the API response
      var imageDisplay = document.getElementById("imageDisplay");
      var imgNode = document.createElement("img");
      imgNode.src = data.imageUrl;
      imgNode.style.maxWidth = "100%";
      imgNode.style.height = "auto";
      imageDisplay.appendChild(imgNode);
     
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // loader.style.display = "none";
  postData();
  
});


