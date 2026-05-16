import { WORD_LISTS } from "./word-lists.js?v=2";
import { GENERATED_CLUES } from "./generated-clues.js?v=2";

const STORAGE_KEY = "wordQuestSummer:v1";
const SESSION_POINT_GOAL = 100;
const ALLOWANCE_POINT_GOAL = 1000;
const REVIEW_WORDS_PER_SESSION = 3;
const SHAKY_WORDS_PER_SESSION = 2;
const SESSION_WORD_BUFFER = 45;
const EARLY_SESSION_BUFFER = 30;

const WORD_SOURCE = `
the
of
and
a
to
in
is
you
that
it
he
was
for
on
are
as
with
his
they
I
at
be
this
have
from
or
one
had
by
words
but
not
what
all
were
we
when
your
can
said
there
use
an
each
which
she
do
how
their
if
will
up
other
about
out
many
then
them
these
so
some
her
would
make
like
him
into
time
has
look
two
more
write
go
see
number
no
way
could
people
my
than
first
water
been
called
who
oil
sit
now
find
long
down
day
did
get
come
made
may
part
over
new
sound
take
only
little
work
know
place
year
live
me
back
give
most
very
after
thing
our
just
name
good
sentence
man
think
say
great
where
help
through
much
before
line
right
too
mean
old
any
same
tell
boy
follow
came
want
show
also
around
form
three
small
set
put
end
does
another
well
large
must
big
even
such
because
turn
here
why
ask
went
men
read
need
land
different
home
us
move
try
kind
hand
picture
again
change
off
play
spell
air
away
animal
house
point
page
letter
mother
answer
found
study
still
learn
should
America
world
high
every
near
add
food
between
own
below
country
plant
last
school
father
keep
tree
never
start
city
earth
eye
light
thought
head
under
story
saw
left
don't
few
while
along
might
close
something
seem
next
hard
open
example
begin
life
always
those
both
paper
together
got
group
often
run
important
until
children
side
feet
car
mile
night
walk
white
sea
began
grow
took
river
four
carry
state
once
book
hear
stop
without
second
later
miss
idea
enough
eat
face
watch
far
Indian
really
almost
let
above
girl
sometimes
mountain
cut
young
talk
soon
list
song
being
leave
family
it's
body
music
color
stand
sun
questions
fish
area
mark
dog
horse
birds
problem
complete
room
knew
since
ever
piece
told
usually
didn't
friends
easy
heard
order
red
door
sure
become
top
ship
across
today
during
short
better
best
however
low
hours
black
products
happened
whole
measure
remember
early
waves
reached
listen
wind
rock
space
covered
fast
several
hold
toward
five
step
morning
passed
vowel
true
hundred
against
pattern
numeral
table
north
slowly
money
map
farm
pulled
draw
voice
seen
cold
cried
plan
notice
south
sing
war
ground
fall
king
town
I'll
unit
figure
certain
field
travel
wood
fire
upon
done
English
road
half
ten
fly
gave
box
finally
wait
correct
oh
quickly
person
became
shown
minutes
strong
verb
stars
front
feel
fact
inches
street
decided
contain
course
surface
produce
building
ocean
class
note
nothing
rest
carefully
scientists
inside
wheels
stay
green
known
island
week
less
machine
base
ago
stood
plane
system
behind
ran
round
boat
game
force
brought
understand
warm
common
bring
explain
dry
though
language
shape
deep
thousands
yes
clear
equation
yet
government
filled
heat
full
hot
check
object
am
rule
among
noun
power
cannot
able
six
size
dark
ball
material
special
heavy
fine
pair
circle
include
built
can't
matter
square
syllables
perhaps
bill
felt
suddenly
test
direction
center
farmers
ready
anything
divided
general
energy
subject
Europe
moon
region
return
believe
dance
members
picked
simple
cells
paint
mind
love
cause
rain
exercise
eggs
train
blue
wish
drop
developed
window
difference
distance
heart
site
sum
summer
camp
swim
brave
badge
quest
level
`.trim();

const CLUES = {
  the: "A word used before a noun: ___ moon glows at night.",
  of: "A small word that shows belonging: a cup ___ water.",
  and: "A joining word: cats ___ dogs.",
  to: "A word that points toward something: go ___ school.",
  in: "Where something is inside: fish swim ___ water.",
  is: "A being word: The sky ___ blue.",
  you: "The person I am talking to.",
  that: "A pointing word for something farther away.",
  was: "A past-tense being word: Yesterday it ___ sunny.",
  were: "A past-tense being word for more than one: They ___ ready.",
  said: "A word for spoke: She ___ hello.",
  there: "A place word: Put it over ___.",
  their: "A belonging word for a group: It is ___ turn.",
  would: "A helping word: I ___ like to play.",
  because: "A reason word: I smiled ___ I won.",
  different: "Not the same.",
  important: "Something that matters a lot.",
  children: "More than one child.",
  together: "With each other, not alone.",
  questions: "Things you ask when you want answers.",
  complete: "Finished, with no parts missing.",
  remember: "To keep something in your mind.",
  measure: "To find the size or amount.",
  pattern: "A design or order that repeats.",
  numeral: "A symbol that stands for a number.",
  equation: "A math sentence with an equals sign.",
  syllables: "Word parts you can clap.",
  exercise: "Movement that helps your body get stronger.",
  summer: "The warm season after spring.",
  camp: "A place or program for activities and adventures.",
  swim: "To move through water.",
  brave: "Ready to try even when it feels hard.",
  badge: "A small award that shows progress.",
  quest: "An adventure with a goal.",
  level: "A stage you reach in a game."
};

