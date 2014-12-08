How to start web testing with Casper JS
=======================================

Web is unsafe place, beware, there are many bugs lurking in dark corners of your app. 

To start husting this ugly creatures of night you need to prepare:

- install nodejs
- install phantomJS
- install casperJS - your main hunting tool by using the next command

```
npm install phantomjs -g
npm install casperjs -g
```

if you are living in plains of Windows, you need to sharpen your weapon a bit. Locate the smithy at c:/Users/{your name}/AppData/Roaming/npm/. Here, you can change casperjs.cmd to look like next

```
@IF EXIST "%~dp0\python.exe" (
  "%~dp0\python.exe"  "%~dp0\node_modules\casperjs\bin\casperjs" %*
) ELSE (
  "%~dp0\node_modules\casperjs\batchbin\casperjs.bat" %*
)
```

Now you are ready to check self. Run the next command in the console ```capserjs``, it will connect your soul to your weapon ( if it says that casperjs not found then you are doomed for eternity )

```
Alternative way: there are rumors, that if you have Python installed, you will need not change anything in the casperjs.cmd. Still those are just rumors, and true wariors do not use Python anyway. 
```

From this point you have two ways - jump straigh in battle, by using raw casperJS test ( read war manual here - http://casperjs.readthedocs.org/en/latest/testing.html ) or use the more advanced techique of Thousand Arms. 

Techniquie of Thousand Arms
----------------------------

- clone this git repo
- install gulp ```npm install gulp -g```
- write your clever test plan in the file in the retest folder (you can use subfolders if you wish ) 
- run ```gulp retest``` to run all your tests at once
- check result images in the retest/base
- after next run you can find the screen from broken test in retest/failed

### Test plan

Can be written in JavaScript, it starts from the name of page which need to be tested and followed by the list of actions and tests. You can use asserts for different tests, but in common case is it more simple to just make screenshoot and compare to the original one. 

Lets check for example 01\_basic/002\_markers.js

```
//load core
var gantt = require("../../retest.js");
//write test name here
casper.test.begin('Deadline Markers', function suite(test) {
    //write url to test here
	casper.restart("04_customization/14_deadline.html");
    
    //make control screen shoot
	casper.rescreen('002-normal-state');
	
	//click somewhere
	casper.then(function(){
		this.click( this.gantt.task() );
	});
	
	//make another screenshot
	casper.rescreen('002-row-selected');

    //finalize test
	casper.run(function(){
		test.done();
	})
});
```

Steps for Ultimate Mastery of Thousand Arms
---------------------------------------------

- stady manuscript of CasperJS - http://docs.casperjs.org/en/latest/modules/casper.html#casper-prototype
- create helpers for common html locators ( check gantt object in the test.js ) 
- configure Continious integration system to run the test after each commit ( you can start with free plan here http://drone.io )

