/// --- Set up a system ---

import * as utils from '@dcl/ecs-scene-utils'
import { movePlayerTo, triggerEmote } from '@decentraland/RestrictedActions'
import { scene } from "./scene"
import { getUserData } from "@decentraland/Identity"

executeTask(async () => {
    let data = await getUserData()
})

@Component("level0")
export class level0 {
}
@Component("level1")
export class level1 {
} @Component("level2")
export class level2 {
} @Component("level3")
export class level3 {
    
}
@Component("LastTransform")
export class OriginalTransform {
    scale = new Vector3(0, 0, 0);
    position = new Vector3(0, 0, 0);
    constructor(position: Vector3, scale: Vector3) {
        this.scale = scale
        this.position = position
    }
}

@Component("SwitchBetweenQ")
export class SwitchBetweenQ {
    firstquaternion = Quaternion.Euler(0,0,0)
    secondquaternion = Quaternion.Euler(0, 0, 0)
    objectOnFirstRot = true
    firstOneIsRight = true
    constructor(firstquaternion: Quaternion, secondquaternion: Quaternion, firstOneIsRigth: boolean) {
        this.firstquaternion = firstquaternion
        this.secondquaternion = secondquaternion
        this.firstOneIsRight = firstOneIsRigth
    }
}

const chest = new Entity('chest')
engine.addEntity(chest)
const transform3 = new Transform({
    position: new Vector3(9.5, 0, 13.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
chest.addComponentOrReplace(transform3)


const myMaterial1 = new Material()
myMaterial1.albedoTexture = new Texture("images/banner.png")
scene.lv0banner.entity.addComponent(myMaterial1)
scene.lv0banner1.entity.addComponent(myMaterial1)


const sceneMessageBus = new MessageBus()


const canvas = new UICanvas()
const removablecanvas = new UICanvas()
const text = new UIText(canvas)
text.value = ""
text.vAlign = "top"
text.color = Color4.Yellow()
let timer=0


let key1_owned = false
let key2_owned = false
let key3_owned = false
const key1 = new UIImage(canvas, new Texture("images/key1.png"))
key1.sourceHeight = 100
key1.sourceWidth = 100
key1.height = 40
key1.width = 40
key1.visible = false
key1.vAlign = "top"
key1.positionX = -25

const key2 = new UIImage(canvas, new Texture("images/key2.png"))
key2.sourceHeight = 100
key2.sourceWidth = 100
key2.height = 40
key2.width = 40
key2.positionX = 0

key2.visible = false
key2.vAlign = "top"
const key3 = new UIImage(canvas, new Texture("images/key3.png"))
key3.sourceHeight = 100
key3.sourceWidth = 100
key3.positionX=25
key3.height = 40
key3.width = 40
key3.visible = false
key3.vAlign = "top"



class LoopMovementSystem2 {
    obj = new Entity()
    goingup = false
    movementamount = 0
    range = 0
    speed = 0
    constructor(obj: Entity, range: number, speed: number) {
        this.obj = obj
        this.speed = speed
        this.range = range
        let rndnumber = Math.random()
       


    }


    update(dt: number) {

        if (this.goingup) {
            this.obj.getComponent(Transform).position = new Vector3(this.obj.getComponent(Transform).position.x, this.obj.getComponent(Transform).position.y+ dt * this.speed, this.obj.getComponent(Transform).position.z )
        }
        if (!this.goingup) {
            this.obj.getComponent(Transform).position = new Vector3(this.obj.getComponent(Transform).position.x, this.obj.getComponent(Transform).position.y - dt * this.speed, this.obj.getComponent(Transform).position.z )
        }


        if (this.obj.getComponent(Transform).position.y >= 4  || this.obj.getComponent(Transform).position.y <= 0.5) {
            this.goingup = !this.goingup

        }
    }



}



class LoopMovementSystem {
    obj = new Entity()
    goingright = false
    movementamount = 0
    range = 0
    speed = 0
    constructor(obj: Entity, range: number, speed: number) {
        this.obj = obj
        this.speed = speed
        this.range=range
        let rndnumber = Math.random()
        if (rndnumber >= 0.5) this.goingright = true
        if (rndnumber < 0.5) this.goingright = false


    }


    update(dt: number) {

        if (this.goingright) {
            this.obj.getComponent(Transform).position = new Vector3(this.obj.getComponent(Transform).position.x, this.obj.getComponent(Transform).position.y, this.obj.getComponent(Transform).position.z - dt * this.speed)

        }
        if (!this.goingright) {
            this.obj.getComponent(Transform).position = new Vector3(this.obj.getComponent(Transform).position.x, this.obj.getComponent(Transform).position.y, this.obj.getComponent(Transform).position.z + dt * this.speed)

        }


        if (this.obj.getComponent(Transform).position.z >= 8 + this.range || this.obj.getComponent(Transform).position.z <= 8 - this.range) {
            this.goingright = !this.goingright
           
        }
    }
    


}


function deneme1() {
    
}




class TimerSystem {
    started = false
    update(dt: number) {
        if (!this.started) return
        timer += dt 
        //text.value = "timer: " + timer.toFixed(2)
    }
}

let timerstart = new TimerSystem()
engine.addSystem(timerstart)

let currentlevel=0
class StartSystem {
    
    groupx = engine.getComponentGroup(Transform)
    group0 = engine.getComponentGroup(level0)
    group1 = engine.getComponentGroup(level1)
    group2 = engine.getComponentGroup(level2)
    group3 = engine.getComponentGroup(level3)
    constructor() {
        this.groupx = engine.getComponentGroup(Transform)

        for (const entity of this.groupx.entities) {
            entity.addComponent(new OriginalTransform(entity.getComponent(Transform).position, entity.getComponent(Transform).scale))

        }
        for (const entity of this.group1.entities) {
            entity.addComponent(new utils.ScaleTransformComponent(new Vector3(1, 1, 1), new Vector3(0, 0, 0), 0.1))
            entity.addComponent(new utils.MoveTransformComponent(entity.getComponent(Transform).position, new Vector3(entity.getComponent(Transform).position.x, entity.getComponent(Transform).position.y + 10, entity.getComponent(Transform).position.z), 0.1))

        }

        for (const entity of this.group2.entities) {
            entity.addComponent(new utils.ScaleTransformComponent(new Vector3(1, 1, 1), new Vector3(0, 0, 0), 0.1))
            entity.addComponent(new utils.MoveTransformComponent(entity.getComponent(Transform).position, new Vector3(entity.getComponent(Transform).position.x, entity.getComponent(Transform).position.y + 10, entity.getComponent(Transform).position.z), 0.1))

        }

        for (const entity of this.group3.entities) {
            entity.addComponent(new utils.ScaleTransformComponent(new Vector3(1, 1, 1), new Vector3(0, 0, 0), 0.1))
            entity.addComponent(new utils.MoveTransformComponent(entity.getComponent(Transform).position, new Vector3(entity.getComponent(Transform).position.x, entity.getComponent(Transform).position.y + 10, entity.getComponent(Transform).position.z), 0.1))

        }

    }
    update(dt: number) {
       
    }
}

function infoscreen() {



    const infobox = new UIImage(canvas, new Texture("images/info.png"))
    infobox.sourceHeight = 512
    infobox.sourceWidth = 512   
    infobox.height = 200
    infobox.width = 200
    infobox.vAlign="bottom"

    const closebutton = new UIImage(canvas, new Texture("images/icon.png"))
    closebutton.sourceWidth = 512
    closebutton.sourceHeight = 512
    closebutton.height = 100
    closebutton.width = 100
    closebutton.isPointerBlocker = true

    closebutton.onClick = new OnClick(() => {

        infobox.visible = false
        closebutton.visible = false
        closebutton.isPointerBlocker = false


    })
    
    
}

function OpenChest() {


    sceneMessageBus.emit("openchest", {})



    const clip = new AudioClip("sounds/chest.wav")

    const source = new AudioSource(clip)


    source.playOnce()

    const im = new UIImage(canvas, new Texture("images/reward.png"))
    im.sourceHeight = 512
    im.sourceWidth = 512
    im.height = 200
    im.width = 200
    im.vAlign = "bottom"


    const closebutton = new UIImage(canvas, new Texture("images/icon.png"))
    closebutton.sourceWidth = 512
    closebutton.sourceHeight = 512
    closebutton.height = 100
    closebutton.width = 100
    closebutton.isPointerBlocker = true

    closebutton.onClick = new OnClick(() => {

        im.visible = false
        closebutton.visible = false
        closebutton.isPointerBlocker = false


    })
}

class ElevateSystem {
    level = 0
    rising = false
    n = new TimerSystem()
    group = engine.getComponentGroup(level0)
    constructor(level: any, rising: boolean) {
        this.level = level
        this.rising = rising
        if (level == 0) {
            this.group = engine.getComponentGroup(level0)

        }
        if (level == 1) {
            this.group = engine.getComponentGroup(level1)

        } if (level == 2) {
            this.group = engine.getComponentGroup(level2)

        } if (level == 3) {
            this.group = engine.getComponentGroup(level3)

        }   

        if (rising) {
            for (const entity of this.group.entities) {
               
                entity.addComponent(new utils.MoveTransformComponent(entity.getComponent(Transform).position, new Vector3(entity.getComponent(Transform).position.x, entity.getComponent(Transform).position.y + 10, entity.getComponent(Transform).position.z), 1))
                entity.addComponent(new utils.ScaleTransformComponent(entity.getComponent(Transform).scale, new Vector3(0, 0, 0), 1))
            }
        }
        if (!rising) {
            if (!timerstart.started) {
                timerstart.started = true
            }
          
            for (const entity of this.group.entities) {
                entity.addComponent(new utils.MoveTransformComponent(entity.getComponent(Transform).position, entity.getComponent(OriginalTransform).position, 1))
                entity.addComponent(new utils.ScaleTransformComponent(entity.getComponent(Transform).scale, entity.getComponent(OriginalTransform).scale, 1))

            }
        }
    }
    update() {
        
    }
    

   
   
}




/// --- Spawner function ---x

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))

  // add a shape to the entity
    cube.addComponent(new BoxShape())

    
        cube.addComponent(new level1())

    

  // add the entity to the engine
  engine.addEntity(cube)

  return cube
}

