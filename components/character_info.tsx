import Image from "next/image";
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import Link from "next/link";

const gms_ver = 238;
const maple_api = "https://maplestory.io/api/GMS/"

export const jobs = ["Adele", "Angelic Buster", "Aran", "Ark", "Battle Mage", "Bishop", "Blaster", "Blaze Wizard", "Beast Tamer", "Bowmaster", "Buccaneer",
    "Cadena", "Cannoneer", "Corsair", "Dark Knight", "Dawn Warrior", "Demon Avenger", "Demon Slayer", "Dual Blade", "Evan", "Fire Poison", "Hayato",
    "Hero", "Hoyoung", "Ice Lightning", "Illium", "Jett", "Kain", "Kaiser", "Kanna", "Kinesis", "Lara", "Luminous", "Marksman", "Mechanic", "Mercedes",
    "Mihile", "Night Lord", "Night Walker", "Paladin", "Pathfinder", "Phantom", "Shade", "Shadower", "Thunder Breaker", "Wild Hunter", "Wind Archer",
    "Xenon", "Zero"];

export const areas = [
    {area: "vanishing journey", level: 0,  exp: 0}, {area: "chu chu", level: 0, exp: 0}, {area: "lachelein", level: 0, exp: 0},
    {area: "arcana", level: 0, exp: 0}, {area: "morass", level: 0, exp: 0}, {area: "esfera", level: 0, exp: 0}
];

export const bosses = [
    {boss: "Hilla", completed: false, values: [56250000], difficulties: ["Hard"], selected: 0}, {boss: "Pink Bean", completed: false, values: [64000000], difficulties: ["Chaos"], selected: 0},
    {boss: "Cygnus", completed: false, values: [45562500, 72250000], difficulties: ["Easy", "Normal"], selected: 0}, {boss: "Zakum", completed: false, values: [81000000], difficulties: ["Chaos"], selected: 0},
    {boss: "Pierre", completed: false, values: [81000000], difficulties: ["Chaos"], selected: 0}, {boss: "Von Bon", completed: false, values: [81000000], difficulties: ["Chaos"], selected: 0},
    {boss: "Queen", completed: false, values: [81000000], difficulties: ["Chaos"], selected: 0}, {boss: "Vellum", completed: false, values: [105062500], difficulties: ["Chaos"], selected: 0},
    {boss: "Princess No", completed: false, values: [81000000], difficulties: ["Normal"], selected: 0}, {boss: "Magnus", completed: false, values: [95062500], difficulties: ["Hard"], selected: 0},
    {boss: "Papulatus", completed: false, values: [132250000], difficulties: ["Chaos"], selected: 0}, {boss: "Akechi", completed: false, values: [144000000], difficulties: ["Normal"], selected: 0},
    {boss: "Damien", completed: false, values: [169000000, 351562500], difficulties: ["Normal", "Hard"], selected: 0}, {boss: "Lotus", completed: false, values: [162562500, 370562500], difficulties: ["Normal", "Hard"], selected: 0},
    {boss: "Lucid", completed: false, values: [175562500, 203062500, 400000000], difficulties: ["Easy", "Normal", "Hard"], selected: 0}, {boss: "Will", completed: false, values: [175562500, 232562500, 441000000], difficulties: ["Easy", "Normal", "Hard"], selected: 0},
    {boss: "Guardian Angel Slime", completed: false, values: [237493500, 451562500], difficulties: ["Normal", "Chaos"], selected: 0}, {boss: "Gloom", completed: false, values: [248062500, 462250000], difficulties: ["Normal", "Chaos"], selected: 0},
    {boss: "Darknell", completed: false, values: [264062500, 484000000], difficulties: ["Normal", "Hard"], selected: 0}, {boss: "Verus Hilla", completed: false, values: [447600000, 552250000], difficulties: ["Normal", "Hard"], selected: 0},
];

