export const logger = ()=> console.log('blah');

export const declarer = ()=>{
  const blah = 'hmm';
  return blah;
};

export const stringer = ()=> 'blah';


export const declareLogReturn = ()=>{
  const blah = 'hmm';

  console.log(blah);

  return blah;
};


export const oneLineLogReturn = ()=> console.log('blah')||'hmm';




/// STRINGS


export const capslocker = str => str.toUpperCase();

export const twoStringAdd = (str1, str2)=> (str1 + str2);

export const allStringAdd = (...strings)=> strings.reduce((result, str)=> result + str, '');

export const stringContains = (str1, str2)=> (str1.indexOf(str2) !== -1);

export const instancesInString = (str1, str2)=> str1.split(str2).length -1;

export const isStringIntOrFloat = str => Math.floor(parseInt(str)) === parseInt(str) ? 'int' : 'float';

export const darken3HexColor = (hex, darkenBy)=> (
  '#' + hex.slice(1).split('').map(c => Math.floor((1 - darkenBy) * parseInt(c, 16)).toString(16)).join('')
);

export const darken6HexColor = (hex, darkenBy)=> (
  '#' + [...Array(3)].map((_, i)=> hex[1 + i*2]+hex[2 + i*2])
                     .map(cc => Math.floor((1 - darkenBy) * parseInt(cc, 16)).toString(16).padStart(2, '0')).join('')
);

export const darkenHexColor = (hex, darkenBy)=> (
  '#' + [...Array(3)].map((_, i)=> hex.length === 4 ? hex[1 + i] : (hex[1 + i*2]+hex[2 + i*2]))
                     .map(cc => Math.floor((1 - darkenBy) * parseInt(cc, 16)).toString(16).padStart(2, '0')).join('')
);

export const convertHexToRGBA = hex=> 'rgba(' + (
  ( (hex.length === 5) ?
    [...Array(4)].map((_, i)=> (hex[i + 1] + hex[i + 1])) :
    [...Array(4)].map((_, i)=> (hex[1 + i*2] + hex[2 + i*2]))
  ).map( c => parseInt(c, 16) )
).join() + ')';

export const convertRGBAtoHex = rgba=> '#' + rgba.slice(5, -1).split(',')
                                                 .map(d => parseInt(d).toString(16).padStart(2, '0'))
                                                 .join('');


export const splitWords = sentence=> sentence.split(' ').filter(i => i);

export const joinWords = words=> words.join(' ');

export const censorSentence = (sentence, badWords)=> sentence.split(' ').filter(w => badWords.indexOf(w) === -1).join(' ');


/// NUMBERS

export const twoNumberAdd = (num1, num2)=> (num1 + num2);

export const allNumberAdd = (...nums)=> nums.reduce((total, num)=> total + num, 0);

export const greatest = nums=> Math.max(...nums);

export const biggest = nums=> nums.sort((num1, num2)=> Math.abs(num1) < Math.abs(num2) ? 1 : -1)[0];

export const indexOfGreatest = nums => nums.indexOf( Math.max(...nums) );

export const convertToInt = num => Math.round(num);

export const formatAsMoney = num => `$${num.toFixed(2)}`;

export const inequality = (f, s)=> f === s ? '=' : f > s ? '>' : '<';

export const isXYinRadius = (x, y, r)=> ( x*x + y*y < r*r );


/// ARRAYS

export const twoArraysTogether = (arr1, arr2)=> [...arr1, ...arr2];

export const allArraysTogether = (...arrs)=> arrs.reduce((result, arr)=> [...result, ...arr], []);

export const alphebetize = strings => strings.sort();

export const filterStrings = arr => arr.filter(element => (typeof element !== 'string'));

export const filterByType = (arr, type)=> arr.filter(element => (typeof element !== type ));

export const arrayContains = (arr, el)=> (arr.indexOf(el) !== -1);

export const filterAllFalsy = arr => arr.filter(i => i);

export const filterAllTruthy = arr => arr.filter(i => !i);

export const leftTruncate = (arr, N)=> arr.slice(N);

export const dereferenceCircularArray = (arr, N)=> arr[ N % arr.length ];

export const filterByAge = (people, minAge)=> people.filter(person=> person.age >= minAge);

export const filterByAgeDestructure = (people, minAge)=> people.filter(({ age })=> age >= minAge);

export const filteredAges = (people, minAge)=> people.map(({ age })=> age).filter(age => age >= minAge);

export const filteredAgesAverage = (people, minAge)=> {
  const ages = people.map(({ age })=> age).filter(age => age >= minAge);
  return ages.reduce(( total, age )=> total + age, 0) / ages.length;
};

export const filteredAgesAverageOneLine = (people, minAge)=>
  people.map(({ age })=> age)
        .filter(age => age >= minAge)
        .reduce((p, age)=> ({ total: p.total + age, length: p.length + 1, average: (p.total + age)/(p.length + 1) }),
                { total: 0, length: 0 }).average || NaN;


export const longerArray = (arr1, arr2)=> (arr1.length > arr2.length) ? arr1 : arr2;

export const arrayExcess = (arr1, arr2)=> (arr1.length > arr2.length) ? arr1.slice(arr2.length) : arr2.slice(arr1.length);

export const flattenArray = (arr)=> arr.reduce((p, c)=> [...p, ...c], []); // arr.flat() in browser lol

export const uniquifyArray = arr => Array.from(new Set(arr));



/// OBJECTS

export const dereference = (obj, key)=> obj[key];

export const objectTypeOrArray = objOrArray => objOrArray.constructor == Array ? 'array' : (typeof objOrArray);

export const flattenObject = obj => Object.keys(obj).sort().reduce((p, c)=> ({ ...p, ...obj[c] }), {});

export const mergeObjects = (...os)=> Object.assign({}, ...os);

export const deepDereference = (obj, path)=> path.reduce((p, c)=> p[c], obj);

export const upperCaseObjectMap = obj=> Object.keys(obj).reduce((p, c)=> ({ ...p, [c]: obj[c].toUpperCase() }), {});

export const upperCaseObjectMapKeys = obj=> Object.keys(obj).reduce((p, c)=> ({ ...p, [c.toUpperCase()]: obj[c] }), {});


/// FUNCTIONS

export const callWithParams = (fn, ...params)=> fn(...params);

export const bakeItIn = (fn, val)=> ()=> fn(val);

export const dictionaryLogger = fns => Object.keys(fns)
                                             .reduce((p, c)=> ({ ...p, [c]: (...a)=> console.log(...a)|| fns[c](...a) }), {});
