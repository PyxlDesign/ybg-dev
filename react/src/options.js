export const footrestOptions = [
  {
    thumbnail: '../images/footrest/Footrest_Bamboo_thumb.png',
    file: 'Footrest_Bamboo.png',
    shopifyTitle: 'Bamboo Adjustable Highchair Footrest'
  },
  {
    thumbnail: '../images/footrest/Footrest_Cherry_thumb.png',
    file: 'Footrest_Cherry.png',
    shopifyTitle: 'Cherry Adjustable Highchair Footrest'
  },
  {
    thumbnail: '../images/footrest/Footrest_Birch_thumb.png',
    file: 'Footrest_Birch.png',
    shopifyTitle: 'Birch Adjustable Highchair Footrest'
  },
  {
    thumbnail: '../images/footrest/Footrest_Black_thumb.png',
    file: 'Footrest_Black.png',
    shopifyTitle: 'Black Adjustable Highchair Footrest'
  },
  {
    thumbnail: '../images/footrest/Footrest_Walnut_thumb.png',
    file: 'Footrest_Walnut.png',
    shopifyTitle: 'Walnut Adjustable Highchair Footrest'
  }
];

export const legOptions = {
  bamboo: {
    thumbnail: '../images/legs/Legs_Bamboo_thumb.jpg',
    file: 'Legs_Bamboo.png'
  },
  black: {
    thumbnail: '../images/legs/Legs_Matte_Black_thumb.jpg',
    file: 'Legs_Matte_Black.png'
  },
  birch: {
    thumbnail: '../images/legs/Legs_Birch_thumb.jpg',
    file: 'Legs_Birch.png'
  },
  cherry: {
    thumbnail: '../images/legs/Legs_Cherry_thumb.jpg',
    file: 'Legs_Cherry.png'
  },
  gold: {
    thumbnail: '../images/legs/Legs_Gold_thumb.jpg',
    file: 'Legs_Gold.png'
  },
  walnut: {
    thumbnail: '../images/legs/Legs_Walnut_thumb.jpg',
    file: 'Legs_Walnut.png'
  }
};

export const nullOption = {
  thumbnail: 'none'
  // thumbnail: '../images/none-selected.png'
};

export const displayTagList = [
  'Animal',
  'Boy',
  'Dark Background',
  'Dots',
  'Floral',
  'Food',
  'Leaves',
  'Mudcloth',
  'Rainbow',
  'Autumn',
  'Spring',
  'Summer',
  'Winter',
  'Stripes',
  'Vehicle',
  'Vegan'
];

export const tagList = displayTagList.map(tag => tag.toLowerCase());

export function getCushionList(shopifyCushions) {
  const cushionList = [];
  shopifyCushions.forEach(product => {
    if (!product?.metafields?.spoonflowerid) {
    } else {
      cushionList.push({
        thumbnail: `https://garden.spoonflower.com/?designs=${product.metafields.spoonflowerid}&size=l&formula=ybg_scene_1`,
        file: `https://garden.spoonflower.com/?designs=${product.metafields.spoonflowerid}&size=l&formula=ybg_scene_2`,
        ...product
      });
    }
  });

  // filter out cushion insert and potentially any cushions not avaialbe for sale
  const filteredCushionList = cushionList.filter(cushion => {
    return cushion.title !== 'Cushion Insert' && cushion.available;
  });

  return [nullOption, ...filteredCushionList];
}

function onlyAvailableItems(items) {
  if (!items || !items.length) {
    return [];
  }
  const filteredList = items.filter(item => item.available === true);
  return filteredList;
}

export function getPlacematList(shopifyPlacemats) {
  const placematList = [];
  shopifyPlacemats.forEach(item => {
    placematList.push({
      thumbnail: item.images[0].replace('//', ''),
      fillColorRGB: item.metafields?.placematcolor,
      ...item
    });
  });
  const filteredList = onlyAvailableItems(placematList);
  // console.log('Unvail placemats', placematList.length - filteredList.length);
  return [nullOption, ...filteredList];
}

export function getFloormatList(shopifyFloormats) {
  const floormatList = [];
  shopifyFloormats.forEach(item => {
    floormatList.push({
      thumbnail: item.images[0].replace('//', ''),
      fillColorRGB: item.metafields?.floormat_color,
      ...item
    });
  });
  const filteredList = onlyAvailableItems(floormatList);
  // console.log('Unvail floormats', floormatList.length - filteredList.length);
  return [nullOption, ...filteredList];
}

export function getFootrestList(shopifyFootrests) {
  const combinedList = [];
  const titleList = footrestOptions.map(option => option.shopifyTitle);

  shopifyFootrests.forEach(item => {
    if (titleList.includes(item.title)) {
      const hardcoded = footrestOptions.find(
        footrest => footrest.shopifyTitle === item.title
      );
      combinedList.push({ ...hardcoded, ...item });
    }
  });
  const filteredList = onlyAvailableItems(combinedList);
  // console.log('Unvail footrests', combinedList.length - filteredList.length);
  return [nullOption, ...filteredList];
}

export function getLegList(shopifyLegrests) {
  const optionKeys = Object.keys(legOptions)
  let legList = [];
  shopifyLegrests.forEach(leg => {
    if (leg.tags.length) {
      const optionsTag = leg.tags.find(tag => optionKeys.includes(tag))
      legList.push({ ...leg, ...legOptions[optionsTag] });
    }
  });
  const filteredList = onlyAvailableItems(legList);
  return [nullOption, ...filteredList];
}
