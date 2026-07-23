# VANGO: The Art Passport

### A Research Report on a Digital Passport for Recording Visits to Works of Art

*Prepared as a plain-language review of the VANGO research prototype*
*based on the software and documentation contained in this repository*

---

## Foreword

Most people who visit a museum, a biennale, or a small studio exhibition leave
with nothing to show for it. The ticket is thrown away. The photograph is lost
in a phone. A few months later the visitor can recall that the work was
striking but not what it was called, who made it, or where it was seen. For the
institution, the encounter is equally invisible: a body passed through a room
and left no trace of having been moved by anything.

There is an older technology that solved a version of this problem. A passport
does not evaluate the traveller or rank the countries visited. It simply
records, in a durable and personal form, that a person was in a particular
place on a particular day, and it does so with a stamp that carries the
character of the place that issued it.

VANGO is a research prototype that applies this idea to art. It is a digital
passport, carried on a phone, in which a visitor collects a stamp for each
artwork they go and see. This report explains in non-technical language what
VANGO is, how it works, what each piece of information it stores actually
represents, and what it deliberately does not attempt to do.

---

## 1. Executive Summary

1.1 VANGO is a research prototype, an experimental piece of software, that
takes the form of a small illustrated passport book displayed on a mobile
phone screen. Each participating artwork is given a short code. A visitor who
is standing in front of the work either scans a printed square barcode, known
as a QR code, or types the code by hand. The application then adds a stamp for
that artwork to the visitor's passport, dated with the day of the visit.

1.2 The application is a record of attendance, not of ownership, value, or
authenticity. It answers one question only: who went to see what, and when.

1.3 The prototype contains a catalogue of seven works. Five are invented
demonstration pieces with fictional artists and venues. Two are real: the
marble David by Michelangelo at the Galleria dell'Accademia in Florence, and
Bura ceramics from Niger, a class of Iron Age terracotta object discussed in
Section 9 of this report.

1.4 Each stamp is drawn as a perforated postage stamp with a hand-drawn
illustration of the work, in one of five colour schemes. The colour is not
chosen at random each time it is displayed. It is derived arithmetically from
the stamp's own identifier, so that a given stamp always appears in the same
colours to every user, on every device, forever.

1.5 The application can be used in two ways. In guest mode nothing leaves the
visitor's own phone and no account is required. In account mode the visitor
registers with an email address and password, and the collection is stored on a
server so that it survives a change of device.

1.6 The interface is available in four languages: English, French, Italian, and
Hausa, one of the principal languages of Niger and northern Nigeria.

1.7 VANGO is a student research prototype. It is a demonstration of an idea
about audience engagement. It is not a finished consumer product, it has not
been tested with real museum visitors, and, as Section 10 sets out, several
parts of it are visibly unfinished.

---

## 2. Background and Rationale

2.1 The problem. Cultural institutions have limited ways of encouraging repeat
attendance or of connecting a visit to one venue with a visit to another.
Loyalty schemes are commercial in tone and tend to reward spending rather than
attention. A visitor who has seen forty exhibitions over five years holds that
history only in memory.

2.2 The precedent. The design borrows openly from an established and
well-evidenced model. Since 1986 the United States National Park Service, in
partnership with the non-profit now known as America's National Parks, has run
the Passport To Your National Parks programme, a small booklet in which
visitors collect ink cancellation stamps at park visitor centres. The scheme
has endured for four decades because the reward is not a discount but a record.
VANGO transposes this format from landscape to art.

2.3 The gap. The paper passport works because each park has a physical desk and
a rubber stamp. Individual artworks do not. An exhibition may run for six weeks
in a rented pavilion. What VANGO proposes is that a printed code placed beside a
work can perform the same function as the rubber stamp at the ranger's desk, at
negligible cost and with no staffing requirement.

2.4 The response. VANGO is therefore built around the smallest possible unit of
proof: a short code, posted in public, that a visitor converts into a dated
entry in a personal book. Everything else in the application, the illustrations,
the page-turning animation, the passport number, exists to make that entry feel
worth keeping.

---

## 3. Objectives

The prototype is designed to:

