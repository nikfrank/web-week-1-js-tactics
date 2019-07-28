import * as answers from './exercises';
//import * as answers from './solutions';
import * as solns from './solutions';

const randomString = l=> [...Array(l)].map(()=> String.fromCharCode( Math.floor(Math.random()*98 + 32) )).join('');
const randomStringWord = l=> [...Array(l)].map(()=> String.fromCharCode( Math.floor(Math.random()*26 + 97) )).join('');
const randomStringWordHalf = l=> [...Array(l)].map(()=> String.fromCharCode( Math.floor(Math.random()*13 + 97) )).join('');

const randomStringOrNumber = l=> Math.random() > 0.5 ? ( Math.random()*100 -50 ) : randomString(l);

const randomStringsObject = (l)=> [...Array(l)].reduce(p=> ({
  ...p,
  [randomStringWord(5)]: randomStringWord(9),
}), {})

const randomHexChar = ()=> (Math.floor(Math.random()*16)).toString(16);
const randomHexString = l=> [...Array(l)].map(randomHexChar).join('');


it('runs a test and tells you it works!', ()=>{});

/// USING CONSOLE.LOG

answers.logger && it('should log a string', ()=>{
  const logSpy = jest.spyOn(global.console, 'log');
  answers.logger();

  expect( logSpy ).toHaveBeenCalled();

  logSpy.mockRestore();
});


answers.declarer && it('should declare a const and return it', ()=>{
  const src = answers.declarer.toString();

  expect(src).toMatch(/const /);

  const ret = answers.declarer();

  expect( typeof ret.valueOf ).toEqual('function');
});


answers.stringer && it('should return a string from a one line fat arrow', ()=>{
  const src = answers.stringer.toString();

  expect( src ).not.toMatch(/{/);
  expect( src ).not.toMatch(/}/);
  expect( typeof answers.stringer() ).toEqual( 'string' );
});


answers.declareLogReturn && it('should declare a const, log it, and return it', ()=>{
  const src = answers.declareLogReturn.toString();

  expect(src).toMatch(/const /);

  const logSpy = jest.spyOn(global.console, 'log');
  const ret = answers.declareLogReturn();

  expect( logSpy ).toHaveBeenCalled();

  expect( logSpy.mock.calls[0][0] ).toEqual( ret );

  logSpy.mockRestore();
});



answers.oneLineLogReturn && it('should log and return a value all in one line', ()=>{
  const src = answers.oneLineLogReturn.toString();

  expect( src ).not.toMatch(/{/);
  expect( src ).not.toMatch(/}/);

  const logSpy = jest.spyOn(global.console, 'log');
  const ret = answers.oneLineLogReturn();

  expect( logSpy ).toHaveBeenCalled();

  expect( typeof logSpy.mock.calls[0][0].valueOf ).toEqual( 'function' );

  logSpy.mockRestore();

  expect( typeof ret.valueOf ).toEqual( 'function' );
});





/// STRINGS


answers.capslocker && it('makes the input CAPSLOCKED', ()=>{
  const testCases = ['blah', 'BJLB', 'r8n298nf', '3j fo iwef'];

  const output = testCases.map(t => answers.capslocker(t));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].toUpperCase() ) );
});


answers.twoStringAdd && it('adds two strings input', ()=>{
  const testCases = [...Array(10)].map(()=> [
    randomString(Math.floor(Math.random()*10 + 10)),
    randomString(Math.floor(Math.random()*10 + 10)),
  ]);

  const output = testCases.map(a=> answers.twoStringAdd(...a));

  output.forEach((o, i)=> expect( o ).toEqual( testCases[i][0] + testCases[i][1] ) );
});


answers.allStringAdd && it('adds all strings input', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array( Math.floor( Math.random() * 10 + 5 ))].map(()=>
    randomString(Math.floor(Math.random()*10 + 10)),
  ) );

  const output = testCases.map(a=> answers.allStringAdd(...a));

  output.forEach((o, i)=> expect( o ).toEqual( testCases[i].reduce((p,c)=> p+c, '') ) );
});


