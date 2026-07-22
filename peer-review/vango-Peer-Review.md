# Peer Review — VANGO: The Art Passport. A Research Report on a Digital Passport for Recording Visits to Works of Art

**Reviewer role:** Peer reviewer, acting as a referee for a masters-level research report submitted under the Ethical Tech CoLab. I am assuming the bar of a design/systems-research venue (an HCI or digital-heritage workshop) that accepts prototype-and-argument papers but expects an explicit research question, honest positioning against prior work, and a conclusion that does not exceed the evidence.

**Recommendation:** Major revisions

**Date:** 22 July 2026

---

## Summary of the submission

VANGO is a browser-based "digital passport" for art. A visitor standing before a
participating work scans a QR code (or types a short code, or follows a link),
and the application adds a dated, illustrated "stamp" to a personal passport book
carried on the phone. The report (§1–§13) documents the prototype in deliberately
non-technical prose: what it stores, why each stored value was chosen, and what
the tool refuses to do.

The submission's real contribution is not the software but an *argument about
design restraint*, and it is worth stating generously. The report proposes that a
record of attendance — "who went to see what, and when" (§1.2) — is a form of
value in itself (§12.3), and that this value can be delivered at the cost of a
printed page (§3.2) and with zero personal-data collection in guest mode (§3.3,
§7.1). Several design decisions are argued with unusual care: the stamp's colour
and fallback illustration are derived deterministically from the stamp's own
identifier so the same work "wears the same colours in every passport in the
world" (§5.5, §13.2); the tool declines to gamify (§6.1); the interface ships in
four languages including Hausa (§8); and §9 pauses to consider the cultural-property
implications of stamping a looted-class object. The report is also strikingly
candid about its own defects (§10), including a placeholder passport number
(§5.8) and the fact that the public demonstration cannot sign anyone in (§7.4).

As a piece of design documentation this is well above average. My reservations are
about whether it yet functions as a *research* paper, and about one ethical thread
it raises but does not resolve.

## Major issues