3.1 Give a visitor a durable, personal, and pleasing record of the individual
works of art they have gone to see.

3.2 Reduce the cost of participation for an institution to the price of
printing a sheet of paper, so that a small studio can take part on the same
terms as a national museum.

3.3 Work without a network connection to any central service, and without
requiring the visitor to create an account, so that a person can use the tool
with no disclosure of personal information at all.

3.4 Present the record in a form that is legible across languages, including a
West African language, rather than defaulting to English and the major European
languages alone.

3.5 Ensure that a given artwork's stamp looks the same in every visitor's
passport, so that the stamp functions as a shared emblem of the work rather
than as decoration generated afresh for each person.

---

## 4. How VANGO Works

The application has four moving parts: a catalogue of artworks, a way of
capturing a code, a book in which stamps are stored, and an optional account.

### 4.1 The catalogue

The catalogue is a fixed list held inside the application itself. Each entry
consists of a code and three pieces of descriptive text: the title of the work,
the artist, and the venue. The seven current entries are Chromatic Drift,
Fault Lines, Hollow Choir, Echo Garden, Voidwalk, Bura Ceramics, and David.

Because the catalogue is written into the application, a new artwork can only
be added by editing the software and publishing it again. The README file
documents how to do this. There is no facility for a gallery to register its
own work without a developer.

### 4.2 Capturing a code

A visitor opens the add-stamp panel and chooses one of two methods. The first
uses the phone's camera to read a QR code. The second is a text box in which the
code is typed. A third route exists for institutions that would rather share a
web link than print a barcode: a specially formed web address carries the code
within it, and opening that link adds the stamp directly.

Before a code is looked up it is normalised, meaning it is converted into a
single standard form. The application converts all letters to capitals and
removes any spaces and hyphens. The practical effect is that a visitor who
types "chroma-14", "CHROMA 14", or "Chroma14" gets the same result. This is a
small decision with a large effect on how forgiving the tool feels to someone
squinting at a label in a dim room.

If the code matches no catalogue entry, the visitor is told that no artwork is
registered for that code. If it matches a work already in the passport, the
visitor is told so rather than being given a duplicate.

### 4.3 The book

The passport is presented as a book that opens and whose pages turn. The first
page inside the cover is the biography page. Each subsequent page holds exactly
two stamps. A back page invites the visitor to collect another. When a new
stamp is earned the book automatically turns to the page where it has landed,
after a short animation showing the stamp being pressed.

### 4.4 The account

A visitor may register with an email address and password, or continue as a
guest. The two paths are described in Section 7. The distinction matters
because it determines where the visitor's record is kept and who else can see
it.

---

## 5. The Variables Explained

This section is the heart of the report. VANGO stores a small number of pieces
of information, and each was chosen for a reason. What follows explains, in
ordinary words, what each one represents, why it exists, and what it does.

### 5.1 The code

The code is a short string of capital letters and digits such as CHROMA14 or
DAVID01. It is the only thing a visitor needs in order to claim a stamp.

Why it was chosen: it must be short enough to type on a phone while standing
up, distinctive enough not to be confused with a neighbouring work, and
printable in large type on a card. Codes in the catalogue combine a word
suggesting the work with a number, which makes them memorable without being
guessable in a systematic way.

How it feeds the result: the code is the key that unlocks the catalogue entry.
Everything the stamp displays about the artwork comes from looking up this one
value.

An honest observation: the code is a public secret. It is printed beside the
work for anyone to see, and it can be photographed, texted to a friend, or
published online. The application performs no check on the visitor's location
and no check on the time of day. A person who never entered the building can
collect the stamp. This is discussed further in Section 10.

### 5.2 Title, artist, and venue

These three pieces of text are held in the catalogue, not entered by the
visitor, and they appear on the face of the stamp along with the date.

Why they were chosen: they are the minimum needed for the record to mean
anything later. A stamp reading only CHROMA14 would be an unreadable souvenir.
Naming the artist alongside the title also matters as a matter of practice, in
that it treats the maker rather than the venue as the primary fact about the
work.

How they feed the result: they are printed on the stamp and are shown in the
confirmation message when the stamp is earned.

