const DEFAULT_TIPS = [
    { title: "Cut cards from the back", source: "Martin Gonzalvez", content: "Cut duplex card sheets from the back, if fronts and backs are misaligned it won't be obvious from the card backs and the cards will still be playable." },
    { title: "Laminate twice", source: "Martin Gonzalvez", content: "If your laminated PnP cards are splitting open at the edges, consider passing them through the laminator a second time." },
    { title: "Use a higher heat setting", source: "Martin Gonzalvez", content: "If your cards are delaminating at the 3mil heat setting, try passing them through at the 5mil heat setting on your laminator." },
    { title: "Rotary cutter + metal blade", source: "Manu Villarroya", content: "Rotary cutter + metal blade. Highly precise cuts once you get it. A bit muscle-taxing, however, if you use thick laminated paper!" },
    { title: "Ink tank printers", source: "Manu Villarroya", content: "Ink tank printers can work wonders: my Canon Pixma has printed A LOT, with high quality, and still has half ink left over!" },
    { title: "Learn a design tool", source: "Manu Villarroya", content: "Inkscape (and other free design tools) is your friend. Learn a program, and the quality of your designs will increase substantially." },
    { title: "Sleeve laminated cards", source: "Manu Villarroya", content: "Laminating and corner-rounding a card, and then sleeving it, will get you a premium feeling. The thickness of a pnp'd laminated card in ~140 mg paper is just right." },
    { title: "Get an ink tank printer", source: "Daniel Männikkö", content: "Get an ink tank printer. It's more expensive up front but cheaper in the long run." },
    { title: "Use coin capsules for circle tokens", source: "Martin Gonzalvez", content: "Punch out 1-inch circle tokens and place them inside 25mm plastic coin capsules for easy yet deluxe circle tokens." },
    { title: "Peeling off sticker backs", source: "Sarah Haag", content: "Sometimes using another scrap piece of sticker on the back of the first will peel the backing off." },
    { title: "Just do it", source: "Lara Matiisen", content: "Don't overthink. I spent so long early on wanting to have the smoothest process, finding the \"perfect\" way to craft, that I often just never started." },
    { title: "Experiment", source: "Lara Matiisen", content: "Don't be afraid to try different techniques and experiment to find what works for you." },
    { title: "Play test first", source: "Colette Haley", content: "Play test a game first to see if you like it before fully investing time and money into crafting a \"forever copy\"." },
    { title: "Start small", source: "Rob Beachler", content: "Start small with your first project so you can get a handle on how to do things. Work up to larger projects if you have any in mind." },
    { title: "Choose your cutter", source: "Edward Bell", content: "Find what cutting method works for you (mine is a guillotine cutter) and use it." },
    { title: "Paper and card sleeves", source: "Edward Bell", content: "200+gsm paper and card sleeves are a great way to start." },
    { title: "Eco-tank printer", source: "Darin Herrick", content: "Buy an eco-tank inkjet printer, and print frequently so the nozzles don't clog." },
    { title: "Test print", source: "Darin Herrick", content: "Test Print One Page before printing out 300." },
    { title: "Don't rush", source: "Darin Herrick", content: "TAKE YOUR TIME, don't rush." },
    { title: "Digital rules", source: "Darin Herrick", content: "If you like digital copies of rules, get a comics app for your tablet and copy the rules PDF to the tablet instead of printing it out." },
    { title: "Card backing", source: "Darin Herrick", content: "Use construction paper or print card backs to make cards less flimsy." },
    { title: "Thicker tokens", source: "Darin Herrick", content: "Use coin protectors or glue onto pennies to make circular tokens." },
    { title: "Explore your creativity", source: "Darin Herrick", content: "You can create whatever you want. Create your own game, modify a game you already own, create something like a game that already exists from scratch. The only limit is your imagination." },
    { title: "Practice first", source: "Darin Herrick", content: "You don't have to do a full board game on your first try. Create some extra pieces or cards for a game you already know with some fan expansions or official PNP extra components so you can practice." },
    { title: "Half full printer tray", source: "Yuri Verweij", content: "Make sure your paper drawer is at least half full, this really makes a difference when printing (manual) duplex" },
    { title: "Edit PDFs", source: "Yuri Verweij", content: "Affinity (software, free version) is capable of editing PDF files. For example, to remove cut lines or extract images." },
    { title: "Dry erase pocket sleeves", source: "Yuri Verweij", content: "You don't need to laminate all your Roll and Writes. There exist Dry Erase Pocket Sleeves that can hold your paper and make it reusable." },
    { title: "Reuse old boxes", source: "Yuri Verweij", content: "reuse old boxes for storing pnp games. You can print on full page label paper to cover the full box and make it look amazing. Add a layer of cold laminate over it to make it even better." },
    { title: "Don't cut to the edge", source: "Barny Skinner", content: "Don't cut to the edge of the sheet, to keep the crop marks in place." },
    { title: "Use permanent markers", source: "Doc Viglietti", content: "Using permanent markers on matte laminated roll and write sheets requires tedious alcohol wiping to clean between games. Try wet-erase markers on matte laminate and rinse the sheets easily under running water!" },
    { title: "Start small and simple", source: "Katie Duggan", content: "Start with a small game. It can be an 18 card game like Rove, Mini Rogue, or Galdor's Grip. Just use printer paper and a deck of playing cards. Packing tape the front and backs. That way you don't have to fuss about the fronts and backs aligning properly." }
];

