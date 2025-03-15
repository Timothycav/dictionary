    const audioDiv = document.getElementById("audio");
    const audioConDiv = document.getElementById("audioCon");
    const phoneticDiv = document.getElementById("phoneticDiv");
    const syn = document.getElementById("syn");

    async function fetchWordDetails() {
      const word = document.getElementById("wordInput").value.trim();
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = ""; // Clear previous results

      if (!word) {
        resultDiv.innerHTML = "<p class='error'>Please enter a word.</p>";
        return;
      }

      resultDiv.innerHTML = "<p>Loading...</p>";

      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        // If the API returns an error object
        if (data.title) {
          resultDiv.innerHTML = "<p class='error'>Word not found. Try another word.</p>";
          return;
        }

        // Prepare HTML for each part of speech
        let nounHTML = "";
        let synHTML = ""; // To hold synonyms
        let verbHTML = "";
       
        const wordDisplay = data[0].word;
        const phoneticText = data[0].phonetics[0].text
        const wordDisplayDiv = document.getElementById("wordDisplay");
        wordDisplayDiv.innerHTML = `<h1>${wordDisplay}</h1> <h2>${phoneticText || ''}</h2>`; // Display the word and phonetic text in the heading
        

        data[0].meanings.forEach(meaning => {
          // Check for noun definitions
          if (meaning.partOfSpeech === "noun") {
            let definitionsHTML = "";
            meaning.definitions.forEach(def => {
              definitionsHTML += `<li>${def.definition}</li>`;
            });
            nounHTML += `<div class="section"><h3>Noun</h3><ul>${definitionsHTML}</ul></div>`;
          
          }
          // Check for verb definitions
          else if (meaning.partOfSpeech === "verb") {
            let definitionsHTML = "";
            meaning.definitions.forEach(def => {
              definitionsHTML += `<li>${def.definition}</li>`;
            });
            verbHTML += `<div class="section"><h3>Verb</h3><ul>${definitionsHTML}</ul></div>`;
          }
            // Check for audio
            
           
              let aud = `<audio src="${data[0].phonetics[0].audio}" controls class="azcon"></audio>`;
              audioDiv.className = "audio";
              audioDiv.innerHTML = aud;
        





      

            // Check for synonyms
            if (meaning.synonyms == null || meaning.synonyms == '') {
      
              syn.classList.add("hidden");
       
            } else {
              syn.classList.remove("hidden"); // Show the synonyms section if there are any
              synHTML += `<div class="section"><h3>Synonyms</h3><ul>`;
              meaning.synonyms.forEach(synonym => {
                synHTML += `<li>${synonym}</li>`; // Fix: move closing </ul></div> outside the loop
              });
             
              synHTML += `</ul></div>`; // Close the synonyms section here
            }
        });

        // Display the results or a no-results message
        if (!nounHTML && !verbHTML && !synHTML) {
          resultDiv.innerHTML = "<p>No noun, verb, or synonym definitions found for this word.</p>";
        } else {
          resultDiv.innerHTML = nounHTML + verbHTML + synHTML; // Include synonyms in the results
        }
      } catch (error) {
        resultDiv.innerHTML = "<p class='error'>Error fetching data. Please try again.</p>";
      }
      
    }
    const reset = () => {
      document.getElementById("wordInput").value = "";
      document.getElementById("result").innerHTML = "";
      document.getElementById("wordDisplay").innerHTML = ""; // Clear the word display when reset is called
      document.getElementById("audio").innerHTML = ""; // Clear the audio when reset is called
      audioConDiv.classList.add("hidden");
      phoneticDiv.innerHTML = ""; // Clear the phonetic text when reset is called
      wordDisplayDiv.innerHTML = ""; // Clear the word display when reset is called
      syn.classList.add("hidden"); // Hide the synonyms section when reset is called
    };

    // Additional function to handle keypress event for input field
    document.getElementById("wordInput").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        fetchWordDetails();
      }
    });
    
    // Additional style update for better user experience
    document.querySelector("button").addEventListener("mouseenter", function() {
      this.style.backgroundColor = "#ddd";
    });
    
    document.querySelector("button").addEventListener("mouseleave", function() {
      this.style.backgroundColor = "";
    });



const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("change", function() {
  // Toggle the 'dark-mode' class on the body based on the checkbox state
  document.body.classList.toggle("dark-mode", this.checked);
});

document.getElementById("fontSelector").addEventListener("change", function() {
            const selectedFont = this.value;
            document.getElementById("textContent").style.fontFamily = selectedFont;
        });

         // Get the checkbox element
    const themeToggle = document.getElementById('themeToggle');
    
    // Listen for changes on the checkbox
    themeToggle.addEventListener('change', function() {
      // Toggle the dark-mode class on the body
      document.body.classList.toggle('dark-mode');


      if (document.body.classList.contains('dark-mode')) {
          toggleButton.textContent = "Switch to Light Mode";
      } else {
          toggleButton.textContent = "Switch to Dark Mode";
      }
    });