answers.stringContains && it('returns true only if the first string contains the second one', ()=>{
  const testCases = [...Array(10)].map(()=> [
    randomStringWord(Math.floor(Math.random()*10 + 10)),
    randomStringWord(Math.floor(Math.random()*10 + 10)),
  ]);

  const output = testCases.map( t => answers.stringContains(t[0], t[1]) );

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0].indexOf(testCases[i][1]) !== -1) );
});


answers.instancesInString && it('counts the times we find the second string in the first', ()=>{
  const testCases = [...Array(10)].map(()=> [
    randomStringWordHalf(400),
    randomStringWordHalf(2)
  ]);

  const output = testCases.map(t => answers.instancesInString(...t));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0].split(testCases[i][1]).length -1));
});


answers.darken3HashColor && it('returns a darker CSS 3-digit hashcolor by the amount speicified', ()=>{
  const testCases = [...Array(10)].map(()=> ['#' + randomHexString(3), Math.random()]);

  const output = testCases.map(t => answers.darken3HashColor(...t));

  output.forEach((o, i)=> {
    expect(o).toEqual(
      '#' + testCases[i][0].slice(1).split('')
                           .map(c => Math.floor((1 - testCases[i][1]) * parseInt(c, 16)).toString(16)).join('')
    )

    expect(o).toHaveLength(4);
  });
});

answers.darken6HashColor && it('returns a darker CSS 6-digit hashcolor by the amount speicified', ()=>{
  const testCases = [...Array(10)].map(()=> ['#' + randomHexString(6), Math.random()]);

  const output = testCases.map(t => answers.darken6HashColor(...t));

  output.forEach((o, i)=> {
    expect(o).toEqual(
      '#' + [...Array(3)].map((_, j)=> testCases[i][0][1 + j*2] + testCases[i][0][2 + j*2])
                         .map(cc => Math.floor((1 - testCases[i][1]) * parseInt(cc, 16)).toString(16).padStart(2, '0')).join('')
    );

    expect(o).toHaveLength(7);
  });
});

answers.darkenHashColor && it('returns a darker CSS 6-digit hashcolor by the amount speicified from 3 or 6 digit input', ()=>{
  const testCases = [...Array(10)].map(()=> ['#' + randomHexString( Math.random() > 0.5 ? 3 : 6), Math.random()]);

  const output = testCases.map(t => answers.darkenHashColor(...t));

  output.forEach((o, i)=> {
    expect(o).toEqual(
      '#' + [...Array(3)].map((_, j)=> testCases[i][0].length === 4 ? testCases[i][0][1 + j] :
                                       (testCases[i][0][1 + j*2] + testCases[i][0][2 + j*2]))
                         .map(cc => Math.floor((1 - testCases[i][1]) * parseInt(cc, 16)).toString(16).padStart(2, '0')).join('')
    );

    expect(o).toHaveLength(7);
  });
});


answers.convertHexToRGBA && it('converts any CSS hash color to the equivalent rgba(...) value', ()=>{
  const testCases = [...Array(10)].map(()=> '#' + [...Array( Math.random() > 0.5 ? 4 : 8 )]
    .map(()=> Math.floor( Math.random()*16 ).toString(16) ).join('') );

  const output = testCases.map( answers.convertHexToRGBA );

  output.forEach((o, i)=> expect(o.replace(/\s/g, '')).toEqual(
    'rgba(' + (
      ( (testCases[i].length === 5) ?
        [...Array(4)].map((_, j)=> (testCases[i][j + 1] + testCases[i][j + 1])) :
        [...Array(4)].map((_, j)=> (testCases[i][1 + j*2] + testCases[i][2 + j*2]))
      ).map( c => parseInt(c, 16) )
    ).join() + ')'
  ));
});

answers.convertRGBAtoHex && it('should convert a CSS rgba(...) color to the equivalent 8 digit hex color', ()=>{
  const testCases = [...Array(10)].map(()=> 'rgba('+ [...Array(4)].map(()=> Math.floor(Math.random()*256)).join() +')');

  const output = testCases.map(answers.convertRGBAtoHex);

  output.forEach((o, i)=> expect(o).toEqual(
    '#' + testCases[i].slice(5, -1).split(',').map(d => parseInt(d).toString(16).padStart(2, '0')).join('')
  ));
});