function ReturnPlayerToBegining() {
    movePlayerTo(new Vector3(-15,2.5,8))
}



function RefreshScene() {

    timerstart.started = false
   // text.value="timer"
    timer = 0


}

/// --- Spawn a cube ---

scene.lv0link.entity.addComponent(
    new OnPointerDown(() => {
        openExternalURL("http://Discord.gg/OxsTribe")
    }, { hoverText: "Intreact to join our nft discord" })
)


scene.lv0banner.entity.addComponent(
    new OnPointerDown(() => {
        openExternalURL("http://Discord.gg/OxsTribe")
    }, { hoverText: "Intreact to join our nft discord" })
)
scene.lv0banner1.entity.addComponent(
    new OnPointerDown(() => {
        openExternalURL("http://Discord.gg/OxsTribe")
    }, { hoverText: "Intreact to join our nft discord" })
)

scene.lv0wall4.entity.addComponent(new level0())
scene.lv0wall5.entity.addComponent(new level0())
scene.lv0wall1.entity.addComponent(new level0())
scene.lv0wall2.entity.addComponent(new level0())
scene.lv0wall3.entity.addComponent(new level0())
scene.lv1wall1.entity.addComponent(new level1())
scene.lv1wall2.entity.addComponent(new level1())
scene.lv1wall3.entity.addComponent(new level1())
scene.lv1wall4.entity.addComponent(new level1())
scene.lv1wall5.entity.addComponent(new level1())
scene.lv2ppiece1.entity.addComponent(new level2())
scene.lv2ppiece2.entity.addComponent(new level2())
scene.lv2ppiece3.entity.addComponent(new level2())
scene.lv2ppiece4.entity.addComponent(new level2())
scene.lv2ppiece5.entity.addComponent(new level2())
scene.lv2ppiece7.entity.addComponent(new level2())
scene.lv2ppiece8.entity.addComponent(new level2())
scene.lv2ppiece9.entity.addComponent(new level2())
scene.lv2ppiece10.entity.addComponent(new level2())
scene.lv2moveableppiece1.entity.addComponent(new level2())
scene.lv2moveableppiece2.entity.addComponent(new level2())
scene.lv2moveableppiece3.entity.addComponent(new level2())
scene.lv2moveableppiece4.entity.addComponent(new level2())
scene.lv2moveableppiece6.entity.addComponent(new level2())
scene.lv2moveableppiece7.entity.addComponent(new level2())
scene.lv2moveableppiece8.entity.addComponent(new level2())
scene.lv2moveableppiece9.entity.addComponent(new level2())
scene.lv2moveableppiece10.entity.addComponent(new level2())
scene.lv2moveableppiece11.entity.addComponent(new level2())
scene.lv2wall1.entity.addComponent(new level2())
scene.lv2wall2.entity.addComponent(new level2())
scene.lv2wall3.entity.addComponent(new level2())
scene.lv2wall4.entity.addComponent(new level2())
scene.lv2wall5.entity.addComponent(new level2())
scene.lv2cable1.entity.addComponent(new level2())
scene.lv2cable2.entity.addComponent(new level2())
scene.lv2charger.entity.addComponent(new level2())
scene.lv3hopper1.entity.addComponent(new level3())
scene.lv3hopper2.entity.addComponent(new level3())
scene.lv3hopper3.entity.addComponent(new level3())
scene.lv3hopper4.entity.addComponent(new level3())
scene.lv3hopper5.entity.addComponent(new level3())
scene.lv3hopper6.entity.addComponent(new level3())
scene.lv3hopper7.entity.addComponent(new level3())
scene.lv3hopper8.entity.addComponent(new level3())
scene.lv3hopper9.entity.addComponent(new level3())
scene.lv3hopper10.entity.addComponent(new level3())
scene.lv3elevator.entity.addComponent(new level3())

