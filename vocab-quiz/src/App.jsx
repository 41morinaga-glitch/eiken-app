import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, BarChart3, PlusCircle, ArrowLeft,
  CheckCircle, XCircle, RotateCcw, ChevronRight,
  Upload, Sparkles, Download, FileJson, KeyRound,
  X, AlertCircle, Eye, EyeOff, Shuffle
} from 'lucide-react';

// ============================================================
// カラー定数
// ============================================================
const C = {
  bg: '#F5F7FA', card: '#FFFFFF',
  text: '#1F2A44', textMuted: '#9CA3AF', textSub: '#6B7280',
  border: '#E5E7EB', borderLight: '#F1F3F7',
  primary: '#6366F1', primaryBg: '#EEF2FF', primaryH: '#4F46E5',
  g2Bg: '#D1FAE5', g2Text: '#059669',

  g1Bg: '#EDE9FE', g1Text: '#7C3AED',
  ok: '#10B981', okBg: '#ECFDF5',
  ng: '#EF4444', ngBg: '#FEF2F2',
  ai: '#8B5CF6', aiBg: '#F5F3FF', aiH: '#7C3AED',
};
const SH = '0 1px 3px rgba(15,23,42,0.05),0 1px 2px rgba(15,23,42,0.04)';
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_VISION_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct';
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions';

