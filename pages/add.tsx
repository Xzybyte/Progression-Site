import Image from "next/image";
import React, { useState } from 'react';
import Link from "next/link";
import styles from '../styles/Home.module.css'
import {areas, bosses, equips, jobs} from "../components/character_info";

const addCharacter = () => {

    const cname = document.getElementById("cname") as HTMLInputElement;
    const name = cname.value;

    const cpreview = document.getElementById("cpreview") as HTMLDataElement;
    const preview = cpreview.value;

    const clevel = document.getElementById("clevel") as HTMLInputElement;
    const level = clevel.value;

    const cjob = document.getElementById("cjobs") as HTMLInputElement;
    const job = cjob.value;

    if (name.length === 0 || level.length === 0) {
        const error = document.getElementById("addError");
        error.innerHTML = "IGN & Level are required.";
        return;
    }

    const character = [{
        "name": name,
        "preview": preview,
        "level": level,
        "job": job,
        "symbols": areas,
        "bosses": bosses,
        "equips": equips

    }];

    localStorage.setItem(name + "_prog", JSON.stringify(character));
    window.location.href = '/';
}

export default function AddCharacter() {

    const [preview, setPreview] = useState('/0.png');
    const [width, setWidth] = useState(43);
    const [height, setHeight] = useState(68);

    const updateCharacterPreview = () => {
        const cpreview = document.getElementById("cpreview") as HTMLDataElement;
        const linkValue = cpreview.value;
        if (linkValue.length > 0) {
            setPreview(linkValue);
            setWidth(96);
            setHeight(96);
        }
    }

    return (
        <>
            <div className={styles.character_creation}>
                <div>
                    <h1>Basic Character Information</h1>
                    <span>More information will be available once you add the character.</span><br/><br/>
                    <h4>Image Preview</h4>
                    <Image
                        id="character_image"
                        alt="Character Preview"
                        src={preview}
                        width={width}
                        height={height}
                        priority
                    >
                    </Image>
                    <br/><br/>
                    <label>Character Preview Link:</label>
                    <br/>
                    <input type="text" id="cpreview"></input>
                    <br/>
                    <button onClick={updateCharacterPreview}>Update Preview</button>
                </div>
                <div>
                    <br/>
                    <label>Character IGN:</label>
                    <br/>
                    <input type="text" id="cname" name="cname"></input>
                    <br/><br/>
                    <label>Level: </label>
                    <br/>
                    <input type="number" id="clevel" name="clevel"></input>
                    <br/><br/>
                    <label>Job: </label>
                    <br/>
                    <select id="cjobs">
                    {jobs.map((j) => (
                        <option value={j}>
                            {j}
                        </option>
                    ))}
                    </select>
                </div>
                <div>
                    <button onClick={addCharacter}>Add Character</button>
                    <Link href="/">
                        <button>Go Back</button>
                    </Link>
                    <div id="addError"></div>
                </div>
            </div>
        </>
    )
}