scene.lv3tree2.entity.addComponent(new level3()) 
scene.lv3tree3.entity.addComponent(new level3())    
    
scene.lv3floor.entity.addComponent(new level3())
scene.lv3floor2.entity.addComponent(new level3())

scene.lv0portal1.entity.addComponent(new level0())
scene.lv0portal2.entity.addComponent(new level1())
scene.lv0portal3.entity.addComponent(new level2())
scene.lv0portal4.entity.addComponent(new level3())
scene.lv1floor.entity.addComponent(new level1())
scene.lv1floor2.entity.addComponent(new level1())
scene.lv1fence1.entity.addComponent(new level1())
scene.lv1fence2.entity.addComponent(new level1())
scene.lv1fence3.entity.addComponent(new level1())
scene.lv1fence4.entity.addComponent(new level1())
scene.lv1fence5.entity.addComponent(new level1())
scene.lv1fence6.entity.addComponent(new level1())
scene.lv1fence7.entity.addComponent(new level1())
scene.lv1fence8.entity.addComponent(new level1())
scene.lv1fence9.entity.addComponent(new level1())
scene.lv1fence10.entity.addComponent(new level1())
scene.lv1fence11.entity.addComponent(new level1())
scene.lv1deadlyobstacle1.entity.addComponent(new level1())
scene.lv1deadlyobstacle2.entity.addComponent(new level1())
scene.lv1deadlyobstacle3.entity.addComponent(new level1())
scene.lv1deadlyobstacle4.entity.addComponent(new level1())
scene.lv1deadlyobstacle5.entity.addComponent(new level1())
scene.lv1deadlyobstacle6.entity.addComponent(new level1())
scene.lv1deadlyobstacle7.entity.addComponent(new level1())
scene.lv1deadlyobstacle8.entity.addComponent(new level1())
scene.lv1deadlyobstacle9.entity.addComponent(new level1())
scene.lv1deadlyobstacle10.entity.addComponent(new level1())
scene.lv1deadlyobstacle11.entity.addComponent(new level1())
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle1.entity, 5.5, 3))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle2.entity, 5.5, 8))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle3.entity, 5.5, 5))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle4.entity, 5.5, 3.5))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle5.entity, 5.5 ,6))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle6.entity, 5.5 ,8))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle7.entity, 5.5, 6))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle8.entity, 5.5, 7))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle9.entity, 5.5, 3))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle10.entity, 5.5, 4))
engine.addSystem(new LoopMovementSystem(scene.lv1deadlyobstacle11.entity, 5.5, 15))