// ============================================================
// 問題データ (SEED)
// ============================================================
const SEED_DATA = [
  {
    id: 'seed-001', source: 'builtin', grade: 'grade2',
    dialogueLines: [
      { speaker: 'A', text: 'There are several (   ) to consider before developing our company\'s new product.' },
      { speaker: 'B', text: 'Yes. We need to start by understanding and evaluating how the product fits the current market.' },
    ],
    questionText: null,
    questionJa: 'A：当社の新製品を開発する前に考慮すべき要素がいくつかある。\nB：そうだね。その製品が現在の市場にどう適合するか理解し、評価することから始める必要がある。',
    choices: [
      { key: '1', word: 'palaces',     meaning: '宮殿' },
      { key: '2', word: 'manuscripts', meaning: '(文芸の)原稿' },
      { key: '3', word: 'victims',     meaning: '犠牲者' },
      { key: '4', word: 'factors',     meaning: '要素' },
    ],
    answer: '4',
    explanation: '「新製品開発前に考慮すべき」ことだから、4 factors「要素」が文意に合う。1 palaces「宮殿」2 manuscripts「(文芸の)原稿」3 victims「犠牲者」。いずれも不適。',
    tags: [], addedAt: 1715000001000,
  },
  {
    id: 'seed-002', source: 'builtin', grade: 'grade2',
    dialogueLines: [
      { speaker: 'A', text: 'Was the committee held (   )?' },
      { speaker: 'B', text: 'Yes. We had one every two weeks.' },
    ],
    questionText: null,
    questionJa: 'A：委員会はよく開かれたのですか？\nB：ええ。2週間に一度でした。',
    choices: [
      { key: '1', word: 'frequently',  meaning: 'たびたび' },
      { key: '2', word: 'temporarily', meaning: '一時的に' },
      { key: '3', word: 'gradually',   meaning: '徐々に' },
      { key: '4', word: 'seriously',   meaning: '深刻に' },
    ],
    answer: '1',
    explanation: 'Bの答えから開催頻度をたずねているとわかるので、頻度を表す1 frequently「たびたび」が正解。2 temporarily「一時的に」3 gradually「徐々に」4 seriously「深刻に」で、いずれもBの答えと合わない。',
    tags: [], addedAt: 1715000002000,
  },
  {
    id: 'seed-003', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'This actress can play a wide (   ) of roles.',
    questionJa: 'この女優は幅広い役柄を演じることができる。',
    choices: [
      { key: '1', word: 'career', meaning: '経歴' },
      { key: '2', word: 'tone',   meaning: '調子' },
      { key: '3', word: 'range',  meaning: '範囲' },
      { key: '4', word: 'sketch', meaning: '素描' },
    ],
    answer: '3',
    explanation: '役柄の3 range「範囲」が広いということ。1 career「経歴」2 tone「調子」4 sketch「素描」で、いずれも役の幅広さを表さない。',
    tags: [], addedAt: 1715000003000,
  },
  {
    id: 'seed-004', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'Some of her new coach\'s advice just before the final seems to have a great (   ) to do with Naomi\'s victory in this tennis championship.',
    questionJa: '決勝戦直前の新コーチによる何らかの助言が、ナオミのこのテニス選手権勝利に大いに関係あるようだ。',
    choices: [
      { key: '1', word: 'deal',   meaning: 'こと・量' },
      { key: '2', word: 'relief', meaning: '安堵' },
      { key: '3', word: 'place',  meaning: '場所' },
      { key: '4', word: 'growth', meaning: '成長' },
    ],
    answer: '1',
    explanation: '1 deal が a great deal「多量、たくさん」の意味の熟語を形成し、have a great deal to do with 〜 で「〜に関して多大に影響する」という意味になる。',
    tags: [], addedAt: 1715000004000,
  },
  {
    id: 'seed-005', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'Experts at the art gallery believed the painting was a (   ) Rembrandt, but it had been replaced with a fake.',
    questionJa: '画廊の専門家は、その絵が本物のレンブラントだと信じたが、それは偽物と取り換えられていた。',
    choices: [
      { key: '1', word: 'severe',   meaning: '厳しい' },
      { key: '2', word: 'logical',  meaning: '論理的な' },
      { key: '3', word: 'genuine',  meaning: '本物の' },
      { key: '4', word: 'portable', meaning: '持ち運びできる' },
    ],
    answer: '3',
    explanation: 'fake「偽物」の反対語だから、3 genuine「本物の」が正解。1 severe「厳しい」2 logical「論理的な」4 portable「持ち運びできる」。いずれも不適。',
    tags: [], addedAt: 1715000005000,
  },
  {
    id: 'seed-006', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'When the manager asked Sarah about the current stock market, she answered (   ) because she was not sure if she was well informed.',
    questionJa: 'マネージャーがサラに現在の株式市場について尋ねた時、彼女は情報が十分かどうか確信が持てなかったため、ためらいがちに答えた。',
    choices: [
      { key: '1', word: 'academically', meaning: '学術的に' },
      { key: '2', word: 'hesitantly',   meaning: 'ためらいがちに' },
      { key: '3', word: 'spiritually',  meaning: '精神的に' },
      { key: '4', word: 'terribly',     meaning: 'ひどく' },
    ],
    answer: '2',
    explanation: '情報が十分かどうかわからないので、2 hesitantly「ためらいがちに」になる。1 academically「学術的に」3 spiritually「精神的に」4 terribly「ひどく」。いずれも文意と合わない。',
    tags: [], addedAt: 1715000006000,
  },
  {
    id: 'seed-007', source: 'builtin', grade: 'grade2',
    dialogueLines: [
      { speaker: 'A', text: 'I heard the company is planning to (   ) its operations to other countries.' },
      { speaker: 'B', text: 'Yes, they\'re looking at markets in Southeast Asia first.' },
    ],
    questionText: null,
    questionJa: 'A：会社が事業を他の国に拡大する計画だと聞きました。\nB：はい、まず東南アジア市場に注目しています。',
    choices: [
      { key: '1', word: 'expand',  meaning: '拡大する' },
      { key: '2', word: 'replace', meaning: '取り替える' },
      { key: '3', word: 'destroy', meaning: '破壊する' },
      { key: '4', word: 'ignore',  meaning: '無視する' },
    ],
    answer: '1',
    explanation: '会社の事業を他の国に広げることだから、1 expand「拡大する」が適切。2 replace「取り替える」3 destroy「破壊する」4 ignore「無視する」はいずれも文意に合わない。',
    tags: [], addedAt: 1715000007000,
  },
  {
    id: 'seed-008', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'The scientist made a (   ) discovery that changed our understanding of the universe.',
    questionJa: 'その科学者は宇宙についての私たちの理解を変えた革命的な発見をした。',
    choices: [
      { key: '1', word: 'revolutionary', meaning: '革命的な' },
      { key: '2', word: 'temporary',     meaning: '一時的な' },
      { key: '3', word: 'harmful',       meaning: '有害な' },
      { key: '4', word: 'ordinary',      meaning: '普通の' },
    ],
    answer: '1',
    explanation: '宇宙理解を「変えた」発見だから、1 revolutionary「革命的な」が適切。2 temporary「一時的な」3 harmful「有害な」4 ordinary「普通の」はいずれも文意に合わない。',
    tags: [], addedAt: 1715000008000,
  },
  {
    id: 'seed-009', source: 'builtin', grade: 'grade1',
    dialogueLines: null,
    questionText: 'The government decided to (   ) the use of single-use plastics in order to protect the environment.',
    questionJa: '政府は環境を守るために、使い捨てプラスチックの使用を禁止することを決定した。',
    choices: [
      { key: '1', word: 'prohibit',  meaning: '禁止する' },
      { key: '2', word: 'promote',   meaning: '促進する' },
      { key: '3', word: 'postpone',  meaning: '延期する' },
      { key: '4', word: 'preserve',  meaning: '保護する' },
    ],
    answer: '1',
    explanation: '「環境を守るために」使い捨てプラスチック使用を「禁止」することだから、1 prohibit が正解。2 promote「促進する」3 postpone「延期する」4 preserve「保護する」はいずれも文意に合わない。',
    tags: [], addedAt: 1715000009000,
  },
  {
    id: 'seed-010', source: 'builtin', grade: 'grade1',
    dialogueLines: [
      { speaker: 'A', text: 'The report says the company\'s profits have been (   ) declining for three consecutive years.' },
      { speaker: 'B', text: 'That\'s concerning. They need to change their strategy soon.' },
    ],
    questionText: null,
    questionJa: 'A：報告書によると、会社の利益は3年連続で着実に減少しているそうです。\nB：それは心配ですね。早急に戦略を変える必要があります。',
    choices: [
      { key: '1', word: 'steadily',    meaning: '着実に' },
      { key: '2', word: 'randomly',    meaning: 'ランダムに' },
      { key: '3', word: 'cheerfully',  meaning: '明るく' },
      { key: '4', word: 'accidentally',meaning: '偶然に' },
    ],
    answer: '1',
    explanation: '3年連続という文脈から、1 steadily「着実に」が正解。2 randomly「ランダムに」3 cheerfully「明るく」4 accidentally「偶然に」はいずれも文意に合わない。',
    tags: [], addedAt: 1715000010000,
  },
  // ---- 英検2級 追加10問 ----
  {
    id: 'seed-011', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'The road construction was a major (   ) to traffic flow in the city center.',
    questionJa: '道路工事は都市中心部の交通の流れにとって大きな障害となった。',
    choices: [
      { key: '1', word: 'obstacle',  meaning: '障害' },
      { key: '2', word: 'benefit',   meaning: '利益' },
      { key: '3', word: 'solution',  meaning: '解決策' },
      { key: '4', word: 'resource',  meaning: '資源' },
    ],
    answer: '1',
    explanation: '交通の流れへの「障害」となったという文脈だから、1 obstacle「障害」が正解。2 benefit「利益」3 solution「解決策」4 resource「資源」はいずれも文意に合わない。',
    tags: [], addedAt: 1715000011000,
  },
  {
    id: 'seed-012', source: 'builtin', grade: 'grade2',
    dialogueLines: [
      { speaker: 'A', text: 'We need to (   ) with the supplier about the delivery schedule.' },
      { speaker: 'B', text: 'I agree. Let\'s arrange a meeting with them this week.' },
    ],
    questionText: null,
    questionJa: 'A：納品スケジュールについてサプライヤーと交渉する必要があります。\nB：そうですね。今週中に彼らとの会議を設定しましょう。',
    choices: [
      { key: '1', word: 'negotiate', meaning: '交渉する' },
      { key: '2', word: 'compete',   meaning: '競争する' },
      { key: '3', word: 'complain',  meaning: '不満を言う' },
      { key: '4', word: 'hesitate',  meaning: 'ためらう' },
    ],
    answer: '1',
    explanation: '会議を設定してスケジュールを調整するという文脈から、1 negotiate「交渉する」が適切。2 compete「競争する」3 complain「不満を言う」4 hesitate「ためらう」はいずれも不適。',
    tags: [], addedAt: 1715000012000,
  },
  {
    id: 'seed-013', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'It took years of practice, but she finally managed to (   ) her goal of becoming a professional musician.',
    questionJa: '何年もの練習の末、彼女はついにプロの音楽家になるという目標を達成することができた。',
    choices: [
      { key: '1', word: 'accomplish', meaning: '達成する' },
      { key: '2', word: 'abandon',    meaning: '諦める' },
      { key: '3', word: 'postpone',   meaning: '延期する' },
      { key: '4', word: 'ignore',     meaning: '無視する' },
    ],
    answer: '1',
    explanation: '「何年もの練習の末、ついに」という文脈から、1 accomplish「達成する」が正解。2 abandon「諦める」3 postpone「延期する」4 ignore「無視する」はいずれも文意に合わない。',
    tags: [], addedAt: 1715000013000,
  },
  {
    id: 'seed-014', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'The teacher asked the students to (   ) the pros and cons of the new policy before writing their essays.',
    questionJa: '教師は生徒たちに、エッセイを書く前に新しい政策の長所と短所を評価するよう求めた。',
    choices: [
      { key: '1', word: 'evaluate',  meaning: '評価する' },
      { key: '2', word: 'memorize',  meaning: '暗記する' },
      { key: '3', word: 'celebrate', meaning: '祝う' },
      { key: '4', word: 'translate', meaning: '翻訳する' },
    ],
    answer: '1',
    explanation: '長所と短所を考えてからエッセイを書くという文脈から、1 evaluate「評価する」が適切。2 memorize「暗記する」3 celebrate「祝う」4 translate「翻訳する」はいずれも不適。',
    tags: [], addedAt: 1715000014000,
  },
  {
    id: 'seed-015', source: 'builtin', grade: 'grade2',
    dialogueLines: [
      { speaker: 'A', text: 'How do you (   ) such a positive attitude even when things get stressful at work?' },
      { speaker: 'B', text: 'I try to focus on what I can control and take breaks when I need them.' },
    ],
    questionText: null,
    questionJa: 'A：仕事でストレスを感じる時でも、どうやってそんなに前向きな姿勢を維持できるのですか？\nB：自分がコントロールできることに集中して、必要な時に休憩を取るようにしています。',
    choices: [
      { key: '1', word: 'maintain',  meaning: '維持する' },
      { key: '2', word: 'pretend',   meaning: 'ふりをする' },
      { key: '3', word: 'discover',  meaning: '発見する' },
      { key: '4', word: 'decrease',  meaning: '減らす' },
    ],
    answer: '1',
    explanation: 'ストレス下でもポジティブな姿勢を「保つ」という文脈から、1 maintain「維持する」が正解。2 pretend「ふりをする」3 discover「発見する」4 decrease「減らす」はいずれも不適。',
    tags: [], addedAt: 1715000015000,
  },
  {
    id: 'seed-016', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'The researcher was able to (   ) that the new drug was effective through a series of controlled experiments.',
    questionJa: '研究者は一連の対照実験を通じて、新薬が有効であることを実証することができた。',
    choices: [
      { key: '1', word: 'demonstrate', meaning: '実証する' },
      { key: '2', word: 'predict',     meaning: '予測する' },
      { key: '3', word: 'imagine',     meaning: '想像する' },
      { key: '4', word: 'suspect',     meaning: '疑う' },
    ],
    answer: '1',
    explanation: '実験を通じて有効性を「示した」という文脈から、1 demonstrate「実証する」が正解。2 predict「予測する」3 imagine「想像する」4 suspect「疑う」はいずれも不適。',
    tags: [], addedAt: 1715000016000,
  },
  {
    id: 'seed-017', source: 'builtin', grade: 'grade2',
    dialogueLines: [
      { speaker: 'A', text: 'I\'m trying to (   ) my parents to let me study abroad for a year.' },
      { speaker: 'B', text: 'That sounds challenging. Have you shown them the benefits of the program?' },
    ],
    questionText: null,
    questionJa: 'A：両親に1年間の留学を許可してもらえるよう説得しようとしています。\nB：それは大変そうですね。プログラムのメリットを見せましたか？',
    choices: [
      { key: '1', word: 'convince',  meaning: '説得する' },
      { key: '2', word: 'forbid',    meaning: '禁じる' },
      { key: '3', word: 'remind',    meaning: '思い出させる' },
      { key: '4', word: 'entertain', meaning: '楽しませる' },
    ],
    answer: '1',
    explanation: '留学を許可してもらうために働きかけているという文脈から、1 convince「説得する」が適切。2 forbid「禁じる」3 remind「思い出させる」4 entertain「楽しませる」はいずれも不適。',
    tags: [], addedAt: 1715000017000,
  },
  {
    id: 'seed-018', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'The two countries agreed to (   ) on the development of clean energy technologies.',
    questionJa: '両国はクリーンエネルギー技術の開発において協力することに合意した。',
    choices: [
      { key: '1', word: 'cooperate', meaning: '協力する' },
      { key: '2', word: 'compete',   meaning: '競争する' },
      { key: '3', word: 'disagree',  meaning: '反対する' },
      { key: '4', word: 'separate',  meaning: '分離する' },
    ],
    answer: '1',
    explanation: '「合意した」という文脈から、2国が共に取り組む1 cooperate「協力する」が正解。2 compete「競争する」3 disagree「反対する」4 separate「分離する」はいずれも不適。',
    tags: [], addedAt: 1715000018000,
  },
  {
    id: 'seed-019', source: 'builtin', grade: 'grade2',
    dialogueLines: null,
    questionText: 'The survey results (   ) that most customers were satisfied with the quality of the service.',
    questionJa: 'アンケート結果は、ほとんどの顧客がサービスの質に満足していることを示していた。',
    choices: [
      { key: '1', word: 'indicated', meaning: '示した' },
      { key: '2', word: 'prevented', meaning: '防いだ' },
      { key: '3', word: 'demanded',  meaning: '要求した' },
      { key: '4', word: 'wasted',    meaning: '無駄にした' },
    ],
    answer: '1',
    explanation: 'アンケート結果が満足度を「示した」という文脈から、1 indicated「示した」が正解。2 prevented「防いだ」3 demanded「要求した」4 wasted「無駄にした」はいずれも不適。',
    tags: [], addedAt: 1715000019000,
  },
  {
    id: 'seed-020', source: 'builtin', grade: 'grade2',
    dialogueLines: [
      { speaker: 'A', text: 'The new regulations will (   ) the number of cars allowed in the city center.' },
      { speaker: 'B', text: 'That should help reduce pollution and improve air quality.' },
    ],
    questionText: null,
    questionJa: 'A：新しい規制により、市内中心部に入れる車の数が制限されます。\nB：それは汚染を減らし、大気質を改善するのに役立つはずです。',
    choices: [
      { key: '1', word: 'restrict',  meaning: '制限する' },
      { key: '2', word: 'increase',  meaning: '増加させる' },
      { key: '3', word: 'celebrate', meaning: '祝う' },
      { key: '4', word: 'replace',   meaning: '取り替える' },
    ],
    answer: '1',
    explanation: '規制によって車の数を「制限する」という文脈から、1 restrict「制限する」が正解。汚染削減につながるというBの返答とも合う。2 increase「増加させる」3 celebrate「祝う」4 replace「取り替える」はいずれも不適。',
    tags: [], addedAt: 1715000020000,
  },
  // ---- 英検1級 追加10問 ----
  {
    id: 'seed-021', source: 'builtin', grade: 'grade1',
    dialogueLines: null,
    questionText: 'Doctors recommend regular exercise to (   ) the symptoms of anxiety and depression.',
    questionJa: '医師は不安やうつの症状を和らげるために定期的な運動を勧めている。',
    choices: [
      { key: '1', word: 'alleviate',  meaning: '和らげる' },
      { key: '2', word: 'intensify',  meaning: '強める' },
      { key: '3', word: 'ignore',     meaning: '無視する' },
      { key: '4', word: 'diagnose',   meaning: '診断する' },
    ],
    answer: '1',
    explanation: '運動が症状を「和らげる」という文脈から、1 alleviate「和らげる」が正解。2 intensify「強める」は逆の意味。3 ignore「無視する」4 diagnose「診断する」はいずれも不適。',
    tags: [], addedAt: 1715000021000,
  },
  {
    id: 'seed-022', source: 'builtin', grade: 'grade1',
    dialogueLines: null,
    questionText: 'The new construction near the wetland could (   ) the already fragile ecosystem of the area.',
    questionJa: '湿地近くの新しい建設工事は、その地域のすでに脆弱な生態系をさらに悪化させる可能性がある。',
    choices: [
      { key: '1', word: 'exacerbate', meaning: '悪化させる' },
      { key: '2', word: 'restore',    meaning: '回復させる' },
      { key: '3', word: 'diversify',  meaning: '多様化する' },
      { key: '4', word: 'stabilize',  meaning: '安定させる' },
    ],
    answer: '1',
    explanation: '「すでに脆弱な」生態系への建設工事の影響だから、1 exacerbate「悪化させる」が正解。2 restore「回復させる」3 diversify「多様化する」4 stabilize「安定させる」はいずれも文意に合わない。',
    tags: [], addedAt: 1715000022000,
  },
  {
    id: 'seed-023', source: 'builtin', grade: 'grade1',
    dialogueLines: [
      { speaker: 'A', text: 'The auditors are going to (   ) every transaction record from the past five years.' },
      { speaker: 'B', text: 'We should make sure all our documentation is in order before they arrive.' },
    ],
    questionText: null,
    questionJa: 'A：監査人が過去5年間のすべての取引記録を精査する予定です。\nB：彼らが来る前に、すべての書類が整っていることを確認しましょう。',
    choices: [
      { key: '1', word: 'scrutinize', meaning: '精査する' },
      { key: '2', word: 'falsify',    meaning: '改ざんする' },
      { key: '3', word: 'overlook',   meaning: '見逃す' },
      { key: '4', word: 'summarize',  meaning: '要約する' },
    ],
    answer: '1',
    explanation: '監査人が全取引記録を詳しく調べるという文脈から、1 scrutinize「精査する」が正解。2 falsify「改ざんする」3 overlook「見逃す」4 summarize「要約する」はいずれも不適。',
    tags: [], addedAt: 1715000023000,
  },
  {
    id: 'seed-024', source: 'builtin', grade: 'grade1',
    dialogueLines: null,
    questionText: 'The global pandemic caused (   ) disruptions to international supply chains that had never been seen before.',
    questionJa: '世界的なパンデミックは、これまで見られたことのない前例のない国際サプライチェーンへの混乱を引き起こした。',
    choices: [
      { key: '1', word: 'unprecedented', meaning: '前例のない' },
      { key: '2', word: 'predictable',   meaning: '予測可能な' },
      { key: '3', word: 'occasional',    meaning: '時折の' },
      { key: '4', word: 'gradual',       meaning: '段階的な' },
    ],
    answer: '1',
    explanation: '「これまで見られたことのない」という文脈と that had never been seen before が同義であることから、1 unprecedented「前例のない」が正解。2 predictable「予測可能な」3 occasional「時折の」4 gradual「段階的な」はいずれも不適。',
    tags: [], addedAt: 1715000024000,
  },
  {
    id: 'seed-025', source: 'builtin', grade: 'grade1',
    dialogueLines: [
      { speaker: 'A', text: 'The patient\'s condition seems to (   ) whenever he skips his medication.' },
      { speaker: 'B', text: 'Yes, consistent adherence to the treatment plan is absolutely essential.' },
    ],
    questionText: null,
    questionJa: 'A：患者が薬を飲み忘れるたびに、容態が悪化するようです。\nB：そうですね、治療計画を一貫して守ることが絶対に不可欠です。',
    choices: [
      { key: '1', word: 'deteriorate', meaning: '悪化する' },
      { key: '2', word: 'improve',     meaning: '改善する' },
      { key: '3', word: 'stabilize',   meaning: '安定する' },
      { key: '4', word: 'fluctuate',   meaning: '変動する' },
    ],
    answer: '1',
    explanation: '薬を飲まないと容態が「悪化する」という文脈から、1 deteriorate「悪化する」が正解。治療の重要性を強調するBの発言とも一致する。2 improve「改善する」3 stabilize「安定する」4 fluctuate「変動する」はいずれも不適。',
    tags: [], addedAt: 1715000025000,
  },
  {
    id: 'seed-026', source: 'builtin', grade: 'grade1',
    dialogueLines: null,
    questionText: 'The professor\'s instructions were so (   ) that students interpreted them in completely different ways.',
    questionJa: '教授の指示はとても曖昧で、学生たちはそれをまったく異なる方法で解釈した。',
    choices: [
      { key: '1', word: 'ambiguous',   meaning: '曖昧な' },
      { key: '2', word: 'concise',     meaning: '簡潔な' },
      { key: '3', word: 'explicit',    meaning: '明示的な' },
      { key: '4', word: 'convincing',  meaning: '説得力のある' },
    ],
    answer: '1',
    explanation: '指示を「異なる方法で解釈した」という結果から、1 ambiguous「曖昧な」が正解。2 concise「簡潔な」3 explicit「明示的な」は明確さを示し矛盾。4 convincing「説得力のある」も不適。',
    tags: [], addedAt: 1715000026000,
  },
  {
    id: 'seed-027', source: 'builtin', grade: 'grade1',
    dialogueLines: null,
    questionText: 'International agreements are seen as the most effective way to (   ) the risks associated with climate change.',
    questionJa: '国際協定は、気候変動に関連するリスクを緩和する最も効果的な方法と見なされている。',
    choices: [
      { key: '1', word: 'mitigate',   meaning: '緩和する' },
      { key: '2', word: 'amplify',    meaning: '増幅する' },
      { key: '3', word: 'provoke',    meaning: '引き起こす' },
      { key: '4', word: 'overlook',   meaning: '見逃す' },
    ],
    answer: '1',
    explanation: '国際協定でリスクへの対処をするという文脈から、1 mitigate「緩和する」が正解。2 amplify「増幅する」3 provoke「引き起こす」はリスクを増やす意味で不適。4 overlook「見逃す」も不適。',
    tags: [], addedAt: 1715000027000,
  },
  {
    id: 'seed-028', source: 'builtin', grade: 'grade1',
    dialogueLines: [
      { speaker: 'A', text: 'Critics argue that the media tends to (   ) harmful stereotypes about minority groups.' },
      { speaker: 'B', text: 'That\'s a valid concern. Responsible reporting is crucial to changing those narratives.' },
    ],
    questionText: null,
    questionJa: 'A：批評家たちは、メディアが少数派グループに関する有害なステレオタイプを永続させる傾向があると主張しています。\nB：それは正当な懸念です。ステレオタイプを変えるには責任ある報道が不可欠です。',
    choices: [
      { key: '1', word: 'perpetuate', meaning: '永続させる' },
      { key: '2', word: 'challenge',  meaning: '疑問を呈する' },
      { key: '3', word: 'eliminate',  meaning: '排除する' },
      { key: '4', word: 'celebrate',  meaning: '称える' },
    ],
    answer: '1',
    explanation: 'メディアがステレオタイプを「永続させる」という批判の文脈から、1 perpetuate「永続させる」が正解。2 challenge「疑問を呈する」3 eliminate「排除する」は改善を示し不適。4 celebrate「称える」も不適。',
    tags: [], addedAt: 1715000028000,
  },
  {
    id: 'seed-029', source: 'builtin', grade: 'grade1',
    dialogueLines: null,
    questionText: 'There was a significant (   ) between the official statistics and the figures reported by independent researchers.',
    questionJa: '公式統計と独立した研究者が報告した数値の間には、大きな食い違いがあった。',
    choices: [
      { key: '1', word: 'discrepancy', meaning: '食い違い' },
      { key: '2', word: 'similarity',  meaning: '類似性' },
      { key: '3', word: 'consensus',   meaning: '合意' },
      { key: '4', word: 'correlation', meaning: '相関関係' },
    ],
    answer: '1',
    explanation: '公式統計と独立研究者の数値が異なるという文脈から、1 discrepancy「食い違い」が正解。2 similarity「類似性」3 consensus「合意」4 correlation「相関関係」はいずれも一致・関連を示し不適。',
    tags: [], addedAt: 1715000029000,
  },
  {
    id: 'seed-030', source: 'builtin', grade: 'grade1',
    dialogueLines: null,
    questionText: 'The legal team gathered extensive evidence to (   ) their client\'s claim of innocence.',
    questionJa: '法律チームは依頼人の無実の主張を実証するために、広範な証拠を集めた。',
    choices: [
      { key: '1', word: 'substantiate', meaning: '実証する' },
      { key: '2', word: 'contradict',   meaning: '反証する' },
      { key: '3', word: 'fabricate',    meaning: '捏造する' },
      { key: '4', word: 'undermine',    meaning: '損なう' },
    ],
    answer: '1',
    explanation: '無実を「証明する」ために証拠を集めたという文脈から、1 substantiate「実証する」が正解。2 contradict「反証する」3 fabricate「捏造する」4 undermine「損なう」はいずれも無実の主張を支持しない方向で不適。',
    tags: [], addedAt: 1715000030000,
  },
];

