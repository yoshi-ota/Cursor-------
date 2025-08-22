// 質問データ
const questions = [
    {
        title: "質問1",
        text: "休日はどのように過ごすのが好きですか？",
        options: [
            { value: "A", text: "A. 家でゆっくり過ごす" },
            { value: "B", text: "B. 友達と遊びに行く" },
            { value: "C", text: "C. 新しい場所を探検する" },
            { value: "D", text: "D. 趣味に没頭する" }
        ]
    },
    {
        title: "質問2",
        text: "問題が起きた時、どのように対処しますか？",
        options: [
            { value: "A", text: "A. じっくり考えてから行動する" },
            { value: "B", text: "B. 周りの人に相談する" },
            { value: "C", text: "C. 直感に従って行動する" },
            { value: "D", text: "D. 計画を立てて実行する" }
        ]
    },
    {
        title: "質問3",
        text: "新しい環境ではどのような気持ちになりますか？",
        options: [
            { value: "A", text: "A. 緊張して慎重になる" },
            { value: "B", text: "B. ワクワクして積極的になる" },
            { value: "C", text: "C. 好奇心旺盛になる" },
            { value: "D", text: "D. 落ち着いて観察する" }
        ]
    }
];

// 性格診断結果データ
const personalityTypes = {
    "AAA": {
        title: "慎重な分析家タイプ",
        description: "あなたは物事を深く考え、慎重に行動するタイプです。論理的思考が得意で、リスクを避けながら着実に目標を達成します。",
        traits: [
            "論理的で分析的な思考",
            "慎重で計画的な行動",
            "信頼性が高く責任感が強い",
            "細かい部分まで気を配る",
            "安定性を重視する"
        ]
    },
    "BBB": {
        title: "社交的なリーダータイプ",
        description: "あなたは人との関わりを大切にし、周りをまとめるのが得意なタイプです。明るく前向きで、チームワークを重視します。",
        traits: [
            "コミュニケーション能力が高い",
            "リーダーシップを発揮できる",
            "人をまとめるのが得意",
            "明るく前向きな性格",
            "協調性が高い"
        ]
    },
    "CCC": {
        title: "冒険的な探検家タイプ",
        description: "あなたは新しいことに挑戦するのが好きで、自由奔放なタイプです。創造性が豊かで、常に刺激を求めています。",
        traits: [
            "創造性が豊か",
            "新しいことに挑戦するのが好き",
            "自由奔放で独立心が強い",
            "直感力に優れている",
            "変化を好む"
        ]
    },
    "DDD": {
        title: "完璧主義の職人タイプ",
        description: "あなたは物事を完璧に仕上げることに情熱を持つタイプです。集中力が高く、自分の世界に没頭するのが好きです。",
        traits: [
            "完璧主義で細部にこだわる",
            "集中力が高い",
            "技術やスキルを磨くのが好き",
            "独創的なアイデアを持つ",
            "自分の世界に没頭できる"
        ]
    },
    "default": {
        title: "バランスの取れたタイプ",
        description: "あなたは様々な性格の特徴をバランスよく持っているタイプです。状況に応じて柔軟に対応できる適応力の高さが特徴です。",
        traits: [
            "バランス感覚に優れている",
            "状況に応じて柔軟に対応",
            "多様な価値観を受け入れられる",
            "適応力が高い",
            "幅広い興味を持つ"
        ]
    }
};

// アプリの状態管理
let currentQuestion = 0;
let answers = [];

// DOM要素の取得
const questionTitle = document.getElementById('question-title');
const questionText = document.getElementById('question-text');
const optionsContainer = document.querySelector('.options');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const personalityTitle = document.getElementById('personality-title');
const personalityDescription = document.getElementById('personality-description');
const personalityTraits = document.getElementById('personality-traits');
const restartBtn = document.getElementById('restart-btn');

// 初期化
function init() {
    showQuestion(currentQuestion);
    updateProgress();
}

// 質問を表示
function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionTitle.textContent = question.title;
    questionText.textContent = question.text;
    
    // オプションボタンを更新
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.setAttribute('data-value', option.value);
        button.textContent = option.text;
        button.addEventListener('click', () => selectOption(option.value));
        optionsContainer.appendChild(button);
    });
}

// オプション選択時の処理
function selectOption(value) {
    answers.push(value);
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateProgress();
    } else {
        showResult();
    }
}

// 進捗バーの更新
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
}

// 結果の表示
function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    const resultKey = answers.join('');
    const personality = personalityTypes[resultKey] || personalityTypes.default;
    
    personalityTitle.textContent = personality.title;
    personalityDescription.textContent = personality.description;
    
    // 性格の特徴を表示
    personalityTraits.innerHTML = `
        <h4>あなたの特徴</h4>
        <ul>
            ${personality.traits.map(trait => `<li>${trait}</li>`).join('')}
        </ul>
    `;
}

// 再スタートボタンの処理
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    answers = [];
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    showQuestion(currentQuestion);
    updateProgress();
});

// アプリの初期化
document.addEventListener('DOMContentLoaded', init);