const DEFAULT_TOOLS = [
    { name: "PnP Launchpad", description: "A website to keep track of current and upcoming PnP crowdfunding projects and promotions.", url: "https://launchpad.gonzhome.us" },
    { name: "PnPFinder", description: "A community-curated website to search for and discover worthwhile PnP games.", url: "http://pnpfinder.com" },
    { name: "Martin's Card Prototyper", description: "Design quick card prototypes and export individual card images or print-ready sheets in this intuitive, easy-to-use web app.", url: "https://prototyper.gonzhome.us" },
    { name: "Component Studio", description: "An online, subscription-based formatting tool to easily format 100's of cards and output PnP PDF files, or upload to The Gamecrafter.", url: "https://component.studio/" },
    { name: "PnP Buddy", description: "A free online tool to format your print and play files and adjust front-back page alignment.", url: "http://www.pnpbuddy.com/" },
    { name: "CardFoldr", description: "A tool to help you convert a PDF of card grids into a gutterfold PDF.", url: "https://foosel.github.io/cardfoldr/" },
    { name: "PnP Tool", description: "A Windows-based tool to perform various formatting tasks for PnP files.", url: "https://boardgamegeek.com/thread/2490834/tool-for-help-with-your-game-prototype-tabletop-pn" },
    { name: "nanDECK", description: "A free tool for designing games, enabling users to create custom cards and components via scripting and spreadsheet integration.", url: "https://www.nandeck.com" },
    { name: "Dextrous", description: "Faster prototyping for tabletop game designers. Make cards, tiles, tokens, at speed with game design software for Chrome.", url: "https://www.dextrous.com.au/" },
    { name: "PnP PDF Creator", description: "PnP PDF Creator is a powerful and easy-to-use tool that converts card images into clean, print-ready Print & Play PDF sheets. It is designed for game designers, prototypers, and players who want fast and reliable PDF generation for home or professional printing.", url: "https://raoulschaupp.itch.io/pnp-pdf-creator" },
];

const DEFAULT_CROWDFUNDING = [
    {
        title: "Pocket Puffins: Lost in Space",
        description: "Edward Bell - Kickstarter campaign went live on April 14, 2026 and ends May 14, 2026 at 7:01 AM PDT.",
        url: "https://www.kickstarter.com/projects/pocket-puffins/pocket-puffins-lost-in-space-18-card-solo-space-puzzle"
    },
    {
        title: "Sole Survivor",
        description: "Paper Tigers - Sole Survivor is an alien-infested spaceship solo survival challenge. It is a lightweight print-and-play game where you run, hide, and scramble to assemble a transporter before the creatures find you.",
        url: "https://www.kickstarter.com/projects/papertigers/sole-survivor-0"
    },
    {
        title: "Nothing But Net: A Playground Basketball Card Game",
        description: "Hafiz Printer - A fast-paced, two-player basketball card and dice game that brings the intensity of streetball straight to your tabletop. Draft your offense and defense cards, execute slick plays, and react in real time to your opponent's moves. Score big, trigger special abilities, and race to 21 points in high-energy, head-to-head action.",
        url: "https://www.kickstarter.com/projects/hp1/nothing-but-net-2-player-head-to-head-basketball-card-game"
    },
    {
        title: "Hidden Realms: The Mummy's Tomb",
        description: "Spiros Kallos - Hidden Realms: The Mummy's Tomb is a single-page, print-and-play, roll-and-write dungeon crawl inspired by classic D&D maps. Draw polyomino shapes to map a new dungeon every game. Uncover treasure, face deadly guardians, and confront the Mummy!",
        url: "https://gamefound.com/en/projects/tabletop-for-world/hidden-realms-the-mummys-tomb"
    }
];