### 5.3 The date collected

The date is recorded as the calendar day on which the stamp was claimed, with
no time of day. It is stored in the international standard order of year, then
month, then day, and displayed in the style of a border control stamp, for
example 14 MAY 2026.

Why it was chosen: the day is the meaningful unit of a visit. Storing the hour
and minute would add precision that no one needs and would make the record more
personally revealing than it has to be. Storing only the date is the more
restrained choice.

How it feeds the result: the date is printed on the stamp, it determines the
order in which stamps appear in the book, and in guest mode it forms part of
the rule that prevents a work being stamped twice on the same day.

### 5.4 The stamp identifier

Every stamp is given an internal identifier made by joining the artwork code to
the date, for example CHROMA14-2026-05-14. This value is never shown to the
visitor.

Why it was chosen: the application needs a way to tell one stamp from another
when arranging them on a page, and it needs a stable value from which to derive
the stamp's appearance.

How it feeds the result: see the following clause, which is where this
identifier does its real work.

### 5.5 The colour palette and the seed

The application holds five fixed pairs of colours: a teal, a pink, a bronze, a
blue-violet, and a gold, each paired with a darker version of itself. Every
stamp is drawn in one of these five schemes.

The scheme is not chosen by the person who added the artwork, and it is not
chosen at random. The application takes the stamp identifier described above
and runs it through a hashing function, which is a piece of arithmetic that
turns a piece of text into a number. It then divides that number by five and
uses the remainder to select the palette.

Why it was chosen: this method is deterministic, meaning that the same input
always produces the same output. Because the identifier for a given artwork on
a given date is always the same, the resulting colour is always the same. Two
visitors comparing passports will see the same colours for the same work. Had
the colours been picked at random when the stamp was created, they would differ
between visitors and might change if the application were reinstalled, which
would make the stamp feel arbitrary rather than official.

How it feeds the result: the two chosen colours are used throughout the stamp,
in the illustration, the border, and the lettering.

### 5.6 The illustration

Each of the seven catalogue entries has its own hand-drawn illustration built
into the application as line and shape instructions rather than as a
photograph. The David stamp shows the figure with the subtitle FIRENZE 1504.
The others are similarly bespoke.

Why they were chosen: drawings avoid the copyright and licensing questions that
photographs of artworks raise, they remain sharp at any size on any screen, and
they carry the visual character of an engraved postage stamp, which is the
aesthetic the whole application is reaching for.

There is also a fallback. If a work has no bespoke drawing, the application
generates an abstract composition of between four and six shapes, again derived
arithmetically from the stamp identifier so that it is stable rather than
random. In the current catalogue every work has a bespoke drawing, so this
fallback is not visible, but it is what would appear if a new code were added
without artwork.

### 5.7 The visitor's own details

Three items describe the passport holder rather than the art:

- The display name, which the visitor types in the settings panel. It defaults
  to "Explorer".
- The profile picture, which the visitor uploads from their own device.
- The passport number, discussed in the next clause.

The application also stores two preferences: whether the interface is shown in
its dark or light colour scheme, and which of the four languages is in use.

### 5.8 The passport number and the membership date

These two variables are the least settled part of the prototype, and the report
would be less useful if it glossed over that.

When a visitor registers an account, the server generates a passport number in
the style of a real travel document: three letters followed by six digits. The
letters are drawn from an alphabet that deliberately omits I and O, because
those characters are easily confused with the digits 1 and 0 when read aloud or
copied by hand. This is a considered choice and matches the convention used on
machine-readable travel documents.

However, the biography page inside the book does not display this number. It
displays the figure 1000 plus the number of stamps the visitor holds. A visitor
with three stamps sees passport number 1003, and that number changes to 1004 the
moment they collect another. The same page derives the membership date from the
earliest stamp in the collection rather than from the date the account was
created, so a visitor who has collected nothing sees no date at all.

The most likely explanation is that the biography page was written first, as a
visual mock-up, and the server was added later without the page being updated to
read from it. Whatever the cause, the figures on the biography page are at
present decorative rather than authoritative, and this should be corrected
before anyone treats a VANGO passport number as an identifier.

