export interface DataLabel {
  text: string;
  tier: 1 | 2 | 3;
}

export interface InsightCard {
  headline: string;
  body: string;
  timeAdvantage: string;
}

export interface FunnelState {
  name: string;
  labels: DataLabel[];
  connected: number[]; // indices of labels that get accent bezier lines
  insight: InsightCard;
}

export const FUNNEL_STATES: FunnelState[] = [
  {
    name: "NBA",
    labels: [
      // Tier 1 — The Obvious (6)
      { text: "season scoring average", tier: 1 },
      { text: "team win-loss record", tier: 1 },
      { text: "injury report status", tier: 1 },
      { text: "minutes per game", tier: 1 },
      { text: "upcoming schedule", tier: 1 },
      { text: "playoff seeding", tier: 1 },
      // Tier 2 — The Interesting (6)
      { text: "DNP-rest frequency shift", tier: 2 },
      { text: "fourth quarter usage decline", tier: 2 },
      { text: "teammate assist rate to Butler", tier: 2 },
      { text: "post-game handshake patterns", tier: 2 },
      { text: "minutes restriction trend", tier: 2 },
      { text: "free throw attempt drop-off", tier: 2 },
      // Tier 3 — The Holy Shit (8)
      { text: "press conference word count", tier: 3 },
      { text: "Instagram posting cadence drop", tier: 3 },
      { text: "cap space filings by Phoenix", tier: 3 },
      { text: "contract option deadline proximity", tier: 3 },
      { text: "X/Twitter activity silence duration", tier: 3 },
      { text: "locker room exit time after losses", tier: 3 },
      { text: "trade exception creation timing", tier: 3 },
      { text: "beat writer question deflection rate", tier: 3 },
    ],
    connected: [12, 13, 14, 16, 18, 19, 6], // press conf, instagram, cap space, twitter, trade exception, beat writer, DNP-rest
    insight: {
      headline:
        "11 behavioral signals are converging on a trade request.",
      body: "His pressers collapsed to 9-word answers. His timeline went dark for 11 days. And Phoenix just created a $3.8M trade exception that nobody asked about. He hasn\u2019t said a word \u2014 but his behavior is screaming.",
      timeAdvantage: "4 days before Shams broke the trade.",
    },
  },
  {
    name: "MLB",
    labels: [
      // Tier 1
      { text: "ERA this season", tier: 1 },
      { text: "win-loss record", tier: 1 },
      { text: "strikeouts per start", tier: 1 },
      { text: "pitch count per outing", tier: 1 },
      { text: "days between starts", tier: 1 },
      { text: "opponent batting average", tier: 1 },
      // Tier 2
      { text: "fastball velocity trend line", tier: 2 },
      { text: "first-inning pitch count creep", tier: 2 },
      { text: "swinging strike rate decline", tier: 2 },
      { text: "bullpen warming frequency", tier: 2 },
      { text: "chase rate against his splitter", tier: 2 },
      { text: "pitch mix percentage shift", tier: 2 },
      // Tier 3
      { text: "splitter spin rate decay curve", tier: 3 },
      { text: "release point drift by millimeter", tier: 3 },
      { text: "time between pitches increasing", tier: 3 },
      { text: "game-time humidity at venue", tier: 3 },
      { text: "Triple-A arm optioned quietly", tier: 3 },
      { text: "mound visit frequency spike", tier: 3 },
      { text: "grip pressure proxy via break angle", tier: 3 },
      { text: "catcher setup location shift pattern", tier: 3 },
    ],
    connected: [12, 13, 14, 15, 16, 17, 6], // splitter spin, release point, time between, humidity, triple-a, mound visit, fastball velocity
    insight: {
      headline:
        "6 micro-physical markers are tracking toward an IL stint.",
      body: "Ohtani\u2019s splitter has lost 6% of its spin in four starts. He\u2019s taking 3 extra seconds between pitches. His release point drifted an inch toward first base \u2014 his elbow is making him compensate. And the Dodgers quietly called up a reliever nobody needed. They know.",
      timeAdvantage: "6 days before the IL announcement.",
    },
  },
  {
    name: "NFL",
    labels: [
      // Tier 1
      { text: "team win-loss record", tier: 1 },
      { text: "quarterback passer rating", tier: 1 },
      { text: "offensive yards per game", tier: 1 },
      { text: "red zone conversion rate", tier: 1 },
      { text: "turnover differential", tier: 1 },
      { text: "point spread movement", tier: 1 },
      // Tier 2
      { text: "intended air yards declining weekly", tier: 2 },
      { text: "completion % by depth bucket collapse", tier: 2 },
      { text: "third-down conversion rate by week", tier: 2 },
      { text: "time to throw under clean pressure", tier: 2 },
      { text: "red zone TD% four-week trend", tier: 2 },
      { text: "turnover-worthy play rate spike", tier: 2 },
      // Tier 3
      { text: "press conference \u2018we\u2019 to \u2018I\u2019 language shift", tier: 3 },
      { text: "coordinator play-call autonomy increasing", tier: 3 },
      { text: "historical benching pattern match (4 of 4)", tier: 3 },
      { text: "post-loss body language deviation score", tier: 3 },
      { text: "scramble rate spike without designed runs", tier: 3 },
      { text: "4th quarter usage rate cratering", tier: 3 },
      { text: "play-action success rate collapse", tier: 3 },
      { text: "backup QB practice rep allocation change", tier: 3 },
    ],
    connected: [6, 12, 14, 17, 16, 18, 13], // intended air yards, press conf we/I, historical bench, 4th qtr, scramble, play-action, coordinator
    insight: {
      headline:
        "4 of 4 historical pattern markers matched. Benching probability: high.",
      body: "His intended air yards have dropped every week for a month \u2014 he\u2019s stopped trusting his arm. His passer rating in the 4th quarter has cratered to 61. And his coach just referred to him as \u2018the quarterback\u2019 three times in one presser. The last four QBs who hit this exact statistical trajectory were benched within two weeks. Dak will be the fifth.",
      timeAdvantage: "13 days before the benching.",
    },
  },
];