const DEFAULT_SITES = [
    {
        name: "PnPFinder",
        description: "Search and discover worthwhile print-and-play games from around the hobby.",
        url: "http://pnpfinder.com"
    },
    {
        name: "PnP Launchpad",
        description: "Track current and upcoming print-and-play crowdfunding projects and promotions.",
        url: "https://launchpad.gonzhome.us"
    },
    {
        name: "PnPTools",
        description: "A directory of useful tools for printing, formatting, crafting, and prototyping PnP games.",
        url: "https://pnptools.gonzhome.us"
    },
    {
        name: "Card Prototyper",
        description: "Design quick card prototypes and export individual cards or print-ready sheets.",
        url: "https://prototyper.gonzhome.us"
    },
    {
        name: "Card Extractor",
        description: "Extract individual card images from PnP PDFs by drawing grids along card boundaries.",
        url: "https://extractor.gonzhome.us"
    },
    {
        name: "Card Formatter",
        description: "Lay out card images into properly formatted print-and-play PDF files.",
        url: "https://formatter.gonzhome.us"
    }
];

const DEFAULT_BUILDS = [
    {
        source: "hideaway",
        name: "Shamus Smith",
        title: "Sole Survivor",
        url: "https://www.kickstarter.com/projects/papertigers/sole-survivor-0",
        blurb: "New PnP finished today. This is a preview of "Sole Survivor". Very excited to see how this plays as I was part of the play testing back in December. All components laminated. Lego pieces for xenomorphs, player and transporter modules. Two d6 for health and action points. For the play testing version, I mounted the boards on cardboard. Now the boards are laminated, they may too slippery. Hopefully the weight of the Lego will help as I used plastic cubes previously."
    },
    {
        source: "hideaway",
        name: "Chris Hepburn",
        title: "Regicide - Slay the Spire theme",
        url: "",
        blurb: "Noticed this on BGG and had to take a look. Lovely game with a lovely retheme that someone has done. Lost on the last boss"
    },
    {
        source: "hideaway",
        name: "Angela Neff",
        title: "A Wayfarer's Tale",
        url: "",
        blurb: "Attempting A Wayfarer's Tale this afternoon."
    },
    {
        source: "reddit",
        name: "Crase_W",
        title: "Galdor's Grip",
        url: "https://boardgamegeek.com/boardgame/373828/galdors-grip",
        blurb: "I made Galdor's Grip. I love the card art on this game."
    },
    {
        source: "reddit",
        name: "GhostCubeGroucho",
        title: "Utopia Engine",
        url: "https://boardgamegeek.com/boardgame/75223/utopia-engine",
        blurb: "My 8yo playing Utopia Engine, my 5 and 11yo and me playing sunshine city. The roll and writes have been big hits!"
    },
    {
        source: "reddit",
        name: "Wombat_Roll",
        title: "Line of Contact",
        url: "https://boardgamegeek.com/thread/3694934/wip-line-of-contact-a-wwii-print-and-play-card-gam",
        blurb: "LINE OF CONTACT is a project that I've been testing in playingcards.io for a few weeks, but sometimes you just gotta print out the game and put it on the table to see if it truly works!"
    },
    {
        source: "bgg",
        name: "@Flash001",
        title: "Lone Sherman: The Pacific – A Solitaire Wargame",
        url: "https://boardgamegeek.com/boardgame/415855/lone-sherman-the-pacific-a-solitaire-wargame",
        blurb: "My first Mike Lambo wargame..."
    },
    {
        source: "bgg",
        name: "@lemdavefn",
        title: "Descent: Legends of the Dark",
        url: "https://boardgamegeek.com/boardgame/322708/descent-legends-of-the-dark",
        blurb: "Printed enemy images..."
    },
    {
        source: "bgg",
        name: "@Phenuxela",
        title: "Puzzle Dungeon",
        url: "https://boardgamegeek.com/boardgame/262498/puzzle-dungeon",
        blurb: "Saw some playthroughs..."
    }
];

