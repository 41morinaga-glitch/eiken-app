import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen, BarChart3, Bookmark, PlusCircle,
  ArrowLeft, Tag, Eye, EyeOff, RotateCcw,
  Sparkles, ChevronDown, ChevronUp, AlertCircle, Settings, X, KeyRound
} from 'lucide-react';

// ============================================================
// 問題データ
// ============================================================
const problemsData = {
  grade2: [
    {
      id: 'g2-1', label: 'オリジナル No.1', type: '要約問題 A',
      title: 'Social Media and Young People', titleJa: 'SNSと若者',
      passage: `In recent years, social media has become a major part of many young people's daily lives. Most teenagers in Japan use platforms like Instagram or X to communicate with their friends and share their interests.

What are the good points of using social media? First, young people can easily stay in touch with friends, even those who live far away. They can share photos, videos, and messages instantly. In addition, social media helps users discover new hobbies and learn about events happening in their community.

On the other hand, there are also some problems. Some teenagers spend too many hours looking at their phones, which can affect their studies and sleep. Moreover, by comparing themselves with others online, some users may feel unhappy about their own lives.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Social media has become an important part of many young people's lives. It allows them to keep in contact with friends easily and discover new interests or local events. However, it also causes some problems, such as taking up too much time and making some users feel bad when they compare themselves with others.`,
      sampleWordCount: 51,
      structure: '①導入（SNSは若者の生活の一部）→ ②利点（友人との連絡・新しい発見）→ ③欠点（時間の使いすぎ・他人との比較）',
      keyPoints: [
        '第1段落：「SNSが若者の生活の重要な一部になっている」という導入を簡潔にまとめる',
        '第2段落：利点を2点（①遠くの友人とも連絡が取れる、②新しい興味・地域イベントの発見）',
        '第3段落：欠点を2点（①使いすぎで勉強や睡眠に影響、②他人と比較して落ち込む）',
        '逆接の接続詞（However, On the other hand）で利点と欠点をつなぐ',
      ],
      paraphraseTips: [
        { original: "major part of many young people's daily lives", alt: "an important part of young people's lives" },
        { original: 'stay in touch with friends', alt: 'keep in contact with friends' },
        { original: 'discover new interests', alt: 'find new hobbies' },
        { original: 'spend too many hours looking at their phones', alt: 'use it for too long / spend too much time on it' },
      ],
      usefulPhrases: [
        'allows them to do ~ （～することを可能にする）',
        'However, it also causes ~ （しかし、～も引き起こす）',
        'such as A and B （AやBのような）',
      ],
    },
    {
      id: 'g2-2', label: 'オリジナル No.2', type: '要約問題 A',
      title: 'Cooking at Home vs Eating Out', titleJa: '自炊と外食',
      passage: `These days, many people in Japan have busy lives, and they often choose between cooking meals at home and eating at restaurants.

What are the advantages of cooking at home? People can save money because restaurant meals usually cost more than home-cooked food. Moreover, when people prepare their own meals, they can choose fresh ingredients and control the amount of salt and sugar in their food, which is good for their health.

However, cooking at home also has some difficulties. After a long day of work, many people feel too tired to cook a meal from the beginning. Also, some people do not have the cooking skills needed to make delicious dishes, so they prefer to eat at restaurants where professional chefs prepare the food.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Many busy people choose between cooking at home and eating out. Cooking at home has benefits because it costs less and allows people to use healthy ingredients. On the other hand, it can be hard for tired workers to prepare meals after work, and people without cooking skills often prefer restaurants where professionals make the food.`,
      sampleWordCount: 54,
      structure: '①導入（自炊と外食の選択）→ ②自炊の利点（安い・健康的）→ ③自炊の難しさ（疲労・スキル不足）',
      keyPoints: [
        '第1段落：「忙しい人々が自炊と外食を選んでいる」という状況を導入として書く',
        '第2段落：自炊の利点（①費用が安い、②健康的な食材を選べる）を簡潔に',
        '第3段落：自炊の難しさ（①仕事で疲れている、②料理スキルが必要）',
        '比較の構造（利点 vs 難しさ）を意識する',
      ],
      paraphraseTips: [
        { original: 'cost more than home-cooked food', alt: 'restaurants are more expensive / costs less to cook at home' },
        { original: 'choose fresh ingredients', alt: 'use healthy ingredients' },
        { original: 'feel too tired to cook', alt: 'be too exhausted to prepare meals' },
        { original: 'do not have the cooking skills', alt: 'lack cooking ability / cannot cook well' },
      ],
      usefulPhrases: [
        'it costs less to ~ （～する方が安い）',
        'On the other hand, ~ （一方で）',
        'people without ~ （～を持っていない人々）',
      ],
    },
    {
      id: 'g2-3', label: 'オリジナル No.3', type: '要約問題 B',
      title: 'Paper Books and E-books', titleJa: '紙の本と電子書籍',
      passage: `Reading is a popular hobby for many people. Today, readers can choose between traditional paper books and electronic books, which are read on devices such as tablets or smartphones.

There are several reasons why some people prefer e-books. E-books take up no physical space, so readers can carry hundreds of books in one small device when they travel. In addition, e-books are often cheaper than paper books, and readers can buy them and start reading right away without going to a bookstore.

Still, paper books continue to have many fans. Some people enjoy the feeling of holding a book in their hands and turning its pages. Moreover, looking at a screen for a long time can cause eye strain, but reading paper books does not have this problem.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Today, readers can choose between paper books and e-books. E-books are popular because they save space, are usually cheaper, and can be bought instantly. However, many people still prefer paper books because they like the experience of turning pages, and reading on a screen for a long time can hurt their eyes.`,
      sampleWordCount: 51,
      structure: '①導入（紙の本と電子書籍の選択）→ ②電子書籍の利点（省スペース・安い・即購入）→ ③紙の本の利点（手触り・目への優しさ）',
      keyPoints: [
        '第1段落：「読者は紙の本と電子書籍から選べる」という導入',
        '第2段落：電子書籍の利点を3つ（①省スペース、②安い、③すぐ買える）',
        '第3段落：紙の本の利点（①ページをめくる感触、②目が疲れない）',
        '対比の構造をHowever や Stillで明確にする',
      ],
      paraphraseTips: [
        { original: 'take up no physical space', alt: 'save space / do not need much space' },
        { original: 'start reading right away', alt: 'be bought instantly / read immediately' },
        { original: 'feeling of holding a book', alt: 'experience of holding a book' },
        { original: 'cause eye strain', alt: 'hurt their eyes / make eyes tired' },
      ],
      usefulPhrases: [
        'are popular because ~ （～という理由で人気がある）',
        'However, many people still prefer ~ （しかし、依然として～を好む人が多い）',
        'the experience of ~ing （～する体験）',
      ],
    },
  ],
  grade1: [
    {
      id: 'g1-1', label: 'オリジナル No.1', type: '要約問題 A',
      title: 'Aging Populations and the Workforce', titleJa: '高齢化社会と労働力',
      passage: `Many developed nations, including Japan and several European countries, are confronting a profound demographic shift as their populations age at an unprecedented pace. The proportion of citizens over the age of 65 is rising steadily while birthrates continue to decline, creating economic and social challenges that governments are struggling to address.

One of the most pressing consequences of this demographic transformation is a shrinking workforce. Industries ranging from manufacturing to healthcare are finding it increasingly difficult to recruit enough workers, and this labor shortage poses a serious threat to economic productivity. Furthermore, the financial burden on younger generations is growing heavier, as fewer working-age adults must support an expanding population of retirees through tax contributions to pension and healthcare systems.

To address these challenges, governments are implementing various strategies. Some nations are raising the retirement age and providing incentives that encourage older citizens to remain in the workforce longer. Others are accelerating the adoption of automation and artificial intelligence to compensate for the lack of human workers, particularly in sectors such as agriculture and elder care. However, critics caution that these solutions have limitations, as extending working years may not be realistic for physically demanding jobs, and excessive reliance on technology could deepen social isolation among the elderly.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Many developed countries, particularly Japan, are experiencing rapid population aging combined with falling birthrates, which is creating serious economic and social difficulties. As a result, the workforce is shrinking, threatening productivity in numerous industries, while younger generations face heavier financial burdens to support a growing retired population. In response to this problem, governments are encouraging older citizens to keep working by raising the retirement age, and they are promoting automation in fields such as agriculture and elder care. Nevertheless, these measures have drawbacks, since extended employment may be impractical for physically demanding jobs, and overdependence on technology could worsen loneliness among elderly people.`,
      sampleWordCount: 102,
      structure: '①現状（高齢化と少子化）→ ②結果（労働力不足・若年層の負担）→ ③政府の対応（定年延長・自動化）+ 課題/懸念',
      keyPoints: [
        '第1段落：1文で「先進国（特に日本）で急速な高齢化と少子化が進み、社会経済的問題を生んでいる」とまとめる',
        '第2段落：1文で「労働力不足が生産性を脅かし、若年層の負担も増加」と要約',
        '第3段落：英検1級では2文で「政府の対応（定年延長・AI/自動化）」と「その限界」の両方に言及',
        'ディスコースマーカー（As a result, In response to this problem, Nevertheless等）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'profound demographic shift', alt: 'rapid population aging / serious change in population structure' },
        { original: 'shrinking workforce', alt: 'declining number of workers' },
        { original: 'financial burden on younger generations', alt: 'heavier costs for young people' },
        { original: 'raising the retirement age', alt: 'extending working years' },
        { original: 'excessive reliance on technology', alt: 'overdependence on technology' },
      ],
      usefulPhrases: [
        'As a result, ~ （その結果）',
        'In response to this problem, ~ （この問題に対処するため）',
        'Nevertheless, ~ （それにもかかわらず）',
        'these measures have drawbacks ~ （これらの対策には欠点がある）',
      ],
    },
    {
      id: 'g1-2', label: 'オリジナル No.2', type: '要約問題 B',
      title: 'Urban Heat and Green Infrastructure', titleJa: '都市の熱と緑のインフラ',
      passage: `As global temperatures continue to climb, major cities around the world are increasingly grappling with a phenomenon known as the urban heat island effect, in which densely built-up areas become significantly hotter than the surrounding rural regions. This issue is particularly acute during summer months, when concrete buildings and asphalt roads absorb solar radiation and release it slowly, causing nighttime temperatures to remain uncomfortably high.

The consequences of this temperature disparity extend far beyond mere discomfort. Elevated urban temperatures contribute to higher rates of heatstroke and other heat-related illnesses, and they place tremendous strain on energy infrastructure as residents rely heavily on air conditioning. The increased electricity demand often leads to higher carbon emissions, ironically making climate change worse and creating a vicious cycle that exacerbates the very problem cities are attempting to solve.

In response to these challenges, urban planners and engineers are turning to so-called green infrastructure, which incorporates natural elements into city design. Vertical gardens on building walls, rooftop greenery, expanded tree canopies along streets, and constructed wetlands all help cool the surrounding air through shade and evaporation. However, implementing such projects requires considerable investment, long-term maintenance, and political support, and not all municipalities have the financial resources or public consensus needed to pursue them on a meaningful scale.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Major cities worldwide are facing the urban heat island effect, where built-up areas become considerably hotter than rural surroundings, especially during summer because concrete and asphalt absorb and slowly release heat. This temperature gap leads to more cases of heatstroke, increases energy consumption for cooling, and raises carbon emissions, which paradoxically worsens climate change. To tackle this problem, planners are introducing green infrastructure such as vertical gardens, rooftop plants, more street trees, and wetlands to cool the air naturally. Unfortunately, these solutions demand significant investment, ongoing upkeep, and political backing, which many cities cannot easily provide.`,
      sampleWordCount: 96,
      structure: '①現状（ヒートアイランド現象）→ ②結果（健康被害・エネルギー消費・温暖化の悪循環）→ ③対策（グリーンインフラ）+ 課題',
      keyPoints: [
        '第1段落：1文で「都市部のヒートアイランド現象（コンクリートとアスファルトが熱を蓄積）」を要約',
        '第2段落：1文で「熱中症の増加、エアコン使用増、CO2排出増による悪循環」をまとめる',
        '第3段落：英検1級では2文で「緑のインフラの説明」と「その課題（投資・維持・政治的合意）」を書く',
        '皮肉な構造はparadoxically等で表現するのが効果的',
      ],
      paraphraseTips: [
        { original: 'urban heat island effect', alt: '術語なのでそのまま使用可' },
        { original: 'densely built-up areas', alt: 'urban areas / cities' },
        { original: 'tremendous strain on energy infrastructure', alt: 'increases energy consumption' },
        { original: 'considerable investment, long-term maintenance, and political support', alt: 'significant investment, ongoing upkeep, and political backing' },
      ],
      usefulPhrases: [
        'This temperature gap leads to ~ （この気温差は～につながる）',
        'paradoxically worsens ~ （皮肉にも～を悪化させる）',
        'To tackle this problem, ~ （この問題に取り組むため）',
        'Unfortunately, these solutions demand ~ （残念ながら、これらの解決策は～を必要とする）',
      ],
    },
  ],
};

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
  orange: '#F59E0B', ok: '#10B981', ng: '#EF4444',
  ai: '#8B5CF6', aiBg: '#F5F3FF', aiH: '#7C3AED',
};
const SH = '0 1px 3px rgba(15,23,42,0.05),0 1px 2px rgba(15,23,42,0.04)';