### 5.9 The rule against duplicates

The application prevents the same work being stamped twice, but the rule
differs between the two modes of use, and the difference is deliberate.

For a registered account the database enforces one stamp per artwork per
account, permanently. A visitor who returns to the David a second time will not
receive a second stamp.

In guest mode the rule is looser: one stamp per artwork per day. A guest may
therefore accumulate repeat visits to the same work on different dates.

Why the difference was chosen: the permanent rule expresses the passport
metaphor faithfully, in that a passport records that you have been to a country
rather than how many times. The daily rule makes the guest mode easier to
demonstrate, since a person showing the application to someone else can collect
the same stamp again tomorrow without clearing their data. It is a
demonstration convenience rather than a principled position.

### 5.10 Two stamps per page

The book places exactly two stamps on each page, and inserts an empty page when
the current page is full so that the visitor always sees somewhere for the next
stamp to go. This is a presentational constant chosen to suit a phone screen
held upright, and it is the one variable in the application whose value carries
no meaning beyond layout.

### 5.11 Demonstration stamps

A guest opening the application for the first time is given three stamps
already collected: Chromatic Drift, Fault Lines, and Hollow Choir, dated across
May and June 2026. These are not real visits. They exist so that a person
opening the demonstration sees a passport with contents rather than an empty
book, which would communicate very little about what the tool is for. A
registered account starts genuinely empty.

---

## 6. Reading the Results

6.1 What the visitor sees is a book, not a score. VANGO produces no rating, no
ranking, no leaderboard, and no recommendation. There is nothing to optimise.
This is a design decision worth naming, because the obvious commercial version
of this application would gamify attendance, and this one declines to.

6.2 The biography page shows the holder's name and photograph, the number of
stamps collected, and the passport number and membership date discussed in
clause 5.8. It carries an emblem labelled Ars Pro Mundo, and the line
"Interact with art and receive a unique stamp for each piece you visit."

6.3 The stamp pages show the stamps themselves, two to a page, each with its
illustration, title, artist, venue, and date, inside a perforated border with
decorative rosettes at the corners.

6.4 The back page carries the line "Every world leaves a mark" and a button to
collect another stamp.

6.5 The only number in the entire application that a visitor might be tempted
to compete over is the count of stamps collected, and nothing is built on top
of it.

---

## 7. Two Ways to Use It

7.1 Guest mode. The visitor taps past the sign-in screen. Stamps are held in
the phone's own browser storage. Nothing is transmitted anywhere and no account
exists. The record survives closing the application but is lost if the browser's
data is cleared or the phone is replaced. For a visitor who does not want to
hand over an email address in exchange for a souvenir, this is the whole
application, working, at no cost in privacy.

7.2 Account mode. The visitor registers with an email address, a password of at
least eight characters, and optionally a name. The password is not stored. It
is passed through a one-way scrambling process called hashing, using a
deliberately slow method known as bcrypt, so that a person who obtained a copy
of the database could not read the passwords out of it. The visitor's session is
then held by a signed token that expires after seven days.

7.3 What the server stores. The database holds two lists. The first is people:
email address, hashed password, name, uploaded picture, membership date,
passport number, and the moment the account was created. The second is stamps:
which person, which artwork code, and on what date. That is the entire extent
of it. The server does not record where the visitor was, what device they used,
or how long they looked at anything.

7.4 An important practical caveat. The published demonstration on the public
web cannot reach a server. The address of the server is written into the
application as a local address on the developer's own machine. A visitor
opening the public demonstration can therefore use guest mode fully, but
registration and sign-in will not work. The account system is real, tested code,
but it is at present only usable by someone running both halves of the
application on their own computer.

---

## 8. Language and Reach

8.1 The entire interface, including error messages and the welcome sequence, is
translated into four languages: English, French, Italian, and Hausa. The
translations are held as complete parallel sets of every phrase rather than
being assembled from fragments, which keeps the tone consistent within each
language.