const DEFAULT_GAMES = [
    {
        name: "Village Builder",
        designer: "Doc Viglietti",
        source: "PnP Community Pick",
        description: "A cozy solitaire village building game.",
        url: "https://boardgamegeek.com/thread/2470162/wip-village-builder-2020-solitairegame-design-cont"
    },
    {
        name: "Gem Getter Pro",
        designer: "Daniel W. Young",
        source: "PnP Community Pick",
        description: "Rival gem enthusiasts compete to unearth the most valuable collection of gems.",
        url: "https://www.clearlysharp.com/games"
    },
    {
        name: "The Cubes of Europe",
        designer: "Ben Huntley",
        source: "PnP Community Pick",
        description: "Use dice to acquire and place unique cubes, manipulate the game state, and score victory points.",
        url: "https://boardgamegeek.com/filepage/278285/the-cubes-of-europe-game-files"
    },
    {
        name: "Royal Espionage",
        designer: "Rachel Bruner",
        source: "PnP Community Pick",
        description: "A storytelling game of intrigue, intelligence, and imminent death.",
        url: "https://boardgamegeek.com/boardgame/257681/royal-espionage/files"
    },
    {
        name: "Maquis",
        designer: "Jake Staines",
        source: "PnP Community Pick",
        description: "Engage the Nazis of France in 'la petite guerre' and free your homeland!",
        url: "https://boardgamegeek.com/filepage/179348/maquis-2019-pnp-files-v10"
    },
    {
        name: "A Simple Life",
        designer: "Clint Goshn",
        source: "PnP Community Pick",
        description: "Roll & Write to upgrade your farm and complete randomized run objectives",
        url: "https://boardgamegeek.com/filepage/251102/game-sheets-and-1-page-rule-a-simple-life-contest"
    },
    {
        name: "Galdor's Grip",
        designer: "Gregg Jewell",
        source: "PnP Community Pick",
        description: "Stop an evil telepath with just your hands in this fantasy card game for one player.",
        url: "https://greggjewell.itch.io/galdors-grip"
    },
    {
        name: "Orchard",
        designer: "Mark Tuck",
        source: "PnP Community Pick",
        description: "Create the most fruitful micro orchard, but beware of rotten fruit!",
        url: "https://boardgamegeek.com/filepage/159521/orchard-cards-v1"
    },
    {
        name: "Alea's Garden",
        designer: "Brave James",
        source: "PnP Community Pick",
        description: "A cosy polyomino deckbuilding game, and winner of 2025 BoardGameGeek Solitaire competition!",
        url: "https://linktr.ee/aleasgarden"
    },
    {
        name: "Deckula!",
        designer: "Dr. Mindflip",
        source: "PnP Community Pick",
        description: "Decadent and dramatic vampires try to decorate their castles in peace.",
        url: "https://drmindflip.itch.io/deckula"
    },
    {
        name: "Bargain Basement Bathysphere",
        designer: "Scott Slomiany",
        source: "PnP Community Pick",
        description: "Explore the depths of Beachside Bay through multiple linked roll-and-write games. ",
        url: "https://boardgamegeek.com/filepage/181118/bargain-basement-bathysphere-chapters-1-3"
    }
];

const DEFAULT_CONTESTS = [
    {
        title: "2026 9-Card Nanogame PnP Design Contest",
        ends: "5/31/2026",
        description: "Create a new solo, co-op, or competitive game that fits on one sheet of 9 poker-size cards (2.5\" x 3.5\") plus rules pages, using up to 24 generic components total or none at all. Contest ends May 31, 2026.",
        url: "https://boardgamegeek.com/thread/3648226/2026-9-card-nanogame-print-and-play-design-contest"
    },
    {
        title: "2026 Two-Player PnP Game Design Contest",
        ends: "5/31/2026",
        description: "Let's play some inexpensive and innovative two-player games!  With this contest, we hope to encourage designers to create interesting new gaming experiences specifically for a pair of gamers. Contest ends May 31, 2026.",
        url: "https://boardgamegeek.com/thread/3620917/2026-two-player-print-and-play-game-design-contest"
    },
    {
        title: "2026 Deck Hand Games Design Contest",
        ends: "6/26/2026",
        description: "The Challenge: To make an 18-card game that works in conjunction with any standard deck of playing cards. Deadline: June 26, 2026",
        url: "https://boardgamegeek.com/thread/3669375/2026-deck-hand-games-design-contest-open-until-jun"
    },
    {
        title: "2026 Solomode Contest",
        ends: "5/31/2026",
        description: "Design a solo mode for a game that does not have one, or has one that you find lacking. Contest ends June 30, 2026.",
        url: "https://boardgamegeek.com/thread/3670686/2026-solomode-contest"
    },
    {
        title: "2026 Children & Family Game Design Contest",
        ends: "5/15/2026",
        description: "This contest is meant to design games that we can play with the children, or games that children can play together. The focus should be on games that children (9 and under) can play with their families. Voting closes May 15, 2026",
        url: "https://boardgamegeek.com/thread/3645079/2026-children-and-family-game-design-contest"
    },
    {
        title: "2026 Print and Play Wargame Design Contest",
        ends: "12/21/2026",
        description: "Games entered in this contest should be purpose-designed wargames. Games may be solitaire, two player, multi-player or even co-operative. However it is critical that the game is a wargame. The primary focus should therefore be on conflict and warfare. ",
        url: "https://boardgamegeek.com/thread/3627732/contest-open-2026-print-and-play-wargame-design-co"
    }
];