answers.splitWords && it('should return an array of the words from the sentence', ()=>{
  const testCases = [...Array(10)].map(()=>
    [...Array( Math.floor( Math.random()*10 + 1 ))].map(()=> randomStringWord(Math.floor(Math.random()*5 + 5))).join(' ')
  );

  const output = testCases.map(answers.splitWords);

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].split(' ') ));
});

answers.joinWords && it('should take an array of words and put them together as a sentence (with spaces in between words', ()=>{
  const testCases = [...Array(10)].map(()=>
    [...Array( Math.floor( Math.random()*10 + 1 ))].map(()=> randomStringWord(Math.floor(Math.random()*5 + 5)))
  );

  const output = testCases.map(answers.joinWords);

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].join(' ') ));
});


answers.censorSentence && it('removes bad words from the sentence', ()=>{
  const testCases = [...Array(10)].map(()=> [
    [...Array(100)].map(()=> randomStringWordHalf(2)).join(' '),
    [...Array(10)].map(()=> randomStringWordHalf(2)),
  ]);

  const output = testCases.map(t => answers.censorSentence(...t));

  output.forEach((o, i)=> expect(o).toEqual(
    testCases[i][0].split(' ').filter(w => testCases[i][1].indexOf(w) === -1).join(' ')
  ));
});


/// NUMBERS

answers.twoNumberAdd && it('adds two numbers input', ()=>{
  const testCases = [...Array(10)].map(()=> [Math.random()*1000 -500, Math.random()*1000 -500]);

  const output = testCases.map(a=> answers.twoNumberAdd(...a));

  output.forEach((o, i)=> expect( o ).toEqual( testCases[i][0] + testCases[i][1] ) );
});


answers.allNumberAdd && it('adds all numbers input', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array(Math.floor(Math.random()*10 + 10))].map(()=> Math.random()*1000 -500 ));

  const output = testCases.map(a=> answers.allNumberAdd(...a));

  output.forEach((o, i)=> expect( o ).toEqual( testCases[i].reduce((p,c)=> p+c, 0) ) );
});



answers.greatest && it('returns the greatest number in the array', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array( Math.floor(Math.random()*10 + 5) )].map(()=> Math.random() * 100 - 50));

  const output = testCases.map( t => answers.greatest(t) );

  output.forEach((o, i)=> expect( o ).toEqual( Math.max(...testCases[i]) ) );
});


answers.biggest && it('returns the biggest number in the array', ()=>{
  const testCases = [...Array(50)].map(()=> [...Array( Math.floor(Math.random()*10 + 5) )].map(()=> Math.random() * 100 - 50));

  const output = testCases.map( t => answers.biggest(t) );

  output.forEach((o, i)=> expect( o ).toEqual( testCases[i].sort((a, b)=> Math.abs(a) < Math.abs(b) ? 1 : -1)[0] ) );
});


answers.indexOfGreatest && it('returns the index of the greatest number in the array', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array( Math.floor(Math.random()*10 + 5) )].map(()=> Math.random() * 100 - 50));

  const output = testCases.map( t => answers.indexOfGreatest(t) );

  output.forEach((o, i)=> expect( o ).toEqual( testCases[i].indexOf(Math.max(...testCases[i])) ) );
});


answers.convertToInt && it('converts an input number to an integer', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array(10)].map(()=> Math.random() * 100 - 50) );

  const output = testCases.map( t => answers.convertToInt(t) );

  output.forEach((o, i)=> o.forEach((oo, oi)=> expect([ Math.floor(testCases[i][oi]), Math.ceil(testCases[i][oi]) ]).toContain( oo ) ));
});


answers.formatAsMoney && it('should output $10.25 our input formatted as a price', ()=>{
  const testCases = [...Array(10)].map(()=> Math.random() > 0.5 ? Math.random()*50 : Math.floor(Math.random()*50));

  const output = testCases.map(t => answers.formatAsMoney(t));

  output.forEach((o, i)=> expect(o).toEqual('$'+(testCases[i].toFixed(2))));
});


answers.inequality && it('should tell us which inequality operator applies (>, < or =) as a string', ()=>{
  let temp;

  const testCases = [...Array(10)].map(()=> (
    (Math.random() < 0.33) ? [ (temp = Math.random()), temp ] : [Math.random(), Math.random()]
  ));

  const output = testCases.map(t => answers.inequality(...t));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0] === testCases[i][1] ? '=' :
                                             testCases[i][0] > testCases[i][1] ? '>' : '<'));
});