const CLUE_HINTS = {
  a: "A tiny word used before one thing: ___ dog barked.",
  about: "A word meaning connected to something: We talked ___ summer camp.",
  above: "A place word meaning higher than something else.",
  across: "A word for going from one side to the other.",
  add: "A math word meaning put numbers or things together.",
  after: "A time word meaning later than something else.",
  again: "A word meaning one more time.",
  air: "The invisible stuff people breathe.",
  all: "A word meaning every one of them.",
  almost: "Very nearly, but not quite.",
  along: "A word for moving beside or beside the length of something.",
  also: "A word meaning too or in addition.",
  always: "A word meaning every time.",
  am: "A being word used with I: I ___ ready.",
  America: "The country where states like Texas, Iowa, and Florida are found.",
  among: "A place word meaning in the middle of a group.",
  an: "A tiny word used before a vowel sound: ___ apple.",
  animal: "A living creature like a dog, bird, fish, or horse.",
  another: "One more, or a different one.",
  answer: "What you give when someone asks a question.",
  any: "A word meaning one, some, or whichever.",
  anything: "A word meaning any one thing at all.",
  are: "A being word used with you, we, or they.",
  area: "A space or part of a place.",
  around: "A word meaning on all sides, or nearby.",
  as: "A comparison word: as fast ___ lightning.",
  ask: "To say a question.",
  at: "A word that points to a place or time: ___ noon.",
  away: "A place word meaning not here, or farther off.",
  back: "The opposite direction from front, or the rear part of something.",
  base: "The bottom support or starting place.",
  be: "A being word: I want to ___ kind.",
  became: "A word meaning turned into or started to be.",
  because: "A reason word: I smiled ___ I won.",
  been: "A being word for something that has happened before.",
  before: "A time word meaning earlier than something else.",
  began: "Started in the past.",
  begin: "To start.",
  being: "A word about existing or living.",
  below: "A place word meaning lower than something else.",
  best: "Better than all the others.",
  better: "More good than before.",
  between: "A place word meaning in the middle of two things.",
  big: "Large in size.",
  birds: "Animals with feathers and wings.",
  black: "The darkest color.",
  body: "All the parts of a person or animal.",
  book: "Something with pages that you read.",
  both: "A word meaning two together.",
  boy: "A young male child.",
  bring: "To carry something to a place.",
  brought: "Carried something to a place in the past.",
  built: "Made or constructed in the past.",
  but: "A word that shows a turn in the idea: I was tired, ___ I played.",
  by: "A word that can mean near, beside, or made from someone.",
  called: "Named or phoned in the past.",
  came: "Moved here in the past.",
  can: "A word meaning able to.",
  cannot: "A word meaning not able to.",
  car: "A vehicle people drive on roads.",
  care: "To look after something or be concerned.",
  carefully: "Doing something with close attention.",
  carry: "To hold something while moving it.",
  cause: "The reason something happens.",
  cells: "Tiny living parts that make up plants, animals, and people.",
  center: "The middle of something.",
  certain: "Sure, or one exact thing.",
  change: "To make or become different.",
  check: "To look again and make sure something is right.",
  children: "More than one child.",
  circle: "A round shape with no corners.",
  city: "A large town with many buildings and streets.",
  class: "A group of students learning together.",
  clear: "Easy to see, hear, or understand.",
  close: "Near, or to shut something.",
  cold: "The opposite of hot.",
  color: "Red, blue, green, and yellow are examples of this.",
  come: "To move here.",
  common: "Something seen or used often.",
  complete: "Finished, with no parts missing.",
  contain: "To have something inside.",
  correct: "Right, not wrong.",
  could: "A helping word meaning was able to or might.",
  country: "A large area of land with its own government.",
  course: "A path, class, or direction something follows.",
  covered: "Had something over the top.",
  cried: "Made tears, or shouted loudly.",
  cut: "To divide with scissors, a knife, or a sharp edge.",
  dance: "To move your body to music.",
  dark: "Having little or no light.",
  day: "The time from morning to night.",
  decided: "Made a choice in the past.",
  deep: "Going far down.",
  developed: "Grew or changed over time.",
  did: "A past-tense helping word: I ___ my homework.",
  "didn't": "A short way to say did not.",
  difference: "The way two things are not the same.",
  different: "Not the same.",
  direction: "The way something points or moves.",
  distance: "How far apart two things are.",
  divided: "Split into parts.",
  do: "A helping word for actions: What will you ___?",
  does: "A helping word used with he, she, or it.",
  dog: "A common pet that barks.",
  done: "Finished.",
  "don't": "A short way to say do not.",
  door: "The part of a room or building that opens and closes.",
  down: "Toward a lower place.",
  draw: "To make a picture with a pencil, pen, or crayon.",
  drop: "To let something fall.",
  dry: "Not wet.",
  during: "A time word meaning while something is happening.",
  each: "Every one by itself.",
  early: "Before the usual time.",
  earth: "The planet we live on, or soil on the ground.",
  easy: "Not hard.",
  eat: "To put food in your mouth and swallow it.",
  eggs: "Oval things laid by birds, often eaten for breakfast.",
  end: "The last part.",
  energy: "Power that lets things move, work, or grow.",
  English: "The language used in this app.",
  enough: "As much as needed.",
  Europe: "A continent with countries like France, Spain, and Italy.",
  even: "A word for equal, flat, or divisible by two.",
  ever: "At any time.",
  every: "All of them, one by one.",
  example: "Something that shows what a rule or idea means.",
  exercise: "Movement that helps your body get stronger.",
  explain: "To make an idea clear by telling more about it.",
  eye: "The body part you see with.",
  face: "The front of your head with eyes, nose, and mouth.",
  fact: "Something true that can be checked.",
  fall: "To drop down, or the season after summer.",
  family: "People who belong together at home or by relation.",
  far: "A long way away.",
  farm: "A place where crops grow or animals are raised.",
  farmers: "People who grow food or raise animals.",
  fast: "Moving quickly.",
  father: "A dad.",
  feel: "To touch or have an emotion.",
  feet: "The body parts you stand on.",
  felt: "Touched or had an emotion in the past.",
  few: "Not many.",
  field: "An open area of land, often with grass or crops.",
  figure: "A number, shape, or person; also to solve something out.",
  filled: "Made full.",
  finally: "At last, after waiting.",
  find: "To discover where something is.",
  fine: "Okay, thin, or very good.",
  fire: "Hot flames that give light and heat.",
  first: "Number one in order.",
  fish: "An animal that lives in water and has gills.",
  five: "The number after four.",
  fly: "To move through the air.",
  follow: "To go after someone or obey directions.",
  food: "Something people or animals eat.",
  for: "A word that can show purpose: This gift is ___ you.",
  force: "A push or pull.",
  form: "A shape, kind, or paper to fill out.",
  found: "Discovered in the past.",
  four: "The number after three.",
  friends: "People you like and spend time with.",
  from: "A word showing where something starts.",
  front: "The part facing forward.",
  full: "Having no empty space.",
  game: "An activity with rules that you play.",
  gave: "Handed something to someone in the past.",
  general: "Not specific, or for most things.",
  get: "To receive, fetch, or become.",
  girl: "A young female child.",
  give: "To hand something to someone.",
  go: "To move or leave.",
  good: "Nice, right, or not bad.",
  got: "Received or became in the past.",
  government: "The people and system that run a city, state, or country.",
  great: "Very good or very large.",
  green: "The color of grass and many leaves.",
  ground: "The surface you walk on outside.",
  group: "A set of people or things together.",
  grow: "To get bigger or become older.",
  had: "Owned or experienced in the past.",
  half: "One of two equal parts.",
  hand: "The body part at the end of your arm.",
  happened: "Took place in the past.",
  hard: "Difficult, or not soft.",
  has: "Owns or holds; used with he, she, or it.",
  have: "To own, hold, or need to do something.",
  he: "A pronoun for a boy or man.",
  head: "The top body part with your brain, eyes, and mouth.",
  hear: "To notice sound with your ears.",
  heard: "Listened to or noticed sound in the past.",
  heart: "The organ in your chest that pumps blood.",
  heat: "Warmth or high temperature.",
  heavy: "Hard to lift.",
  help: "To make a job easier for someone.",
  her: "A pronoun for a girl or woman, or something belonging to her.",
  here: "This place.",
  herself: "A pronoun meaning that girl or woman did it, or it happened to her.",
  high: "Far above the ground.",
  him: "A pronoun for a boy or man receiving an action.",
  himself: "A pronoun meaning that boy or man did it, or it happened to him.",
  his: "Belonging to him.",
  hold: "To keep something in your hand or arms.",
  home: "The place where you live.",
  horse: "A large animal people can ride.",
  hot: "Very warm.",
  hours: "Units of time; there are 24 in a day.",
  house: "A building where people live.",
  how: "A question word asking in what way.",
  however: "A word that shows a contrast or change in idea.",
  hundred: "The number 100.",
  I: "The pronoun you use when talking about yourself.",
  idea: "A thought or plan in your mind.",
  if: "A word that starts a possible condition.",
  important: "Something that matters a lot.",
  in: "Where something is inside: fish swim ___ water.",
  inches: "Small units used to measure length.",
  include: "To have as part of a group.",
  Indian: "A word connected with India or Native peoples, depending on the sentence.",
  inside: "Within something.",
  into: "A word for moving to the inside.",
  is: "A being word: The sky ___ blue.",
  island: "Land with water all around it.",
  it: "A pronoun for a thing or animal.",
  "it's": "A short way to say it is or it has.",
  "I'll": "A short way to say I will.",
  just: "Only, exactly, or a moment ago.",
  keep: "To hold on to something or continue doing it.",
  kind: "Nice and caring, or a type of thing.",
  king: "A male ruler.",
  knew: "Understood or remembered in the past.",
  know: "To understand or remember.",
  land: "Ground, not water.",
  language: "Words people use to speak, read, or write.",
  large: "Big in size.",
  last: "The final one, or most recent.",
  later: "After this time.",
  learn: "To gain knowledge or skill.",
  leave: "To go away from a place.",
  left: "The opposite of right, or went away.",
  less: "A smaller amount.",
  let: "To allow.",
  letter: "A symbol in the alphabet, or a note you send.",
  life: "Being alive, or the time someone is alive.",
  light: "Brightness that lets you see, or not heavy.",
  like: "To enjoy, or a word for comparing things.",
  line: "A long thin mark, or people standing one behind another.",
  list: "Words or items written one after another.",
  listen: "To pay attention to sound.",
  little: "Small.",
  live: "To be alive, or to make your home somewhere.",
  long: "Measuring a lot from end to end.",
  look: "To use your eyes.",
  love: "To care about someone or something very much.",
  low: "Near the ground.",
  machine: "A thing with parts that does work.",
  made: "Built or created in the past.",
  make: "To create or build.",
  man: "An adult male person.",
  many: "A large number.",
  map: "A drawing that shows places and roads.",
  mark: "A spot, sign, score, or symbol.",
  material: "What something is made from.",
  matter: "Something important, or stuff that takes up space.",
  may: "A helping word meaning might or allowed to.",
  me: "A pronoun for the person speaking when receiving an action.",
  mean: "To have a meaning, or not kind.",
  measure: "To find the size or amount.",
  members: "People or parts that belong to a group.",
  men: "More than one man.",
  might: "A helping word meaning maybe.",
  mile: "A long distance measure used on roads.",
  mind: "The part of you that thinks and remembers.",
  minutes: "Small units of time; 60 make an hour.",
  miss: "To fail to hit, fail to see, or feel sad someone is gone.",
  money: "Coins and bills used to buy things.",
  moon: "The bright round object seen in the night sky.",
  more: "A bigger amount.",
  morning: "The early part of the day.",
  most: "The biggest amount or number.",
  mother: "A mom.",
  mountain: "A very high landform, taller than a hill.",
  move: "To change place or position.",
  much: "A large amount.",
  music: "Sounds with rhythm or melody.",
  must: "A helping word meaning have to.",
  my: "Belonging to me.",
  name: "The word people call a person, pet, or place.",
  near: "Close by.",
  need: "Something you must have.",
  never: "Not ever.",
  new: "Not old; just made or found.",
  next: "Coming right after this one.",
  night: "The dark part of the day.",
  no: "The opposite of yes.",
  not: "A word that makes a sentence negative: I am ___ done.",
  north: "The direction opposite south.",
  note: "A short written message, or a sound in music.",
  nothing: "Not anything.",
  notice: "To see or pay attention to something.",
  noun: "A word that names a person, place, thing, or idea.",
  now: "At this time.",
  number: "A word or symbol that tells how many.",
  numeral: "A symbol that stands for a number.",
  object: "A thing you can see or touch.",
  ocean: "A very large body of salt water.",
  of: "A small word that shows belonging: a cup ___ water.",
  off: "Away from, or not turned on.",
  often: "Many times.",
  oh: "A word people say when surprised.",
  oil: "A slippery liquid used for cooking, fuel, or machines.",
  old: "Having lived or existed for a long time.",
  on: "Touching the top or surface of something.",
  once: "One time.",
  one: "The number 1.",
  only: "Just one, or no more than.",
  open: "Not closed.",
  or: "A choice word: milk ___ juice.",
  order: "A sequence, command, or request to buy something.",
  other: "A different one.",
  our: "Belonging to us.",
  out: "Not inside.",
  over: "Above or across something.",
  own: "Belonging to yourself.",
  page: "One side of a sheet in a book.",
  paint: "Colored liquid used to make pictures or cover walls.",
  pair: "Two things that go together.",
  paper: "Thin sheets used for writing, drawing, or printing.",
  part: "A piece of something.",
  passed: "Went by or moved ahead in the past.",
  pattern: "A design or order that repeats.",
  people: "More than one person.",
  perhaps: "Maybe.",
  person: "One human being.",
  picked: "Chose or lifted something in the past.",
  picture: "A drawing, painting, or photo.",
  piece: "One part of something.",
  place: "A spot or location.",
  plan: "An idea for what to do next.",
  plane: "A flying machine with wings.",
  plant: "A living thing that grows in soil, like a flower or tree.",
  play: "To have fun with a game, toy, sport, or music.",
  point: "A dot, sharp end, or score.",
  power: "Energy or strength that makes things work.",
  problem: "Something that needs to be solved.",
  produce: "To make or grow something.",
  products: "Things made or sold.",
  pulled: "Moved something toward yourself.",
  put: "To place something somewhere.",
  questions: "Things you ask when you want answers.",
  quickly: "Done fast.",
  rain: "Water drops falling from clouds.",
  ran: "Moved fast on feet in the past.",
  reached: "Arrived at or stretched out to touch in the past.",
  read: "To look at words and understand them.",
  ready: "Prepared to start.",
  really: "Truly or very.",
  red: "The color of apples, stop signs, and fire trucks.",
  region: "An area or part of a larger place.",
  remember: "To keep something in your mind.",
  rest: "To relax, or what is left over.",
  return: "To come or go back.",
  right: "Correct, or the opposite of left.",
  river: "A long stream of water flowing across land.",
  road: "A path cars drive on.",
  rock: "A hard piece of earth or stone.",
  room: "A space inside a building.",
  round: "Shaped like a circle or ball.",
  rule: "A direction people are expected to follow.",
  run: "To move fast on your feet.",
  said: "A word for spoke: She ___ hello.",
  same: "Not different.",
  saw: "Used your eyes to see in the past.",
  say: "To speak words.",
  school: "A place where students learn.",
  scientists: "People who study the world using experiments and evidence.",
  sea: "A large body of salt water.",
  second: "Number two in order, or a tiny unit of time.",
  see: "To use your eyes.",
  seem: "To appear or look like.",
  seen: "Viewed or noticed before.",
  sentence: "A group of words that tells a complete thought.",
  set: "A group of things, or to put something in place.",
  several: "More than two, but not many.",
  shape: "The form of something, like a circle, square, or triangle.",
  she: "A pronoun for a girl or woman.",
  ship: "A large boat.",
  short: "Not long or not tall.",
  should: "A helping word for what is right or expected.",
  show: "To let someone see something.",
  shown: "Displayed or let someone see in the past.",
  side: "The left, right, top, or bottom edge of something.",
  simple: "Easy to understand or do.",
  since: "From a time in the past until now, or because.",
  sing: "To make music with your voice.",
  sit: "To rest your body on a chair or seat.",
  six: "The number after five.",
  size: "How big or small something is.",
  slowly: "Not quickly.",
  small: "Not big.",
  so: "A word that can mean very, therefore, or in order that.",
  some: "An amount that is not all.",
  something: "One thing that is not named.",
  sometimes: "Not always, but now and then.",
  song: "Music with words.",
  soon: "In a short time.",
  sound: "Something you hear.",
  south: "The direction opposite north.",
  space: "An empty area, or the area beyond Earth.",
  special: "Different in a good or important way.",
  spell: "To say or write the letters of a word in order.",
  square: "A shape with four equal sides and four corners.",
  stand: "To be on your feet.",
  stars: "Bright points of light in the night sky.",
  start: "To begin.",
  state: "A part of a country, like Texas or Illinois.",
  stay: "To remain in one place.",
  step: "One movement of your foot, or one part of a plan.",
  still: "Not moving, or continuing until now.",
  stood: "Was standing in the past.",
  stop: "To quit moving or quit doing something.",
  story: "A tale with characters and events.",
  street: "A road in a town or city.",
  strong: "Having a lot of power or muscle.",
  study: "To learn by reading, practicing, or thinking.",
  subject: "A topic, or a class like math or science.",
  such: "A word meaning that kind of.",
  suddenly: "Happening quickly and unexpectedly.",
  sum: "The answer when numbers are added.",
  sun: "The star that gives Earth light and warmth.",
  surface: "The outside or top layer of something.",
  sure: "Certain; not having doubt.",
  syllables: "Word parts you can clap.",
  system: "Parts that work together.",
  table: "Furniture with a flat top and legs.",
  take: "To grab, carry, or choose.",
  talk: "To speak with someone.",
  tell: "To say information to someone.",
  ten: "The number after nine.",
  test: "A way to check what someone knows or if something works.",
  than: "A comparison word: taller ___ me.",
  that: "A pointing word for something farther away.",
  their: "A belonging word for a group: It is ___ turn.",
  them: "A pronoun for more than one person or thing.",
  then: "A time word meaning after that.",
  there: "A place word: Put it over ___.",
  these: "A pointing word for more than one thing nearby.",
  they: "A pronoun for more than one person or thing.",
  thing: "An object, idea, or item.",
  think: "To use your mind to have an idea.",
  this: "A pointing word for something nearby.",
  those: "A pointing word for more than one thing farther away.",
  thought: "An idea in your mind, or the past of think.",
  thousands: "Groups of 1,000.",
  three: "The number after two.",
  through: "Going in one side and out the other.",
  time: "What clocks measure.",
  to: "A word that points toward something: go ___ school.",
  today: "This day.",
  together: "With each other, not alone.",
  told: "Said information to someone in the past.",
  too: "Also, or more than needed.",
  took: "Grabbed, carried, or chose in the past.",
  top: "The highest part.",
  toward: "In the direction of something.",
  town: "A place with homes, streets, and stores, smaller than a city.",
  train: "A long vehicle that runs on tracks.",
  travel: "To go from one place to another.",
  tree: "A tall plant with a trunk, branches, and leaves.",
  true: "Correct or real.",
  try: "To make an attempt.",
  turn: "To rotate, or your chance to do something.",
  two: "The number after one.",
  under: "Below something.",
  understand: "To know what something means.",
  unit: "One part of a larger whole.",
  until: "Up to a certain time.",
  up: "Toward a higher place.",
  upon: "On top of.",
  us: "A pronoun for me and others together.",
  use: "To do something with a tool, object, or idea.",
  usually: "Most of the time.",
  verb: "An action word or being word.",
  very: "A word that makes another word stronger.",
  voice: "The sound you make when speaking or singing.",
  vowel: "A letter like a, e, i, o, or u.",
  wait: "To stay until something happens.",
  walk: "To move on foot, slower than running.",
  want: "To wish for something.",
  war: "A fight between countries or groups.",
  warm: "A little hot in a comfortable way.",
  was: "A past-tense being word: Yesterday it ___ sunny.",
  watch: "To look at something for a while, or a small clock worn on the wrist.",
  water: "The clear liquid people drink and fish swim in.",
  waves: "Moving ridges of water, sound, or light.",
  way: "A path, method, or direction.",
  we: "A pronoun for I and other people together.",
  week: "Seven days.",
  well: "In a good way, or a deep hole for water.",
  went: "Moved or traveled in the past.",
  were: "A past-tense being word for more than one: They ___ ready.",
  what: "A question word asking for information.",
  when: "A question word asking about time.",
  where: "A question word asking about a place.",
  which: "A question word asking someone to choose.",
  while: "A period of time, or during the time that.",
  white: "The color of snow or milk.",
  who: "A question word asking about a person.",
  whole: "All of something; complete.",
  why: "A question word asking for a reason.",
  will: "A helping word for the future.",
  wind: "Moving air.",
  window: "Glass in a wall that lets you see outside.",
  wish: "To hope for something.",
  with: "Together with, or using something.",
  without: "Not having something.",
  wood: "Hard material from trees.",
  words: "Groups of letters that have meaning.",
  work: "A job, task, or effort.",
  world: "Earth, or all people and places.",
  would: "A helping word: I ___ like to play.",
  write: "To make words with a pencil, pen, keyboard, or marker.",
  year: "Twelve months.",
  yes: "A word that means agreement.",
  yet: "Up to now, or still to come.",
  you: "The person I am talking to.",
  young: "Not old.",
  your: "Belonging to you."
};

