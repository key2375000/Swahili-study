
import type { VocabEntry } from '../types';

export const FULL_VOCABULARY: VocabEntry[] = [
  // from initial lesson (updated)
  { swahili: 'kula', korean: '먹다', exampleSentences: ['Ninakula ugali.', 'Watu wanakula chakula.'], category: 'Common Actions (verbs)', grammar: "동사. 주어 접두사와 시제 표지와 함께 사용됩니다. 예: Ni-na-kula (나는 먹는다), U-na-kula (너는 먹는다)." },
  { swahili: 'pika', korean: '요리하다', exampleSentences: ['Ninapika chakula.', 'Mama anapika jikoni.'], category: 'Common Actions (verbs)', grammar: "동사. 어간: -pika." },
  { swahili: 'lala', korean: '자다', exampleSentences: ['Ninalala sasa.', 'Mtoto analala kitandani.'], category: 'Common Actions (verbs)', grammar: "동사. 어간: -lala." },
  { swahili: 'soma', korean: '읽다/공부하다', exampleSentences: ['Ninasoma kitabu.', 'Wanafunzi wanasoma shuleni.'], category: 'Common Actions (verbs)', grammar: "동사. 주어 접두사와 시제 표지와 함께 사용됩니다. 예: Ni-na-soma (나는 읽는다), U-na-soma (너는 읽는다), A-na-soma (그는 읽는다)." },
  { swahili: 'chai', korean: '차', exampleSentences: ['Ninapenda chai.', 'Karibu chai.'], category: 'Food & Drink', grammar: "명사 (N-N class). 단수형과 복수형이 같습니다." },
  { swahili: 'maji', korean: '물', exampleSentences: ['Tafadhali, nipe maji.', 'Ninakunywa maji.'], category: 'Food & Drink', grammar: "명사 (MA class). 복수형으로만 사용됩니다." },
  { swahili: 'ugali', korean: '우갈리', exampleSentences: ['Ninakula ugali.', 'Ugali ni chakula maarufu Kenya.'], category: 'Food & Drink', grammar: "명사 (U class). 보통 단수형으로 사용됩니다." },
  
  // existing words (updated)
  { swahili: 'jambo', korean: '안녕 (일반적 인사)', exampleSentences: ['Jambo! Habari gani?', 'Watalii wanasema "Jambo".'], category: 'People & Relationships', grammar: "관광객에게 주로 사용되는 간단한 인사말입니다. 현지인은 'Mambo' 또는 'Habari'를 더 자주 씁니다." },
  { swahili: 'mambo', korean: '안녕 (친구에게)', exampleSentences: ['Mambo vipi?', 'Mambo, poa.'], category: 'People & Relationships', grammar: "비격식적인 인사말로, 친구나 젊은 사람들 사이에서 흔하게 사용됩니다." },
  { swahili: 'asante', korean: '고맙습니다', exampleSentences: ['Asante sana.', 'Asante kwa chakula.'], category: 'People & Relationships' },
  { swahili: 'karibu', korean: '천만에요 / 환영합니다', exampleSentences: ['Karibu Kenya.', 'Asante. Karibu.'], category: 'People & Relationships' },
  { swahili: 'ndiyo', korean: '네', exampleSentences: ['Unapenda kahawa? Ndiyo.', 'Hii ni sahihi? Ndiyo.'], category: 'Common Actions (verbs)' },
  { swahili: 'hapana', korean: '아니요', exampleSentences: ['Una njaa? Hapana.', 'Hapana, asante.'], category: 'Common Actions (verbs)' },
  { swahili: 'enda', korean: '가다', exampleSentences: ['Ninaenda sokoni.', 'Tunaenda kanisani.'], category: 'Movement & Transportation', grammar: "동사. 어간: -enda." },
  { swahili: 'kuja', korean: '오다', exampleSentences: ['Anakuja kesho.', 'Njoo hapa! (이리로 와!)'], category: 'Movement & Transportation', grammar: "동사. 어간: -ja. 명령형은 'njoo'입니다." },
  { swahili: 'nunua', korean: '사다', exampleSentences: ['Ninanunua matunda.', 'Alienda kununua mkate.'], category: 'Market & Money', grammar: "동사. 어간: -nunua." },
  { swahili: 'taka', korean: '원하다', exampleSentences: ['Ninataka maji.', 'Unataka nini?'], category: 'Common Actions (verbs)', grammar: "동사. 어간: -taka." },
  { swahili: 'penda', korean: '좋아하다/사랑하다', exampleSentences: ['Ninapenda Swahili.', 'Nakupenda (사랑해).'], category: 'Emotions & Feelings', grammar: "동사. 어간: -penda." },
  { swahili: 'nyumba', korean: '집', exampleSentences: ['Hii ni nyumba yangu.', 'Wanaishi katika nyumba kubwa.'], category: 'Home & Daily Life', grammar: "명사 (N-N class). 단수형과 복수형이 같습니다: nyumba (집), nyumba (집들)." },
  { swahili: 'chakula', korean: '음식', exampleSentences: ['Chakula ni kitamu.', 'Pika chakula cha jioni.'], category: 'Food & Drink', grammar: "명사 (KI-VI class). 단수형: chakula, 복수형: vyakula." },
  { swahili: 'soko', korean: '시장', exampleSentences: ['Ninaenda sokoni.', 'Soko lina watu wengi.'], category: 'Market & Money', grammar: "명사 (JI-MA class). 단수형: soko, 복수형: masoko. '-ni'는 장소를 나타냅니다 (sokoni = 시장에)." },
  { swahili: 'rafiki', korean: '친구', exampleSentences: ['Yeye ni rafiki yangu.', 'Nina rafiki wengi.'], category: 'People & Relationships', grammar: "명사 (N-N class). 단수형과 복수형이 같습니다." },
  { swahili: 'mtoto', korean: '아이', exampleSentences: ['Mtoto analala.', 'Watoto wanacheza.'], category: 'People & Relationships', grammar: "명사 (M-WA class). 단수형: mtoto, 복수형: watoto. 사람을 나타냅니다." },
  { swahili: 'mgonjwa', korean: '아픈/환자', exampleSentences: ['Mimi ni mgonjwa.', 'Daktari anasaidia wagonjwa.'], category: 'Health & Hospital', grammar: "명사 (M-WA class) 또는 형용사. 사람을 묘사할 때 사용됩니다." },
  { swahili: 'daktari', korean: '의사', exampleSentences: ['Ninaenda kwa daktari.', 'Daktari anafanya kazi hospitalini.'], category: 'Health & Hospital', grammar: "명사 (N-N class). 단수형: daktari, 복수형: madaktari (MA class 복수형을 따름)." },
  { swahili: 'kanisa', korean: '교회', exampleSentences: ['Tunaenda kanisani Jumapili.', 'Kanisa ni kubwa.'], category: 'Church & Community', grammar: "명사 (JI-MA class). 단수형: kanisa, 복수형: makanisa." },

  // New detailed dictionary words
  { swahili: 'kitabu', korean: '책', exampleSentences: ['Ninasoma kitabu kizuri.', 'Vitabu viko mezani.'], category: 'Home & Daily Life', grammar: "명사 (KI-VI class). 단수형: kitabu, 복수형: vitabu. 사물을 나타내는 대표적인 클래스입니다." },
  { swahili: 'jina', korean: '이름', exampleSentences: ['Jina lako ni nani?', 'Majina yao ni Maria na John.'], category: 'People & Relationships', grammar: "명사 (JI-MA class). 단수형: jina, 복수형: majina." },
  { swahili: '-zuri', korean: '좋은/아름다운', exampleSentences: ['mtu mzuri (좋은 사람)', 'kitabu kizuri (좋은 책)', 'nyumba nzuri (좋은 집)'], category: 'Adjectives & Descriptions', grammar: "형용사 어간. 명사 클래스에 따라 접두사가 바뀝니다. 예: m-zuri, ki-zuri, n-zuri, ma-zuri." },
  { swahili: 'fanya', korean: '하다/만들다', exampleSentences: ['Ninafanya kazi.', 'Unfanya nini?'], category: 'Common Actions (verbs)', grammar: '동사. "do" 또는 "make"에 해당하는 매우 일반적인 동사입니다.' },
  { swahili: 'kwenda', korean: '가다 (부정사)', exampleSentences: ['Ninapenda kwenda sokoni.', 'Tunataka kwenda Nairobi.'], category: 'Movement & Transportation', grammar: "동사 부정사 형태. 동사 어간 '-enda'에 부정사 접두사 'ku-'가 붙은 형태입니다." },
  { swahili: 'gari', korean: '차/자동차', exampleSentences: ['Nina gari jipya.', 'Magari ni mengi barabarani.'], category: 'Movement & Transportation', grammar: "명사 (JI-MA class). 단수형: gari, 복수형: magari." },
  { swahili: 'kazi', korean: '일/직업', exampleSentences: ['Ninafanya kazi.', 'Kazi yangu ni ualimu.'], category: 'Market & Money', grammar: "명사 (N-N class). 단수형과 복수형이 같습니다." },
  { swahili: 'pole', korean: '미안합니다/안됐군요', exampleSentences: ["Pole kwa kuchelewa (늦어서 미안해).", "Umeanguka? Pole."], category: 'Emotions & Feelings', grammar: "위로, 공감, 사과 등 다양한 상황에서 사용되는 중요한 단어입니다." },
  { swahili: 'habari', korean: '소식/뉴스', exampleSentences: ['Habari gani? (무슨 소식이야? = 어떻게 지내?)', 'Ninasikiliza habari.'], category: 'People & Relationships', grammar: "인사말로 매우 흔하게 사용됩니다. 'Habari ya asubuhi?' (아침 인사)"},
  { swahili: 'moja', korean: '하나 (1)', exampleSentences: ['Nipe tufaha moja.', 'Mtoto mmoja.'], category: 'Numbers & Time', grammar: "숫자. 명사 클래스에 따라 형태가 바뀔 수 있습니다." },
  { swahili: 'mbili', korean: '둘 (2)', exampleSentences: ['Ninaitaji vikombe viwili.', 'Watu wawili.'], category: 'Numbers & Time', grammar: "숫자. 명사 클래스에 따라 형태가 바뀝니다. 예: wa-wili, vi-wili." },
  { swahili: 'tatu', korean: '셋 (3)', exampleSentences: ['Kuna paka watatu.', 'Siku tatu.'], category: 'Numbers & Time', grammar: "숫자. 명사 클래스에 따라 형태가 바뀝니다." },
  { swahili: 'leo', korean: '오늘', exampleSentences: ['Leo ni siku nzuri.', 'Nitakuona leo.'], category: 'Numbers & Time', grammar: "시간을 나타내는 부사." },
  { swahili: 'kesho', korean: '내일', exampleSentences: ['Tutaonana kesho.', 'Kesho ni Jumatatu.'], category: 'Numbers & Time', grammar: "시간을 나타내는 부사." },
  { swahili: 'jana', korean: '어제', exampleSentences: ['Jana nilikuwa na shughuli nyingi.', 'Alifika jana.'], category: 'Numbers & Time', grammar: "시간을 나타내는 부사." },
  { swahili: 'simba', korean: '사자', exampleSentences: ['Simba ni mfalme wa wanyama.', 'Tuliona simba kwenye safari.'], category: 'Nature & Animals', grammar: "명사 (N-N class). 단수형과 복수형이 같습니다." },
  { swahili: 'tembo', korean: '코끼리', exampleSentences: ['Tembo ni mkubwa sana.', 'Kenya ina tembo wengi.'], category: 'Nature & Animals', grammar: "명사 (N-N class). 단수형과 복수형이 같습니다." },
];
