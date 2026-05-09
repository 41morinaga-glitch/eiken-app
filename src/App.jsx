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
    {
      id: 'g2-4', label: 'オリジナル No.4', type: '要約問題 A',
      title: 'Working from Home', titleJa: 'テレワーク',
      passage: `In recent years, working from home, also called remote work or telework, has become more common in Japan and other countries. Many companies now allow their employees to work at home instead of coming to the office every day.

There are several benefits to working from home. Employees can save time because they do not need to commute to work. They can also work in a comfortable environment and spend more time with their families. For companies, remote work can reduce the cost of office space.

However, working from home also has some disadvantages. Some employees find it difficult to concentrate when there are family members or other distractions at home. In addition, because workers do not meet their colleagues in person, it can be harder to share ideas and work as a team.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Working from home has become increasingly common in many companies. It benefits employees by saving commuting time and allowing them to work in a comfortable setting, while also reducing office costs for companies. On the other hand, distractions at home can make it difficult to focus, and the lack of face-to-face contact may reduce teamwork.`,
      sampleWordCount: 53,
      structure: '①導入（テレワークの普及）→ ②利点（通勤時間の節約・快適・コスト削減）→ ③欠点（集中しにくい・チームワーク低下）',
      keyPoints: [
        '第1段落：「テレワークが多くの企業で広まっている」という状況を一文でまとめる',
        '第2段落：利点を2〜3点（①通勤不要、②快適な環境、③オフィスコスト削減）',
        '第3段落：欠点を2点（①自宅での集中困難、②対面コミュニケーションの減少）',
        'On the other hand や However で利点と欠点を対比する',
      ],
      paraphraseTips: [
        { original: 'do not need to commute to work', alt: 'save commuting time / avoid traveling to the office' },
        { original: 'comfortable environment', alt: 'comfortable setting / relaxed atmosphere' },
        { original: 'difficult to concentrate', alt: 'hard to focus / struggle to stay focused' },
        { original: 'meet their colleagues in person', alt: 'have face-to-face contact / see coworkers directly' },
      ],
      usefulPhrases: [
        'has become increasingly common （ますます一般的になっている）',
        'On the other hand, ~ （一方で）',
        'the lack of ~ （～の欠如）',
      ],
    },
    {
      id: 'g2-5', label: 'オリジナル No.5', type: '要約問題 A',
      title: 'Sports and Health', titleJa: 'スポーツと健康',
      passage: `Playing sports is a popular activity for people of all ages in Japan. Many schools encourage students to join sports clubs, and local communities also offer a variety of sports programs.

Doing sports regularly has many advantages. First, it helps people stay physically fit and maintain a healthy body weight. Regular exercise also strengthens the heart and reduces the risk of serious diseases. In addition, team sports teach players how to cooperate with others and develop important social skills.

However, playing sports also carries some risks. Athletes may experience injuries such as sprains or broken bones, especially during intense competitions. Furthermore, young people who practice sports too seriously sometimes feel under pressure and may lose their enjoyment of the activity.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Sports are popular among people of all ages and offer many health benefits, including maintaining a healthy weight and reducing disease risk. Team sports also help develop social skills through cooperation. However, injuries are a potential risk, especially in competitive settings, and putting too much pressure on young players can cause them to stop enjoying sports.`,
      sampleWordCount: 52,
      structure: '①導入（スポーツの人気）→ ②利点（体の健康・病気予防・社会性の発達）→ ③欠点（怪我のリスク・プレッシャー）',
      keyPoints: [
        '第1段落：「スポーツはあらゆる年齢に人気がある」という導入を一文で書く',
        '第2段落：利点を3点（①健康維持、②病気リスク低下、③チームワーク・社会性）',
        '第3段落：欠点を2点（①怪我のリスク、②過度のプレッシャー）',
        'offering many benefits と However で対比の構造を作る',
      ],
      paraphraseTips: [
        { original: 'stay physically fit', alt: 'keep the body healthy / maintain physical fitness' },
        { original: 'reduces the risk of serious diseases', alt: 'helps prevent illnesses / lowers the chance of disease' },
        { original: 'cooperate with others', alt: 'work together / develop teamwork' },
        { original: 'feel under pressure', alt: 'experience stress / feel stressed' },
      ],
      usefulPhrases: [
        'offer many health benefits （多くの健康上の利点をもたらす）',
        'especially in ~ （特に～において）',
        'cause them to ~ （彼らに～させる）',
      ],
    },
    {
      id: 'g2-6', label: 'オリジナル No.6', type: '要約問題 B',
      title: 'Recycling and the Environment', titleJa: 'リサイクルと環境',
      passage: `Environmental problems such as global warming and pollution are serious concerns around the world. Many governments and organizations are encouraging people to recycle their waste in order to protect the environment.

Recycling has several important benefits. When people recycle materials such as paper, plastic, and glass, fewer natural resources need to be used. This also reduces the amount of waste sent to landfills, which helps keep the environment cleaner. Moreover, recycling requires less energy than producing new products from scratch, which helps lower carbon emissions.

Despite these benefits, recycling also faces some challenges. Sorting different types of waste can be time-consuming and complicated for many people. In some regions, the systems for collecting and processing recyclable materials are not well developed, which limits how effective recycling programs can be.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Recycling is promoted by governments to protect the environment. It reduces the use of natural resources, decreases landfill waste, and requires less energy than manufacturing new products, which helps lower carbon emissions. However, the sorting process can be complicated and time-consuming, and in some areas, the lack of proper facilities limits the effectiveness of recycling programs.`,
      sampleWordCount: 53,
      structure: '①導入（環境問題とリサイクルの推進）→ ②利点（資源節約・廃棄物削減・CO2削減）→ ③課題（分別の手間・インフラ不足）',
      keyPoints: [
        '第1段落：「環境問題を受けてリサイクルが奨励されている」と一文でまとめる',
        '第2段落：利点を3点（①天然資源の節約、②埋立地の廃棄物削減、③エネルギー節約とCO2削減）',
        '第3段落：課題を2点（①分別の複雑さ・時間、②地域によるインフラ不足）',
        'However で利点と課題を明確に対比する',
      ],
      paraphraseTips: [
        { original: 'fewer natural resources need to be used', alt: 'saves natural resources / reduces the use of raw materials' },
        { original: 'reduces the amount of waste sent to landfills', alt: 'decreases landfill waste / cuts down on waste disposal' },
        { original: 'time-consuming and complicated', alt: 'difficult and takes a lot of time' },
        { original: 'not well developed', alt: 'lacking / insufficient / underdeveloped' },
      ],
      usefulPhrases: [
        'is promoted to ~ （～するために推進されている）',
        'the lack of ~ （～の不足）',
        'limits the effectiveness of ~ （～の効果を制限する）',
      ],
    },
    {
      id: 'g2-7', label: 'オリジナル No.7', type: '要約問題 B',
      title: 'Tourism and Local Communities', titleJa: '観光と地域社会',
      passage: `Tourism is one of the largest industries in the world, and it plays an important role in the economies of many countries. In Japan, the number of foreign tourists has increased greatly in recent years.

Tourism can bring many benefits to local communities. When visitors come to a town or region, they spend money at hotels, restaurants, and shops, which supports local businesses and creates jobs. In addition, tourism can help preserve traditional culture and historic sites, as local governments often receive funding to maintain them.

On the other hand, too many tourists can cause problems. Popular tourist spots sometimes become overcrowded, which disturbs the daily lives of local residents. Furthermore, a large number of visitors can damage natural environments and historic buildings if they are not managed carefully.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Tourism plays a major role in local economies worldwide, and has grown significantly in Japan. It benefits communities by boosting local businesses, creating employment, and helping to preserve culture and historic sites. However, excessive tourism can crowd popular areas, disrupt residents' daily lives, and damage natural and historical environments if not properly managed.`,
      sampleWordCount: 50,
      structure: '①導入（観光の重要性・日本での増加）→ ②利点（地域経済・雇用・文化保護）→ ③問題点（混雑・住民への影響・環境破壊）',
      keyPoints: [
        '第1段落：「観光は世界的に重要な産業で、日本でも外国人観光客が増えている」とまとめる',
        '第2段落：利点を3点（①地域ビジネスへの支出・雇用創出、②文化・史跡の保護）',
        '第3段落：問題点を2点（①観光地の過密化・住民生活への支障、②環境・建物への損害）',
        'However や On the other hand で利点と問題点を対比する',
      ],
      paraphraseTips: [
        { original: 'supports local businesses and creates jobs', alt: 'boosts the local economy / generates employment' },
        { original: 'preserve traditional culture and historic sites', alt: 'protect local heritage / maintain cultural landmarks' },
        { original: 'disturbs the daily lives of local residents', alt: 'disrupts residents\' everyday life / inconveniences local people' },
        { original: 'damage natural environments', alt: 'harm nature / cause environmental damage' },
      ],
      usefulPhrases: [
        'plays a major role in ~ （～において重要な役割を果たす）',
        'excessive ~ can ~ （過度の～は～しうる）',
        'if not properly managed （適切に管理されなければ）',
      ],
    },
    {
      id: 'g2-8', label: 'オリジナル No.8', type: '要約問題 A',
      title: 'Libraries in the Digital Age', titleJa: 'デジタル時代の図書館',
      passage: `Libraries have been an important part of communities for hundreds of years. They provide people with access to books and information, and they have traditionally been places of quiet study and learning.

Today, many libraries are changing to meet the needs of a digital society. Some libraries now offer computers, high-speed internet, and digital collections of books and magazines that members can access online. By providing these services, libraries can attract more visitors, especially younger people who are used to finding information on the internet.

However, some people worry that libraries are losing their original purpose. As more resources become available online, fewer people may visit libraries in person. This could lead to funding cuts, which might force some smaller libraries to close permanently.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Libraries have long been important community spaces for learning. To stay relevant, many now offer digital services such as computers, internet access, and online book collections, which help attract younger visitors. However, there are concerns that as more content moves online, in-person visits may decline, potentially leading to budget cuts and permanent closures of smaller libraries.`,
      sampleWordCount: 52,
      structure: '①導入（図書館の歴史的役割）→ ②変化・利点（デジタル化で若者を引きつける）→ ③懸念（利用者減少・資金削減・閉館リスク）',
      keyPoints: [
        '第1段落：「図書館は長年コミュニティの重要な学習の場だった」と導入を一文でまとめる',
        '第2段落：図書館のデジタル化（コンピュータ・ネット・電子書籍）と若者の誘致効果',
        '第3段落：懸念点（①ネット化で来館者減少、②資金削減、③小規模図書館の閉館リスク）',
        'However で変化の利点と懸念をつなぐ',
      ],
      paraphraseTips: [
        { original: 'meet the needs of a digital society', alt: 'adapt to modern technology / stay relevant in the digital age' },
        { original: 'attract more visitors', alt: 'draw in more people / bring in a wider audience' },
        { original: 'losing their original purpose', alt: 'straying from their traditional role' },
        { original: 'force some smaller libraries to close permanently', alt: 'lead to the permanent closure of small libraries' },
      ],
      usefulPhrases: [
        'To stay relevant, ~ （時代に合い続けるために）',
        'there are concerns that ~ （～という懸念がある）',
        'potentially leading to ~ （～につながる可能性がある）',
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
    {
      id: 'g1-3', label: 'オリジナル No.3', type: '要約問題 A',
      title: 'Artificial Intelligence in Education', titleJa: 'AI教育の課題と可能性',
      passage: `The rapid advancement of artificial intelligence is beginning to transform the way students learn and the way educators teach. Across a growing number of countries, AI-powered tools are being integrated into classrooms, promising to personalize instruction in ways that traditional teaching methods cannot easily achieve.

Proponents of AI in education argue that intelligent tutoring systems can adapt to each student's unique pace and learning style, providing immediate feedback and targeted practice. This individualized approach has shown promise in improving academic outcomes, particularly for students who struggle in conventional classroom settings where a single teacher must simultaneously attend to the needs of many learners. Moreover, AI can relieve educators of repetitive administrative tasks such as grading and progress tracking, freeing them to focus on higher-level mentoring and creative instruction.

Critics, however, raise important concerns about the widespread adoption of AI in schools. They caution that an overreliance on algorithmic systems may erode the essential human relationship between teachers and students, which many educators consider foundational to genuine learning and emotional development. Furthermore, access to sophisticated AI tools is often limited to affluent schools and regions, meaning that the technology could widen existing educational inequalities rather than bridge them.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Artificial intelligence is increasingly being integrated into education to personalize learning in ways that conventional teaching cannot match. Supporters contend that AI tutoring systems can adapt to individual learning styles, provide instant feedback, and free teachers from routine administrative work, thereby improving academic results especially for struggling students. Nevertheless, critics warn that excessive dependence on algorithmic systems risks undermining the vital human bond between teachers and students, which is regarded as central to genuine learning. Additionally, because advanced AI tools are often accessible only in well-funded institutions, the technology may deepen educational inequality rather than reduce it.`,
      sampleWordCount: 103,
      structure: '①現状（AIの教育への統合）→ ②支持論（個別最適化・即時フィードバック・教員負担軽減）→ ③批判論（師弟関係の希薄化・教育格差の拡大）',
      keyPoints: [
        '第1段落：「AIが教育に統合され、個別最適化を可能にしつつある」という現状を一文で導入',
        '第2段落：支持論を2〜3点（①学習スタイルへの適応、②即時フィードバック、③教員の管理業務軽減）',
        '第3段落：英検1級では2文で「師弟関係の希薄化リスク」と「教育格差の拡大リスク」の両方を論じる',
        'Nevertheless や Furthermore など上級のディスコースマーカーを使いこなす',
      ],
      paraphraseTips: [
        { original: 'personalize instruction', alt: 'tailor teaching to individual needs / provide customized learning' },
        { original: 'adapt to each student\'s unique pace and learning style', alt: 'adjust to individual learning styles and speed' },
        { original: 'erode the essential human relationship', alt: 'undermine the vital human bond / weaken teacher-student connections' },
        { original: 'widen existing educational inequalities', alt: 'deepen educational gaps / increase the divide between students' },
        { original: 'algorithmic systems', alt: 'AI-driven tools / automated systems' },
      ],
      usefulPhrases: [
        'Supporters contend that ~ （支持者は～と主張する）',
        'thereby improving ~ （それによって～を改善する）',
        'risks undermining ~ （～を損なうリスクがある）',
        'rather than reduce it （それを減らすどころか）',
      ],
    },
    {
      id: 'g1-4', label: 'オリジナル No.4', type: '要約問題 B',
      title: 'Food Security and Climate Change', titleJa: '食料安全保障と気候変動',
      passage: `Climate change is increasingly threatening global food systems, posing one of the most complex challenges humanity will face in the coming decades. Rising temperatures, more frequent extreme weather events, and shifting precipitation patterns are disrupting agricultural production across vast regions of the world, with the most severe consequences falling disproportionately on developing nations in tropical and subtropical areas.

The implications for food security are profound. Crop yields for staple grains such as wheat, rice, and maize are projected to decline significantly as growing conditions deteriorate, pushing food prices higher and making adequate nutrition increasingly inaccessible for the world's most vulnerable populations. Water scarcity further compounds the problem, as irrigation-dependent agriculture struggles to function in regions experiencing prolonged droughts, and competition for limited freshwater resources is likely to intensify conflicts both within and between nations.

In response, agricultural scientists and policymakers are pursuing a range of adaptation and mitigation strategies. Researchers are developing heat-resistant and drought-tolerant crop varieties through both conventional breeding techniques and genetic engineering, while governments are investing in irrigation infrastructure and early-warning systems for extreme weather. However, critics argue that these technical fixes address symptoms rather than root causes, and that meaningful progress requires a fundamental transformation of global food systems, including a significant reduction in greenhouse gas emissions from industrial agriculture and livestock production.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Climate change is severely disrupting global food production through rising temperatures, extreme weather, and water shortages, with developing nations in tropical regions bearing the greatest burden. As a result, staple crop yields are expected to fall sharply, driving up prices and threatening food security for vulnerable populations, while water scarcity risks intensifying regional conflicts. To address these challenges, researchers are developing climate-resistant crop varieties and governments are improving irrigation and early-warning systems. However, critics argue that such technical measures merely treat symptoms, insisting that reducing emissions from industrial farming and rethinking food systems as a whole are essential for lasting solutions.`,
      sampleWordCount: 105,
      structure: '①現状（気候変動による農業生産の混乱）→ ②影響（食料不安・水不足・紛争リスク）→ ③対策（耐性品種・インフラ整備）+ 批判（根本原因の未対処）',
      keyPoints: [
        '第1段落：「気候変動が農業生産を脅かし、特に発展途上国に深刻な影響」を一文でまとめる',
        '第2段落：食料安全保障への影響（①主要作物の収穫減と価格上昇、②水不足による紛争激化）を1文で要約',
        '第3段落：英検1級では「対策（耐性品種・灌漑・早期警戒）」と「批判（根本原因への対処不足）」の両方を2文で論じる',
        'bearing the greatest burden / However, critics argue that などの1級表現を活用する',
      ],
      paraphraseTips: [
        { original: 'disrupting agricultural production', alt: 'damaging / severely affecting food production' },
        { original: 'falling disproportionately on developing nations', alt: 'affecting poorer countries more severely / bearing the greatest burden' },
        { original: 'crop yields are projected to decline significantly', alt: 'harvests of key crops are expected to fall sharply' },
        { original: 'address symptoms rather than root causes', alt: 'treat the effects rather than the underlying problems' },
        { original: 'fundamental transformation of global food systems', alt: 'comprehensive reform of how food is produced worldwide' },
      ],
      usefulPhrases: [
        'bearing the greatest burden （最大の負担を担っている）',
        'driving up prices （価格を押し上げる）',
        'critics argue that ~ merely treat symptoms （批評家は～は症状を治療するだけだと主張する）',
        'essential for lasting solutions （長期的な解決策に不可欠である）',
      ],
    },
    {
      id: 'g1-5', label: 'オリジナル No.5', type: '要約問題 A',
      title: 'Mental Health in the Workplace', titleJa: '職場のメンタルヘルス',
      passage: `Mental health challenges among working adults have emerged as a pressing public health concern across industrialized nations, with rates of burnout, anxiety, and depression rising steadily over the past two decades. The demands of modern work environments—characterized by long hours, constant connectivity through digital devices, and intense performance pressure—have contributed significantly to this deterioration in psychological well-being.

The economic costs of poor mental health in the workplace are substantial. Studies consistently show that untreated psychological conditions result in reduced productivity, elevated rates of absenteeism, and high employee turnover, all of which impose significant financial losses on businesses and governments alike. Beyond purely economic considerations, the human toll is equally serious, as individuals suffering from workplace-related mental health conditions often experience damaged personal relationships, physical health complications, and, in the most severe cases, an elevated risk of self-harm.

Companies and governments are increasingly recognizing the need to address this crisis proactively. Many organizations have introduced employee assistance programs, flexible working arrangements, and mental health days to provide workers with greater support and autonomy. Nonetheless, critics point out that these measures tend to focus on individual coping strategies while leaving unchanged the structural workplace conditions—such as excessive workloads and toxic management cultures—that are the primary drivers of employee distress. True progress, they argue, demands systemic reform rather than surface-level accommodations.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Rates of burnout, anxiety, and depression are rising among working adults across industrialized countries, driven by long working hours, constant digital connectivity, and intense performance expectations in modern workplaces. This crisis carries substantial economic consequences, including reduced productivity, higher absenteeism, and increased turnover, along with serious personal costs such as damaged relationships and physical health problems. In response, many companies and governments have introduced support measures including flexible work options and mental health assistance programs. However, critics maintain that these initiatives target individual coping without reforming the structural conditions that cause distress, and that meaningful change requires systemic workplace reform.`,
      sampleWordCount: 104,
      structure: '①現状（職場のメンタルヘルス悪化の背景）→ ②影響（経済的損失・個人的打撃）→ ③対策（支援プログラム・柔軟な働き方）+ 批判（構造改革の欠如）',
      keyPoints: [
        '第1段落：「現代の職場環境（長時間労働・常時接続・高い成果圧力）がメンタルヘルス悪化を招いている」を一文で要約',
        '第2段落：経済的・人的コスト（生産性低下・欠勤・離職、さらに個人の人間関係・健康問題）を1文でまとめる',
        '第3段落：企業の対策と「個人対処に焦点を当てるだけで構造問題を放置している」という批判を2文で論じる',
        'driven by / along with / Nevertheless などの上位表現を使いこなす',
      ],
      paraphraseTips: [
        { original: 'characterized by long hours and constant connectivity', alt: 'driven by overwork and always-on digital culture' },
        { original: 'elevated rates of absenteeism and high employee turnover', alt: 'more frequent absences and greater staff attrition' },
        { original: 'leaving unchanged the structural workplace conditions', alt: 'without reforming the underlying work environment' },
        { original: 'primary drivers of employee distress', alt: 'main causes of worker mental health problems' },
        { original: 'surface-level accommodations', alt: 'superficial measures / band-aid solutions' },
      ],
      usefulPhrases: [
        'driven by ~ （～によって引き起こされた）',
        'along with ~ （～に加えて）',
        'critics maintain that ~ （批評家は～と主張し続けている）',
        'meaningful change requires ~ （意味のある変化には～が必要である）',
      ],
    },
    {
      id: 'g1-6', label: 'オリジナル No.6', type: '要約問題 B',
      title: 'The Renewable Energy Transition', titleJa: '再生可能エネルギーへの移行',
      passage: `The imperative to decarbonize the global economy has placed renewable energy at the center of international climate policy, with solar and wind power in particular experiencing dramatic cost reductions and rapid capacity growth over the past decade. Numerous governments have set ambitious targets for transitioning away from fossil fuels, driven both by climate commitments and by growing concerns over energy security following volatility in international energy markets.

Despite this momentum, the transition to renewable energy faces significant technical and economic hurdles. Unlike conventional power plants that generate electricity continuously, solar and wind installations produce power intermittently, depending on weather conditions and time of day. This variability poses substantial challenges for grid stability, necessitating large-scale investment in energy storage technologies such as advanced batteries, as well as the modernization of transmission infrastructure to efficiently distribute electricity across regions.

Socioeconomic dimensions of the energy transition further complicate the picture. Communities and workers in fossil fuel industries face the prospect of economic displacement, and without thoughtful policy intervention, the shift to clean energy risks exacerbating regional inequalities. On the geopolitical front, widespread renewable deployment shifts dependence from oil and gas to rare earth minerals and other critical materials needed for batteries and solar panels, simply transferring rather than eliminating the vulnerabilities associated with resource dependency.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Solar and wind power have expanded rapidly as governments worldwide pursue decarbonization and seek greater energy security, yet the renewable transition faces considerable technical challenges. Because solar and wind generate electricity intermittently, maintaining grid stability requires massive investment in battery storage and upgraded transmission networks. Beyond these technical obstacles, the shift away from fossil fuels threatens economic disruption for workers and communities in affected industries, demanding carefully designed policy support to avoid deepening regional inequalities. Moreover, on a geopolitical level, increased reliance on renewable technologies transfers dependency from oil and gas to rare earth minerals, replacing one form of resource vulnerability with another.`,
      sampleWordCount: 101,
      structure: '①現状（再エネの急成長と脱炭素化の推進）→ ②技術的課題（断続性・送電網安定・蓄電コスト）→ ③社会経済・地政学的課題（雇用・地域格差・資源依存の移行）',
      keyPoints: [
        '第1段落：「太陽光・風力が急成長し各国政府が野心的目標を設定しているが、課題もある」を一文でまとめる',
        '第2段落：技術的課題（①電力の断続性による送電網の不安定化、②蓄電技術・送電インフラへの大規模投資）を1文で要約',
        '第3段落：英検1級では「雇用・地域格差問題」と「資源依存の地政学的リスクの移行」を2文で論じる',
        'yet / Beyond these technical obstacles / replacing one form of ~ with another などの高度な構文を使う',
      ],
      paraphraseTips: [
        { original: 'dramatic cost reductions and rapid capacity growth', alt: 'falling costs and rapid expansion' },
        { original: 'produce power intermittently', alt: 'generate electricity inconsistently / not produce power continuously' },
        { original: 'exacerbating regional inequalities', alt: 'deepening economic disparities between regions' },
        { original: 'simply transferring rather than eliminating the vulnerabilities', alt: 'replacing one form of dependency with another' },
        { original: 'rare earth minerals and other critical materials', alt: 'scarce minerals needed for clean energy technologies' },
      ],
      usefulPhrases: [
        'yet the ~ faces considerable ~ （しかし～には相当な～が伴う）',
        'demands carefully designed policy support （慎重に設計された政策支援を必要とする）',
        'on a geopolitical level （地政学的なレベルでは）',
        'replacing one form of ~ with another （ある形態の～を別の形態に置き換えるにすぎない）',
      ],
    },
    {
      id: 'g1-7', label: 'オリジナル No.7', type: '要約問題 A',
      title: 'Digital Privacy and Data Collection', titleJa: 'デジタルプライバシーとデータ収集',
      passage: `The proliferation of digital services and internet-connected devices has enabled corporations to amass unprecedented quantities of personal data, fundamentally altering the relationship between individuals and the organizations that serve them. Behavioral data derived from browsing habits, purchasing patterns, location tracking, and social media activity is now harvested at a scale and granularity that would have been unimaginable even two decades ago, and this information has become the primary currency fueling the digital economy.

The commercial benefits of data collection are considerable. By analyzing vast datasets, companies can personalize their offerings with remarkable precision, improving user experience and enabling targeted advertising that is substantially more effective than traditional mass-marketing approaches. Algorithmic recommendation systems, powered by personal data, have become deeply embedded in how consumers discover products, news, and entertainment, shaping preferences and behaviors in ways that users themselves rarely perceive.

Nevertheless, the unchecked accumulation of personal data raises profound concerns about privacy, autonomy, and the concentration of power. High-profile data breaches have exposed millions of individuals to identity theft and financial fraud, while revelations about the use of personal data for political micro-targeting have sparked widespread alarm about the integrity of democratic processes. Regulatory responses, including the European Union's General Data Protection Regulation, represent attempts to reassert individual control over personal information, but critics argue that such frameworks remain insufficient given the sheer scale and sophistication of modern data operations.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `The rapid growth of digital services has allowed corporations to collect personal data at an enormous scale, transforming behavioral information into the foundation of the modern digital economy. This data enables companies to personalize services with great accuracy and deliver highly targeted advertising, while recommendation algorithms subtly shape consumer preferences in ways that users seldom notice. However, the unchecked accumulation of such data poses serious threats to privacy and democratic integrity, as breaches expose individuals to fraud and personal data has been exploited for political micro-targeting. Although regulatory frameworks like the EU's GDPR attempt to restore individual control, critics argue these measures fall short given the vast sophistication of contemporary data operations.`,
      sampleWordCount: 106,
      structure: '①現状（デジタルサービスによる大規模データ収集）→ ②商業的利点（パーソナライズ広告・レコメンドシステム）→ ③懸念・規制（プライバシー侵害・民主主義リスク・規制の限界）',
      keyPoints: [
        '第1段落：「デジタルサービスの普及で企業が膨大な個人データを収集し、デジタル経済の基盤になっている」を一文でまとめる',
        '第2段落：商業的利点（①精密なパーソナライズと広告効果、②レコメンドシステムによる消費者行動への影響）を1文で',
        '第3段落：英検1級では「プライバシー・民主主義への脅威（データ漏洩・政治的マイクロターゲティング）」と「規制（GDPRなど）の限界」を2文で論じる',
        'subtly / fall short given the vast sophistication of ~ などの高度な語彙・構文を意識する',
      ],
      paraphraseTips: [
        { original: 'harvested at a scale and granularity', alt: 'collected in enormous quantities and detail' },
        { original: 'personalize their offerings with remarkable precision', alt: 'tailor services with great accuracy' },
        { original: 'shaping preferences and behaviors', alt: 'influencing consumer choices and habits' },
        { original: 'unchecked accumulation of personal data', alt: 'unregulated collection of personal information' },
        { original: 'remain insufficient given the sheer scale', alt: 'fall short given the vast scope / prove inadequate' },
      ],
      usefulPhrases: [
        'transforming ~ into the foundation of ~ （～を～の基盤に変える）',
        'in ways that users seldom notice （ユーザーがほとんど気づかない形で）',
        'attempt to restore individual control （個人のコントロールを取り戻そうとする）',
        'critics argue these measures fall short （批評家はこれらの対策が不十分だと主張する）',
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

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error: ${res.status}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || '';
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
            <h2 className="font-bold text-base" style={{ color: C.text }}>Groq APIキーの設定</h2>
            <p className="text-xs" style={{ color: C.textMuted }}>AI添削機能を使うために必要です（完全無料）</p>
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
            placeholder="gsk_..."
            className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
            style={{ border: `1px solid ${C.border}`, color: C.text, backgroundColor: C.bg }}
            onFocus={e => e.target.style.borderColor = C.primary}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          <p className="text-xs mt-2" style={{ color: C.textMuted }}>
            <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer"
              style={{ color: C.primary }}>console.groq.com</a> で無料APIキーを取得できます
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
            Groq APIキー（完全無料）を設定すると、書いた要約をAIが採点・添削できます。
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

      {/* ── アプリ間ナビゲーション ── */}
      <nav className="sticky top-0 z-20 flex items-center h-11 px-2 gap-1 text-[13px] font-semibold"
        style={{ backgroundColor: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
        <a href="https://kantanapp.github.io/eiken-portal/" target="_self"
          style={{ display:'flex', alignItems:'center', gap:3, padding:'5px 9px', borderRadius:8, textDecoration:'none', color:'#64748b', whiteSpace:'nowrap' }}
          onMouseEnter={e=>e.currentTarget.style.background='#f1f5f9'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
          🎓 TOP
        </a>
        <span style={{ color:'#e2e8f0' }}>|</span>
        <a href="https://eiken-vocab2026423.web.app" target="_self"
          style={{ display:'flex', alignItems:'center', gap:3, padding:'5px 9px', borderRadius:8, textDecoration:'none', color:'#64748b', whiteSpace:'nowrap' }}
          onMouseEnter={e=>e.currentTarget.style.background='#f1f5f9'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
          📚 単語
        </a>
        <a href="https://kantanapp.github.io/eiken-mondai-app/" target="_self"
          style={{ display:'flex', alignItems:'center', gap:3, padding:'5px 9px', borderRadius:8, textDecoration:'none', color:'#64748b', whiteSpace:'nowrap' }}
          onMouseEnter={e=>e.currentTarget.style.background='#f1f5f9'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
          📝 long-passage
        </a>
        <span style={{ display:'flex', alignItems:'center', gap:3, padding:'5px 9px', borderRadius:8, color:'#10b981', background:'#ecfdf5', fontWeight:700, whiteSpace:'nowrap' }}>
          ✍️ 要約
        </span>
      </nav>

      {showKeyModal && <ApiKeyModal onClose={() => setShowKeyModal(false)} onSave={saveApiKey} />}

      {view === 'list' && (
        <header className="sticky top-11 z-10 px-4 sm:px-6 py-3 flex items-center gap-3"
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