const state = {
  profileId: null,
  mode: "spelling",
  screen: "home",
  session: null,
  input: "",
  feedback: null
};

let sharedAudioContext = null;
let audioUnlockBound = false;
let currentSpeechSource = null;
let currentUtterance = null;
const speechBufferCache = new Map();

const profilesSeed = [
  {
    id: "rising-second",
    name: "Winslow",
    color: "mint",
    listKey: "winslow",
    listLabel: "Winslow Words",
    marker: "Godzilla",
    markerIcon: "GZ",
    markerImage: "assets/godzilla-marker.jpg?v=1",
    photo: "assets/winslow-photo.jpg?v=2"
  },
  {
    id: "rising-fifth",
    name: "Beck",
    color: "coral",
    listKey: "beck",
    listLabel: "Beck Words",
    marker: "Joker",
    markerIcon: "JK",
    markerImage: "assets/joker-marker.jpg?v=2",
    photo: "assets/beck-photo.jpg?v=2"
  },
  {
    id: "early-kinder",
    name: "Thurston",
    color: "sun",
    kind: "early",
    listKey: "thurston-v5",
    listLabel: "Thurston Games",
    marker: "Cheetah",
    markerIcon: "CH",
    markerImage: "assets/cheetah-marker.jpg?v=1",
    photo: "assets/thurston-photo.jpg?v=1",
    photoPosition: "50% 24%"
  }
];

const EARLY_ITEMS = makeEarlyItems();
const wordsByProfile = Object.fromEntries(
  profilesSeed.map((profile) => [profile.id, profile.kind === "early" ? EARLY_ITEMS : makeWords(WORD_LISTS[profile.listKey], profile.listLabel)])
);
let store = loadStore();

const MATH_PRACTICE_MODES = [
  { id: "daily10", label: "Daily Mixed 10", detail: "10 adaptive facts" },
  { id: "no-timer", label: "No Timer", detail: "Accuracy practice" },
  { id: "streak", label: "Streak Mode", detail: "10 correct in a row" },
  { id: "flash", label: "Flash Round", detail: "60 second sprint" },
  { id: "boss", label: "Boss Facts", detail: "Mistake bank" }
];

const MATH_GRADES = {
  "math-2": {
    label: "2nd Grade Math",
    levels: [
      ["2-add-10", "Add Within 10"],
      ["2-sub-10", "Subtract Within 10"],
      ["2-add-20", "Add Within 20"],
      ["2-sub-20", "Subtract Within 20"],
      ["2-make-10", "Make 10"],
      ["2-100", "Add/Subtract Within 100"],
      ["2-skip", "Skip Counting"],
      ["2-mult", "Multiplication Through 12"]
    ]
  },
  "math-5": {
    label: "5th Grade Math",
    levels: [
      ["5-refresh", "Fact Refresh"],
      ["5-add-sub", "Multi-Digit Add/Subtract"],
      ["5-mult", "Multiplication Fluency"],
      ["5-div", "Division Fluency"],
      ["5-frac-basic", "Fractions Basics"],
      ["5-frac-ops", "Fraction Operations"],
      ["5-decimals", "Decimals"],
      ["5-mixed", "Mixed Review"],
      ["5-word", "Simple Word Problems"]
    ]
  }
};

function makeEarlyItems() {
  const numberPool = Array.from({ length: 10 }, (_, value) => String(value + 1));
  const additionPool = Array.from({ length: 18 }, (_, value) => String(value + 1));
  const bigNumberPool = Array.from({ length: 100 }, (_, value) => String(value + 1));
  const spokenNumbers = [
    10,
    20,
    30,
    40,
    50,
    100,
    12,
    15,
    25,
    60,
    70,
    80,
    90,
    11,
    13,
    14,
    16,
    17,
    18,
    19,
    21,
    22,
    23,
    24,
    26,
    27,
    28,
    29,
    35,
    45,
    55,
    65,
    75,
    85,
    95,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    ...Array.from({ length: 100 }, (_, value) => value + 1)
  ].filter((number, index, all) => all.indexOf(number) === index);
  const sightWords = [
    "I",
    "a",
    "the",
    "go",
    "to",
    "me",
    "my",
    "we",
    "see",
    "up",
    "in",
    "is",
    "it",
    "no",
    "yes",
    "am",
    "at",
    "can",
    "do",
    "he",
    "she",
    "look",
    "like",
    "play",
    "run",
    "jump",
    "come",
    "here",
    "down",
    "away",
    "big",
    "little",
    "help",
    "make",
    "find",
    "one",
    "two",
    "three",
    "red",
    "blue"
  ];
  const shapes = ["circle", "square", "triangle", "star", "heart", "diamond"];
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  const patterns = [
    { type: "shape", sequence: ["circle", "circle", "square", "circle", "circle", "square"], answer: "circle" },
    { type: "shape", sequence: ["triangle", "star", "star", "triangle", "star", "star"], answer: "triangle" },
    { type: "shape", sequence: ["heart", "diamond", "circle", "heart", "diamond", "circle"], answer: "heart" },
    { type: "shape", sequence: ["square", "triangle", "circle", "square", "triangle", "circle"], answer: "square" },
    { type: "color", sequence: ["red", "red", "blue", "red", "red", "blue"], answer: "red" },
    { type: "color", sequence: ["green", "yellow", "yellow", "green", "yellow", "yellow"], answer: "green" },
    { type: "color", sequence: ["purple", "orange", "blue", "purple", "orange", "blue"], answer: "purple" },
    { type: "color", sequence: ["yellow", "green", "red", "yellow", "green", "red"], answer: "yellow" }
  ];
  const countItems = Array.from({ length: 10 }, (_, value) => value + 1).map((number) => ({
    word: `number-${number}`,
    tier: "Numbers",
    mode: "number",
    prompt: "How many dots?",
    display: number,
    answer: String(number),
    speakText: "How many dots?",
    choices: makeChoices(numberPool, String(number), number + 2, 4)
  }));
  const spokenNumberItems = spokenNumbers.map((number, index) => ({
    word: `spoken-number-${number}`,
    tier: "Big Numbers",
    mode: "spoken-number",
    prompt: "Listen for the number",
    display: "",
    answer: String(number),
    speakText: String(number),
    choices: makeChoices(bigNumberPool, String(number), number + index + 11, 4)
  }));
  const additionItems = [
    [4, 3],
    [5, 2],
    [6, 1],
    [5, 4],
    [7, 2],
    [6, 3],
    [8, 1],
    [7, 4],
    [8, 5],
    [9, 3],
    [6, 6],
    [9, 4],
    [8, 7],
    [9, 6],
    [9, 8]
  ].map(([left, right], index) => ({
    word: `add-${left}-${right}`,
    tier: "Adding",
    mode: "addition",
    prompt: "Add them up",
    display: `${left} + ${right}`,
    answer: String(left + right),
    speakText: "Add them up",
    choices: makeChoices(additionPool, String(left + right), index + 4, 4)
  }));
  const patternItems = patterns.map((pattern, index) => ({
    word: `pattern-${pattern.type}-${index}`,
    tier: "Patterns",
    mode: "pattern",
    prompt: "What comes next?",
    patternType: pattern.type,
    sequence: pattern.sequence,
    answer: pattern.answer,
    speakText: "What comes next?",
    choices: makeChoices(pattern.type === "shape" ? shapes : colors, pattern.answer, index + 3, 4)
  }));
  const shapeItems = shapes.map((shape, index) => ({
    word: `shape-${shape}`,
    tier: "Shapes",
    mode: "shape",
    prompt: "Listen and find it",
    answer: shape,
    speakText: shape,
    choices: makeChoices(shapes, shape, index + 5, 4)
  }));
  const colorItems = colors.map((color, index) => ({
    word: `color-${color}`,
    tier: "Colors",
    mode: "color",
    prompt: "Listen and find it",
    answer: color,
    speakText: color,
    choices: makeChoices(colors, color, index + 4, 4)
  }));
  const sightItems = sightWords.map((word, index) => ({
    word: `sight-${word.toLowerCase()}`,
    tier: "First Words",
    mode: "sight",
    prompt: "Match this word",
    display: word,
    answer: word,
    speakText: word,
    choices: makeChoices(sightWords, word, index + 6, 4)
  }));
  const groups = {
    count: countItems,
    sight: sightItems,
    addition: additionItems,
    spoken: spokenNumberItems,
    pattern: patternItems
  };
  const schedule = ["count", "sight", "addition", "spoken", "sight", "addition", "pattern", "sight", "addition", "spoken"];
  const cursors = Object.fromEntries(Object.keys(groups).map((key) => [key, 0]));
  const items = [];
  for (let pass = 0; pass < 500; pass += 1) {
    const key = schedule[pass % schedule.length];
    const group = groups[key];
    const item = group[cursors[key] % group.length];
    items.push({ ...item, word: `${item.word}-round-${pass}` });
    cursors[key] += 1;
  }
  return items.map((item, index) => ({ ...item, index, clue: item.prompt }));
}

function makeChoices(pool, answer, offset, count) {
  const choices = [answer];
  for (let step = 1; choices.length < count && step <= pool.length * 2; step += 1) {
    const candidate = pool[(offset + step * 3) % pool.length];
    if (!choices.includes(candidate)) choices.push(candidate);
  }
  return choices
    .map((choice, index) => ({ choice, sort: (offset + index * 7) % count }))
    .sort((left, right) => left.sort - right.sort)
    .map(({ choice }) => choice);
}

function makeWords(sourceWords, listLabel) {
  return sourceWords
    .map(cleanWord)
    .filter(Boolean)
    .filter((word, index, all) => all.indexOf(word) === index)
    .map((word, index) => ({
      word,
      index,
      tier: listLabel,
      clue: makeClue(word)
    }));
}

function cleanWord(word) {
  return word.trim().replace(/[^\w']/g, "");
}

function makeClue(word) {
  const lower = word.toLowerCase();
  const clue = CLUES[lower] || CLUE_HINTS[lower] || GENERATED_CLUES[lower];
  if (clue) return formatClue(clue);
  if (word.endsWith("ing")) return `An action happening right now, ending with the sound "ing".`;
  if (word.endsWith("ed")) return `An action that already happened, ending with the sound "ed".`;
  return `A spelling word from your own list. Listen for its sounds, then use Letter Mix if you need a boost.`;
}

function formatClue(clue) {
  const cleaned = clue
    .replace(/^A word meaning:\s*/i, "")
    .replace(/^A word meaning\s+/i, "")
    .trim();
  return cleaned ? cleaned[0].toUpperCase() + cleaned.slice(1) : clue;
}

function loadStore() {
  const fallback = loadFreshStore();

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved?.profiles) return fallback;
    return {
      profiles: Object.fromEntries(
        profilesSeed.map((profile) => {
          const savedProfile = saved.profiles[profile.id];
          const savedMatchesCurrentList = savedProfile?.wordListVersion === profile.listKey;
          return [
            profile.id,
            savedMatchesCurrentList
              ? { ...fallback.profiles[profile.id], ...savedProfile, ...profile, wordListVersion: profile.listKey }
              : fallback.profiles[profile.id]
          ];
        })
      )
    };
  } catch {
    return fallback;
  }
}

function loadFreshStore() {
  return {
    profiles: Object.fromEntries(profilesSeed.map((profile) => [profile.id, makeFreshProfile(profile)]))
  };
}

function makeFreshProfile(profile) {
  const mathGradeTrack = profile.id === "rising-fifth" ? "math-5" : "math-2";
  const mathLevelId = mathGradeTrack === "math-5" ? "5-refresh" : "2-add-10";
  return {
    ...profile,
    wordListVersion: profile.listKey,
    points: 0,
    lifetimePoints: 0,
    streak: 0,
    bestStreak: 0,
    sessionsDone: 0,
    wordsMastered: [],
    wordStats: {},
    reviewQueue: [],
    shakyQueue: [],
    lastSession: null,
    math: {
      gradeTrack: mathGradeTrack,
      levelId: mathLevelId,
      practiceMode: "daily10",
      xp: 0,
      stars: 0,
      sessionsDone: 0,
      dailyStreak: 0,
      totalSeconds: 0,
      stats: {},
      mistakeBank: [],
      lastSession: null
    }
  };
}

function saveStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function currentProfile() {
  const profile = store.profiles[state.profileId] || store.profiles[profilesSeed[0].id];
  ensureProfileShape(profile);
  return profile;
}

