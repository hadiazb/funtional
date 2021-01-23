const compose = (...functions) => (data) => functions.reduceRight((value, func) => func(value), data);

const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj);
  const attrs = [];

  for (let i = 0; i < keys.length; i++) {
    const attr = keys[i];
    attrs.push(`${attr}=“${obj[attr]}"`);
  }

  const string = attrs.join(' ');

  return string;
};

const tagAttrs = (obj) => (content = '') => `<${obj.tag}${obj.attrs ? ' ' : ''}${attrsToString(
  obj.attrs,
)}>${content}</${obj.tag}>`;

const tag = (t) => {
  if (typeof t === 'string') {
    return tagAttrs({ tag: t });
  }
  return tagAttrs(t);
};

const description = $('#description');
const calories = $('#calories');
const carbs = $('#carbs');
const protein = $('#protein');

const list = [];

description.keypress(() => {
  description.removeClass('is-invalid');
});

calories.keypress(() => {
  calories.removeClass('is-invalid');
});

carbs.keypress(() => {
  carbs.removeClass('is-invalid');
});

protein.keypress(() => {
  protein.removeClass('is-invalid');
});

const validateInput = () => {
  description.val()
    ? ''
    : description.addClass('is-invalid');

  calories.val() ? '' : calories.addClass('is-invalid');

  carbs.val() ? '' : carbs.addClass('is-invalid');

  protein.val() ? '' : protein.addClass('is-invalid');

  if (
    description.val()
		&& calories.val()
		&& carbs.val()
		&& protein.val()
  ) {
    add();
  }
};

const add = () => {
  const newItem = {
    description: description.val(),
    calories: parseInt(calories.val()),
    carbs: parseInt(carbs.val()),
    protein: parseInt(protein.val()),
  };

  list.push(newItem);
  cleanInputs();
  console.log(list);
};

const cleanInputs = () => {
  description.val('');
  calories.val('');
  carbs.val('');
  protein.val('');
};
