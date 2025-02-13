
var btn =  document.getElementById("btn")
var voice =  document.getElementById("voice")
var content =  document.getElementById("intro")

btn.addEventListener("click",()=>
  {
    recongnition.start();
    btn.style.visibility = "hidden";
    voice.style.visibility = "visible";
   })
let speechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition
let recongnition =   new speechRecognition();
recongnition.onresult=(event)=>{
  console.log("Recognization start")
  const transcript = event.results[0][0].transcript;
  response(transcript);
}
recongnition.onend = () => {
  btn.style.visibility = "visible";
  voice.style.visibility = "hidden";
};


function speak(text) {
     if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel(); // Cancel ongoing speech
      }
      let textSpeak = new SpeechSynthesisUtterance(text);
      console.log(textSpeak)
      textSpeak.rate = 1.1;
      textSpeak.pitch = 1;
      textSpeak.volume = 1;
      textSpeak.lang = 'en-us'; 
      window.speechSynthesis.speak(textSpeak);
}
  



async function response(msg)
{
 
        if(msg.includes("open") && msg.includes("website"))
        {
          speak("This is the result I found on Google");
            window.open(`https://www.google.com/search?q=${msg}`, "_blank");
            return;
         }
        else if (msg.includes("channel") || msg.includes("YouTube")) 
        {
                speak("Opening YouTube for you, just a moment...");
                window.open(`https://www.youtube.com/results?search_query=${msg}`, "_blank");
                return;
        }
        else if(msg.includes("open"))
        {
                let openindex  = msg.indexOf("open")
                console.log(openindex);
                let space1 = msg.indexOf(" ",openindex) +1 ;
                console.log(space1);
                let space2 = msg.indexOf(" ",space1);
                console.log(space2);
                if(space2!=-1)  fetchData(msg)
              else
               {
                   space2 =  msg.length;
                   let website = msg.substring(space1,space2);
                   console.log(website);
                  speak(`opening ${website}`);
                 window.open(`https://${website}.com`, "_blank");
                 return ;
              }
           }
            else
            {
                   fetchData(msg)
            }
        
}
async  function fetchData(msg)
{
  msg =  `${msg}`+  "[NOte:  Don't use special characters in the message except for spaces, and don't bold the text. The message should be brief ]"
   const apiKey = "AIzaSyBfCQ2rq9vap2U_mLFADewitWPFYRBowC0";
   const url = API_KEY;
   const data = {
    contents: [{
      parts: [{ text: `${msg}` }]
    }]
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
 
  
fetch(url,options)
.then(response => response.json())
.then(data => {
     var ans =  data.candidates[0].content.parts[0].text;
     speak(ans);
  })
  .catch((error) => {
    console.error('Error:', error);
    speak("There was error processing your request")
  });
 }