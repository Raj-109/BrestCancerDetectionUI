var percentageValues = {};

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  var textDisplay = document.getElementById("textDisplay");
  var imageDisplay = document.getElementById("imageDisplay");
  var submitButton = document.getElementById("submitButton");
  submitButton.disabled = true;
const apiUrl = 'http://localhost:5000/predict';
 const fileInput = document.getElementById("my-file");
  const file = fileInput.files[0]; 
const formData = new FormData();
  formData.append("image", file); 

  const requestOptions = {
    method: 'POST',
    body: formData
  };

  async function postData() {
    try {
      if (fileInput.value) {
        submitButton.disabled = false;
      }

      // Show loader
      submitButton.value = 'Loading...';

      // Set minimum loading time of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Update text display with the API response
        textDisplay.innerHTML = "";

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
        var imgNode = document.createElement("img");
        imgNode.src = data.imageUrl;
        imgNode.style.maxWidth = "100%";
        imgNode.style.height = "auto";
        imageDisplay.innerHTML = "";
        imageDisplay.appendChild(imgNode);
      } else {
        console.error('Error:', response.status);
        textDisplay.textContent = 'Error: Failed to fetch data from the API';
      }

    } catch (error) {
      console.error('Error:', error);
      textDisplay.textContent = 'Error: Failed to fetch data from the API';
    } finally {
      // Hide loader and enable submit button
      submitButton.value = 'Submit to View Results';
      submitButton.disabled = false;
    }
  }
  // loader.style.display="none";
  postData();

});