const DEFAULT_WIPS = [
    {
        title: "DOKUSU",
        designer: "@UberDante",
        description: "DOKUSU is a SUDOKU-inspired puzzle in 9 cards. Arrange the nine cards into a 9x9 grid so that no number repeats in any one column or row, or within any of the nine 3x3 sub-grids.",
        url: "https://boardgamegeek.com/thread/3665416/wip-dokusu-1p-puzzle-5-10-2026-9-card-contest-comp"
    },
    {
        title: "Crafting Crawler",
        designer: "Agustin Gallo",
        description: "A dungeon-building and exploration game where you generate the map as you forge your path, defeating the threats that lie within.Choose your hero (or a party of adventurers) to reach the deepest corners of this ever-shifting dungeon. Defeat the Ancient Dragon and claim the riches hidden behind its walls.",
        url: "https://boardgamegeek.com/thread/3666361/wip-crafting-crawler-2026-9-card-pnp-design-contes"
    },
    {
        title: "The Test of Time",
        designer: "Barny Skninner",
        description: "Test of Time is a solo 9 card civilization game. From the dawn of time to the modern day, you will guide a small tribe of hunter-gatherers into a mighty empire, by managing and growing the population, using and developing new technologies, managing resources, developing theories of government, constructing a mighty wonder of the world, doing battle with a rival nation, surviving four historical ages, and developing enough culture to become a nation that stands the Test of Time.",
        url: "https://boardgamegeek.com/thread/3675681/wip-test-of-time-2026-9-card-pnp-design-contest-co"
    },
    {
        title: "1st Hero",
        designer: "Pengyu Chen",
        description: "In this world, you do not merely fight; you lead. As a legendary Guild Master, your path is carved through untamed wilds and the remains of fallen kings. But steel alone will not win this war. Here, the clash of blades is replaced by the cunning of the mind.",
        url: "https://boardgamegeek.com/thread/3665438/wip-1st-hero-2026-9-card-pnp-design-contest-contes"
    },
    {
        title: "Doodle Bash",
        designer: "Daniel Young",
        description: "In Doodle Bash you'll level up your doodling skills by combining simple shapes into an astonishing variety of clever drawings. Arrange your doodles in a pleasing way to score big and just maybe you'll be an artist some day! Doodle Bash is a 1-page, app-assisted PnP game. It was my entry in the 2025 Roll and Write contest where it placed 2nd overall.",
        url: "https://boardgamegeek.com/thread/3677111/doodle-bash-now-an-app-assisted-1-page-pnp-deck-bu"
    },
    {
        title: "Flipping Little Dinos",
        designer: "Martin Segobia",
        description: "Flipping Little Dinos is a fast paced little puzzle. Players compete by placing Dinosaurs on a shared ecosystem with four different dinosaur species and four different ways to score. Score the most points with the dinosaurs you draw or flip them!",
        url: "https://boardgamegeek.com/thread/3677905/wip-flipping-little-dinos-2026-9-card-pnp-design-c"
    },
    {
        title: "THE WORST PART OF BEING CAUGHT IN A TIME LOOP",
        designer: "Andy Wagers",
        description: "You are agents of the Temporal Research Division, racing across a 3×3 grid to collect four anomaly Relics before the timeline collapses. Every failed loop leaves the board scarred and your time shorter, but the Relics make your team stronger with each attempt. A coop puzzle of movement prediction, edge-color matching, and cascading grid shifts — playable solo or with up to four agents.",
        url: "https://boardgamegeek.com/thread/3672662/wip-the-worst-part-of-being-caught-in-a-time-loop"
    }
];

const POLL_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeHGc4YCSyQal-4M-lF8wzR7j_xPUKmPv-vIDyaYIQK-PYSzw/viewform?usp=publish-editor";
const POLL_STORAGE_KEY = "pnp_poll_voted";

const DEFAULT_POLL_RESULTS = [
    {
        option: "With bleed",
        votes: 0
    },
    {
        option: "Without bleed",
        votes: 1
    }
];

const DEFAULT_ARTICLES = [
    {
        title: "The Art of Miniature PnP Conversion",
        author: "Alex Chen",
        date: "March 7, 2026",
        summary: "Exploring how print and play gamers are pushing the boundaries of miniatures through innovative materials and techniques.",
        slug: "mini-conversion"
    }
];

window.addEventListener("DOMContentLoaded", async () => {
    const isSitesPage = document.getElementById("sites-content") !== null;

    if (isSitesPage) {
        const sites = await loadSites();
        renderSites(sites);
        return;
    }

    renderEditorial(getRandomItem(DEFAULT_ARTICLES));

    const data = await loadData();

    const tips = data.tips || DEFAULT_TIPS;
    const tools = data.tools || DEFAULT_TOOLS;
    const crowdfunding = data.crowdfunding || DEFAULT_CROWDFUNDING;
    const builds = data.builds || DEFAULT_BUILDS;
    const games = data.games || DEFAULT_GAMES;
    const contests = data.contests || DEFAULT_CONTESTS;
    const wips = data.wips || DEFAULT_WIPS;
    const pollResults = data.poll || DEFAULT_POLL_RESULTS;
    const posts = await loadPostsManifest();

    renderTip(getRandomItem(tips));
    renderTool(getRandomItem(tools));
    renderCrowdfunding(getRandomItem(crowdfunding));
    renderBuilds(builds);
    renderGame(getRandomItem(games));
    renderContests(contests);
    renderWips(getRandomItem(wips));
    renderPoll(pollResults);
    if (posts.length) {
        renderEditorial(posts[0]);
    }
});