**1. The conclusion asserts a finding the paper never tests.**
*Location: §13.1 versus §1.7, §7.1, §10.5.* The Conclusion states that VANGO "asks
whether [the national-park passport idea] works for individual works of art. The
answer the prototype gives is a qualified yes" (§13.1). But the report also states,
in three places, that VANGO "has not been tested with real museum visitors" (§1.7),
that guest mode is the "whole application, working" only in a demonstration sense
(§7.1), and that it has "never been placed in a real exhibition or tested with real
visitors" (§10.5). A prototype that has never met a user cannot return an answer,
qualified or otherwise, to whether the idea "works." The load-bearing claim of the
paper — that an attendance record is "a form of value in itself" (§12.3) — is
asserted, never evidenced. *Why it matters:* this is the gap between what was built
and what is concluded, and a referee will read the mismatch as over-claiming. *Path
forward:* choose one of two honest framings. Either (a) reframe the paper as a
*design-rationale / systems-description* paper and change §13.1 to a claim about the
design ("the prototype demonstrates that the mechanism is buildable at negligible
cost and without data collection") — which the paper does support — deleting
"works" and "qualified yes"; or (b) keep the evaluative claim and earn it with even
a small study: 8–12 users given the tool in a gallery or a walkthrough, reporting
whether the stamp felt worth keeping. Option (a) is achievable now and is the
stronger paper.

**2. There is essentially no positioning in the literature.**
*Location: §2.2–§2.3.* The only prior work engaged is the US National Park Service
"Passport To Your National Parks" programme (§2.2). The "gap" the paper claims —
that individual artworks lack the physical stamp desk a park has (§2.3) — is
asserted without reference to the substantial bodies of work that bear directly on
it: museum visitor-engagement and repeat-attendance research; the gamification-of-culture
literature (which the paper implicitly critiques in §6.1 but never cites); digital
proof-of-attendance systems (location check-in apps such as Foursquare; the
blockchain "proof of attendance protocol" / POAP, which is almost exactly VANGO's
mechanism minus the ledger); and digital-badge / collectible-souvenir scholarship.
*Why it matters:* without this, the reader cannot tell whether VANGO's framing is
novel or is re-deriving known ideas, and the "gap" reads as manufactured by not
looking. For an Ethical Tech CoLab research output this is the single biggest thing
separating a report from a paper. *Path forward:* add a Related Work section (can be
two pages) that contrasts VANGO against at least these four neighbours, and use it to
sharpen the actual novelty claim — which I take to be *deterministic, privacy-preserving,
zero-cost attendance records without a ledger or an account*. That is a defensible,
narrow contribution; name it explicitly.

**3. The Bura ceramics entry is an unresolved ethical problem, not a neutral illustration.**
*Location: §5.11, §9.1, §9.4–§9.5.* The demonstration catalogue seeds a real
looted-class object — Bura ceramics, which appear on the ICOM Red List (§9.2) — as
sample data, attributed to a venue rendered only as the unexpanded initials "AABC"
that "the repository does not expand" (§9.1). The report then says the tool "is
silent on whether the object should be there" (§9.4) and adds "This is not a
criticism of the design" (§9.5). For a paper produced under an *ethical* technology
lab, this deserves harder self-scrutiny than a disclaimer. The prototype has chosen
to put an at-risk cultural object, tied to an unidentifiable venue, into the one
part of the app a first-time guest is guaranteed to see (§5.11 pre-seeds three
stamps; the David and Bura are the two real works in the seven). *Why it matters:*
the paper's own §9.5 correctly notes that "a document styled as a passport carries
an implication of officialdom that the underlying record does not support" — and
then illustrates exactly that failure with a Red List object. *Path forward:*
(i) explain in the text *why* Bura was included and what AABC is, or remove the real
contested object from demonstration data; (ii) promote the §9.5 suggestion (carry
collection history / a link to the holding institution on the stamp page) from
"a future version would do well" to an actual, if minimal, design element, since it
is the paper's own remedy for its own diagnosed problem; (iii) reconsider whether
"not a criticism of the design" is the right posture given (i).

**4. The paper states no research question and no method, so the contribution is under-specified.**
*Location: the report has no Introduction/Methods framing; §1 is an Executive
Summary, §2 is Background.* The document moves from rationale (§2) directly to
description (§4–§9) without ever stating the question it investigates or the way it
would know an answer. The Objectives (§3) are *product* objectives ("give a visitor
a durable record"), not *research* objectives. *Why it matters:* a reader cannot
judge success against a target that is never set, and this is what makes issue 1
possible — an untested conclusion slides in because no evaluative criterion was
declared up front. *Path forward:* add a short statement of the research question
("Can a low-cost, ledger-free, account-optional attendance record be designed such
that its emblem is stable and shared across users, and what design tensions arise?")
and a one-paragraph methods note describing this as a design-and-artefact study.
This is largely reorganisation of material already present, and it resolves much of
issue 1 for free.

## Minor issues

- **m1.** *§5.5 and §7.2.* "Hashing" is used for two very different things — a
  non-cryptographic palette seed (§5.5) and password protection with bcrypt (§7.2).
  A lay reader may conflate them. Add one clause distinguishing the fast, reversible-in-effect
  seed hash from the deliberately slow cryptographic one.
- **m2.** *§9.1.* The venue "AABC" is never expanded anywhere in the report. Expand
  it or flag it as unknown in-text; leaving an unexpandable acronym on a real
  object's record undercuts §9's whole argument about officialdom.
- **m3.** *§7.4 versus §10.10.* §7.4 calls the account system "real, tested code,"
  while §10.10 states "No automated tests exist in the repository." Reconcile:
  presumably "tested" means manually exercised. Say so.
- **m4.** *§1.4, §5.5.* "the same colours ... forever" (§1.4) overclaims: stability
  holds only while the hash function and the five-palette count are unchanged.
  Adding a sixth palette would reshuffle every stamp. Note this dependency.
- **m5.** *§8.2.* The README documents only English/French/Italian and omits Hausa,
  the report's headline inclusivity feature. This is a documentation gap the report
  flags but does not fix; fixing the README is a five-minute change worth making
  before submission.
- **m6.** *§10.9.* Three versions of the app coexist in the repository with no
  documented authoritative one. For reproducibility, state plainly which file a
  future reader should build from (the report implies "current source" — say it in
  §11 too).
- **m7.** *§5.11.* Pre-seeded demonstration stamps dated "May and June 2026" are
  fabricated visit records shown to every new guest. Low-stakes, but a passport-styled
  app displaying invented dated entries is worth a one-line caveat in-app, not only
  in the report.
- **m8.** *§10.8.* The base64 profile-picture storage note is honest but belongs
  near §7.3 (what the server stores) as well, so the privacy discussion is complete
  in one place.

## Things the report gets right

- **Radical honesty about limitations (§10).** The paper enumerates its own broken
  sign-in (§10.2), placeholder passport number (§10.3), fictional catalogue (§10.5),
  and absent tests (§10.10). This candour is rare and genuinely valuable; it is the
  paper's most trustworthy quality and should be protected, not sanded down.
- **The deterministic-seed argument (§5.5, §13.2)** is the intellectual highlight.
  The reasoning — that a random colour would make the stamp "feel arbitrary rather
  than official," so the emblem must be a function of the work's identity — is
  precise, correct, and well-told. It is the clearest instance of the paper
  connecting a technical choice to a conceptual claim.
- **Privacy by design (§3.3, §7.1, §7.3).** A guest mode in which "nothing is
  transmitted anywhere" is a substantive ethical stance, and the report resists the
  obvious gamified, data-hungry version (§6.1). This is the contribution most worth
  foregrounding.
- **Linguistic and cultural reach (§8).** Shipping Hausa alongside the European
  languages, tied to the presence of a Nigerien object, is a thoughtful decision the
  report is right to highlight.
- **Prose and structure.** The plain-language, purpose-per-variable exposition (§5)
  is a model of how to make a technical artefact legible to a non-technical reader.

## Verdict

**Major revisions.** The submission is an excellent piece of design documentation
and a promising research paper, held back by three fixable things: an evaluative
conclusion the work never tests, an almost-absent literature footing, and an
ethical thread (Bura) that it raises but declines to resolve. None requires
rebuilding the prototype.

*Single highest-value revision:* Reframe the contribution honestly (issues 1 and 4
together) — add an explicit research question and method, and change the Conclusion
from "does it work? qualified yes" to a claim about what the *design* demonstrates.
That one move converts an over-claiming report into an accurate research paper, and
everything else — related work, the Bura remedy — attaches cleanly to it.

## References

[1] International Council of Museums. *Red List of West African Cultural Objects at
Risk.* ICOM, 2016. (Bura-type terracotta statuettes and pottery are listed.)

[2] UNESCO. *Convention on the Means of Prohibiting and Preventing the Illicit
Import, Export and Transfer of Ownership of Cultural Property.* Paris, 1970. (Niger
is a State Party.)

[3] Washington Conference. *Washington Principles on Nazi-Confiscated Art.* 1998.

*Note on format:* per the rendering tool used for this review, references are given
here rather than as Word footnotes, and citations to the paper are located by its
own clause numbering (e.g. §5.5).
