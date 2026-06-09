// ================= प्रश्नांचा डेटा (QUESTIONS DATA) =================
const questions = [
  /* मराठी व्याकरण */
  { "category": "मराठी व्याकरण", "question": "खालीलपैकी 'अमृतानुभव' या ग्रंथाचे लेखक कोण आहेत?", "options": ["संत ज्ञानेश्वर", "संत तुकाराम", "संत एकनाथ", "संत नामदेव"], "answer": 0 },
  { "category": "मराठी व्याकरण", "question": "मराठी भाषेत एकूण किती वर्ण आहेत (आधुनिक वर्णमालेनुसार)?", "options": ["34", "48", "52", "50"], "answer": 2 },
  { "category": "मराठी व्याकरण", "question": "‘घोडा’ या शब्दाचे अनेकवचन खालीलपैकी कोणते होईल?", "options": ["घोडी", "घोडे", "घोड्या", "घोड्यांनी"], "answer": 1 },
  { "category": "मराठी व्याकरण", "question": "मुलांनी पालकांना मान द्यावा - या वाक्याचा प्रयोग ओळखा.", "options": ["कर्तरी प्रयोग", "कर्मणी प्रयोग", "भावे प्रयोग", "मिश्र प्रयोग"], "answer": 2 },
  { "category": "मराठी व्याकरण", "question": "‘पाय घसरला आणि पडलो’ हे कोणत्या प्रकारचे वाक्य आहे?", "options": ["केवल वाक्य", "मिश्र वाक्य", "संयुक्त वाक्य", "प्रश्नार्थक वाक्य"], "answer": 2 },

  /* अंकगणित */
  { "category": "अंकगणित", "question": "दोन संख्यांची बेरीज ४५ असून त्यांचे गुणोत्तर २:३ आहे, तर त्या संख्या कोणत्या?", "options": ["१८ आणि २十七章", "२० आणि २५", "१५ आणि ३०", "१० आणि ३५"], "answer": 0 },
  { "category": "अंकगणित", "question": "एका आयताची लांबी १५ सेमी आणि रुंदी १० सेमी आहे, तर त्याचे क्षेत्रफळ किती चौसेमी असेल?", "options": ["५०", "१५०", "३०", "२५"], "answer": 1 },
  { "category": "अंकगणित", "question": "१ ते ५० मधील एकूण मूळ संख्या (Prime Numbers) किती आहेत?", "options": ["१०", "१२", "१५", "२०"], "answer": 2 },

  /* बुद्धिमत्ता चाचणी */
  { "category": "बुद्धिमत्ता चाचणी", "question": "मालिका पूर्ण करा: २, ४, ८, १६, ?", "options": ["२०", "२४", "३२", "४०"], "answer": 2 },
  { "category": "बुद्धिमत्ता चाचणी", "question": "जसे 'घर' ला 'छत' असते, तसेच 'झाडा'ला काय असते?", "options": ["पाने/फांद्या", "मूळ", "जमीन", "खिडकी"], "answer": 0 },

  /* सामान्य ज्ञान */
  { "category": "सामान्य ज्ञान व चालू घडामोडी", "question": "महाराष्ट्र राज्याची स्थापना केव्हा झाली?", "options": ["1 मे 1960", "15 ऑगस्ट 1947", "26 जानेवारी 1950", "1 मे 1950"], "answer": 0 },
  { "category": "सामान्य ज्ञान व चालू घडामोडी", "question": "महाराष्ट्राची उपराजधानी कोणती आहे?", "options": ["पुणे", "औरंगाबाद", "नागपूर", "नाशिक"], "answer": 2 },
  { "category": "सामान्य ज्ञान व चालू घडामोडी", "question": "चले जाव (Quit India) चळवळ कोणत्या वर्षापासून सुरू झाली?", "options": ["१९२०", "१९३०", "१९४२", "१९४७"], "answer": 2 }
];

// ================= व्हेरिएबल्स (VARIABLES) =================
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null); // युझरची उत्तरे सेव्ह करण्यासाठी
let timeLeft = 90 * 60; // ९० मिनिटे (सेकंदात)
let timerInterval;