answers.isStringIntOrFloat && it('returns a string explaining which kind of number we can interpret the string input as', ()=>{
  const testCases = [...Array(10)].map(()=> (Math.random() > 0.5) ?
                                            (Math.floor( Math.random()*1000 )+'') :
                                            (Math.random()*1000)+'');

  const output = testCases.map(answers.isStringIntOrFloat);

  output.forEach((o, i)=> expect(o).toEqual( Math.floor(parseInt(testCases[i])) === 1*(testCases[i]) ? 'int' : 'float' ));
});


answers.isXYinRadius && it('should determine if the point is inside the circle (x, y, r)', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array(3)].map(()=> Math.random() * 50 -25));

  const output = testCases.map(t => answers.isXYinRadius(...t));

  output.forEach((o, i)=> expect(o).toEqual(
    (testCases[i][0]*testCases[i][0] + testCases[i][1]*testCases[i][1] < testCases[i][2]*testCases[i][2])
  ));
});



/// ARRAYS

answers.twoArraysTogether && it('puts two arrays together', ()=>{
  const testCases = [...Array(10)].map(()=> [randomString(10).split(''), randomString(10).split('')] );

  const output = testCases.map( t => answers.twoArraysTogether(...t) );

  output.forEach((o, i)=> expect(o).toEqual( [...testCases[i][0], ...testCases[i][1] ] ) );
});



answers.allArraysTogether && it('puts all arrays together', ()=>{
  const testCases = [...Array(10)].map(()=>
    [...Array( Math.floor( Math.random()*10 + 5 ))].map(()=> randomString(10).split('') )
  );

  const output = testCases.map( t => answers.allArraysTogether(...t) );

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].reduce((p, c)=> [...p, ...c], []) ));
});


answers.alphebetize && it('alphebetizes strings', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array( Math.floor( Math.random() * 10 + 5 ))].map(()=>
    randomStringWord(Math.floor(Math.random()*5 + 10)),
  ) );

  const output = testCases.map(a=> answers.alphebetize(a));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].sort() ));
});


answers.filterStrings && it('filters out all the strings', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array( Math.floor( Math.random() * 10 + 5 ))].map(()=>
    randomStringOrNumber(Math.floor(Math.random()*5 + 10)),
  ) );

  const output = testCases.map(a=> answers.filterStrings(a));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].filter(e => (typeof e !== 'string')) ))
});

answers.filterByType && it('filters out by type dynamically', ()=>{
  const testCases = [...Array(10)].map(()=> [
    [...Array( Math.floor( Math.random() * 10 + 5 ))].map(()=>
      Math.random() > 0.5 ? ({}) : randomStringOrNumber(Math.floor(Math.random()*5 + 10)),
    ),
    ['string', 'number', 'object'][ Math.floor( Math.random()*3 ) ],
  ]);

  const output = testCases.map(([a, t])=> answers.filterByType(a, t));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0].filter(e => (typeof e !== testCases[i][1])) ))
});

answers.arrayContains && it('returns true only if the array contains the second param', ()=>{
  let temp;

  const testCases = [...Array(10)].map(()=> [
    (temp = [...Array(10)].map(()=> randomStringWord(Math.floor(Math.random()*10 + 10))) ),
    Math.random() > 0.5 ? temp[ Math.floor(Math.random()*10) ] : randomStringWord(Math.floor(Math.random()*10 + 10)),
  ]);

  const output = testCases.map( t => answers.arrayContains(t[0], t[1]) );

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0].indexOf(testCases[i][1]) !== -1) );
});


answers.filterAllFalsy && it('filters out all falsy values', ()=>{
  const testCases = [...Array(10)].map(()=> [
    ...[...Array(10)].map(()=> randomString( Math.floor(Math.random()*4) )),
    ...[...Array(10)].map(()=> Math.floor( Math.random()*5 - 3)),
  ]);

  const output = testCases.map(t => answers.filterAllFalsy(t));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].filter(Boolean)));
});