engine.addSystem(new LoopMovementSystem(scene.lv3hopper1.entity, 2.4,0.5))
engine.addSystem(new LoopMovementSystem(scene.lv3hopper2.entity, 4,0.4))
engine.addSystem(new LoopMovementSystem(scene.lv3hopper3.entity,1.6,0.74))
engine.addSystem(new LoopMovementSystem(scene.lv3hopper4.entity,1.2,0.9))
engine.addSystem(new LoopMovementSystem(scene.lv3hopper5.entity, 4,0.8))
engine.addSystem(new LoopMovementSystem(scene.lv3hopper6.entity, 4,0.5))
engine.addSystem(new LoopMovementSystem(scene.lv3hopper7.entity, 3,0.35))
engine.addSystem(new LoopMovementSystem(scene.lv3hopper8.entity, 4,0.25))
engine.addSystem(new LoopMovementSystem(scene.lv3hopper9.entity, 3,0.5))
engine.addSystem(new LoopMovementSystem(scene.lv3hopper10.entity, 2, 0.3))
engine.addSystem(new LoopMovementSystem2(scene.lv3elevator.entity, 2, 1))


const myMaterial = new Material()
myMaterial.emissiveColor = new Color3(255, 215, 0)
myMaterial.emissiveIntensity=0.02