8.2 The inclusion of Hausa is the notable choice. Hausa is one of the most
widely spoken languages of West Africa, including in Niger, and it is not a
language that consumer applications of this kind ordinarily support. Read
alongside the presence of Bura ceramics in the catalogue, it suggests the
prototype is not addressed solely to a European museum audience. The README
lists only English, French, and Italian, so the Hausa translation, which was
added later, is currently undocumented.

---

## 9. Cultural Property Context

9.1 One catalogue entry raises questions the rest do not, and it is in the
catalogue **on purpose**. Bura Ceramics is attributed to Niger rather than to a
named artist, and was previously attributed to a venue given only as the
initials "AABC", which nothing in the repository expanded. That was a mistake:
an unexplained initialism reads as a real institution, and attaching an at-risk
object to an unidentifiable holder is precisely the ambiguity this section
exists to criticise. The venue is now labelled **"Unspecified holder
(illustrative)"**, which is what it always was.

The entry is retained rather than removed because its purpose is to make the
boundary in 9.4 concrete. A catalogue containing only invented works would let
the reader believe the question of provenance simply does not arise for an
attendance record. It does arise, and the honest way to show that is with a real
class of object whose circulation is genuinely contested. The reader should
know, however, that the entry is illustrative: no specific Bura vessel, holder,
or exhibition is being referred to, and no claim whatever is made about any real
object's status.

9.2 The Bura culture refers to a group of Iron Age archaeological sites in the
lower Niger River valley, in south-western Niger and south-eastern Burkina
Faso, whose terracotta funerary vessels and equestrian figures were first
excavated in the 1980s. The sites have since been looted on a very large scale.
Terracotta statuettes and pottery from the Bura system appear on the Red List of
West African Cultural Objects at Risk published by the International Council of
Museums, a listing that exists specifically to alert museums, dealers, customs
officers, and collectors that objects of that description are likely to have
been removed illegally.

9.3 Niger is a State Party to the 1970 UNESCO Convention on the Means of
Prohibiting and Preventing the Illicit Import, Export and Transfer of Ownership
of Cultural Property, the principal international instrument requiring states to
control the movement of cultural objects across borders and to cooperate in
their return.

9.4 The relevance to VANGO is narrow but real. The application records that a
person went to see an object. It records nothing whatsoever about how that
object came to be where it is. If a stamp is issued beside a Bura vessel in a
gallery, the visitor's passport will say only that they saw it, on a particular
day, at that venue. The document is silent on whether the object should be
there.

9.5 Earlier versions of this paper said "this is not a criticism of the design."
That deflected a criticism that lands. A document styled as a passport carries an
implication of officialdom that the underlying record does not support, and
issuing such a document beside an object of contested origin lends that object
the appearance of a settled institutional context it may not have. The design
does not cause that problem, but it does not avoid it either, and a prototype
built in an ethics lab should say so rather than disclaim it. The boundary is
real and the design currently sits on the wrong side of it for any object whose
presence in a gallery is itself in question. A future version
placing works of contested origin in its catalogue would do well to carry the
object's collection history on the stamp page, or to link to the holding
institution's own published account of it.

9.6 For completeness, and because the question naturally arises with any
software touching art: VANGO has no relationship to the provenance research
frameworks that govern restitution claims, such as the 1998 Washington
Principles on Nazi-Confiscated Art, and no relationship to stolen-art databases
such as the Art Loss Register. It does not check, assert, or store anything
about title, authenticity, or ownership history. It is a record of attendance.

---

## 10. Limitations and Caveats

The prototype has real and visible limits, and a reader deciding whether to
build on it should know them.

10.1 The code cannot prove presence. Anyone holding the code can collect the
stamp from anywhere in the world. There is no location check, no time window,
and no single-use mechanism. For a souvenir this matters little. For anything
that conferred a benefit, such as a discount or a prize, the scheme would be
trivially defeated.

10.2 The published demonstration cannot sign anyone in, for the reason set out
in clause 7.4.

10.3 The passport number and membership date shown to the visitor are not the
ones the server issues, as described in clause 5.8.

10.4 The catalogue cannot be extended without editing and republishing the
software. There is no interface through which a gallery could register a work.
Seven works is a demonstration, not a deployment.

