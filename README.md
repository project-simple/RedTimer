# RedTimer
Simple Javascript Timer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/project-simple-red-timer.png)](https://npmjs.org/package/project-simple-red-timer)

github - [here](https://github.com/project-simple/RedTimer)

# Install 
#### npm 
```npm
npm install project-simple-red-timer --save-dev
```
```
import RedTimer from 'project-simple-red-timer';
```
#### browser
```html
<script src="https://project-simple.github.io/RedTimer/RedTimer.js"></script>
<script>
    RedTimer(
        'testKey_1',
        1000,
        function(){}, 
        function(){}
    );
</script>
```

# API

### RedTimer(key, duration, updateCallback, endCallback)
| param | description | type |
|---|:---|---:|
| `key` | unique key | `string` |
| `duration` | timer duration | `positive number`(Millisecond) |
| `updateCallback` | Register a function to be called whenever the timer is updated. | `function` or `undefined` |
| `endCallback` | Register a function to be called when the timer is end. | `function` or `undefined`  |

```javascript
    var t0 = RedTimer('testKey_1',1000,function(){}, function(){});
    var t1 = new RedTimer('testKey_2',1000,function(){}, function(){});
    console.log(t0 instanceof RedTimer); // true
    console.log(t1 instanceof RedTimer); // auto call constructor
```

### property
| name | description | read/write | type |
|---|:---|---|---:|
| `key` | Timer key | read-only  |`string` |
| `duration` | Timer duration | read/write |`positive number`(Millisecond) |
| `startTime` | Timer startTime | read-only |`number`(Millisecond) |
| `endTime` | Timer endTime | read-only |`number`(Millisecond) |
| `elapsedTime` | Timer elapsedTime | read-only |`number`(Millisecond) |
| `remainTime` | Timer remainTime | read-only |`number`(Millisecond) |

```javascript
    RedTimer(
        'testKey_1',
        1000,
        function(){
            console.log('key', this.key); 
            console.log('duration', this.duration);
            console.log('startTime', this.startTime);
            console.log('endTime', this.endTime);
            console.log('elapsedTime', this.elapsedTime);
            console.log('remainTime', this.remainTime);
            console.log('//////////////////////') 
        }, 
        function(){}
    );
```

### method
- #### (RedTimer Instance).destroy()
```javascript
    var t0 = RedTimer('testDestroy',1000,function(){},function(){})
    t0.destroy();
```
- Target timer destroyed immediately (endCallback not called)

### static method
- #### RedTimer.destroyAll()
```javascript
    RedTimer( 'testDestroyAll_1', 1000, function(){}, function(){} );
    RedTimer( 'testDestroyAll_2', 2000, function(){}, function(){} );
    RedTimer( 'testDestroyAll_3', 3000, function(){}, function(){} );
    RedTimer( 'testDestroyAll_4', 4000, function(){}, function(){} );
    RedTimer.destroyAll();
```
- Destroys the currently active RedTimer instance. (endCallback not called)
