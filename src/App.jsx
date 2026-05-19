import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen, BarChart3, Bookmark, PlusCircle,
  ArrowLeft, Tag, Eye, EyeOff, RotateCcw,
  Sparkles, ChevronDown, ChevronUp, AlertCircle, Settings, X, KeyRound, Menu
} from 'lucide-react';

// ============================================================
// 問題データ
// ============================================================
const problemsData = {
  grade2: [
    {
      id: 'g2-1', label: 'オリジナル No.1', type: '要約問題 A', addedAt: '2025-01-01',
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
      id: 'g2-2', label: 'オリジナル No.2', type: '要約問題 A', addedAt: '2025-01-01',
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
      id: 'g2-3', label: 'オリジナル No.3', type: '要約問題 B', addedAt: '2025-01-01',
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
      id: 'g2-4', label: 'オリジナル No.4', type: '要約問題 A', addedAt: '2025-01-01',
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
      id: 'g2-5', label: 'オリジナル No.5', type: '要約問題 A', addedAt: '2025-01-01',
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
      id: 'g2-6', label: 'オリジナル No.6', type: '要約問題 B', addedAt: '2025-01-01',
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
      id: 'g2-7', label: 'オリジナル No.7', type: '要約問題 B', addedAt: '2025-01-01',
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
      id: 'g2-9', label: 'オリジナル No.9', type: '要約問題 A', addedAt: '2025-01-01',
      title: 'Volunteering and Community Service', titleJa: 'ボランティアと地域貢献',
      passage: `Volunteering means giving time and effort to help others without receiving payment. In Japan, many schools encourage students to take part in volunteer activities, and local governments also organize events where residents can help their communities.

There are many benefits to volunteering. First, it helps people develop useful skills such as communication, teamwork, and problem-solving. Volunteers also feel satisfied knowing they are making a positive difference in the lives of others. In addition, young people who volunteer often find it easier to understand different kinds of people and situations.

However, volunteering can also be challenging. Some people find it difficult to fit volunteer activities into their busy schedules. Others may feel uncertain about what kind of help they can offer. Furthermore, some organizations face a shortage of volunteers because many people do not know about the opportunities available in their area.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Volunteering gives people a chance to help their communities without pay. It helps participants build skills like communication and teamwork, brings personal satisfaction, and increases understanding of others. However, fitting volunteering into a busy schedule can be difficult, and some people are unsure how to help. Many organizations also struggle to attract enough volunteers due to a lack of awareness about available opportunities.`,
      sampleWordCount: 55,
      structure: '①導入（ボランティアとは・学校や地域での推進）→ ②利点（スキル習得・満足感・他者理解）→ ③課題（時間の確保・不確実性・ボランティア不足）',
      keyPoints: [
        '第1段落：「ボランティアとは無償で人を助けることで、学校や地域で推進されている」という導入を一文で',
        '第2段落：利点を3点（①スキル習得、②満足感、③他者理解）を簡潔に',
        '第3段落：課題を3点（①スケジュールの調整困難、②不確実さ、③ボランティア不足）',
        'However で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'giving time and effort without receiving payment', alt: 'helping others for free / offering unpaid assistance' },
        { original: 'feel satisfied knowing they are making a positive difference', alt: 'gain a sense of fulfillment / feel rewarded by helping others' },
        { original: 'fit volunteer activities into their busy schedules', alt: 'find time to volunteer / manage time for volunteering' },
        { original: 'shortage of volunteers', alt: 'not enough volunteers / lack of participants' },
      ],
      usefulPhrases: [
        'gives people a chance to ~ （人々に～する機会を与える）',
        'However, fitting ~ into a busy schedule can be difficult （しかし、忙しいスケジュールに～を組み込むのは難しい）',
        'due to a lack of awareness （認知不足のために）',
      ],
    },
    {
      id: 'g2-10', label: 'オリジナル No.10', type: '要約問題 A', addedAt: '2025-01-01',
      title: 'Online Shopping vs Physical Stores', titleJa: 'ネットショッピングと実店舗',
      passage: `In Japan and many other countries, more and more people are choosing to shop online instead of going to physical stores. This change has been made possible by the growth of smartphones and fast internet connections, which allow people to browse and buy products from anywhere at any time.

Online shopping offers several advantages. Customers can easily compare prices across many websites and find better deals than in regular stores. Shopping online also saves time because people do not need to travel to a store or wait in long lines. In addition, online stores are open twenty-four hours a day, making it convenient for busy people.

Despite these benefits, some people still prefer physical stores. Many customers like to touch and try products before buying them, which is not possible when shopping online. Moreover, physical stores provide immediate access to products without waiting for delivery. Some people also enjoy the experience of visiting a store and receiving advice from shop staff.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Online shopping has become increasingly popular as smartphones and fast internet make it easy to buy products anytime. It allows customers to compare prices, save travel time, and shop around the clock. However, many people still prefer physical stores because they can try products before purchasing, receive items immediately without waiting for delivery, and enjoy personal assistance from store staff.`,
      sampleWordCount: 55,
      structure: '①導入（ネットショッピングの普及と背景）→ ②利点（価格比較・時間節約・24時間営業）→ ③実店舗の利点（試着・即時入手・スタッフのアドバイス）',
      keyPoints: [
        '第1段落：「スマホとネットの普及でネットショッピングが増加している」という状況を一文で導入',
        '第2段落：ネットショッピングの利点（①価格比較・お得、②移動不要・時短、③24時間営業）',
        '第3段落：実店舗の利点（①商品を試せる、②即座に入手、③スタッフのアドバイス）',
        'However で両者を対比する',
      ],
      paraphraseTips: [
        { original: 'compare prices across many websites', alt: 'find better deals / compare prices easily' },
        { original: 'open twenty-four hours a day', alt: 'available at any time / accessible around the clock' },
        { original: 'touch and try products before buying them', alt: 'test or examine products in person' },
        { original: 'immediate access to products without waiting for delivery', alt: 'receive items right away / get products on the spot' },
      ],
      usefulPhrases: [
        'has become increasingly popular （ますます人気になってきている）',
        'around the clock （24時間）',
        'However, many people still prefer ~ （しかし、依然として～を好む人が多い）',
      ],
    },
    {
      id: 'g2-11', label: 'オリジナル No.11', type: '要約問題 B', addedAt: '2025-01-01',
      title: 'Public Transportation and Urban Life', titleJa: '公共交通機関と都市生活',
      passage: `In many large cities around the world, including Tokyo, Osaka, and other major Japanese cities, public transportation systems such as trains and buses play a vital role in people's daily lives. Millions of commuters rely on these services to get to work, school, and other destinations every day.

Using public transportation has several important benefits. It is generally cheaper than owning and maintaining a private car, which can be expensive because of fuel costs, insurance, and parking fees. Public transportation also reduces the number of cars on the road, which helps decrease traffic congestion and lower air pollution in cities. Furthermore, trains and buses allow passengers to use their travel time for other activities such as reading or checking messages.

However, public transportation also has some limitations. Trains and buses follow fixed schedules and routes, which may not always suit individual needs. During rush hours, vehicles can become extremely crowded, making the experience uncomfortable for many passengers. In rural areas or smaller towns, public transportation services may be limited or even unavailable, forcing residents to rely on private cars.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Public transportation systems such as trains and buses are essential to daily life in large cities. They are more affordable than private cars and help reduce traffic and air pollution while allowing passengers to make productive use of their travel time. However, fixed schedules and overcrowding during rush hours can make public transport inconvenient, and in rural areas, limited or absent services force residents to use private vehicles.`,
      sampleWordCount: 62,
      structure: '①導入（公共交通の重要性・利用者）→ ②利点（費用が安い・渋滞と大気汚染の軽減・移動時間の活用）→ ③課題（固定スケジュール・混雑・地方での不足）',
      keyPoints: [
        '第1段落：「電車やバスなどの公共交通機関が都市生活に不可欠な役割を果たしている」という導入',
        '第2段落：利点を3点（①費用が安い、②渋滞・大気汚染の軽減、③移動時間の有効活用）',
        '第3段落：課題を3点（①固定スケジュール・ルート、②ラッシュ時の混雑、③地方での不足）',
        'However で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'generally cheaper than owning and maintaining a private car', alt: 'more affordable than having a car / less expensive than driving' },
        { original: 'reduces the number of cars on the road', alt: 'decreases traffic / cuts down on the number of vehicles' },
        { original: 'follow fixed schedules and routes', alt: 'run on set timetables and predetermined paths' },
        { original: 'extremely crowded', alt: 'very congested / packed / uncomfortably full' },
      ],
      usefulPhrases: [
        'are essential to ~ （～に不可欠である）',
        'make productive use of their travel time （移動時間を有効活用する）',
        'force residents to ~ （住民に～を強いる）',
      ],
    },
    {
      id: 'g2-12', label: 'オリジナル No.12', type: '要約問題 A', addedAt: '2025-01-01',
      title: 'Pets and Human Well-being', titleJa: 'ペットと人の幸福',
      passage: `Keeping pets has become a common part of life for many families in Japan. Dogs and cats are the most popular pets, but some people also keep birds, fish, and other animals. The number of pet owners has increased steadily in recent years, and the pet industry has grown into a large and profitable business.

Having a pet brings many positive effects on people's lives. Studies show that spending time with animals can reduce stress and lower blood pressure. Pets also provide emotional support and help people feel less lonely, which can be especially beneficial for elderly people who live alone. In addition, dog owners often get more exercise because they walk their dogs regularly.

On the other hand, owning a pet also involves responsibilities and challenges. Pets require regular feeding, medical care, and attention, which can be costly and time-consuming. Some people develop allergies to pet fur or feathers, making it impossible to keep certain animals. Furthermore, when pet owners have to travel or work long hours, they must arrange for someone to care for their animals.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Pet ownership is increasingly common in Japan, with dogs and cats being the most popular choices. Having a pet brings significant benefits, including stress reduction, emotional support, and companionship, particularly for elderly people living alone, as well as more exercise for dog owners. However, pets require consistent care and money, some people suffer from animal allergies, and owners must arrange for pet care when they travel or work long hours.`,
      sampleWordCount: 63,
      structure: '①導入（ペット飼育の普及・ペット産業の成長）→ ②メリット（ストレス軽減・情緒的サポート・運動）→ ③課題（費用・時間・アレルギー・世話の確保）',
      keyPoints: [
        '第1段落：「日本でペット飼育が増加し、ペット産業も成長している」という導入を一文で',
        '第2段落：メリット（①ストレス・血圧の低下、②情緒的サポート・孤独感の軽減、③運動量の増加）',
        '第3段落：課題（①費用・時間・世話の必要性、②アレルギーの問題、③不在時の預け先確保）',
        'On the other hand で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'reduce stress and lower blood pressure', alt: 'help people relax / improve physical and mental health' },
        { original: 'feel less lonely', alt: 'have companionship / not feel isolated' },
        { original: 'require regular feeding, medical care, and attention', alt: 'need constant care and attention / demand time and money' },
        { original: 'develop allergies to pet fur or feathers', alt: 'suffer from animal allergies / be allergic to pets' },
      ],
      usefulPhrases: [
        'is increasingly common （ますます一般的になっている）',
        'particularly for ~ （特に～にとって）',
        'However, pets require consistent care and money （しかし、ペットには継続的なケアとお金が必要だ）',
      ],
    },
    {
      id: 'g2-13', label: 'オリジナル No.13', type: '要約問題 B', addedAt: '2025-01-01',
      title: 'School Uniforms', titleJa: '学校の制服',
      passage: `School uniforms are worn by students in many countries, and Japan is well known for having a strong uniform culture in its schools. While uniforms are standard at many Japanese junior high and high schools, opinions about whether they should be required continue to be debated among students, parents, and educators.

Those who support school uniforms argue that they create a sense of equality among students, since everyone wears the same clothes regardless of their family's financial situation. This can reduce bullying related to fashion and clothing brands. Uniforms also help students focus on studying rather than worrying about what to wear each day, and they make it easier to identify students in public for safety reasons.

However, some people oppose mandatory uniforms. They argue that choosing one's own clothes is an important way for young people to express their individual personality and creativity. Additionally, high-quality uniforms can be expensive, which may place a financial burden on families. Some students also find uniforms uncomfortable or unsuitable for different weather conditions, which can affect their concentration and well-being at school.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `School uniforms are widespread in Japan and continue to spark debate. Supporters argue that uniforms promote equality by reducing visible economic differences, discourage fashion-related bullying, help students focus on learning, and improve safety. On the other hand, opponents claim that uniforms limit personal expression and creativity, can be costly for families, and may be uncomfortable in various weather conditions, potentially affecting students' well-being.`,
      sampleWordCount: 57,
      structure: '①導入（日本における制服文化と議論）→ ②賛成論（平等感・いじめ防止・学習への集中・安全性）→ ③反対論（個性の表現・費用・快適性の問題）',
      keyPoints: [
        '第1段落：「日本の学校では制服が一般的で、その義務化をめぐって議論が続いている」という導入',
        '第2段落：賛成論（①平等感、②いじめ防止、③学習集中、④安全確認のしやすさ）',
        '第3段落：反対論（①個性・創造性の表現の制限、②費用負担、③快適性の問題）',
        'On the other hand で賛否を対比する',
      ],
      paraphraseTips: [
        { original: 'create a sense of equality among students', alt: 'promote equality / reduce visible differences between students' },
        { original: 'reduce bullying related to fashion and clothing brands', alt: 'discourage fashion-related bullying / prevent teasing about clothes' },
        { original: 'express their individual personality and creativity', alt: 'show their own style / develop a sense of identity' },
        { original: 'place a financial burden on families', alt: 'be costly for families / be expensive for parents' },
      ],
      usefulPhrases: [
        'continue to spark debate （議論を呼び続けている）',
        'On the other hand, opponents claim that ~ （一方、反対論者は～と主張する）',
        'potentially affecting ~ （～に影響を与える可能性がある）',
      ],
    },
    {
      id: 'g2-8', label: 'オリジナル No.8', type: '要約問題 A', addedAt: '2025-01-01',
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
    {
      id: 'g2-14', label: 'オリジナル No.14', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Electric Vehicles', titleJa: '電気自動車',
      passage: `In recent years, electric vehicles, or EVs, have become more popular in Japan and other countries. Instead of using gasoline, they run on electricity stored in large batteries, which means they produce no direct emissions while driving.

Electric vehicles have several advantages. First, they are better for the environment because they do not release harmful gases from exhaust pipes. Owners can also save money on fuel since electricity costs less than gasoline. In addition, EVs require less maintenance because they have fewer mechanical parts than traditional cars.

However, there are still some challenges. Many drivers worry about running out of battery power before reaching a charging station, especially on long trips. Charging an EV also takes much longer than filling a gas tank. Furthermore, the initial purchase price of electric vehicles is often higher than that of traditional cars.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Electric vehicles are becoming more common as a cleaner alternative to gasoline-powered cars. They produce no direct emissions, cost less to fuel, and need less maintenance. However, concerns about battery range on long journeys, the longer time needed for charging, and higher purchase prices remain obstacles to their wider adoption.`,
      sampleWordCount: 51,
      structure: '①導入（EVの普及）→ ②利点（環境に優しい・燃料費節約・メンテナンスが少ない）→ ③課題（航続距離・充電時間・価格）',
      keyPoints: [
        '第1段落：「電気自動車がガソリン車に代わる選択肢として普及している」と導入を一文で',
        '第2段落：利点を3点（①排気ガスなし、②燃料費が安い、③メンテナンスが少ない）',
        '第3段落：課題を3点（①航続距離への不安、②充電時間の長さ、③購入価格の高さ）',
        'However で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'do not release harmful gases from exhaust pipes', alt: 'produce no direct emissions / are cleaner than gasoline cars' },
        { original: 'electricity costs less than gasoline', alt: 'are cheaper to fuel / cost less to run' },
        { original: 'running out of battery power', alt: 'range anxiety / concern about battery life' },
        { original: 'initial purchase price', alt: 'upfront cost / buying price' },
      ],
      usefulPhrases: [
        'as a cleaner alternative to ~ （～に代わるよりクリーンな選択肢として）',
        'concerns about ~ remain obstacles to ~ （～に関する懸念が～の障壁になっている）',
        'wider adoption （より広い普及）',
      ],
    },
    {
      id: 'g2-15', label: 'オリジナル No.15', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Online Learning', titleJa: 'オンライン学習',
      passage: `In recent years, online learning has grown rapidly in Japan and around the world. Students can now take lessons through the internet using computers or smartphones instead of going to a physical classroom.

Online learning offers several benefits. Learners can study at their own pace and choose when and where to study, which is convenient for people with busy schedules. There is also a wide variety of courses available online, covering topics from languages to computer programming. Additionally, online courses are often cheaper than traditional classroom lessons.

However, online learning also has some drawbacks. Some students find it hard to stay motivated without a teacher watching them in person. Technical problems, such as poor internet connections, can also interrupt lessons. Furthermore, online learning does not provide the same social experience as attending a real school, which may make it harder for students to build friendships.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Online learning has become increasingly popular as technology makes studying via the internet more accessible. It allows learners to study flexibly and affordably with access to a wide range of subjects. Nevertheless, staying motivated without face-to-face support, dealing with technical issues, and missing the social aspects of school life are significant challenges for many online students.`,
      sampleWordCount: 55,
      structure: '①導入（オンライン学習の拡大）→ ②利点（柔軟性・多様なコース・安価）→ ③課題（モチベーション維持・技術的問題・社会的経験の欠如）',
      keyPoints: [
        '第1段落：「インターネットを使った学習が急速に広まっている」という導入を一文で',
        '第2段落：利点を3点（①自分のペース・柔軟なスケジュール、②豊富なコース、③費用が安い）',
        '第3段落：課題を3点（①モチベーション維持の難しさ、②技術的トラブル、③社会的経験の不足）',
        'Nevertheless で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'study at their own pace', alt: 'learn at a self-determined speed / progress independently' },
        { original: 'wide variety of courses', alt: 'many different subjects / a broad range of topics' },
        { original: 'hard to stay motivated', alt: 'difficult to maintain enthusiasm / struggle to keep studying' },
        { original: 'social experience', alt: 'chance to interact with others / community feel' },
      ],
      usefulPhrases: [
        'has become increasingly popular （ますます人気になっている）',
        'Nevertheless, ~ （それにもかかわらず）',
        'significant challenges for ~ （～にとって大きな課題）',
      ],
    },
    {
      id: 'g2-16', label: 'オリジナル No.16', type: '要約問題 B', addedAt: '2026-05-18',
      title: 'Healthy Eating Habits', titleJa: '健康的な食生活',
      passage: `In recent years, more people in Japan are paying attention to what they eat. Many health experts recommend eating a balanced diet that includes vegetables, fruits, whole grains, and proteins, while reducing the amount of sugar, salt, and processed foods.

Eating healthy food has many benefits. A well-balanced diet gives the body the energy and nutrients it needs to function properly. It also helps reduce the risk of serious health conditions such as diabetes, high blood pressure, and heart disease. In addition, people who eat healthily tend to feel more energetic and maintain a healthy body weight.

However, eating well can be challenging for many people. Healthy food is often more expensive than fast food or processed snacks. Also, preparing home-cooked meals takes time and effort, which can be difficult for busy people. Furthermore, unhealthy food is often more readily available and can be hard to resist.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `A growing number of people are paying attention to their diet for better health. Eating a balanced diet helps the body function well, lowers the risk of diseases such as diabetes and heart disease, and supports a healthy weight. However, healthy food tends to cost more, requires time to prepare, and is often harder to choose than convenient, unhealthy options.`,
      sampleWordCount: 61,
      structure: '①導入（食生活への関心の高まり）→ ②利点（栄養補給・病気リスク低下・体重管理）→ ③課題（費用・時間・不健康な食品への誘惑）',
      keyPoints: [
        '第1段落：「健康的な食事への関心が高まっている」という状況を一文で導入',
        '第2段落：利点を3点（①栄養と活力、②病気リスクの低下、③体重管理）',
        '第3段落：課題を3点（①高コスト、②調理の時間・手間、③不健康な食品が手に入りやすい）',
        'However で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'reduce the risk of serious health conditions', alt: 'lower the chance of disease / help prevent illness' },
        { original: 'feel more energetic', alt: 'have more energy / feel better physically' },
        { original: 'more readily available', alt: 'easier to find / more convenient to get' },
        { original: 'hard to resist', alt: 'difficult to avoid / tempting' },
      ],
      usefulPhrases: [
        'A growing number of people are ~ （ますます多くの人々が～している）',
        'lowers the risk of ~ （～のリスクを下げる）',
        'is often harder to choose than ~ （～より選ぶのが難しいことが多い）',
      ],
    },
    {
      id: 'g2-17', label: 'オリジナル No.17', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Plastic Pollution', titleJa: 'プラスチック汚染',
      passage: `Plastic pollution has become one of the most serious environmental problems in the world today. Every year, millions of tons of plastic waste end up in oceans and rivers, harming marine life and polluting ecosystems around the globe.

Reducing plastic use has many important benefits. Using reusable bags, bottles, and containers instead of single-use plastics can significantly cut down on waste. This helps protect sea animals such as turtles and fish that often mistake plastic for food. In addition, producing less plastic means less demand for oil, which helps reduce carbon emissions.

However, reducing plastic pollution is not easy. Many people rely on plastic because it is cheap, lightweight, and convenient. Also, some countries do not have the proper facilities to collect and recycle plastic waste effectively. Furthermore, even when people want to reduce plastic use, they often have difficulty finding affordable alternatives.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Plastic pollution is a major global environmental problem as millions of tons enter oceans annually, threatening marine wildlife. Switching to reusable products reduces waste, protects sea creatures, and lowers carbon emissions. However, plastic remains popular due to its low cost and convenience, and many regions lack the facilities needed to recycle it effectively.`,
      sampleWordCount: 51,
      structure: '①導入（プラスチック汚染の深刻さ）→ ②削減の利点（廃棄物削減・海洋生物保護・CO2削減）→ ③課題（利便性・インフラ不足・代替品の確保困難）',
      keyPoints: [
        '第1段落：「プラスチック汚染が深刻な環境問題になっている」という状況を一文でまとめる',
        '第2段落：削減の利点を3点（①廃棄物削減、②海洋生物の保護、③炭素排出削減）',
        '第3段落：課題を3点（①プラスチックの利便性・安さ、②リサイクルインフラの不足、③代替品確保の難しさ）',
        'However で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'cut down on waste', alt: 'reduce waste significantly / produce less rubbish' },
        { original: 'mistake plastic for food', alt: 'confuse plastic with food / eat plastic by accident' },
        { original: 'cheap, lightweight, and convenient', alt: 'affordable and easy to use / practical and inexpensive' },
        { original: 'proper facilities to collect and recycle', alt: 'adequate infrastructure for recycling' },
      ],
      usefulPhrases: [
        'is a major global ~ problem （世界的に深刻な～問題である）',
        'Switching to ~ reduces ~ （～に切り替えることで～を減らせる）',
        'many regions lack ~ （多くの地域では～が不足している）',
      ],
    },
    {
      id: 'g2-18', label: 'オリジナル No.18', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Studying Abroad', titleJa: '留学',
      passage: `Studying abroad, or going to a school or university in another country, has become a popular choice for many young people in Japan. Each year, thousands of Japanese students travel to countries such as the United States, Australia, and the United Kingdom to study.

Going abroad to study brings many valuable benefits. Students have the chance to improve their foreign language skills, especially English, by using the language in real-life situations every day. They also experience different cultures and ways of thinking, which broadens their perspective and makes them more open-minded. In addition, a study abroad experience often looks impressive on a job application.

However, studying in another country is not without its challenges. The cost of tuition and living expenses can be very high, making it impossible for some students. Many students also feel homesick and find it hard to adjust to a new culture and environment. Language barriers can make daily life and academic study more difficult at first.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Studying abroad has become popular among young Japanese people seeking international experience. It helps students improve their language skills through daily use, gain exposure to new cultures, and strengthen their career prospects. However, high tuition and living costs exclude some students financially, and many struggle with homesickness, cultural adjustment, and language barriers when they first arrive.`,
      sampleWordCount: 53,
      structure: '①導入（留学の人気）→ ②利点（語学力向上・異文化理解・就職に有利）→ ③課題（費用・ホームシック・適応の困難）',
      keyPoints: [
        '第1段落：「留学が多くの日本の若者に選ばれるようになっている」という状況を一文で',
        '第2段落：利点を3点（①日常での語学使用による向上、②異文化理解・視野の広がり、③就職への有利性）',
        '第3段落：課題を3点（①学費・生活費の高さ、②ホームシック・文化的適応、③言語の壁）',
        'However で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'improve their foreign language skills', alt: 'develop language proficiency / get better at using English' },
        { original: 'broadens their perspective', alt: 'widens their outlook / makes them more open-minded' },
        { original: 'feel homesick', alt: 'miss home / find being away from family difficult' },
        { original: 'language barriers', alt: 'difficulty with the language / communication challenges' },
      ],
      usefulPhrases: [
        'seeking international experience （国際的な経験を求めて）',
        'through daily use （日常での使用を通じて）',
        'exclude some students financially （一部の学生を経済的に排除する）',
      ],
    },
    {
      id: 'g2-19', label: 'オリジナル No.19', type: '要約問題 B', addedAt: '2026-05-18',
      title: 'Video Games', titleJa: 'ビデオゲーム',
      passage: `Video games have become one of the most popular forms of entertainment for young people in Japan and around the world. Modern games are played on gaming consoles, personal computers, and smartphones, allowing people to play anytime and anywhere.

Playing video games can have some positive effects. Some games help players develop problem-solving skills and improve concentration, as players must think carefully and react quickly to challenges. Multiplayer online games also allow players to communicate and cooperate with people from different countries, developing social and language skills.

However, there are also concerns about video games. Some people spend too many hours playing, which can lead to eye strain, lack of sleep, and poor performance at school or work. Playing video games for long periods may also reduce the time available for physical activity, which can have negative effects on health. Parents often worry about children playing violent or inappropriate games.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Video games are extremely popular among young people and can offer some educational benefits, such as improving problem-solving skills and encouraging international communication in multiplayer settings. However, excessive play can cause health problems including eye strain and sleep deprivation, reduce time for physical exercise, and expose younger players to violent or inappropriate content.`,
      sampleWordCount: 52,
      structure: '①導入（ゲームの普及）→ ②利点（問題解決能力・集中力・コミュニケーション）→ ③問題点（過度な使用による健康問題・運動不足・不適切コンテンツ）',
      keyPoints: [
        '第1段落：「ゲームが若者の人気娯楽になっている」という導入を一文で',
        '第2段落：利点を2〜3点（①問題解決力・集中力向上、②多国籍プレイヤーとのコミュニケーション）',
        '第3段落：問題点を3点（①健康への悪影響（目・睡眠）、②運動不足、③不適切コンテンツ）',
        'However で利点と問題点を対比する',
      ],
      paraphraseTips: [
        { original: 'develop problem-solving skills', alt: 'improve critical thinking / become better at solving problems' },
        { original: 'communicate and cooperate with people from different countries', alt: 'interact with international players / connect with people worldwide' },
        { original: 'too many hours playing', alt: 'excessive gaming / spending too much time on games' },
        { original: 'reduce the time available for physical activity', alt: 'leave less time for exercise / limit opportunities to be active' },
      ],
      usefulPhrases: [
        'can offer some educational benefits （いくつかの教育的な利点をもたらす可能性がある）',
        'excessive play can cause ~ （過度なプレイは～を引き起こす可能性がある）',
        'expose younger players to ~ （年少プレイヤーを～にさらす）',
      ],
    },
    {
      id: 'g2-20', label: 'オリジナル No.20', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Local Farming', titleJa: '地産地消',
      passage: `In recent years, there has been growing interest in buying locally produced food in Japan. This practice, sometimes called "local production for local consumption," encourages people to buy vegetables, fruits, and other products grown or made in their region.

Buying locally produced food has several advantages. Fresh produce from nearby farms does not need to travel long distances, so it is often fresher and more nutritious than food imported from abroad. Buying local also supports local farmers and helps the regional economy grow. Furthermore, because locally grown food requires less transportation, it produces fewer carbon emissions, which is good for the environment.

However, there are some challenges to buying locally. Local products are sometimes more expensive than imported goods because they are produced in smaller quantities. In addition, the variety of local products can be limited depending on the season and the region. It may also be difficult for people living in cities to access locally produced food.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Locally produced food is attracting more attention in Japan as people seek fresher and more environmentally friendly options. Buying local supports nearby farmers, provides fresher and more nutritious produce, and reduces carbon emissions from transportation. However, locally grown goods are often more expensive and less varied than imported products, and city residents may have limited access to them.`,
      sampleWordCount: 55,
      structure: '①導入（地産地消への関心の高まり）→ ②利点（鮮度・栄養・地元経済・環境）→ ③課題（価格・品揃えの限界・都市での入手困難）',
      keyPoints: [
        '第1段落：「地元産食品への関心が高まっている」という状況を導入として一文で',
        '第2段落：利点を3〜4点（①新鮮で栄養価が高い、②地元農家と地域経済への貢献、③CO2削減）',
        '第3段落：課題を3点（①価格が高い、②品揃えが季節・地域で限られる、③都市での入手困難）',
        'However で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'does not need to travel long distances', alt: 'requires less transportation / is transported over shorter distances' },
        { original: 'fresher and more nutritious', alt: 'of better quality / retains more nutrients' },
        { original: 'produces fewer carbon emissions', alt: 'has a smaller carbon footprint / is more eco-friendly' },
        { original: 'limited depending on the season and the region', alt: 'vary with the season and location / not always available' },
      ],
      usefulPhrases: [
        'is attracting more attention （ますます注目を集めている）',
        'as people seek ~ （人々が～を求めるにつれて）',
        'city residents may have limited access to ~ （都市の住民は～へのアクセスが限られる可能性がある）',
      ],
    },
    {
      id: 'g2-21', label: 'オリジナル No.21', type: '要約問題 B', addedAt: '2026-05-18',
      title: 'Sleep and Health', titleJa: '睡眠と健康',
      passage: `Getting enough sleep is one of the most important things people can do for their health. Health experts recommend that adults sleep between seven and nine hours each night, but many people in Japan and other countries regularly sleep less than this.

A good night's sleep brings many health benefits. During sleep, the body repairs itself, and the brain organizes and stores memories. People who sleep enough tend to be more focused and productive during the day, and they are less likely to make mistakes at work or school. Adequate sleep also strengthens the immune system and reduces the risk of diseases such as diabetes and heart disease.

On the other hand, not getting enough sleep can have serious consequences. Chronic sleep deprivation can cause poor concentration, mood swings, and reduced physical performance. Long-term lack of sleep is linked to higher risks of obesity, high blood pressure, and mental health problems. Modern lifestyle habits, such as using smartphones at night and working long hours, make it difficult for many people to get enough rest.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Adequate sleep is essential for good health, yet many people fail to get enough. Sufficient sleep allows the body and brain to recover, improves concentration and productivity, and protects against diseases. However, chronic sleep deprivation leads to poor focus, mood swings, and increased risks of obesity and mental illness, often worsened by modern habits such as late-night smartphone use.`,
      sampleWordCount: 57,
      structure: '①導入（睡眠の重要性・不足の現状）→ ②十分な睡眠の利点（身体回復・集中力・免疫力向上）→ ③睡眠不足の悪影響（集中力低下・気分の変動・生活習慣病リスク）',
      keyPoints: [
        '第1段落：「十分な睡眠が健康に不可欠だが、多くの人が睡眠不足である」という状況を一文で導入',
        '第2段落：十分な睡眠の利点（①身体の修復・記憶の整理、②集中力・生産性向上、③免疫力強化・病気リスク低下）',
        '第3段落：睡眠不足の問題（①集中力低下・気分の変動、②肥満・高血圧・精神疾患リスク、③現代のライフスタイル習慣）',
        'However で利点と問題を対比する',
      ],
      paraphraseTips: [
        { original: 'repairs itself', alt: 'recovers and restores energy / heals and regenerates' },
        { original: 'more focused and productive', alt: 'better able to concentrate / more efficient and alert' },
        { original: 'chronic sleep deprivation', alt: 'long-term lack of sleep / consistently not sleeping enough' },
        { original: 'mood swings', alt: 'emotional instability / changes in mood' },
      ],
      usefulPhrases: [
        'is essential for ~ （～に不可欠である）',
        'Sufficient sleep allows the body to ~ （十分な睡眠によって体は～できる）',
        'leads to ~ including ~ （～を含む～につながる）',
      ],
    },
    {
      id: 'g2-22', label: 'オリジナル No.22', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Second-hand Shopping', titleJa: 'フリマ・中古品',
      passage: `In recent years, buying second-hand goods has become increasingly popular among people of all ages in Japan. Online platforms and apps that connect buyers and sellers of used items have made it easier than ever to find pre-owned clothes, electronics, and household goods.

Buying second-hand items has several advantages. It is usually much cheaper than buying new products, which allows people to save money or afford items they could not otherwise buy. Second-hand shopping is also good for the environment because it reduces the amount of waste sent to landfills and decreases the demand for new products to be manufactured. In addition, shoppers can sometimes find rare or unique items that are no longer sold in stores.

However, there are also some drawbacks to buying used goods. The quality of second-hand items can vary greatly, and buyers may receive products that are damaged or not as described. There is also typically no warranty or return policy, which means buyers take on greater risk. Furthermore, finding the right item can take a lot of time and effort.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Second-hand shopping has grown in popularity in Japan, driven by online platforms that make buying and selling used items easy. It saves money, reduces waste and production demand, and offers access to rare or discontinued products. However, the quality of used goods is inconsistent, warranty protection is usually absent, and searching for specific items can be time-consuming.`,
      sampleWordCount: 53,
      structure: '①導入（フリマ・中古品購入の人気・オンラインプラットフォームの普及）→ ②利点（節約・環境への良さ・希少品の入手）→ ③課題（品質のばらつき・保証なし・時間がかかる）',
      keyPoints: [
        '第1段落：「フリマアプリなどの普及で中古品購入が広まっている」という状況を一文で導入',
        '第2段落：利点を3点（①費用節約、②環境への貢献（廃棄物削減・製造需要低下）、③希少品の入手）',
        '第3段落：課題を3点（①品質のばらつき・状態の不確実さ、②保証・返品ポリシーなし、③時間・手間）',
        'However で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'connect buyers and sellers of used items', alt: 'link people who want to buy and sell second-hand goods' },
        { original: 'reduces the amount of waste sent to landfills', alt: 'cuts down on rubbish / decreases environmental waste' },
        { original: 'vary greatly', alt: 'differ significantly / be inconsistent' },
        { original: 'no warranty or return policy', alt: 'no guarantee or refund option / no consumer protection' },
      ],
      usefulPhrases: [
        'has grown in popularity （人気が高まっている）',
        'driven by ~ （～によって促進されて）',
        'can be time-consuming （時間がかかる可能性がある）',
      ],
    },
    {
      id: 'g2-23', label: 'オリジナル No.23', type: '要約問題 B', addedAt: '2026-05-18',
      title: 'Music and Learning', titleJa: '音楽と学習',
      passage: `Listening to music and learning to play a musical instrument are popular activities among people of all ages in Japan. Many schools include music in their curriculum, and music lessons outside of school are also widely available.

Music education has several important benefits. Learning to play an instrument helps children develop concentration, patience, and the ability to follow instructions. Studies have shown that students who study music often perform better in other subjects, such as mathematics and languages, because music training exercises the brain. In addition, performing music in a group teaches children teamwork and helps build their confidence.

However, music education also has its challenges. Learning an instrument requires a great deal of time and regular practice, which can be difficult for busy students. Private music lessons can also be expensive, making them inaccessible for some families. Furthermore, some schools are cutting back on music classes due to budget reductions, which limits opportunities for students to learn music at school.`,
      targetMin: 45, targetMax: 55,
      sampleAnswer: `Music education offers valuable benefits for students, including improved concentration, better performance in other subjects such as mathematics, and opportunities to develop teamwork and confidence. However, consistent practice demands considerable time, private lessons can be costly for many families, and budget cuts in schools are reducing the availability of music classes for students.`,
      sampleWordCount: 50,
      structure: '①導入（音楽教育の普及）→ ②利点（集中力・他教科への好影響・チームワーク・自信）→ ③課題（練習時間・費用・学校での削減）',
      keyPoints: [
        '第1段落：「音楽を学ぶことが学校内外で広く行われている」という導入を一文で',
        '第2段落：利点を3〜4点（①集中力・忍耐力の向上、②数学・語学への好影響、③チームワーク・自信の育成）',
        '第3段落：課題を3点（①多くの練習時間が必要、②個人レッスンの費用、③学校での削減）',
        'However で利点と課題を対比する',
      ],
      paraphraseTips: [
        { original: 'develop concentration, patience, and the ability to follow instructions', alt: 'improve focus, discipline, and listening skills' },
        { original: 'often perform better in other subjects', alt: 'achieve higher grades in other areas / excel in other academic fields' },
        { original: 'cutting back on music classes', alt: 'reducing music education / scaling back music programs' },
        { original: 'a great deal of time and regular practice', alt: 'consistent effort and dedication / significant time commitment' },
      ],
      usefulPhrases: [
        'offers valuable benefits for ~ （～に貴重な利点をもたらす）',
        'consistent practice demands ~ （継続的な練習には～が必要だ）',
        'reducing the availability of ~ （～の利用可能性を低下させる）',
      ],
    },
  ],
  grade1: [
    {
      id: 'g1-1', label: 'オリジナル No.1', type: '要約問題 A', addedAt: '2025-01-01',
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
      id: 'g1-2', label: 'オリジナル No.2', type: '要約問題 B', addedAt: '2025-01-01',
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
      id: 'g1-3', label: 'オリジナル No.3', type: '要約問題 A', addedAt: '2025-01-01',
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
      id: 'g1-4', label: 'オリジナル No.4', type: '要約問題 B', addedAt: '2025-01-01',
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
      id: 'g1-5', label: 'オリジナル No.5', type: '要約問題 A', addedAt: '2025-01-01',
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
      id: 'g1-6', label: 'オリジナル No.6', type: '要約問題 B', addedAt: '2025-01-01',
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
      id: 'g1-8', label: 'オリジナル No.8', type: '要約問題 A', addedAt: '2025-01-01',
      title: 'Globalization and Cultural Identity', titleJa: 'グローバル化と文化的アイデンティティ',
      passage: `The accelerating pace of globalization has fundamentally transformed how cultures interact and evolve across the world. As international trade, digital communication, and mass migration have intensified, the boundaries separating distinct cultural traditions have grown increasingly porous, prompting scholars and policymakers alike to debate whether these processes foster mutual enrichment or hasten the erosion of cultural diversity.

Critics of globalization's cultural dimension argue that the worldwide dominance of a small number of languages, entertainment franchises, and consumer brands—many originating in the United States—threatens to homogenize human civilization by marginalizing minority languages, indigenous artistic traditions, and locally distinctive customs. This phenomenon, sometimes labeled cultural imperialism, is seen as undermining the unique identities of smaller communities that lack the economic and institutional resources to resist the relentless penetration of globally marketed content.

Defenders of cultural globalization, however, contend that the interaction of cultures has historically produced creative hybridity and innovation rather than simple erasure. Local communities have repeatedly demonstrated their capacity to selectively adopt external influences while reinterpreting them through indigenous lenses, producing vibrant new cultural forms. Furthermore, digital platforms have paradoxically empowered previously marginalized cultural producers, enabling minority-language artists and traditional craftspeople to reach global audiences and monetize their work in ways that would have been impossible in an earlier era.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `The rapid spread of globalization has blurred cultural boundaries worldwide, sparking debate over whether cross-cultural exchange enriches societies or accelerates the loss of cultural diversity. Critics contend that the global dominance of a handful of languages and brands—chiefly from the United States—threatens to homogenize civilization by marginalizing minority languages, indigenous arts, and local customs, a process described as cultural imperialism. Proponents of cultural globalization counter that cultural interaction has historically generated creative hybridity, with communities selectively absorbing external influences and producing new cultural forms. Moreover, digital platforms have increasingly empowered marginalized cultural producers to reach global audiences, enabling minority-language artists and traditional craftspeople to sustain their work commercially.`,
      sampleWordCount: 106,
      structure: '①現状（グローバル化による文化的境界の消失）→ ②批判論（文化の均質化・文化帝国主義）→ ③擁護論（文化的混交の創造性・デジタルによる少数文化の可能性）',
      keyPoints: [
        '第1段落：「グローバル化が文化の相互作用を加速させ、文化多様性への影響を巡る議論を呼んでいる」を一文で導入',
        '第2段落：批判論（①少数言語・伝統文化の周縁化、②文化帝国主義という概念）を1文で要約',
        '第3段落：英検1級では「文化的混交・革新性」と「デジタルによる少数文化の台頭」を2文で論じる',
        'Proponents counter that / paradoxically empowered などの高度な表現を使う',
      ],
      paraphraseTips: [
        { original: 'boundaries separating distinct cultural traditions have grown increasingly porous', alt: 'cultural boundaries have blurred / cultural distinctions have faded' },
        { original: 'marginalizing minority languages, indigenous artistic traditions', alt: 'threatening minority languages and traditional arts' },
        { original: 'creative hybridity and innovation', alt: 'new cultural forms born from cross-cultural exchange' },
        { original: 'empowered previously marginalized cultural producers', alt: 'given a platform to minority artists and craftspeople' },
        { original: 'selectively adopt external influences', alt: 'absorb outside cultures while retaining their own identity' },
      ],
      usefulPhrases: [
        'sparking debate over whether ~ （～をめぐる議論を呼んでいる）',
        'Proponents counter that ~ （支持者は～と反論する）',
        'Moreover, digital platforms have increasingly empowered ~ （さらに、デジタルプラットフォームは～を力づけてきた）',
        'sustain their work commercially （経済的に作品を維持する）',
      ],
    },
    {
      id: 'g1-9', label: 'オリジナル No.9', type: '要約問題 B', addedAt: '2025-01-01',
      title: 'Automation and the Future of Work', titleJa: '自動化と労働の未来',
      passage: `The rapid diffusion of automation technologies—ranging from industrial robotics to sophisticated machine learning algorithms—is reshaping the global labor market with a speed and scope that economists and policymakers are struggling to comprehend. Unlike previous waves of technological displacement, which primarily affected manual and routine cognitive tasks, contemporary automation increasingly threatens occupations requiring analytical reasoning, complex communication, and even creative judgment, blurring the boundaries that once made certain professional roles appear safe from technological substitution.

The distributional consequences of automation are deeply uneven. Workers in routine, middle-skill occupations such as administrative support, logistics coordination, and basic accounting face the greatest risk of displacement, as the tasks they perform are most amenable to algorithmic execution. In contrast, both high-skill workers who design and manage automated systems and low-skill workers whose tasks still require physical dexterity and human interaction tend to be less immediately threatened, a polarization that risks hollowing out the middle class and deepening economic inequality across industrialized societies.

Governments and institutions are responding to these pressures through a range of policy experiments. Some nations are expanding investment in workforce retraining programs and lifelong learning systems to help displaced workers acquire skills relevant to an automated economy. Others are exploring social protection mechanisms such as universal basic income or reduced working hours to distribute the productivity gains from automation more equitably. Critics, however, caution that retraining programs have historically struggled to deliver meaningful employment transitions for displaced workers, and that structural changes to labor markets may ultimately require more fundamental reconsideration of how societies organize and reward work.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Automation is reshaping labor markets at an unprecedented pace, with contemporary technologies threatening not only manual and routine tasks but increasingly analytical and creative roles as well. The economic impacts are highly unequal, as middle-skill workers in routine occupations face the greatest risk of displacement, while high-skill and certain low-skill workers are less immediately affected, deepening inequality and hollowing out the middle class. In response, governments are investing in retraining programs and exploring social protection measures such as universal basic income to more equitably distribute the gains from automation. Nevertheless, critics warn that retraining initiatives have historically had limited success in supporting displaced workers and that fundamental reform of how societies organize and reward labor may ultimately be necessary.`,
      sampleWordCount: 108,
      structure: '①現状（自動化による労働市場の再編とその範囲の拡大）→ ②不平等な影響（中スキル職の脆弱性・中間層の空洞化）→ ③政府の対応（再訓練・UBI）+ 批判（構造改革の必要性）',
      keyPoints: [
        '第1段落：「自動化が手作業だけでなく分析・創造的業務にも及び、労働市場を急速に再編している」を一文で導入',
        '第2段落：「中スキル労働者の雇用喪失リスクが最大で、高スキル・低スキルは相対的に安全→中間層の空洞化」を1文で要約',
        '第3段落：英検1級では「再訓練プログラム・UBIなどの政策対応」と「再訓練の限界・根本的改革の必要性」を2文で論じる',
        'with a speed and scope that / hollowing out / fundamentally reconsider などの高度な表現を活用する',
      ],
      paraphraseTips: [
        { original: 'rapid diffusion of automation technologies', alt: 'rapid spread of automation / the swift adoption of automated systems' },
        { original: 'amenable to algorithmic execution', alt: 'easily performed by algorithms / replaceable by automated systems' },
        { original: 'hollowing out the middle class', alt: 'eroding the middle class / creating a polarized workforce' },
        { original: 'deliver meaningful employment transitions', alt: 'help workers successfully move to new jobs' },
        { original: 'fundamental reconsideration of how societies organize work', alt: 'structural reform of labor systems' },
      ],
      usefulPhrases: [
        'at an unprecedented pace （前例のないペースで）',
        'deepening inequality and hollowing out the middle class （不平等を深め、中間層を空洞化させる）',
        'critics warn that ~ have historically had limited success （批評家は～が歴史的に成果が限られていたと警告する）',
        'fundamental reform of how societies organize ~ （社会が～を組織する方法の根本的改革）',
      ],
    },
    {
      id: 'g1-10', label: 'オリジナル No.10', type: '要約問題 A', addedAt: '2025-01-01',
      title: 'Ocean Pollution and Marine Ecosystems', titleJa: '海洋汚染と海洋生態系',
      passage: `The world's oceans, which cover more than seventy percent of the Earth's surface and are home to an estimated eighty percent of all life on the planet, are under mounting pressure from human activities. Among the most pervasive and damaging forms of pollution affecting marine environments is plastic waste, which accumulates in enormous concentrations in oceanic gyres and steadily fragments into microplastics that permeate every level of the marine food web, from microscopic plankton to apex predators.

The ecological consequences of marine plastic pollution are severe and multifaceted. Marine mammals, seabirds, and sea turtles face lethal entanglement in discarded fishing gear and ingestion of plastic debris that mimics prey, leading to starvation and internal injury. At the microscopic level, research increasingly demonstrates that microplastics carry toxic chemical compounds including endocrine disruptors and persistent organic pollutants that accumulate in tissues as they pass up the food chain, raising significant concerns about the long-term health implications for both marine species and the human populations who depend on seafood.

International efforts to address ocean plastic pollution have accelerated in recent years, with negotiations underway for a legally binding global plastics treaty and growing adoption of policies targeting single-use plastics at the national level. However, the effectiveness of these measures remains contested. Critics argue that voluntary corporate pledges and incremental packaging reforms are insufficient given the systemic nature of plastic overproduction, and that genuinely addressing the crisis requires not merely improved waste management at the end of the supply chain but a fundamental reduction in the production of unnecessary plastics at the source.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `The world's oceans face severe pressure from plastic waste, which accumulates in vast concentrations and fragments into microplastics that infiltrate the entire marine food web. These pollutants cause lethal harm to marine wildlife through entanglement and ingestion, while microplastics carry toxic compounds that accumulate in tissues as they move up the food chain, posing long-term health risks for both marine species and humans who eat seafood. International responses have included negotiations for a global plastics treaty and national bans on single-use plastics, but critics argue these measures are inadequate. They insist that addressing the crisis demands not just better waste management but a fundamental reduction in plastic production at the source.`,
      sampleWordCount: 107,
      structure: '①現状（プラスチック汚染による海洋への影響）→ ②生態的影響（絡まり・摂取・マイクロプラスチックの毒性・人体への懸念）→ ③国際的対応（条約・規制）+ 批判（過剰生産という根本問題）',
      keyPoints: [
        '第1段落：「プラスチック廃棄物が海洋に蓄積し、マイクロプラスチックが食物連鎖全体に浸透している」を一文で導入',
        '第2段落：「海洋生物への直接被害（絡まり・摂取）と毒性物質の生物濃縮・人体への長期リスク」を1文で要約',
        '第3段落：英検1級では「国際的対応（条約・規制）」と「批判（廃棄物管理のみでは不十分、生産削減が必要）」を2文で論じる',
        'infiltrate / posing long-term health risks / insist that ~ demands などの高度な表現を使う',
      ],
      paraphraseTips: [
        { original: 'accumulates in enormous concentrations in oceanic gyres', alt: 'builds up in vast amounts in ocean currents / forms massive garbage patches' },
        { original: 'lethal entanglement in discarded fishing gear', alt: 'fatal entanglement in abandoned nets' },
        { original: 'endocrine disruptors and persistent organic pollutants', alt: 'toxic chemical compounds that disrupt biological functions' },
        { original: 'incremental packaging reforms are insufficient', alt: 'small packaging improvements are not enough' },
        { original: 'a fundamental reduction in production at the source', alt: 'cutting plastic production at the origin / reducing plastic output fundamentally' },
      ],
      usefulPhrases: [
        'infiltrate the entire marine food web （海洋食物連鎖全体に浸透する）',
        'posing long-term health risks for both ~ （～の両方に長期的な健康リスクをもたらす）',
        'critics argue these measures are inadequate （批評家はこれらの対策が不十分だと主張する）',
        'demands not just ~ but a fundamental reduction in ~ （～だけでなく、～の根本的削減を求める）',
      ],
    },
    {
      id: 'g1-11', label: 'オリジナル No.11', type: '要約問題 B', addedAt: '2025-01-01',
      title: 'Universal Basic Income', titleJa: 'ユニバーサル・ベーシックインカム',
      passage: `Universal basic income—a policy proposal in which governments provide every citizen with a regular, unconditional cash payment sufficient to cover basic living needs—has attracted growing intellectual and political interest as a potential response to rising economic insecurity, technological unemployment, and the perceived inadequacy of existing social safety nets. Pilot programs have been conducted in countries including Finland, Kenya, and Canada, generating a substantial body of empirical evidence that proponents cite as demonstrating the policy's potential.

Advocates of universal basic income argue that it would provide a reliable economic floor that eliminates the bureaucratic complexity and stigma associated with means-tested welfare programs, and that the security it offers would enable individuals to pursue education, entrepreneurship, and unpaid caregiving work that conventional employment models undervalue. Furthermore, proponents contend that as automation increasingly threatens job security across many sectors, a guaranteed income could serve as a crucial buffer against technological displacement, preventing widespread poverty without restricting economic dynamism.

Critics challenge these claims on several grounds. Fiscal conservatives question whether any modern economy can sustain the enormous cost of providing adequate universal payments to all citizens without raising taxes to levels that would dampen economic growth or divert resources from targeted services that the most vulnerable populations actually need. Some welfare advocates paradoxically oppose universal basic income on the grounds that universal programs may ultimately displace existing specialist services for those with complex needs, and that the distributional benefits of providing cash payments to already-affluent recipients represent poor use of limited public funds.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Universal basic income—regular, unconditional payments from the government to every citizen—has gained growing attention as a potential remedy for economic insecurity and technological unemployment, with pilot programs in multiple countries providing empirical evidence cited by supporters. Proponents argue that UBI would eliminate the bureaucratic complexity of means-tested welfare, empower individuals to pursue education and entrepreneurship, and serve as a vital buffer against job losses caused by automation. However, fiscal critics question whether economies can sustain the enormous cost without harming growth or diverting funds from targeted services that the most vulnerable genuinely need. Some welfare advocates further warn that universal programs may inadvertently displace specialist services for those with complex needs, making UBI a poor use of limited public resources.`,
      sampleWordCount: 109,
      structure: '①概要（UBIとは・注目の背景・パイロットプログラム）→ ②支持論（福祉の簡略化・個人の自由・自動化への緩衝）→ ③批判論（財政的持続性・脆弱層へのリスク・資源の非効率性）',
      keyPoints: [
        '第1段落：「UBIとは何か（無条件の定期的現金給付）、なぜ注目されているか（経済的不安・技術的失業）、実証実験が行われている」を一文で導入',
        '第2段落：支持論（①福祉の官僚的複雑さの排除、②教育・起業への自由、③自動化による雇用喪失への緩衝）を1文で要約',
        '第3段落：英検1級では「財政的持続性への懸念」と「脆弱層向け専門サービスの代替リスク」を2文で論じる',
        'paradoxically / inadvertently / making UBI a poor use of ~ などの高度な表現を使う',
      ],
      paraphraseTips: [
        { original: 'bureaucratic complexity and stigma of means-tested welfare', alt: 'complex and stigmatized nature of income-based welfare' },
        { original: 'serve as a crucial buffer against technological displacement', alt: 'protect workers from job losses caused by automation' },
        { original: 'dampen economic growth', alt: 'slow down the economy / harm economic dynamism' },
        { original: 'divert resources from targeted services', alt: 'take funds away from services for those most in need' },
        { original: 'inadvertently displace specialist services', alt: 'unintentionally replace specialized support programs' },
      ],
      usefulPhrases: [
        'has gained growing attention as a potential remedy for ~ （～の潜在的な解決策として注目を集めてきた）',
        'empower individuals to pursue ~ （個人が～を追求する力を与える）',
        'fiscal critics question whether ~ （財政的批評家は～かどうかを疑問視する）',
        'further warn that ~ may inadvertently ~ （さらに、～が意図せず～するかもしれないと警告する）',
      ],
    },
    {
      id: 'g1-12', label: 'オリジナル No.12', type: '要約問題 A', addedAt: '2025-01-01',
      title: 'Space Exploration and Scientific Progress', titleJa: '宇宙探査と科学的進歩',
      passage: `Humanity's exploration of space, once the exclusive domain of government agencies with vast state resources, is undergoing a dramatic transformation as private commercial enterprises enter the sector with unprecedented ambition. Companies such as SpaceX and Blue Origin have dramatically reduced launch costs through the development of reusable rocket technology, opening possibilities for more frequent missions and stimulating renewed public and political interest in human expansion beyond Earth. These developments have reinvigorated long-dormant discussions about lunar colonization, Mars settlement, and the eventual exploitation of extraterrestrial mineral resources.

The scientific and technological dividends of space exploration are substantial and extend well beyond the boundaries of the aerospace industry itself. Research conducted in microgravity environments has generated insights into human physiology, materials science, and pharmaceutical development with significant terrestrial applications. The satellite infrastructure deployed through space programs underpins critical civilian and military systems including GPS navigation, weather forecasting, telecommunications networks, and agricultural monitoring, making the continued health of space-based assets essential to modern economic and security infrastructure.

Critics of the current trajectory of space development, however, raise important ethical and political objections. Skeptics question whether the enormous financial resources devoted to space exploration could be more effectively allocated to address urgent terrestrial problems such as climate change, pandemic preparedness, and global poverty. Additionally, the emerging framework for the commercial exploitation of space resources remains legally ambiguous and politically contentious, with developing nations raising concerns that space colonization could replicate the extractive dynamics of historical colonialism by concentrating the benefits of outer space among already-wealthy nations and corporations.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Space exploration is being transformed by private companies such as SpaceX, which have dramatically cut launch costs through reusable rockets, reopening debates about lunar colonization, Mars settlement, and the exploitation of extraterrestrial resources. The scientific and practical benefits of space exploration are extensive, including medical insights from microgravity research and the satellite infrastructure that underpins GPS, weather forecasting, and telecommunications worldwide. However, critics question whether the vast resources devoted to space could be better used to solve pressing earthly problems such as climate change and global poverty. Furthermore, concerns have been raised that the commercial exploitation of space resources may replicate colonial patterns, concentrating the benefits among wealthy nations while excluding developing countries from the gains.`,
      sampleWordCount: 108,
      structure: '①現状（民間企業参入による宇宙探査の変容・再燃した議論）→ ②恩恵（科学的・技術的配当、衛星インフラの重要性）→ ③批判（資源配分の問題・植民地主義的動態のリスク）',
      keyPoints: [
        '第1段落：「民間企業の参入とコスト削減が宇宙探査を変容させ、月・火星定住や資源開発の議論が再燃している」を一文で導入',
        '第2段落：「微小重力研究の科学的成果と衛星インフラの重要性（GPS・天気予報・通信）」を1文で要約',
        '第3段落：英検1級では「地球上の問題への資源配分という批判」と「宇宙資源の商業開発が植民地主義的構造を再現するリスク」を2文で論じる',
        'underpins / critics question whether ~ could be better used / replicating colonial patterns などの高度な表現を使う',
      ],
      paraphraseTips: [
        { original: 'dramatically reduced launch costs through reusable rocket technology', alt: 'significantly cut the cost of space launches with reusable rockets' },
        { original: 'terrestrial applications', alt: 'practical uses on Earth / applications in everyday life' },
        { original: 'underpins critical civilian and military systems', alt: 'supports essential systems / forms the backbone of key infrastructure' },
        { original: 'replicate the extractive dynamics of historical colonialism', alt: 'reproduce colonial patterns / mirror the exploitation of historical colonialism' },
        { original: 'concentrating the benefits among already-wealthy nations', alt: 'allowing only rich countries to profit' },
      ],
      usefulPhrases: [
        'reopening debates about ~ （～に関する議論を再び開く）',
        'the satellite infrastructure that underpins ~ （～を支える衛星インフラ）',
        'critics question whether ~ could be better used to ~ （批評家は～を～のために使った方が良いのではと疑問視する）',
        'concentrating the benefits among wealthy nations while excluding ~ （～を除外しながら裕福な国々に利益を集中させる）',
      ],
    },
    {
      id: 'g1-7', label: 'オリジナル No.7', type: '要約問題 A', addedAt: '2025-01-01',
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
    {
      id: 'g1-13', label: 'オリジナル No.13', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Biodiversity and Ecosystem Services', titleJa: '生物多様性と生態系サービス',
      passage: `The natural world provides humanity with an enormous range of services that are often overlooked or taken for granted. Scientists and environmentalists refer to these as "ecosystem services," which include everything from the purification of water and the pollination of crops to the regulation of climate and the prevention of soil erosion. These benefits, collectively worth trillions of dollars annually, depend entirely on the preservation of biodiversity—the remarkable variety of plant, animal, and microbial life that inhabits Earth's ecosystems.

Despite this indispensable value, biodiversity is declining at an alarming rate. Habitat destruction driven by agricultural expansion, urban development, and deforestation is eliminating species at a pace far exceeding natural extinction rates. The loss of even a single species can trigger cascade effects throughout a food web, undermining the stability of entire ecosystems. Marine environments are particularly vulnerable, as overfishing and ocean acidification caused by rising carbon dioxide levels are devastating coral reefs and the rich communities of life they support.

In response to this crisis, international bodies such as the Convention on Biological Diversity have sought to coordinate global conservation efforts, including the establishment of protected areas and the regulation of harmful industrial practices. However, translating international agreements into effective local action remains profoundly challenging. Economic pressures often lead governments in developing nations to prioritize immediate growth over environmental stewardship, and enforcement of conservation laws is frequently inadequate. Furthermore, even ambitious restoration programs cannot fully replace ecosystems once they have been irreversibly destroyed.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Biodiversity underpins a vast array of ecosystem services—from water purification and crop pollination to climate regulation—that are collectively worth trillions of dollars and essential to human civilization. However, habitat destruction, overexploitation, and ocean acidification are driving species extinction at unprecedented rates, destabilizing food webs and devastating marine environments such as coral reefs. In response, international bodies have established protected areas and regulated damaging industries, but translating these agreements into local action is deeply challenging. Economic priorities in developing countries frequently overshadow environmental concerns, enforcement is often insufficient, and irreversibly destroyed ecosystems cannot be fully restored even through the most ambitious recovery programs.`,
      sampleWordCount: 101,
      structure: '①現状（生態系サービスと生物多様性の価値）→ ②危機（生息地破壊・種の絶滅・海洋環境への脅威）→ ③国際的な対応＋課題（経済的圧力・執行不足・不可逆的破壊）',
      keyPoints: [
        '第1段落：「生態系サービスが人類に計り知れない恩恵をもたらし、それが生物多様性に依存している」と一文で導入',
        '第2段落：危機の深刻さ（①生息地破壊による種の急速な絶滅、②食物連鎖へのカスケード効果、③海洋環境・サンゴ礁の破壊）',
        '第3段落：2文で「国際的な保全の取り組み」と「その限界（経済的圧力・執行困難・回復不能）」を論じる',
        'ディスコースマーカー（However, In response, frequently, even...cannot）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'declining at an alarming rate', alt: 'decreasing rapidly / deteriorating at an unprecedented pace' },
        { original: 'trigger cascade effects', alt: 'set off chain reactions / cause knock-on effects' },
        { original: 'translating international agreements into effective local action', alt: 'implementing global policies at the local level / turning commitments into real change' },
        { original: 'irreversibly destroyed', alt: 'permanently lost / beyond recovery' },
      ],
      usefulPhrases: [
        'underpins a vast array of ~ （膨大な数の～を支えている）',
        'In response, ~ （これに対応して）',
        'cannot be fully restored even through ~ （～をもってしても完全には回復できない）',
      ],
    },
    {
      id: 'g1-14', label: 'オリジナル No.14', type: '要約問題 B', addedAt: '2026-05-18',
      title: 'Remote Work and Urban Migration', titleJa: 'リモートワークと都市移住',
      passage: `The dramatic expansion of remote work technologies, accelerated by the global pandemic that began in 2020, has fundamentally altered the relationship between employment and geographic location. For the first time in the modern era, a significant proportion of knowledge workers are no longer compelled to reside near their employers' offices, creating new possibilities for where and how people choose to live.

This shift has had profound consequences for urban and rural demographics alike. Major metropolitan areas have seen some residents relocate to smaller cities, rural towns, and even overseas destinations in search of lower living costs, larger living spaces, and improved quality of life. This phenomenon has revitalized certain regions that had previously experienced population decline, injecting new economic activity into local businesses and real estate markets that struggled under decades of stagnation.

Nevertheless, this transformation is not without significant complications. The concentration of high-earning remote workers in previously affordable communities has driven up housing prices, potentially displacing long-term residents who cannot afford the increased costs. Critics also question whether the productivity gains attributed to remote work are sustainable over the long term, as isolation from colleagues may hinder creativity and the spontaneous collaboration that often drives innovation. Furthermore, not all workers have equal access to remote work opportunities, meaning that the benefits of this shift are distributed unevenly across different socioeconomic groups.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `The pandemic-driven expansion of remote work has severed the traditional link between employment and location, enabling knowledge workers to live far from their employers' offices. As a result, some city residents have relocated to rural or smaller communities seeking lower costs and better living conditions, reviving economically stagnant regions and stimulating local markets. However, this influx of higher-income workers has also inflated housing prices in previously affordable areas, potentially displacing existing residents. Additionally, long-term isolation from colleagues may undermine creativity and innovation, and because remote work opportunities are not equally distributed, the benefits of this transition are likely to remain concentrated among already-privileged groups.`,
      sampleWordCount: 104,
      structure: '①現状（リモートワークの拡大と場所の自由化）→ ②影響（地方への移住・過疎地域の再活性化）→ ③課題（住宅価格の上昇・創造性への影響・機会の格差）',
      keyPoints: [
        '第1段落：「パンデミックを機に拡大したリモートワークが雇用と場所の関係を変えた」と一文で導入',
        '第2段落：1文で「都市部から地方への移住とその地域経済への好影響」をまとめる',
        '第3段落：英検1級では2文で「住宅価格の上昇・既存住民の排除」と「創造性の阻害・機会の不平等」を論じる',
        'ディスコースマーカー（As a result, However, Additionally）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'severed the traditional link between employment and location', alt: 'freed workers from the need to live near their offices / broken the connection between work and place' },
        { original: 'reviving economically stagnant regions', alt: 'breathing new life into depressed areas / boosting struggling local economies' },
        { original: 'inflated housing prices', alt: 'driven up property values / made housing more expensive' },
        { original: 'not equally distributed', alt: 'unevenly shared / accessible only to certain groups' },
      ],
      usefulPhrases: [
        'has severed the traditional link between ~ and ~ （～と～の従来のつながりを断ち切った）',
        'As a result, ~ （その結果）',
        'because ~ are not equally distributed （～が均等に分配されていないため）',
      ],
    },
    {
      id: 'g1-15', label: 'オリジナル No.15', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Cryptocurrency and Financial Systems', titleJa: '暗号資産と金融システム',
      passage: `The emergence of Bitcoin in 2009 and the subsequent proliferation of cryptocurrencies have introduced a fundamentally new paradigm to global finance. Unlike traditional currencies issued and regulated by central banks, cryptocurrencies operate on decentralized blockchain networks, where transactions are verified by a distributed network of computers rather than by any single institutional authority. Proponents argue that this architecture has the potential to democratize financial services, reduce transaction costs, and provide banking access to the estimated 1.4 billion adults worldwide who currently lack it.

However, the volatile and speculative nature of cryptocurrency markets has raised considerable alarm among regulators and financial stability watchdogs. The value of major cryptocurrencies has experienced dramatic fluctuations, sometimes losing or gaining more than half their value within a matter of weeks, making them unreliable as a stable medium of exchange. Moreover, cryptocurrencies have facilitated illegal activities including money laundering, ransomware attacks, and sanctions evasion, as pseudonymous transactions are difficult for law enforcement agencies to trace.

Environmental concerns also loom large, as the energy-intensive consensus mechanisms used by some cryptocurrencies consume electricity on a scale comparable to that of medium-sized nations. Governments around the world have responded with a wide range of regulatory approaches, from outright bans to frameworks that attempt to harness the innovation of blockchain technology while constraining its risks. Critics, however, maintain that existing regulatory infrastructure is inadequate to address the speed at which this sector is evolving, and that excessive intervention could stifle legitimate financial innovation.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Cryptocurrencies operate on decentralized blockchain networks outside traditional banking systems and offer potential benefits including lower transaction costs and expanded financial access for unbanked populations. Nevertheless, extreme price volatility makes them unreliable as a medium of exchange, and their pseudonymous nature has enabled money laundering, ransomware, and sanctions evasion that authorities find difficult to detect. Environmental concerns are also significant, as energy-intensive mining processes consume electricity comparable to entire nations. Governments have adopted varied regulatory responses, but critics argue that existing frameworks cannot keep pace with the sector's rapid evolution, and that heavy-handed regulation risks suppressing legitimate financial innovation in blockchain technology.`,
      sampleWordCount: 100,
      structure: '①現状（暗号資産の仕組みと潜在的メリット）→ ②問題点（価格変動・犯罪利用）→ ③環境問題・規制の対応＋課題',
      keyPoints: [
        '第1段落：「暗号資産は分散型ブロックチェーン上で動作し、取引コスト削減や金融包摂の可能性がある」と一文でまとめる',
        '第2段落：1文で「価格変動の激しさと犯罪利用（資金洗浄・ランサムウェア・制裁逃れ）」をまとめる',
        '第3段落：英検1級では2文で「環境問題（エネルギー消費）と規制の対応」、および「規制の限界と過度な介入のリスク」を論じる',
        'ディスコースマーカー（Nevertheless, also, however）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'democratize financial services', alt: 'make finance accessible to more people / open banking to underserved populations' },
        { original: 'volatile and speculative nature', alt: 'extreme price fluctuations / highly unstable value' },
        { original: 'pseudonymous transactions', alt: 'anonymous transfers / hard-to-trace payments' },
        { original: 'stifle legitimate financial innovation', alt: 'suppress beneficial technological progress / hinder creative finance' },
      ],
      usefulPhrases: [
        'outside traditional banking systems （従来の銀行システムの外で）',
        'cannot keep pace with ~ （～に追いつけない）',
        'risks suppressing ~ （～を抑制するリスクがある）',
      ],
    },
    {
      id: 'g1-16', label: 'オリジナル No.16', type: '要約問題 B', addedAt: '2026-05-18',
      title: 'Global Mental Health Crisis', titleJa: '世界的なメンタルヘルス危機',
      passage: `Mental health disorders have become one of the most pressing public health challenges of the twenty-first century, affecting an estimated one billion people globally. Conditions such as depression, anxiety, and post-traumatic stress disorder impose enormous burdens not only on individuals and their families, but also on national economies through lost productivity, increased healthcare expenditure, and elevated rates of disability. The World Health Organization estimates that mental health conditions account for roughly one-third of all years lived with disability worldwide.

Despite their scale and impact, mental health conditions remain severely underfunded and stigmatized relative to physical illnesses of comparable burden. In many high-income countries, mental health receives only a small fraction of overall healthcare budgets, and in lower-income nations the treatment gap—the proportion of people who need but do not receive care—can exceed ninety percent. Social stigma surrounding mental illness continues to discourage many individuals from seeking help, leading to delayed diagnoses and prolonged suffering.

The COVID-19 pandemic dramatically worsened this pre-existing crisis, triggering surges in depression, anxiety, and social isolation across all demographic groups. In response, some governments have increased funding for digital mental health services, including teletherapy and AI-assisted screening tools, as a more scalable and stigma-reducing approach. Critics, however, caution that technology cannot replace the therapeutic value of human clinical relationships, and that systemic reforms to education, labor conditions, and social support networks are ultimately more important than any technological intervention.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Mental health disorders affect approximately one billion people globally, imposing massive economic costs through lost productivity and increased healthcare expenditure, yet they remain severely underfunded and heavily stigmatized compared to physical illnesses of similar burden. Treatment gaps are enormous, particularly in lower-income nations, and social stigma continues to prevent many sufferers from seeking help. The COVID-19 pandemic exacerbated this crisis, prompting some governments to expand digital mental health services such as teletherapy as a scalable solution. Nevertheless, critics argue that technology cannot substitute for genuine clinical relationships, and that meaningful progress requires systemic reforms in education, working conditions, and social support structures.`,
      sampleWordCount: 101,
      structure: '①現状（精神疾患の世界的規模と経済的影響）→ ②課題（資金不足・スティグマ・治療格差）→ ③コロナ禍の影響・デジタル対応＋批判',
      keyPoints: [
        '第1段落：「精神疾患が10億人に影響し、経済的損失も甚大だが、身体的疾患と比べて過小評価されている」と一文で導入',
        '第2段落：1文で「治療格差の深刻さとスティグマによる治療回避」をまとめる',
        '第3段落：英検1級では2文で「コロナ禍の悪化とデジタル対応（テレセラピー等）」と「技術の限界・構造的改革の必要性」を論じる',
        'ディスコースマーカー（yet, particularly, Nevertheless）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'imposing massive economic costs', alt: 'placing huge financial burdens / creating enormous economic strain' },
        { original: 'severely underfunded and heavily stigmatized', alt: 'neglected financially and socially / inadequately resourced and misunderstood' },
        { original: 'treatment gaps', alt: 'the proportion of people who need but cannot access care / unmet needs for mental healthcare' },
        { original: 'systemic reforms', alt: 'structural changes / fundamental improvements to the system' },
      ],
      usefulPhrases: [
        'impose massive economic costs through ~ （～を通じて多大な経済的コストをもたらす）',
        'yet they remain ~ （それにもかかわらず～のままである）',
        'cannot substitute for ~ （～の代わりにはなれない）',
      ],
    },
    {
      id: 'g1-17', label: 'オリジナル No.17', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Food Security and Climate Change', titleJa: '食糧安全保障と気候変動',
      passage: `The relationship between climate change and global food security represents one of the most formidable challenges confronting humanity over the coming decades. Rising temperatures, shifting precipitation patterns, and an increase in the frequency of extreme weather events such as droughts, floods, and heatwaves are already disrupting agricultural production in regions home to hundreds of millions of subsistence farmers. The Intergovernmental Panel on Climate Change has projected that without significant mitigation efforts, yields of staple foods including wheat, rice, and maize could decline by up to twenty-five percent by the end of the century.

The consequences of this disruption are likely to be felt most acutely in sub-Saharan Africa, South Asia, and Southeast Asia, where agriculture forms the backbone of both national economies and individual livelihoods. Reduced agricultural productivity will not only exacerbate malnutrition and food insecurity but may also trigger political instability as communities compete for diminishing arable land and freshwater resources. Furthermore, the feedback loop between food production and climate change is particularly concerning: modern industrial agriculture is itself a major contributor to greenhouse gas emissions through livestock farming and the use of synthetic fertilizers.

Governments and international organizations are responding through adaptation and mitigation strategies. Investment in drought-resistant crop varieties, precision irrigation technologies, and sustainable farming practices offers promise in reducing vulnerability. However, critics point out that the pace of these transitions is far too slow given the urgency of the crisis, and that structural inequalities in global trade continue to disadvantage smallholder farmers in developing nations, whose resilience is most essential to long-term food security.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Climate change poses a severe threat to global food security by disrupting precipitation, increasing extreme weather, and potentially reducing yields of staple crops by up to a quarter by 2100, with the most devastating effects expected in Africa and Asia. Reduced productivity risks deepening malnutrition and triggering conflict over increasingly scarce land and water, while industrial agriculture itself worsens climate change through significant greenhouse gas emissions. Governments and international bodies are investing in drought-resistant crops, precision irrigation, and sustainable practices, yet critics argue that progress is insufficient and that structural trade imbalances continue to disadvantage the smallholder farmers who are most crucial to future food security.`,
      sampleWordCount: 104,
      structure: '①現状（気候変動と農業生産への脅威）→ ②影響（食料安全保障・政治不安・農業のフィードバックループ）→ ③対応策（適応・緩和）＋課題（スピードの遅さ・構造的不平等）',
      keyPoints: [
        '第1段落：「気候変動が農業生産を脅かし、主食の収穫量が最大25%減少する恐れがある」と一文で導入',
        '第2段落：1文で「食料不安・栄養失調・政治的不安定リスクと、農業自体が気候変動を悪化させる悪循環」をまとめる',
        '第3段落：英検1級では2文で「耐旱性作物・精密農業などの対応策」と「移行速度の遅さ・貿易構造の不公平」の批判を論じる',
        'ディスコースマーカー（with, while, yet, continue to）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'extreme weather events', alt: 'severe weather phenomena / destructive climatic events' },
        { original: 'backbone of both national economies and individual livelihoods', alt: 'foundation of local economies and people\'s incomes' },
        { original: 'feedback loop', alt: 'vicious cycle / self-reinforcing problem' },
        { original: 'structural inequalities in global trade', alt: 'unfair global trade systems / imbalanced trading arrangements' },
      ],
      usefulPhrases: [
        'poses a severe threat to ~ （～に深刻な脅威をもたらす）',
        'risks deepening ~ and triggering ~ （～を深刻化させ、～を引き起こすリスクがある）',
        'most crucial to ~ （～にとって最も重要な）',
      ],
    },
    {
      id: 'g1-18', label: 'オリジナル No.18', type: '要約問題 B', addedAt: '2026-05-18',
      title: 'Nuclear Energy Revival', titleJa: '原子力エネルギーの復興',
      passage: `After decades of declining investment following high-profile accidents at Three Mile Island, Chernobyl, and Fukushima, nuclear energy is experiencing a remarkable resurgence of political and financial interest as governments grapple with the twin imperatives of decarbonizing their energy systems and ensuring reliable electricity supplies. Proponents argue that modern nuclear technology—particularly small modular reactors—represents a safe, low-carbon energy source that can generate baseload electricity consistently, unlike intermittent renewable sources such as wind and solar power that depend on weather conditions.

The case for nuclear power is strengthened by the urgency of the climate crisis. Nuclear plants emit virtually no greenhouse gases during operation, and their energy density means that they can generate enormous amounts of electricity from relatively small land areas, in sharp contrast to the substantial land requirements of utility-scale solar and wind farms. Several countries, including France, which derives over seventy percent of its electricity from nuclear power, have demonstrated that a society can maintain energy security through a largely nuclear grid over many decades.

However, formidable objections remain. The enormous capital costs of constructing new nuclear facilities, combined with the risk of significant construction delays, make nuclear energy financially uncertain compared to rapidly falling renewable energy costs. The unresolved problem of safely storing high-level nuclear waste for thousands of years continues to pose ethical and technical challenges. Furthermore, the threat of nuclear proliferation—the possibility that civil nuclear programs could provide cover for weapons development—remains a serious concern for international security institutions.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Nuclear energy is regaining political and financial attention as governments seek to decarbonize their energy systems while maintaining reliable electricity supplies. Modern reactor designs emit virtually no greenhouse gases during operation and can generate large amounts of baseload power from small land areas, as demonstrated by France's long-standing nuclear-dominant grid. Nevertheless, nuclear energy faces serious obstacles: construction costs are enormous and subject to delays, while rapidly improving renewables are becoming increasingly competitive. The persistent challenge of storing radioactive waste safely for millennia and the risk of civil nuclear programs enabling weapons development continue to raise profound ethical and international security concerns.`,
      sampleWordCount: 101,
      structure: '①現状（原子力の復興とその背景）→ ②利点（低炭素・高エネルギー密度・フランスの実例）→ ③課題（建設費・廃棄物処理・核拡散リスク）',
      keyPoints: [
        '第1段落：「脱炭素化の緊急性を背景に、原子力エネルギーへの関心が再燃している」と一文で導入',
        '第2段落：1文で「運転中のCO2排出ほぼゼロ・小面積で大量発電・フランスの成功例」をまとめる',
        '第3段落：英検1級では2文で「建設コストの巨大さと再エネの台頭」と「廃棄物処理問題と核拡散リスク」を論じる',
        'ディスコースマーカー（Nevertheless, while, continue to）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'baseload electricity', alt: 'consistent, round-the-clock power supply / steady electricity output' },
        { original: 'intermittent renewable sources', alt: 'weather-dependent energy sources / variable power generation' },
        { original: 'enormous capital costs', alt: 'very high construction expenses / substantial upfront investment' },
        { original: 'nuclear proliferation', alt: 'the spread of nuclear weapons capability / misuse of civil nuclear programs for weapons' },
      ],
      usefulPhrases: [
        'is regaining political and financial attention （政治的・財政的な注目を再び集めている）',
        'as demonstrated by ~ （～によって示されるように）',
        'continue to raise profound ~ concerns （深刻な～懸念を引き続き提起している）',
      ],
    },
    {
      id: 'g1-19', label: 'オリジナル No.19', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Digital Privacy and Surveillance', titleJa: 'デジタルプライバシーと監視',
      passage: `The rapid proliferation of internet-connected devices, digital platforms, and data analytics technologies has created an unprecedented capacity for both governments and corporations to monitor, record, and analyze the behaviors and movements of individuals on a scale that was unimaginable a generation ago. Proponents of pervasive data collection argue that it enables personalized services, improves public safety through crime detection, and allows governments to respond more effectively to public health crises, as was demonstrated during the COVID-19 pandemic.

However, the erosion of personal privacy entailed by mass surveillance raises profound questions about civil liberties and political freedom. In authoritarian regimes, digital surveillance infrastructure has been used to identify and suppress political dissent, track minority populations, and silence journalists and activists. Even in democratic societies, revelations such as those made by whistleblower Edward Snowden in 2013 demonstrated that governments are capable of conducting sweeping surveillance programs that extend far beyond what is democratically accountable.

In response to these concerns, jurisdictions such as the European Union have introduced landmark data protection legislation like the General Data Protection Regulation, which attempts to give individuals greater control over their personal data and imposes substantial fines on organizations that misuse it. Nevertheless, critics argue that regulation alone is insufficient to address the structural power imbalances inherent in the data economy, particularly as artificial intelligence enables ever more sophisticated forms of behavioral prediction and manipulation. The tension between security, convenience, and privacy is likely to remain one of the defining ethical debates of the digital age.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `The explosion of internet-connected devices and data analytics has enabled governments and corporations to monitor individuals at an unprecedented scale, with claimed benefits including personalized services, improved crime prevention, and enhanced public health responses. However, mass surveillance threatens civil liberties and political freedom; authoritarian regimes have used it to suppress dissent and target minorities, while even democratic governments have conducted surveillance that exceeds democratic accountability, as Snowden's revelations showed. Legislation such as the EU's GDPR offers some protection for personal data, but critics contend that regulation cannot resolve fundamental power imbalances, especially as AI enables increasingly sophisticated behavioral prediction and manipulation.`,
      sampleWordCount: 103,
      structure: '①現状（デジタル監視の拡大と主張されるメリット）→ ②課題（市民的自由・権威主義的濫用・民主主義国家でも問題）→ ③法的対応（GDPR）＋批判（AI時代の限界）',
      keyPoints: [
        '第1段落：「インターネット接続機器とデータ分析が前例のない監視を可能にし、利便性や安全性の向上が主張されている」と一文でまとめる',
        '第2段落：1文で「大規模監視が市民的自由を脅かし、権威主義体制と民主主義国家双方で問題が生じている」をまとめる',
        '第3段落：英検1級では2文で「GDPRなどの規制の取り組み」と「AIによる操作の高度化・構造的格差の問題」を論じる',
        'ディスコースマーカー（However, while, but）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'unprecedented scale', alt: 'at a level never seen before / to an extent previously unimaginable' },
        { original: 'suppress political dissent', alt: 'silence opposition / crack down on critics' },
        { original: 'democratically accountable', alt: 'subject to public oversight / answerable to citizens' },
        { original: 'structural power imbalances', alt: 'fundamental inequality between individuals and institutions' },
      ],
      usefulPhrases: [
        'has enabled ~ to monitor individuals at an unprecedented scale （前例のない規模で個人を監視することを可能にした）',
        'exceeds democratic accountability （民主的な説明責任を超えている）',
        'cannot resolve fundamental power imbalances （根本的な力の不均衡を解決できない）',
      ],
    },
    {
      id: 'g1-20', label: 'オリジナル No.20', type: '要約問題 B', addedAt: '2026-05-18',
      title: 'The Gig Economy', titleJa: 'ギグエコノミー',
      passage: `The gig economy—characterized by short-term contracts, freelance work, and platform-mediated employment in sectors such as ride-hailing, food delivery, and digital services—has expanded dramatically over the past decade and now encompasses tens of millions of workers worldwide. Advocates of this model highlight the unparalleled flexibility it affords workers, who can set their own hours, choose their assignments, and balance professional commitments with personal responsibilities such as childcare or study. For consumers, gig platforms offer convenient, on-demand access to services at competitive prices.

From an economic perspective, the gig model has created pathways to income for populations that face barriers to traditional employment, including those with caregiving responsibilities, individuals with disabilities, and workers in regions where conventional employment opportunities are scarce. The low barriers to entry in many gig platforms also enable rapid labor market adjustment, allowing economies to more fluidly absorb shocks such as the structural unemployment caused by automation.

Nevertheless, the gig economy has attracted fierce criticism for the precarious conditions it imposes on many workers. Unlike traditional employees, most gig workers are classified as independent contractors and are therefore excluded from fundamental labor protections including minimum wage guarantees, paid leave, and employer contributions to social insurance. The algorithmic management systems that platforms use to allocate work and set pay rates can be opaque and arbitrary, leaving workers with limited recourse when they feel unfairly treated. Labor movements in several countries have pushed back against this model, arguing that it effectively transfers economic risk onto individual workers while concentrating profits among a small number of platform owners.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `The gig economy, in which workers take short-term platform-mediated jobs in sectors like ride-hailing and food delivery, offers significant flexibility for individuals to set their own hours and balance personal commitments, while providing consumers with convenient on-demand services. It also creates income opportunities for those excluded from traditional employment due to caregiving duties, disabilities, or geographic constraints. However, the classification of most gig workers as independent contractors denies them basic labor rights including minimum wages, paid leave, and social insurance. Opaque algorithmic management limits workers' ability to challenge unfair treatment, and critics argue that the model systematically shifts economic risk onto workers while delivering profits to platform owners.`,
      sampleWordCount: 107,
      structure: '①現状（ギグエコノミーの特徴とメリット）→ ②経済的側面（参入障壁の低さ・雇用創出）→ ③課題（労働保護の欠如・アルゴリズム管理の不透明さ・経済リスクの転嫁）',
      keyPoints: [
        '第1段落：「ギグエコノミーがプラットフォーム型短期雇用として急拡大し、柔軟性と利便性が評価されている」と一文でまとめる',
        '第2段落：1文で「従来の雇用から排除された人々への機会創出と労働市場の柔軟性向上」をまとめる',
        '第3段落：英検1級では2文で「独立請負業者扱いによる労働保護の欠如」と「アルゴリズム管理の問題・プラットフォームへの利益集中」を論じる',
        'ディスコースマーカー（while, However, and）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'platform-mediated employment', alt: 'app-based work / jobs arranged through digital platforms' },
        { original: 'classified as independent contractors', alt: 'categorized as self-employed / not treated as regular employees' },
        { original: 'excluded from fundamental labor protections', alt: 'denied basic worker rights / not entitled to standard employment benefits' },
        { original: 'transfers economic risk onto individual workers', alt: 'places the financial burden on workers / shifts instability to employees' },
      ],
      usefulPhrases: [
        'in which workers take ~ （労働者が～を担う）',
        'denied them basic labor rights including ~ （～を含む基本的な労働権を剥奪する）',
        'systematically shifts economic risk onto ~ （経済リスクを組織的に～に転嫁する）',
      ],
    },
    {
      id: 'g1-21', label: 'オリジナル No.21', type: '要約問題 A', addedAt: '2026-05-18',
      title: 'Space Commercialization', titleJa: '宇宙の商業化',
      passage: `The privatization of space exploration, driven by companies such as SpaceX and Blue Origin, has transformed what was once the exclusive domain of national space agencies into a rapidly expanding commercial frontier. Private investment has dramatically reduced the cost of launching payloads into orbit through innovations such as reusable rocket technology, opening possibilities for satellite-based internet services, space tourism, and ultimately the establishment of permanent human settlements beyond Earth. Proponents argue that commercial competition is accelerating technological innovation far beyond what government-funded programs could achieve within comparable budgets.

The scientific and economic potential of space commercialization is substantial. Satellite constellations operated by private companies now provide high-speed internet connectivity to remote regions of the world, bridging the digital divide in ways that traditional terrestrial infrastructure cannot easily accomplish. Space-based observations contribute to climate monitoring, disaster response, and agricultural management, delivering benefits that extend far beyond the aerospace sector. Moreover, the prospect of accessing the mineral resources of the Moon and near-Earth asteroids could eventually alleviate the scarcity of rare earth elements that underpin modern technology.

However, the rapid commercialization of space raises serious concerns that existing international governance frameworks are ill-equipped to address. The proliferation of satellites is generating unprecedented quantities of space debris that poses collision risks to operational spacecraft. Questions of resource ownership, territorial rights, and liability for damage caused by commercial operators remain inadequately resolved under the Outer Space Treaty of 1967, which predates the era of private space enterprise. Critics further warn that without more equitable international governance, the benefits of space commercialization may accrue disproportionately to already-wealthy nations and corporations.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Private companies such as SpaceX and Blue Origin have transformed space from a government domain into a commercial frontier, significantly reducing launch costs through reusable rockets and opening possibilities ranging from satellite internet and space tourism to asteroid mining. These advances have already delivered concrete benefits, including global internet access via satellite constellations and space-based data for climate and disaster management. However, the surge in commercial satellites is generating dangerous space debris, and fundamental questions of resource rights and liability remain inadequately addressed by the outdated Outer Space Treaty. Critics also warn that without equitable governance, the rewards of space commercialization will primarily benefit wealthy nations and corporations rather than humanity as a whole.`,
      sampleWordCount: 105,
      structure: '①現状（宇宙の商業化の進展・コスト削減）→ ②利点（衛星インターネット・気候観測・資源アクセス）→ ③課題（スペースデブリ・国際法の限界・格差の問題）',
      keyPoints: [
        '第1段落：「民間企業が宇宙開発を変革し、再利用ロケット等でコストを削減した」と一文で導入',
        '第2段落：1文で「衛星インターネット・気候観測・希少資源へのアクセスなどの具体的メリット」をまとめる',
        '第3段落：英検1級では2文で「スペースデブリの増加と1967年宇宙条約の限界」と「利益の不平等な分配」を論じる',
        'ディスコースマーカー（However, also, rather than）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'reusable rocket technology', alt: 'rockets that can be recovered and relaunched / reusable launch vehicles' },
        { original: 'bridging the digital divide', alt: 'reducing the gap in internet access / providing connectivity to underserved areas' },
        { original: 'space debris', alt: 'orbital waste / fragments of retired satellites and rockets' },
        { original: 'accrue disproportionately to', alt: 'benefit mainly / be concentrated among' },
      ],
      usefulPhrases: [
        'has transformed ~ from ~ into ~ （～を～から～へと変えた）',
        'remain inadequately addressed by ~ （～によって十分に対処されていない）',
        'rather than humanity as a whole （人類全体としてではなく）',
      ],
    },
    {
      id: 'g1-22', label: 'オリジナル No.22', type: '要約問題 B', addedAt: '2026-05-18',
      title: 'Antibiotic Resistance', titleJa: '抗生物質耐性',
      passage: `The development of antibiotics in the twentieth century represented one of the most transformative breakthroughs in the history of medicine, enabling the successful treatment of bacterial infections that had previously caused mass mortality and rendering routine surgical procedures far safer than they had ever been. However, the overuse and misuse of antibiotics in human medicine and, particularly, in industrial livestock farming have created conditions that accelerate the evolutionary process by which bacteria develop resistance to these drugs. The World Health Organization estimates that drug-resistant infections already kill approximately 1.3 million people each year and could claim as many as ten million annual lives by 2050 if current trends continue.

The mechanisms driving antibiotic resistance are deeply embedded in both medical practice and agricultural economics. In many countries, antibiotics are prescribed for viral infections against which they have no effect, partly because of patient demand and partly due to diagnostic uncertainty. In the livestock industry, antibiotics are routinely administered to healthy animals to promote growth and prevent disease in crowded factory farm conditions, resulting in antibiotic residues entering soil and water systems. These environments serve as breeding grounds for resistant bacterial strains that can transfer resistance genes across species, including to pathogens that infect humans.

Efforts to combat antibiotic resistance require coordinated action at global and national levels. New antibiotic discovery has slowed dramatically because pharmaceutical companies find it economically unattractive to develop drugs intended to be used sparingly to preserve their efficacy. International bodies are pushing for surveillance of antibiotic use, restrictions on over-the-counter sales, incentives for pharmaceutical investment, and global commitments to reduce agricultural use. Critics, however, argue that without legally binding international agreements and stronger financial penalties for non-compliance, voluntary measures will fail to overcome the structural economic incentives that currently drive overuse.`,
      targetMin: 90, targetMax: 110,
      sampleAnswer: `Antibiotics revolutionized medicine by enabling treatment of previously fatal bacterial infections, but their overuse in human healthcare and industrial livestock farming has driven the evolution of drug-resistant bacteria, which already kill over one million people annually and could cause ten million deaths per year by 2050. Resistance is exacerbated by inappropriate prescribing for viral illnesses and the routine use of antibiotics in factory farming, which spreads resistant strains through soil and water. International efforts focus on surveillance, restricting sales, incentivizing drug development, and reducing agricultural use, yet critics contend that without legally binding global commitments and financial penalties, structural economic incentives will continue to drive dangerous overuse.`,
      sampleWordCount: 105,
      structure: '①現状（抗生物質の歴史的貢献と耐性の危機）→ ②耐性の深刻化（医療・畜産業での過剰使用のメカニズム）→ ③国際的な対応＋課題（拘束力のある合意の必要性）',
      keyPoints: [
        '第1段落：「抗生物質は医学を革命的に進歩させたが、過剰・誤用により薬剤耐性菌が急増し、2050年には年1,000万人死亡の恐れがある」と一文でまとめる',
        '第2段落：1文で「医療での不適切な処方と畜産業での予防的使用が耐性拡散を加速させるメカニズム」をまとめる',
        '第3段落：英検1級では2文で「国際的な監視・販売規制・農業での削減などの取り組み」と「拘束力のある合意がなければ経済的誘因に勝てないという批判」を論じる',
        'ディスコースマーカー（yet, without, continue to）を効果的に使う',
      ],
      paraphraseTips: [
        { original: 'overuse and misuse', alt: 'excessive and inappropriate use / unnecessary administration' },
        { original: 'economically unattractive to develop', alt: 'not financially viable / unprofitable to research' },
        { original: 'legally binding international agreements', alt: 'enforceable global treaties / mandatory international commitments' },
        { original: 'structural economic incentives', alt: 'built-in financial pressures / underlying economic motivations' },
      ],
      usefulPhrases: [
        'revolutionized medicine by ~ （～によって医学を革命的に進歩させた）',
        'is exacerbated by ~ （～によって悪化している）',
        'without legally binding ~ and financial penalties （法的拘束力のある～と財政的制裁なしでは）',
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
  const [menuOpen, setMenuOpen] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    try { const a = localStorage.getItem('eiken_answers'); if (a) setAnswers(JSON.parse(a)); } catch {}
    try { const b = localStorage.getItem('eiken_bookmarks'); if (b) setBookmarks(JSON.parse(b)); } catch {}
    try { const k = localStorage.getItem('eiken_apikey'); if (k) setApiKey(k); } catch {}
  }, []);

  const all = useMemo(() => [
    ...problemsData.grade2.map(p => ({ ...p, grade: 'grade2' })),
    ...problemsData.grade1.map(p => ({ ...p, grade: 'grade1' })),
  ].sort((a, b) => (b.addedAt || '').localeCompare(a.addedAt || '')), []);

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
        <header className="sticky top-0 z-20 px-4 sm:px-6 py-3 flex items-center gap-3 relative"
          style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.borderLight}` }}>
          <button onClick={() => setMenuOpen(v => !v)} className="p-1.5 rounded-lg transition-colors"
            style={{ color: C.textMuted }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: C.primary }}>英</div>
          <span className="text-xl">{hEmoji}</span>
          <span className="text-base font-bold" style={{ color: C.text }}>{hTitle}</span>
          <button onClick={() => setShowKeyModal(true)} className="ml-auto p-2 rounded-xl transition-colors"
            style={{ color: apiKey ? C.ai : C.textMuted, backgroundColor: apiKey ? C.aiBg : 'transparent' }}
            title="APIキー設定">
            <KeyRound size={20} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute top-full left-0 mt-1 w-48 rounded-xl shadow-lg z-20 overflow-hidden"
                style={{ backgroundColor: C.card, border: `1px solid ${C.borderLight}` }}>
                {[
                  { href: 'https://kantanapp.github.io/eiken-portal/', label: '🎓 TOP', current: false },
                  { href: 'https://eiken-vocab2026423.web.app', label: '📚 単語', current: false },
                  { href: 'https://kantanapp.github.io/long-passage/', label: '📝 長文', current: false },
                  { href: '#', label: '✍️ 要約', current: true },
                  { href: 'https://kantanapp.github.io/summary/vocab-quiz/', label: '🔤 単語クイズ', current: false },
                ].map(({ href, label, current }) =>
                  current ? (
                    <span key={label} className="flex items-center px-4 py-3 text-sm font-bold"
                      style={{ color: '#10b981', background: '#ecfdf5' }}>{label}</span>
                  ) : (
                    <a key={label} href={href} target="_self"
                      className="flex items-center px-4 py-3 text-sm transition-colors"
                      style={{ color: C.text, textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      onClick={() => setMenuOpen(false)}>
                      {label}
                    </a>
                  )
                )}
              </div>
            </>
          )}
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