// ============================================================
// AI 添削関数
// ============================================================
async function fetchCorrection({ passage, sampleAnswer, userText, wordCount, targetMin, targetMax, grade, apiKey }) {
  const gl = grade === 'grade1' ? '英検1級' : '英検2級';
  const prompt = `あなたは${gl}ライティング添削の専門家です。以下の受験者の英文要約を採点・添削してください。

【元の英文】
${passage}

【模範解答（参考）】
${sampleAnswer}

【受験者の解答】
${userText}

【目標語数】${targetMin}〜${targetMax}語（実際：${wordCount}語）

英検の採点基準（内容・構成・語彙・文法、各0〜4点）で評価してください。
以下のJSON形式のみで返してください（マークダウン記号不要）:

{
  "totalScore": <合計 0-16>,
  "overallComment": "<全体コメント（日本語、2〜3文、励ましの言葉含む）>",
  "categories": {
    "content":    {"score":<0-4>,"feedback":"<日本語フィードバック>"},
    "structure":  {"score":<0-4>,"feedback":"<日本語フィードバック>"},
    "vocabulary": {"score":<0-4>,"feedback":"<日本語フィードバック>"},
    "grammar":    {"score":<0-4>,"feedback":"<日本語フィードバック>"}
  },
  "corrections": [
    {"original":"<受験者の英文から誤りor改善箇所>","corrected":"<修正後の英語>","reason":"<修正理由（日本語）>"}
  ],
  "improvedSummary": "<受験者の文体を活かしつつ改善した英文要約（英語のみ）>"
}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 1500 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error: ${res.status}`);
  }

  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
}