10.5 Five of the seven catalogue entries are fictional. The application has, so
far as the repository shows, never been placed in a real exhibition or tested
with real visitors.

10.6 Each bespoke stamp illustration must be drawn by hand in code. This is what
makes the stamps attractive and it is also what prevents the catalogue from
growing quickly. A catalogue of hundreds of works would need either a different
approach to imagery or a great deal of labour.

10.7 QR scanning depends on a barcode-reading capability that not every mobile
browser provides. The application detects this and directs the visitor to type
the code instead, which is a sound fallback but a less pleasant one.

10.8 Profile pictures are uploaded and stored in a form that makes them
substantially larger than the original file, and are held in the same database
as the account records. This is workable at demonstration scale and would not be
the right approach at any real volume.

10.9 The repository contains three separate versions of the application: the
current source, a superseded starting page, and a single large self-contained
file of roughly two-thirds of a megabyte. Which of these is authoritative is not
documented, though the build configuration makes clear that the current source
is what is published.

10.10 No automated tests exist in the repository.

---

## 11. Practical Nature of the Tool

11.1 VANGO runs in an ordinary mobile web browser. There is nothing to install
from an application store. A visitor follows a link or scans a code and the
passport opens.

11.2 The visitor-facing half of the application is published automatically to a
free public web host each time the software is changed. The optional account
server is a separate program that must be run by whoever operates the service.

11.3 For an institution, participation requires printing one page per artwork.
The repository provides a ready-made page for each of the seven works,
containing the code, the artwork details, and a QR code, designed to be printed
and displayed beside the work.

---

## 12. Intended Audience and Use

12.1 The immediate audience is the exhibition visitor, and the design assumes
that person is holding a phone, standing up, and has perhaps thirty seconds of
patience.

12.2 The secondary audience is the small or temporary venue: a studio, a
pavilion, a biennale stand, an institution without the budget for a mobile
application of its own.

12.3 The prototype is best read as a demonstration of an argument, namely that a
record of having seen something is a form of value in itself, and that it can be
given to a visitor at almost no cost and without collecting anything about them
in return.

---

## 13. Conclusion

13.1 VANGO takes a forty-year-old idea from national park visitor centres and
asks whether it could work for individual works of art. **The prototype does not
answer that question, and this paper should not be read as claiming it does.**
VANGO has never been placed in a real exhibition and has never been tested with
a single museum visitor (see 1.7, 7.1 and 10.5). Whether an attendance record is
"a form of value in itself" (12.3) is the load-bearing premise of the whole
design, and it is asserted here, not evidenced.

What the prototype does establish is narrower and entirely about feasibility:
the mechanism is simple enough to explain in one sentence, the cost to a venue
is a sheet of paper, and guest mode demonstrates that the whole thing can
function without collecting a single piece of personal information. Those are
claims about what was built and what it costs to run, and they are supported.
The claim that visitors would want it remains untested, and testing it with real
visitors in a real venue is the next piece of work, not a detail.

13.2 The prototype's most considered decision is the one a visitor will never
notice: that a stamp's appearance is calculated from its own identity rather
than picked at random, so that the same artwork wears the same colours in every
passport in the world. That is what separates a stamp from a decoration.

13.3 Its weakest points are equally clear. The published version cannot sign
anyone in, the passport number on the biography page is a placeholder, the
catalogue is small and mostly invented, and a code printed on a wall proves
nothing about where the person holding it was standing.

13.4 The application is honest about its own scope in the only way that matters,
which is by not overreaching. It does not claim to authenticate, to value, to
rank, or to establish where an object came from. It records that someone went to
look at something. For a research prototype, knowing precisely which question it
is answering is a considerable part of the work.

---

## Attribution

Developed by Melanie MacKew as part of masters research at the NYU Center for
Global Affairs (2026), under the Ethical Tech CoLab.

> Note: This report is a plain-language summary of a research prototype. The
> prototype is for academic demonstration only. It has not been deployed in a
> live exhibition setting, and nothing it records constitutes evidence of
> attendance, ownership, authenticity, or the lawful origin of any work of art.