scene.lv3elevator.entity.addComponent(myMaterial)
scene.lv3hopper1.entity.addComponent(myMaterial)
scene.lv3hopper2.entity.addComponent(myMaterial)
scene.lv3hopper3.entity.addComponent(myMaterial)
scene.lv3hopper4.entity.addComponent(myMaterial)
scene.lv3hopper5.entity.addComponent(myMaterial)
scene.lv3hopper6.entity.addComponent(myMaterial)
scene.lv3hopper7.entity.addComponent(myMaterial)
scene.lv3hopper8.entity.addComponent(myMaterial)
scene.lv3hopper9.entity.addComponent(myMaterial)
scene.lv3hopper10.entity.addComponent(myMaterial)



scene.lv1deadlyobstacle1.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5,5,0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))

scene.lv1deadlyobstacle2.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))

scene.lv1deadlyobstacle3.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))

scene.lv1deadlyobstacle4.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))
scene.lv1deadlyobstacle5.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))

scene.lv1deadlyobstacle6.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))

scene.lv1deadlyobstacle7.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))
scene.lv1deadlyobstacle8.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))
scene.lv1deadlyobstacle9.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))
scene.lv1deadlyobstacle10.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))
scene.lv1deadlyobstacle11.entity.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 5, 0.5)), {
    onCameraEnter: () => {
        ReturnPlayerToBegining()
    }
}))



scene.lv2moveableppiece1.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(90, 0, 0), Quaternion.Euler(0, 270, 270), false))