export const equips = [
    {slot: "Ring 1", name: "undefined", type: "rings"}, {slot: "Ring 2", name: "undefined", type: "rings"}, {slot: "Ring 3", name: "undefined", type: "rings"}, {slot: "Ring 4", name: "undefined", type: "rings"},
    {slot: "Pendant 1", name: "undefined", type: "pendants"}, {slot: "Pendant 2", name: "undefined", type: "pendants"}, {slot: "Belt", name: "undefined", type: "belts"},
    {slot: "Face", name: "undefined", type: "faces"}, {slot: "Eye", name: "undefined", type: "eyes"}, {slot: "Earring", name: "undefined", type: "earrings"},
    {slot: "Hat", name: "undefined", type: "hats"}, {slot: "Top", name: "undefined", type: "tops"}, {slot: "Bottom", name: "undefined", type: "bottoms"}, {slot: "Shoulder", name: "undefined", type: "shoulders"},
    {slot: "Shoes", name: "undefined", type: "shoes"}, {slot: "Gloves", name: "undefined", type: "gloves"}, {slot: "Cape", name: "undefined", type: "capes"},
    {slot: "Badge", name: "undefined", type: "badges"}, {slot: "Heart", name: "undefined", type: "hearts"}, {slot: "Pocket", name: "undefined", type: "pockets"}, {slot: "Medal", name: "undefined", type: "medals"},
    {slot: "Title", name: "undefined", type: "titles"}, {slot: "Weapon", name: "undefined", type: "weapons"}, {slot: "Secondary", name: "undefined", type: "secondaries"},
];

const equipment = {
    "rings": ["Silver Blossom:1113149", "Noble Ifia:1113282", "Ifia:1113089", "Event:2632823", "Kanna's Treasure:1113155", "Meister Ring:1113055", "Cracked Gollux Ring:1113072", "Solid Gollux Ring:1113073", "Reinforced Gollux Ring:1113074", "Superior Gollux Ring:1113075", "Guardian Angel:1113313", "Endless Terror:1113306"],
    "pendants": ["Ifia's Necklace:1122274", "Chaos Horntail Necklace:1122076", "Mechanator:1122254", "Dominator:1122150", "Cracked Gollux Pendant:1122264", "Solid Gollux Pendant:1122265", "Reinforced Gollux Pendant:1122266", "Superior Gollux Pendant:1122267", "Daybreak Pendant:1122443", "Source of Suffering:1122430"],
    "faces": ["Condensed Power Crystal:1012478", "Sweetwater Tattoo:1012438", "Twilight Mark:1012757", "Berserked:1012632"],
    "eyes": ["Aquatic Letter:1022231", "Black Bean Mark:1022232", "Sweetwater Monocle:1022211", "Papulatus Mark:1022277", "Magic Eyepatch:1022278"],
    "earrings": ["Dea Sidus:1032241", "Will o' the Wisps:1032136", "Meister Earring:1032200", "Cracked Gollux Earring:1032220", "Solid Gollux Earring:1032221", "Reinforced Gollux Earring:1032222", "Superior Gollux Earring:1032223", "Sweetwater Earring:1032224", "Estella:1032330", "Commanding Force:1032316"],
    "belts": ["Golden Clover:1132272", "Ayame's Treasure:1132275", "Tyrant Belt:2431413", "Cracked Gollux Belt:1132243", "Solid Gollux Belt:1132244", "Reinforced Gollux Belt:1132245", "Superior Gollux Belt:1132246", "Dreamy Belt:1132308"],
    "hats": ["Pensalir Hat:1004229", "Royal:1003797", "Absolab:1004422", "Arcane:1004808"],
    "tops": ["Pensalir Overall:1052799", "Eagle Eye:1042254", "Absolab Overall:1052882", "Arcane Overall:1053063"],
    "bottoms": ["Trixter:1062165"],
    "shoulders": ["Antique Leaf Shoulder:1152220", "Hayato's Treasure:1152171", "Antique Root Shoulder:1152221", "Absolab Shoulder:1152174", "Arcane Shoulder:1152196"],
    "shoes": ["Pensalir Shoes:1072967", "Amaterasu Shoes:1072711", "Tyrant Shoes:2431411", "Absolab Shoes:1073030", "Arcane Shoes:1073158"],
    "gloves": ["Pensalir Gloves:1082608", "Amaterasu Gloves:1082472", "Tyrant Gloves:1082543", "Absolab Gloves:1082636", "Arcane Gloves:1082695"],
    "capes": ["Pensalir Cape:1102718", "Amaterasu Cape:1102456", "Tyrant Cape:2431412", "Absolab Cape:1102775", "Arcane Cape:1102940"],
    "badges": ["Crystal Ventus Badge:1182087", "Ghost Ship Badge:1182060", "Sengoku Hakase Badge:1182273", "Genesis Badge:1182285"],
    "hearts": ["Lidium Heart:1672007", "Fairy Heart:1672073", "Glimmering Wondroid Heart:1672081"],
    "pockets": ["Pink Holy Cup:1162025", "Cursed Spellbook:1162080"],
    "medals": ["Antellion Guardian:1142962", "Seven Day Monster Parker:1142922"],
    "titles": ["Eternal Flame:2439181", "Superior Hunter:3700034", "Root Abyss Master:3700339", "Windsleep Forest Officer:3700495"],
    "weapons": ["Utgard Weapon:1302315", "Amaterasu:1302229", "Absolab Weapon:1302333", "Arcane Weapon:1302343"],
    "secondaries": ["Basic:1352200", "Princess No:2630594", "Deimos:1092087"]
}


const saveToStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.setItem(key, JSON.stringify(value));
    }
}

const getFromStorage = (key) => {
    if (typeof window !== 'undefined') {
        return JSON.parse(window.localStorage.getItem(key));
    }
}

export function CharacterShowcase() {
    const [storageKeys, setStorageKeys] = useState([]);

    useEffect(() => {
        const keys = [];

        for (let k in localStorage) {
            if (k.includes("_prog")) {
                keys.push(k);
            }
        }
        setStorageKeys(keys);
    }, []);

    return (
        <>
            {storageKeys.length > 0 ?
                <>
                    {storageKeys.map((character) => {
                        const data = getFromStorage(character)[0];
                        return (
                            <>
                                <ul>
                                    <li>
                                        {data.preview === "" ?
                                            <Image
                                                src={"/0.png"}
                                                alt=""
                                                width={43}
                                                height={68}
                                            >
                                            </Image>
                                            :
                                            <Image
                                                src={data.preview}
                                                alt=""
                                                width={96}
                                                height={96}
                                                priority
                                            >
                                            </Image>
                                        }
                                        <span>
                                            <br/>{data.name}
                                            <br/>{data.job}
                                            <br/>{data.level}
                                            <br/>
                                        </span>
                                        <Link href={{
                                            pathname: '/view',
                                            query: {character: data.name},
                                        }}>
                                            <button>View Character</button>
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )
                    })
                    }
                </>
                :
                <>
                    No characters found! Add a character by clicking the button below.
                </>
            }
        </>
    )
}

export function CharacterImage({image}) {
    return (
        <div>
            {image &&
                <Image
                    src={image}
                    alt=""
                    width={96}
                    height={96}
                    priority
                >
                </Image>
            }
        </div>
    )
}

function editSymbols(name) {
    const symbolButton = document.getElementById("symbolButton");
    const symbolDiv = document.getElementById("symbols");
    const inputList = symbolDiv.querySelectorAll("input");

    if (symbolButton.innerHTML === "Edit") {
        inputList.forEach((item) => {
            item.disabled = false;
        })
        symbolButton.innerHTML = "Save";
    } else {

        inputList.forEach((item) => {
            item.disabled = true;

            areas.map((a) => {
                if (item.getAttribute("name") === a.area) {
                    if (item.getAttribute("id").includes("level")) {
                        a.level = item.value === "" ? 0 : item.value as number;
                    } else if (item.getAttribute("id").includes("exp")) {
                        a.exp = item.value === "" ? 0 : item.value as number;
                    }
                }
            })
        })

        symbolButton.innerHTML = "Edit";
        updateSymbolStorage(name, areas)
    }
}