answers.filterAllTruthy && it('filters out all truthy values', ()=>{
  const testCases = [...Array(10)].map(()=> [
    ...[...Array(10)].map(()=> randomString( Math.floor(Math.random()*4) )),
    ...[...Array(10)].map(()=> Math.floor( Math.random()*5 - 3)),
  ]);

  const output = testCases.map(t => answers.filterAllTruthy(t));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].filter(i => !i)));
});

answers.leftTruncate && it('should cut off N (the second param) elements from the array (first param) at the beginning', ()=>{
  const testCases = [...Array(10)].map(()=> [ [...Array(10)].map(()=> randomString(5)), Math.floor( Math.random() * 10 ) ]);

  const output = testCases.map(t => answers.leftTruncate(t[0], t[1]));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0].slice(testCases[i][1])));
});

answers.dereferenceCircularArray && it('should read from the array (first param) the Nth (second param), looping if nec.', ()=>{
  const testCases = [...Array(10)].map(()=> [
    [...Array( Math.floor( Math.random()*5 + 5 ) )].map(()=> randomStringWord(5)),
    Math.random() > 0.5 ? Math.floor( Math.random() * 5 ) : Math.floor( Math.random()*10 + 10 ),
  ]);

  const output = testCases.map(t => answers.dereferenceCircularArray( t[0], t[1] ));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0][ testCases[i][1] % testCases[i][0].length ] ));
});


answers.filterByAge && it('filters an array of people by a minimum age', ()=>{
  const testCases = [...Array(10)].map(()=> [
    [...Array(10)].map(()=> ({ age: Math.random() > 0.5 ? Math.floor(Math.random() * 30) : Math.random()*20 + 20 }) ),
    Math.random() > 0.5 ? Math.floor(Math.random() * 50) : Math.random() * 50,
  ]);

  const output = testCases.map(t => answers.filterByAge(t[0], t[1]));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0].filter(p => p.age >= testCases[i][1]) ));
});

answers.filterByAgeDestructure && it('filters an array of people by a minimum age using destructuring', ()=>{
  const src = answers.filterByAgeDestructure.toString();

  expect( src ).toMatch(/\({\s*age\s*}\)\s*=>/);

  const testCases = [...Array(10)].map(()=> [
    [...Array(10)].map(()=> ({ age: Math.random() > 0.5 ? Math.floor(Math.random() * 30) : Math.random()*20 + 20 }) ),
    Math.random() > 0.5 ? Math.floor(Math.random() * 50) : Math.random() * 50,
  ]);

  const output = testCases.map(t => answers.filterByAgeDestructure(t[0], t[1]));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0].filter(p => p.age >= testCases[i][1]) ));
});

answers.filteredAges && it('filters an array of people by a minimum age, returning the ages', ()=>{
  const testCases = [...Array(10)].map(()=> [
    [...Array(10)].map(()=> ({ age: Math.random() > 0.5 ? Math.floor(Math.random() * 30) : Math.random()*20 + 20 }) ),
    Math.random() > 0.5 ? Math.floor(Math.random() * 50) : Math.random() * 50,
  ]);

  const output = testCases.map(t => answers.filteredAges(t[0], t[1]));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0].map(p => p.age).filter(age => age >= testCases[i][1]) ));
});

answers.filteredAgesAverage && it('filters an array of people by a minimum age, returning the average age kept', ()=>{
  const testCases = [...Array(10)].map(()=> [
    [...Array(10)].map(()=> ({ age: Math.random() > 0.5 ? Math.floor(Math.random() * 30) : Math.random()*20 + 20 }) ),
    Math.random() > 0.5 ? Math.floor(Math.random() * 50) : Math.random() * 50,
  ]);

  const output = testCases.map(t => answers.filteredAgesAverage(t[0], t[1]));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0]
    .map(p => p.age)
    .filter(age => age >= testCases[i][1])
    .reduce((p, age)=> ({ total: p.total + age, length: p.length + 1, average: (p.total + age)/(p.length + 1) }),
            { total: 0, length: 0 }).average || NaN
  ));
});