scene.lv2moveableppiece1.entity.addComponent(new OnPointerDown(() => {
    

    if (scene.lv2moveableppiece1.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece1.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece1.transform.rotation, scene.lv2moveableppiece1.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece1.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece1.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece1.transform.rotation, scene.lv2moveableppiece1.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece1.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))



scene.lv2moveableppiece2.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(270, 270, 90), Quaternion.Euler(0, 270, 90), false))

scene.lv2moveableppiece2.entity.addComponent(new OnPointerDown(() => {


    if (scene.lv2moveableppiece2.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece2.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece2.transform.rotation, scene.lv2moveableppiece2.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece2.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece2.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece2.transform.rotation, scene.lv2moveableppiece2.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece2.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))


scene.lv2moveableppiece3.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(270, 0, 0), Quaternion.Euler(0, 270, 90), false))

scene.lv2moveableppiece3.entity.addComponent(new OnPointerDown(() => {


    if (scene.lv2moveableppiece3.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece3.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece3.transform.rotation, scene.lv2moveableppiece3.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece3.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece3.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece3.transform.rotation, scene.lv2moveableppiece3.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece3.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))
    

scene.lv2moveableppiece4.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(0, 90, 270), Quaternion.Euler(90, 270, 90), true))

scene.lv2moveableppiece4.entity.addComponent(new OnPointerDown(() => {


    if (scene.lv2moveableppiece4.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece4.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece4.transform.rotation, scene.lv2moveableppiece4.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece4.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece4.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece4.transform.rotation, scene.lv2moveableppiece4.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece4.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))




scene.lv2moveableppiece6.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(270, 180, 0), Quaternion.Euler(0, 90, 90), false))

scene.lv2moveableppiece6.entity.addComponent(new OnPointerDown(() => {


    if (scene.lv2moveableppiece6.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece6.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece6.transform.rotation, scene.lv2moveableppiece6.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece6.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece6.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece6.transform.rotation, scene.lv2moveableppiece6.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece6.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))



scene.lv2moveableppiece7.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(0, 270, 270), Quaternion.Euler(270, 180, 0), true))

scene.lv2moveableppiece7.entity.addComponent(new OnPointerDown(() => {


    if (scene.lv2moveableppiece7.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece7.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece7.transform.rotation, scene.lv2moveableppiece7.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece7.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece7.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece7.transform.rotation, scene.lv2moveableppiece7.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece7.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))


scene.lv2moveableppiece8.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(0, 90, 90), Quaternion.Euler(90, 0, 0), false))

scene.lv2moveableppiece8.entity.addComponent(new OnPointerDown(() => {


    if (scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece8.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece8.transform.rotation, scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece8.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece8.transform.rotation, scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))


scene.lv2moveableppiece9.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(0, 270, 90), Quaternion.Euler(270, 0, 0), false))

scene.lv2moveableppiece9.entity.addComponent(new OnPointerDown(() => {


    if (scene.lv2moveableppiece9.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece9.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece9.transform.rotation, scene.lv2moveableppiece9.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece9.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece9.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece9.transform.rotation, scene.lv2moveableppiece9.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece9.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))



scene.lv2moveableppiece10.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(90, 180, 0), Quaternion.Euler(0, 90, 270), false))

