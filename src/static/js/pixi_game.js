loader.load(setup);

let game_imgs, backCenter, backSide, backTop, door, bombguy, pirate, bigguy, cucumber, captain;
let state;

function setup() {
    let container = new Container();
    // background bricks
    let centerW = gameAttr.frames["center.png"].spriteSourceSize.w;
    let centerH = gameAttr.frames["center.png"].spriteSourceSize.h;
    game_imgs = resources[sprite_game_json_path].textures;
    for (let i = 0; centerW * i < canvas.width; i++) {
        for (let j = 0; centerH * j < canvas.height; j++) {
            backCenter = new Sprite(game_imgs["center.png"]);
            backCenter.position.set(centerW * i, centerH * j);
            container.addChild(backCenter);
        }
    }

    // door sprite
    door = new Sprite(game_imgs["door.png"]);
    door.position.set(400, 100);
    container.addChild(door);

    //bombguy animated sprite
    let bombguy_idle_frames = getframes(bombguy_json_path,bombguyAttr,"idle_");
    let bombguy_run_frames = getframes(bombguy_json_path,bombguyAttr,"run_");
    bombguy = new AnimatedSprite(bombguy_idle_frames);
    bombguy.animationSpeed = 0.3;
    bombguy.name = "bombguy";
    bombguy.play();
    bombguy.vx = 0;
    bombguy.vy = 0;
    bombguy.position.set(100,100);
    container.addChild(bombguy);
    let pKeyCtr = PlayKeyControl(bombguy,bombguy_idle_frames,bombguy_run_frames);

    let pirate_idle_frames = getframes(pirate_json_path,pirateAttr,"idle_");
    pirate = new AnimatedSprite(pirate_idle_frames);
    pirate.animationSpeed = 0.3;
    pirate.name = "pirate";
    pirate.play();
    pirate.position.set(400,300);
    pirate.scale.x = -1;
    container.addChild(pirate);

    let cucumber_idle_frames = getframes(cucumber_json_path,cucumberAttr,"idle_");
    cucumber = new AnimatedSprite(cucumber_idle_frames);
    cucumber.animationSpeed = 0.3;
    cucumber.name = "cucumber";
    cucumber.play();
    cucumber.position.set(200,300);
    cucumber.scale.x = -1;
    container.addChild(cucumber);

    let bigguy_idle_frames = getframes(bigguy_json_path,bigguyAttr,"idle_");
    bigguy = new AnimatedSprite(bigguy_idle_frames);
    bigguy.animationSpeed = 0.3;
    bigguy.name = "bigguy";
    bigguy.play();
    bigguy.position.set(500,100);
    container.addChild(bigguy);

    let whale_idle_frames = getframes(whale_json_path,whaleAttr,"idle_");
    whale = new AnimatedSprite(whale_idle_frames);
    whale.animationSpeed = 0.3;
    whale.name = "bigguy";
    whale.play();
    whale.position.set(500,300);
    container.addChild(whale);

    app.stage.addChild(container);

    //Set game state
    state = play;

    app.ticker.add(delta => gameloop(delta));
}

function gameloop(delta) {
    state(delta);
}

function play(delta) {
    bombguy.x += bombguy.vx;
    bombguy.y += bombguy.vy;
}

function getframes(dir, attr, frame_name) {
    let textures = resources[dir].textures;
    let frames = [];
    let frame_num = 0;
    let count = 0;
    for (var img in attr.frames) {
        if (img.search(frame_name) >= 0) {
            count++;
        }
    }
    for (var i = 1; i <= count; i++) {
        var index = i < 10 ? '0' + i : i;
        frames.push(textures[frame_name+index+'.png']);
    }

    return frames;
}

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, true
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

function PlayKeyControl(spriteObj, idle_frames, run_frames) {
    let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    let objW = gameAttr.frames[spriteObj.name + ".png"].spriteSourceSize.w;

    left.press = () => {
        spriteObj.textures = run_frames;
        spriteObj.play();
        spriteObj.vx = -3;
        spriteObj.vy = 0;
        if (spriteObj.scale.x != -1) {
            spriteObj.scale.x = -1;
            spriteObj.position.x += objW;
        }
    };
    left.release = () => {
        spriteObj.textures = idle_frames;
        spriteObj.play();

        if (!right.isDown && spriteObj.vy === 0) {
            spriteObj.vx = 0;
        }

        if(spriteObj.vx!=0 || spriteObj.vy != 0) {
            spriteObj.textures = run_frames;
            spriteObj.play();
        }
        else if (spriteObj.vx===0 || spriteObj.vy === 0) {
            spriteObj.textures = idle_frames;
            spriteObj.play();
        }
    };

    up.press = () => {
        spriteObj.textures = run_frames;
        spriteObj.play();
        spriteObj.vy = -3;
        spriteObj.vx = 0;
    };
    up.release = () => {
        spriteObj.textures = idle_frames;
        spriteObj.play();
        if (!down.isDown && spriteObj.vx === 0) {
            spriteObj.vy = 0;
        }

        if(spriteObj.vx!=0 || spriteObj.vy != 0) {
            spriteObj.textures = run_frames;
            spriteObj.play();
        }
        else if (spriteObj.vx===0 || spriteObj.vy === 0) {
            spriteObj.textures = idle_frames;
            spriteObj.play();
        }
    };

    right.press = () => {
        spriteObj.textures = run_frames;
        spriteObj.play();
        spriteObj.vx = 3;
        spriteObj.vy = 0;
        if (spriteObj.scale.x != 1) {
            spriteObj.scale.x = 1;
            spriteObj.position.x -= objW;
        }
    };
    right.release = () => {
        spriteObj.textures = idle_frames;
        spriteObj.play();
        if (!left.isDown && spriteObj.vy === 0) {
            spriteObj.vx = 0;
        }

        if(spriteObj.vx!=0 || spriteObj.vy != 0) {
            spriteObj.textures = run_frames;
            spriteObj.play();
        }
        else if (spriteObj.vx===0 || spriteObj.vy === 0) {
            spriteObj.textures = idle_frames;
            spriteObj.play();
        }
    };

    down.press = () => {
        spriteObj.textures = run_frames;
        spriteObj.play();
        spriteObj.vy = 3;
        spriteObj.vx = 0;
    };
    down.release = () => {
        spriteObj.textures = idle_frames;
        spriteObj.play();
        if (!up.isDown && spriteObj.vx === 0) {
            spriteObj.vy = 0;
        }

        if(spriteObj.vx!=0 || spriteObj.vy != 0) {
            spriteObj.textures = run_frames;
            spriteObj.play();
        }
        else if (spriteObj.vx===0 || spriteObj.vy === 0) {
            spriteObj.textures = idle_frames;
            spriteObj.play();
        }
    };
}

console.log(app.renderer.width);
console.log(app.renderer.height);