answers.filteredAgesAverageOneLine && it('filters an array of people by a minimum age, returning the average age, oneliner', ()=>{
  const src = answers.filteredAgesAverageOneLine.toString();

  expect(src).not.toMatch(/=>\s*{/);

  const testCases = [...Array(10)].map(()=> [
    [...Array(10)].map(()=> ({ age: Math.random() > 0.5 ? Math.floor(Math.random() * 30) : Math.random()*20 + 20 }) ),
    Math.random() > 0.5 ? Math.floor(Math.random() * 50) : Math.random() * 50,
  ]);

  const output = testCases.map(t => answers.filteredAgesAverageOneLine(t[0], t[1]));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0]
    .map(p => p.age)
    .filter(age => age >= testCases[i][1])
    .reduce((p, age)=> ({ total: p.total + age, length: p.length + 1, average: (p.total + age)/(p.length + 1) }),
            { total: 0, length: 0 }).average || NaN
  ));
});


answers.longerArray && it('should return the longer of two arrays', ()=>{
  let temp;

  const testCases = [...Array(10)].map(()=> [
    [...Array( temp = Math.floor(Math.random()*10 + 6))].map(()=> randomStringWord(5)),
    [...Array( temp + (Math.random() > 0.5 ? -Math.floor(Math.random()* 3 + 1) : Math.floor(Math.random()*3 + 1) ))]
      .map(()=> randomStringWord(5)),
  ]);

  const output = testCases.map(t => answers.longerArray(...t));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][ testCases[i][0].length > testCases[i][1].length ? 0 : 1 ] ));
});


answers.arrayExcess && it('should return the elements from the end of the longer awrray past the length of the shorter', ()=>{
  const testCases = [...Array(10)].map(()=> [
    [...Array( Math.floor(Math.random()*10 + 6))].map(()=> randomStringWord(5)),
    [...Array( Math.floor(Math.random()*10 + 6))].map(()=> randomStringWord(5)),
  ]);

  const output = testCases.map(t => answers.arrayExcess(...t));

  output.forEach((o, i)=> expect(o).toEqual(
    (testCases[i][0].length > testCases[i][1].length) ?
    testCases[i][0].slice(testCases[i][1].length) :
    testCases[i][1].slice(testCases[i][0].length)
  ));
});


answers.flattenArray && it('should put all the elements from the internal arrays into one big new array', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array( Math.floor(Math.random()*5 + 5) )]
    .map(()=> [...Array(Math.floor(Math.random()*5 + 5))].map(()=> randomStringWord(5)) ));


  const output = testCases.map( answers.flattenArray );

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].reduce((p, c)=> [...p, ...c], []) ));
});


answers.uniquifyArray && it('depulicates the array', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array(1000)].map(()=> randomStringWordHalf(3)));

  const output = testCases.map( answers.uniquifyArray );

  output.forEach((o, i)=> expect(o).toEqual( Array.from(new Set(testCases[i])) ));
});


/// OBJECTS

answers.dereference && it('should read from the first param (object) the second param (key)', ()=>{
  let temp;

  const testCases = [...Array(10)].map(()=> [
    (temp = randomStringsObject(5)),
    Object.keys(temp)[Math.floor( Math.random()*5 )],
  ]);

  const output = testCases.map(([obj, key])=> answers.dereference( obj, key ) );

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0][ testCases[i][1] ] ));
});


answers.objectTypeOrArray && it('should return to us the type of the input, but "array" for Arrays!', ()=>{
  const testCases = [...Array(10)].map(()=>
    Math.random() > 0.25 ? [] : Math.random() > 0.33 ? ({}) : Math.random() > 0.5 ? 99 : 'blah'
  );

  const output = testCases.map( t => answers.objectTypeOrArray(t) );

  output.forEach((o, i)=> expect(o).toEqual( testCases[i].constructor == Array ? 'array' : typeof testCases[i] ));
});


answers.flattenObject && it('should merge together the nested objects from the input object 1 level deep', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array(5)].reduce((p, c)=> ({
    ...p, [randomStringWord(5)]: [...Array(5)].reduce((p, c)=> ({ ...p, [randomStringWord(5)]: randomStringWord(5) }), {})
  }), {}) );

  const output = testCases.map(answers.flattenObject);

  output.forEach((o, i)=> expect(o).toEqual( Object.keys(testCases[i]).sort()
                                                   .reduce((p, c)=> ({ ...p, ...testCases[i][c] }), {}) ));
});


