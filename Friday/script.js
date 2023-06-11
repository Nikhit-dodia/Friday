const startBtn = document.createElement("button");
startBtn.innerHTML = '<i class="fa-solid fa-microphone" id="mic"></i>';
startBtn.style.border= 'none';
startBtn.style.backgroundColor='white';
startBtn.style.width='5rem';
startBtn.style.height='5rem';
startBtn.style.borderRadius='50%';
startBtn.style.marginLeft='38%';
startBtn.style.marginTop='6%';    

const result = document.createElement("div");
const processing = document.createElement("p");
document.write('<body><h1><i class="fa-brands fa-foursquare"></i>riday</h1></body>');
document.body.append(startBtn);
document.body.append(result);
document.body.append(processing);

//gujarati text
// const recognition = new SpeechRecognition();
// recognition.continuous = true;
// recognition.interimResults = true;
// recognition.lang = "gu-IN"; // Set the language to Gujarati (India)
// recognition.onresult = event => {
// Rest of your code...
// };


// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
    startBtn.remove();
    result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = event => {
        const last = event.results.length - 1;
        const res = event.results[last];
        const text = res[0].transcript;
        if (res.isFinal) {
            processing.innerHTML = "processing ....";
            const response = process(text);
            const p = document.createElement("p");
            p.style.fontFamily="font-family: 'Chinger', sans-serif";
            p.innerHTML = `You: ${text} </br>Friday: ${response}`;
            processing.innerHTML = "";
            result.appendChild(p);
            // text to speech
            speechSynthesis.speak(new SpeechSynthesisUtterance(response));
        } else {
            processing.innerHTML = `listening: ${text}`;
        }
    }
    let listening = false;
    toggleBtn = () => {
        if (listening) {
            recognition.stop();
            startBtn.innerHTML = '<i class="fa-solid fa-microphone" id="mic"></i>';    
        } else {
            recognition.start();
            startBtn.innerHTML = '<i class="fa-solid fa-microphone-slash" id="mic"></i>';
        }
        listening = !listening;
    };
    startBtn.addEventListener("click", toggleBtn);
}

// processor
function process(rawText) {
    let text = rawText.replace(/\s/g, "");
    text = text.toLowerCase();
    let response = null;
    switch(text) {
        case "hello":
            response = "hi, how are you doing?"; break;
        case "hi":
            response = "hi, how are you doing?"; break;
        case "friday":
            response = "hello, how can i help you sir?"; break;
        case "hellofriday":
            response = "hello, how can i help you sir?"; break;    
        case "goodmorningfriday":
            response = "very good morning sir, did you have your breakfast?"; break; 
        case "iamgood":
            response = "that's great, how can I help you"; break;
        case "what'syourname":
            response = "I am Friday, your virtual assistant sir!!";  break;
        case "whatisyourname":
            response = "I am Friday, your virtual assistant sir!!";  break;
        case "howareyou":
            response = "I'm good, so kind of you for asking sir."; break;
        case "excuseme":
                response = "god bless you"; break;
        case "whatareyoudoing":
                response = "nothing much..what about you"; break;
        case "whattimeisit":
            response = new Date().toLocaleTimeString(); break;
        case "whattimeitis":
            response =  new Date().toLocaleTimeString(); break;
        case "tellmethetime":
            response =  new Date().toLocaleTimeString(); break;
        case "whatareyou":
            response = "I'm a virtuAL ASSISTANT, hope that helps"; break;
        case "canyoulaugh":
            response = "hahahahahahahahaha"; break;
        case "whatanimaldoilikethemost":
            response = "you like cats a lot, according to my database"; break;
        case "howcanyouhelpme":
            response = "I'm still a learning model so  I'm not good enough but I will do my best"; break;
        case "tellmeajoke":
            response = "I wanted to buy some camo pants but couldn't find any."; break;
        case "openyoutube":
           window.open('https://youtube.com', "_blank"); break;
        case "closeyoutube":
           window.close('https://youtube.com', "_blank"); break;
        case "openmusic":
            window.open('https://wynk.in/music', "_blank"); break;
        case "opengmail":
            window.open('https://mail.google.com/mail/u/0/#inbox', "_blank"); break;
        case "openmygh":
            window.open('https://github.com/Nikhit-dodia', "_blank"); break;
        case "openleetcode":
            window.open('https://leetcode.com/problem-list/challenges-for-new-users/', "_blank"); break; 
        case "changecolour":
            response = "Changing the background color...";
            const colors = ["red", "green", "blue", "yellow", "orange"];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.backgroundColor = randomColor;
            break;    
        case "changeitback":
            response = "as you like sir..";
            document.body.style.backgroundColor = "black"; break;       
        case "kemcho":
            response = "Majama"; break;
        case "showpictureofacat":
            response = 'here is a picture sir...<img src="pexels-peng-louis-1643457.jpg"  id="img">'; break;
        case "sukarocho":
            response = "bas kaai nahi"; break;
        case "shutup":
            response = "im very sorry for inconvenience"; break;
        case "playasong" :
           window.open('https://wynk.in/music/song/under-the-influence/sm_A10328E0009152567X');
        case "stop":
            response = "have a good day sir.."; break;
        case "kemchale":
            response = "moje mmoj"; break;

        case "close":
            response = "Closing the window...bye sir";
            setTimeout(() => {
                window.close();
            }, 3500);
        toggleBtn();
    }
    if (!response) {
        window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
        return `I found some information on the internet about ${rawText}`;
    }
    return response;
}