// ============================================================
// ユーティリティ
// ============================================================
function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

function gradeLabel(grade) {
  if (grade === 'grade1') return '1級';

  return '2級';
}
function gradeStyle(grade) {
  if (grade === 'grade1') return { backgroundColor: C.g1Bg, color: C.g1Text };

  return { backgroundColor: C.g2Bg, color: C.g2Text };
}

// ============================================================
// Groq API 呼び出し
// ============================================================
async function callGroq({ apiKey, messages, maxTokens = 2000, model = GROQ_MODEL }) {
  const res = await fetch(GROQ_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, max_tokens: maxTokens, messages }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error: ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

async function extractFromImage({ base64, mediaType, apiKey }) {
  const prompt = `画像内の英語4択問題を全て見つけて、以下のJSON配列として返してください。

各問題のフォーマット:
{
  "dialogueLines": [{"speaker":"A","text":"..."}, {"speaker":"B","text":"..."}] または null（単文の場合）,
  "questionText": "単文の英文（dialogueLinesがnullの場合）" または null,
  "questionJa": "日本語訳（全話者分を\\nで区切る）",
  "choices": [{"key":"1","word":"英単語","meaning":"日本語意味"},{"key":"2",...},{"key":"3",...},{"key":"4",...}],
  "answer": "正解の番号（\"1\"〜\"4\"の文字列）",
  "explanation": "解説文（日本語）",
  "grade": "grade2"
}

注意:
- A/B対話形式はdialogueLines配列に、単文はquestionTextに入れる
- 空欄は (   ) のまま残す
- JSONのみ返答してください（コードブロック不要）`;

  const raw = await callGroq({
    apiKey,
    model: GROQ_VISION_MODEL,
    maxTokens: 3000,
    messages: [{
      role: 'user',
      content: [
        { type: 'image_url', image_url: { url: `data:${mediaType};base64,${base64}` } },
        { type: 'text', text: prompt },
      ],
    }],
  });
  return JSON.parse(raw.replace(/```json\n?|```/g, '').trim());
}

async function generateQuestions({ topic, grade, count, apiKey }) {
  const gl = gradeLabel(grade);
  const prompt = `英検${gl}レベルの英語4択語彙問題を${count}問作成してください。

テーマ: ${topic}

以下のJSON配列フォーマットで返してください:
[
  {
    "dialogueLines": [{"speaker":"A","text":"..."},{"speaker":"B","text":"..."}] または null,
    "questionText": "単文の場合のみ。空欄は (   ) で表記" または null,
    "questionJa": "日本語訳（\\nで行区切り）",
    "choices": [{"key":"1","word":"英単語","meaning":"日本語意味"},{"key":"2",...},{"key":"3",...},{"key":"4",...}],
    "answer": "1"〜"4"の正解番号,
    "explanation": "解説（日本語、なぜ正解かと各選択肢の意味）",
    "grade": "${grade}"
  }
]

- 対話形式と単文を混ぜて作成してください
- 選択肢は紛らわしいものを選んでください
- JSONのみ返答してください`;

  const raw = await callGroq({ apiKey, maxTokens: 3000, messages: [{ role: 'user', content: prompt }] });
  return JSON.parse(raw.replace(/```json\n?|```/g, '').trim());
}

// ============================================================
// APIキー設定モーダル
// ============================================================
function ApiKeyModal({ onClose, onSave }) {
  const [key, setKey] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: C.card, boxShadow: SH }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.aiBg }}>
            <KeyRound size={20} style={{ color: C.ai }} />
          </div>
          <div>
            <div className="font-bold" style={{ color: C.text }}>Groq APIキー設定</div>
            <div className="text-xs" style={{ color: C.textMuted }}>画像抽出・AI生成に必要です</div>
          </div>
          <button onClick={onClose} className="ml-auto p-1 rounded-lg" style={{ color: C.textMuted }}>
            <X size={18} />
          </button>
        </div>
        <input
          type="password" value={key} onChange={e => setKey(e.target.value)}
          placeholder="gsk_..."
          className="w-full rounded-xl px-4 py-3 text-sm mb-3 outline-none"
          style={{ border: `1px solid ${C.border}`, color: C.text }} />
        <p className="text-xs mb-4" style={{ color: C.textMuted }}>
          キーはこのデバイスのみに保存されます。<a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" style={{ color: C.ai }}>Groq Console</a>で取得できます。
        </p>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium"
            style={{ border: `1px solid ${C.border}`, color: C.textSub }}>キャンセル</button>
          <button onClick={() => { onSave(key.trim()); onClose(); }}
            disabled={!key.trim()}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: key.trim() ? C.ai : C.textMuted }}>保存</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// クロスアプリナビゲーション
