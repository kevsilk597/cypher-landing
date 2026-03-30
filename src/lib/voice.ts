export const REQUEST_ACCESS_EMAIL = 'hello@cypher.local'

export const VOICE_COPY = {
  ctas: {
    requestAccess: 'Sign me up',
    signIn: 'Open the board',
    showScores: 'Show me the board',
    sendToStudio: 'Build in Studio',
    close: 'Close',
    openCard: 'Open full angle',
  },
  landing: {
    heroTitle: 'Walk in with the angle\nbefore anyone else sees it.',
    heroSubtitle:
      'Cypher finds what everyone else missed, then hands you the angle before the meeting even starts.',
    noBias:
      'No groupthink. No brand talking points. Just the stories that actually matter.',
    patternSummary:
      'This signal has tracked for three days. Six receipts. Cross-checked and sourced.',
    deliveryHeadlineTop: 'Your board, your way.',
    deliveryHeadlineBottom: 'Built for your beats. Always fresh.',
    deliveryBody:
      'Set your beats - teams, players, leagues. Cypher tracks the whole board and only sends what matters.',
    closeLine:
      "These are not guesses. These are real patterns hiding in plain sight until someone connects them.",
    features: {
      morningBriefTitle: 'Wake-Up Board',
      morningBriefBody: 'Six sharp things to know before your first call. Zero fluff.',
      breakingSignalsTitle: 'Breaking Signals',
      breakingSignalsBody: 'When a pattern breaks through, it hits your board right now.',
      developingStoriesTitle: 'Developing Stories',
      developingStoriesBody: 'Cypher keeps tracking the story while everyone else moves on.',
      crossLeagueTitle: 'Cross-League Intel',
      crossLeagueBody: 'Connections across leagues no single producer can track alone.',
    },
    signalToSegmentTitle: 'From Signal to Segment',
    signalToSegmentSubTitle: 'From raw signal to on-air angle in one tap.',
    signalToSegmentKicker:
      'Cypher does not just spot signal. It turns it into something you can pitch immediately.',
    signalToSegmentSmartLineA: 'The smartest person in the pitch meeting did not grind longer.',
    signalToSegmentSmartLineB: 'They walked in with Cypher.',
  },
  onboarding: {
    youAreIn: "You are in. Let's cook.",
    edgeStarts:
      'By the time the group chat wakes up, you already have your lead and your backup angle.',
  },
  insights: {
    emptyTitle: 'Nothing worth your time yet',
    emptyBody:
      'We are not going to put garbage on your board. Check back closer to game time.',
    loadingSlate: 'Pulling your board now...',
    loadingTitle: 'Cypher is in the film room right now.',
    loadingBody: 'While we stack your board, here is a deep-cut nugget for the group chat.',
    loadingTrivia: [
      'Wayne Gretzky had more career assists than any player has total points.',
      'Jerry Rice was over 40 and still caught touchdowns in the NFL.',
      'Nolan Ryan threw seven no-hitters - still the all-time record.',
      'Nikola Jokic has logged triple-doubles faster than some teams run a half-court set.',
      'Tom Brady won Super Bowls in three different decades.',
      'Hank Aaron finished with 755 home runs and over 2,200 RBIs.',
      'LeBron has seasons where his playoff minutes would equal a full extra regular season.',
      'The 1972 Dolphins still stand alone with a perfect season.',
    ],
    loadingQuiz: [
      {
        question: 'Which QB has the most career passing touchdowns in NFL history?',
        choices: ['Tom Brady', 'Drew Brees', 'Peyton Manning', 'Aaron Rodgers'],
        answerIndex: 0,
        explanation: 'Tom Brady finished with 649 regular-season passing TDs.',
      },
      {
        question: 'Who is the NBA all-time leader in total points?',
        choices: ['Kareem Abdul-Jabbar', 'LeBron James', 'Karl Malone', 'Kobe Bryant'],
        answerIndex: 1,
        explanation: 'LeBron passed Kareem and became the all-time scoring leader.',
      },
      {
        question: 'Which NFL team completed the only perfect season?',
        choices: ['1985 Bears', '1972 Dolphins', '2007 Patriots', '1994 49ers'],
        answerIndex: 1,
        explanation: 'The 1972 Miami Dolphins went undefeated and won the Super Bowl.',
      },
      {
        question: 'Who has the most career triple-doubles in NBA history?',
        choices: ['Magic Johnson', 'Oscar Robertson', 'Russell Westbrook', 'Nikola Jokic'],
        answerIndex: 2,
        explanation: 'Russell Westbrook owns the all-time triple-double record.',
      },
      {
        question: 'Which franchise has won the most Super Bowls?',
        choices: ['Patriots and Steelers', '49ers and Cowboys', 'Chiefs and Patriots', 'Steelers only'],
        answerIndex: 0,
        explanation: 'New England and Pittsburgh are tied for the most Super Bowl wins.',
      },
      {
        question: 'Which NBA player has the most career assists?',
        choices: ['John Stockton', 'Chris Paul', 'Jason Kidd', 'LeBron James'],
        answerIndex: 0,
        explanation: 'John Stockton is still the all-time assists leader.',
      },
    ],
    intelCardLabel: 'INTEL CARD',
    quickIntel: 'Quick Intel',
    timelineTitle: 'INTELLIGENCE TIMELINE',
    sectionCaught: 'Caught In 4K',
    sectionTonight: "Tonight's Angles",
    sectionHidden: 'Hidden Connections',
    sectionAfterBuzzer: 'After the Buzzer',
    whileLoadingLabel: 'WHILE WE PULL THE BOARD',
    browseOtherDates: 'Try another day. We stack fresh angles for every slate.',
  },
  angles: {
    pageTitle: 'Angles',
    pageSubtitle: "Today's intelligence",
    countLabel: (n: number) => `${n} ${n === 1 ? 'ANGLE' : 'ANGLES'} TODAY`,
    tapHint: 'Tap to open full angle',
    detailTheEdge: 'THE EDGE',
    detailWhyItMatters: 'WHY IT MATTERS',
    detailTheSignals: 'THE SIGNALS',
    detailTheCall: 'THE CALL',
    detailTheOtherSide: 'THE OTHER SIDE',
    savedEmptyTitle: 'No saved angles yet',
    savedEmptyBody: 'Hit the star on any angle that catches your eye. We will keep it here so you do not have to go hunting for it later.',
    savedCountLabel: (n: number) => `${n} SAVED ${n === 1 ? 'ANGLE' : 'ANGLES'}`,
  },
  scores: {
    yourTeams: 'Your Teams',
    incomingSoon: 'More on deck',
    timelineLabel: '',
    timelineHint: '',
    noGamesToday: 'No games on deck today.',
    noGamesOnDate: 'No games on that date.',
    browseOtherDates: 'Try another day. We stack fresh angles for every slate.',
    noTrackedTeamsFuture: 'Your squad is off that day.',
    noTrackedTeamsPast: 'Your squad did not play on that date.',
    addTeamsHint: 'Pick teams in Settings and this lane becomes your personal board.',
    favoriteMetaToday: (count: number) => `${count} on deck today`,
    favoriteMetaDefault: (count: number) => `${count} on deck`,
  },
  studio: {
    title: 'Studio',
    subtitle: 'Turn raw signal into a segment brief you can pitch right now.',
    unlockStudio: 'Unlock Studio',
    unlockHint: 'Unlock and build your own briefs',
    welcomeTitle: 'Build your first segment',
    welcomeBody:
      'Pick a strong signal and Cypher turns it into a producer-ready angle fast.',
    buildBrief: 'Build brief',
    browseSignals: 'Browse all signals',
    pipeline: 'Studio board',
    buildingBriefTitle: 'Building your brief',
    buildFailedTitle: 'Build got clipped',
    buildFailedBody: 'Your signal is safe. Run it back and we will finish the brief.',
    retry: 'Run it back',
    backToStudio: 'Back to Studio',
    noBeatsTitle: 'Set your angles first',
    noBeatsBody:
      'Add teams and sports so Cypher knows exactly what to track before writing your brief.',
    setUpBeats: 'Set up your angles',
    useSampleSignals: 'Try with sample signals',
    staleTitle: 'This might be stale',
    staleBody: 'This brief is older than 14 days. Refresh it before it goes on air.',
    exportOnePager: 'Export one-pager',
    shareToSlack: 'Share to Slack',
    markReady: 'Mark ready to pitch',
    markPitched: 'Mark as pitched',
    markAired: 'Mark as aired',
    moveFolder: 'Move lane',
    regenerate: 'Regenerate',
    deleteBrief: 'Delete brief',
    deleteConfirmTitle: 'Delete this brief?',
    deleteConfirmBody: 'This cannot be undone. The brief will be removed from your pipeline.',
    cancel: 'Cancel',
    markAiredTitle: 'Mark as aired',
    markAiredBody: 'Capture show metadata for your win log.',
    saveAndMarkAired: 'Save and mark aired',
    newBrief: '+ New brief',
    getStartedTitle: 'Get started',
    getStartedAction: 'Find a signal in Insights',
    getStartedBody: 'Tap Build My Segment on any card to spin up your first brief.',
  },
  edge: {
    noEdge: 'No edge on this one yet. If we do not have a take, we are not going to fake one.',
  },
  odds: {
    oddsAndPropsUnavailable: 'Books are dragging their feet on this one. Trust us, we want these numbers too.',
    propsUnavailable: 'Player props are not up yet. The books are slow, not us.',
    unavailableReasonPrefix: 'What happened:',
    unavailableReasonCopy: {
      not_ingested: 'We do not have this market yet. Working on it.',
      scheduled_no_market: 'Books have not posted numbers for this game yet. We will grab them the second they drop.',
      in_progress_no_market: 'Game is live and the numbers are still settling. Give it a sec.',
    },
    gameLinesLabel: 'Book Lines',
    closingLinesLabel: 'Closing Numbers',
    playerPropsLabel: 'Player lines',
    finalResultsHint: 'Final results versus the closing numbers.',
    topPlayersHint: 'Top two players per team, then best of the rest.',
  },
  preview: {
    noPreview: 'No preview yet. We are still doing the homework on this one.',
    seasonLeaders: 'Season pace-setters',
  },
  boxscore: {
    unavailable: 'Box score is not in yet. Scorekeepers are slower than we are.',
  },
  legacy: {
    todayFeed: {
      refreshError: 'Refresh took too long. Keeping your last clean board up.',
      accumulatingTitle: 'Board is heating up',
      accumulatingBody: (nextCycleTime: string) => `Next refresh window: ${nextCycleTime}`,
      noFilterMatch: 'No cards hit this filter yet.',
      leadLabel: "Tonight's Lead",
      footerAccumulating: 'Cypher is still stacking receipts.',
      footerNextCycle: (nextCycleTime: string) => `Next cycle: ${nextCycleTime}`,
    },
    myUniverse: {
      setupTitle: 'Build your board',
      setupBody: 'Tell us what you cover and we will stack your board around it.',
      yourSports: 'Your Sports',
      yourPriorities: 'Your Priorities',
      prioritiesBody: 'Teams, players, coaches - pushed to the top of your board.',
      searchPlaceholder: 'Search teams or players...',
      add: 'Add',
      buildUniverse: 'Build my board',
      skipNow: 'Skip for now',
      editUniverse: 'Edit board',
      all: 'All',
      prioritiesOnly: 'Priorities only',
      emptyTitle: 'No intelligence yet',
      emptyBody: 'Check back after the next cycle.',
    },
    library: {
      searchPlaceholder: 'Search saved cards...',
      collections: 'Collections',
      cancel: 'Cancel',
      newCollection: '+ New',
      collectionPlaceholder: 'Collection name...',
      create: 'Create',
      all: 'All',
      emptySavedTitle: 'No saved cards yet',
      emptySavedBody: 'Open any card on the board and save it.',
      noSearchMatch: 'No cards match this search.',
      removeAria: 'Remove from library',
    },
    saveSheet: {
      title: 'Save to collection',
      dialogLabel: 'Save this card to a collection',
    },
    signalDetail: {
      notFound: 'Signal not found.',
      backToUniverse: 'Back to board',
      sendToStudioHint: 'Turn this signal into a show-ready segment brief.',
      proUpgradeHint: 'Upgrade to Pro to turn signals into segment briefs.',
      trackingSince: (since: string, points: number) =>
        `Tracking since ${since} - ${points} receipt${points !== 1 ? 's' : ''}`,
    },
    buildSegmentFlow: {
      notFound: 'Signal not found.',
      backToUniverse: 'Back to board',
    },
    studioSheet: {
      fallbackHook: 'The data is telling a story most people missed.',
      fallbackEvidence: 'Signal data confirms this pattern across multiple sources.',
      fallbackAngle: 'This is the angle nobody else connected yet.',
      visualA: 'Side-by-side stat comparison, before vs after.',
      visualB: 'Trend line over the last 180 days.',
      visualC: 'Quote card with timestamp for the original take.',
      timeAdvantage: 'This is running 6 to 12 hours ahead of mainstream coverage. Window closes near game time.',
      dialogTitle: 'Segment Brief',
      copy: 'Copy',
      copied: 'Copied',
      close: 'Close',
      generating: 'Building your brief...',
      headline: 'Headline',
      hook: 'Hook',
      evidence: 'Evidence Stack',
      angle: 'Angle',
      visual: 'Visual Direction',
      timeAdvantageLabel: 'Time Advantage',
    },
  },
  toasts: {
    studioSent: 'Sent to Studio',
    segmentReady: 'Brief is ready. Go pitch it.',
    movedReady: 'Moved to Ready. Go pitch it.',
    movedPitched: 'Moved to Pitched. Nice work.',
    briefDeleted: 'Brief deleted.',
    movedFolder: 'Moved to lane.',
    movedToStage: (label: string) => `Moved to ${label}.`,
    copiedClipboard: 'Copied.',
    droppedSlack: 'Dropped in #first-take-pitches.',
    regenerated: 'Regenerated with fresh data.',
    markedAired: 'Marked as aired. That is a win.',
  },
} as const

export function requestAccessHref(preferGmail = false): string {
  if (preferGmail) {
    const to = encodeURIComponent(REQUEST_ACCESS_EMAIL)
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`
  }
  return `mailto:${REQUEST_ACCESS_EMAIL}`
}

export function openRequestAccess() {
  const mailto = requestAccessHref()
  const gmail = requestAccessHref(true)

  try {
    // Primary path: native/system compose.
    window.location.href = mailto
  } catch {
    // ignore
  }

  // If compose did not take focus, fall back to Gmail.
  window.setTimeout(() => {
    if (!document.hasFocus()) return
    window.open(gmail, '_blank', 'noopener,noreferrer')
  }, 650)
}