async function loadData() {
    try {
        const response = await fetch("assets/data.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to fetch assets/data.json: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log("Using default data:", error);
        return {};
    }
}

async function loadSites() {
    try {
        const data = await loadData();
        const parsed = data.sites || [];
        return parsed.length ? parsed : DEFAULT_SITES;
    } catch (error) {
        console.log("Using default sites directory:", error);
        return DEFAULT_SITES;
    }
}

async function loadTips() {
    try {
        const data = await loadData();
        const parsed = data.tips || [];
        return parsed.length ? parsed : DEFAULT_TIPS;
    } catch (error) {
        console.log("Using default tips:", error);
        return DEFAULT_TIPS;
    }
}

async function loadTools() {
    try {
        const data = await loadData();
        const parsed = data.tools || [];
        return parsed.length ? parsed : DEFAULT_TOOLS;
    } catch (error) {
        console.log("Using default tools:", error);
        return DEFAULT_TOOLS;
    }
}

async function loadGames() {
    try {
        const data = await loadData();
        const parsed = data.games || [];
        return parsed.length ? parsed : DEFAULT_GAMES;
    } catch (error) {
        console.log("Using default games:", error);
        return DEFAULT_GAMES;
    }
}

async function loadCrowdfunding() {
    try {
        const data = await loadData();
        const parsed = data.crowdfunding || [];
        return parsed.length ? parsed : DEFAULT_CROWDFUNDING;
    } catch (error) {
        console.log("Using default crowdfunding roundup:", error);
        return DEFAULT_CROWDFUNDING;
    }
}

async function loadBuilds() {
    try {
        const data = await loadData();
        const parsed = data.builds || [];
        return parsed.length ? parsed : DEFAULT_BUILDS;
    } catch (error) {
        console.log("Using default builds feed:", error);
        return DEFAULT_BUILDS;
    }
}

async function loadContests() {
    try {
        const data = await loadData();
        const parsed = data.contests || [];
        return parsed.length ? parsed : DEFAULT_CONTESTS;
    } catch (error) {
        console.log("Using default contests:", error);
        return DEFAULT_CONTESTS;
    }
}

async function loadWips() {
    try {
        const data = await loadData();
        const parsed = data.wips || [];
        return parsed.length ? parsed : DEFAULT_WIPS;
    } catch (error) {
        console.log("Using default WIPs:", error);
        return DEFAULT_WIPS;
    }
}

async function loadPollResults() {
    try {
        const data = await loadData();
        const parsed = data.poll || [];
        return parsed.length ? parsed : DEFAULT_POLL_RESULTS;
    } catch (error) {
        console.log("Using default poll results:", error);
        return DEFAULT_POLL_RESULTS;
    }
}

async function loadPostsManifest() {
    try {
        const response = await fetch("posts/manifest.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to fetch posts/manifest.json: ${response.status}`);
        }

        const posts = await response.json();
        if (!Array.isArray(posts)) {
            return [];
        }

        return posts.filter((post) => (
            post
            && typeof post.slug === "string"
            && typeof post.title === "string"
            && typeof post.author === "string"
            && typeof post.summary === "string"
            && typeof post.date === "string"
        ));
    } catch (error) {
        console.log("Using default editorial article:", error);
        return [];
    }
}

function renderTip(tip) {
    const tipElement = document.getElementById("tip-content");
    if (!tipElement || !tip) {
        return;
    }

    tipElement.innerHTML = `
        <p><strong>${escapeHtml(tip.title)}</strong></p>
        <p>${escapeHtml(tip.content)}</p>
        ${tip.source ? `<p><strong>Source:</strong> ${escapeHtml(tip.source)}</p>` : ""}
    `;
}

function renderTool(tool) {
    const toolsElement = document.getElementById("tools-content");
    if (!toolsElement || !tool) {
        return;
    }

    const safeName = escapeHtml(tool.name);
    const safeDescription = escapeHtml(tool.description);
    const safeUrl = tool.url ? escapeHtml(tool.url) : "";

    toolsElement.innerHTML = `
        <p>${safeUrl
            ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeName}</strong></a>`
            : `<strong>${safeName}</strong>`}</p>
        <p>${safeDescription}</p>
    `;
}

function renderGame(game) {
    const gameElement = document.getElementById("game-content");
    if (!gameElement || !game) {
        return;
    }

    const safeName = escapeHtml(game.name);
    const safeDesigner = game.designer ? escapeHtml(game.designer) : "Unknown designer";
    const safeDescription = game.description
        ? escapeHtml(game.description)
        : "Current community favorite worth checking out.";
    const safeUrl = game.url ? escapeHtml(game.url) : "";
    const titleMarkup = safeUrl
        ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeName}</strong></a>`
        : `<strong>${safeName}</strong>`;

    gameElement.innerHTML = `
        <p>${titleMarkup}, designed by <strong>${safeDesigner}</strong>.</p>
        <p>Powered by <a href="https://pnpfinder.com" target="_blank" rel="noopener noreferrer">PnPFinder.com</a></p>
        <p>${safeDescription}</p>
    `;
}