function updateSymbolStorage(name, areas) {

    let old = getFromStorage(name + "_prog");

    old[0]['symbols'] = areas;
    saveToStorage(name + "_prog", old);
}

export function CharacterSymbols({symbols, name}) {

    const [symbolData, setSymbolData] = useState([]);

    useEffect(() => {
        const sdata = [];
        for (let sd in symbols) {
            sdata.push(symbols[sd]);
        }
        setSymbolData(sdata);
    }, [symbols]);

    return (
        <>
            <span>Symbols</span>
            <div>
                <button id="symbolButton" onClick={() => editSymbols(name)}>Edit</button>
            </div>
            <div id="symbols" className={styles.symbol}>
                <br/>
            {symbolData.map((s) => (
                <ul>
                    <li>
                        <Image
                            src={'/areas/' + s.area + '.png'}
                            alt=""
                            width={33}
                            height={33}
                        >
                        </Image>
                        <br/>
                        <label>Level</label>
                        <br/>
                        <input type="number" id={s.area + "_level"} name={s.area} placeholder={s.level}
                               disabled></input>
                        <br/>
                        <label>Exp</label>
                        <br/>
                        <input type="number" id={s.area + "_exp"} name={s.area} placeholder={s.exp}
                               disabled></input>
                    </li>
                    <br/>
                </ul>
            ))}
            </div>
        </>
    )
}

const updateEquipImage = (index, equipData) => {

    console.log(index);

    const equip = equipment[equipData.type][index].split(":")[1];

    const equipDiv = document.getElementById(equipData.slot + "_div");

    let image = document.getElementById(equipData.slot + "_image");

    if (image === null) {
        image = document.createElement("img");
        image.setAttribute("id", equipData.slot + "_image");
        image.setAttribute("src", maple_api + "" + gms_ver + "/item/" + equip + "/icon");
       // image.setAttribute("src", "/equips/" + equipData.type + "/" + equip + ".png");
        equipDiv.appendChild(image);
    } else {
        let newImage = document.createElement("img");
        newImage.setAttribute("id", equipData.slot + "_image");
        newImage.setAttribute("src", maple_api + "" + gms_ver + "/item/" + equip + "/icon")
       // newImage.setAttribute("src", "/equips/" + equipData.type + "/" + equip + ".png");
        equipDiv.replaceChild(newImage, image);
    }
}

const loadEquips = (equipData) => {

    //equipData.map((e) => {
       // const select = document.getElementById(e.slot);
       // updateEquipImage(select.selectedIndex, e);
   //});
}

export function CharacterEquips({equips, name}) {

    const [equipData, setEquipData] = useState([]);

    useEffect(() => {
        const edata = [];
        for (let ed in equips) {
            edata.push(equips[ed]);
        }
        setEquipData(edata);
    }, [equips]);

    return (
        <>
            <span>Equips</span>
            <div>
                <img src='/blackheart.png' onLoad={() => loadEquips(equipData)}/>
            </div>
            <div id="equips" className={styles.equip}>
                <br/>
                {equipData.map((e) => (
                    <ul>
                        <li>
                        <span>
                            {e.slot}
                        </span>
                        <div id={e.slot + "_div"}>
                        </div>
                        <br/>
                        <select id={e.slot} onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            let index = event.nativeEvent.target as HTMLSelectElement;
                            updateEquipImage(index, e);
                        }}>
                            <option value="" selected disabled hidden>Select</option>
                            {equipment[e.type].map((eqp) => (
                                <option value={eqp.split(":")[0]}>
                                    {eqp.split(":")[0]}
                                </option>
                            ))}
                        </select>
                        </li>
                    </ul>
                ))}
            </div>
        </>
    )
}