answers.mergeObjects && it('should merge all the contents from many input objects into one object', ()=>{
  const testCases = [...Array(10)].map(()=>
    [...Array( Math.floor( Math.random()*5 + 5) )]
      .map(()=> [...Array(5)].reduce((p, c)=> ({ ...p, [randomStringWord(5)]: randomStringWord(5) }), {}))
  );

  const output = testCases.map(t => answers.mergeObjects(...t));

  output.forEach((o, i)=> expect(o).toEqual( Object.assign({}, ...testCases[i])));
});


answers.deepDereference && it('should read nested data out of the object provided based on the key path array provided', ()=>{
  let temp2;
  const testCases = [...Array(10)].map(()=>
    [...Array( Math.floor( Math.random()*5 + 5 ) )]
      .map(()=> randomStringWord(5))
      .reduce((p, c)=> (
        temp2 = randomStringWord(5),
        p.path.reduce((op, oc)=> op[oc], p.obj)[c] = { [c]: temp2 },
        ({ obj: p.obj, path: [...p.path, c], result: {[c]: temp2} })
      ), { obj: {}, path: [] }),
  );

  const output = testCases.map(t => answers.deepDereference( t.obj, t.path ));

  output.forEach((o, i)=> expect(o).toEqual(testCases[i].result));
});


answers.upperCaseObjectMap && it('maps the strings in the dictionary to uppercase', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array(5)].map(()=> randomStringWord(5))
                                                         .reduce((p, c)=> ({ ...p, [c]: randomStringWord(8) }), {}) );

  const output = testCases.map( answers.upperCaseObjectMap );

  output.forEach((o, i)=> expect(o).toEqual(
    Object.keys(testCases[i]).reduce((p, c)=> ({ ...p, [c]: testCases[i][c].toUpperCase() }), {})
  ));
});


answers.upperCaseObjectMapKeys && it('maps the keys in the dictionary to uppercase', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array(5)].map(()=> randomStringWord(5))
                                                         .reduce((p, c)=> ({ ...p, [c]: randomStringWord(8) }), {}) );

  const output = testCases.map( answers.upperCaseObjectMapKeys );

  output.forEach((o, i)=> expect(o).toEqual(
    Object.keys(testCases[i]).reduce((p, c)=> ({ ...p, [c.toUpperCase()]: testCases[i][c] }), {})
  ));
});


/// FUNCTIONS


answers.callWithParams && it('should call the provided function with the provided params', ()=>{
  const testCases = [...Array(10)].map(()=> [
    jest.fn(),
    [...Array( Math.floor(Math.random()*10) )].map(()=> randomStringOrNumber(5)),
  ]);

  const output = testCases.map(t => answers.callWithParams(t[0], ...t[1]));

  output.forEach((o, i)=> expect(o).toEqual( testCases[i][0](...testCases[i][1]) ));
});

answers.bakeItIn && it('bakes a value into a function call', ()=>{
  const testCases = [...Array(10)].map(()=> [ jest.fn(), randomStringWord(10) ]);

  const output = testCases.map(t=> answers.bakeItIn(...t));

  output.forEach(o => o());

  testCases.forEach(([ fn, val ])=> {
    expect( fn.mock.calls ).toHaveLength( 1 );
    expect( fn.mock.calls[0][0] ).toEqual( val );
  });
});

answers.dictionaryLogger && it('decorates the functions with a logger', ()=>{
  const testCases = [...Array(10)].map(()=> [...Array(10)].map(()=> randomStringWord(5))
                                                          .reduce((p, c)=> ({ ...p, [c]: jest.fn() }), {}) );

  const output = testCases.map( answers.dictionaryLogger );

  output.forEach((fns, i)=> {
    Object.keys(fns).forEach(fnKey => {
      const logSpy = jest.spyOn(global.console, 'log');
      const args = [...Array(5)].map(()=> randomStringWord(5));

      fns[fnKey](...args);

      expect( logSpy ).toHaveBeenCalled();
      logSpy.mock.calls[0].forEach((a, j) => expect(a).toEqual(args[j]));

      logSpy.mockRestore();
    });
  });
});