scene.lv2moveableppiece10.entity.addComponent(new OnPointerDown(() => {


    if (scene.lv2moveableppiece10.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece10.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece10.transform.rotation, scene.lv2moveableppiece10.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece10.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece10.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece10.transform.rotation, scene.lv2moveableppiece10.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece10.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))


scene.lv2moveableppiece11.entity.addComponent(new SwitchBetweenQ(Quaternion.Euler(90, 180, 0), Quaternion.Euler(0, 90, 270), false))

scene.lv2moveableppiece11.entity.addComponent(new OnPointerDown(() => {


    if (scene.lv2moveableppiece11.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        scene.lv2moveableppiece11.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece11.transform.rotation, scene.lv2moveableppiece11.entity.getComponent(SwitchBetweenQ).secondquaternion, 1))
        scene.lv2moveableppiece11.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = false
    }
    else {
        scene.lv2moveableppiece11.entity.addComponent(new utils.RotateTransformComponent(scene.lv2moveableppiece11.transform.rotation, scene.lv2moveableppiece11.entity.getComponent(SwitchBetweenQ).firstquaternion, 1))
        scene.lv2moveableppiece11.entity.getComponent(SwitchBetweenQ).objectOnFirstRot = true

    }
}, { hoverText: "Interact to rotate" }))





scene.lv0portal1.entity.addComponent(new OnPointerDown(() => {
   
    ReturnPlayerToBegining()
    engine.addSystem(new ElevateSystem(1, false))
    engine.addSystem(new ElevateSystem(currentlevel, true))
    currentlevel = 1


    const clip = new AudioClip("sounds/levelswap.wav")

    const source = new AudioSource(clip)

    scene.lv0portal1.entity.addComponent(source)

    source.playOnce()


}, { hoverText:"Start Parkour" }))
scene.lv0portal2.entity.addComponent(new OnPointerDown(() => {
    ReturnPlayerToBegining()
    engine.addSystem(new ElevateSystem(2, false))
    engine.addSystem(new ElevateSystem(currentlevel, true))
    currentlevel = 2
    key1_owned = true



    const clip = new AudioClip("sounds/levelswap.wav")

    const source = new AudioSource(clip)

    scene.lv0portal2.entity.addComponent(source)

    source.playing = true


}, { hoverText: "Claim key" }))  
scene.lv0portal3.entity.addComponent(new OnPointerDown(() => {

    if (scene.lv2moveableppiece1.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece1.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {

        return
    }
    if (scene.lv2moveableppiece2.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece2.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        return

    } if (scene.lv2moveableppiece3.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece3.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        return

    } if (scene.lv2moveableppiece4.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece4.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        return

    } if (scene.lv2moveableppiece6.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece6.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        return

    } if (scene.lv2moveableppiece7.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece7.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        return

    } if (scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        return

    } if (scene.lv2moveableppiece9.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        return

    } if (scene.lv2moveableppiece10.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        return

    } if (scene.lv2moveableppiece11.entity.getComponent(SwitchBetweenQ).firstOneIsRight != scene.lv2moveableppiece8.entity.getComponent(SwitchBetweenQ).objectOnFirstRot) {
        return

    }
  


    ReturnPlayerToBegining()
    engine.addSystem(new ElevateSystem(3, false))
    engine.addSystem(new ElevateSystem(currentlevel, true))
    currentlevel = 3
    key2_owned = true



    const clip = new AudioClip("sounds/levelswap.wav")

    const source = new AudioSource(clip)

    scene.lv0portal3.entity.addComponent(source)

    source.playOnce()


}, { hoverText: "Power cores to claim key" }))


scene.lv0portal4.entity.addComponent(new OnPointerDown(() => {
    ReturnPlayerToBegining()
    engine.addSystem(new ElevateSystem(0, false))
    engine.addSystem(new ElevateSystem(currentlevel, true))
    currentlevel = 0
    key3_owned = true

    const clip = new AudioClip("sounds/levelswap.wav")

    const source = new AudioSource(clip)

    scene.lv0portal4.entity.addComponent(source)

    source.playOnce()
}, { hoverText: "Teleport back to hub" }))


scene.lv1return.entity.addComponent(new OnPointerDown(() => {
    ReturnPlayerToBegining()
    engine.addSystem(new ElevateSystem(0, false))
    engine.addSystem(new ElevateSystem(currentlevel, true))
    currentlevel = 0
}, { hoverText: "Return to hub" }))



function givelink() {

}




engine.addSystem(new StartSystem())
