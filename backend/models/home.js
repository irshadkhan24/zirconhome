const mongoose = require("mongoose");

// HERO SLIDES
const HeroSlideSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  btnText: { type: String, default: "" },
  btnLink: { type: String, default: "" }
});

// STATS
const StatSchema = new mongoose.Schema({
  icon: { type: String, default: "" },
  number: { type: Number, default: 0 },
  title: { type: String, default: "" },
  description: { type: String, default: "" }
});

// PARTIES
const PartySchema = new mongoose.Schema({
  name: { type: String, default: "" },
  logo: { type: String, default: "" }
});

// PRESENCE (map markers)
const PresenceSchema = new mongoose.Schema({
  city: { type: String, default: "" },
  top: { type: String, default: "" },
  left: { type: String, default: "" }
});

// FOOTER LINKS
const FooterLinkSchema = new mongoose.Schema({
  column: { type: Number, default: 1 },
  icon: { type: String, default: "" },
  title: { type: String, default: "" },
  url: { type: String, default: "" }
});

// HOME SCHEMA
const HomeSchema = new mongoose.Schema({

  // NAVBAR
  navbar: {
    logo: { type: String, default: "" }
  },

  // HERO SLIDES
  heroSlides: [HeroSlideSchema],

  // ABOUT
  about: {
    title: { type: String, default: "" },
    subTitle: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" }
  },

  // STATS SECTION (top content)
  statsSection: {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" }
  },

  // STATS BOXES
  stats: [StatSchema],

  // PARTIES SECTION
  partiesSection: {
    title: { type: String, default: "" },
    subTitle: { type: String, default: "" }
  },

  // PARTY LOGOS
  parties: [PartySchema],

  // PRESENCE SECTION
  presenceSection: {
    title: { type: String, default: "" },
    subTitle: { type: String, default: "" },
    mapEmbedUrl: { type: String, default: "" },
    stateInfo: { type: String, default: "" }
  },

  // MAP MARKERS
  presence: [PresenceSchema],

  // FOOTER
  footer: {
    smallTitle: { type: String, default: "" },
    mainTitle: { type: String, default: "" },
    description: { type: String, default: "" },
    projectBtnText: { type: String, default: "" },
    projectBtnLink: { type: String, default: "" },
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    youtube: { type: String, default: "" },
    copyright: { type: String, default: "" },
    links: [FooterLinkSchema]
  }

}, { timestamps: true });

module.exports = mongoose.model("Home", HomeSchema);