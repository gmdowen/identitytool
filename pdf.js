(function () {
  'use strict';

  // Colors (RGB)
  const BG = [10, 10, 10];
  const TEXT = [245, 239, 228];
  const TEXT_DIM = [138, 133, 125];
  const TEXT_SOFT = [179, 173, 163];
  const GOLD = [201, 169, 110];
  const LINE = [42, 38, 32];

  const PAGE_W = 210;   // A4 portrait mm
  const PAGE_H = 297;
  const MARGIN = 22;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  const FIVE_SIGNS = [
    {
      title: "1. You spend money on everything except yourself.",
      body: "Cars, clothes, nights out, holidays, but the moment it is you on the invoice, suddenly it is \"too much.\" The truth of where you actually believe value lives is in your bank statement, not in what you say.",
      action: "Track every dollar you spend for the next 30 days. The truth is in the numbers.",
    },
    {
      title: "2. You flinch when someone tells you the truth about you.",
      body: "If feedback makes you defensive, no coach, no friend, and no system can help you. You will collect more advice than any man alive and still be exactly where you are a year from now.",
      action: "Ask one person you trust for one piece of hard feedback this week. Sit with it 48 hours before you respond.",
    },
    {
      title: "3. You are addicted to thinking about change instead of making it.",
      body: "Plans, vision boards, journals, podcasts. All motion, no action. You have convinced yourself that thinking about the work is the work. It is not.",
      action: "Pick the smallest concrete action you have been avoiding. Do it before this day ends.",
    },
    {
      title: "4. You are still letting other people's opinions write your script.",
      body: "Every time you change your behaviour for someone whose opinion you do not actually want at your funeral, you betray the man you are meant to become. That is a quiet, daily betrayal.",
      action: "List the five people whose opinions you would want at your funeral. Anyone else's opinion is noise. Read that list every single morning until it lives in your bones.",
    },
    {
      title: "5. You are using pain as fuel instead of purpose.",
      body: "Pain runs out. Purpose compounds. Men who run on pain crash the moment things get comfortable. Men who run on purpose keep moving when no one is watching.",
      action: "Write down who you are becoming and why it matters beyond you in one sentence. Read it before every hard decision.",
    },
  ];

  function fillPage(doc) {
    doc.setFillColor(...BG);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
  }

  function topBar(doc) {
    doc.setFillColor(...GOLD);
    doc.rect(0, 0, PAGE_W, 0.8, 'F');
  }

  function eyebrow(doc, y, text) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...GOLD);
    doc.setCharSpace(1.4);
    doc.text(text, MARGIN, y);
    doc.setCharSpace(0);
  }

  function pageMeta(doc, leadName) {
    eyebrow(doc, 14, 'THE IDENTITY CALCULATOR');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_DIM);
    doc.setCharSpace(1.4);
    doc.text((leadName || '').toUpperCase(), PAGE_W - MARGIN, 14, { align: 'right' });
    doc.setCharSpace(0);
  }

  function bottomFooter(doc, pageNum, totalPages) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_DIM);
    doc.setCharSpace(1.4);
    doc.text('GARETH OWEN  ·  @GARETH.OWEN', MARGIN, PAGE_H - 12);
    doc.text(`${pageNum} / ${totalPages}`, PAGE_W - MARGIN, PAGE_H - 12, { align: 'right' });
    doc.setCharSpace(0);
  }

  function divider(doc, y) {
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  }

  function wrappedText(doc, text, x, y, maxWidth, lineHeight) {
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line, i) => {
      doc.text(line, x, y + i * lineHeight);
    });
    return y + lines.length * lineHeight;
  }

  function drawCoverPage(doc, data) {
    fillPage(doc);
    topBar(doc);
    pageMeta(doc, data.lead.name);

    // "An identity diagnostic for {Name}"
    let y = 42;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...TEXT_DIM);
    doc.text('An identity diagnostic for', MARGIN, y);
    y += 8;
    doc.setFont('times', 'italic');
    doc.setFontSize(26);
    doc.setTextColor(...TEXT);
    doc.text(data.lead.name, MARGIN, y);

    // Date
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_DIM);
    doc.setCharSpace(1.2);
    doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase(), MARGIN, y);
    doc.setCharSpace(0);

    divider(doc, y + 8);

    // SCORE BLOCK
    // Label (small caps) well above the big number to avoid overlap
    y = 92;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_DIM);
    doc.setCharSpace(1.6);
    doc.text('IDENTITY ALIGNMENT', PAGE_W / 2, y, { align: 'center' });
    doc.setCharSpace(0);

    // Big score number, baseline pushed well below label
    y = 132;
    doc.setFont('times', 'normal');
    doc.setFontSize(72);
    doc.setTextColor(...GOLD);
    doc.text(String(data.results.identity), PAGE_W / 2, y, { align: 'center' });

    // "/ 100" on its own line below, centered, smaller, dim
    y = 144;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...TEXT_DIM);
    doc.setCharSpace(1);
    doc.text('/ 100', PAGE_W / 2, y, { align: 'center' });
    doc.setCharSpace(0);

    divider(doc, 162);

    // Archetype
    let ya = 176;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_DIM);
    doc.setCharSpace(1.6);
    doc.text('YOUR ARCHETYPE', MARGIN, ya);
    doc.setCharSpace(0);

    ya += 10;
    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.setTextColor(...GOLD);
    doc.text(data.archetype.name, MARGIN, ya);

    ya += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...TEXT_SOFT);
    ya = wrappedText(doc, data.archetype.desc, MARGIN, ya, CONTENT_W, 5.6);

    // Coachability
    ya += 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_DIM);
    doc.setCharSpace(1.6);
    doc.text('COACHABILITY', MARGIN, ya);
    doc.setCharSpace(0);

    ya += 4;
    const barY = ya + 1;
    const barW = CONTENT_W;
    doc.setFillColor(...LINE);
    doc.rect(MARGIN, barY, barW, 1.2, 'F');
    doc.setFillColor(...GOLD);
    doc.rect(MARGIN, barY, barW * (data.results.coach / 100), 1.2, 'F');

    ya += 9;
    doc.setFont('times', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(...TEXT);
    doc.text(`${data.results.coach} / 100`, MARGIN, ya);
  }

  function drawGapsPage(doc, data) {
    doc.addPage();
    fillPage(doc);
    topBar(doc);
    pageMeta(doc, data.lead.name);

    let y = 50;
    doc.setFont('times', 'italic');
    doc.setFontSize(26);
    doc.setTextColor(...GOLD);
    y = wrappedText(doc, 'The three biggest leverage areas in your life right now', MARGIN, y, CONTENT_W, 10);

    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...TEXT_DIM);
    y = wrappedText(doc, 'These are the three weakest scoring areas in your diagnostic. Address them in this order and the rest of your identity moves with them.', MARGIN, y, CONTENT_W, 5.2);

    y += 10;
    divider(doc, y);
    y += 12;

    data.results.gaps.forEach((g, i) => {
      const num = String(i + 1).padStart(2, '0');
      doc.setFont('times', 'italic');
      doc.setFontSize(22);
      doc.setTextColor(...GOLD);
      doc.text(num, MARGIN, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(...TEXT);
      const after = wrappedText(doc, g.text, MARGIN + 16, y - 2, CONTENT_W - 16, 6);

      y = after + 10;
      divider(doc, y - 4);
      y += 4;
    });
  }

  function drawQualifiedNextPage(doc, data) {
    doc.addPage();
    fillPage(doc);
    topBar(doc);
    pageMeta(doc, data.lead.name);

    let y = 50;
    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.setTextColor(...GOLD);
    y = wrappedText(doc, "What's next.", MARGIN, y, CONTENT_W, 10);

    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...TEXT);
    const text1 = "Based on your diagnostic, you are the kind of man this work was built for. You are not where you want to be, and you know it. The fire is lit. You are hungry. You are coachable. You are ready to move.";
    y = wrappedText(doc, text1, MARGIN, y, CONTENT_W, 6);

    y += 6;
    doc.setTextColor(...TEXT_SOFT);
    const text2 = "Programs start at $3,500 for the strongest results. The higher the commitment you make, the deeper the transformation you walk out with. Full details on the call.";
    y = wrappedText(doc, text2, MARGIN, y, CONTENT_W, 6);

    // Booking box
    y += 14;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.3);
    doc.rect(MARGIN, y, CONTENT_W, 44);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...GOLD);
    doc.setCharSpace(1.8);
    doc.text('BOOK YOUR CALL', MARGIN + 8, y + 12);
    doc.setCharSpace(0);

    doc.setFont('times', 'italic');
    doc.setFontSize(18);
    doc.setTextColor(...TEXT);
    doc.text('Identity Transformation Call', MARGIN + 8, y + 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_DIM);
    doc.textWithLink(data.calendlyUrl, MARGIN + 8, y + 35, { url: data.calendlyUrl });

    // What happens on the call
    y += 60;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_DIM);
    doc.setCharSpace(1.6);
    doc.text('WHAT HAPPENS ON THE CALL', MARGIN, y);
    doc.setCharSpace(0);

    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...TEXT_SOFT);
    const callItems = [
      'We go deep on your past and how you used to operate.',
      'We get honest about your current routine and where it is failing you.',
      'We define your one or two biggest goals for the next 90 days.',
      'We work out why you booked this call in the first place.',
      'If we are a fit, I show you exactly what working together looks like.',
    ];
    callItems.forEach((line) => {
      doc.setTextColor(...GOLD);
      doc.text('·', MARGIN, y);
      doc.setTextColor(...TEXT_SOFT);
      y = wrappedText(doc, line, MARGIN + 5, y, CONTENT_W - 5, 5.6);
      y += 3;
    });
  }

  function drawFiveSignsPages(doc, data) {
    // First sign page
    doc.addPage();
    fillPage(doc);
    topBar(doc);
    pageMeta(doc, data.lead.name);

    let y = 50;
    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.setTextColor(...GOLD);
    y = wrappedText(doc, "Five signs you are not ready (yet).", MARGIN, y, CONTENT_W, 10);

    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...TEXT_DIM);
    const intro = "This is not a list to make you feel bad. This is a list to make you see clearly. Sit with the ones that landed. Take the action under each one.";
    y = wrappedText(doc, intro, MARGIN, y, CONTENT_W, 5.6);

    y += 10;
    divider(doc, y);
    y += 12;

    FIVE_SIGNS.forEach((sign, idx) => {
      // Estimate space for this sign block
      const titleLines = doc.splitTextToSize(sign.title, CONTENT_W).length;
      const bodyLines = doc.splitTextToSize(sign.body, CONTENT_W).length;
      const actionLines = doc.splitTextToSize(sign.action, CONTENT_W - 8).length;
      const blockHeight = titleLines * 8 + bodyLines * 5.4 + actionLines * 5.2 + 30;
      if (y + blockHeight > PAGE_H - 28) {
        doc.addPage();
        fillPage(doc);
        topBar(doc);
        pageMeta(doc, data.lead.name);
        y = 40;
      }

      // Title
      doc.setFont('times', 'italic');
      doc.setFontSize(16);
      doc.setTextColor(...GOLD);
      y = wrappedText(doc, sign.title, MARGIN, y, CONTENT_W, 7.5);

      // Body
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(...TEXT);
      y = wrappedText(doc, sign.body, MARGIN, y, CONTENT_W, 5.6);

      // Action
      y += 5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...GOLD);
      doc.setCharSpace(1.4);
      doc.text('WHAT TO DO', MARGIN, y);
      doc.setCharSpace(0);

      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(...TEXT_SOFT);
      y = wrappedText(doc, sign.action, MARGIN, y, CONTENT_W, 5.6);

      y += 8;
      divider(doc, y - 2);
      y += 8;
    });

    // Closing page (always a fresh page so the message has space to breathe)
    doc.addPage();
    fillPage(doc);
    topBar(doc);
    pageMeta(doc, data.lead.name);
    y = 60;

    doc.setFont('times', 'italic');
    doc.setFontSize(26);
    doc.setTextColor(...GOLD);
    y = wrappedText(doc, "You are not there yet. That is the point.", MARGIN, y, CONTENT_W, 10);

    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11.5);
    doc.setTextColor(...TEXT);
    const para1 = "Every man on the other side of this work started exactly where you are right now. Reading a list of his own gaps. Deciding whether to look away or do something about it. The five signs above are a map. You know what to do. The only question left is whether you do it.";
    y = wrappedText(doc, para1, MARGIN, y, CONTENT_W, 6);

    y += 8;
    doc.setTextColor(...TEXT_SOFT);
    const para2 = "Read this once a week. Take one action a week. Come back in 90 days and take the calculator again. Show me a different man.";
    y = wrappedText(doc, para2, MARGIN, y, CONTENT_W, 6);

    y += 14;
    divider(doc, y);

    y += 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_DIM);
    doc.setCharSpace(1.6);
    doc.text('STAY CLOSE WHILE YOU DO THE WORK', MARGIN, y);
    doc.setCharSpace(0);

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...GOLD);
    doc.textWithLink('Follow on Instagram', MARGIN, y, { url: data.instagramUrl });
    doc.textWithLink('Subscribe on YouTube', MARGIN + 62, y, { url: data.youtubeUrl });
  }

  // Apply page numbers after all pages are drawn
  function applyFooters(doc) {
    const total = doc.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      doc.setPage(i);
      bottomFooter(doc, i, total);
    }
  }

  // Public entry point. URLs are passed in by quiz.js from CONFIG so there
  // is a single source of truth.
  window.generateIdentityPDF = function (input) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    const data = {
      lead: input.lead,
      results: input.results,
      archetype: input.archetype,
      calendlyUrl: input.urls.calendly,
      instagramUrl: input.urls.instagram,
      youtubeUrl: input.urls.youtube,
    };

    drawCoverPage(doc, data);
    drawGapsPage(doc, data);
    if (input.kind === 'qualified') {
      drawQualifiedNextPage(doc, data);
    } else {
      drawFiveSignsPages(doc, data);
    }
    applyFooters(doc);

    const safeName = (input.lead.name || 'identity').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    doc.save(`identity-calculator-${safeName}.pdf`);
  };
})();
