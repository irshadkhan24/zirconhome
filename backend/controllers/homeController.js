const Home = require("../models/home");

// ======================
// GET HOME DATA
// ======================
exports.getHome = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) {
      home = await Home.create({
        navbar: { logo: "" },
        heroSlides: [],
        about: { title: "", subTitle: "", description: "", image: "" },
        statsSection: { title: "", subtitle: "", description: "" },
        stats: [],
        partiesSection: { title: "", subTitle: "" },
        parties: [],
        presenceSection: { title: "", subTitle: "", mapEmbedUrl: "", stateInfo: "" },
        presence: [],
        footer: {
          smallTitle: "", mainTitle: "", description: "",
          projectBtnText: "", projectBtnLink: "",
          facebook: "", twitter: "", instagram: "",
          linkedin: "", youtube: "", copyright: "",
          links: []
        }
      });
    }
    return res.status(200).json({ success: true, data: home });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================
// HELPER: Parse indexed FormData arrays
// e.g. heroSlides[0][title] = "Hello" → [{title:"Hello"}]
// ======================
function parseIndexedArray(body, prefix) {
  const result = [];
  const regex = new RegExp(`^${escapeRegex(prefix)}\\[(\\d+)\\]\\[(.+)\\]$`);
  Object.keys(body).forEach(key => {
    const match = key.match(regex);
    if (match) {
      const idx = parseInt(match[1]);
      const field = match[2];
      if (!result[idx]) result[idx] = {};
      result[idx][field] = body[key];
    }
  });
  return result.filter(Boolean);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ======================
// UPDATE HOME DATA
// ======================
exports.updateHome = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("BODY KEYS:", Object.keys(req.body));
console.log("FILES:", req.files);

    let home = await Home.findOne();
    if (!home) home = new Home();

    const files = req.files || [];
    const body = req.body;

    // --- NAVBAR LOGO ---
    const navLogoFile = files.find(f => f.fieldname === "navbarLogo");
    if (navLogoFile) {
      home.navbar = { logo: `uploads/${navLogoFile.filename}` };
    }

    // --- ABOUT ---
    const aboutImgFile = files.find(f => f.fieldname === "aboutImage");
    home.about = {
      title: body.aboutTitle || home.about?.title || "",
      subTitle: body.aboutSubTitle || home.about?.subTitle || "",
      description: body.aboutDescription || home.about?.description || "",
      image: aboutImgFile ? `uploads/${aboutImgFile.filename}` : (home.about?.image || "")
    };

    // --- STATS SECTION TOP ---
    home.statsSection = {
      title: body.statsTitle || "",
      subtitle: body.statsSubtitle || "",
      description: body.statsDescription || ""
    };

    // --- STATS BOXES ---
    const statsArr = body.stats || [];
    if (statsArr.length > 0) {
      home.stats = statsArr.map(s => ({
        icon: s.icon || "",
        number: Number(s.number) || 0,
        title: s.title || "",
        description: s.description || ""
      }));
    }

    // --- PARTIES SECTION ---
    home.partiesSection = {
      title: body.partiesTitle || "",
      subTitle: body.partiesSubTitle || ""
    };

    // --- HERO SLIDES ---
   const slidesArr = body.heroSlides || [];
    if (slidesArr.length > 0) {
      home.heroSlides = slidesArr.map((slide, index) => {
        const imgFile = files.find(f => f.fieldname === `heroSlides[${index}][image]`);
        return {
          title: slide.title || "",
          subtitle: slide.subtitle || "",
          description: slide.description || "",
          image: imgFile ? `uploads/${imgFile.filename}` : (slide.image || ""),
          btnText: slide.btnText || "",
          btnLink: slide.btnLink || ""
        };
      });
    } else if (!home.heroSlides) {
   home.heroSlides = [];
}

    // --- PARTY LOGOS ---
    const partiesArr = body.parties || [];
    if (partiesArr.length > 0) {
      home.parties = partiesArr.map((p, index) => {
        const logoFile = files.find(f => f.fieldname === `parties[${index}][logo]`);
        return {
          name: p.name || "",
          logo: logoFile ? `uploads/${logoFile.filename}` : (p.logo || "")
        };
      });
    } else if (!home.parties) {
   home.parties = [];
}

    // --- PRESENCE SECTION ---
    home.presenceSection = {
      title: body.presenceTitle || "",
      subTitle: body.presenceSubTitle || "",
      mapEmbedUrl: body.mapEmbedUrl || "",
      stateInfo: body.stateInfo || ""
    };

    // --- MAP MARKERS ---
    // Admin sends lat/lng but schema stores top/left — we store both
const presenceArr = body.presence || [];
    if (presenceArr.length > 0) {
      home.presence = presenceArr.map(p => ({
        city: p.city || "",
        top: p.top || p.lat || "",
        left: p.left || p.lng || ""
      }));
    } else if (!home.presence){
      home.presence = [];
    }

    // --- FOOTER ---
    const footerLinksArr = body.footerLinks || [];
    home.footer = {
      smallTitle: body.footerSmallTitle || "",
      mainTitle: body.footerMainTitle || "",
      description: body.footerDescription || "",
      projectBtnText: body.projectBtnText || "",
      projectBtnLink: body.projectBtnLink || "",
      facebook: body.facebook || "",
      twitter: body.twitter || "",
      instagram: body.instagram || "",
      linkedin: body.linkedin || "",
      youtube: body.youtube || "",
      copyright: body.copyright || "",
      links: footerLinksArr.map(l => ({
        column: parseInt(l.column) || 1,
        icon: l.icon || "",
        title: l.title || "",
        url: l.url || ""
      }))
    };

    console.log("slidesArr =", slidesArr);
console.log("statsArr =", statsArr);
console.log("partiesArr =", partiesArr);
    await home.save();

    return res.json({
      success: true,
      message: "Home Data Saved Successfully",
      data: home
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================
// DELETE HERO SLIDE
// ======================
exports.deleteHeroSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const home = await Home.findOne();
    if (!home) return res.status(404).json({ success: false, message: "Not Found" });
    home.heroSlides = home.heroSlides.filter(s => s._id.toString() !== id);
    await home.save();
    return res.json({ success: true, message: "Hero Slide Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================
// DELETE PARTY
// ======================
exports.deleteParty = async (req, res) => {
  try {
    const { id } = req.params;
    const home = await Home.findOne();
    if (!home) return res.status(404).json({ success: false, message: "Not Found" });
    home.parties = home.parties.filter(p => p._id.toString() !== id);
    await home.save();
    return res.json({ success: true, message: "Party Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};