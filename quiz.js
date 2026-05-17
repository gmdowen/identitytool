(function () {
  'use strict';

  // ========== CONFIG ==========
  const CONFIG = {
    CALENDLY_URL: 'https://calendly.com/gmdowen/1on1withgareth',
    INSTAGRAM_URL: 'https://instagram.com/gareth.owen',
    YOUTUBE_URL: 'https://www.youtube.com/@garethowen',
    // Lead capture goes to Gareth's Gmail via FormSubmit (no signup required).
    // First quiz submission will trigger a one-time confirmation email from
    // FormSubmit to Gmdowen@gmail.com. Click the link in it once and all
    // future leads arrive instantly as formatted emails.
    LEAD_ENDPOINT: 'https://formsubmit.co/ajax/Gmdowen@gmail.com',
  };

  // ========== QUESTIONS ==========
  const QUESTIONS = [
    {
      id: 'Q1',
      type: 'slider',
      text: "When you look at your life right now, your routine, your body, your business, your relationships, how aligned does it feel with the man you know you're meant to be?",
      min: 0, max: 10, default: 5,
      labels: { left: 'Total misalignment', right: 'Perfectly aligned' },
    },
    {
      id: 'Q2',
      type: 'abcd',
      text: "What does the voice in your head sound like most days?",
      options: [
        { v: 'A', t: "Mostly negative. I doubt myself, replay failures, and second-guess every move I make." },
        { v: 'B', t: "Mixed. Depends on the day, the situation, who I am around." },
        { v: 'C', t: "Mostly neutral. I try not to overthink, I just get on with it." },
        { v: 'D', t: "Mostly empowering. I talk to myself like a coach. I expect to win." },
      ],
    },
    {
      id: 'Q3',
      type: 'abcd',
      text: "Describe your current morning.",
      options: [
        { v: 'A', t: "Roll out of bed when I have to, grab coffee, scroll through my phone, react to whatever the day throws at me." },
        { v: 'B', t: "I have a vague routine but I miss it half the time." },
        { v: 'C', t: "I have a routine that mostly holds 4 or 5 days a week." },
        { v: 'D', t: "I have a non-negotiable morning protocol I hit 6 or 7 days a week." },
      ],
    },
    {
      id: 'Q4',
      type: 'abcd',
      text: "In the last 12 months, what have you actually invested in yourself? Coaching, programs, masterminds, books, gear, environment. Not free YouTube.",
      options: [
        { v: 'A', t: "Nothing, or close to nothing." },
        { v: 'B', t: "Under $1,000." },
        { v: 'C', t: "$1,000 to $5,000." },
        { v: 'D', t: "Over $5,000." },
      ],
    },
    {
      id: 'Q5',
      type: 'abcd',
      text: "The last time someone gave you hard, direct, uncomfortable feedback, how did you actually handle it?",
      options: [
        { v: 'A', t: "Got defensive, made excuses, or wrote them off internally." },
        { v: 'B', t: "Felt hurt at first. Took a while to come around." },
        { v: 'C', t: "Took it on board after some processing and made adjustments." },
        { v: 'D', t: "Sat with it, found the truth in it, and was using it as fuel within 48 hours." },
      ],
    },
    {
      id: 'Q6',
      type: 'abcd',
      text: "If a man you deeply respected sat across from you right now and asked you to name the one truth about your life you have been avoiding, could you?",
      options: [
        { v: 'A', t: "No. I would deflect, joke about it, or change the subject." },
        { v: 'B', t: "I could name it in my head, but I would not say it out loud." },
        { v: 'C', t: "I could name it honestly, but I have not taken action on it yet." },
        { v: 'D', t: "I have already named it, owned it, and I am in motion on it." },
      ],
    },
    {
      id: 'Q7',
      type: 'abcd',
      text: "How often do you actually sit with an uncomfortable truth about yourself, without numbing it (scrolling, drinking, training, working, eating, sex)?",
      options: [
        { v: 'A', t: "Almost never. I find a way to bury it before it really lands." },
        { v: 'B', t: "Rarely. The discomfort wins and I escape." },
        { v: 'C', t: "Sometimes. I can hold it for a while before I move on." },
        { v: 'D', t: "Often. Sitting in it is where the real work happens for me." },
      ],
    },
    {
      id: 'Q8',
      type: 'abcd',
      text: "When you are chasing a goal, what fuels you more?",
      options: [
        { v: 'A', t: "Pain. Fear of staying stuck where I am, what people will think, the regret I will carry." },
        { v: 'B', t: "Honestly, it shifts. Sometimes pain, sometimes purpose, often neither." },
        { v: 'C', t: "A vision of who I am becoming, but I lose sight of it under stress." },
        { v: 'D', t: "Purpose. A reason bigger than me that I return to every single day, no matter how I feel that morning." },
      ],
    },
    {
      id: 'Q9',
      type: 'abcd',
      text: "How much do other people's opinions affect what you do?",
      options: [
        { v: 'A', t: "Heavily. I adjust my behaviour based on what others might think." },
        { v: 'B', t: "More than I would like to admit, even if I do not show it." },
        { v: 'C', t: "Some. I notice it but I can usually push past it." },
        { v: 'D', t: "Almost none. I have decided whose opinions I want at my funeral. The rest is noise." },
      ],
    },
    {
      id: 'Q10',
      type: 'abcd',
      text: "How clearly can you describe the man you are becoming over the next 12 months?",
      options: [
        { v: 'A', t: "Not very. I want more but I cannot paint the picture." },
        { v: 'B', t: "Vaguely. I have ideas but they are fuzzy." },
        { v: 'C', t: "Pretty clearly. I can describe most of him." },
        { v: 'D', t: "Crystal clear. His habits, his calendar, his energy, how he walks into a room." },
      ],
    },
    {
      id: 'Q11',
      type: 'abcd',
      text: "When you decide to make a change, what usually happens?",
      options: [
        { v: 'A', t: "I think about it for weeks, sometimes months, before I act. If I act at all." },
        { v: 'B', t: "I start strong but lose momentum within a few weeks." },
        { v: 'C', t: "I start within a few days and follow through more often than not." },
        { v: 'D', t: "I move within 24 to 48 hours and I hold the line until it is done." },
      ],
    },
    {
      id: 'Q12',
      type: 'abcd',
      text: "If the right opportunity to transform your identity showed up today, with the right coach, the right structure, the right accountability, what would you do?",
      options: [
        { v: 'A', t: "Think about it for a while, maybe come back to it later." },
        { v: 'B', t: "Want to, but I would need to figure out the money or the timing." },
        { v: 'C', t: "Seriously explore it and probably move within a week." },
        { v: 'D', t: "Move on it now. I have waited long enough." },
      ],
    },
  ];

  // ========== ANSWER SCORING ==========
  // A=0, B=3, C=7, D=10. Slider value used directly.
  const LETTER_SCORE = { A: 0, B: 3, C: 7, D: 10 };

  // Weights for the two composite scores
  const IDENTITY_WEIGHTS = { Q1: 2, Q2: 1, Q3: 1, Q8: 1, Q9: 1, Q10: 1, Q11: 1 }; // max 80
  const COACH_WEIGHTS = { Q4: 2, Q5: 1, Q6: 1, Q7: 1, Q12: 2 }; // max 70

  // ========== ARCHETYPES ==========
  const ARCHETYPES = {
    Drifter: {
      name: 'The Drifter',
      desc: "You are going through the motions. The fire that should be lighting your decisions is dim, and when truth shows up at your door, you have a thousand ways to dodge it. You believe you are capable of more. You have been believing that for years.",
    },
    Seeker: {
      name: 'The Seeker',
      desc: "You know exactly how far you are from the man you are meant to be. You feel the gap every single day. But the fire is lit, you are hungry, and you are willing to face hard truth when it shows up. This is the most dangerous position to be in. The right structure right now changes everything.",
    },
    LoneWolf: {
      name: 'The Lone Wolf',
      desc: "You have built something. From the outside, things look good. But you do not take help easily, you do not sit with feedback well, and the next ceiling above you is one you cannot break alone. The skills that got you here will not get you there.",
    },
    Operator: {
      name: 'The Operator',
      desc: "You are already executing at a high level. Strong habits, clear vision, coachable mindset. You are not far from your dream identity. The work from here is precision. Surrounding yourself with the right people, refining the next layer, holding the line.",
    },
  };

  // ========== GAP DIAGNOSES ==========
  const GAP_DIAGNOSES = {
    Q1: "Massive misalignment between who you are and who you are meant to be. You feel it every single morning.",
    Q2: "Your inner voice is your loudest critic. You would not let another man speak to you the way you speak to yourself.",
    Q3: "No daily protocol. You are at the mercy of motivation, and motivation does not show up most days.",
    Q4: "You spend money on everything except yourself. The truth is in your spending.",
    Q5: "You cannot take hard feedback yet. No coach, no friend, no system can help you until that changes.",
    Q6: "You cannot name the truth you have been avoiding. Naming it out loud is the first move.",
    Q7: "You numb the discomfort instead of sitting with it. The work lives inside the discomfort, not around it.",
    Q8: "You are running on pain instead of purpose. Pain runs out. Purpose compounds.",
    Q9: "Other people's opinions are still writing your script. Until you decide whose matter, you will keep performing for the wrong audience.",
    Q10: "Your vision of the future is blurry. You cannot hit a target you cannot see.",
    Q11: "You think more than you act. The man you want to be moves first and thinks while moving.",
    Q12: "When opportunity shows up, you delay. You have built a relationship with hesitation.",
  };

  // ========== STATE ==========
  const state = {
    lead: { name: '', email: '', ig: '' },
    answers: {}, // { Q1: 5, Q2: 'B', ... }
    currentIndex: 0,
    results: null,
  };

  // ========== UTIL ==========
  function $(sel) { return document.querySelector(sel); }
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'on') for (const ev in attrs.on) e.addEventListener(ev, attrs.on[ev]);
      else if (k === 'html') e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (children) children.forEach(c => e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return e;
  }
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $('#' + id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========== SCORING ==========
  function rawScore(qId) {
    const a = state.answers[qId];
    if (a === undefined) return 0;
    if (typeof a === 'number') return a; // slider
    return LETTER_SCORE[a] ?? 0;
  }

  function computeIdentityScore() {
    let raw = 0, max = 0;
    for (const q in IDENTITY_WEIGHTS) {
      raw += rawScore(q) * IDENTITY_WEIGHTS[q];
      max += 10 * IDENTITY_WEIGHTS[q];
    }
    return Math.round((raw / max) * 100);
  }

  function computeCoachabilityScore() {
    let raw = 0, max = 0;
    for (const q in COACH_WEIGHTS) {
      raw += rawScore(q) * COACH_WEIGHTS[q];
      max += 10 * COACH_WEIGHTS[q];
    }
    return Math.round((raw / max) * 100);
  }

  function computeArchetype(identity, coach) {
    const highId = identity >= 50;
    const highCoach = coach >= 50;
    if (!highId && !highCoach) return 'Drifter';
    if (!highId && highCoach) return 'Seeker';
    if (highId && !highCoach) return 'LoneWolf';
    return 'Operator';
  }

  function computeQualification() {
    const reasons = [];
    if (state.answers.Q4 === 'A') reasons.push('investment');
    if (state.answers.Q5 === 'A') reasons.push('coachability');
    if (state.answers.Q12 === 'A') reasons.push('action');
    const coach = computeCoachabilityScore();
    if (reasons.length === 0 && coach < 65) reasons.push('threshold');
    return { qualified: reasons.length === 0, blockers: reasons };
  }

  function computeTopGaps() {
    const scored = QUESTIONS.map(q => ({ id: q.id, score: rawScore(q.id) }));
    scored.sort((a, b) => a.score - b.score || QUESTIONS.findIndex(q => q.id === a.id) - QUESTIONS.findIndex(q => q.id === b.id));
    return scored.slice(0, 3).map(s => ({ id: s.id, text: GAP_DIAGNOSES[s.id] }));
  }

  function computeResults() {
    const identity = computeIdentityScore();
    const coach = computeCoachabilityScore();
    const archetype = computeArchetype(identity, coach);
    const qualification = computeQualification();
    const gaps = computeTopGaps();
    return { identity, coach, archetype, qualification, gaps };
  }

  // ========== LANDING ==========
  function initLanding() {
    $('#lead-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      let ig = $('#ig').value.trim();
      if (!name || !email || !ig) return;
      if (!ig.startsWith('@')) ig = '@' + ig;
      state.lead = { name, email, ig };
      try { localStorage.setItem('ic_lead', JSON.stringify(state.lead)); } catch (e) {}
      showScreen('screen-quiz');
      renderQuestion();
    });
    // Restore saved lead info if present
    try {
      const saved = localStorage.getItem('ic_lead');
      if (saved) {
        const l = JSON.parse(saved);
        if (l.name) $('#name').value = l.name;
        if (l.email) $('#email').value = l.email;
        if (l.ig) $('#ig').value = l.ig;
      }
    } catch (e) {}
  }

  // ========== QUIZ ==========
  function renderQuestion() {
    const q = QUESTIONS[state.currentIndex];
    const pct = ((state.currentIndex) / QUESTIONS.length) * 100;
    $('#progress-fill').style.width = pct + '%';
    $('#q-counter').textContent = `Question ${state.currentIndex + 1} of ${QUESTIONS.length}`;
    $('#q-text').textContent = q.text;
    const opts = $('#q-options');
    opts.innerHTML = '';
    if (q.type === 'slider') {
      const wrap = el('div', { class: 'slider-wrap' });
      const row = el('div', { class: 'slider-track-row' }, [
        el('span', null, [q.labels.left]),
        el('span', null, [q.labels.right]),
      ]);
      const slider = el('input', {
        type: 'range', min: String(q.min), max: String(q.max),
        step: '1', class: 'slider',
        value: String(state.answers[q.id] !== undefined ? state.answers[q.id] : q.default),
      });
      const valueEl = el('div', { class: 'slider-value' });
      function updateValue() {
        valueEl.innerHTML = '';
        valueEl.appendChild(document.createTextNode(slider.value));
        const suffix = el('span', { class: 'slider-value-suffix' }, [' / 10']);
        valueEl.appendChild(suffix);
      }
      slider.addEventListener('input', () => {
        state.answers[q.id] = parseInt(slider.value, 10);
        updateValue();
        $('#btn-next').disabled = false;
      });
      updateValue();
      wrap.appendChild(row);
      wrap.appendChild(slider);
      wrap.appendChild(valueEl);
      opts.appendChild(wrap);
      // Slider always has a value
      if (state.answers[q.id] === undefined) {
        state.answers[q.id] = q.default;
      }
      $('#btn-next').disabled = false;
    } else {
      q.options.forEach((opt) => {
        const isSelected = state.answers[q.id] === opt.v;
        const btn = el('button', {
          type: 'button',
          class: 'option' + (isSelected ? ' selected' : ''),
          on: {
            click: () => {
              state.answers[q.id] = opt.v;
              renderQuestion();
              $('#btn-next').disabled = false;
            },
          },
        }, [
          el('span', { class: 'option-letter' }, [opt.v]),
          el('span', { class: 'option-text' }, [opt.t]),
        ]);
        opts.appendChild(btn);
      });
      $('#btn-next').disabled = state.answers[q.id] === undefined;
    }
    $('#btn-back').disabled = state.currentIndex === 0;
    const lastIndex = QUESTIONS.length - 1;
    $('#btn-next').textContent = state.currentIndex === lastIndex ? 'See My Results' : 'Next';
  }

  function initQuiz() {
    $('#btn-next').addEventListener('click', () => {
      if (state.currentIndex < QUESTIONS.length - 1) {
        state.currentIndex++;
        renderQuestion();
      } else {
        finishQuiz();
      }
    });
    $('#btn-back').addEventListener('click', () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderQuestion();
      }
    });
  }

  // ========== CALCULATING ==========
  function finishQuiz() {
    state.results = computeResults();
    $('#progress-fill').style.width = '100%';
    showScreen('screen-calculating');
    // Fire lead capture in background
    submitLead(state.lead, state.answers, state.results)
      .catch(err => console.warn('Lead capture failed (non-blocking):', err));
    setTimeout(() => {
      showScreen('screen-results');
      renderResults();
    }, 2200);
  }

  // ========== LEAD CAPTURE ==========
  // Posts a human-readable payload to FormSubmit, which emails Gareth.
  // Each lead arrives as a formatted email with full question text and
  // selected answer text so it can be scanned at a glance.
  async function submitLead(lead, answers, results) {
    if (!CONFIG.LEAD_ENDPOINT) return;
    const archetypeName = ARCHETYPES[results.archetype].name;
    const status = results.qualification.qualified
      ? 'QUALIFIED: book the call'
      : 'UNQUALIFIED: nurture path';
    const blockers = results.qualification.blockers.join(', ') || 'none';

    const payload = {
      _subject: `New Identity Calculator Lead: ${lead.name} (${results.qualification.qualified ? 'QUALIFIED' : 'UNQUALIFIED'})`,
      _template: 'table',
      _captcha: 'false',
      _replyto: lead.email,
      'Name': lead.name,
      'Email': lead.email,
      'Instagram': lead.ig,
      'Status': status,
      'Identity Score': `${results.identity} / 100`,
      'Coachability Score': `${results.coach} / 100`,
      'Archetype': archetypeName,
      'Blockers': blockers,
      'Submitted': new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
    };

    QUESTIONS.forEach((q, i) => {
      const a = answers[q.id];
      let answerText;
      if (q.type === 'slider') {
        answerText = `${a} / 10`;
      } else {
        const opt = q.options.find(o => o.v === a);
        answerText = opt ? `${a}. ${opt.t}` : String(a ?? '');
      }
      const num = String(i + 1).padStart(2, '0');
      payload[`Q${num}. ${q.text}`] = answerText;
    });

    try {
      await fetch(CONFIG.LEAD_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.warn('Lead POST error', e);
    }
  }

  // ========== RESULTS ==========
  function renderResults() {
    const r = state.results;
    const arche = ARCHETYPES[r.archetype];

    animateNumber('#identity-score', 0, r.identity, 1400);
    animateNumber('#coach-score', 0, r.coach, 1400);
    setTimeout(() => { $('#coach-fill').style.width = r.coach + '%'; }, 200);

    $('#archetype-name').textContent = arche.name;
    $('#archetype-desc').textContent = arche.desc;

    const gapsList = $('#gaps-list');
    gapsList.innerHTML = '';
    r.gaps.forEach(g => {
      gapsList.appendChild(el('li', null, [g.text]));
    });

    renderVerdict(r);
    renderCTAs(r);
  }

  function renderVerdict(r) {
    const block = $('#verdict-block');
    block.innerHTML = '';
    const q = r.qualification;
    if (q.qualified) {
      block.appendChild(el('h3', null, ['You are the kind of man this work was built for.']));
      block.appendChild(el('p', { html: `Based on your answers, you are not where you want to be, and you know it. The fire is lit. You are hungry. You are coachable. You are ready to move. <strong>Let us get on a call.</strong>` }));
      block.appendChild(el('p', { html: `Programs start at <strong>$3,500</strong> for the strongest results. The higher the commitment you make, the deeper the transformation you walk out with. Full details on the call.` }));
    } else if (q.blockers.includes('coachability')) {
      block.appendChild(el('h3', null, ['Build the muscle first. Then come back.']));
      block.appendChild(el('p', null, ['Your relationship with hard, direct feedback would make coaching frustrating for both of us right now. Coaching only works when truth lands. That muscle has to be built before this work can land.']));
      block.appendChild(el('p', null, ['Stay up to date with both Instagram and YouTube while you do the work. I will keep meeting you where you are.']));
    } else {
      block.appendChild(el('h3', null, ['Come back when you are ready.']));
      block.appendChild(el('p', null, ['Right now, you are not in a position to invest in yourself the way this work requires. That is okay, but it is not the work we are doing here.']));
      block.appendChild(el('p', null, ['Until then, stay up to date with both Instagram and YouTube, and I will continue to share more value for you to take action on yourself from there. I will keep meeting you where you are in the meantime.']));
    }
  }

  function renderCTAs(r) {
    const block = $('#cta-block');
    block.innerHTML = '';
    if (r.qualification.qualified) {
      const calBtn = el('a', { class: 'cta', href: CONFIG.CALENDLY_URL, target: '_blank', rel: 'noopener' }, ['Book Your Call']);
      block.appendChild(calBtn);
      const pdfBtn = el('button', {
        type: 'button',
        class: 'cta cta-secondary',
        on: { click: () => downloadPDF('qualified') },
      }, ['Download Your PDF']);
      block.appendChild(pdfBtn);
    } else {
      const pdfBtn = el('button', {
        type: 'button',
        class: 'cta',
        on: { click: () => downloadPDF('unqualified') },
      }, ["Download Your PDF: 5 Signs You're Not Ready (Yet)"]);
      block.appendChild(pdfBtn);
      const row = el('div', { class: 'cta-row' }, [
        el('a', { class: 'cta cta-secondary', href: CONFIG.INSTAGRAM_URL, target: '_blank', rel: 'noopener' }, ['Follow on Instagram']),
        el('a', { class: 'cta cta-secondary', href: CONFIG.YOUTUBE_URL, target: '_blank', rel: 'noopener' }, ['Subscribe on YouTube']),
      ]);
      block.appendChild(row);
    }
  }

  function downloadPDF(kind) {
    if (typeof window.generateIdentityPDF !== 'function') {
      alert('PDF generator not loaded.');
      return;
    }
    window.generateIdentityPDF({
      kind,
      lead: state.lead,
      answers: state.answers,
      results: state.results,
      archetype: ARCHETYPES[state.results.archetype],
      questions: QUESTIONS,
    });
  }

  // ========== ANIMATIONS ==========
  function animateNumber(sel, from, to, duration) {
    const elx = $(sel);
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.round(from + (to - from) * eased);
      elx.textContent = val;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ========== INIT ==========
  document.addEventListener('DOMContentLoaded', () => {
    initLanding();
    initQuiz();
  });

})();