// ============================================================
function AppNav({ onKeyClick, hasKey }) {
  const link = (href, label, active) => (
    <a href={href} target="_self"
      style={{
        display: 'flex', alignItems: 'center', gap: 3, padding: '5px 9px', borderRadius: 8,
        textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: active ? 700 : undefined,
        color: active ? '#6366f1' : '#64748b',
        background: active ? '#eef2ff' : 'transparent',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#f1f5f9'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
      {label}
    </a>
  );
  return (
    <nav className="sticky top-0 z-20 flex items-center h-11 px-2 gap-1 text-[13px] font-semibold"
      style={{ backgroundColor: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
      {link('https://kantanapp.github.io/eiken-portal/', '🎓 TOP', false)}
      <span style={{ color: '#e2e8f0' }}>|</span>
      {link('https://eiken-vocab2026423.web.app', '📚 単語', false)}
      {link('https://kantanapp.github.io/long-passage/', '📝 long-passage', false)}
      {link('https://kantanapp.github.io/summary/', '✍️ 要約', false)}
      <span style={{
        display: 'flex', alignItems: 'center', gap: 3, padding: '5px 9px', borderRadius: 8,
        color: '#6366f1', background: '#eef2ff', fontWeight: 700, whiteSpace: 'nowrap',
      }}>🔤 単語クイズ</span>
      <button onClick={onKeyClick} className="ml-auto p-2 rounded-xl"
        style={{ color: hasKey ? C.ai : C.textMuted, backgroundColor: hasKey ? C.aiBg : 'transparent' }}
        title="APIキー設定">
        <KeyRound size={18} />
      </button>
    </nav>
  );
}

// ============================================================
// 級バッジ
// ============================================================
function GradeBadge({ grade }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
      style={gradeStyle(grade)}>
      {gradeLabel(grade)}
    </span>
  );
}

// ============================================================
// 問題カード（一覧用）
// ============================================================
function QuizCard({ q, hist, onClick }) {
  const h = hist[q.id] || { attempts: 0, correct: 0 };
  const rate = h.attempts > 0 ? Math.round((h.correct / h.attempts) * 100) : null;
  const preview = q.dialogueLines
    ? q.dialogueLines[0].text.replace('(   )', '___')
    : q.questionText.replace('(   )', '___');

  return (
    <button onClick={onClick} className="w-full text-left rounded-2xl p-4 mb-3 flex items-start gap-3 transition-all active:scale-[0.98]"
      style={{ backgroundColor: C.card, boxShadow: SH, border: `1px solid ${C.borderLight}` }}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <GradeBadge grade={q.grade} />
          {q.dialogueLines && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: C.primaryBg, color: C.primary }}>対話</span>
          )}
          {rate !== null && (
            <span className="text-[10px] font-bold ml-auto"
              style={{ color: rate >= 70 ? C.ok : rate >= 40 ? '#D97706' : C.ng }}>
              {h.correct}/{h.attempts} 正解
            </span>
          )}
        </div>
        <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: C.text }}>
          {preview}
        </p>
      </div>
      <ChevronRight size={18} style={{ color: C.textMuted, flexShrink: 0, marginTop: 2 }} />
    </button>
  );
}