// ============================================================
// サブコンポーネント
// ============================================================
function GradeBadge({ grade }) {
  const g1 = grade === 'grade1';
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
      style={{ backgroundColor: g1 ? C.g1Bg : C.g2Bg, color: g1 ? C.g1Text : C.g2Text }}>
      {g1 ? '1級' : '2級'}
    </span>
  );
}

function ScoreMeter({ score, max = 4 }) {
  const fills = ['#FCA5A5', '#FCD34D', '#6EE7B7', '#93C5FD', '#C4B5FD'];
  const texts = ['#DC2626', '#D97706', '#059669', '#2563EB', '#7C3AED'];
  const idx = Math.min(score, 4);
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold tabular-nums" style={{ color: texts[idx] }}>{score}</span>
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-bold" style={{ color: texts[idx] }}>/{max}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: max }).map((_, i) => (
            <div key={i} className="w-3 h-1.5 rounded-sm"
              style={{ backgroundColor: i < score ? fills[idx] : C.borderLight }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APIキー設定モーダル
// ============================================================
function ApiKeyModal({ onClose, onSave }) {
  const [key, setKey] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: C.card }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: C.aiBg }}>
            <KeyRound size={20} style={{ color: C.ai }} />
          </div>
          <div>
            <h2 className="font-bold text-base" style={{ color: C.text }}>Google AI APIキーの設定</h2>
            <p className="text-xs" style={{ color: C.textMuted }}>AI添削機能を使うために必要です（無料）</p>
          </div>
          <button onClick={onClose} className="ml-auto" style={{ color: C.textMuted }}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 rounded-xl mb-4 text-sm" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
          <p className="font-bold mb-1">⚠️ セキュリティについて</p>
          <p className="leading-relaxed">APIキーはこのデバイスのみに保存されます。第三者と共有するサービスには設定しないでください。個人学習用としてご使用ください。</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" style={{ color: C.text }}>
            APIキー
          </label>
          <input
            type="password"
            value={key}
            onChange={e => setKey(e.target.value)}
            placeholder="AIza..."
            className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
            style={{ border: `1px solid ${C.border}`, color: C.text, backgroundColor: C.bg }}
            onFocus={e => e.target.style.borderColor = C.primary}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          <p className="text-xs mt-2" style={{ color: C.textMuted }}>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
              style={{ color: C.primary }}>aistudio.google.com</a> で無料APIキーを取得できます
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-bold transition-colors"
            style={{ backgroundColor: C.borderLight, color: C.textSub }}>
            キャンセル
          </button>
          <button
            onClick={() => { if (key.trim()) { onSave(key.trim()); onClose(); } }}
            disabled={!key.trim()}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40"
            style={{ backgroundColor: C.ai }}>
            保存する
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AI添削結果パネル
// ============================================================
function CorrectionPanel({ result, onClose }) {
  const [showImproved, setShowImproved] = useState(false);
  const pct = Math.round((result.totalScore / 16) * 100);
  const scoreColor = pct >= 75 ? C.ok : pct >= 50 ? C.orange : C.ng;
  const catLabels = { content: '内容', structure: '構成', vocabulary: '語彙', grammar: '文法' };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.card, boxShadow: SH, border: `2px solid ${C.ai}` }}>
      <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: C.aiBg, borderBottom: '1px solid #DDD6FE' }}>
        <Sparkles size={18} style={{ color: C.ai }} />
        <span className="font-bold text-sm" style={{ color: C.ai }}>AI 添削レポート</span>
        <span className="text-xs font-medium ml-1" style={{ color: '#A78BFA' }}>powered by Claude</span>
        <button onClick={onClose} className="ml-auto text-xs font-bold px-3 py-1.5 rounded-lg"
          style={{ backgroundColor: '#DDD6FE', color: C.ai }}>閉じる</button>
      </div>

      <div className="p-6 sm:p-7 space-y-5">
        <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: C.bg }}>
          <div className="text-center min-w-[60px]">
            <div className="text-4xl font-bold tabular-nums" style={{ color: scoreColor }}>{result.totalScore}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: C.textMuted }}>/ 16点</div>
          </div>
          <div className="flex-1">
            <div className="h-2.5 rounded-full overflow-hidden mb-3" style={{ backgroundColor: C.border }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: scoreColor }} />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.text }}>{result.overallComment}</p>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: C.ai }}>採点内訳</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(result.categories).map(([cat, val]) => (
              <div key={cat} className="p-4 rounded-xl" style={{ backgroundColor: C.bg }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="font-bold text-sm" style={{ color: C.text }}>{catLabels[cat] || cat}</span>
                  <ScoreMeter score={val.score} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: C.textSub }}>{val.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {result.corrections?.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: C.ai }}>修正ポイント</div>
            <div className="space-y-3">
              {result.corrections.map((c, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: C.bg }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    <div>
                      <div className="text-[10px] font-bold mb-1.5" style={{ color: C.ng, letterSpacing: '0.08em' }}>BEFORE</div>
                      <div className="text-sm p-2.5 rounded-lg italic leading-relaxed" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>{c.original}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold mb-1.5" style={{ color: C.ok, letterSpacing: '0.08em' }}>AFTER</div>
                      <div className="text-sm p-2.5 rounded-lg italic leading-relaxed" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>{c.corrected}</div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: C.textSub }}>💡 {c.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {result.improvedSummary && (
          <div>
            <button onClick={() => setShowImproved(!showImproved)}
              className="w-full flex items-center justify-between p-4 rounded-xl font-bold text-sm transition-colors"
              style={{ backgroundColor: C.aiBg, color: C.ai }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EDE9FE'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = C.aiBg}>
              <span>✨ あなたの文を改善した英文を見る</span>
              {showImproved ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {showImproved && (
              <div className="mt-2 p-5 rounded-xl text-[15px] leading-[1.9] italic"
                style={{ backgroundColor: C.bg, color: C.text, borderLeft: `3px solid ${C.ai}` }}>
                {result.improvedSummary}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 問題カード
// ============================================================
function ProblemCard({ problem, drafted, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full text-left p-6 rounded-2xl transition-all hover:-translate-y-0.5 active:scale-[0.99]"
      style={{ backgroundColor: C.card, boxShadow: SH }}>
      <div className="flex items-center gap-3 mb-4">
        <GradeBadge grade={problem.grade} />
        <span className="text-xs font-medium" style={{ color: C.textMuted }}>{problem.label}</span>
        <div className="ml-auto">
          <Tag size={16} style={{ color: drafted ? C.primary : C.orange, fill: drafted ? C.primary : C.orange, opacity: 0.85 }} />
        </div>
      </div>
      <div className="text-sm font-medium mb-2" style={{ color: C.textMuted }}>{problem.type}</div>
      <div className="text-lg font-bold leading-snug mb-1" style={{ color: C.text }}>{problem.title}</div>
      <div className="text-sm mb-5" style={{ color: C.textSub }}>{problem.titleJa}</div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.borderLight }}>
          <div className="h-full rounded-full" style={{ width: drafted ? '100%' : '0%', backgroundColor: C.primary }} />
        </div>
        <span className="text-xs font-medium" style={{ color: C.textMuted }}>{problem.targetMin}–{problem.targetMax}語</span>
      </div>
    </button>
  );
}

// ============================================================
// 進捗ビュー
// ============================================================
function ProgressView({ all, draftedN, answers, apiKey, setShowKeyModal }) {
  const g2t = problemsData.grade2.length, g1t = problemsData.grade1.length;
  const g2d = problemsData.grade2.filter(p => (answers[p.id] || '').trim()).length;
  const g1d = problemsData.grade1.filter(p => (answers[p.id] || '').trim()).length;
  const tot = all.length;
  return (
    <div className="space-y-4">
      {[
        { l: '全体の進捗', d: draftedN, t: tot, c: C.primary },
        { l: '英検2級', d: g2d, t: g2t, c: C.g2Text, g: 'grade2' },
        { l: '英検1級', d: g1d, t: g1t, c: C.g1Text, g: 'grade1' },
      ].map((r, i) => (
        <div key={i} className="p-6 rounded-2xl" style={{ backgroundColor: C.card, boxShadow: SH }}>
          <div className="flex items-center gap-3 mb-4">
            {r.g && <GradeBadge grade={r.g} />}
            <span className="font-bold" style={{ color: C.text }}>{r.l}</span>
            <span className="ml-auto text-sm font-medium" style={{ color: C.textMuted }}>{r.d}/{r.t}問</span>
            <span className="text-xl font-bold" style={{ color: r.c }}>
              {r.t > 0 ? Math.round((r.d / r.t) * 100) : 0}%
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: C.borderLight }}>
            <div className="h-full rounded-full" style={{ width: `${r.t > 0 ? (r.d / r.t) * 100 : 0}%`, backgroundColor: r.c }} />
          </div>
        </div>
      ))}

      <div className="p-6 rounded-2xl" style={{ backgroundColor: C.card, boxShadow: SH }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.aiBg }}>
            <KeyRound size={18} style={{ color: C.ai }} />
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: C.text }}>AI添削 APIキー</div>
            <div className="text-xs" style={{ color: C.textMuted }}>
              {apiKey ? '✓ 設定済み' : '未設定'}
            </div>
          </div>
          <button onClick={() => setShowKeyModal(true)}
            className="ml-auto px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: C.ai }}>
            {apiKey ? '変更' : '設定する'}
          </button>
        </div>
        {!apiKey && (
          <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
            Google AI APIキー（無料）を設定すると、書いた要約をAIが採点・添削できます。
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// リストビュー
// ============================================================
function ListView({ navTab, gf, setGf, filtered, answers, goDetail, all, draftedN, apiKey, setShowKeyModal }) {
  if (navTab === 'progress') return (
    <div className="px-4 sm:px-6 py-6 max-w-5xl mx-auto">
      <ProgressView all={all} draftedN={draftedN} answers={answers} apiKey={apiKey} setShowKeyModal={setShowKeyModal} />
    </div>
  );
  if (navTab === 'add') return (
    <div className="px-4 sm:px-6 py-6 max-w-5xl mx-auto">
      <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: C.card, boxShadow: SH }}>
        <PlusCircle size={48} className="mx-auto mb-4" style={{ color: C.primary }} />
        <div className="text-lg font-bold mb-2" style={{ color: C.text }}>問題追加機能</div>
        <div className="text-sm" style={{ color: C.textSub, lineHeight: 1.7 }}>現在は組み込みの練習問題のみご利用いただけます。</div>
      </div>
    </div>
  );
  return (
    <div className="px-4 sm:px-6 py-6 max-w-5xl mx-auto">
      {navTab === 'list' && (
        <div className="p-4 sm:p-5 rounded-2xl mb-5 flex flex-wrap items-center gap-3"
          style={{ backgroundColor: C.card, boxShadow: SH }}>
          <span className="text-sm font-medium" style={{ color: C.textMuted }}>級</span>
          {[{ k: 'all', l: '全て' }, { k: 'grade1', l: '1級' }, { k: 'grade2', l: '2級' }].map(o => {
            const active = gf === o.k;
            return (
              <button key={o.k} onClick={() => setGf(o.k)}
                className="px-4 py-1.5 rounded-lg text-sm font-bold transition-colors"
                style={{ backgroundColor: active ? C.primary : C.borderLight, color: active ? '#FFF' : C.textSub }}>
                {o.l}
              </button>
            );
          })}
          <span className="ml-auto text-sm font-medium" style={{ color: C.textMuted }}>{filtered.length}件</span>
        </div>
      )}
      {filtered.length === 0
        ? (
          <div className="p-10 rounded-2xl text-center" style={{ backgroundColor: C.card, boxShadow: SH }}>
            <Bookmark size={40} className="mx-auto mb-3" style={{ color: C.textMuted }} />
            <div className="text-base font-medium" style={{ color: C.textSub }}>
              {navTab === 'bookmark' ? 'ブックマークした問題はまだありません' : '該当する問題がありません'}
            </div>
          </div>
        )
        : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filtered.map(p => (
              <ProblemCard key={p.id} problem={p}
                drafted={(answers[p.id] || '').trim().length > 0}
                onClick={() => goDetail(p.id)} />
            ))}
          </div>
        )}
    </div>
  );
}

// ============================================================
// 詳細ビュー
// ============================================================
function DetailView({
  cur, goBack, bookmarks, toggleBookmark,
  txt, wc, inRange, over, updateAns,
  correcting, corrResult, setCorrResult, corrErr, doCorrect,
  setShowKeyModal, showAns, setShowAns, ansTab, setAnsTab,
}) {
  if (!cur) return null;
  const bm = !!bookmarks[cur.id];
  return (
    <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto space-y-4">
      <button onClick={goBack} className="flex items-center gap-2 text-sm font-medium" style={{ color: C.textSub }}>
        <ArrowLeft size={18} />問題一覧に戻る
      </button>

      <div className="p-6 sm:p-7 rounded-2xl" style={{ backgroundColor: C.card, boxShadow: SH }}>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <GradeBadge grade={cur.grade} />
          <span className="text-xs font-medium" style={{ color: C.textMuted }}>{cur.label} · {cur.type}</span>
          <button onClick={() => toggleBookmark(cur.id)} className="ml-auto p-1.5 rounded-lg transition-colors"
            style={{ backgroundColor: bm ? C.primaryBg : 'transparent', color: bm ? C.primary : C.textMuted }}>
            <Bookmark size={18} fill={bm ? C.primary : 'transparent'} />
          </button>
        </div>
        <h1 className="text-2xl sm:text-[1.7rem] font-bold leading-tight mb-1" style={{ color: C.text }}>{cur.title}</h1>
        <p className="text-sm" style={{ color: C.textSub }}>{cur.titleJa}</p>
      </div>

      <div className="p-6 sm:p-7 rounded-2xl" style={{ backgroundColor: C.card, boxShadow: SH }}>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} style={{ color: C.primary }} />
          <h2 className="text-base font-bold" style={{ color: C.text }}>本文</h2>
        </div>
        <div className="text-[15px] leading-[1.9] whitespace-pre-line" style={{ color: C.text }}>{cur.passage}</div>
      </div>

      <div className="p-6 sm:p-7 rounded-2xl" style={{ backgroundColor: C.card, boxShadow: SH }}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h2 className="text-base font-bold" style={{ color: C.text }}>あなたの要約</h2>
          <div className="ml-auto flex items-baseline gap-1.5">
            <span className="text-xs font-medium" style={{ color: C.textMuted }}>語数</span>
            <span className="text-2xl font-bold tabular-nums"
              style={{ color: inRange ? C.ok : over ? C.ng : C.text }}>{wc}</span>
            <span className="text-xs font-medium" style={{ color: C.textMuted }}>/ {cur.targetMin}–{cur.targetMax}</span>
          </div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ backgroundColor: C.borderLight }}>
          <div className="h-full rounded-full transition-all"
            style={{ width: `${Math.min(100, (wc / cur.targetMax) * 100)}%`, backgroundColor: inRange ? C.ok : over ? C.ng : C.primary }} />
        </div>
        <textarea value={txt} onChange={e => updateAns(e.target.value)}
          placeholder="Type your English summary here…"
          className="w-full resize-y outline-none p-4 rounded-xl text-[15px] leading-[1.85] transition-all"
          style={{ minHeight: cur.grade === 'grade1' ? '220px' : '160px', backgroundColor: C.bg, border: `1px solid ${C.border}`, color: C.text }}
          onFocus={e => e.target.style.borderColor = C.primary}
          onBlur={e => e.target.style.borderColor = C.border} />

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4"
          style={{ borderTop: `1px solid ${C.borderLight}` }}>
          <button onClick={() => { updateAns(''); setCorrResult(null); }} disabled={!txt}
            className="flex items-center gap-1.5 text-sm font-medium disabled:opacity-40" style={{ color: C.textSub }}>
            <RotateCcw size={14} />クリア
          </button>
          <div className="flex flex-wrap gap-2">
            <button onClick={doCorrect} disabled={!txt.trim() || correcting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
              style={{ backgroundColor: correcting ? '#A78BFA' : C.ai }}
              onMouseEnter={e => { if (!correcting && txt.trim()) e.currentTarget.style.backgroundColor = C.aiH; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = correcting ? '#A78BFA' : C.ai; }}>
              {correcting
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />添削中…</>
                : <><Sparkles size={16} />AIに添削してもらう</>}
            </button>
            <button onClick={() => setShowAns(!showAns)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{ backgroundColor: C.primary }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryH}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}>
              {showAns ? <><EyeOff size={16} />隠す</> : <><Eye size={16} />解答例・解説</>}
            </button>
          </div>
        </div>

        {corrErr && (
          <div className="mt-3 p-3 rounded-xl flex items-center gap-2 text-sm"
            style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
            <AlertCircle size={16} />
            <span className="flex-1">{corrErr}</span>
            {corrErr.includes('APIキー') && (
              <button onClick={() => setShowKeyModal(true)} className="font-bold underline">設定する</button>
            )}
          </div>
        )}
      </div>

      {corrResult && <CorrectionPanel result={corrResult} onClose={() => setCorrResult(null)} />}

      {showAns && (
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.card, boxShadow: SH }}>
          <div className="flex overflow-x-auto" style={{ borderBottom: `1px solid ${C.borderLight}` }}>
            {[{ k: 'answer', l: '解答例' }, { k: 'structure', l: '構成と要点' }, { k: 'paraphrase', l: '言い換え' }, { k: 'phrases', l: '使える表現' }].map(t => {
              const active = ansTab === t.k;
              return (
                <button key={t.k} onClick={() => setAnsTab(t.k)}
                  className="px-5 py-4 text-sm font-bold whitespace-nowrap relative transition-colors"
                  style={{ color: active ? C.primary : C.textSub }}>
                  {t.l}
                  {active && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-t" style={{ backgroundColor: C.primary }} />}
                </button>
              );
            })}
          </div>
          <div className="p-6 sm:p-7">
            {ansTab === 'answer' && (
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.primary }}>Sample Answer</span>
                  <span className="text-xs font-medium" style={{ color: C.textMuted }}>{cur.sampleWordCount} words</span>
                </div>
                <div className="p-5 rounded-xl text-[15px] leading-[1.9]"
                  style={{ backgroundColor: C.primaryBg, color: C.text, borderLeft: `3px solid ${C.primary}` }}>
                  {cur.sampleAnswer}
                </div>
                {txt.trim() && (
                  <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${C.borderLight}` }}>
                    <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: C.textSub }}>あなたの解答</div>
                    <div className="p-5 rounded-xl text-[15px] leading-[1.9] whitespace-pre-wrap"
                      style={{ backgroundColor: C.bg, color: C.text }}>{txt}</div>
                    <div className="text-xs font-medium mt-2" style={{ color: C.textMuted }}>
                      {wc}語 {inRange ? '· 目標範囲内 ✓' : over ? '· オーバー' : '· 不足'}
                    </div>
                  </div>
                )}
              </div>
            )}
            {ansTab === 'structure' && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: C.primary }}>全体構成</div>
                <div className="text-[15px] leading-[1.85] mb-6 pb-5"
                  style={{ color: C.text, borderBottom: `1px solid ${C.borderLight}` }}>{cur.structure}</div>
                <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: C.primary }}>要点</div>
                <ul className="space-y-3">
                  {cur.keyPoints.map((pt, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: C.primaryBg, color: C.primary }}>{i + 1}</span>
                      <span className="text-[14px] leading-[1.8] flex-1" style={{ color: C.text }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {ansTab === 'paraphrase' && (
              <div>
                <p className="text-sm mb-5" style={{ color: C.textSub, lineHeight: 1.7 }}>
                  本文の表現をそのまま写すのは減点対象です。下記のような言い換えで自分の英語にしましょう。
                </p>
                <div className="space-y-4">
                  {cur.paraphraseTips.map((tip, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: C.bg }}>
                      <div className="text-xs font-bold mb-1" style={{ color: C.textMuted }}>原文</div>
                      <div className="text-sm mb-3 italic" style={{ color: C.textSub }}>{tip.original}</div>
                      <div className="text-xs font-bold mb-1" style={{ color: C.primary }}>言い換え</div>
                      <div className="text-sm font-medium" style={{ color: C.text }}>→ {tip.alt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {ansTab === 'phrases' && (
              <div>
                <p className="text-sm mb-5" style={{ color: C.textSub, lineHeight: 1.7 }}>
                  この問題で使えるディスコースマーカーや決まり文句です。
                </p>
                <ul className="space-y-2.5">
                  {cur.usefulPhrases.map((ph, i) => (
                    <li key={i} className="p-4 rounded-xl text-[14px] leading-[1.7]"
                      style={{ backgroundColor: C.primaryBg, color: C.text, borderLeft: `3px solid ${C.primary}` }}>{ph}</li>
                  ))}
                </ul>
              </div>
            )}
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
  const [view, setView] = useState('list');
  const [selId, setSelId] = useState(null);
  const [gf, setGf] = useState('all');
  const [navTab, setNavTab] = useState('list');
  const [answers, setAnswers] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [showAns, setShowAns] = useState(false);
  const [ansTab, setAnsTab] = useState('answer');
  const [correcting, setCorrecting] = useState(false);
  const [corrResult, setCorrResult] = useState(null);
  const [corrErr, setCorrErr] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    try { const a = localStorage.getItem('eiken_answers'); if (a) setAnswers(JSON.parse(a)); } catch {}
    try { const b = localStorage.getItem('eiken_bookmarks'); if (b) setBookmarks(JSON.parse(b)); } catch {}
    try { const k = localStorage.getItem('eiken_apikey'); if (k) setApiKey(k); } catch {}
  }, []);

  const all = useMemo(() => [
    ...problemsData.grade2.map(p => ({ ...p, grade: 'grade2' })),
    ...problemsData.grade1.map(p => ({ ...p, grade: 'grade1' })),
  ], []);

  const filtered = useMemo(() => {
    let list = all;
    if (gf !== 'all') list = list.filter(p => p.grade === gf);
    if (navTab === 'bookmark') list = list.filter(p => bookmarks[p.id]);
    return list;
  }, [all, gf, navTab, bookmarks]);

  const cur = selId ? all.find(p => p.id === selId) : null;
  const txt = cur ? (answers[cur.id] || '') : '';
  const wc = useMemo(() => {
    const t = txt.trim(); return t ? t.split(/\s+/).filter(Boolean).length : 0;
  }, [txt]);
  const inRange = cur && wc >= cur.targetMin && wc <= cur.targetMax;
  const over = cur && wc > cur.targetMax;

  const updateAns = v => {
    if (!cur) return;
    const next = { ...answers, [cur.id]: v };
    setAnswers(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try { localStorage.setItem('eiken_answers', JSON.stringify(next)); } catch {}
    }, 600);
  };

  const saveApiKey = key => {
    setApiKey(key);
    try { localStorage.setItem('eiken_apikey', key); } catch {}
  };

  const toggleBookmark = id => {
    const next = { ...bookmarks, [id]: !bookmarks[id] };
    if (!next[id]) delete next[id];
    setBookmarks(next);
    try { localStorage.setItem('eiken_bookmarks', JSON.stringify(next)); } catch {}
  };

  const goDetail = id => {
    setSelId(id); setView('detail');
    setShowAns(false); setAnsTab('answer');
    setCorrResult(null); setCorrErr('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const goBack = () => { setView('list'); window.scrollTo({ top: 0, behavior: 'instant' }); };

  const doCorrect = async () => {
    if (!cur || !txt.trim()) return;
    if (!apiKey) { setShowKeyModal(true); return; }
    setCorrecting(true); setCorrResult(null); setCorrErr('');
    try {
      const r = await fetchCorrection({
        passage: cur.passage, sampleAnswer: cur.sampleAnswer,
        userText: txt, wordCount: wc,
        targetMin: cur.targetMin, targetMax: cur.targetMax,
        grade: cur.grade, apiKey,
      });
      setCorrResult(r);
    } catch (e) {
      setCorrErr(`添削エラー: ${e.message}`);
    } finally {
      setCorrecting(false);
    }
  };

  const draftedN = Object.values(answers).filter(v => v?.trim()).length;

  const NAV = [
    { k: 'list', l: '問題一覧', I: BookOpen },
    { k: 'progress', l: '進捗', I: BarChart3 },
    { k: 'bookmark', l: 'ブックマーク', I: Bookmark },
    { k: 'add', l: '問題追加', I: PlusCircle },
  ];
  const hTitle = navTab === 'list' ? '問題一覧' : navTab === 'progress' ? '進捗' : navTab === 'bookmark' ? 'ブックマーク' : '問題追加';
  const hEmoji = navTab === 'list' ? '📚' : navTab === 'progress' ? '📊' : navTab === 'bookmark' ? '🔖' : '➕';

  return (
    <div className="min-h-screen pb-24"
      style={{ backgroundColor: C.bg, fontFamily: '"Noto Sans JP",-apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN",sans-serif', color: C.text }}>

      {showKeyModal && <ApiKeyModal onClose={() => setShowKeyModal(false)} onSave={saveApiKey} />}

      {view === 'list' && (
        <header className="sticky top-0 z-10 px-4 sm:px-6 py-3 flex items-center gap-3"
          style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.borderLight}` }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: C.primary }}>英</div>
          <span className="text-xl">{hEmoji}</span>
          <span className="text-base font-bold" style={{ color: C.text }}>{hTitle}</span>
          <button onClick={() => setShowKeyModal(true)} className="ml-auto p-2 rounded-xl transition-colors"
            style={{ color: apiKey ? C.ai : C.textMuted, backgroundColor: apiKey ? C.aiBg : 'transparent' }}
            title="APIキー設定">
            <KeyRound size={20} />
          </button>
        </header>
      )}

      {view === 'list'
        ? <ListView
            navTab={navTab} gf={gf} setGf={setGf}
            filtered={filtered} answers={answers} goDetail={goDetail}
            all={all} draftedN={draftedN} apiKey={apiKey} setShowKeyModal={setShowKeyModal}
          />
        : <DetailView
            cur={cur} goBack={goBack} bookmarks={bookmarks} toggleBookmark={toggleBookmark}
            txt={txt} wc={wc} inRange={inRange} over={over} updateAns={updateAns}
            correcting={correcting} corrResult={corrResult} setCorrResult={setCorrResult}
            corrErr={corrErr} doCorrect={doCorrect}
            setShowKeyModal={setShowKeyModal} showAns={showAns} setShowAns={setShowAns}
            ansTab={ansTab} setAnsTab={setAnsTab}
          />
      }

      <nav className="fixed bottom-0 left-0 right-0 grid grid-cols-4"
        style={{ backgroundColor: C.card, borderTop: `1px solid ${C.borderLight}`, boxShadow: '0 -1px 3px rgba(15,23,42,0.03)' }}>
        {NAV.map(({ k, l, I }) => {
          const active = view === 'list' && navTab === k;
          return (
            <button key={k} onClick={() => { setNavTab(k); if (view === 'detail') goBack(); }}
              className="flex flex-col items-center justify-center py-3 transition-colors relative"
              style={{ color: active ? C.primary : C.textMuted }}>
              <I size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[11px] font-medium mt-1">{l}</span>
              {active && <span className="absolute bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: C.primary }} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
