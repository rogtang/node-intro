const fs = require('fs');
const path = require('path');

const source = process.argv[2];
const target = process.argv[3];

// read contents of source
const contentsOfSource = fs.readFileSync(source, 'utf-8');

// get lines of source into an array, remove empty lines
const linesInSource = contentsOfSource.split('\n').filter(Boolean);

// make the target dir if it doesn't exist
if (!fs.existsSync(target)) {
  fs.mkdirSync(target);
}

// iterate over the lines
linesInSource.forEach(line => {
  // get the content of the lines, first word is a filename, rest is content
  const [ filename, ...contentArr ] = line.split(' ');
  // construct the full path for the file to create
  const newFilePath = path.join(__dirname, target, filename);

  // write the file and it's contents
  fs.writeFileSync(
    newFilePath,
    contentArr.join(" "),
    { flag: 'w+', encoding: 'utf-8' }
  );
});


/*I (with the help of a friend) figured out the set up. You have to create a .txt file inside your actual file system (same location as your index.js).
I just called it File.txt
Manually enter a few lines of short sentences in that file. Inside the args of your launch.json, enter the name of that file as the first arg, then the location you want to place a folder where the code will generate new files. Mine looked like:

"args": [
"File.txt",
"./new-folder"

The code and debugger then runs fully, and it creates a new file and for every line you wrote, with the name being the first word in each line. It places these files in the folder you designated to create. Then you can see the bug inside those files and use the debugger to find the issue.

In my File.txt I wrote:
One sentence of words
Two sentence of words
Three sentence of words

and the new-folder had 3 files, named "One" "Two" and "Three" and each said "sentence,of,words" (the bug)*/