// ============================================================
// 問題画面
// ============================================================
function QuizScreen({ q, onAnswer, onBack }) {
  const [showJa, setShowJa] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleSelect(key) {
    if (selected !== null) return;
    setSelected(key);
    onAnswer(key);
  }

  function choiceState(key) {
    if (selected === null) return 'idle';
    if (key === q.answer) return 'correct';
    if (key === selected) return 'wrong';
    return 'idle';
  }

  function choiceStyle(state) {
    if (state === 'correct') return { backgroundColor: C.okBg, borderColor: C.ok, color: C.ok };
    if (state === 'wrong') return { backgroundColor: C.ngBg, borderColor: C.ng, color: C.ng };
    return { backgroundColor: C.card, borderColor: C.border, color: C.text };
  }

  return (
    <div className="flex-1 px-4 sm:px-6 py-4 max-w-2xl mx-auto w-full">
      <button onClick={onBack} className="flex items-center gap-1 text-sm mb-4"
        style={{ color: C.textMuted }}>
        <ArrowLeft size={16} /> 問題一覧
      </button>

      {/* 問題文 */}
      <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: C.card, boxShadow: SH }}>
        <div className="flex items-center gap-2 mb-3">
          <GradeBadge grade={q.grade} />
          {q.dialogueLines && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: C.primaryBg, color: C.primary }}>対話形式</span>
          )}
        </div>

        {q.dialogueLines ? (
          <div className="space-y-2">
            {q.dialogueLines.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: C.primaryBg, color: C.primary }}>
                  {line.speaker}
                </span>
                <p className="text-sm leading-relaxed pt-0.5" style={{ color: C.text }}>
                  {line.text.replace('(   )', '（　　　）')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-relaxed" style={{ color: C.text }}>
            {q.questionText.replace('(   )', '（　　　）')}
          </p>
        )}

        {/* 日本語訳 */}
        <button onClick={() => setShowJa(v => !v)}
          className="flex items-center gap-1 text-xs mt-3"
          style={{ color: C.textMuted }}>
          {showJa ? <EyeOff size={13} /> : <Eye size={13} />}
          日本語訳を{showJa ? '隠す' : '見る'}
        </button>
        {showJa && (
          <div className="mt-2 pt-2 text-xs leading-relaxed whitespace-pre-line"
            style={{ color: C.textSub, borderTop: `1px solid ${C.borderLight}` }}>
            {q.questionJa}
          </div>
        )}
      </div>

      {/* 選択肢 */}
      <div className="space-y-3">
        {q.choices.map(ch => {
          const state = choiceState(ch.key);
          return (
            <button key={ch.key} onClick={() => handleSelect(ch.key)}
              className="w-full rounded-2xl p-4 text-left flex items-center gap-3 transition-all active:scale-[0.98]"
              style={{ border: `2px solid`, ...choiceStyle(state), boxShadow: SH }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: state === 'idle' ? C.primaryBg : 'transparent',
                         color: state === 'idle' ? C.primary : 'inherit' }}>
                {ch.key}
              </span>
              <div className="flex-1">
                <div className="font-semibold text-sm">{ch.word}</div>
                {(selected !== null) && (
                  <div className="text-xs mt-0.5" style={{ color: state === 'idle' ? C.textMuted : 'inherit', opacity: 0.8 }}>
                    {ch.meaning}
                  </div>
                )}
              </div>
              {state === 'correct' && <CheckCircle size={20} style={{ color: C.ok, flexShrink: 0 }} />}
              {state === 'wrong' && <XCircle size={20} style={{ color: C.ng, flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* 解説（回答後） */}
      {selected !== null && (
        <div className="mt-4 rounded-2xl p-4"
          style={{ backgroundColor: selected === q.answer ? C.okBg : C.ngBg,
                   border: `1px solid ${selected === q.answer ? C.ok : C.ng}` }}>
          <div className="flex items-center gap-2 mb-2">
            {selected === q.answer
              ? <CheckCircle size={18} style={{ color: C.ok }} />
              : <XCircle size={18} style={{ color: C.ng }} />}
            <span className="font-bold text-sm"
              style={{ color: selected === q.answer ? C.ok : C.ng }}>
              {selected === q.answer ? '正解！' : `不正解（正解: ${q.answer}）`}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.text }}>
            {q.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 進捗画面
// ============================================================
function StatsView({ questions, hist }) {
  const grades = [
    { key: 'all', label: '全て' },
    { key: 'grade2', label: '2級' },
    { key: 'grade1', label: '1級' },
  ];

  function statsFor(qs) {
    const attempted = qs.filter(q => hist[q.id]?.attempts > 0);
    const correct = attempted.reduce((s, q) => s + (hist[q.id]?.correct || 0), 0);
    const total = attempted.reduce((s, q) => s + (hist[q.id]?.attempts || 0), 0);
    return { total: qs.length, attempted: attempted.length, correct, totalAttempts: total };
  }

  const weakQuestions = questions
    .filter(q => {
      const h = hist[q.id];
      return h && h.attempts >= 2 && h.correct / h.attempts < 0.6;
    })
    .sort((a, b) => {
      const ra = hist[a.id].correct / hist[a.id].attempts;
      const rb = hist[b.id].correct / hist[b.id].attempts;
      return ra - rb;
    })
    .slice(0, 10);

  return (
    <div className="px-4 sm:px-6 py-4 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-3 mb-6">
        {grades.map(g => {
          const qs = g.key === 'all' ? questions : questions.filter(q => q.grade === g.key);
          const s = statsFor(qs);
          if (qs.length === 0) return null;
          const pct = s.totalAttempts > 0 ? Math.round((s.correct / s.totalAttempts) * 100) : 0;
          return (
            <div key={g.key} className="rounded-2xl p-4" style={{ backgroundColor: C.card, boxShadow: SH }}>
              <div className="text-xs font-medium mb-1" style={{ color: C.textSub }}>{g.label}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: C.text }}>{pct}<span className="text-sm">%</span></div>
              <div className="w-full h-1.5 rounded-full mb-2" style={{ backgroundColor: C.borderLight }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: pct >= 70 ? C.ok : pct >= 40 ? C.orange : C.ng }} />
              </div>
              <div className="text-[11px]" style={{ color: C.textMuted }}>
                {s.attempted}/{s.total}問 挑戦済み
              </div>
            </div>
          );
        })}
      </div>

      {weakQuestions.length > 0 && (
        <>
          <div className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: C.text }}>
            <AlertCircle size={16} style={{ color: C.ng }} /> 苦手問題（正解率60%未満）
          </div>
          <div className="space-y-2">
            {weakQuestions.map(q => {
              const h = hist[q.id];
              const rate = Math.round((h.correct / h.attempts) * 100);
              const preview = q.dialogueLines
                ? q.dialogueLines[0].text.replace('(   )', '___')
                : q.questionText.replace('(   )', '___');
              return (
                <div key={q.id} className="rounded-xl p-3 flex items-center gap-3"
                  style={{ backgroundColor: C.card, boxShadow: SH }}>
                  <span className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: C.ngBg, color: C.ng }}>{rate}%</span>
                  <p className="text-xs line-clamp-1 flex-1" style={{ color: C.textSub }}>{preview}</p>
                  <GradeBadge grade={q.grade} />
                </div>
              );
            })}
          </div>
        </>
      )}

      {questions.length === 0 && (
        <div className="text-center py-16" style={{ color: C.textMuted }}>
          <BarChart3 size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">まだ問題がありません</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 問題追加画面
// ============================================================
function AddView({ apiKey, onShowKeyModal, onQuestionsAdded }) {
  const [tab, setTab] = useState('image');
  const [imgFiles, setImgFiles] = useState([]);
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState([]);
  const [extractErr, setExtractErr] = useState('');

  const [genTopic, setGenTopic] = useState('');
  const [genGrade, setGenGrade] = useState('grade2');
  const [genCount, setGenCount] = useState('5');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState([]);
  const [genErr, setGenErr] = useState('');

  const fileRef = useRef();
  const jsonRef = useRef();

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const url = e.target.result;
        const base64 = url.split(',')[1];
        const mediaType = file.type || 'image/jpeg';
        resolve({ base64, mediaType });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleExtract() {
    if (!apiKey) { onShowKeyModal(); return; }
    if (imgFiles.length === 0) return;
    setExtracting(true);
    setExtractErr('');
    try {
      const all = [];
      for (const file of imgFiles) {
        const { base64, mediaType } = await readFileAsBase64(file);
        const qs = await extractFromImage({ base64, mediaType, apiKey });
        all.push(...qs);
      }
      setExtracted(all.map((q, i) => ({ ...q, _tmpId: `tmp-${Date.now()}-${i}` })));
    } catch (e) {
      setExtractErr(`抽出エラー: ${e.message}`);
    } finally {
      setExtracting(false);
    }
  }

  async function handleGenerate() {
    if (!apiKey) { onShowKeyModal(); return; }
    if (!genTopic.trim()) return;
    setGenerating(true);
    setGenErr('');
    try {
      const qs = await generateQuestions({ topic: genTopic.trim(), grade: genGrade, count: parseInt(genCount), apiKey });
      setGenerated(qs.map((q, i) => ({ ...q, _tmpId: `tmp-${Date.now()}-${i}` })));
    } catch (e) {
      setGenErr(`生成エラー: ${e.message}`);
    } finally {
      setGenerating(false);
    }
  }

  function addQuestions(qs) {
    const newQs = qs.map(q => ({
      ...q,
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      source: q.source || 'user',
      tags: q.tags || [],
      addedAt: Date.now(),
    }));
    onQuestionsAdded(newQs);
    setExtracted([]);
    setGenerated([]);
    setImgFiles([]);
  }

  function handleJsonImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const qs = JSON.parse(ev.target.result);
        if (!Array.isArray(qs)) throw new Error('配列でありません');
        addQuestions(qs);
        alert(`${qs.length}問を追加しました`);
      } catch (err) {
        alert(`JSONエラー: ${err.message}`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const TABS = [
    { k: 'image', label: '📸 画像から抽出' },
    { k: 'generate', label: '✨ AI生成' },
    { k: 'json', label: '📁 JSON' },
  ];

  function PreviewList({ qs, onConfirm }) {
    if (qs.length === 0) return null;
    return (
      <div className="mt-4">
        <div className="text-sm font-bold mb-3" style={{ color: C.text }}>
          抽出結果（{qs.length}問）
        </div>
        <div className="space-y-3 mb-4">
          {qs.map((q, i) => (
            <div key={q._tmpId} className="rounded-xl p-3" style={{ backgroundColor: C.primaryBg, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold" style={{ color: C.primary }}>問{i + 1}</span>
                <GradeBadge grade={q.grade || 'grade2'} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.text }}>
                {q.dialogueLines
                  ? q.dialogueLines.map(l => `${l.speaker}: ${l.text}`).join(' / ')
                  : q.questionText}
              </p>
              <p className="text-xs mt-1" style={{ color: C.ok }}>正解: {q.answer} ({q.choices?.find(c => c.key === q.answer)?.word})</p>
            </div>
          ))}
        </div>
        <button onClick={() => onConfirm(qs)}
          className="w-full py-3 rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: C.primary }}>
          {qs.length}問を追加する
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-4 max-w-2xl mx-auto">
      {/* タブ */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.k} onClick={() => setTab(t.k)}
            className="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all"
            style={{
              backgroundColor: tab === t.k ? C.primary : C.card,
              color: tab === t.k ? '#fff' : C.textSub,
              boxShadow: SH,
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* タブ1: 画像抽出 */}
      {tab === 'image' && (
        <div>
          <p className="text-sm mb-4" style={{ color: C.textSub }}>
            Kindleのスクリーンショットをアップロードすると、AIが問題を自動で抽出します。
          </p>
          <button onClick={() => fileRef.current?.click()}
            className="w-full rounded-2xl p-6 flex flex-col items-center gap-3 mb-4 transition-all"
            style={{ border: `2px dashed ${C.border}`, backgroundColor: C.card }}>
            <Upload size={28} style={{ color: C.primary }} />
            <span className="text-sm font-medium" style={{ color: C.textSub }}>
              タップして画像を選択
            </span>
            {imgFiles.length > 0 && (
              <span className="text-xs" style={{ color: C.ok }}>{imgFiles.length}枚選択済み</span>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => setImgFiles(Array.from(e.target.files || []))} />

          {!apiKey && (
            <div className="rounded-xl p-3 mb-4 flex items-start gap-2"
              style={{ backgroundColor: C.aiBg, border: `1px solid ${C.ai}20` }}>
              <AlertCircle size={16} style={{ color: C.ai, flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs" style={{ color: C.ai }}>
                Claude APIキーが必要です。右上のキーアイコンから設定してください。
              </p>
            </div>
          )}

          <button onClick={handleExtract}
            disabled={imgFiles.length === 0 || extracting}
            className="w-full py-3 rounded-xl text-sm font-bold text-white mb-2 flex items-center justify-center gap-2"
            style={{ backgroundColor: imgFiles.length > 0 && !extracting ? C.ai : C.textMuted }}>
            <Sparkles size={16} />
            {extracting ? 'AIで抽出中...' : 'AIで問題を抽出'}
          </button>

          {extractErr && (
            <p className="text-xs p-3 rounded-xl mb-3" style={{ backgroundColor: C.ngBg, color: C.ng }}>{extractErr}</p>
          )}
          <PreviewList qs={extracted} onConfirm={addQuestions} />
        </div>
      )}

      {/* タブ2: AI生成 */}
      {tab === 'generate' && (
        <div>
          <p className="text-sm mb-4" style={{ color: C.textSub }}>
            テーマと級を指定すると、AIが新しい問題を生成します。
          </p>
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: C.textSub }}>テーマ</label>
              <input value={genTopic} onChange={e => setGenTopic(e.target.value)}
                placeholder="例: ビジネス英語、自然・環境、科学技術..."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ border: `1px solid ${C.border}`, color: C.text }} />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium block mb-1" style={{ color: C.textSub }}>級</label>
                <select value={genGrade} onChange={e => setGenGrade(e.target.value)}
                  className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                  style={{ border: `1px solid ${C.border}`, color: C.text, backgroundColor: C.card }}>
                  <option value="grade2">2級</option>

                  <option value="grade1">1級</option>
                </select>
              </div>
              <div className="w-24">
                <label className="text-xs font-medium block mb-1" style={{ color: C.textSub }}>問題数</label>
                <select value={genCount} onChange={e => setGenCount(e.target.value)}
                  className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                  style={{ border: `1px solid ${C.border}`, color: C.text, backgroundColor: C.card }}>
                  <option value="3">3問</option>
                  <option value="5">5問</option>
                  <option value="10">10問</option>
                </select>
              </div>
            </div>
          </div>

          {!apiKey && (
            <div className="rounded-xl p-3 mb-4 flex items-start gap-2"
              style={{ backgroundColor: C.aiBg, border: `1px solid ${C.ai}20` }}>
              <AlertCircle size={16} style={{ color: C.ai, flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs" style={{ color: C.ai }}>Claude APIキーが必要です。右上のキーアイコンから設定してください。</p>
            </div>
          )}

          <button onClick={handleGenerate}
            disabled={!genTopic.trim() || generating}
            className="w-full py-3 rounded-xl text-sm font-bold text-white mb-2 flex items-center justify-center gap-2"
            style={{ backgroundColor: genTopic.trim() && !generating ? C.ai : C.textMuted }}>
            <Sparkles size={16} />
            {generating ? 'AIで生成中...' : `${genCount}問を生成する`}
          </button>

          {genErr && (
            <p className="text-xs p-3 rounded-xl mb-3" style={{ backgroundColor: C.ngBg, color: C.ng }}>{genErr}</p>
          )}
          <PreviewList qs={generated} onConfirm={addQuestions} />
        </div>
      )}

      {/* タブ3: JSON */}
      {tab === 'json' && (
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.card, boxShadow: SH }}>
            <div className="flex items-center gap-2 mb-3">
              <Download size={18} style={{ color: C.primary }} />
              <span className="font-bold text-sm" style={{ color: C.text }}>エクスポート</span>
            </div>
            <p className="text-xs mb-3" style={{ color: C.textSub }}>
              追加した問題をJSONファイルとして保存します。他のデバイスでのインポートに使えます。
            </p>
            <button
              onClick={() => {
                const userQs = JSON.parse(localStorage.getItem('vocabquiz_questions') || '[]');
                const blob = new Blob([JSON.stringify(userQs, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = `vocab-quiz-${Date.now()}.json`; a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full py-2.5 rounded-xl text-sm font-medium"
              style={{ border: `1px solid ${C.border}`, color: C.textSub }}>
              <Download size={14} className="inline mr-1" />
              JSONをダウンロード
            </button>
          </div>

          <div className="rounded-2xl p-5" style={{ backgroundColor: C.card, boxShadow: SH }}>
            <div className="flex items-center gap-2 mb-3">
              <FileJson size={18} style={{ color: C.primary }} />
              <span className="font-bold text-sm" style={{ color: C.text }}>インポート</span>
            </div>
            <p className="text-xs mb-3" style={{ color: C.textSub }}>
              JSONファイルをアップロードして問題を追加します。
            </p>
            <button onClick={() => jsonRef.current?.click()}
              className="w-full py-2.5 rounded-xl text-sm font-medium"
              style={{ border: `1px solid ${C.border}`, color: C.textSub }}>
              <Upload size={14} className="inline mr-1" />
              JSONファイルを選択
            </button>
            <input ref={jsonRef} type="file" accept=".json,application/json" className="hidden"
              onChange={handleJsonImport} />
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// メインアプリ
// ============================================================
export default function App() {
  const [questions, setQuestions] = useState(() => {
    const userQs = loadLS('vocabquiz_questions', []);
    return [...SEED_DATA, ...userQs];
  });
  const [hist, setHist] = useState(() => loadLS('vocabquiz_history', {}));
  const [apiKey, setApiKey] = useState(() => loadLS('vocabquiz_apikey', ''));
  const [showKeyModal, setShowKeyModal] = useState(false);

  const [navTab, setNavTab] = useState('list');
  const [view, setView] = useState('list');
  const [curId, setCurId] = useState(null);
  const [gf, setGf] = useState('all');

  const [nextQueue, setNextQueue] = useState([]);

  const filtered = gf === 'all' ? questions : questions.filter(q => q.grade === gf);
  const cur = questions.find(q => q.id === curId);

  function saveApiKey(k) {
    setApiKey(k);
    saveLS('vocabquiz_apikey', k);
  }

  function recordAnswer(qId, isCorrect) {
    setHist(prev => {
      const h = prev[qId] || { attempts: 0, correct: 0, lastSeen: 0 };
      const next = { attempts: h.attempts + 1, correct: h.correct + (isCorrect ? 1 : 0), lastSeen: Date.now() };
      const updated = { ...prev, [qId]: next };
      saveLS('vocabquiz_history', updated);
      return updated;
    });
  }

  function goQuiz(id) {
    const pool = filtered.filter(q => q.id !== id);
    setNextQueue(pool.sort(() => Math.random() - 0.5).slice(0, 10).map(q => q.id));
    setCurId(id);
    setView('quiz');
  }

  function handleAnswer(key) {
    if (!cur) return;
    recordAnswer(cur.id, key === cur.answer);
  }

  function goNext() {
    if (nextQueue.length > 0) {
      const [next, ...rest] = nextQueue;
      setNextQueue(rest);
      setCurId(next);
    } else {
      setView('list');
      setCurId(null);
    }
  }

  function goBack() {
    setView('list');
    setCurId(null);
  }

  function handleQuestionsAdded(newQs) {
    const userQs = loadLS('vocabquiz_questions', []);
    const merged = [...userQs, ...newQs];
    saveLS('vocabquiz_questions', merged);
    setQuestions([...SEED_DATA, ...merged]);
    setNavTab('list');
    alert(`${newQs.length}問を追加しました！`);
  }

  const GRADES = [
    { k: 'all', label: '全て' },
    { k: 'grade2', label: '2級' },
    { k: 'grade1', label: '1級' },
  ];

  const NAV = [
    { k: 'list', label: '問題一覧', I: BookOpen },
    { k: 'stats', label: '進捗', I: BarChart3 },
    { k: 'add', label: '問題追加', I: PlusCircle },
  ];

  return (
    <div className="min-h-screen pb-24"
      style={{
        backgroundColor: C.bg,
        fontFamily: '"Noto Sans JP",-apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN",sans-serif',
        color: C.text,
      }}>

      <AppNav onKeyClick={() => setShowKeyModal(true)} hasKey={!!apiKey} />

      {showKeyModal && <ApiKeyModal onClose={() => setShowKeyModal(false)} onSave={saveApiKey} />}

      {/* ヘッダー（一覧・進捗・追加画面） */}
      {view === 'list' && (
        <header className="sticky top-11 z-10 px-4 sm:px-6 py-3"
          style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.borderLight}` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: C.primary }}>英</div>
            <span className="text-base font-bold" style={{ color: C.text }}>
              {navTab === 'list' ? '問題一覧' : navTab === 'stats' ? '進捗' : '問題追加'}
            </span>
          </div>
          {navTab === 'list' && (
            <div className="flex gap-2 overflow-x-auto">
              {GRADES.map(g => {
                const cnt = g.k === 'all' ? questions.length : questions.filter(q => q.grade === g.k).length;
                if (cnt === 0 && g.k !== 'all') return null;
                return (
                  <button key={g.k} onClick={() => setGf(g.k)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-all"
                    style={{
                      backgroundColor: gf === g.k ? C.primary : C.card,
                      color: gf === g.k ? '#fff' : C.textSub,
                      boxShadow: SH,
                    }}>
                    {g.label} ({cnt})
                  </button>
                );
              })}
              <button onClick={() => {
                const pool = [...filtered].sort(() => Math.random() - 0.5);
                if (pool.length > 0) goQuiz(pool[0].id);
              }}
                className="ml-auto px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 flex items-center gap-1"
                style={{ backgroundColor: C.primaryBg, color: C.primary }}>
                <Shuffle size={12} /> ランダム
              </button>
            </div>
          )}
        </header>
      )}

      {/* メインコンテンツ */}
      {view === 'quiz' && cur ? (
        <QuizScreen q={cur} onAnswer={handleAnswer} onBack={goBack} />
      ) : navTab === 'list' ? (
        <div className="px-4 sm:px-6 py-4 max-w-2xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16" style={{ color: C.textMuted }}>
              <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">問題がありません</p>
            </div>
          ) : (
            filtered.map(q => (
              <QuizCard key={q.id} q={q} hist={hist} onClick={() => goQuiz(q.id)} />
            ))
          )}
        </div>
      ) : navTab === 'stats' ? (
        <StatsView questions={questions} hist={hist} />
      ) : (
        <AddView apiKey={apiKey} onShowKeyModal={() => setShowKeyModal(true)} onQuestionsAdded={handleQuestionsAdded} />
      )}

      {/* 問題画面のフッターボタン */}
      {view === 'quiz' && (
        <div className="fixed bottom-0 left-0 right-0 px-4 py-3 flex gap-3"
          style={{ backgroundColor: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)', borderTop: `1px solid ${C.borderLight}` }}>
          <button onClick={goBack}
            className="flex-1 py-3 rounded-xl text-sm font-medium"
            style={{ border: `1px solid ${C.border}`, color: C.textSub }}>
            一覧に戻る
          </button>
          <button onClick={goNext}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: C.primary }}>
            次の問題 <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* ボトムナビ（クイズ中は非表示） */}
      {view !== 'quiz' && (
        <nav className="fixed bottom-0 left-0 right-0 grid grid-cols-3"
          style={{ backgroundColor: C.card, borderTop: `1px solid ${C.borderLight}`, boxShadow: '0 -1px 3px rgba(15,23,42,0.03)' }}>
          {NAV.map(({ k, label, I }) => {
            const active = navTab === k;
            return (
              <button key={k} onClick={() => { setNavTab(k); if (view !== 'list') setView('list'); }}
                className="flex flex-col items-center justify-center py-3 transition-colors relative"
                style={{ color: active ? C.primary : C.textMuted }}>
                <I size={22} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[11px] font-medium mt-1">{label}</span>
                {active && <span className="absolute bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: C.primary }} />}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
