var percentageValues = {};
var chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
chartScript.onload = function () {
  // Chart.js script loaded, now you can create the chart
};
document.head.appendChild(chartScript);


document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  var textDisplay = document.getElementById("textDisplay");
  textDisplay.style.backgroundColor="White";
  textDisplay.style.borderRadius="20px";
  // var imageDisplay = document.getElementById("imageDisplay");
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
    try 
    {
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
        // Create an array to store the data for the bar chart

        // Update text display with the API response
        textDisplay.innerHTML = "";

        // Create a separate <p> element for each data item
        var benignNode = document.createElement("p");
        var insituNode = document.createElement("p");
        var normalNode = document.createElement("p");
        var invasiveNode = document.createElement("p");

        // Set the text content for each <p> element
        benignNode.textContent = "Benign Percentage: " + data.Benign + " %";
        insituNode.textContent = "InSitu Percentage: " + data.InSitu + " %";
        normalNode.textContent = "Normal Percentage: " + data.Normal + " %";
        invasiveNode.textContent = "Invasive Percentage: " + data.Invasive + " %";

        // Add CSS classes to the result nodes
        benignNode.classList.add("result-item");
        insituNode.classList.add("result-item");
        normalNode.classList.add("result-item");
        invasiveNode.classList.add("result-item");

        var Result=document.getElementById("result");
        document.getElementById("result").style.display="block";
        if(data.Invasive>45) {
        Result.innerHTML="Invasive is prominent";
        Result.style.backgroundColor="Red";
        }
        else if(data.InSitu>45) {
        Result.innerHTML="Insitu is prominent";
        Result.style.backgroundColor="Orange";
        }
        else if(data.Benign>45) {
        Result.innerHTML="Benign is prominent";
        Result.style.backgroundColor="blue";
        // Result.style.color="Black";
        }
        else if(data.Normal>45) {
        Result.innerHTML="Invasive is prominent";
        Result.style.backgroundColor="Green";
        }
        // Append the <p> elements to the text display
        textDisplay.appendChild(benignNode);
        textDisplay.appendChild(insituNode);
        textDisplay.appendChild(normalNode);
        textDisplay.appendChild(invasiveNode);

        // Example: Update image display with the API response
        // var imgNode = document.createElement("img");
        // imgNode.src = data.imageUrl;
        // imgNode.style.maxWidth = "100%";
        // imgNode.style.height = "auto";
        // imageDisplay.innerHTML = "";
        // imageDisplay.appendChild(imgNode);
        var chartData = [
          { label: "Benign", value: data.Benign },
          { label: "Insitu", value: data.InSitu },
          { label: "Normal", value: data.Normal },
          { label: "Invasive", value: data.Invasive }
        ];
        // console.log(chartData);
        // var chartCanvas = document.createElement("canvas");
        // chartCanvas.id = "myChart";

      
        // var barColors = ["red", "green","blue","orange","brown"];
   


        // Get the chart context
       // var chartContext = chartCanvas.getContext("2d");

        // Prepare chart data
        var chartLabels = chartData.map(function (item) {
          // console.log(item.label)
        return item.label;
        });
        var chartValues = chartData.map(function (item) {
          //  console.log(item.value);
          return item.value;
        });
        var barColors = ["blue","orange","green","red"];
        document.getElementById("myChart").style.display="block";
        new Chart("myChart", {
          type: "bar",
          data: {
            labels: chartLabels,
            datasets: [{
              backgroundColor: barColors,
              data: chartValues
            }]
          },
          options: {
            // legend: {display: true},
            title: {
              display: true,
              text: ""
            }
          }
        });
      //   // Create the bar chart
      //   new Chart(chartContext,
      //     {
      //     type: "bar",
      //     data: {
      //       labels: "paras",
      //       datasets: [
      //         {
      //           label: "Cancer Percentage",
      //           data: 10,                 
      //           backgroundColor: [
      //             "rgba(255, 99, 132, 0.5)",
      //             "rgba(54, 162, 235, 0.5)",
      //             "rgba(75, 192, 192, 0.5)",
      //             "rgba(255, 205, 86, 0.5)"
      //           ],
      //           borderColor: [
      //             "rgba(255, 99, 132, 1)",
      //             "rgba(54, 162, 235, 1)",
      //             "rgba(75, 192, 192, 1)",
      //             "rgba(255, 205, 86, 1)"
      //           ],
      //           borderWidth: 1
      //         }
      //       ]
      //     },
      //     options: {
      //       scales: {
      //         y: {
      //           beginAtZero: true,
      //           max: 100
      //         }
      //       }
      //     }
      //   });
      // }
        // // Append the canvas element to the text display
        //   imageDisplay.appendChild(chartCanvas);
        //   console.log(textDisplay);

      }

    } 
    catch (error) {
      console.error('Error:', error);
      textDisplay.textContent = 'Unable to Detect';
      textDisplay.style.color="Red";
    } finally {
      // Hide loader and enable submit button
      submitButton.value = 'Submit to View Results';
      submitButton.disabled = false;
    }
  }
  // loader.style.display="none";
  postData();

});