function ensureProfileShape(profile) {
  const fresh = makeFreshProfile(profilesSeed.find((seed) => seed.id === profile.id) || profilesSeed[0]);
  profile.math = {
    ...fresh.math,
    ...(profile.math || {}),
    stats: { ...fresh.math.stats, ...(profile.math?.stats || {}) },
    mistakeBank: profile.math?.mistakeBank || []
  };
  const allowedGrade = getAllowedMathGrade(profile);
  if (profile.math.gradeTrack !== allowedGrade) {
    profile.math.gradeTrack = allowedGrade;
    profile.math.levelId = MATH_GRADES[allowedGrade].levels[0][0];
  }
}

function getAllowedMathGrade(profile) {
  return profile.id === "rising-fifth" ? "math-5" : "math-2";
}

function wordsForProfile(profile) {
  return wordsByProfile[profile.id] || wordsByProfile[profilesSeed[0].id];
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <main class="shell">
      ${renderBackdrop()}
      ${state.screen === "home" ? renderHome() : ""}
      ${state.screen === "dashboard" ? renderDashboard() : ""}
      ${state.screen === "play" ? renderGame() : ""}
      ${state.screen === "summary" ? renderSummary() : ""}
    </main>
  `;
  bindEvents();
}

function renderBackdrop() {
  return `
    <div class="skyline" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
  `;
}

function renderHome() {
  return `
    <section class="home-view">
      <div class="brand-lockup">
        <div class="app-mark logo-mark" aria-hidden="true">
          <img src="assets/midvale-logo.jpg?v=1" alt="" />
        </div>
        <div>
          <p class="eyebrow">Summer Learning Quest</p>
          <h1>Pick your player</h1>
        </div>
      </div>
      <div class="profile-grid">
        ${profilesSeed
          .map((profile) => {
            const saved = store.profiles[profile.id];
            return `
              <button class="profile-card ${profile.color}" data-action="choose-profile" data-profile="${profile.id}">
                <span class="profile-photo-wrap">
                  <span class="profile-initial">${profile.name[0]}</span>
                  <img class="profile-photo" src="${profile.photo}" alt="" style="object-position:${profile.photoPosition || "center"}" onerror="this.style.display='none'" />
                </span>
                <span class="profile-orbit"></span>
                <span class="profile-name">${profile.name}</span>
                <span class="profile-meta">${saved.points.toLocaleString()} points</span>
                <span class="profile-meta">${saved.sessionsDone} sessions finished</span>
              </button>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderDashboard() {
  const profile = currentProfile();
  if (state.mode === "math") return renderMathDashboard(profile);
  const profileWords = wordsForProfile(profile);
  const mastered = profile.wordsMastered.length;
  const reviewCount = getReviewWords(profile, profile.sessionsDone).length;
  const shakyCount = getShakyWords(profile).length;
  const sessionRange = getFreshSessionRange(profile, profile.sessionsDone);
  const allowance = getAllowanceProgress(profile);
  const nextTitle = profile.kind === "early" ? "Play until 100 points" : "Play until 100 points";
  const nextDetail =
    profile.kind === "early"
      ? `${reviewCount ? `${reviewCount} review` : "Fresh start"} • sight words, dots, spoken numbers, adding, patterns`
      : `${reviewCount ? `${reviewCount} skipped/missed review` : "Fresh start"}${shakyCount ? ` + ${shakyCount} Letter Mix review` : ""} • ${sessionRange}`;
  return `
    <section class="dashboard-view">
      <header class="topbar">
        <button class="icon-btn player-nav" data-action="home" aria-label="Change player">
          <img src="${profile.photo}" alt="" style="object-position:${profile.photoPosition || "center"}" onerror="this.style.display='none'" />
          <span>${profile.name[0]}</span>
        </button>
        <div>
          <p class="eyebrow">${profile.name}</p>
          <h1>Quest Map</h1>
        </div>
      </header>

      ${renderModeSwitch()}

      <section class="score-ribbon">
        <div>
          <span class="metric-label">Total Points</span>
          <strong>${profile.points.toLocaleString()}</strong>
        </div>
        <div>
          <span class="metric-label">Best Streak</span>
          <strong>${profile.bestStreak}</strong>
        </div>
        <div>
          <span class="metric-label">Mastered</span>
          <strong>${mastered}/${profileWords.length}</strong>
        </div>
        <div>
          <span class="metric-label">Sessions</span>
          <strong>${profile.sessionsDone}</strong>
        </div>
      </section>

      <section class="progress-band">
        <div class="progress-copy">
          <span class="metric-label">Allowance Track</span>
          <h2>$${allowance.earnedDollars} earned</h2>
        </div>
        <div class="allowance-track" aria-label="${allowance.pointsIntoGoal} of ${ALLOWANCE_POINT_GOAL} points toward next reward">
          <span style="width:${allowance.percent}%"></span>
          <b class="track-marker ${profile.color}" style="left:${allowance.percent}%">
            <img src="${profile.markerImage}" alt="" onerror="this.style.display='none'" />
            <em>${profile.markerIcon}</em>
          </b>
        </div>
        <p class="track-copy">${allowance.pointsIntoGoal}/${ALLOWANCE_POINT_GOAL} points toward the next $10 • ${profile.marker} is on the move</p>
      </section>

      <section class="next-card">
        <div>
          <p class="eyebrow">Next Session</p>
          <h2>${nextTitle}</h2>
          <p>${nextDetail}</p>
        </div>
        <button class="primary-btn" data-action="start-session">Start</button>
      </section>

      <section class="parent-tools">
        <button class="secondary-btn" data-action="reset-player">Reset ${profile.name}</button>
      </section>
    </section>
  `;
}

function renderModeSwitch() {
  return `
    <section class="mode-switch" aria-label="Choose learning mode">
      <button class="${state.mode === "spelling" ? "active" : ""}" data-action="set-mode" data-mode="spelling">
        <strong>Spelling Games</strong>
        <span>Words, clues, Letter Mix</span>
      </button>
      <button class="${state.mode === "math" ? "active" : ""}" data-action="set-mode" data-mode="math">
        <strong>Math Facts</strong>
        <span>Fast facts, levels, streaks</span>
      </button>
    </section>
  `;
}

function renderMathDashboard(profile) {
  const math = profile.math;
  const grade = MATH_GRADES[math.gradeTrack] || MATH_GRADES["math-2"];
  const allowance = getAllowanceProgress(profile);
  const mastered = getMasteredMathFacts(math).length;
  const fastest = getFastestMathFacts(math).slice(0, 3);
  const needsPractice = getMathReviewFacts(math).slice(0, 5);
  const recommended = getRecommendedMathLevel(math);
  const completedLevels = grade.levels.filter(([levelId]) => getLevelAccuracy(math, levelId).attempts >= 10 && getLevelAccuracy(math, levelId).accuracy >= 80).length;
  const minutes = Math.round((math.totalSeconds || 0) / 60);
  return `
    <section class="dashboard-view math-dashboard">
      <header class="topbar">
        <button class="icon-btn player-nav" data-action="home" aria-label="Change player">
          <img src="${profile.photo}" alt="" style="object-position:${profile.photoPosition || "center"}" onerror="this.style.display='none'" />
          <span>${profile.name[0]}</span>
        </button>
        <div>
          <p class="eyebrow">${profile.name}</p>
          <h1>Math Facts</h1>
        </div>
      </header>

      ${renderModeSwitch()}

      <section class="score-ribbon">
        <div>
          <span class="metric-label">Math XP</span>
          <strong>${(math.xp || 0).toLocaleString()}</strong>
        </div>
        <div>
          <span class="metric-label">Stars</span>
          <strong>${math.stars || 0}</strong>
        </div>
        <div>
          <span class="metric-label">Mastered</span>
          <strong>${mastered}</strong>
        </div>
        <div>
          <span class="metric-label">Review Bank</span>
          <strong>${math.mistakeBank.length}</strong>
        </div>
      </section>

      <section class="progress-band">
        <div class="progress-copy">
          <span class="metric-label">Allowance Track</span>
          <h2>$${allowance.earnedDollars} earned</h2>
        </div>
        <div class="allowance-track" aria-label="${allowance.pointsIntoGoal} of ${ALLOWANCE_POINT_GOAL} points toward next reward">
          <span style="width:${allowance.percent}%"></span>
          <b class="track-marker ${profile.color}" style="left:${allowance.percent}%">
            <img src="${profile.markerImage}" alt="" onerror="this.style.display='none'" />
            <em>${profile.markerIcon}</em>
          </b>
        </div>
        <p class="track-copy">${allowance.pointsIntoGoal}/${ALLOWANCE_POINT_GOAL} points toward the next $10 • ${profile.marker} is on the move</p>
      </section>

      <section class="selector-panel">
        <div>
          <p class="eyebrow">Track</p>
          <div class="track-lock">${grade.label}</div>
        </div>
        <div>
          <p class="eyebrow">Practice Mode</p>
          <div class="practice-grid">
            ${MATH_PRACTICE_MODES.map(
              (mode) => `
                <button class="${math.practiceMode === mode.id ? "active" : ""}" data-action="set-math-practice" data-practice="${mode.id}">
                  <strong>${mode.label}</strong>
                  <span>${mode.detail}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>
      </section>

      <section class="level-grid">
        ${grade.levels
          .map(([levelId, label], index) => {
            const levelStats = getLevelAccuracy(math, levelId);
            return `
              <button class="level-card ${math.levelId === levelId ? "active" : ""}" data-action="set-math-level" data-level="${levelId}">
                <span class="level-number">${index + 1}</span>
                <strong>${label}</strong>
                <span>${levelStats.attempts ? `${levelStats.accuracy}% accuracy • ${levelStats.attempts} tries` : "Ready to play"}</span>
                ${recommended?.levelId === levelId ? `<em>Bonus XP</em>` : ""}
              </button>
            `;
          })
          .join("")}
      </section>

      <section class="next-card">
        <div>
          <p class="eyebrow">${recommended?.levelId === math.levelId ? "Bonus Ready" : "Ready"}</p>
          <h2>${getMathLevelLabel(math.gradeTrack, math.levelId)}</h2>
          <p>${MATH_PRACTICE_MODES.find((mode) => mode.id === math.practiceMode)?.detail || "10 adaptive facts"} • weaker and less-used levels earn extra XP</p>
        </div>
        <button class="primary-btn" data-action="start-session">Start</button>
      </section>

      <section class="parent-panel">
        <div>
          <p class="eyebrow">Parent Progress</p>
          <h2>${grade.label}</h2>
        </div>
        <div class="parent-grid">
          <div><span class="metric-label">Levels Completed</span><strong>${completedLevels}/${grade.levels.length}</strong></div>
          <div><span class="metric-label">Daily Streak</span><strong>${math.dailyStreak || 0}</strong></div>
          <div><span class="metric-label">Minutes Practiced</span><strong>${minutes}</strong></div>
          <div><span class="metric-label">Total Math Sessions</span><strong>${math.sessionsDone || 0}</strong></div>
        </div>
        <div class="insight-grid">
          <div>
            <p class="metric-label">Fastest Facts</p>
            <p>${fastest.length ? fastest.map((item) => `${item.label} (${(item.bestMs / 1000).toFixed(1)}s)`).join(", ") : "Play a round to fill this in."}</p>
          </div>
          <div>
            <p class="metric-label">Needs Practice</p>
            <p>${needsPractice.length ? needsPractice.map((item) => item.label).join(", ") : "Nothing in the review bank yet."}</p>
          </div>
        </div>
      </section>

      <section class="parent-tools">
        <button class="secondary-btn" data-action="reset-player">Reset ${profile.name}</button>
      </section>
    </section>
  `;
}

function getAllowanceProgress(profile) {
  const points = profile.points || 0;
  const earnedDollars = Math.floor(points / ALLOWANCE_POINT_GOAL) * 10;
  const pointsIntoGoal = points % ALLOWANCE_POINT_GOAL;
  const percent = Math.min(100, Math.round((pointsIntoGoal / ALLOWANCE_POINT_GOAL) * 100));
  return { earnedDollars, pointsIntoGoal, percent };
}

function renderGame() {
  const session = state.session;
  const profile = currentProfile();
  if (session?.type === "math") return renderMathGame(profile, session);
  const item = session.words[session.index];
  const progress = Math.min(100, Math.round((session.points / SESSION_POINT_GOAL) * 100));
  if (profile.kind === "early") return renderEarlyGame(profile, session, item, progress);
  const blanks = item.word.replace(/[A-Za-z]/g, "_").replace(/'/g, "'");
  const answerLength = item.word.replace(/'/g, "").length;
  const entered = state.input.length;
  const isPractice = session.practiceWord === item.word;
  const mix = session.hintUsed ? getLetterMixState(item.word) : null;
  return `
    <section class="play-view">
      <header class="game-topbar">
        <button class="icon-btn player-nav" data-action="dashboard" aria-label="Back to quest map">
          <img src="${profile.photo}" alt="" style="object-position:${profile.photoPosition || "center"}" onerror="this.style.display='none'" />
          <span>${profile.name[0]}</span>
        </button>
        <div class="mini-progress">
          <span>Word ${session.index + 1} • ${session.points}/${SESSION_POINT_GOAL} pts</span>
          <div><span style="width:${progress}%"></span></div>
        </div>
        <div class="points-pill">${session.points} pts</div>
      </header>

      <article class="word-stage">
        <p class="clue">${item.clue}</p>
        ${isPractice ? `<div class="reveal-word">${item.word}</div>` : ""}
        <div class="blank-word" aria-label="Blank spelling word">${blanks.split("").map((char) => `<span>${char}</span>`).join("")}</div>
        <label class="answer-box">
          <span>${entered}/${answerLength}</span>
          <input id="answerInput" readonly autocomplete="off" autocapitalize="none" spellcheck="false" value="${escapeHtml(state.input)}" placeholder="${isPractice ? "Copy the word" : "Type the word"}" />
        </label>
        ${renderSpellingKeypad()}
        ${mix ? renderLetterMix(mix) : ""}
        ${state.feedback ? `<div class="feedback ${state.feedback.type}">${state.feedback.message}</div>` : ""}
      </article>

      <footer class="game-actions">
        <button class="secondary-btn" data-action="restart-session">Start current session over</button>
        <button class="secondary-btn" data-action="skip-word" ${isPractice ? "disabled" : ""}>Skip</button>
        <button class="secondary-btn" data-action="hint" ${session.hintUsed || isPractice ? "disabled" : ""}>Letter Mix</button>
        <button class="primary-btn" data-action="submit-answer">${isPractice ? "Continue" : "Check"}</button>
      </footer>
    </section>
  `;
}

function renderEarlyGame(profile, session, item, progress) {
  return `
    <section class="play-view">
      <header class="game-topbar">
        <button class="icon-btn player-nav" data-action="dashboard" aria-label="Back to quest map">
          <img src="${profile.photo}" alt="" style="object-position:${profile.photoPosition || "center"}" onerror="this.style.display='none'" />
          <span>${profile.name[0]}</span>
        </button>
        <div class="mini-progress">
          <span>Round ${session.index + 1} • ${session.points}/${SESSION_POINT_GOAL} pts</span>
          <div><span style="width:${progress}%"></span></div>
        </div>
        <div class="points-pill">${session.points} pts</div>
      </header>

      <article class="word-stage early-stage">
        <div class="early-prompt-row">
          <p class="early-prompt">${item.prompt}</p>
          ${item.speakText && item.mode !== "shape" && item.mode !== "color" && item.mode !== "spoken-number" ? renderAudioButton(item.speakText, "speak-btn") : ""}
        </div>
        <div class="early-target ${item.mode}">${renderEarlyTarget(item)}</div>
        <div class="choice-grid">
          ${item.choices.map((choice) => renderEarlyChoice(item, choice)).join("")}
        </div>
        ${state.feedback ? `<div class="feedback ${state.feedback.type}">${state.feedback.message}</div>` : ""}
      </article>

      <footer class="game-actions">
        <button class="secondary-btn" data-action="restart-session">Start current session over</button>
        <button class="secondary-btn" data-action="skip-word">Skip</button>
      </footer>
    </section>
  `;
}

function renderLetterMix(mix) {
  return `
    <div class="letter-builder" aria-label="Letter Mix builder">
      <div class="mix-slots">
        ${mix.slots
          .map(
            (letter, index) => `
              <button class="mix-slot ${letter ? "filled" : ""}" data-action="mix-slot" data-slot="${index}" data-drop-slot="${index}" aria-label="Letter slot ${index + 1}">
                ${letter ? escapeHtml(letter) : ""}
              </button>
            `
          )
          .join("")}
      </div>
      <div class="mix-bank">
        ${mix.bank
          .map((letter, index) =>
            letter
              ? `<button class="mix-tile" draggable="true" data-action="mix-letter" data-letter-index="${index}" data-drag-letter="${index}" aria-label="Use ${escapeHtml(letter)}">${escapeHtml(letter)}</button>`
              : `<span class="mix-tile empty" aria-hidden="true"></span>`
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderEarlyTarget(item) {
  if (item.mode === "number") return `<span class="dot-row">${renderDots(item.display)}</span>`;
  if (item.mode === "addition") return escapeHtml(item.display);
  if (item.mode === "pattern") {
    return `
      <span class="pattern-row">
        ${item.sequence.map((value) => renderToken(value, item.patternType)).join("")}
        <b>?</b>
      </span>
    `;
  }
  if (item.mode === "shape" || item.mode === "color" || item.mode === "spoken-number") return renderAudioButton(item.speakText, "listen-hero");
  return escapeHtml(item.display);
}

function renderAudioButton(text, className) {
  return `
    <button class="${className}" data-action="speak-prompt" aria-label="Hear ${escapeHtml(text)}">
      <svg class="audio-icon" aria-hidden="true" viewBox="0 0 64 64" focusable="false">
        <path d="M8 25h12l17-14v42L20 39H8z"></path>
        <path d="M44 23c3 3 5 6 5 9s-2 7-5 9"></path>
        <path d="M50 16c5 5 8 10 8 16s-3 12-8 16"></path>
      </svg>
    </button>
  `;
}

function renderEarlyChoice(item, choice) {
  const kind = item.mode === "pattern" ? item.patternType : item.mode === "spoken-number" ? "number-choice" : item.mode;
  return `
    <button class="choice-btn ${kind}" data-action="choose-answer" data-answer="${escapeHtml(choice)}" aria-label="${escapeHtml(choice)}">
      ${renderToken(choice, kind)}
    </button>
  `;
}

function renderMathGame(profile, session) {
  const problem = getCurrentMathProblem(profile, session);
  const target = session.targetStreak ? session.targetStreak : session.targetCount;
  const current = session.targetStreak ? session.currentStreak : session.completed;
  const progress = Math.min(100, Math.round((current / target) * 100));
  const flashCopy = session.timeLimit ? ` • ${Math.max(0, session.timeLimit - Math.floor((Date.now() - session.startTime) / 1000))}s` : "";
  return `
    <section class="play-view">
      <header class="game-topbar">
        <button class="icon-btn player-nav" data-action="dashboard" aria-label="Back to math map">
          <img src="${profile.photo}" alt="" style="object-position:${profile.photoPosition || "center"}" onerror="this.style.display='none'" />
          <span>${profile.name[0]}</span>
        </button>
        <div class="mini-progress">
          <span>${getMathPracticeLabel(session.practiceMode)} • ${current}/${target}${flashCopy}</span>
          <div><span style="width:${progress}%"></span></div>
        </div>
        <div class="points-pill">${session.xp} XP</div>
      </header>

      <article class="word-stage math-stage">
        <p class="eyebrow">${getMathLevelLabel(session.gradeTrack, session.levelId)}</p>
        ${problem.story ? `<p class="math-story">${problem.story}</p>` : ""}
        <div class="math-problem ${problem.layout === "vertical" ? "vertical-problem" : ""}">${renderMathPrompt(problem)}</div>
        ${problem.kind === "choice" ? renderMathChoices(problem) : renderMathInput(problem)}
        ${state.feedback ? `<div class="feedback ${state.feedback.type}">${state.feedback.message}</div>` : ""}
      </article>

      <footer class="game-actions">
        <button class="secondary-btn" data-action="restart-session">Start current session over</button>
        <button class="secondary-btn" data-action="skip-word">Skip</button>
        <button class="primary-btn" data-action="submit-math-answer">Check</button>
      </footer>
    </section>
  `;
}

function renderMathPrompt(problem) {
  if (problem.layout !== "vertical") return escapeHtml(problem.prompt);
  return `
    <span>${escapeHtml(problem.top)}</span>
    <span><b>${escapeHtml(problem.operator)}</b>${escapeHtml(problem.bottom)}</span>
    <i></i>
  `;
}

function renderMathInput(problem) {
  return `
    <label class="answer-box math-answer ${problem.layout === "vertical" ? "vertical-answer" : ""}">
      <span>${problem.answerHint || "Answer"}</span>
      <input id="mathAnswerInput" readonly inputmode="none" autocomplete="off" autocapitalize="none" spellcheck="false" value="${escapeHtml(state.input)}" placeholder="${problem.placeholder || "Type it"}" />
    </label>
    ${renderMathKeypad(problem)}
  `;
}

function renderSpellingKeypad() {
  return `
    <div class="onscreen-keyboard spelling-keyboard" aria-label="Spelling keyboard">
      ${["qwertyuiop", "asdfghjkl", "zxcvbnm"].map((row) => `
        <div>${row.split("").map((letter) => `<button data-action="type-key" data-key="${letter}">${letter}</button>`).join("")}</div>
      `).join("")}
      <div>
        <button class="wide-key" data-action="backspace-key" aria-label="Delete">⌫</button>
      </div>
    </div>
  `;
}

function renderMathKeypad(problem) {
  const specialKeys = problem.answer.includes("/")
    ? ["/"]
    : problem.answer.includes("r")
      ? ["r"]
      : /[.><=]/.test(problem.answer)
        ? [".", ">", "<", "="]
        : [];
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ...specialKeys, "0"];
  return `
    <div class="onscreen-keyboard math-keyboard" aria-label="Math keyboard">
      ${keys.map((key) => `<button data-action="type-key" data-key="${key}">${key}</button>`).join("")}
      <button class="wide-key" data-action="backspace-key" aria-label="Delete">⌫</button>
    </div>
  `;
}

function renderMathChoices(problem) {
  return `
    <div class="choice-grid math-choice-grid">
      ${problem.choices
        .map(
          (choice) => `
            <button class="choice-btn number-choice" data-action="submit-math-answer" data-answer="${escapeHtml(String(choice))}">
              ${escapeHtml(String(choice))}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMathSummary(profile, session) {
  const completed = session.completed || 1;
  const accuracy = Math.round((session.correct / completed) * 100);
  const allowance = getAllowanceProgress(profile);
  return `
    <section class="summary-view">
      <div class="summary-card">
        <p class="eyebrow">Math Round Complete</p>
        <h1>${session.xp} XP earned</h1>
        ${session.rewardUnlocked ? `<div class="celebration">$10 reward unlocked. Total earned: $${allowance.earnedDollars}</div>` : ""}
        <div class="summary-grid">
          <div><span class="metric-label">Accuracy</span><strong>${accuracy}%</strong></div>
          <div><span class="metric-label">Correct</span><strong>${session.correct}/${completed}</strong></div>
          <div><span class="metric-label">Best Streak</span><strong>${session.bestStreak}</strong></div>
        </div>
        ${session.missed.length ? `<p class="missed">Boss Facts waiting: ${session.missed.map((item) => item.label).join(", ")}</p>` : `<p class="perfect">Clean run. Those facts are getting fast.</p>`}
        <div class="summary-actions">
          <button class="secondary-btn" data-action="dashboard">Map</button>
          <button class="primary-btn" data-action="start-session">Next Round</button>
        </div>
      </div>
    </section>
  `;
}

function renderToken(value, kind) {
  if (kind === "shape") return `<span class="shape-token ${escapeHtml(value)}"></span>`;
  if (kind === "color") return `<span class="color-token ${escapeHtml(value)}"></span>`;
  return escapeHtml(value);
}

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!sharedAudioContext || sharedAudioContext.state === "closed") sharedAudioContext = new AudioContext();
  return sharedAudioContext;
}

function unlockAudio() {
  try {
    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") context.resume();

    // iPad browsers usually need one real tap before they allow later game sounds.
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.01);
  } catch {
    // The app still works if a browser blocks sound.
  }
}

function playCorrectCue() {
  try {
    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") context.resume();
    const gain = context.createGain();
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.28);

    [660, 880].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * 0.08);
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.08);
      oscillator.stop(context.currentTime + 0.24 + index * 0.08);
    });

  } catch {
    // Sound is a bonus; keep the game moving if a browser blocks it.
  }
}

function playWrongCue() {
  try {
    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") context.resume();
    const gain = context.createGain();
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.1, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.34);

    [220, 165].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * 0.12);
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.12);
      oscillator.stop(context.currentTime + 0.18 + index * 0.12);
    });

  } catch {
    // Sound is a bonus; keep the game moving if a browser blocks it.
  }
}

function renderDots(count) {
  if (Number(count) === 0) return `<i class="zero-dot">0</i>`;
  return Array.from({ length: Number(count) }, () => "<i></i>").join("");
}

function renderSummary() {
  const session = state.session;
  const profile = currentProfile();
  if (session?.type === "math") return renderMathSummary(profile, session);
  const completed = session.completed || session.index || 1;
  const accuracy = Math.round((session.correct / completed) * 100);
  const allowance = getAllowanceProgress(profile);
  return `
    <section class="summary-view">
      <div class="summary-card">
        <p class="eyebrow">Session Complete</p>
        <h1>${session.points} points earned</h1>
        ${session.rewardUnlocked ? `<div class="celebration">$10 reward unlocked. Total earned: $${allowance.earnedDollars}</div>` : ""}
        <div class="summary-grid">
          <div><span class="metric-label">Accuracy</span><strong>${accuracy}%</strong></div>
          <div><span class="metric-label">Correct</span><strong>${session.correct}/${completed}</strong></div>
          <div><span class="metric-label">Current Total</span><strong>${profile.points.toLocaleString()}</strong></div>
        </div>
        ${session.missed.length ? `<p class="missed">Practice again: ${session.missed.join(", ")}</p>` : `<p class="perfect">Clean run. That session is mastered.</p>`}
        <div class="summary-actions">
          <button class="secondary-btn" data-action="dashboard">Map</button>
          <button class="primary-btn" data-action="start-session">Next Session</button>
        </div>
      </div>
    </section>
  `;
}

function bindEvents() {
  if (!audioUnlockBound) {
    ["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
      document.addEventListener(eventName, unlockAudio, { once: true, passive: true });
    });
    audioUnlockBound = true;
  }

  document.querySelectorAll(".profile-photo").forEach((image) => {
    setTimeout(() => {
      if (!image.naturalWidth) image.style.display = "none";
    }, 250);
  });

  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", () => handleAction(element.dataset.action, element.dataset));
  });
  bindLetterMixEvents();

  const input = document.querySelector("#answerInput");
  if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    input.addEventListener("input", (event) => {
      state.input = event.target.value.replace(/[^a-zA-Z']/g, "").toLowerCase();
      event.target.value = state.input;
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") submitAnswer();
    });
  }

  const mathInput = document.querySelector("#mathAnswerInput");
  if (mathInput) {
    mathInput.focus();
    mathInput.setSelectionRange(mathInput.value.length, mathInput.value.length);
    mathInput.addEventListener("input", (event) => {
      state.input = event.target.value.replace(/[^0-9./<>=\-\sA-Za-z]/g, "").slice(0, 24);
      event.target.value = state.input;
    });
    mathInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") submitMathAnswer();
    });
  }
}

function handleAction(action, dataset) {
  if (action === "choose-profile") {
    state.profileId = dataset.profile;
    state.screen = "dashboard";
  }
  if (action === "set-mode") {
    state.mode = dataset.mode;
    state.session = null;
    state.input = "";
    state.feedback = null;
  }
  if (action === "set-math-grade") setMathGrade(dataset.grade);
  if (action === "set-math-level") setMathLevel(dataset.level);
  if (action === "set-math-practice") setMathPractice(dataset.practice);
  if (action === "home") state.screen = "home";
  if (action === "dashboard") {
    state.screen = "dashboard";
    state.input = "";
    state.feedback = null;
  }
  if (action === "start-session") startSession();
  if (action === "restart-session") restartSession();
  if (action === "reset-player") resetPlayer();
  if (action === "skip-word") skipWord();
  if (action === "choose-answer") chooseEarlyAnswer(dataset.answer);
  if (action === "mix-letter") placeMixLetter(Number(dataset.letterIndex));
  if (action === "mix-slot") clearMixSlot(Number(dataset.slot));
  if (action === "type-key") typeKey(dataset.key);
  if (action === "backspace-key") backspaceKey();
  if (action === "speak-prompt") speakCurrentPrompt();
  if (action === "hint") useHint();
  if (action === "submit-answer") submitAnswer();
  if (action === "submit-math-answer") submitMathAnswer(dataset.answer);
  render();
}

function startSession() {
  const profile = currentProfile();
  if (state.mode === "math") {
    startMathSession(profile);
    return;
  }
  state.session = {
    words: profile.kind === "early" ? getNextSessionWords(profile) : shuffleItems(getNextSessionWords(profile)),
    index: 0,
    points: 0,
    correct: 0,
    completed: 0,
    missed: [],
    shaky: [],
    hintUsed: false,
    mix: null,
    attempts: 0,
    practiceWord: null
  };
  state.screen = "play";
  state.input = "";
  state.feedback = null;
}

function restartSession() {
  if (!state.session) {
    startSession();
    return;
  }
  if (state.session.type === "math") {
    const previous = state.session;
    state.session = {
      ...previous,
      problems: [generateMathProblem(currentProfile(), previous.levelId, 0, previous.practiceMode, previous.seed)],
      index: 0,
      points: 0,
      xp: 0,
      stars: 0,
      correct: 0,
      completed: 0,
      currentStreak: 0,
      bestStreak: 0,
      missed: [],
      startTime: Date.now()
    };
    state.screen = "play";
    state.input = "";
    state.feedback = null;
    return;
  }
  state.session = {
    words: state.session.words,
    index: 0,
    points: 0,
    correct: 0,
    completed: 0,
    missed: [],
    shaky: [],
    hintUsed: false,
    mix: null,
    attempts: 0,
    practiceWord: null
  };
  state.screen = "play";
  state.input = "";
  state.feedback = null;
}

function resetPlayer() {
  const profile = currentProfile();
  if (!window.confirm(`Reset ${profile.name}? All learning progress, points, and money earned will be lost.`)) return;
  store.profiles[profile.id] = makeFreshProfile(profilesSeed.find((seed) => seed.id === profile.id));
  state.session = null;
  state.input = "";
  state.feedback = null;
  saveStore();
}

function setMathGrade(gradeTrack) {
  const profile = currentProfile();
  if (!MATH_GRADES[gradeTrack]) return;
  if (gradeTrack !== getAllowedMathGrade(profile)) return;
  profile.math.gradeTrack = gradeTrack;
  profile.math.levelId = MATH_GRADES[gradeTrack].levels[0][0];
  saveStore();
}

function setMathLevel(levelId) {
  const profile = currentProfile();
  const grade = MATH_GRADES[profile.math.gradeTrack];
  if (!grade?.levels.some(([id]) => id === levelId)) return;
  profile.math.levelId = levelId;
  saveStore();
}

function setMathPractice(practiceMode) {
  const profile = currentProfile();
  if (!MATH_PRACTICE_MODES.some((mode) => mode.id === practiceMode)) return;
  profile.math.practiceMode = practiceMode;
  saveStore();
}

function typeKey(key) {
  if (!state.session || !key) return;
  const isMath = state.session.type === "math";
  const allowed = isMath ? /[0-9./<>=r]/i : /[a-z']/i;
  if (!allowed.test(key)) return;
  state.input = `${state.input}${key.toLowerCase()}`.slice(0, isMath ? 24 : 32);
}

function backspaceKey() {
  state.input = state.input.slice(0, -1);
}

function startMathSession(profile) {
  const math = profile.math;
  const practiceMode = math.practiceMode || "daily10";
  const targetCount = practiceMode === "flash" ? 40 : 10;
  const seed = randomInt(1, 10000);
  state.session = {
    type: "math",
    gradeTrack: math.gradeTrack,
    levelId: math.levelId,
    practiceMode,
    seed,
    problems: [],
    index: 0,
    points: 0,
    xp: 0,
    stars: 0,
    correct: 0,
    completed: 0,
    currentStreak: 0,
    bestStreak: 0,
    missed: [],
    startTime: Date.now(),
    targetCount,
    targetStreak: practiceMode === "streak" ? 10 : null,
    timeLimit: practiceMode === "flash" ? 60 : null
  };
  state.session.problems.push(generateMathProblem(profile, math.levelId, 0, practiceMode, seed));
  state.screen = "play";
  state.input = "";
  state.feedback = null;
}

function getCurrentMathProblem(profile, session) {
  if (!session.problems[session.index]) {
    session.problems[session.index] = generateMathProblem(profile, session.levelId, session.index, session.practiceMode, session.seed);
  }
  return session.problems[session.index];
}

function submitMathAnswer(choiceAnswer = null) {
  if (!state.session || state.session.type !== "math") return;
  const profile = currentProfile();
  const problem = getCurrentMathProblem(profile, state.session);
  const typed = choiceAnswer ?? state.input.trim();
  if (!typed) {
    state.feedback = { type: "hint", message: "Put an answer in first." };
    render();
    return;
  }

  const elapsedMs = Date.now() - (problem.startedAt || state.session.startTime);
  const correct = normalizeMathAnswer(typed) === normalizeMathAnswer(problem.answer);
  recordMathAttempt(profile, problem, correct, elapsedMs);
  state.session.completed += 1;

  if (correct) {
    playCorrectCue();
    const earned = getMathPointValue(profile, problem);
    state.session.correct += 1;
    state.session.currentStreak += 1;
    state.session.bestStreak = Math.max(state.session.bestStreak, state.session.currentStreak);
    state.session.xp += earned;
    state.session.points += earned;
    if (state.session.correct % 5 === 0) state.session.stars += 1;
    const mastered = profile.math.stats[problem.id]?.mastered;
    const bonus = earned > 10 ? ` Bonus XP: +${earned}.` : earned < 10 ? ` +${earned} XP.` : " +10 XP.";
    state.feedback = { type: "good", message: `${mastered ? "Fact mastered!" : state.session.currentStreak >= 3 ? "Speed boost!" : "Nice."}${bonus}` };
  } else {
    playWrongCue();
    state.session.currentStreak = 0;
    addMathMistake(profile, problem);
    if (!state.session.missed.some((item) => item.id === problem.id)) state.session.missed.push({ id: problem.id, label: problem.label });
    state.feedback = { type: "bad", message: `Nice try. Answer: ${problem.answerLabel || problem.answer}. Boss Facts will bring it back.` };
  }

  saveStore();
  if (shouldFinishMathSession(state.session)) {
    setTimeout(() => {
      finishMathSession();
      render();
    }, 650);
    return;
  }

  setTimeout(nextMathProblem, correct ? 450 : 950);
}

function nextMathProblem() {
  const session = state.session;
  if (!session) return;
  session.index += 1;
  state.input = "";
  state.feedback = null;
  session.problems[session.index] = generateMathProblem(currentProfile(), session.levelId, session.index, session.practiceMode, session.seed);
  render();
}

function shouldFinishMathSession(session) {
  if (session.targetStreak && session.currentStreak >= session.targetStreak) return true;
  if (session.practiceMode === "flash") {
    return Date.now() - session.startTime >= session.timeLimit * 1000 || session.completed >= session.targetCount;
  }
  return session.completed >= session.targetCount;
}

function finishMathSession() {
  const profile = currentProfile();
  const previousRewards = Math.floor((profile.points || 0) / ALLOWANCE_POINT_GOAL);
  profile.points += state.session.points;
  profile.lifetimePoints = (profile.lifetimePoints || 0) + state.session.points;
  profile.math.xp += state.session.xp;
  profile.math.stars += state.session.stars;
  profile.math.sessionsDone += 1;
  profile.math.dailyStreak += 1;
  profile.math.totalSeconds += Math.max(1, Math.round((Date.now() - state.session.startTime) / 1000));
  profile.math.lastSession = {
    date: new Date().toISOString(),
    levelId: state.session.levelId,
    practiceMode: state.session.practiceMode,
    xp: state.session.xp,
    correct: state.session.correct,
    completed: state.session.completed,
    missed: state.session.missed
  };
  const currentRewards = Math.floor((profile.points || 0) / ALLOWANCE_POINT_GOAL);
  state.session.rewardUnlocked = currentRewards > previousRewards;
  saveStore();
  state.screen = "summary";
}

function getNextSessionWords(profile) {
  return getSessionWords(profile, profile.sessionsDone);
}

function getReviewWords(profile) {
  if (profile.kind === "early") return getQueuedReviewWords(profile).slice(0, REVIEW_WORDS_PER_SESSION);
  const queued = getQueuedReviewWords(profile).slice(0, REVIEW_WORDS_PER_SESSION);
  return queued;
}

function getSessionWords(profile, sessionNumber) {
  if (profile.kind === "early") {
    const reviewItems = getReviewWords(profile);
    const freshItems = getFreshWords(profile, sessionNumber, EARLY_SESSION_BUFFER - reviewItems.length, reviewItems);
    return [...reviewItems, ...freshItems];
  }
  const reviewWords = getReviewWords(profile);
  const shakyWords = getShakyWords(profile).filter((word) => !reviewWords.some((reviewWord) => reviewWord.word === word.word));
  const freshWords = getFreshWords(profile, sessionNumber, SESSION_WORD_BUFFER - reviewWords.length - shakyWords.length, [
    ...reviewWords,
    ...shakyWords
  ]);
  return [...reviewWords, ...shakyWords, ...freshWords];
}

function getQueuedReviewWords(profile) {
  const profileWords = wordsForProfile(profile);
  return (profile.reviewQueue || [])
    .map((queuedWord) => profileWords.find((word) => word.word.toLowerCase() === queuedWord.toLowerCase()))
    .filter(Boolean);
}

function getShakyWords(profile) {
  const profileWords = wordsForProfile(profile);
  return (profile.shakyQueue || [])
    .map((queuedWord) => profileWords.find((word) => word.word.toLowerCase() === queuedWord.toLowerCase()))
    .filter(Boolean)
    .slice(0, SHAKY_WORDS_PER_SESSION);
}

function getFreshWords(profile, sessionNumber, count, avoidWords = []) {
  const profileWords = wordsForProfile(profile);
  const bufferSize = profile.kind === "early" ? EARLY_SESSION_BUFFER : SESSION_WORD_BUFFER;
  const start = (sessionNumber * bufferSize) % profileWords.length;
  const avoidSet = new Set(avoidWords.map((word) => word.word.toLowerCase()));
  const repeatedWords = [...profileWords, ...profileWords, ...profileWords].slice(start);
  return repeatedWords.filter((word) => !avoidSet.has(word.word.toLowerCase())).slice(0, Math.max(0, count));
}

function getFreshSessionRange(profile, sessionNumber) {
  if (profile.kind === "early") return "Sight words, dots, spoken numbers, adding, patterns";
  const freshWords = getFreshWords(profile, sessionNumber, SESSION_WORD_BUFFER);
  return `Fresh words ${freshWords[0].index + 1}-${freshWords.at(-1).index + 1}`;
}

function generateMathProblem(profile, levelId, index, practiceMode = "daily10", seed = 0) {
  const problemIndex = index + (seed || 0);
  if (practiceMode === "boss") return generateBossProblem(profile, problemIndex);
  if (practiceMode === "daily10" && index % 3 === 1 && profile.math.mistakeBank.length) return generateBossProblem(profile, problemIndex);

  if (levelId === "5-mixed") {
    const reviewLevels = ["5-refresh", "5-add-sub", "5-mult", "5-div", "5-frac-basic", "5-frac-ops", "5-decimals", "5-word"];
    return generateMathProblem(profile, reviewLevels[problemIndex % reviewLevels.length], index + 3, "no-timer", seed);
  }

  const number = (factor, min, max) => min + ((problemIndex * factor + factor) % (max - min + 1));
  const problem = { levelId, startedAt: Date.now(), kind: "input" };

  if (levelId === "2-add-10") {
    const a = number(3, 1, 9);
    const b = number(5, 1, 10 - a);
    return makeMathProblem(problem, `${a} + ${b} =`, a + b, { layout: "vertical", top: a, bottom: b, operator: "+" });
  }
  if (levelId === "2-sub-10") {
    const total = number(4, 2, 10);
    const b = number(3, 1, total - 1);
    return makeMathProblem(problem, `${total} - ${b} =`, total - b, { layout: "vertical", top: total, bottom: b, operator: "-" });
  }
  if (levelId === "2-add-20") {
    const a = number(7, 4, 14);
    const b = number(5, 1, 20 - a);
    return makeMathProblem(problem, `${a} + ${b} =`, a + b, { layout: "vertical", top: a, bottom: b, operator: "+" });
  }
  if (levelId === "2-sub-20") {
    const total = number(6, 10, 20);
    const b = number(5, 1, total - 1);
    return makeMathProblem(problem, `${total} - ${b} =`, total - b, { layout: "vertical", top: total, bottom: b, operator: "-" });
  }
  if (levelId === "2-make-10") {
    const a = number(4, 1, 9);
    return problemIndex % 2 ? makeMathProblem(problem, `? + ${a} = 10`, 10 - a) : makeMathProblem(problem, `${a} + ? = 10`, 10 - a);
  }
  if (levelId === "2-100") {
    const add = problemIndex % 2 === 0;
    const a = add ? number(13, 24, 78) : number(17, 42, 99);
    const b = add ? number(9, 12, 36) : number(7, 8, Math.min(58, a - 1));
    return makeMathProblem(problem, `${a} ${add ? "+" : "-"} ${b} =`, add ? a + b : a - b, {
      layout: "vertical",
      top: a,
      bottom: b,
      operator: add ? "+" : "-"
    });
  }
  if (levelId === "2-skip") {
    const steps = [2, 3, 5, 10, 4, 6];
    const step = steps[problemIndex % steps.length];
    const start = step * number(2, 1, 5);
    const sequence = [start, start + step, start + step * 2];
    return makeMathProblem(problem, `Count by ${step}: ${sequence.join(", ")}, ?`, start + step * 3);
  }
  if (levelId === "2-mult") {
    const factorOrder = [1, 2, 5, 10, 3, 4, 6, 7, 8, 9, 11, 12];
    const a = factorOrder[problemIndex % factorOrder.length];
    const b = number(5, 1, 12);
    return makeMathProblem(problem, `${a} × ${b} =`, a * b);
  }
  if (levelId === "5-refresh") {
    const kind = problemIndex % 4;
    if (kind === 0) {
      const a = number(4, 12, 99);
      const b = number(9, 8, 76);
      return makeMathProblem(problem, `${a} + ${b} =`, a + b, { layout: "vertical", top: a, bottom: b, operator: "+" });
    }
    if (kind === 1) {
      const a = number(7, 35, 120);
      const b = number(5, 5, a - 1);
      return makeMathProblem(problem, `${a} - ${b} =`, a - b, { layout: "vertical", top: a, bottom: b, operator: "-" });
    }
    if (kind === 2) {
      const a = number(3, 2, 12);
      const b = number(8, 2, 12);
      return makeMathProblem(problem, `${a} × ${b} =`, a * b);
    }
    const divisor = number(3, 2, 12);
    const quotient = number(5, 2, 12);
    return makeMathProblem(problem, `${divisor * quotient} ÷ ${divisor} =`, quotient);
  }
  if (levelId === "5-add-sub") {
    const add = problemIndex % 2 === 0;
    const a = number(383, 1200, 9400);
    const b = number(211, 804, 4988);
    const top = Math.max(a, b);
    const bottom = Math.min(a, b);
    return add
      ? makeMathProblem(problem, `${a.toLocaleString()} + ${b.toLocaleString()} =`, a + b, { layout: "vertical", top: a.toLocaleString(), bottom: b.toLocaleString(), operator: "+" })
      : makeMathProblem(problem, `${top.toLocaleString()} - ${bottom.toLocaleString()} =`, top - bottom, {
          layout: "vertical",
          top: top.toLocaleString(),
          bottom: bottom.toLocaleString(),
          operator: "-"
        });
  }
  if (levelId === "5-mult") {
    const a = number(11, 18, 89);
    const b = problemIndex % 2 ? number(7, 11, 24) : number(5, 3, 9);
    return makeMathProblem(problem, `${a} × ${b} =`, a * b);
  }
  if (levelId === "5-div") {
    const divisor = number(5, 6, 24);
    const quotient = number(9, 8, 42);
    const remainder = problemIndex % 2 ? number(3, 1, divisor - 1) : 0;
    const dividend = divisor * quotient + remainder;
    const answer = remainder ? `${quotient} r ${remainder}` : quotient;
    return makeMathProblem(problem, `${dividend} ÷ ${divisor} =`, answer, { answerLabel: remainder ? `${quotient} remainder ${remainder}` : String(quotient), placeholder: "Example: 35 r 4" });
  }
  if (levelId === "5-frac-basic") return generateFractionBasic(problem, problemIndex);
  if (levelId === "5-frac-ops") return generateFractionOperation(problem, problemIndex);
  if (levelId === "5-decimals") return generateDecimalProblem(problem, problemIndex);
  if (levelId === "5-word") return generateWordProblem(problem, problemIndex);

  return makeMathProblem(problem, "5 + 5 =", 10);
}

function makeMathProblem(base, prompt, answer, extra = {}) {
  const label = prompt.replace(/\s*=$/, "").trim();
  const problem = {
    ...base,
    prompt,
    answer: String(answer),
    answerLabel: extra.answerLabel,
    answerHint: extra.answerHint,
    placeholder: extra.placeholder,
    story: extra.story,
    layout: extra.layout,
    top: extra.top,
    bottom: extra.bottom,
    operator: extra.operator,
    label,
    id: `${base.levelId}:${label}:${String(answer).toLowerCase()}`,
    ...extra
  };
  if (extra.choices) {
    problem.kind = "choice";
    problem.choices = extra.choices;
  }
  return problem;
}

function generateBossProblem(profile, index) {
  const bank = profile.math.mistakeBank;
  if (!bank.length) return generateMathProblem(profile, profile.math.levelId, index, "no-timer");
  const saved = bank[index % bank.length];
  return { ...saved, startedAt: Date.now(), kind: saved.kind || "input", fromBossBank: true };
}

function generateFractionBasic(base, index) {
  if (index % 3 === 0) return makeMathProblem(base, "Simplify 6/8 =", "3/4", { placeholder: "3/4" });
  if (index % 3 === 1) return makeMathProblem(base, "Compare: 3/4 ? 2/3", ">", { answerHint: "Use >, <, or =", placeholder: ">" });
  return makeMathProblem(base, "2/3 = ?/12", 8);
}

function generateFractionOperation(base, index) {
  if (index % 3 === 0) return makeMathProblem(base, "1/2 + 1/4 =", "3/4", { placeholder: "3/4" });
  if (index % 3 === 1) return makeMathProblem(base, "3/5 - 1/10 =", "1/2", { placeholder: "1/2" });
  return makeMathProblem(base, "2/3 × 3 =", 2);
}

function generateDecimalProblem(base, index) {
  if (index % 4 === 0) return makeMathProblem(base, "3.4 + 1.2 =", "4.6");
  if (index % 4 === 1) return makeMathProblem(base, "0.75 ? 0.7", ">", { answerHint: "Use >, <, or =", placeholder: ">" });
  if (index % 4 === 2) return makeMathProblem(base, "Round 4.68 to the nearest tenth", "4.7");
  return makeMathProblem(base, "8.3 - 2.8 =", "5.5");
}

function generateWordProblem(base, index) {
  const stories = [
    { story: "Beck buys 3 packs with 6 cards in each pack.", prompt: "How many cards?", answer: 18 },
    { story: "A pizza has 8 slices. Four kids share it equally.", prompt: "How many slices each?", answer: 2 },
    { story: "A game costs $24. Beck saves $7 each week for 4 weeks.", prompt: "How many dollars saved?", answer: 28 },
    { story: "A rectangle is 9 feet long and 4 feet wide.", prompt: "What is the area?", answer: 36 }
  ];
  const picked = stories[index % stories.length];
  return makeMathProblem(base, picked.prompt, picked.answer, { story: picked.story });
}

function normalizeMathAnswer(value) {
  return String(value)
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/remainder/g, "r")
    .replace(/\s+/g, "")
    .replace(/=/g, "")
    .trim();
}

function recordMathAttempt(profile, problem, correct, elapsedMs) {
  const existing = profile.math.stats[problem.id] || {
    id: problem.id,
    label: problem.label,
    levelId: problem.levelId,
    attempts: 0,
    correct: 0,
    incorrect: 0,
    totalMs: 0,
    bestMs: null,
    currentStreak: 0,
    bestStreak: 0,
    mastered: false
  };
  existing.attempts += 1;
  existing.correct += correct ? 1 : 0;
  existing.incorrect += correct ? 0 : 1;
  existing.totalMs += elapsedMs;
  if (correct) {
    existing.currentStreak += 1;
    existing.bestStreak = Math.max(existing.bestStreak, existing.currentStreak);
    existing.bestMs = existing.bestMs ? Math.min(existing.bestMs, elapsedMs) : elapsedMs;
  } else {
    existing.currentStreak = 0;
  }
  const averageMs = existing.totalMs / existing.attempts;
  existing.mastered = existing.correct >= 3 && existing.bestStreak >= 3 && averageMs <= 9000;
  profile.math.stats[problem.id] = existing;
  if (existing.mastered) removeMathMistake(profile, problem.id);
}

function addMathMistake(profile, problem) {
  const cleaned = profile.math.mistakeBank.filter((item) => item.id !== problem.id);
  const { fromBossBank, startedAt, ...savedProblem } = problem;
  profile.math.mistakeBank = [{ ...savedProblem, choices: null }, ...cleaned].slice(0, 40);
}

function removeMathMistake(profile, problemId) {
  profile.math.mistakeBank = profile.math.mistakeBank.filter((item) => item.id !== problemId);
}

function getMasteredMathFacts(math) {
  return Object.values(math.stats || {}).filter((stat) => stat.mastered);
}

function getFastestMathFacts(math) {
  return Object.values(math.stats || {})
    .filter((stat) => stat.bestMs)
    .sort((a, b) => a.bestMs - b.bestMs);
}

function getMathReviewFacts(math) {
  const byMistakeBank = (math.mistakeBank || []).map((item) => ({ label: item.label }));
  const byStats = Object.values(math.stats || {})
    .filter((stat) => stat.incorrect > 0 && !stat.mastered)
    .sort((a, b) => b.incorrect - a.incorrect);
  return [...byMistakeBank, ...byStats];
}

function getLevelAccuracy(math, levelId) {
  const stats = Object.values(math.stats || {}).filter((stat) => stat.levelId === levelId);
  const attempts = stats.reduce((sum, stat) => sum + stat.attempts, 0);
  const correct = stats.reduce((sum, stat) => sum + stat.correct, 0);
  return { attempts, accuracy: attempts ? Math.round((correct / attempts) * 100) : 0 };
}

function getRecommendedMathLevel(math) {
  const levels = MATH_GRADES[math.gradeTrack]?.levels || [];
  if (!levels.length) return null;
  const ranked = levels
    .map(([levelId, label]) => ({ levelId, label, ...getLevelAccuracy(math, levelId) }))
    .sort((left, right) => {
      if (left.attempts < 6 && right.attempts >= 6) return -1;
      if (right.attempts < 6 && left.attempts >= 6) return 1;
      if (left.accuracy !== right.accuracy) return left.accuracy - right.accuracy;
      return left.attempts - right.attempts;
    });
  return ranked[0];
}

function getMathPointValue(profile, problem) {
  const levelStats = getLevelAccuracy(profile.math, problem.levelId);
  const recommended = getRecommendedMathLevel(profile.math);
  let points = 10;
  if (problem.fromBossBank) points += 4;
  if (recommended?.levelId === problem.levelId) points += 4;
  if (levelStats.attempts < 6) points += 2;
  if (levelStats.attempts >= 20 && levelStats.accuracy >= 90 && recommended?.levelId !== problem.levelId) points -= 4;
  return Math.max(6, Math.min(18, points));
}

function getMathLevelLabel(gradeTrack, levelId) {
  return MATH_GRADES[gradeTrack]?.levels.find(([id]) => id === levelId)?.[1] || "Math Facts";
}

function getMathPracticeLabel(practiceMode) {
  return MATH_PRACTICE_MODES.find((mode) => mode.id === practiceMode)?.label || "Math Facts";
}

function useHint() {
  if (!state.session?.hintUsed) {
    state.session.hintUsed = true;
    const item = state.session.words[state.session.index];
    state.session.mix = createLetterMix(item.word);
    state.input = "";
    state.feedback = { type: "hint", message: "Build the word with Letter Mix. This word can still earn 6 points." };
  }
}

function createLetterMix(word) {
  const letters = shuffleWord(word).map((letter) => letter.toLowerCase());
  return {
    word,
    slots: Array.from({ length: letters.length }, () => ""),
    bank: letters
  };
}

function getLetterMixState(word) {
  if (!state.session.mix || state.session.mix.word !== word) state.session.mix = createLetterMix(word);
  return state.session.mix;
}

function syncInputFromMix() {
  state.input = (state.session.mix?.slots || []).join("");
}

function placeMixLetter(letterIndex, slotIndex = null) {
  const mix = state.session?.mix;
  if (!mix || !mix.bank[letterIndex]) return;
  const targetSlot = slotIndex ?? mix.slots.findIndex((slot) => !slot);
  if (targetSlot < 0) return;
  if (mix.slots[targetSlot]) return;
  mix.slots[targetSlot] = mix.bank[letterIndex];
  mix.bank[letterIndex] = "";
  syncInputFromMix();
}

function clearMixSlot(slotIndex) {
  const mix = state.session?.mix;
  if (!mix || !mix.slots[slotIndex]) return;
  const emptyBankIndex = mix.bank.findIndex((letter) => !letter);
  if (emptyBankIndex < 0) return;
  mix.bank[emptyBankIndex] = mix.slots[slotIndex];
  mix.slots[slotIndex] = "";
  syncInputFromMix();
}

function bindLetterMixEvents() {
  let draggedIndex = null;
  document.querySelectorAll("[data-drag-letter]").forEach((tile) => {
    tile.addEventListener("dragstart", (event) => {
      draggedIndex = Number(tile.dataset.dragLetter);
      event.dataTransfer?.setData("text/plain", String(draggedIndex));
    });
  });
  document.querySelectorAll("[data-drop-slot]").forEach((slot) => {
    slot.addEventListener("dragover", (event) => event.preventDefault());
    slot.addEventListener("drop", (event) => {
      event.preventDefault();
      const letterIndex = Number(event.dataTransfer?.getData("text/plain") || draggedIndex);
      placeMixLetter(letterIndex, Number(slot.dataset.dropSlot));
      render();
    });
  });
}

function skipWord() {
  if (!state.session) return;
  if (state.session.type === "math") {
    const profile = currentProfile();
    const problem = getCurrentMathProblem(profile, state.session);
    recordMathAttempt(profile, problem, false, Date.now() - (problem.startedAt || state.session.startTime));
    addMathMistake(profile, problem);
    if (!state.session.missed.some((item) => item.id === problem.id)) state.session.missed.push({ id: problem.id, label: problem.label });
    state.session.completed += 1;
    state.session.currentStreak = 0;
    state.feedback = { type: "bad", message: `Skipped for now. Answer: ${problem.answerLabel || problem.answer}. It is in Boss Facts.` };
    saveStore();
    if (shouldFinishMathSession(state.session)) {
      setTimeout(() => {
        finishMathSession();
        render();
      }, 750);
      return;
    }
    setTimeout(nextMathProblem, 850);
    return;
  }
  const item = state.session.words[state.session.index];
  markWordForReview(item.word);
  updateWordStat(item.word, false, 0);
  if (currentProfile().kind === "early") {
    state.feedback = { type: "bad", message: "Skipped for now. It will come back next session." };
    setTimeout(nextWord, 700);
    return;
  }
  state.session.practiceWord = item.word;
  state.session.attempts = 2;
  state.session.mix = null;
  state.input = "";
  state.feedback = { type: "bad", message: `Skipped for now. Copy "${item.word}" once, and it will return next session.` };
}

function chooseEarlyAnswer(answer) {
  if (!state.session) return;
  const item = state.session.words[state.session.index];
  if (answer === item.answer) {
    playCorrectCue();
    const earlyPoints = 5;
    state.session.points += earlyPoints;
    state.session.correct += 1;
    updateWordStat(item.word, true, earlyPoints);
    removeReviewWord(item.word);
    state.feedback = { type: "good", message: `Yes. +${earlyPoints} points.` };
    setTimeout(nextWord, 450);
    return;
  }

  state.session.attempts += 1;
  playWrongCue();
  if (state.session.attempts >= 2) {
    markWordForReview(item.word);
    updateWordStat(item.word, false, 0);
    state.feedback = { type: "bad", message: `Answer: ${item.answer}. It will come back next session.` };
    setTimeout(nextWord, 900);
  } else {
    state.feedback = { type: "bad", message: "Try one more." };
  }
}

function speakCurrentPrompt() {
  const item = state.session?.words[state.session.index];
  if (!item?.speakText) return;
  unlockAudio();
  playRecordedSpeech(item.speakText).catch(() => speakWithBrowserVoice(item.speakText));
}

function audioSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function playBundledSpeech(text) {
  const context = getAudioContext();
  if (!context) throw new Error("No audio context");
  if (context.state === "suspended") await context.resume();
  const slug = audioSlug(text);
  let buffer = speechBufferCache.get(slug);
  if (!buffer) {
    const response = await fetch(`assets/audio/${slug}.wav?v=1`);
    if (!response.ok) throw new Error("Speech clip missing");
    const data = await response.arrayBuffer();
    buffer = await context.decodeAudioData(data.slice(0));
    if (!buffer.duration || buffer.duration < 0.05) throw new Error("Speech clip is empty");
    speechBufferCache.set(slug, buffer);
  }
  if (currentSpeechSource) currentSpeechSource.stop();
  currentSpeechSource = context.createBufferSource();
  currentSpeechSource.buffer = buffer;
  currentSpeechSource.connect(context.destination);
  currentSpeechSource.start();
}

async function playRecordedSpeech(text) {
  const slug = audioSlug(text);
  const audio = new Audio(`assets/recorded-audio/${slug}.wav?v=1`);
  if (currentUtterance && "speechSynthesis" in window) window.speechSynthesis.cancel();
  await audio.play();
}

function speakWithBrowserVoice(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = "en-US";
  currentUtterance.rate = 0.78;
  currentUtterance.pitch = 1.08;
  const voices = window.speechSynthesis.getVoices();
  currentUtterance.voice = voices.find((voice) => voice.lang?.startsWith("en-US")) || voices.find((voice) => voice.lang?.startsWith("en")) || null;
  window.speechSynthesis.speak(currentUtterance);
}

function submitAnswer() {
  if (!state.session) return;
  const item = state.session.words[state.session.index];
  const expected = item.word.toLowerCase();
  const typed = state.input.trim().toLowerCase();
  if (!typed) {
    state.feedback = { type: "hint", message: "Type your answer first." };
    render();
    return;
  }

  if (state.session.practiceWord === item.word) {
    if (typed === expected) {
      playCorrectCue();
      state.feedback = { type: "good", message: "Locked in. This word will return for review." };
      setTimeout(nextWord, 450);
    } else {
      playWrongCue();
      state.feedback = { type: "bad", message: `Copy the word exactly: ${item.word}` };
    }
    render();
    return;
  }

  if (typed === expected) {
    playCorrectCue();
    const earned = Math.max(2, (state.session.hintUsed ? 6 : 10) - state.session.attempts * 2);
    state.session.points += earned;
    state.session.correct += 1;
    if (state.session.hintUsed) markWordShaky(item.word);
    updateWordStat(item.word, true, earned);
    removeReviewWord(item.word);
    if (!state.session.hintUsed) removeShakyWord(item.word);
    state.feedback = { type: "good", message: `Correct. +${earned} points.` };
    setTimeout(nextWord, 450);
  } else {
    playWrongCue();
    state.session.attempts += 1;
    if (state.session.attempts >= 3) {
      markWordForReview(item.word);
      updateWordStat(item.word, false, 0);
      state.session.practiceWord = item.word;
      state.input = "";
      state.feedback = { type: "bad", message: `Study round. Copy "${item.word}" once. It will return next session.` };
    } else {
      const triesLeft = 3 - state.session.attempts;
      state.feedback = { type: "bad", message: triesLeft === 1 ? "Not quite. One more try, or use Letter Mix." : "Not quite. Two tries left, or use Letter Mix." };
    }
  }
  render();
}

function nextWord() {
  const session = state.session;
  if (!session) return;
  session.completed += 1;
  if (session.points >= SESSION_POINT_GOAL) {
    finishSession();
    render();
    return;
  }
  session.index += 1;
  session.hintUsed = false;
  session.mix = null;
  session.attempts = 0;
  session.practiceWord = null;
  state.input = "";
  state.feedback = null;
  if (session.index >= session.words.length) extendSessionWords();
  render();
}

function finishSession() {
  const profile = currentProfile();
  const previousRewards = Math.floor((profile.points || 0) / ALLOWANCE_POINT_GOAL);
  profile.points += state.session.points;
  profile.lifetimePoints = (profile.lifetimePoints || 0) + state.session.points;
  const currentRewards = Math.floor((profile.points || 0) / ALLOWANCE_POINT_GOAL);
  state.session.rewardUnlocked = currentRewards > previousRewards;
  profile.sessionsDone += 1;
  profile.lastSession = {
    date: new Date().toISOString(),
    points: state.session.points,
    correct: state.session.correct,
    completed: state.session.completed,
    missed: state.session.missed
  };
  profile.reviewQueue = mergeReviewQueue(profile.reviewQueue || [], state.session.missed);
  profile.shakyQueue = mergeReviewQueue(profile.shakyQueue || [], state.session.shaky).filter(
    (word) => !state.session.missed.some((missedWord) => missedWord.toLowerCase() === word.toLowerCase())
  );
  profile.streak = state.session.missed.length ? 0 : profile.streak + 1;
  profile.bestStreak = Math.max(profile.bestStreak, profile.streak);
  profile.wordsMastered = Object.entries(profile.wordStats)
    .filter(([, stat]) => stat.correct >= 2 && stat.missed === 0)
    .map(([word]) => word);
  saveStore();
  state.screen = "summary";
}

function updateWordStat(word, correct, points) {
  const profile = currentProfile();
  const key = word.toLowerCase();
  const existing = profile.wordStats[key] || { correct: 0, missed: 0, points: 0 };
  existing.correct += correct ? 1 : 0;
  existing.missed += correct ? 0 : 1;
  existing.points += points;
  if (correct) existing.missed = Math.max(0, existing.missed - 1);
  profile.wordStats[key] = existing;
}

function markWordForReview(word) {
  if (!state.session.missed.includes(word)) state.session.missed.push(word);
}

function markWordShaky(word) {
  if (!state.session.shaky.includes(word)) state.session.shaky.push(word);
}

function mergeReviewQueue(existingQueue, missedWords) {
  const lowerMissedWords = new Set(missedWords.map((word) => word.toLowerCase()));
  const cleanedExisting = existingQueue.filter((word) => !lowerMissedWords.has(word.toLowerCase()));
  return [...missedWords, ...cleanedExisting].slice(0, SESSION_WORD_BUFFER);
}

function removeReviewWord(word) {
  const profile = currentProfile();
  profile.reviewQueue = (profile.reviewQueue || []).filter((queuedWord) => queuedWord.toLowerCase() !== word.toLowerCase());
}

function removeShakyWord(word) {
  const profile = currentProfile();
  profile.shakyQueue = (profile.shakyQueue || []).filter((queuedWord) => queuedWord.toLowerCase() !== word.toLowerCase());
}

function extendSessionWords() {
  const profile = currentProfile();
  const existingWords = state.session.words;
  const bufferSize = profile.kind === "early" ? EARLY_SESSION_BUFFER : SESSION_WORD_BUFFER;
  const addedWords = getFreshWords(profile, profile.sessionsDone + Math.ceil(existingWords.length / bufferSize), bufferSize, existingWords);
  state.session.words = [...existingWords, ...(profile.kind === "early" ? addedWords : shuffleItems(addedWords))];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleItems(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function shuffleWord(word) {
  const original = word.replace(/'/g, "").toUpperCase();
  const letters = original.split("");
  if (letters.length < 2) return letters;

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const shuffled = [...letters];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    if (shuffled.join("") !== original) return shuffled;
  }

  const rotated = [...letters.slice(1), letters[0]];
  return rotated.join("") === original ? [...letters].reverse() : rotated;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

state.profileId = profilesSeed[0].id;
render();
