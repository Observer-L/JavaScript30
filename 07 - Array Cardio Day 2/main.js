// ## Array Cardio Day 2
   const people = [
     { name: 'Wes', year: 1988 },
     { name: 'Kait', year: 1986 },
     { name: 'Irv', year: 1970 },
     { name: 'Lux', year: 2015 }
   ];
   const comments = [
     { text: 'Love this!', id: 523423 },
     { text: 'Super good', id: 823423 },
     { text: 'You are the best', id: 2039842 },
     { text: 'Ramen is my fav food ever', id: 123523 },
     { text: 'Nice Nice Nice!', id: 542328 }
   ];
   // Some and Every Checks
   // Array.prototype.some() // is at least one person 19?
   const nineteen = people.some(p => (new Date()).getFullYear() - p.year >= 19);
   console.log(nineteen);
   // Array.prototype.every() // is everyone 19?
   const everyoneNineteen = people.every(p => (new Date()).getFullYear() - p.year >= 19);
   console.log(everyoneNineteen);
   // Array.prototype.find()
   // Find is like filter, but instead returns just the one you are looking for
   // find the comment with the ID of 823423
   const indexID = comments.find(comment => comment.id === 823423);
   console.log(indexID);
   // Array.prototype.findIndex()
   // Find the comment with this ID
   // delete the comment with the ID of 823423
   const targetIndex = comments.findIndex(comment => comment.id === 823423);
   console.log(targetIndex);
   // comments.splice(targetIndex, 1);
   const newComments  = [...comments.slice(0, targetIndex), ...comments.slice(targetIndex+1)];
   console.table(newComments);