function renderSites(sites) {
    const sitesElement = document.getElementById("sites-content");
    if (!sitesElement) {
        return;
    }

    if (!sites.length) {
        sitesElement.innerHTML = `<p class="empty-content">No site entries available.</p>`;
        return;
    }

    sitesElement.innerHTML = sites.map((site) => {
        const safeName = escapeHtml(site.name);
        const safeDescription = site.description
            ? escapeHtml(site.description)
            : "Useful print-and-play site or tool.";
        const safeUrl = site.url ? escapeHtml(site.url) : "";

        return `
            <article class="card site-card">
                <h2>${safeUrl
                    ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeName}</strong></a>`
                    : `<strong>${safeName}</strong>`}</h2>
                <p>${safeDescription}</p>
            </article>
        `;
    }).join("");
}

function renderBuilds(builds) {
    const columns = {
        hideaway: document.getElementById("builds-hideaway"),
        reddit: document.getElementById("builds-reddit"),
        bgg: document.getElementById("builds-bgg")
    };

    if (!columns.hideaway || !columns.reddit || !columns.bgg) {
        return;
    }

    ["hideaway", "reddit", "bgg"].forEach((sourceKey) => {
        const sourceBuilds = getBuildsForSource(builds, sourceKey);
        columns[sourceKey].innerHTML = sourceBuilds.map((build, index) => renderBuildCard(build, index)).join("");
    });
}

function renderCrowdfunding(entry) {
    const crowdfundingElement = document.getElementById("crowdfunding-content");
    if (!crowdfundingElement) {
        return;
    }

    if (!entry) {
        crowdfundingElement.innerHTML = `<p class="empty-content">No crowdfunding entries available.</p>`;
        return;
    }

    const safeTitle = escapeHtml(entry.title);
    const safeDescription = entry.description
        ? escapeHtml(entry.description)
        : "Current print-and-play crowdfunding campaign worth checking out.";
    const safeUrl = entry.url ? escapeHtml(entry.url) : "";

    crowdfundingElement.innerHTML = `
        <p>
            ${safeUrl
                ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
                : `<strong>${safeTitle}</strong>`}
        </p>
        <p>${safeDescription}</p>
    `;
}

function renderContests(contests) {
    const contestsElement = document.getElementById("contests-content");
    if (!contestsElement) {
        return;
    }

    if (!contests.length) {
        contestsElement.innerHTML = `<p class="empty-content">No contest entries available.</p>`;
        return;
    }

    contestsElement.innerHTML = contests.map((contest) => {
        const safeTitle = escapeHtml(contest.title);
        const safeUrl = contest.url ? escapeHtml(contest.url) : "";
        const formattedEnds = formatContestEndDate(contest.ends);

        return `
            <p>
                ${safeUrl
                    ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
                    : `<strong>${safeTitle}</strong>`}
                ${formattedEnds ? `<span class="contest-end-date"> · ends ${escapeHtml(formattedEnds)}</span>` : ""}
            </p>
        `;
    }).join("");
}

function renderWips(wip) {
    const wipsElement = document.getElementById("wips-content");
    if (!wipsElement) {
        return;
    }

    if (!wip) {
        wipsElement.innerHTML = `<p class="empty-content">No WIP entries available.</p>`;
        return;
    }

    const safeTitle = escapeHtml(wip.title);
    const safeDesigner = wip.designer ? escapeHtml(wip.designer) : "Unknown designer";
    const safeDescription = wip.description
        ? escapeHtml(wip.description)
        : "Current community thread worth checking out.";
    const safeUrl = wip.url ? escapeHtml(wip.url) : "";
    const titleMarkup = safeUrl
        ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
        : `<strong>${safeTitle}</strong>`;

    wipsElement.innerHTML = `
        <p>${titleMarkup}, designed by <strong>${safeDesigner}</strong>.</p>
        <p>${safeDescription}</p>
    `;
}

function getBuildsForSource(builds, sourceKey) {
    const primary = getRandomItems(
        builds.filter((build) => build.source === sourceKey),
        3
    );
    if (primary.length === 3) {
        return primary;
    }

    const fallbackPool = DEFAULT_BUILDS.filter((build) => build.source === sourceKey);
    const seenTitles = new Set(primary.map((build) => build.title));
    const fallbacks = fallbackPool
        .filter((build) => !seenTitles.has(build.title))
        .slice(0, 3 - primary.length);

    return [...primary, ...fallbacks];
}

function renderBuildCard(build, index) {
    const safeName = escapeHtml(build.name);
    const safeTitle = escapeHtml(build.title);
    const safeBlurb = escapeHtml(build.blurb || "Currently deep in the middle of the build.");
    const safeUrl = build.url ? escapeHtml(build.url) : "";
    const titleMarkup = safeUrl
        ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
        : `<strong>${safeTitle}</strong>`;

    const variants = [
        `${safeName} is crafting ${titleMarkup} and says "${safeBlurb}"`,
        `${safeName} is currently building ${titleMarkup}. Their take: "${safeBlurb}"`,
        `${safeName} has ${titleMarkup} on the table right now and says "${safeBlurb}"`,
        `Right now ${safeName} is working on ${titleMarkup}, saying "${safeBlurb}"`,
        `${safeName} is putting together ${titleMarkup} and says "${safeBlurb}"`
    ];

    return `
        <article class="build-card">
            <p>${variants[index % variants.length]}</p>
        </article>
    `;
}

function renderPoll(results) {
    const pollElement = document.getElementById("poll-content");
    if (!pollElement) {
        return;
    }

    const hasVoted = localStorage.getItem(POLL_STORAGE_KEY) === "true";
    const totalVotes = results.reduce((sum, item) => sum + (Number.isFinite(item.votes) ? item.votes : 0), 0);
    const optionButtons = DEFAULT_POLL_RESULTS.map((item) => `
        <button class="poll-option-btn" data-option="${escapeAttribute(item.option)}" ${hasVoted ? "disabled" : ""}>
            ${escapeHtml(item.option)}
        </button>
    `).join("");

    const resultsMarkup = results.map((item) => {
        const votes = Number.isFinite(item.votes) ? item.votes : 0;
        const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        return `
            <div class="poll-result-row">
                <div class="poll-result-head">
                    <span><strong>${escapeHtml(item.option)}</strong></span>
                    <span>${pct}%</span>
                </div>
                <div class="poll-bar">
                    <div class="poll-bar-fill" style="width: ${pct}%"></div>
                </div>
                <p class="poll-vote-count">${votes} vote${votes === 1 ? "" : "s"}</p>
            </div>
        `;
    }).join("");

    pollElement.innerHTML = `
        <p><strong>Do you prefer print and play card files with bleed or without bleed?</strong></p>
        <div class="poll-options">${optionButtons}</div>
        <div class="community-block">
            <p class="feed-label">Current Results</p>
            ${resultsMarkup}
            <p class="poll-total"><strong>Total votes:</strong> ${totalVotes}</p>
            <p><a href="${escapeAttribute(POLL_FORM_URL)}" target="_blank" rel="noopener noreferrer">${hasVoted ? "Vote again in Google Form" : "Open poll form"}</a></p>
        </div>
    `;

    pollElement.querySelectorAll(".poll-option-btn").forEach((button) => {
        button.addEventListener("click", () => {
            localStorage.setItem(POLL_STORAGE_KEY, "true");
            window.open(POLL_FORM_URL, "_blank", "noopener,noreferrer");
            renderPoll(results);
        });
    });
}

function renderEditorial(article) {
    const editorialElement = document.getElementById("editorial-content");
    if (!editorialElement || !article) {
        return;
    }

    editorialElement.innerHTML = `
        <div class="editorial-card">
            <h2>${escapeHtml(article.title)}</h2>
            <p class="author">By ${escapeHtml(article.author)} | ${escapeHtml(article.date)}</p>
            <p class="summary">${escapeHtml(article.summary)}</p>
            <a href="posts/${encodeURIComponent(article.slug)}.html" class="read-more-btn">Read Full Article</a>
        </div>
    `;
}

function getRandomItem(array) {
    if (!array || !array.length) {
        return null;
    }
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomItems(array, count) {
    if (!array || !array.length) {
        return [];
    }

    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function normalizeBuildSource(source) {
    const value = String(source || "").trim().toLowerCase();

    if (value.includes("hideaway") || value.includes("facebook") || value === "fb") {
        return "hideaway";
    }

    if (value.includes("reddit") || value.includes("printandplay")) {
        return "reddit";
    }

    if (value.includes("bgg") || value.includes("boardgamegeek")) {
        return "bgg";
    }

    return "";
}

function isContestActive(ends) {
    const value = String(ends || "").trim();
    if (!value) {
        return true;
    }

    const dateValue = Date.parse(value);
    if (Number.isNaN(dateValue)) {
        return true;
    }

    const contestDate = new Date(dateValue);
    contestDate.setHours(23, 59, 59, 999);
    return contestDate.getTime() >= Date.now();
}

function formatContestEndDate(ends) {
    const value = String(ends || "").trim();
    if (!value) {
        return "";
    }

    const dateValue = Date.parse(value);
    if (Number.isNaN(dateValue)) {
        return value;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(new Date(dateValue));
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = String(text || "");
    return div.innerHTML;
}

function escapeAttribute(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
