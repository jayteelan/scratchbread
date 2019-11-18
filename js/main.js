document.addEventListener("DOMContentLoaded", function() {
  // MOBILE NAV MENU
  const menuButton = document.querySelector(".hamburger");
  const nav = document.querySelector(".mo-nav");
  function menuToggle() {
    if (nav.classList.contains("hidden")) {
      nav.classList.remove("hidden");
    } else {
      nav.classList.add("hidden");
    }
  }
  menuButton.addEventListener("click", menuToggle);

  // SCROLL UP BUTTON
  const upButt = document.querySelector(".scroll-up");
  window.onscroll = function() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      upButt.classList.remove("hidden");
    } else {
      upButt.classList.add("hidden");
    }
    upButt.addEventListener("click", function() {
      document.body.scrollTop = 0; //Safari
      document.documentElement.scrollTop = 0; //Chrome, Firefox, IE, Opera
    });
  };

  // COLLAPSE-EXPAND MENU
  const collButton = document.querySelector(".collapse-button");
  const collContent = document.querySelector(".collapse-expand");
  collButton.addEventListener("click", function() {
    if (collContent.classList.contains("collapsed")) {
      collContent.classList.remove("collapsed");
      collContent.style.maxHeight = collContent.scrollHeight + "px";
      collButton.innerHTML = "Collapse Menu";
    } else {
      collContent.classList.add("collapsed");
      document.body.scrollTop = 0; //Safari
      document.documentElement.scrollTop = 0; //Chrome, Firefox, IE, Opera
      collContent.style.maxHeight = "30rem";
      collButton.innerHTML = "Expand Menu";
    }
  });

  //
  //  MENU GENERATOR
  //
  //CREATES A <div> FOR A MENU SECTION
  function SectionTitle(title) {
    const sectionTitle = document.createElement("div");
    sectionTitle.innerHTML = `<h1>${title}</h1>`;
    sectionTitle.classList.add(
      "section-title",
      "flex-row",
      "flex-wrap",
      `${title}`
    );
    return sectionTitle;
  }

  //GET A MENU ITEM
  function getPropertiesForItem(section, item) {
    if (typeof menuSection !== "object" || menuSection === null) {
      throw new Error("The menu is missing");
    } else if (
      typeof menuSection[section] !== "object" ||
      menuSection[section] === null
    ) {
      throw new Error("The menu doesnt have that section");
    }
    return menuSection[section][item];
  }

  //CREATE A <div> FOR THE SELECTED MENU ITEM AND POPULATE WITH DETAILS
  function ItemArticle(section, item) {
    const { id, price, desc, info } = getPropertiesForItem(section, item);
    const itemArticle = document.createElement("div");
    itemArticle.classList.add("item-article", "flex-column", `${item}`);
    itemArticle.innerHTML = `<h3 class="item-id ${item}">${id}</h3>
  <p class="item-price">${price}</p>
  <p class="item-desc">${desc}</p>
  <p class="item-info">${info}</p>`;
    return itemArticle;
  }

  //LOOP THROUGH EACH MENU SECTION
  Object.entries(menuSection).forEach(([sectionTitle, sectionItems]) => {
    // CREATE MENU SECTION <div>S
    const sectionTitleDiv = SectionTitle(sectionTitle);
    // LOOP THROUGH EACH MENU ITEM
    Object.keys(sectionItems).forEach(itemArticle => {
      //ADD <div>S FOR MENU ITEMS
      sectionTitleDiv.appendChild(ItemArticle(sectionTitle, itemArticle));
    });

    //ADD MENU TO HTML
    document.querySelector(".menu-section").appendChild(sectionTitleDiv);
  });
});