const updateBossStorage = (checked, name, b, data, index) => {

    const totalMeso = document.getElementById("mesoValue");
    const mesoConvert = totalMeso.innerHTML.replace(/\,/g,'');

    const bossCheckBox = document.getElementById(b.boss + "_box") as HTMLInputElement;
    const selectedOption = document.getElementById(b.boss + "_options") as HTMLSelectElement;

    if (bossCheckBox.checked) {

        const value = b.values[selectedOption.selectedIndex];
        let v = parseInt(mesoConvert);

        if (oldBossValue.length > 0 && oldBossValue[0] === b.boss && oldBossValue[1] !== value) {
            v -= oldBossValue[1];
        }

        v += value;
        totalMeso.innerHTML = v.toLocaleString();
    } else {
        const value = b.values[selectedOption.selectedIndex];
        let v = parseInt(mesoConvert) - value;
        if (v < 0) {
            v = 0;
        }
        totalMeso.innerHTML = v.toLocaleString();
    }
    data[index] = {boss: b.boss, completed: checked, values: b.values, difficulties: b.difficulties, selected: selectedOption.selectedIndex}

    let old = getFromStorage(name + "_prog");

    old[0]['bosses'] = data;
    saveToStorage(name + "_prog", old);
}

const updateBossValue = (event, name, b, data, index) => {

    const bossValue = document.getElementById(b.boss + "_value");
    bossValue.innerHTML = b.values[event.nativeEvent.target.selectedIndex].toLocaleString("en") + " meso";

    const bossCheckBox = document.getElementById(b.boss + "_box") as HTMLInputElement;
    if (bossCheckBox.checked) {
        updateBossStorage(true, name, b, data, index);
    }
}

const updateTotalMeso = (bossData) => {

    const totalMeso = document.getElementById("mesoValue");
    const mesoConvert = totalMeso.innerHTML.replace(/\,/g,'');

    let total = 0;
    bossData.map((b) => {
        if (b.completed) {
            const v = parseInt(mesoConvert) + b.values[b.selected];
            total += v;
        }
    })

    totalMeso.innerHTML = total.toLocaleString();
}

let oldBossValue = [];

const saveOldValue = (e, b) => {

    oldBossValue = [b.boss, b.values[e.nativeEvent.target.selectedIndex]];
}

export function CharacterBosses({bosses, name}) {

    const [bossData, setBossData] = useState([]);

    useEffect(() => {
        const bdata = [];
        for (let sd in bosses) {
            bdata.push(bosses[sd]);
        }
        setBossData(bdata);

    }, [bosses]);

    return (
        <>
            <span>Bosses</span>
            <div>
                <img src='/intense_power_crystal.png' onLoad={() => updateTotalMeso(bossData)}/>
                Total: <span id="mesoValue">0</span>
            </div>
            <div className={styles.boss}>
                {bossData.map((b, index) => (
                    <ul>
                        <li>
                            <br/>
                            <Image
                                src={'/bosses/' + b.boss + '.png'}
                                alt=""
                                width={66}
                                height={67}
                            >
                            </Image>
                            <br/>
                            <label>{b.boss}</label>
                            <br/>
                            <select id={b.boss + "_options"} onClick={(e) => saveOldValue(e, b)} onChange={(e) => updateBossValue(e, name, b, bossData, index)} defaultValue={b.difficulties[b.selected]}>
                                {b.difficulties.map((diff) => (
                                    <option value={diff}>
                                        {diff}
                                    </option>
                                ))}
                            </select>
                            <br/>
                            <input type="checkbox" id={b.boss + "_box"} name={b.boss} defaultChecked={b.completed} onChange={(e) => updateBossStorage(e.target.checked, name, b, bossData, index)}></input>
                            <br/>
                            <span id={b.boss + "_value"}>{b.values[b.selected].toLocaleString('en')} meso</span>
                        </li>
                    </ul>
                ))}
            </div>
        </>
    )
}