// ================= टाईमर लॉजिक (TIMER) =================
function startTimer() {
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        document.getElementById('timer').innerText = `${minutes}:${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("⏰ वेळ संपली! तुमची परीक्षा ऑटोमॅटिक सबमिट होत आहे.");
            showResults();
        }
        timeLeft--;
    }, 1000);
}

// ================= प्रश्न लोड करणे (LOAD QUESTION) =================
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // हेडलाईन अपडेट करा
    document.getElementById('category').innerText = `विषय: ${currentQuestion.category} (${currentQuestionIndex + 1}/${questions.length})`;
    document.getElementById('question').innerText = `प्र. ${currentQuestionIndex + 1}) ${currentQuestion.question}`;
    
    // ऑप्शन्स दाखवा
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach((option, index) => {
        // जर युझरने आधीच या प्रश्नाचे उत्तर दिले असेल तर ते 'चेक' दाखवा
        const isChecked = userAnswers[currentQuestionIndex] === index ? 'checked' : '';
        
        const optionHTML = `
            <div class="option">
                <label>
                    <input type="radio" name="quiz-option" value="${index}" ${isChecked} onchange="saveAnswer(${index})">
                    ${option}
                </label>
            </div>
        `;
        optionsContainer.insertAdjacentHTML('beforeend', optionHTML);
    });

    updatePalette();
}

// ================= उत्तर सेव्ह करणे (SAVE ANSWER) =================
function saveAnswer(index) {
    userAnswers[currentQuestionIndex] = index;
    updatePalette();
}

// ================= मागील/पुढील प्रश्न बटण (NAVIGATION) =================
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        alert("हा शेवटचा प्रश्न आहे. कृपया तुमची परीक्षा सबमिट करा!");
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function jumpToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
}

// ================= प्रश्न तालिका अपडेट करणे (QUESTION PALETTE) =================
function buildPalette() {
    const paletteContainer = document.getElementById('question-palette');
    paletteContainer.innerHTML = '';
    
    questions.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.id = `palette-cell-${index}`;
        cell.className = 'palette-cell';
        cell.innerText = index + 1;
        cell.onclick = () => jumpToQuestion(index);
        paletteContainer.appendChild(cell);
    });
}

function updatePalette() {
    questions.forEach((_, index) => {
        const cell = document.getElementById(`palette-cell-${index}`);
        if (!cell) return;
        
        // क्लासेस रीसेट करा
        cell.className = 'palette-cell';
        
        // जर उत्तर दिले असेल तर हिरवा करा
        if (userAnswers[index] !== null) {
            cell.classList.add('answered');
        }
        
        // जर सध्याचा प्रश्न असेल तर बॉर्डर द्या
        if (index === currentQuestionIndex) {
            cell.classList.add('current');
        }
    });
}

// ================= निकाल दाखवणे (SHOW RESULTS) =================
function showResults() {
    clearInterval(timerInterval);
    const container = document.getElementById('quiz-box');
    
    let score = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.answer) {
            score++;
        }
    });
    
    const percentage = ((score / questions.length) * 100).toFixed(2);
    
    let resultHTML = `
        <div class="quiz-main" style="text-align: center; padding: 20px;">
            <h2 style="color: #2e7d32;">🎯 तुमचा निकाल (Result)</h2>
            <h1 style="font-size: 60px; color: #003366; margin: 10px 0;">${score} / ${questions.length}</h1>
            <p style="font-size: 20px; font-weight: bold;">टक्केवारी: ${percentage}%</p>
            <button onclick="window.location.reload()" style="max-width: 200px; margin-top: 20px;">🔄 पुन्हा प्रयत्न करा</button>
            
            <div style="text-align: left; margin-top: 40px; border-top: 2px dashed #ccc; padding-top: 20px;">
                <h3>🔍 उत्तरतालिकेचे विश्लेषण (Answer Review):</h3>
    `;
    
    questions.forEach((q, index) => {
        const userAns = userAnswers[index];
        const isCorrect = userAns === q.answer;
        const itemClass = isCorrect ? 'correct' : 'wrong';
        const bgColor = isCorrect ? '#e8f5e9' : '#ffebee';
        const borderColor = isCorrect ? '#2e7d32' : '#c62828';
        
        resultHTML += `
            <div style="background: ${bgColor}; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 5px solid ${borderColor};">
                <div style="font-weight: bold; font-size: 16px;">प्र. ${index + 1}) ${q.question}</div>
                <div style="color: #2e7d32; margin-top: 5px;">✅ अचूक उत्तर: ${q.options[q.answer]}</div>
                ${!isCorrect ? `<div style="color: #c62828; margin-top: 3px;">❌ तुमचे उत्तर: ${userAns !== null ? q.options[userAns] : 'तुम्ही उत्तर दिले नाही'}</div>` : ''}
            </div>
        `;
    });
    
    resultHTML += `</div></div>`;
    container.innerHTML = resultHTML;
}

// ================= सुरुवात (INITIALIZE) =================
window.onload = function() {
    buildPalette();
    startTimer();
    loadQuestion();
};
                       
